// Add type declaration to silence 'Cannot find name Deno' error
declare const Deno: any;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
];

async function scrapeAkakce(url: string) {
  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': userAgent,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
    },
  });

  if (!response.ok) {
    throw new Error(`Akakce returned status ${response.status}`);
  }

  const html = await response.text();
  
  // 1. Title detection
  const nameMatch = 
    html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) ||
    html.match(/<h1[^>]*class="[^"]*pdt_v8[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
    html.match(/<h1[^>]*class="[^"]*pn_v8[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
  
  // 2. Price detection
  const gndMatch = html.match(/window\.GND\.p\s*=\s*"(\d+)"/i);
  const ptMatch = html.match(/class="pt_v8"[^>]*>([\s\S]*?)<\/span>/i);
  const priceMatch = 
    ptMatch ||
    html.match(/class="p_v8"[^>]*>([\s\S]*?)<\/span>/i) || 
    html.match(/<span[^>]*class="price"[^>]*>([\s\S]*?)<\/span>/i) ||
    html.match(/(\d[\d.,]*)\s*TL/i);
  
  // 3. Image detection
  const imageMatch = 
    html.match(/<div[^>]*class="img_w"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/i) || 
    html.match(/<img[^>]*class="[^"]*p-img_v8[^"]*"[^>]*src="([^"]+)"/i) ||       
    html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]+)"/i);

  let name = nameMatch ? nameMatch[1].replace(/<[^>]*>/g, '').trim() : 'منتج Akakce';
  
  let price = 0;
  if (gndMatch) {
    price = parseFloat(gndMatch[1]) || 0;
  } else if (priceMatch) {
    let priceStr = priceMatch[1].replace(/<[^>]*>/g, '').replace(/[^0-9,.]/g, '');
    
    if (priceStr.includes(',') && priceStr.includes('.')) {
      priceStr = priceStr.replace(/\./g, '').replace(',', '.');
    } else if (priceStr.includes(',')) {
      priceStr = priceStr.replace(',', '.');
    }
    
    price = parseFloat(priceStr) || 0;
  }
  
  let image = imageMatch ? imageMatch[1] : '';

  if (image && !image.startsWith('http')) {
    image = 'https:' + (image.startsWith('//') ? image : '//' + image);
  }

  return { name, price, image };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { url } = body;

    if (!url || !url.includes('akakce.com')) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid Akakce URL' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const scraped = await scrapeAkakce(url);
    
    return new Response(
      JSON.stringify({
        success: true,
        ...scraped,
        name_tr: scraped.name,
        description: 'تم جلب هذا المنتج تلقائياً من Akakce',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ success: false, message: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
