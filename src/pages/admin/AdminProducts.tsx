import { useState } from "react";
import { Plus, Edit, Trash2, Search, TrendingUp, Link as LinkIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp, Product } from "@/contexts/AppContext";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, settings, uploadProductImage } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrapedImageUrl, setScrapedImageUrl] = useState("");
  
  const [formData, setFormData] = useState({
    name_ar: "",
    name_tr: "",
    price: 0,
    image_url: "",
    description_ar: "",
    description_tr: "",
    category: "ebike",
    stock: 1,
    akakce_url: "",
    specifications: {} as Record<string, string>,
  });


  const filteredProducts = products.filter(product =>
    product.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.name_tr?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setScrapedImageUrl("");
      setFormData({
        name_ar: product.name_ar,
        name_tr: product.name_tr || "",
        price: product.price,
        image_url: product.image_url,
        description_ar: product.description_ar || "",
        description_tr: product.description_tr || "",
        category: product.category,
        stock: product.stock,
        akakce_url: product.akakce_url || "",
        specifications: product.specifications || {},
      });
    } else {
      setEditingProduct(null);
      setScrapedImageUrl("");
      setFormData({
        name_ar: "",
        name_tr: "",
        price: 0,
        image_url: "",
        description_ar: "",
        description_tr: "",
        category: "ebike",
        stock: 1,
        akakce_url: "",
        specifications: {},
      });
    }
    setIsDialogOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const url = await uploadProductImage(file);
      if (url) {
        setFormData({ ...formData, image_url: url });
        setScrapedImageUrl(""); // Clear scraped image if manual is uploaded
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("Yükleme başarısız oldu.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFetchData = async () => {
    const url = formData.akakce_url;
    if (!url || (!url.includes("akakce.com") && !url.includes("cimri.com"))) {
      alert("Lütfen geçerli bir Akakçe veya Cimri bağlantısı girin");
      return;
    }

    setIsProcessing(true);
    try {
      const data = await api.products.scrape(url);

      if (data && data.success) {
        // Precise mapping for Swarder specific fields
        const specs = data.specifications || {};
        const power = specs["Motor Gücü"] || specs["Güç"] || specs["Power"] || "";
        const range = specs["Menzil"] || specs["Mesafe"] || specs["Range"] || "";
        const speed = specs["Maksimum Hız"] || specs["Hız"] || specs["Max Speed"] || "";
        const weight = specs["Ağırlık"] || specs["Weight"] || "";

        setFormData({
          ...formData,
          name_ar: data.name || formData.name_ar,
          name_tr: data.name || formData.name_tr,
          price: data.price || formData.price,
          description_ar: data.description || formData.description_ar,
          description_tr: data.description || formData.description_tr,
          specifications: specs,
          power: power,
          range: range,
          speed: speed,
          weight: weight,
        });
        
        if (data.image) {
          setScrapedImageUrl(data.image);
        }
        
        alert("Veriler başarıyla çekildi! Swarder özellikleri (Hız, Menzil, Güç) otomatik eşleştirildi.");
      } else {
        alert(data?.message || "Veri çekilemedi.");
      }
    } catch (error: any) {
      console.error("Fetch failed", error);
      alert(`Çekme işlemi başarısız: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final logic for image: if no manual upload, use the scraped one
    const finalData = { ...formData };
    if (!finalData.image_url && scrapedImageUrl) {
      finalData.image_url = scrapedImageUrl;
    }
    
    if (!finalData.image_url) {
      alert("Lütfen bir resim yükleyin veya bağlantı üzerinden veri çekin");
      return;
    }

    setIsProcessing(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id!, finalData);
      } else {
        await addProduct(finalData);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Submit failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      await deleteProduct(id);
    }
  };

  const handleRefreshPrice = async (product: Product) => {
    if (!product.akakce_url) return;
    
    setIsProcessing(true);
    try {
      const data = await api.products.scrape(product.akakce_url);

      if (data && data.success) {
        await updateProduct(product.id!, { price: data.price });
        alert("Fiyat başarıyla güncellendi!");
      } else {
        alert(data?.message || "Fiyat alınamadı.");
      }
    } catch (error: any) {
      console.error("Refresh failed", error);
      alert(`Fiyat güncellenemedi: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSyncAll = async () => {
    if (!window.confirm('Tüm ürün fiyatlarını senkronize etmek istiyor musunuz? Bu biraz zaman alabilir.')) {
      return;
    }

    setIsProcessing(true);
    try {
      const data = await api.products.syncAll();

      if (data && data.success) {
        window.location.reload(); 
        alert("Tüm fiyatlar başarıyla senkronize edildi!");
      } else {
        alert(data?.message || "Failed to sync all prices.");
      }
    } catch (error: any) {
      console.error("Sync all failed", error);
      alert(`Senkronizasyon başarısız: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ürün Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            Akakçe/Cimri bağlantılarını kullanarak ürün ekleyin ve düzenleyin
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSyncAll} 
            disabled={isProcessing}
            className="gap-2 border-primary/50 hover:bg-primary/5"
          >
            <TrendingUp className={`w-4 h-4 ${isProcessing ? 'animate-pulse' : ''}`} />
            Fiyatları Senkronize Et
          </Button>
          <Button onClick={() => handleOpenDialog()} className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4" />
            Ürün Ekle
          </Button>
          <Button variant="destructive" size="sm" onClick={() => {
            if(confirm('Tüm ürünleri sil?')) products.forEach(p => deleteProduct(p.id!));
          }}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border rounded-xl overflow-hidden glass-card">
        <Table>
          <TableHeader className="bg-secondary/10">
            <TableRow>
              <TableHead className="w-[80px]">Resim</TableHead>
              <TableHead>Adı</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-secondary/5 transition-colors">
                <TableCell>
                  <img src={product.image_url} alt={product.name_ar} className="w-12 h-12 object-cover rounded-lg border border-border/10" />
                </TableCell>
                <TableCell>
                  <div className="max-w-[300px]">
                    <div className="font-bold truncate" title={product.name_ar}>{product.name_ar}</div>
                    <div className="text-[10px] text-muted-foreground truncate opacity-70">{product.akakce_url || 'Manuel Eklendi'}</div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-primary font-bold">{product.price} TL</TableCell>
                <TableCell>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase">
                    {product.category}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)} className="h-8 w-8">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    {product.akakce_url && (
                      <Button variant="ghost" size="icon" onClick={() => handleRefreshPrice(product)} disabled={isProcessing} className="h-8 w-8">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id!)} className="h-8 w-8 hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground italic">
            Ürün bulunamadı
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border-primary/20 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black gradient-text">
              {editingProduct 
                ? 'Ürünü Düzenle'
                : 'Akıllı Ürün Ekleme'}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Tüm detayları ağdan çekmek için ürün bağlantısını yapıştırın
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 pt-4">
            {/* STEP 1: URL Fetch (PRIORITY) */}
            <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl space-y-3">
              <Label htmlFor="akakce_url" className="text-primary font-bold flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Ürün Bağlantısı (Akakçe / Cimri)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="akakce_url"
                  value={formData.akakce_url}
                  onChange={(e) => setFormData({ ...formData, akakce_url: e.target.value })}
                  placeholder="https://www.akakce.com/... veya https://www.cimri.com/..."
                  dir="ltr"
                  className="flex-1 bg-background shadow-inner"
                />
                <Button 
                  type="button" 
                  onClick={handleFetchData}
                  disabled={isProcessing || !formData.akakce_url}
                  className="shrink-0 gap-2"
                >
                  <TrendingUp className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                  Akıllı Veri Çekimi
                </Button>
              </div>
            </div>

            {/* STEP 2: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name_ar">Adı</Label>
                <Input
                  id="name_ar"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="price">Son Fiyat (TL)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="font-mono font-bold text-primary"
                  required
                />
              </div>
            </div>

            {/* STEP 3: Image Handling */}
            <div className="space-y-3 border-t pt-4">
              <Label className="font-bold flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                Ürün Fotoğrafı
              </Label>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-xl border-2 border-dashed border-primary/20 bg-secondary/10 overflow-hidden flex items-center justify-center">
                    {formData.image_url || scrapedImageUrl ? (
                      <img src={formData.image_url || scrapedImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Plus className="w-8 h-8 text-muted-foreground opacity-20" />
                    )}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  {(formData.image_url || scrapedImageUrl) && (
                     <div className="absolute -top-2 -right-2 bg-primary text-[8px] font-bold px-2 py-1 rounded-full text-primary-foreground shadow-lg">
                        {formData.image_url ? 'YEREL' : 'ÇEKİLDİ'}
                     </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <p className="text-[10px] text-muted-foreground">
                    Cihazınızdan yükleyin veya bağlantıdan çekilen fotoğrafı otomatik olarak kullanın.
                  </p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isProcessing}
                    className="cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 file:hover:bg-primary/90"
                  />
                  {scrapedImageUrl && formData.image_url && (
                    <Button 
                      type="button" 
                      variant="link" 
                      size="sm" 
                      onClick={() => setFormData({...formData, image_url: ''})} 
                      className="text-[10px] h-auto p-0"
                    >
                      Otomatik çekilen resme geri dön
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* STEP 4: Details & Stock */}
            <div className="grid grid-cols-2 gap-4 border-t pt-4">
              <div className="space-y-1.5">
                <Label>Kategori</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-background text-sm"
                >
                  <optgroup label="Swarder Bölümü">
                    <option value="ebike">Bisiklet (E-Bike)</option>
                    <option value="scooter">Scooter (Scooter)</option>
                    <option value="accessory">Bisiklet Aksesuarı (Accessory)</option>
                  </optgroup>
                  <optgroup label="Spark Peerless Bölümü">
                    <option value="smart_home">Akıllı Cihazlar (Smart Home)</option>
                    <option value="coffee">Kahve Makineleri (Coffee Machines)</option>
                    <option value="kitchen">Mutfak Aletleri (Kitchen)</option>
                    <option value="vacuum">Robot Süpürgeler (Robot Vacuums)</option>
                  </optgroup>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Mevcut Stok</Label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Açıklama</Label>
              <textarea
                value={formData.description_ar}
                onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-background min-h-[100px] text-sm"
                placeholder="Veri çekildiğinde otomatik doldurulacaktır..."
              />
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-border/10">
              <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} disabled={isProcessing}>
                İptal
              </Button>
              <Button type="submit" disabled={isProcessing} className="px-8 font-bold">
                {isProcessing 
                  ? 'İşleniyor...'
                  : editingProduct 
                    ? 'Ürünü Güncelle'
                    : 'Ürünü Kaydet'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
