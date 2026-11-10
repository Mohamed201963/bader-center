# مركز بدر للأدوات الصحية — نسخة النشر

مشروع Vite ثابت (static) يحتوي برنامج الكاشير الحالي بكل وظائفه وتصميمه دون تغيير في المنطق.

## تشغيل محلي
```bash
npm install
npm run dev      # تجربة محلية
npm run build    # ينتج مجلد dist
```
يلزم Node 18 أو أحدث.

## الرفع على GitHub
1. أنشئ مستودعًا جديدًا على github.com (اجعله Private).
2. من مجلد المشروع:
```bash
git init
git add .
git commit -m "Bader POS first deploy"
git branch -M main
git remote add origin https://github.com/USERNAME/bader-center.git
git push -u origin main
```
ملف `.gitignore` يمنع رفع `node_modules` و`.env`.

## النشر على Vercel
1. ادخل vercel.com وسجّل بحساب GitHub.
2. Add New > Project > اختر المستودع > Import.
3. الإعدادات تُقرأ من `vercel.json` (Build: `npm run build`، Output: `dist`). اضغط Deploy.
4. ستحصل على رابط عام مثل `https://bader-center.vercel.app` يعمل على الكمبيوتر والموبايل. كل `git push` على `main` ينشر نسخة جديدة تلقائيًا.

## ربط Supabase (مرحلة لاحقة — غير منفذة بعد)
1. أنشئ مشروعًا على supabase.com.
2. من Project Settings > API انسخ `Project URL` و`anon public key`.
3. محليًا: انسخ `.env.example` إلى `.env.local` وضع القيمتين.
4. في Vercel: Settings > Environment Variables وأضف `VITE_SUPABASE_URL` و`VITE_SUPABASE_ANON_KEY` ثم Redeploy.
5. نفّذ مخطط الجداول وسياسات RLS ودوال المعاملات من SQL Editor (لم يُكتب بعد)، ثم يُستبدل التخزين المحلي في الكود بنداءات Supabase.
6. مفتاح `service_role` سري: لا يوضع في الواجهة ولا في GitHub أبدًا.

## الفرق بين الواجهة المنشورة وقاعدة البيانات
- **الواجهة (Vercel):** ملفات HTML/JS/CSS تُحمَّل في متصفح كل مستخدم. هي الشكل والأزرار فقط.
- **قاعدة البيانات (Supabase):** المكان الوحيد الذي يجب أن تُحفظ فيه الفواتير والمخزون والعملاء والحسابات، مع تسجيل الدخول والصلاحيات.
- **الوضع الحالي:** لا يوجد ربط. البيانات تُحفظ في `localStorage` داخل متصفح كل جهاز، فمبيعات الكمبيوتر لا تظهر على الموبايل، وتضيع بمسح بيانات المتصفح.

## تحذير: غير جاهز للاستخدام التجاري
- حسابات الدخول (admin / 1234 وahmed / 1111) مكتوبة داخل الكود وتظهر لأي زائر للرابط العام.
- لا توجد صلاحيات حقيقية ولا حماية للمخزون أو الفواتير من جهة الخادم.
- لا تدخل بيانات حقيقية قبل: ربط Supabase، تسجيل دخول حقيقي، دالة فاتورة ذرية، RLS، ثم اختبار الفواتير والمخزون والصلاحيات.
- بدّل أي كلمات مرور تجريبية، ويُفضّل جعل المستودع Private وعدم نشر الرابط قبل ذلك.
