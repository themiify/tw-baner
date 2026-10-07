# دليل إنشاء مكوّن سلة من البداية حتى الاحتراف (Create Salla Component from Scratch)

هذا الدليل يشرح لك خطوة بخطوة كيفية إنشاء مكوّن جديد لمنصة سلة (**Salla Twilight Component Bundle**) من الصفر، بدءاً من التهيئة (Init) وحتى تشغيل المعاينة المباشرة والبناء النهائي.

---

## الفهرس
1. [المتطلبات الأساسية (Prerequisites)](#1-المتطلبات-الأساسية)
2. [الخطوة 1: تهيئة المشروع الجديد (Project Initialization)](#2-الخطوة-1-تهيئة-المشروع-الجديد)
3. [الخطوة 2: هيكل المجلدات والملفات (Directory Structure)](#3-الخطوة-2-هيكل-المجلدات-والملفات)
4. [الخطوة 3: تعريف الحزمة وإعدادات لوحة التحكم (`twilight-bundle.json`)](#4-الخطوة-3-تعريف-الحزمة-وإعدادات-لوحة-التحكم)
5. [الخطوة 4: إنشاء القالب الافتراضي (`starter-template.json`)](#5-الخطوة-4-إنشاء-القالب-الافتراضي)
6. [الخطوة 5: برمجة المكوّن باستخدام Lit (`index.ts`)](#6-الخطوة-5-برمجة-المكوّن-باستخدام-lit)
7. [الخطوة 6: تصميم وتنسيق المكوّن (`styles.ts`)](#7-الخطوة-6-تصميم-وتنسيق-المكوّن)
8. [الخطوة 7: تسجيل المكوّن في نظام سلة (Registration)](#8-الخطوة-7-تسجيل-المكوّن-في-نظام-سلة)
9. [الخطوة 8: إعدادات Vite للبناء (`vite.config.ts`)](#9-الخطوة-8-إعدادات-vite-للبناء)
10. [الخطوة 9: التشغيل، المعاينة المباشرة، والبناء النهائي](#10-الخطوة-9-التشغيل-المعاينة-المباشرة-والبناء-النهائي)
11. [أهم أسرار ومشاكل مكوّنات سلة وحلولها (Best Practices & Gotchas)](#11-أهم-أسرار-ومشاكل-مكوّنات-سلة-وحلولها)

---

## 1. المتطلبات الأساسية

تأكد من تثبيت الأدوات التالية على جهازك:
- **Node.js**: الإصدار 18 أو 20 فما فوق.
- **مدير الحزم**: يُفضل استخدام `pnpm` أو `npm`.
- **Git** مثبت على الجهاز.

---

## 2. الخطوة 1: تهيئة المشروع الجديد (Project Initialization)

يمكنك إنشاء مكوّن سلة جديد بطريقتين:

### الطريقة الأولى: عبر أمر Salla CLI الرسمي
```bash
npx @salla.sa/twilight-bundles init my-new-component
```
أو إذا كنت تستخدم `pnpm`:
```bash
pnpm create @salla.sa/twilight-bundle my-new-component
```

### الطريقة الثانية: إعداد المجلد يدوياً
إذا أردت إنشاء المشروع بنفسك خطوة بخطوة:
```bash
mkdir tw-baner
cd tw-baner
pnpm init
```
ثم قم بتثبيت التبعيات الأساسية:
```bash
pnpm add lit
pnpm add -D @salla.sa/twilight-bundles vite typescript
```

---

## 3. الخطوة 2: هيكل المجلدات والملفات (Directory Structure)

يجب أن تتبع بنية المجلدات معايير سلة الموضحة في [توثيق سلة الرسمي](https://docs.salla.dev/rem-component-bundle/directory-structure):

```
my-component-bundle/
├── src/
│   └── components/
│       └── promo-banner/            # اسم المكوّن (kebab-case)
│           ├── index.ts             # منطق المكوّن وربط Lit
│           ├── styles.ts            # تنسيقات CSS والمتغيرات
│           └── types.ts             # واجهات TypeScript
├── templates/
│   └── starter-template.json        # البيانات الافتراضية الأولية
├── twilight-bundle.json              # العقد الأساسي مع لوحة تخصيص سلة
├── vite.config.ts                   # إعدادات Vite
├── package.json
└── tsconfig.json
```

---

## 4. الخطوة 3: تعريف الحزمة وإعدادات لوحة التحكم (`twilight-bundle.json`)

ملف **`twilight-bundle.json`** هو قلب المكوّن؛ فهو الذي يحدد الحقول والسويتشات التي يراها التاجر في لوحة التحكم في سلة.

### مثال متكامل لملف `twilight-bundle.json`:

```json
{
  "name": "salla-promo-banner",
  "version": "1.0.0",
  "title": {
    "ar": "البانر الترويجي الفاخر",
    "en": "Luxury Promo Banner"
  },
  "description": {
    "ar": "بانر متحرك تفاعلي يدعم الفيديو والصور والعداد التنازلي وكوبونات الخصم",
    "en": "Interactive banner with video, image, countdown, and coupons"
  },
  "category": "banners",
  "components": [
    {
      "name": "promo-banner",
      "tag": "salla-promo-banner",
      "title": {
        "ar": "بانر ترويجي",
        "en": "Promo Banner"
      },
      "settings": [
        {
          "id": "height_desktop",
          "key": "height_desktop",
          "type": "number",
          "format": "range",
          "label": "ارتفاع البانر للشاشات الكبيرة (vh)",
          "min": 50,
          "max": 100,
          "step": 1,
          "value": 92
        },
        {
          "id": "slider_autoplay",
          "key": "slider_autoplay",
          "type": "boolean",
          "format": "switch",
          "label": "تشغيل التبديل التلقائي",
          "value": true
        },
        {
          "id": "slides",
          "key": "slides",
          "type": "collection",
          "label": "الشرائح الترويجية",
          "minLength": 1,
          "maxLength": 10,
          "fields": [
            {
              "id": "title",
              "key": "title",
              "type": "string",
              "format": "text",
              "label": "عنوان الشريحة",
              "required": true
            },
            {
              "id": "bg_type",
              "key": "bg_type",
              "type": "items",
              "format": "dropdown-list",
              "label": "نوع الخلفية",
              "options": [
                { "key": "video", "value": "video", "label": "فيديو" },
                { "key": "image", "value": "image", "label": "صورة" },
                { "key": "color", "value": "color", "label": "لون" }
              ],
              "value": "image"
            },
            {
              "id": "bg_image",
              "key": "bg_image",
              "type": "string",
              "format": "image",
              "label": "صورة الخلفية"
            },
            {
              "id": "coupon_enabled",
              "key": "coupon_enabled",
              "type": "boolean",
              "format": "switch",
              "label": "تفعيل كود الخصم",
              "value": true
            },
            {
              "id": "coupon_code",
              "key": "coupon_code",
              "type": "string",
              "format": "text",
              "label": "رمز الكوبون"
            },
            {
              "id": "countdown_enabled",
              "key": "countdown_enabled",
              "type": "boolean",
              "format": "switch",
              "label": "تفعيل العداد التنازلي",
              "value": false
            },
            {
              "id": "countdown_end",
              "key": "countdown_end",
              "type": "string",
              "format": "datetime",
              "inputType": "date",
              "label": "تاريخ انتهاء العرض"
            }
          ]
        }
      ]
    }
  ],
  "templates": [
    {
      "id": "starter-template",
      "path": "templates.starter-template",
      "is_default": true
    }
  ]
}
```

---

## 5. الخطوة 4: إنشاء القالب الافتراضي (`templates/starter-template.json`)

عندما يضيف التاجر المكوّن لأول مرة في متجره، تقوم سلة بقراءة ملف **`starter-template.json`** لملء الحقول بالبيانات الأولية.

### مثال للملف:
```json
{
  "height_desktop": 92,
  "slider_autoplay": true,
  "slides": [
    {
      "title": {
        "ar": "أقوى عروض الموسم",
        "en": "Season Mega Deals"
      },
      "bg_type": "image",
      "bg_image": "https://picsum.photos/1920/1080",
      "coupon_enabled": true,
      "coupon_code": "OFFER50",
      "countdown_enabled": true,
      "countdown_end": "2026-12-31 23:59:00"
    }
  ]
}
```

---

## 6. الخطوة 5: برمجة المكوّن باستخدام Lit (`src/components/promo-banner/index.ts`)

نستخدم مكتبة **Lit** لأنها خفيفة وسريعة وتعتمد على معايير المتصفح القياسية (Web Components).

### كود البداية الأساسي:

```typescript
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bannerStyles } from './styles';
import { PromoBannerConfig, BannerSlide } from './types';

export class PromoBanner extends LitElement {
  // ربط ملف التنسيقات مع Shadow DOM
  static styles = bannerStyles;

  // استقبال الإعدادات من منصة سلة تلقائياً
  @property({ type: Object })
  config: PromoBannerConfig = {};

  // الحالة التفاعلية الداخلية للمكوّن
  @state() private currentSlideIndex = 0;
  @state() private isCopied = false;

  // دورة حياة المكوّن عند اتصاله بصفحة المتجر
  connectedCallback() {
    super.connectedCallback();
    this.startTimers();
  }

  // تنظيف المؤقتات عند إزالة المكوّن لمنع تسريب الذاكرة
  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopTimers();
  }

  private startTimers() {
    // تشغيل العدادات والتبديل التلقائي هنا
  }

  private stopTimers() {
    // إيقاف الـ setInterval
  }

  // دالة الرسم الأساسية
  render() {
    const slides = this.config.slides || [];
    if (!slides.length) return html`<div>لا توجد شرائح مضافة</div>`;

    return html`
      <div class="tw-slider-container">
        ${slides.map((slide, index) => this.renderSlide(slide, index === this.currentSlideIndex))}
      </div>
    `;
  }

  private renderSlide(slide: BannerSlide, isActive: boolean) {
    return html`
      <div class="slide-item ${isActive ? 'active' : ''}">
        <h2>${slide.title}</h2>
      </div>
    `;
  }
}
```

---

## 7. الخطوة 6: تصميم وتنسيق المكوّن (`styles.ts`)

يتم كتابة التنسيقات باستخدام `css` tagged template من Lit:

```typescript
import { css } from 'lit';

export const bannerStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: system-ui, -apple-system, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .tw-slider-container {
    position: relative;
    width: 100%;
    height: var(--banner-height-desktop, 90vh);
    overflow: hidden;
    background: #000000;
  }

  /* الزر الفاخر وتأثير الهافر المندفع من أقصى اليمين لليسار */
  .luxury-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    padding: 0 2rem;
    height: 52px;
    border-radius: 9999px;
    text-decoration: none;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
    /* تسريع العتاد لمنع تكسر الحواف الدائرية */
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
    background: var(--banner-cta-bg, #ffffff);
    color: var(--banner-cta-text, #000000);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.35, 1);
  }

  /* الهافر: متمركز في أقصى اليمين */
  .luxury-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: var(--banner-cta-hover-bg, #f59e0b);
    transform: translateX(101%);
    will-change: transform;
    transition: transform 0.48s cubic-bezier(0.25, 1, 0.35, 1);
    z-index: 1;
    pointer-events: none;
  }

  /* عند مرور الماوس: يندفع نحو اليسار */
  .luxury-btn:hover::before {
    transform: translateX(0);
  }

  .luxury-btn > span {
    position: relative;
    z-index: 2;
  }
`;
```

---

## 8. الخطوة 7: تسجيل المكوّن في نظام سلة (Registration)

في نهاية ملف `index.ts`، **يجب** تسجيل المكوّن في نظام سلة ونظام المتصفح:

```typescript
// 1. التسجيل في نظام سلة الرسمي (Twilight Component Registry)
if (typeof (HTMLElement as any).registerSallaComponent === 'function') {
  (PromoBanner as any).registerSallaComponent('salla-promo-banner');
}

// 2. التسجيل في معيار المتصفح القياسي (Custom Elements API)
if (!customElements.get('promo-banner')) {
  customElements.define('promo-banner', PromoBanner);
}
```

> [!IMPORTANT]
> يجب أن يتطابق الاسم `salla-promo-banner` مع وسم `"tag"` المحدد في `twilight-bundle.json`.

---

## 9. الخطوة 8: إعدادات Vite للبناء (`vite.config.ts`)

ملف Vite يقوم بدمج المكوّن وحزمته للمعاينة والإنتاج:

```typescript
import { defineConfig } from 'vite';
import twilightBundle from '@salla.sa/twilight-bundles/vite-plugin';

export default defineConfig({
  plugins: [
    twilightBundle()
  ],
  build: {
    target: 'esnext',
    outDir: 'dist',
    lib: {
      entry: 'src/components/promo-banner/index.ts',
      formats: ['es'],
      fileName: 'promo-banner'
    }
  }
});
```

---

## 10. الخطوة 9: التشغيل، المعاينة المباشرة، والبناء النهائي

### 1. تشغيل بيئة التطوير والمعاينة الحية:
```bash
pnpm run dev
```
سيفتح لك خادم Vite المحلي (عادةً على `http://localhost:5173/`).
يمكنك تجربة وتعديل حقول المكوّن ومشاهدة التأثير فوراً مع دعم الـ Hot Module Replacement (HMR).

### 2. فحص وبناء المكوّن للإنتاج:
```bash
pnpm run build
```
يقوم هذا الأمر بتجميع ملفات TypeScript و CSS في ملف نهائي فائق الخفة والسرعة داخل مجلد `dist/`.

---

## 11. أهم أسرار ومشاكل مكوّنات سلة وحلولها (Best Practices & Gotchas)

### 1. التعامل مع قيم الـ Switch في سلة
في لوحة سلة، قد ترسل السويتشات قيماً كـ `false` أو `"false"` أو `0` أو `null`. لذلك أنشئ دالة مساعدة لتقييمها بأمان:
```typescript
function isSwitchOn(val: any, defaultVal: boolean = true): boolean {
  if (val === undefined || val === null) return defaultVal;
  if (val === false || val === 'false' || val === 0 || val === '0' || val === '' || val === 'off') {
    return false;
  }
  return Boolean(val);
}
```

### 2. قراءة النصوص ثنائية اللغة (Arabic / English)
التاجر في سلة قد يدخل النص كنص عادي (`string`) أو ككائن مترجم (`{ ar: "...", en: "..." }`). تعامل مع الحالتين:
```typescript
function getLocalized(val: any, isLtr: boolean, fallback = ''): string {
  if (!val) return fallback;
  if (typeof val === 'object' && !Array.isArray(val)) {
    const lang = isLtr ? 'en' : 'ar';
    return val[lang] || val.ar || val.en || fallback;
  }
  return String(val);
}
```

### 3. دعم منتقي التواريخ في العداد التنازلي
عندما يختار التاجر تاريخاً عبر منتقي التاريخ في سلة (`YYYY-MM-DD`)، استهدف دائماً نهاية ذلك اليوم (`23:59:59`) وليس بدايته (`00:00:00`)، حتى لا ينتهي العرض في الظهيرة بشكل مفاجئ.

### 4. اتجاه الأسهم حسب اللغة وليس اتجاه المتجر فقط
إذا كتب التاجر زراً بالإنجليزية `Claim Offer Now` في متجر عربي، افحص محتوى النص بالـ Regex:
```typescript
const isEnglish = /[a-zA-Z]/.test(text) && !/[\u0600-\u06FF]/.test(text);
const arrow = isEnglish ? '→' : '←';
```

---
*هذا الدليل يمثل المرجع العملي المتكامل لإنشاء أي مكوّن جديد باحترافية على منصة سلة.*
