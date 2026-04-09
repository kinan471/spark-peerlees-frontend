// Add type declaration for Deno
declare const Deno: any;

import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1'
];

async function scrapeProduct(url: string) {
  let lastError = '';
  
  for (let attempt = 0; attempt < 3; attempt++) {
    const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    
    try {
      // PROXY: Pass request through allorigins to avoid rigid AWS IP blocks from Akakce & Cimri
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl, {
        headers: {
          'User-Agent': userAgent,
        },
        signal: AbortSignal.timeout(25000)
      });

      if (!response.ok) {
        if (response.status === 403 || response.status === 429) {
          lastError = `Proxy/Server blocked the request (Status ${response.status}). Attempt ${attempt + 1}`;
          await new Promise(r => setTimeout(r, 2000 * (attempt + 1))); // Increased delay
          continue;
        }
        throw new Error(`Proxy returned status ${response.status}`);
      }

      const proxyData = await response.json();
      const html = proxyData.contents;
      
      if (!html) throw new Error("Empty proxy response contents");

      let name = '';
      let price = 0;
      let image = '';

      // 1. SMART EXTRACTION: JSON-LD (Schema.org / Product) - The most reliable method
      const ldRegex = /<script(?:\s+type="application\/ld\+json"|[^>]*)>([\s\S]*?)<\/script>/gi;
      let match;
      while ((match = ldRegex.exec(html)) !== null) {
        try {
          const jsonText = match[1].trim();
          // Sometimes JSON-LD contains raw HTML or syntax errors, we try parsing
          const data = JSON.parse(jsonText);
          
          // It could be an array of schemas or a single object
          const schemas = Array.isArray(data) ? data : [data];
          
          for (const schema of schemas) {
            if (schema['@type'] === 'Product' || schema['@type'] === 'ProductGroup') {
              if (schema.name && !name) name = schema.name;
              if (schema.image && !image) {
                image = Array.isArray(schema.image) ? schema.image[0] : schema.image;
              }
              if (schema.offers) {
                 const offer = Array.isArray(schema.offers) ? schema.offers[0] : schema.offers;
                 if (offer.price && !price) price = parseFloat(offer.price);
                 if (offer.lowPrice && !price) price = parseFloat(offer.lowPrice);
              }
            }
          }
        } catch (e) {
          // ignore parse errors for broken JSON-LD
        }
      }

      // 2. SMART EXTRACTION: Open Graph Meta Tags (Fallback)
      if (!name) {
        const ogTitle = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/i);
        if (ogTitle) name = ogTitle[1];
      }
      if (!image) {
        const ogImage = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);
        if (ogImage) image = ogImage[1];
      }
      if (!price) {
        const ogPrice = html.match(/<meta[^>]*property="product:price:amount"[^>]*content="([^"]+)"/i);
        if (ogPrice) price = parseFloat(ogPrice[1]);
      }

      // 3. FALLBACK: Classic Regex matching for Cimri & Akakce
      if (!name) {
        const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        if (titleMatch) name = titleMatch[1].replace(/<[^>]*>/g, '').trim();
      }

      if (!price) {
        // Look for common price patterns in Turkish e-commerce: "5.432,10 TL"
        const priceBlocks = html.match(/class="[^"]*(?:price|pt_v8|s1a)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi);
        if (priceBlocks && priceBlocks.length > 0) {
           for (const block of priceBlocks) {
             let txt = block.replace(/<[^>]*>/g, '').trim();
             let pStr = txt.replace(/[^0-9,.]/g, '');
             if (pStr.length > 0) {
               // convert Turkish format 1.234,56 to 1234.56
               if (pStr.includes(',') && pStr.includes('.')) {
                 pStr = pStr.replace(/\./g, '').replace(',', '.');
               } else if (pStr.includes(',')) {
                 pStr = pStr.replace(',', '.');
               }
               const parsed = parseFloat(pStr);
               if (parsed > 0) { price = parsed; break; }
             }
           }
        }
      }

      // Improve Anti-Bot False Positives. 'Robot' is Turkish for Food Processor!
      if (html.includes('g-recaptcha') || html.includes('cf-browser-verification') || html.length < 1000) {
        lastError = "Blocked by strict Bot Detection / CAPTCHA challenge";
        continue;
      }

      if (!name && !price) {
         throw new Error("Could not parse page structure. URL might be invalid or heavily protected.");
      }

      if (!name) name = 'منتج تم جلبه بنجاح';
      
      if (image && !image.startsWith('http')) {
        image = 'https:' + (image.startsWith('//') ? image : '//' + image);
      }

      return { name, price, image };

    } catch (err: any) {
      lastError = err.message || String(err);
      console.error(`Attempt ${attempt + 1} failed:`, lastError);
      if (attempt < 2) await new Promise(r => setTimeout(r, 500));
    }
  }

  throw new Error(`Scraping failed after 3 attempts. Last error: ${lastError}`);
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Note: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are automatically provided 
    // by Supabase to all Edge Functions. No manual 'secret set' is required.
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    const supabaseClient = (supabaseUrl && supabaseKey) 
      ? createClient(supabaseUrl, supabaseKey)
      : null;

    const body = await req.json().catch(() => ({}));
    const { url, action } = body;

    // Action: Sync All Prices
    if (action === 'sync-all') {
      if (!supabaseClient) {
        throw new Error("Missing Supabase environment variables on the server. Please ensure the function is deployed correctly.");
      }
      const { data: products, error: fetchError } = await supabaseClient
        .from('products')
        .select('id, akakce_url')
        .not('akakce_url', 'is', null);

      if (fetchError) throw fetchError;

      const results = [];
      for (const product of products || []) {
        try {
          const scraped = await scrapeProduct(product.akakce_url);
          await supabaseClient
            .from('products')
            .update({ price: scraped.price, updated_at: new Date().toISOString() })
            .eq('id', product.id);

          results.push({ id: product.id, success: true, price: scraped.price });
          await new Promise(r => setTimeout(r, 500));
        } catch (err: any) {
          results.push({ id: product.id, success: false, error: err.message });
        }
      }

      return new Response(
        JSON.stringify({ success: true, results }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: Fetch Single URL
    if (url) {
      if (!url.includes('akakce.com') && !url.includes('cimri.com')) {
         return new Response(
           JSON.stringify({ success: false, message: 'Invalid URL. Only Akakce and Cimri links are supported.' }),
           { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
         );
      }

      const scraped = await scrapeProduct(url);
      
      return new Response(
        JSON.stringify({
          success: true,
          ...scraped,
          name_tr: scraped.name,
          description: 'جلب تلقائي عبر المحرك الذكي'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, message: 'No URL or valid action provided' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );

  } catch (error: any) {
    const isBlocked = error.message?.includes('blocked') || error.message?.includes('3 attempts');
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message,
        details: isBlocked ? "Akakçe has blocked the server IP. Try again in 1 hour or check the URL." : "Internal Server Error"
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: isBlocked ? 403 : 500 
      }
    )
  }
})
