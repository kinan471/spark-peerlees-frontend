import { useState } from "react";
import { Package, CheckCircle2, XCircle, Search, Phone, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useApp, Order } from "@/contexts/AppContext";
import { toast } from "sonner";

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      (order.product?.name_ar || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (id: string, status: Order['status']) => {
    try {
      await updateOrderStatus(id, status);
      toast.success("Sipariş durumu güncellendi");
    } catch (error) {
      toast.error("Güncelleme başarısız");
    }
  };

  const statusColors = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  const statusLabels: Record<string, string> = {
    pending: "Bekliyor",
    processing: "İşleniyor",
    completed: "Tamamlandı",
    cancelled: "İptal Edildi",
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sipariş Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            Gelen müşteri siparişlerini takip edin ve yönetin
          </p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-xs font-bold text-primary">
            {orders.length} Toplam Sipariş
          </span>
          <span className="flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-full text-xs font-bold text-amber-700">
            {orders.filter(o => o.status === 'pending').length} Bekliyor
          </span>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ad veya ürüne göre ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={statusFilter === 'all' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setStatusFilter('all')}
              >
                Tümü
              </Button>
              <Button 
                variant={statusFilter === 'pending' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setStatusFilter('pending')}
                className="text-amber-600 border-amber-200"
              >
                Bekliyor
              </Button>
              <Button 
                variant={statusFilter === 'completed' ? 'default' : 'outline'} 
                size="sm" 
                onClick={() => setStatusFilter('completed')}
                className="text-green-600 border-green-200"
              >
                Tamamlandı
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-right">Ürün</th>
                  <th className="px-4 py-3 text-right">Müşteri</th>
                  <th className="px-4 py-3 text-right">Tarih</th>
                  <th className="px-4 py-3 text-right">Durum</th>
                  <th className="px-4 py-3 text-center">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4 text-right font-medium">
                      <div className="flex items-center gap-3 justify-end">
                        <span className="truncate max-w-[150px]">{order.product?.name_ar || 'Ürün Silindi'}</span>
                        <div className="w-10 h-10 rounded bg-muted/50 overflow-hidden flex-shrink-0">
                          {order.product?.image_url ? (
                            <img src={order.product.image_url} alt="product" className="w-full h-full object-cover" />
                          ) : <Package className="w-full h-full p-2 text-muted-foreground" />}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold flex items-center gap-1">
                          {order.customer_name} <User className="w-3 h-3" />
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          {order.customer_phone} <Phone className="w-3 h-3" />
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-xs">
                      <div className="flex items-center justify-end gap-1">
                        {new Date(order.created_at || '').toLocaleDateString('tr-TR')}
                        <Calendar className="w-3 h-3" />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${statusColors[order.status]}`}>
                        {statusLabels[order.status] || order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {order.status === 'pending' && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleStatusUpdate(order.id!, 'completed')}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleStatusUpdate(order.id!, 'cancelled')}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Eşleşen sipariş bulunamadı</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
