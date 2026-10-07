import { html, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { bannerStyles } from './styles';
import { PromoBannerConfig, BannerSlide } from './types';

export default class PromoBanner extends LitElement {
  @property({ type: Object })
  config?: PromoBannerConfig;

  @state()
  private currentSlideIndex = 0;

  @state()
  private isPaused = false;

  @state()
  private isCopied = false;

  @state()
  private showToast = false;

  @state()
  private toastMessage = '';

  @state()
  private autoplayProgress = 0;

  @state()
  private countdownState: Record<
    number,
    { days: number; hours: number; minutes: number; seconds: number; isExpired: boolean }
  > = {};

  private autoplayTimer?: number;
  private progressTimer?: number;
  private countdownTimer?: number;

  static styles = bannerStyles;

  connectedCallback(): void {
    super.connectedCallback();
    this.startAutoplay();
    this.startCountdownLoop();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopAutoplay();
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  protected updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('config')) {
      this.currentSlideIndex = 0;
      this.autoplayProgress = 0;
      this.startAutoplay();
      this.updateCountdowns();
    }
  }

  // Robust value extractor for Salla Form Builder fields (handles array of selected objects or strings)
  private getVal(v: any, fallback: string = ''): string {
    if (v === undefined || v === null) return fallback;
    if (typeof v === 'string') return v;
    if (Array.isArray(v) && v.length > 0) {
      if (typeof v[0] === 'object' && v[0] !== null) {
        return v[0].value !== undefined ? String(v[0].value) : (v[0].key ? String(v[0].key) : fallback);
      }
      return String(v[0]);
    }
    if (typeof v === 'object' && v.value !== undefined) {
      return String(v.value);
    }
    return fallback;
  }

  // Direction & Language detection (checks dir="ltr", dir="rtl", lang="en"/"ar", or localStorage)
  private get isLtr(): boolean {
    const savedLang = (typeof localStorage !== 'undefined' ? localStorage.getItem('salla_demo_lang') : '') || '';
    if (savedLang === 'en') return true;
    if (savedLang === 'ar') return false;
    const docDir = (document.documentElement.getAttribute('dir') || document.body?.getAttribute('dir') || '').toLowerCase();
    const docLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
    if (docDir === 'ltr') return true;
    if (docDir === 'rtl') return false;
    return docLang.startsWith('en');
  }

  private isTextEnglish(text: string): boolean {
    if (!text || typeof text !== 'string') return false;
    if (/[\u0600-\u06FF\u0750-\u077F]/.test(text)) return false;
    return /[a-zA-Z]/.test(text);
  }

  private get currentLang(): 'ar' | 'en' {
    return this.isLtr ? 'en' : 'ar';
  }

  // Extract multilingual text based on current language/direction
  private getLocalized(val: any, fallback: string = ''): string {
    if (val === undefined || val === null) return fallback;
    if (typeof val === 'object' && !Array.isArray(val)) {
      const lang = this.currentLang;
      if (val[lang]) return String(val[lang]);
      if (lang === 'en' && val.en) return String(val.en);
      if (lang === 'ar' && val.ar) return String(val.ar);
      if (val.ar) return String(val.ar);
      if (val.en) return String(val.en);
      const firstKey = Object.keys(val)[0];
      return firstKey ? String(val[firstKey]) : fallback;
    }
    if (Array.isArray(val)) {
      return this.getVal(val, fallback);
    }
    return String(val);
  }

  // Viewport Height (vh) evaluator
  private parseHeight(val: any, fallback: string): string {
    if (!val) return fallback;
    const s = String(val).trim();
    if (s.endsWith('vh') || s.endsWith('px') || s.endsWith('%')) return s;
    const num = parseFloat(s);
    if (isNaN(num)) return fallback;
    if (num <= 100) return `${num}vh`;
    return `${num}px`;
  }

  // Robust switch evaluator (handles false, "false", 0, "0", "", null)
  private isSwitchOn(val: any, defaultVal: boolean = true): boolean {
    if (val === undefined || val === null) return defaultVal;
    if (val === false || val === 'false' || val === 0 || val === '0' || val === '' || val === 'off') {
      return false;
    }
    return Boolean(val);
  }

  private getEffectiveSlides(): BannerSlide[] {
    const rawSlides = this.config?.slides;
    if (Array.isArray(rawSlides) && rawSlides.length > 0) {
      return rawSlides;
    }

    // Default ultra-luxury fashion slides with full Arabic & English translations
    return [
      {
        bg_type: 'video',
        bg_video_url:
          'https://clothing-preset-volume.myshopify.com/cdn/shop/videos/c/vp/8a682a7e04ee4813bf2f722b01565a7e/8a682a7e04ee4813bf2f722b01565a7e.HD-1080p-4.8Mbps-89110328.mp4?v=0',
        bg_image:
          'https://clothing-preset-volume.myshopify.com/cdn/shop/files/preview_images/8a682a7e04ee4813bf2f722b01565a7e.thumbnail.0000000000.jpg?v=1784207448&width=1100',
        theme_style: 'luxury-dark',
        bg_overlay_opacity: 25,
        content_v_align: 'end',
        content_h_align: 'center',
        subheading: {
          ar: 'فلسفة الأناقة العصرية',
          en: 'Philosophy of Style',
        },
        title: {
          ar: 'فن الخياطة الراقية والأزياء الفاخرة لعام 2026',
          en: 'The architecture of modern outerwear & premium tailoring',
        },
        title_highlight: {
          ar: 'تشكيلة حصرية',
          en: 'Exclusive Edit',
        },
        subtitle: {
          ar: 'استمتع بأحدث مجموعات الأزياء الراقية والقصات العصرية المصممة بعناية فائقة لإطلالة تخطف الأنظار.',
          en: 'Explore our curated runway collection, designed with meticulous craftsmanship for timeless elegance.',
        },
        cta_text: {
          ar: 'اكتشف التشكيلة الآن',
          en: 'Explore Collection',
        },
        url: 'https://salla.sa',
        button_style: 'solid',
        coupon_enabled: true,
        coupon_code: 'VOLUME26',
        countdown_enabled: true,
        countdown_end: '2026-12-31 23:59:00',
      },
      {
        bg_type: 'image',
        bg_image:
          'https://clothing-preset-volume.myshopify.com/cdn/shop/files/Landscape_20banner_20-_2009-Wrap_20coat_20Landscape_20Banner_20Black_203-4_2001v01.jpg?v=1782913382&width=2000',
        theme_style: 'luxury-dark',
        bg_overlay_opacity: 35,
        content_v_align: 'end',
        content_h_align: 'start',
        subheading: {
          ar: 'قطع جاهزة للارتداء',
          en: 'Ready-to-wear Pieces',
        },
        title: {
          ar: 'تصاميم كلاسيكية بإتقان استثنائي من كبار المصممين',
          en: 'Curated essentials & signature fits from leading designers',
        },
        title_highlight: {
          ar: 'خصم 30%',
          en: '30% OFF',
        },
        subtitle: {
          ar: 'تصاميم استثنائية من نخبة المصممين مع شحن فوري مجاني لكافة مدن المملكة وضمان ذهبي للاستبدال.',
          en: 'Exceptional cuts, breathable luxury textiles, and bespoke details tailored for the discerning eye.',
        },
        cta_text: {
          ar: 'تسوق التشكيلة الفاخرة',
          en: 'Shop The Edit',
        },
        url: 'https://salla.sa',
        button_style: 'glass',
        coupon_enabled: true,
        coupon_code: 'VIPSTYLE',
        countdown_enabled: false,
        countdown_end: '2026-11-20 20:00:00',
      },
      {
        bg_type: 'color',
        custom_bg_color: '#064e3b',
        theme_style: 'salla-emerald',
        bg_overlay_opacity: 40,
        content_v_align: 'center',
        content_h_align: 'center',
        subheading: {
          ar: 'عروض حصرية لفترة محدودة',
          en: 'Limited Time Offer',
        },
        title: {
          ar: 'أقوى تخفيضات الموسم على كافة التشكيلات المختارة',
          en: 'Season Finale: Architectural silhouettes at unmissable values',
        },
        title_highlight: {
          ar: 'خصم حتى 50%',
          en: 'Up to 50% OFF',
        },
        subtitle: {
          ar: 'فرصة لا تعوض لتجديد خزانة ملابسك بأرقى القطع العصرية بأسعار استثنائية وشحن سريع.',
          en: 'An exclusive opportunity to upgrade your wardrobe with iconic luxury fashion and complimentary express shipping.',
        },
        cta_text: {
          ar: 'استفد من العرض الآن',
          en: 'Claim Offer Now',
        },
        url: 'https://salla.sa',
        button_style: 'solid',
        coupon_enabled: true,
        coupon_code: 'SALLA50',
        countdown_enabled: true,
        countdown_end: '2026-12-31 23:59:00',
      },
    ];
  }

  private startAutoplay(): void {
    this.stopAutoplay();
    const slides = this.getEffectiveSlides();
    if (slides.length <= 1) return;

    const autoplayEnabled = this.isSwitchOn(this.config?.slider_autoplay, true);
    if (!autoplayEnabled) return;

    const delaySeconds = Math.max(2, Number(this.config?.slider_delay) || 5);
    const totalMs = delaySeconds * 1000;
    const intervalMs = 100;
    const stepIncrement = (intervalMs / totalMs) * 100;

    this.progressTimer = window.setInterval(() => {
      if (!this.isPaused) {
        this.autoplayProgress += stepIncrement;
        if (this.autoplayProgress >= 100) {
          this.autoplayProgress = 0;
          this.nextSlide();
        }
      }
    }, intervalMs);
  }

  private stopAutoplay(): void {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = undefined;
    }
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
    }
  }

  private toggleAutoplay(): void {
    this.isPaused = !this.isPaused;
  }

  private nextSlide(): void {
    const slides = this.getEffectiveSlides();
    this.currentSlideIndex = (this.currentSlideIndex + 1) % slides.length;
    this.autoplayProgress = 0;
  }

  private prevSlide(): void {
    const slides = this.getEffectiveSlides();
    this.currentSlideIndex = (this.currentSlideIndex - 1 + slides.length) % slides.length;
    this.autoplayProgress = 0;
  }

  private goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.autoplayProgress = 0;
  }

  private parseTargetDate(dateStr?: string): { target: number; cleanDate: string } {
    const fallbackTarget = Date.now() + 14 * 24 * 60 * 60 * 1000;
    const fallbackIso = new Date(fallbackTarget).toISOString().replace('T', ' ').substring(0, 19);

    if (!dateStr || typeof dateStr !== 'string') {
      return { target: fallbackTarget, cleanDate: fallbackIso };
    }

    let raw = dateStr.trim();
    if (!raw) {
      return { target: fallbackTarget, cleanDate: fallbackIso };
    }

    // Replace space with T for ISO parsing
    let iso = raw.replace(' ', 'T');
    // If only date provided (e.g. 2026-10-31 or 2026/10/31), target the end of that day (23:59:59)
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
      iso += 'T23:59:59';
    } else if (/^\d{4}\/\d{2}\/\d{2}$/.test(iso)) {
      iso = iso.replace(/\//g, '-') + 'T23:59:59';
    }

    let parsed = new Date(iso).getTime();
    if (isNaN(parsed)) {
      parsed = new Date(raw).getTime();
    }
    if (isNaN(parsed)) {
      return { target: fallbackTarget, cleanDate: fallbackIso };
    }

    return { target: parsed, cleanDate: iso.replace('T', ' ') };
  }

  private startCountdownLoop(): void {
    this.updateCountdowns();
    this.countdownTimer = window.setInterval(() => {
      this.updateCountdowns();
    }, 1000);
  }

  private updateCountdowns(): void {
    const slides = this.getEffectiveSlides();
    const newState: typeof this.countdownState = {};
    const now = Date.now();

    slides.forEach((slide, idx) => {
      if (this.isSwitchOn(slide.countdown_enabled, false)) {
        const { target } = this.parseTargetDate(slide.countdown_end);
        const diff = target - now;

        if (diff <= 0) {
          newState[idx] = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
        } else {
          const totalSecs = Math.floor(diff / 1000);
          const days = Math.floor(totalSecs / 86400);
          const hours = Math.floor((totalSecs % 86400) / 3600);
          const minutes = Math.floor((totalSecs % 3600) / 60);
          const seconds = totalSecs % 60;
          newState[idx] = { days, hours, minutes, seconds, isExpired: false };
        }
      }
    });

    this.countdownState = newState;
  }

  private formatNumber(n: number): string {
    return String(n).padStart(2, '0');
  }

  private async handleCopyCoupon(code: string): Promise<void> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const input = document.createElement('input');
        input.value = code;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      this.isCopied = true;
      this.toastMessage = this.isLtr
        ? `Coupon code (${code}) copied!`
        : `تم نسخ كود الخصم (${code}) بنجاح!`;
      this.showToast = true;

      setTimeout(() => {
        this.isCopied = false;
        this.showToast = false;
      }, 3500);
    } catch {
      this.toastMessage = this.isLtr ? `Coupon code: ${code}` : `كود الخصم: ${code}`;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3500);
    }
  }

  render() {
    const slides = this.getEffectiveSlides();
    const activeIndex = Math.min(this.currentSlideIndex, Math.max(0, slides.length - 1));

    // Dynamic vh heights for desktop & mobile
    const desktopHeight = this.parseHeight(this.config?.height_desktop, '92vh');
    const mobileHeight = this.parseHeight(this.config?.height_mobile, '82vh');
    const heightCustomStyle = `--banner-height-desktop: ${desktopHeight}; --banner-height-mobile: ${mobileHeight};`;

    // Strict boolean checking for toggles
    const showNav = this.isSwitchOn(this.config?.slider_navigation, true) && slides.length > 1;
    const showBullets = this.isSwitchOn(this.config?.slider_pagination, true) && slides.length > 1;
    const showProgressBtn = this.isSwitchOn(this.config?.show_progress_btn, true) && slides.length > 1;

    // SVG dash offset
    const strokeDashoffset = 100 - this.autoplayProgress;

    return html`
      <div
        class="tw-slider-container ${this.isLtr ? 'dir-ltr' : 'dir-rtl'}"
        style="${heightCustomStyle}"
        @mouseenter="${() => (this.isPaused = true)}"
        @mouseleave="${() => (this.isPaused = false)}"
      >
        <!-- Slides Track -->
        <div class="slides-track">
          ${slides.map((slide, index) => this.renderSlide(slide, index === activeIndex, index))}
        </div>

        <!-- Rolling Arrow Navigation -->
        ${showNav
          ? html`
              <button
                type="button"
                class="swiper-arrow-btn prev-btn"
                aria-label="${this.isLtr ? 'Previous slide' : 'الشريحة السابقة'}"
                title="${this.isLtr ? 'Previous slide' : 'الشريحة السابقة'}"
                @click="${() => this.prevSlide()}"
              >
                <!-- Direction-aware Previous Arrow -->
                <svg viewBox="0 0 24 24">
                  <path
                    d="${this.isLtr ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                class="swiper-arrow-btn next-btn"
                aria-label="${this.isLtr ? 'Next slide' : 'الشريحة التالية'}"
                title="${this.isLtr ? 'Next slide' : 'الشريحة التالية'}"
                @click="${() => this.nextSlide()}"
              >
                <!-- Direction-aware Next Arrow -->
                <svg viewBox="0 0 24 24">
                  <path
                    d="${this.isLtr ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            `
          : ''}

        <!-- Bullets Pagination -->
        ${showBullets
          ? html`
              <div class="swiper-bullets-wrapper" role="tablist">
                ${slides.map(
                  (_, i) => html`
                    <button
                      type="button"
                      class="bullet-dot ${i === activeIndex ? 'active' : ''}"
                      aria-label="${this.isLtr ? `Slide ${i + 1}` : `شريحة ${i + 1}`}"
                      @click="${() => this.goToSlide(i)}"
                    ></button>
                  `,
                )}
              </div>
            `
          : ''}

        <!-- Shopify-Style Circular Autoplay Progress & Play/Pause Button -->
        ${showProgressBtn
          ? html`
              <button
                type="button"
                class="autoplay-progress-btn"
                aria-label="${this.isPaused ? (this.isLtr ? 'Play slideshow' : 'تشغيل العرض التلقائي') : (this.isLtr ? 'Pause slideshow' : 'إيقاف العرض التلقائي مؤقتاً')}"
                title="${this.isPaused ? (this.isLtr ? 'Play' : 'تشغيل') : (this.isLtr ? 'Pause' : 'إيقاف مؤقت')}"
                @click="${() => this.toggleAutoplay()}"
              >
                <svg class="circle-progress" viewBox="0 0 36 36">
                  <circle class="bg-circle" cx="18" cy="18" r="15.9155" />
                  <circle
                    class="progress-circle"
                    cx="18"
                    cy="18"
                    r="15.9155"
                    style="--dash-offset: ${strokeDashoffset};"
                  />
                </svg>

                ${this.isPaused
                  ? html`
                      <svg class="control-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    `
                  : html`
                      <svg class="control-icon" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    `}
              </button>
            `
          : ''}

        <!-- Toast Feedback -->
        <div class="copy-toast ${this.showToast ? 'show' : ''}">
          <span>✓</span>
          <span>${this.toastMessage}</span>
        </div>
      </div>
    `;
  }

  private renderSlide(slide: BannerSlide, isActive: boolean, index: number) {
    const isCouponActive = this.isSwitchOn(slide.coupon_enabled, true) && !!slide.coupon_code;
    const isCountdownActive = this.isSwitchOn(slide.countdown_enabled, false);
    const { cleanDate } = this.parseTargetDate(slide.countdown_end);
    const countdown = this.countdownState[index] || {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: false,
    };

    // Robust value extraction
    const bgType = this.getVal(
      slide.bg_type,
      slide.bg_video_url ? 'video' : slide.bg_image ? 'image' : 'color'
    );
    const theme = this.getVal(slide.theme_style, 'luxury-dark');
    const vAlign = this.getVal(slide.content_v_align, 'end');
    const hAlign = this.getVal(slide.content_h_align, 'center');
    const btnStyle = this.getVal(slide.button_style, 'solid');
    const targetUrl = this.getVal(slide.url, 'https://salla.sa');

    // Multilingual text resolution
    const subheadingText = this.getLocalized(slide.subheading);
    const titleText = this.getLocalized(slide.title);
    const titleHighlightText = this.getLocalized(slide.title_highlight);
    const subtitleText = this.getLocalized(slide.subtitle);
    const ctaText = this.getLocalized(slide.cta_text, this.isLtr ? 'Shop Now' : 'تسوق الآن');

    // Detect if this slide content is primarily English (either document is LTR or texts are in English)
    const isSlideEnglish = this.isLtr || this.isTextEnglish(ctaText) || this.isTextEnglish(titleText);
    const arrowChar = isSlideEnglish ? '→' : '←';
    const couponLabel = isSlideEnglish ? 'Code:' : 'كود الخصم:';
    const copyLabel = this.isCopied
      ? (isSlideEnglish ? 'Copied' : 'تم النسخ')
      : (isSlideEnglish ? 'Copy' : 'نسخ');
    const couponTitle = isSlideEnglish ? 'Click to copy coupon code' : 'انقر لنسخ كود الخصم';

    const overlayOpacity = ((slide.bg_overlay_opacity ?? 25) / 100);
    const alignClass = `v-${vAlign} h-${hAlign}`;

    // Custom inline colors
    let customInlineStyles = '';
    if (slide.custom_bg_color) {
      customInlineStyles += `background: ${slide.custom_bg_color}; `;
    }
    if (slide.heading_color) {
      customInlineStyles += `--heading-color: ${slide.heading_color}; `;
    }
    if (slide.subheading_color) {
      customInlineStyles += `--subheading-color: ${slide.subheading_color}; `;
    }
    if (slide.btn_bg_color) {
      customInlineStyles += `--btn-bg: ${slide.btn_bg_color}; --banner-cta-bg: ${slide.btn_bg_color}; `;
    }
    if (slide.btn_text_color) {
      customInlineStyles += `--btn-text: ${slide.btn_text_color}; --banner-cta-text: ${slide.btn_text_color}; `;
    }
    if (slide.btn_bg_color && slide.btn_text_color) {
      customInlineStyles += `--banner-cta-hover-bg: ${slide.btn_text_color}; --banner-cta-hover-text: ${slide.btn_bg_color}; `;
    }

    const btnStyleClass = `style-${btnStyle}`;

    return html`
      <div
        class="slide-item theme-${theme} ${isActive ? 'active' : ''}"
        style="${customInlineStyles}"
      >
        <!-- Background Media Layer -->
        ${bgType === 'video' && slide.bg_video_url
          ? html`
              <div class="bg-media-layer">
                <video autoplay muted loop playsinline poster="${slide.bg_image || ''}">
                  <source src="${slide.bg_video_url}" type="video/mp4" />
                </video>
                <div class="bg-overlay-filter" style="opacity: ${overlayOpacity};"></div>
              </div>
            `
          : ''}

        ${bgType === 'image' && (slide.bg_image || slide.image)
          ? html`
              <div class="bg-media-layer">
                <div
                  class="bg-image-cover"
                  style="background-image: url('${slide.bg_image || slide.image}');"
                ></div>
                <div class="bg-overlay-filter" style="opacity: ${overlayOpacity};"></div>
              </div>
            `
          : ''}

        ${bgType === 'color'
          ? html`
              <div class="bg-media-layer">
                <div class="bg-overlay-filter" style="opacity: ${overlayOpacity};"></div>
              </div>
            `
          : ''}

        <!-- Full Bleed Flex Container with 9-Direction Alignment -->
        <div class="slide-inner-container ${alignClass}">
          <div class="slide-content-box">
            <!-- Subheading -->
            ${subheadingText
              ? html`
                  <div class="slide-subheading">
                    <span class="slide-subheading-line"></span>
                    <span>${subheadingText}</span>
                    <span class="slide-subheading-line"></span>
                  </div>
                `
              : ''}

            <!-- Heading -->
            <h2 class="slide-heading">
              ${titleText}
              ${titleHighlightText
                ? html`<span class="highlight-span"> ${titleHighlightText}</span>`
                : ''}
            </h2>

            <!-- Description -->
            ${subtitleText ? html`<p class="slide-description">${subtitleText}</p>` : ''}

            <!-- Salla Countdown Block -->
            ${isCountdownActive
              ? html`
                  <div class="salla-countdown-container">
                    <span class="countdown-title">
                      <span class="countdown-pulse-dot"></span>
                      <span>${isSlideEnglish ? 'Limited Time Offer Ends In:' : 'ينتهي العرض الترويجي خلال:'}</span>
                    </span>

                    <div class="luxury-timer-grid">
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(countdown.days)}</span>
                        <span class="timer-lbl">${isSlideEnglish ? 'Days' : 'يوم'}</span>
                      </div>
                      <span class="timer-divider">:</span>
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(countdown.hours)}</span>
                        <span class="timer-lbl">${isSlideEnglish ? 'Hours' : 'ساعة'}</span>
                      </div>
                      <span class="timer-divider">:</span>
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(countdown.minutes)}</span>
                        <span class="timer-lbl">${isSlideEnglish ? 'Mins' : 'دقيقة'}</span>
                      </div>
                      <span class="timer-divider">:</span>
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(countdown.seconds)}</span>
                        <span class="timer-lbl">${isSlideEnglish ? 'Secs' : 'ثانية'}</span>
                      </div>
                    </div>

                    <salla-count-down date="${cleanDate}" style="display:none;"></salla-count-down>
                  </div>
                `
              : ''}

            <!-- Actions Row (CTA & 1-Click Coupon) -->
            <div class="slide-actions-row">
              <a
                href="${targetUrl}"
                class="luxury-btn ${btnStyleClass}"
                dir="${isSlideEnglish ? 'ltr' : 'rtl'}"
              >
                <span>${ctaText}</span>
                <span class="btn-arrow-icon">${arrowChar}</span>
              </a>

              ${isCouponActive
                ? html`
                    <button
                      type="button"
                      class="coupon-pill-btn ${this.isCopied ? 'copied' : ''}"
                      @click="${() => this.handleCopyCoupon(slide.coupon_code!)}"
                      title="${couponTitle}"
                      dir="${isSlideEnglish ? 'ltr' : 'rtl'}"
                    >
                      <span class="coupon-lbl">${couponLabel}</span>
                      <span class="coupon-tag-badge">${slide.coupon_code}</span>
                      <span class="coupon-action-badge">
                        <svg class="coupon-icon" viewBox="0 0 20 20" fill="currentColor">
                          ${this.isCopied
                            ? html`<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />`
                            : html`<path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />`}
                        </svg>
                        <span>${copyLabel}</span>
                      </span>
                    </button>
                  `
                : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Global registration
if (typeof (HTMLElement as any).registerSallaComponent === 'function') {
  (PromoBanner as any).registerSallaComponent('salla-promo-banner');
}
if (!customElements.get('promo-banner')) {
  customElements.define('promo-banner', PromoBanner);
}
