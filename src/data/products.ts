export interface Product {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  image: string;
  category: "ebike" | "scooter" | "mountain" | "accessory";
  categoryLabel: string;
  rating: number;
  isNew?: boolean;
  brand: string;
  specs: {
    battery: string;
    range: string;
    speed: string;
    weight: string;
    motor: string;
    chargeTime: string;
  };
  description: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: "city-pro-1",
    name: "City Pro Elektrikli Bisiklet",
    price: "₺15,990",
    priceNum: 15990,
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=450&fit=crop",
    category: "ebike",
    categoryLabel: "Elektrikli Bisikletler",
    rating: 5,
    isNew: true,
    brand: "CityRide",
    specs: {
      battery: "48V 13Ah Lityum",
      range: "60-80 km",
      speed: "25 km/s",
      weight: "22 kg",
      motor: "350W Fırçasız",
      chargeTime: "4-5 saat",
    },
    description: "Şehir içi günlük kullanım için ideal elektrikli bisiklet. Tek şarjda 80 km'ye kadar menzil sunan yüksek performanslı lityum bataryalı şık ve hafif tasarım.",
    images: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "xiaomi-pro-2",
    name: "Xiaomi Pro 2 Scooter",
    price: "₺8,490",
    priceNum: 8490,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=450&fit=crop",
    category: "scooter",
    categoryLabel: "Elektrikli Scooterlar",
    rating: 4,
    isNew: true,
    brand: "Xiaomi",
    specs: {
      battery: "36V 12.8Ah",
      range: "45 km",
      speed: "25 km/s",
      weight: "14.2 kg",
      motor: "300W",
      chargeTime: "8.5 saat",
    },
    description: "Dünyanın en çok satan Xiaomi scooter'ı. Çift fren sistemi ve güçlü ön LED aydınlatmalı katlanabilir tasarım.",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604868189265-219ba935035e?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "mountain-x1",
    name: "X1 Elektrikli Dağ Bisikleti",
    price: "₺22,500",
    priceNum: 22500,
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=450&fit=crop",
    category: "mountain",
    categoryLabel: "Dağ Bisikletleri",
    rating: 5,
    brand: "TrailMax",
    specs: {
      battery: "48V 17.5Ah",
      range: "80-120 km",
      speed: "32 km/s",
      weight: "26 kg",
      motor: "750W Orta Tahrik",
      chargeTime: "5-6 saat",
    },
    description: "Engebeli araziler için tasarlanmış elektrikli dağ bisikleti. Gelişmiş ön ve arka süspansiyon sistemiyle güçlü 750W motor.",
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "ninebot-max",
    name: "Segway Ninebot Max Scooter",
    price: "₺12,990",
    priceNum: 12990,
    image: "https://images.unsplash.com/photo-1604868189265-219ba935035e?w=600&h=450&fit=crop",
    category: "scooter",
    categoryLabel: "Elektrikli Scooterlar",
    rating: 4,
    brand: "Segway-Ninebot",
    specs: {
      battery: "36V 15.3Ah",
      range: "65 km",
      speed: "30 km/s",
      weight: "19.1 kg",
      motor: "350W",
      chargeTime: "6 saat",
    },
    description: "Ninebot Max, 10 inç delinme dirençli lastikleri ve sağlam yapısıyla kategorisinde en uzun menzili sunar.",
    images: [
      "https://images.unsplash.com/photo-1604868189265-219ba935035e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "urban-fold",
    name: "Katlanabilir Elektrikli Bisiklet",
    price: "₺11,200",
    priceNum: 11200,
    image: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=600&h=450&fit=crop",
    category: "ebike",
    categoryLabel: "Elektrikli Bisikletler",
    rating: 4,
    brand: "UrbanFold",
    specs: {
      battery: "36V 10Ah",
      range: "40-55 km",
      speed: "25 km/s",
      weight: "18 kg",
      motor: "250W",
      chargeTime: "3-4 saat",
    },
    description: "Dar alanlarda saklama için ideal katlanabilir elektrikli bisiklet. Hafif ve taşıması kolay.",
    images: [
      "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "turbo-s",
    name: "Turbo S Elektrikli Scooter",
    price: "₺18,750",
    priceNum: 18750,
    image: "https://images.unsplash.com/photo-1659019063004-40be820e0379?w=600&h=450&fit=crop",
    category: "scooter",
    categoryLabel: "Elektrikli Scooterlar",
    rating: 5,
    isNew: true,
    brand: "TurboRide",
    specs: {
      battery: "48V 20Ah",
      range: "70-90 km",
      speed: "45 km/s",
      weight: "23 kg",
      motor: "800W Çift Motor",
      chargeTime: "7 saat",
    },
    description: "Çift motorlu ve büyük bataryalı yüksek performanslı elektrikli scooter. Uzun yolculuklar ve hızlı şehir içi ulaşım için ideal.",
    images: [
      "https://images.unsplash.com/photo-1659019063004-40be820e0379?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604868189265-219ba935035e?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "helmet-pro",
    name: "LED Işıklı Akıllı Kask",
    price: "₺1,290",
    priceNum: 1290,
    image: "https://images.unsplash.com/photo-1557803175-2dfee6fe7564?w=600&h=450&fit=crop",
    category: "accessory",
    categoryLabel: "Aksesuarlar",
    rating: 4,
    brand: "SafeRide",
    specs: {
      battery: "USB Şarjlı",
      range: "20 saat aydınlatma",
      speed: "-",
      weight: "350 gram",
      motor: "-",
      chargeTime: "2 saat",
    },
    description: "Arka ve ön LED aydınlatma ile kablosuz dönüş sinyallerine sahip akıllı kask. Modern tasarımda gelişmiş koruma.",
    images: [
      "https://images.unsplash.com/photo-1557803175-2dfee6fe7564?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "lock-smart",
    name: "Hırsızlık Önleyici Akıllı Kilit",
    price: "₺890",
    priceNum: 890,
    image: "https://images.unsplash.com/photo-1582639590011-532f7b7b5c02?w=600&h=450&fit=crop",
    category: "accessory",
    categoryLabel: "Aksesuarlar",
    rating: 5,
    isNew: true,
    brand: "LockTech",
    specs: {
      battery: "6 Aylık Dahili Batarya",
      range: "-",
      speed: "-",
      weight: "1.2 kg",
      motor: "-",
      chargeTime: "3 saat",
    },
    description: "Bluetooth ve parmak izi ile çalışan akıllı kilit, 110 dB entegre alarm ile. Elektrikli aracınız için maksimum güvenlik.",
    images: [
      "https://images.unsplash.com/photo-1582639590011-532f7b7b5c02?w=800&h=600&fit=crop",
    ],
  },
];

export const categories = [
  { id: "all", label: "Tümü" },
  { id: "ebike", label: "Elektrikli Bisikletler" },
  { id: "scooter", label: "Elektrikli Scooterlar" },
  { id: "mountain", label: "Dağ Bisikletleri" },
  { id: "accessory", label: "Aksesuarlar" },
];
