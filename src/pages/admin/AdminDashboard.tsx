import { useState, useEffect } from "react";
import { Package, MessageSquare, Users, DollarSign, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { products, messages, settings, orders, visits } = useApp();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalMessages: 0,
    totalOrders: 0,
    totalVisitors: 0,
  });

  useEffect(() => {
    setStats({
      totalProducts: products.length,
      totalMessages: messages.length,
      totalOrders: orders.length,
      totalVisitors: visits.length,
    });
  }, [products, messages, orders, visits]);

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kontrol Paneli</h1>
          <p className="text-muted-foreground mt-1">
            Mağaza performansına genel bakış
          </p>
        </div>
        <Link to="/admin/products">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Ürün Ekle
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ürünler
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Geçen aydan +2
            </p>
          </CardContent>
        </Card>
        
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mesajlar
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{stats.totalMessages}</div>
              {messages.filter(m => !m.replied).length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-pulse">
                  {messages.filter(m => !m.replied).length}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {messages.filter(m => !m.replied).length} yeni mesajınız var
            </p>
          </CardContent>
        </Card>
        
        <Link to="/admin/orders">
          <Card className={`${orders.filter(o => o.status === 'pending').length > 0 ? 'ring-2 ring-primary bg-primary/5' : ''} transition-all`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Siparişler
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                {orders.filter(o => o.status === 'pending').length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-bounce">
                    {orders.filter(o => o.status === 'pending').length}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {orders.filter(o => o.status === 'pending').length} sipariş inceleme bekliyor
              </p>
            </CardContent>
          </Card>
        </Link>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ziyaretçiler
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisitors}</div>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <p className="text-[10px] text-green-500 font-medium">
                Hızla büyüyor
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/admin/products">
          <Card className="hover:bg-accent cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Ürün Yönetimi
              </CardTitle>
              <CardDescription>
                Ürün ekleyin, düzenleyin ve silin
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        
        <Link to="/admin/messages">
          <Card className="hover:bg-accent cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Gelen Mesajlar
              </CardTitle>
              <CardDescription>
                Müşteri mesajlarını görüntüleyin ve yanıtlayın
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Recent Activity & Top Pages */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
            <CardDescription>
              En son siparişler ve ürünler
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{order.product?.name_ar || 'Ürün'}</h4>
                    <p className="text-[10px] text-muted-foreground">{new Date(order.created_at || '').toLocaleDateString('tr-TR')}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                      order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {order.status === 'pending' ? 'Bekliyor' : 'Tamamlandı'}
                    </span>
                  </div>
                </div>
              ))}

              {products.slice(0, 2).map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg opacity-80">
                  <img src={product.image_url} alt={product.name_ar} className="w-10 h-10 object-cover rounded-md" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm truncate">{product.name_ar}</h4>
                    <p className="text-[10px] text-muted-foreground">{product.price} TL</p>
                  </div>
                </div>
              ))}
              
              {orders.length === 0 && products.length === 0 && (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Son aktivite yok
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>En Çok Ziyaret Edilen Sayfalar</CardTitle>
            <CardDescription>
              Ziyaret sayısına göre sayfa performansı
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(
                visits.reduce((acc, visit) => {
                  acc[visit.path] = (acc[visit.path] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              )
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([path, count], index) => {
                const percentage = Math.round((count / visits.length) * 100) || 0;
                return (
                  <div key={path} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium truncate ltr">{path}</span>
                      <span className="text-muted-foreground">{count} ziyaret</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500" 
                        style={{ width: `${percentage}%`, opacity: 1 - (index * 0.15) }}
                      />
                    </div>
                  </div>
                );
              })}
              
              {visits.length === 0 && (
                <p className="text-center text-muted-foreground py-8 text-sm">
                  Henüz ziyaret verisi yok
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
