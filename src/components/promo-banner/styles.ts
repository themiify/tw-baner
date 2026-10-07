import { css } from 'lit';

export const bannerStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-family: var(--font-family, system-ui, -apple-system, 'Readex Pro', 'Cairo', 'Segoe UI', Roboto, sans-serif);
    color: var(--banner-text, #ffffff);
    direction: var(--banner-dir, rtl);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Root Container */
  .tw-slider-container {
    position: relative;
    width: 100%;
    max-width: 100vw;
    height: var(--banner-height-desktop, 92vh);
    overflow: hidden;
    background: #000000;
    user-select: none;
    isolation: isolate;
  }

  /* Responsive Heights */
  @media screen and (max-width: 768px) {
    .tw-slider-container {
      height: var(--banner-height-mobile, 82vh) !important;
    }
  }

  /* Direction Support */
  .tw-slider-container.dir-ltr {
    direction: ltr;
    text-align: left;
  }

  .tw-slider-container.dir-rtl {
    direction: rtl;
    text-align: right;
  }

  .tw-slider-container.dir-ltr .slide-inner-container.h-start {
    justify-content: flex-start;
    text-align: left;
  }
  .tw-slider-container.dir-ltr .slide-inner-container.h-start .slide-actions-row {
    justify-content: flex-start;
  }
  .tw-slider-container.dir-ltr .slide-inner-container.h-end {
    justify-content: flex-end;
    text-align: right;
  }
  .tw-slider-container.dir-ltr .slide-inner-container.h-end .slide-actions-row {
    justify-content: flex-end;
  }

  /* Dynamic Themes - 100% Configurable & Free of Static Hardcoded Colors */
  .slide-item.theme-luxury-dark {
    --banner-accent: #f59e0b;
    --banner-accent-light: #fef3c7;
    --banner-surface: rgba(255, 255, 255, 0.08);
    --banner-surface-border: rgba(255, 255, 255, 0.22);
    --banner-surface-hover: rgba(255, 255, 255, 0.18);
    --banner-text: #ffffff;
    --banner-muted: rgba(255, 255, 255, 0.78);
    --banner-cta-bg: #ffffff;
    --banner-cta-text: #000000;
    --banner-cta-hover-bg: #f59e0b;
    --banner-cta-hover-text: #000000;
    --banner-coupon-border: rgba(245, 158, 11, 0.6);
  }

  .slide-item.theme-salla-emerald {
    --banner-accent: #10b981;
    --banner-accent-light: #d1fae5;
    --banner-surface: rgba(16, 185, 129, 0.14);
    --banner-surface-border: rgba(16, 185, 129, 0.35);
    --banner-surface-hover: rgba(16, 185, 129, 0.26);
    --banner-text: #ffffff;
    --banner-muted: #a7f3d0;
    --banner-cta-bg: #10b981;
    --banner-cta-text: #ffffff;
    --banner-cta-hover-bg: #ffffff;
    --banner-cta-hover-text: #064e3b;
    --banner-coupon-border: rgba(16, 185, 129, 0.6);
  }

  .slide-item.theme-sunset-glow {
    --banner-accent: #fb923c;
    --banner-accent-light: #ffedd5;
    --banner-surface: rgba(251, 146, 60, 0.14);
    --banner-surface-border: rgba(251, 146, 60, 0.35);
    --banner-surface-hover: rgba(251, 146, 60, 0.26);
    --banner-text: #ffffff;
    --banner-muted: #fed7aa;
    --banner-cta-bg: #fb923c;
    --banner-cta-text: #ffffff;
    --banner-cta-hover-bg: #ffffff;
    --banner-cta-hover-text: #ea580c;
    --banner-coupon-border: rgba(251, 146, 60, 0.6);
  }

  .slide-item.theme-royal-purple {
    --banner-accent: #c084fc;
    --banner-accent-light: #f3e8ff;
    --banner-surface: rgba(192, 132, 252, 0.14);
    --banner-surface-border: rgba(192, 132, 252, 0.35);
    --banner-surface-hover: rgba(192, 132, 252, 0.26);
    --banner-text: #ffffff;
    --banner-muted: #e9d5ff;
    --banner-cta-bg: #a855f7;
    --banner-cta-text: #ffffff;
    --banner-cta-hover-bg: #ffffff;
    --banner-cta-hover-text: #7e22ce;
    --banner-coupon-border: rgba(192, 132, 252, 0.6);
  }

  .slide-item.theme-store-theme {
    --banner-accent: var(--primary, #10b981);
    --banner-accent-light: #ffffff;
    --banner-surface: rgba(255, 255, 255, 0.12);
    --banner-surface-border: rgba(255, 255, 255, 0.28);
    --banner-surface-hover: rgba(255, 255, 255, 0.2);
    --banner-text: #ffffff;
    --banner-muted: rgba(255, 255, 255, 0.8);
    --banner-cta-bg: var(--primary, #10b981);
    --banner-cta-text: #ffffff;
    --banner-cta-hover-bg: #ffffff;
    --banner-cta-hover-text: var(--primary, #10b981);
    --banner-coupon-border: var(--primary, rgba(255, 255, 255, 0.5));
  }

  /* Slides Track */
  .slides-track {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* Slide Item */
  .slide-item {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    transform: scale(1.02);
    transition: opacity 1.1s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
    display: flex;
    overflow: hidden;
    background: #000000;
  }

  .slide-item.active {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
    z-index: 2;
  }

  /* Background Media Layer */
  .bg-media-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    pointer-events: none;
  }

  .bg-media-layer video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.01);
  }

  .bg-media-layer .bg-image-cover {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transform: scale(1.03);
    transition: transform 12s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .slide-item.active .bg-media-layer .bg-image-cover {
    transform: scale(1.08);
  }

  /* Luxury Cinematic Gradient Overlay */
  .bg-overlay-filter {
    position: absolute;
    inset: 0;
    background: linear-gradient(40deg, rgba(0, 0, 0, 0.92) 10%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.2) 90%);
    z-index: 2;
    pointer-events: none;
  }

  /* Slide Inner Content Container (Full Bleed Flex Container) */
  .slide-inner-container {
    position: relative;
    z-index: 4;
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    /* Safe padding away from edges and navigation arrows */
    padding: clamp(2rem, 5vh, 4.5rem) clamp(3rem, 6vw, 6.5rem);
  }

  @media screen and (max-width: 768px) {
    .slide-inner-container {
      padding: clamp(1.5rem, 4vh, 2.5rem) clamp(1.5rem, 4vw, 2.5rem);
    }
  }

  /* Vertical Alignment Matrix */
  .slide-inner-container.v-start {
    align-items: flex-start;
  }
  .slide-inner-container.v-center {
    align-items: center;
  }
  .slide-inner-container.v-end {
    align-items: flex-end;
  }

  /* Horizontal Alignment Matrix */
  .slide-inner-container.h-start {
    justify-content: flex-start;
  }
  .slide-inner-container.h-center {
    justify-content: center;
  }
  .slide-inner-container.h-end {
    justify-content: flex-end;
  }

  /* Slide Content Box */
  .slide-content-box {
    display: flex;
    flex-direction: column;
    max-width: 820px;
    width: 100%;
    gap: 1.25rem;
    z-index: 5;
  }

  /* Text Alignment inside Content Box */
  .slide-inner-container.h-start .slide-content-box {
    align-items: flex-start;
    text-align: right;
  }
  .slide-inner-container.h-center .slide-content-box {
    align-items: center;
    text-align: center;
  }
  .slide-inner-container.h-end .slide-content-box {
    align-items: flex-end;
    text-align: left;
  }

  /* Subheading - High Fashion Style */
  .slide-subheading {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: clamp(0.78rem, 1.2vw, 0.95rem);
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--subheading-color, var(--banner-accent, #ffffff));
    opacity: 0.95;
    margin: 0;
  }

  .slide-subheading-line {
    display: inline-block;
    width: 28px;
    height: 2px;
    background: currentColor;
    opacity: 0.7;
  }

  /* Heading - Haute Couture Typography */
  .slide-heading {
    font-size: clamp(1.9rem, 4.4vw, 3.8rem);
    font-weight: 800;
    line-height: 1.14;
    letter-spacing: -0.02em;
    margin: 0;
    color: var(--heading-color, var(--banner-text, #ffffff));
    text-shadow: 0 4px 24px rgba(0, 0, 0, 0.65);
    max-width: 850px;
  }

  .highlight-span {
    background: linear-gradient(135deg, var(--banner-accent, #fbbf24) 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline;
  }

  /* Description Text */
  .slide-description {
    font-size: clamp(0.95rem, 1.35vw, 1.2rem);
    line-height: 1.7;
    color: var(--subheading-color, var(--banner-muted, rgba(255, 255, 255, 0.85)));
    margin: 0;
    max-width: 680px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  /* Countdown Timer Block */
  /* Countdown Timer Container */
  .salla-countdown-container {
    display: inline-flex;
    flex-direction: column;
    gap: 0.65rem;
    margin-top: 0.5rem;
  }

  .slide-inner-container.h-center .salla-countdown-container {
    align-items: center;
    text-align: center;
  }
  .slide-inner-container.h-start .salla-countdown-container {
    align-items: flex-start;
    text-align: right;
  }
  .slide-inner-container.h-end .salla-countdown-container {
    align-items: flex-end;
    text-align: left;
  }

  .countdown-title {
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--banner-text, rgba(255, 255, 255, 0.9));
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .countdown-pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--banner-accent, #10b981);
    box-shadow: 0 0 10px var(--banner-accent, #10b981);
    animation: countdownPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    display: inline-block;
    flex-shrink: 0;
  }

  @keyframes countdownPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.35; transform: scale(0.8); }
  }

  .luxury-timer-grid {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    direction: ltr;
  }

  .timer-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    padding: 0.55rem 0.75rem;
    background: var(--banner-surface, rgba(255, 255, 255, 0.1));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--banner-surface-border, rgba(255, 255, 255, 0.22));
    border-radius: 14px;
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.15);
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1),
                border-color 0.35s ease,
                box-shadow 0.35s ease;
  }

  .timer-card:hover {
    transform: translateY(-2px);
    border-color: var(--banner-accent, rgba(255, 255, 255, 0.45));
    box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.45), 0 0 16px var(--banner-accent, rgba(255, 255, 255, 0.2));
  }

  .timer-val {
    font-size: clamp(1.25rem, 1.8vw, 1.6rem);
    font-weight: 800;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, monospace;
    color: var(--banner-text, #ffffff);
    line-height: 1.1;
    letter-spacing: 0.04em;
  }

  .timer-lbl {
    font-size: 0.7rem;
    color: var(--banner-muted, rgba(255, 255, 255, 0.75));
    font-weight: 600;
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .timer-divider {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--banner-muted, rgba(255, 255, 255, 0.6));
    margin-bottom: 6px;
  }

  /* Actions Row */
  .slide-actions-row {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.15rem;
    margin-top: 1rem;
  }

  .slide-inner-container.h-start .slide-actions-row {
    justify-content: flex-start;
  }
  .slide-inner-container.h-center .slide-actions-row {
    justify-content: center;
  }
  .slide-inner-container.h-end .slide-actions-row {
    justify-content: flex-end;
  }

  /* Base CTA Button - High-End Luxury Geometry */
  .luxury-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    padding: 0 2.2rem;
    min-height: 52px;
    height: 52px;
    font-size: clamp(0.95rem, 1.15vw, 1.05rem);
    font-weight: 700;
    letter-spacing: 0.02em;
    text-decoration: none;
    border-radius: 9999px;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    background: var(--btn-bg, var(--banner-cta-bg, #ffffff));
    color: var(--btn-text, var(--banner-cta-text, #000000));
    border: 1px solid var(--btn-border, transparent);
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.35, 1),
                box-shadow 0.4s cubic-bezier(0.25, 1, 0.35, 1),
                border-color 0.35s ease;
  }

  /* Silky Smooth Hover Color Sweep from Far Right to Left */
  .luxury-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: var(--btn-hover-bg, var(--banner-cta-hover-bg, var(--banner-accent, #f59e0b)));
    transform: translateX(101%);
    will-change: transform;
    transition: transform 0.48s cubic-bezier(0.25, 1, 0.35, 1);
    z-index: 1;
    border-radius: inherit;
    pointer-events: none;
  }

  .luxury-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px -6px rgba(0, 0, 0, 0.5), 0 0 25px var(--banner-accent, rgba(255, 255, 255, 0.3));
    border-color: transparent;
  }

  .luxury-btn:hover::before {
    transform: translateX(0); /* Sweeps smoothly all the way from right to left! */
  }

  .luxury-btn:active {
    transform: translateY(1px) scale(0.98);
    transition: transform 0.1s ease;
  }

  /* Inner elements stay sharp on top of the sweeping color */
  .luxury-btn > span {
    position: relative;
    z-index: 2;
    transition: color 0.35s ease;
  }

  .luxury-btn:hover > span {
    color: var(--btn-hover-text, var(--banner-cta-hover-text, #ffffff));
  }

  /* Style Variants */
  .luxury-btn.style-glass {
    background: var(--banner-surface, rgba(255, 255, 255, 0.12));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--banner-surface-border, rgba(255, 255, 255, 0.28));
    color: var(--banner-text, #ffffff);
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.2);
  }

  .luxury-btn.style-glass::before {
    background: var(--banner-cta-hover-bg, var(--banner-accent, #f59e0b));
  }

  .luxury-btn.style-glass:hover {
    border-color: transparent;
  }

  .luxury-btn.style-glass:hover > span {
    color: var(--banner-cta-hover-text, #000000);
  }

  .luxury-btn.style-outline {
    background: transparent;
    border: 1.5px solid var(--btn-bg, var(--banner-cta-bg, #ffffff));
    color: var(--btn-bg, var(--banner-cta-bg, #ffffff));
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .luxury-btn.style-outline::before {
    background: var(--btn-bg, var(--banner-cta-bg, #ffffff));
  }

  .luxury-btn.style-outline:hover {
    border-color: transparent;
  }

  .luxury-btn.style-outline:hover > span {
    color: var(--btn-text, var(--banner-cta-text, #000000));
  }

  .btn-arrow-icon {
    display: inline-flex;
    align-items: center;
    font-size: 1.15rem;
    line-height: 1;
    position: relative;
    z-index: 2;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.35, 1) !important;
  }

  .luxury-btn[dir="rtl"]:hover .btn-arrow-icon,
  .tw-slider-container.dir-rtl .luxury-btn:not([dir="ltr"]):hover .btn-arrow-icon {
    transform: translateX(-6px);
  }
  .luxury-btn[dir="ltr"]:hover .btn-arrow-icon,
  .tw-slider-container.dir-ltr .luxury-btn:not([dir="rtl"]):hover .btn-arrow-icon {
    transform: translateX(6px);
  }

  /* Coupon Button - Dynamic Luxury Design with Matching Right-to-Left Sweep */
  .coupon-pill-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0 1.6rem;
    min-height: 52px;
    height: 52px;
    border-radius: 9999px;
    background: var(--banner-surface, rgba(255, 255, 255, 0.08));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--banner-surface-border, rgba(255, 255, 255, 0.22));
    color: var(--banner-text, #ffffff);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    isolation: isolate;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.15);
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.35, 1),
                box-shadow 0.4s cubic-bezier(0.25, 1, 0.35, 1),
                border-color 0.35s ease,
                background-color 0.35s ease;
  }

  /* Silky Smooth Sweep from far right to left on hover */
  .coupon-pill-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: var(--banner-surface-hover, rgba(255, 255, 255, 0.2));
    transform: translateX(101%);
    will-change: transform;
    transition: transform 0.48s cubic-bezier(0.25, 1, 0.35, 1);
    z-index: 1;
    border-radius: inherit;
    pointer-events: none;
  }

  .coupon-pill-btn:hover {
    transform: translateY(-2px);
    border-color: var(--banner-accent, rgba(255, 255, 255, 0.6));
    box-shadow: 0 14px 34px -4px rgba(0, 0, 0, 0.4), 0 0 20px var(--banner-accent, rgba(255, 255, 255, 0.2));
  }

  .coupon-pill-btn:hover::before {
    transform: translateX(0); /* Sweeps in from far right to left! */
  }

  .coupon-pill-btn:active {
    transform: translateY(1px) scale(0.98);
    transition: transform 0.1s ease;
  }

  .coupon-pill-btn > span {
    position: relative;
    z-index: 2;
  }

  .coupon-lbl {
    color: var(--banner-muted, rgba(255, 255, 255, 0.78));
    font-size: 0.92rem;
    font-weight: 500;
  }

  .coupon-tag-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--banner-surface-hover, rgba(255, 255, 255, 0.18));
    color: var(--banner-text, #ffffff);
    padding: 0.25rem 0.85rem;
    border-radius: 9999px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-weight: 800;
    letter-spacing: 0.08em;
    font-size: 0.88rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    border: 1px solid var(--banner-surface-border, rgba(255, 255, 255, 0.25));
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.35, 1), background-color 0.35s ease, color 0.35s ease;
  }

  .coupon-pill-btn:hover .coupon-tag-badge {
    transform: scale(1.06);
    background: var(--banner-accent, rgba(255, 255, 255, 0.3));
    color: var(--banner-cta-hover-text, var(--banner-text, #ffffff));
  }

  .coupon-action-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--banner-text, #ffffff);
  }

  .coupon-icon {
    width: 15px;
    height: 15px;
    flex-shrink: 0;
    display: inline-block;
    transition: transform 0.35s cubic-bezier(0.25, 1, 0.35, 1);
  }

  .coupon-pill-btn:hover .coupon-icon {
    transform: scale(1.15);
  }

  .coupon-pill-btn.copied {
    border-color: var(--banner-accent, #10b981);
    background: var(--banner-surface, rgba(16, 185, 129, 0.18));
    box-shadow: 0 0 25px var(--banner-accent, rgba(16, 185, 129, 0.4));
  }

  .coupon-pill-btn.copied .coupon-tag-badge {
    background: var(--banner-accent, #10b981);
    color: #ffffff;
    border-color: transparent;
  }

  /* Animations for Slide Elements */
  .slide-item.active .slide-subheading {
    animation: luxuryFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
  }
  .slide-item.active .slide-heading {
    animation: luxuryFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
  }
  .slide-item.active .slide-description {
    animation: luxuryFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.42s both;
  }
  .slide-item.active .salla-countdown-container {
    animation: luxuryFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.52s both;
  }
  .slide-item.active .slide-actions-row {
    animation: luxuryFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.62s both;
  }

  @keyframes luxuryFadeInUp {
    0% {
      opacity: 0;
      transform: translateY(28px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Navigation Arrows - Shopify Rolling Arrow Style */
  .swiper-arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .swiper-arrow-btn:hover {
    background: #ffffff;
    color: #000000;
    border-color: #ffffff;
    transform: translateY(-50%) scale(1.08);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }

  /* RTL Navigation Positions */
  .tw-slider-container.dir-rtl .swiper-arrow-btn.prev-btn {
    right: clamp(1rem, 2.5vw, 2.5rem);
    left: auto;
  }
  .tw-slider-container.dir-rtl .swiper-arrow-btn.next-btn {
    left: clamp(1rem, 2.5vw, 2.5rem);
    right: auto;
  }

  /* LTR Navigation Positions */
  .tw-slider-container.dir-ltr .swiper-arrow-btn.prev-btn {
    left: clamp(1rem, 2.5vw, 2.5rem);
    right: auto;
  }
  .tw-slider-container.dir-ltr .swiper-arrow-btn.next-btn {
    right: clamp(1rem, 2.5vw, 2.5rem);
    left: auto;
  }

  .swiper-arrow-btn svg {
    width: 22px;
    height: 22px;
    stroke: currentColor;
    fill: none;
    transition: transform 0.3s ease;
  }

  /* RTL Arrow Hover Move */
  .tw-slider-container.dir-rtl .swiper-arrow-btn.prev-btn:hover svg {
    transform: translateX(3px);
  }
  .tw-slider-container.dir-rtl .swiper-arrow-btn.next-btn:hover svg {
    transform: translateX(-3px);
  }

  /* LTR Arrow Hover Move */
  .tw-slider-container.dir-ltr .swiper-arrow-btn.prev-btn:hover svg {
    transform: translateX(-3px);
  }
  .tw-slider-container.dir-ltr .swiper-arrow-btn.next-btn:hover svg {
    transform: translateX(3px);
  }

  /* Swiper Pagination Bullets */
  .swiper-bullets-wrapper {
    position: absolute;
    bottom: clamp(1.2rem, 3vh, 2.5rem);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0.6rem;
    z-index: 10;
    padding: 0.4rem 0.8rem;
    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .bullet-dot {
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.4);
    border: none;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 0;
  }

  .bullet-dot:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  .bullet-dot.active {
    width: 26px;
    background: #ffffff;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
  }

  /* Shopify-Style Autoplay Progress Circle & Play/Pause Button */
  .autoplay-progress-btn {
    position: absolute;
    bottom: clamp(1.2rem, 3vh, 2.5rem);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    padding: 0;
    transition: all 0.3s ease;
  }

  .tw-slider-container.dir-rtl .autoplay-progress-btn {
    left: clamp(1.2rem, 3vw, 2.5rem);
    right: auto;
  }

  .tw-slider-container.dir-ltr .autoplay-progress-btn {
    right: clamp(1.2rem, 3vw, 2.5rem);
    left: auto;
  }

  .autoplay-progress-btn:hover {
    background: rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.06);
  }

  .autoplay-progress-btn svg.circle-progress {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .autoplay-progress-btn circle.bg-circle {
    stroke: rgba(255, 255, 255, 0.15);
    stroke-width: 2.5;
    fill: none;
  }

  .autoplay-progress-btn circle.progress-circle {
    stroke: #ffffff;
    stroke-width: 2.5;
    fill: none;
    stroke-dasharray: 100;
    stroke-dashoffset: var(--dash-offset, 0);
    transition: stroke-dashoffset 0.1s linear;
  }

  .autoplay-progress-btn .control-icon {
    position: relative;
    z-index: 2;
    width: 16px;
    height: 16px;
    fill: currentColor;
  }

  /* Toast */
  .copy-toast {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translate(-50%, -20px);
    background: rgba(16, 185, 129, 0.95);
    backdrop-filter: blur(12px);
    color: #ffffff;
    padding: 0.65rem 1.6rem;
    border-radius: 999px;
    font-size: 0.92rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
    opacity: 0;
    pointer-events: none;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 50;
  }

  .copy-toast.show {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;
