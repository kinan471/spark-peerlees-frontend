import { useState } from "react";
import { MessageSquare, Reply, Search, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApp } from "@/contexts/AppContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminMessages = () => {
  const { messages, settings, markMessageAsRead } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const filteredMessages = messages.filter(msg =>
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewMessage = (message: typeof messages[0]) => {
    setSelectedMessage(message);
    setReplyText("");
    setIsDialogOpen(true);
    if (!message.is_read && message.id) {
      markMessageAsRead(message.id);
    }
  };

  const handleSendReply = () => {
    if (!selectedMessage || !replyText) return;
    
    const clientPhone = selectedMessage.phone ? selectedMessage.phone.replace(/\D/g, "") : "";
    
    if (!clientPhone) {
      alert("Bu müşteri için WhatsApp üzerinden yanıt verecek telefon numarası bulunamadı.");
      return;
    }

    const whatsappUrl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(
      `Merhaba ${selectedMessage.name},\n\n${replyText}\n\n--\n${settings.siteName} Ekibi`
    )}`;
    
    window.open(whatsappUrl, '_blank');
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Gelen Mesajlar</h1>
        <p className="text-muted-foreground mt-1">
          Müşteri mesajlarını görüntüleyin ve yanıtlayın
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Mesajlarda ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Messages Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Gönderen</TableHead>
              <TableHead>Konu</TableHead>
              <TableHead>Mesaj</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((msg) => (
              <TableRow key={msg.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{msg.name}</div>
                      <div className="text-xs text-muted-foreground">{msg.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{msg.subject}</TableCell>
                <TableCell className="max-w-xs truncate">{msg.message}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {msg.created_at ? new Date(msg.created_at).toLocaleDateString('tr-TR') : '-'}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewMessage(msg)}
                    className="gap-2"
                  >
                    <Reply className="w-4 h-4" />
                    Yanıtla
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredMessages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
            Mesaj bulunamadı
          </div>
        )}
      </div>

      {/* View/Reply Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mesaj Detayları</DialogTitle>
            <DialogDescription>
              Mesaj detaylarını görüntüleyin ve WhatsApp üzerinden yanıtlayın
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Ad Soyad
                  </label>
                  <p className="text-sm bg-muted p-2 rounded-md">{selectedMessage.name}</p>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    E-posta
                  </label>
                  <p className="text-sm bg-muted p-2 rounded-md">{selectedMessage.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Konu</label>
                <p className="text-sm bg-muted p-2 rounded-md">{selectedMessage.subject}</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Mesaj</label>
                <p className="text-sm bg-muted p-3 rounded-md whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  WhatsApp ile Yanıtla
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Yanıtınızı buraya yazın..."
                  className="w-full px-3 py-2 border rounded-md bg-background min-h-[100px]"
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                  Kapat
                </Button>
                <Button onClick={handleSendReply} disabled={!replyText.trim()} className="gap-2">
                  <Reply className="w-4 h-4" />
                  Yanıt Gönder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
