# Spark - E-Bike Platform

منصة متكاملة لإدارة الدراجات الإلكترونية مع واجهة خلفية مبنية باستخدام Node.js و Supabase.

## 🚀 المميزات

- **مصادقة آمنة**: تسجيل دخول/تسجيل خروج عبر Supabase Auth
- **قاعدة بيانات سحابية**: Supabase PostgreSQL
- **API RESTful**: واجهات برمجية للمنتجات، الطلبات، الصيانة، والمزيد
- **أمان محسّن**: حماية المسارات والتوكنز
- **تحسين الأداء**: استعلامات فعالة مع Realtime support

## 📦 التثبيت والإعداد

### 1. تثبيت المكتبات

```bash
npm install
```

### 2. إعداد متغيرات البيئة

قم بنسخ ملف `.env.example` إلى `.env` وقم بتعبئة القيم:

```bash
cp .env.example .env
```

ثم قم بتحديث القيم في ملف `.env`:

```env
VITE_API_URL=https://spark-peerlees.onrender.com
PORT=5173
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. الحصول على مفاتيح Supabase

1. اذهب إلى [Supabase Dashboard](https://supabase.com/dashboard)
2. اختر مشروعك
3. اذهب إلى Settings → API
4. انسخ `Project URL` و `anon public key`

## 🏗️ بنية المشروع

```
src/
├── lib/
│   ├── supabase.ts      # إعداد عميل Supabase
│   ├── api.ts           # واجهات API الخارجية
│   └── auth.ts          # خدمات المصادقة وقاعدة البيانات
├── components/          # مكونات React
├── pages/              # صفحات التطبيق
├── hooks/              # Custom React hooks
└── contexts/           # React contexts
```

## 🔐 استخدام المصادقة

### تسجيل مستخدم جديد

```typescript
import { authService } from '@/lib/auth';

const result = await authService.signUp(
  'user@example.com',
  'password123',
  'Ahmed Mohamed'
);

if (result.error) {
  console.error(result.error);
} else {
  console.log('User created:', result.data);
}
```

### تسجيل الدخول

```typescript
const result = await authService.signIn(
  'user@example.com',
  'password123'
);
```

### الحصول على المستخدم الحالي

```typescript
const user = await authService.getCurrentUser();
```

## 🗄️ استخدام قاعدة البيانات

### جلب البيانات

```typescript
import { dbService } from '@/lib/auth';

const result = await dbService.fetch('products', {
  select: 'id, name, price',
  limit: 10
});
```

### إضافة سجل جديد

```typescript
const result = await dbService.insert('products', {
  name: 'E-Bike Pro',
  price: 999,
  stock: 50
});
```

### تحديث سجل

```typescript
const result = await dbService.update(
  'products',
  'product-id-here',
  { price: 899 }
);
```

### حذف سجل

```typescript
const result = await dbService.delete('products', 'product-id-here');
```

## 🔒 الأمان

- جميع طلبات API المحمية تتضمن توكن المصادقة تلقائياً
- استخدام Row Level Security (RLS) في Supabase
- التحقق من صحة البيانات قبل الإرسال

## 🎯 الخطوات التالية

1. **إعداد جداول Supabase**: قم بإنشاء الجداول في لوحة تحكم Supabase
2. **تفعيل RLS**: طبق سياسات الأمان على مستوى الصفوف
3. **تطوير المكونات**: استخدم الخدمات في مكونات React

## 📝 الترخيص

MIT License
