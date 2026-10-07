import { css as E, LitElement as I, html as i } from "lit";
import { property as j, state as u } from "lit/decorators.js";
const D = E`
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
var F = Object.defineProperty, p = (S, e, t, n) => {
  for (var r = void 0, a = S.length - 1, o; a >= 0; a--)
    (o = S[a]) && (r = o(e, t, r) || r);
  return r && F(e, t, r), r;
};
const k = class k extends I {
  constructor() {
    super(...arguments), this.currentSlideIndex = 0, this.isPaused = !1, this.isCopied = !1, this.showToast = !1, this.toastMessage = "", this.autoplayProgress = 0, this.countdownState = {};
  }
  connectedCallback() {
    super.connectedCallback(), this.startAutoplay(), this.startCountdownLoop();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopAutoplay(), this.countdownTimer && clearInterval(this.countdownTimer);
  }
  updated(e) {
    e.has("config") && (this.currentSlideIndex = 0, this.autoplayProgress = 0, this.startAutoplay(), this.updateCountdowns());
  }
  // Robust value extractor for Salla Form Builder fields (handles array of selected objects or strings)
  getVal(e, t = "") {
    return e == null ? t : typeof e == "string" ? e : Array.isArray(e) && e.length > 0 ? typeof e[0] == "object" && e[0] !== null ? e[0].value !== void 0 ? String(e[0].value) : e[0].key ? String(e[0].key) : t : String(e[0]) : typeof e == "object" && e.value !== void 0 ? String(e.value) : t;
  }
  // Direction & Language detection (checks dir="ltr", dir="rtl", lang="en"/"ar", or localStorage)
  get isLtr() {
    var r;
    const e = (typeof localStorage < "u" ? localStorage.getItem("salla_demo_lang") : "") || "";
    if (e === "en") return !0;
    if (e === "ar") return !1;
    const t = (document.documentElement.getAttribute("dir") || ((r = document.body) == null ? void 0 : r.getAttribute("dir")) || "").toLowerCase(), n = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    return t === "ltr" ? !0 : t === "rtl" ? !1 : n.startsWith("en");
  }
  isTextEnglish(e) {
    return !e || typeof e != "string" || /[\u0600-\u06FF\u0750-\u077F]/.test(e) ? !1 : /[a-zA-Z]/.test(e);
  }
  get currentLang() {
    return this.isLtr ? "en" : "ar";
  }
  // Extract multilingual text based on current language/direction
  getLocalized(e, t = "") {
    if (e == null) return t;
    if (typeof e == "object" && !Array.isArray(e)) {
      const n = this.currentLang;
      if (e[n]) return String(e[n]);
      if (n === "en" && e.en) return String(e.en);
      if (n === "ar" && e.ar || e.ar) return String(e.ar);
      if (e.en) return String(e.en);
      const r = Object.keys(e)[0];
      return r ? String(e[r]) : t;
    }
    return Array.isArray(e) ? this.getVal(e, t) : String(e);
  }
  // Viewport Height (vh) evaluator
  parseHeight(e, t) {
    if (!e) return t;
    const n = String(e).trim();
    if (n.endsWith("vh") || n.endsWith("px") || n.endsWith("%")) return n;
    const r = parseFloat(n);
    return isNaN(r) ? t : r <= 100 ? `${r}vh` : `${r}px`;
  }
  // Robust switch evaluator (handles false, "false", 0, "0", "", null)
  isSwitchOn(e, t = !0) {
    return e == null ? t : e === !1 || e === "false" || e === 0 || e === "0" || e === "" || e === "off" ? !1 : !!e;
  }
  getEffectiveSlides() {
    var t;
    const e = (t = this.config) == null ? void 0 : t.slides;
    return Array.isArray(e) && e.length > 0 ? e : [
      {
        bg_type: "video",
        bg_video_url: "https://clothing-preset-volume.myshopify.com/cdn/shop/videos/c/vp/8a682a7e04ee4813bf2f722b01565a7e/8a682a7e04ee4813bf2f722b01565a7e.HD-1080p-4.8Mbps-89110328.mp4?v=0",
        bg_image: "https://clothing-preset-volume.myshopify.com/cdn/shop/files/preview_images/8a682a7e04ee4813bf2f722b01565a7e.thumbnail.0000000000.jpg?v=1784207448&width=1100",
        theme_style: "luxury-dark",
        bg_overlay_opacity: 25,
        content_v_align: "end",
        content_h_align: "center",
        subheading: {
          ar: "فلسفة الأناقة العصرية",
          en: "Philosophy of Style"
        },
        title: {
          ar: "فن الخياطة الراقية والأزياء الفاخرة لعام 2026",
          en: "The architecture of modern outerwear & premium tailoring"
        },
        title_highlight: {
          ar: "تشكيلة حصرية",
          en: "Exclusive Edit"
        },
        subtitle: {
          ar: "استمتع بأحدث مجموعات الأزياء الراقية والقصات العصرية المصممة بعناية فائقة لإطلالة تخطف الأنظار.",
          en: "Explore our curated runway collection, designed with meticulous craftsmanship for timeless elegance."
        },
        cta_text: {
          ar: "اكتشف التشكيلة الآن",
          en: "Explore Collection"
        },
        url: "https://salla.sa",
        button_style: "solid",
        coupon_enabled: !0,
        coupon_code: "VOLUME26",
        countdown_enabled: !0,
        countdown_end: "2026-12-31 23:59:00"
      },
      {
        bg_type: "image",
        bg_image: "https://clothing-preset-volume.myshopify.com/cdn/shop/files/Landscape_20banner_20-_2009-Wrap_20coat_20Landscape_20Banner_20Black_203-4_2001v01.jpg?v=1782913382&width=2000",
        theme_style: "luxury-dark",
        bg_overlay_opacity: 35,
        content_v_align: "end",
        content_h_align: "start",
        subheading: {
          ar: "قطع جاهزة للارتداء",
          en: "Ready-to-wear Pieces"
        },
        title: {
          ar: "تصاميم كلاسيكية بإتقان استثنائي من كبار المصممين",
          en: "Curated essentials & signature fits from leading designers"
        },
        title_highlight: {
          ar: "خصم 30%",
          en: "30% OFF"
        },
        subtitle: {
          ar: "تصاميم استثنائية من نخبة المصممين مع شحن فوري مجاني لكافة مدن المملكة وضمان ذهبي للاستبدال.",
          en: "Exceptional cuts, breathable luxury textiles, and bespoke details tailored for the discerning eye."
        },
        cta_text: {
          ar: "تسوق التشكيلة الفاخرة",
          en: "Shop The Edit"
        },
        url: "https://salla.sa",
        button_style: "glass",
        coupon_enabled: !0,
        coupon_code: "VIPSTYLE",
        countdown_enabled: !1,
        countdown_end: "2026-11-20 20:00:00"
      },
      {
        bg_type: "color",
        custom_bg_color: "#064e3b",
        theme_style: "salla-emerald",
        bg_overlay_opacity: 40,
        content_v_align: "center",
        content_h_align: "center",
        subheading: {
          ar: "عروض حصرية لفترة محدودة",
          en: "Limited Time Offer"
        },
        title: {
          ar: "أقوى تخفيضات الموسم على كافة التشكيلات المختارة",
          en: "Season Finale: Architectural silhouettes at unmissable values"
        },
        title_highlight: {
          ar: "خصم حتى 50%",
          en: "Up to 50% OFF"
        },
        subtitle: {
          ar: "فرصة لا تعوض لتجديد خزانة ملابسك بأرقى القطع العصرية بأسعار استثنائية وشحن سريع.",
          en: "An exclusive opportunity to upgrade your wardrobe with iconic luxury fashion and complimentary express shipping."
        },
        cta_text: {
          ar: "استفد من العرض الآن",
          en: "Claim Offer Now"
        },
        url: "https://salla.sa",
        button_style: "solid",
        coupon_enabled: !0,
        coupon_code: "SALLA50",
        countdown_enabled: !0,
        countdown_end: "2026-12-31 23:59:00"
      }
    ];
  }
  startAutoplay() {
    var c, l;
    if (this.stopAutoplay(), this.getEffectiveSlides().length <= 1 || !this.isSwitchOn((c = this.config) == null ? void 0 : c.slider_autoplay, !0)) return;
    const r = Math.max(2, Number((l = this.config) == null ? void 0 : l.slider_delay) || 5) * 1e3, a = 100, o = a / r * 100;
    this.progressTimer = window.setInterval(() => {
      this.isPaused || (this.autoplayProgress += o, this.autoplayProgress >= 100 && (this.autoplayProgress = 0, this.nextSlide()));
    }, a);
  }
  stopAutoplay() {
    this.progressTimer && (clearInterval(this.progressTimer), this.progressTimer = void 0), this.autoplayTimer && (clearInterval(this.autoplayTimer), this.autoplayTimer = void 0);
  }
  toggleAutoplay() {
    this.isPaused = !this.isPaused;
  }
  nextSlide() {
    const e = this.getEffectiveSlides();
    this.currentSlideIndex = (this.currentSlideIndex + 1) % e.length, this.autoplayProgress = 0;
  }
  prevSlide() {
    const e = this.getEffectiveSlides();
    this.currentSlideIndex = (this.currentSlideIndex - 1 + e.length) % e.length, this.autoplayProgress = 0;
  }
  goToSlide(e) {
    this.currentSlideIndex = e, this.autoplayProgress = 0;
  }
  parseTargetDate(e) {
    const t = Date.now() + 12096e5, n = new Date(t).toISOString().replace("T", " ").substring(0, 19);
    if (!e || typeof e != "string")
      return { target: t, cleanDate: n };
    let r = e.trim();
    if (!r)
      return { target: t, cleanDate: n };
    let a = r.replace(" ", "T");
    /^\d{4}-\d{2}-\d{2}$/.test(a) ? a += "T23:59:59" : /^\d{4}\/\d{2}\/\d{2}$/.test(a) && (a = a.replace(/\//g, "-") + "T23:59:59");
    let o = new Date(a).getTime();
    return isNaN(o) && (o = new Date(r).getTime()), isNaN(o) ? { target: t, cleanDate: n } : { target: o, cleanDate: a.replace("T", " ") };
  }
  startCountdownLoop() {
    this.updateCountdowns(), this.countdownTimer = window.setInterval(() => {
      this.updateCountdowns();
    }, 1e3);
  }
  updateCountdowns() {
    const e = this.getEffectiveSlides(), t = {}, n = Date.now();
    e.forEach((r, a) => {
      if (this.isSwitchOn(r.countdown_enabled, !1)) {
        const { target: o } = this.parseTargetDate(r.countdown_end), c = o - n;
        if (c <= 0)
          t[a] = { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: !0 };
        else {
          const l = Math.floor(c / 1e3), x = Math.floor(l / 86400), g = Math.floor(l % 86400 / 3600), h = Math.floor(l % 3600 / 60), m = l % 60;
          t[a] = { days: x, hours: g, minutes: h, seconds: m, isExpired: !1 };
        }
      }
    }), this.countdownState = t;
  }
  formatNumber(e) {
    return String(e).padStart(2, "0");
  }
  async handleCopyCoupon(e) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText)
        await navigator.clipboard.writeText(e);
      else {
        const t = document.createElement("input");
        t.value = e, document.body.appendChild(t), t.select(), document.execCommand("copy"), document.body.removeChild(t);
      }
      this.isCopied = !0, this.toastMessage = this.isLtr ? `Coupon code (${e}) copied!` : `تم نسخ كود الخصم (${e}) بنجاح!`, this.showToast = !0, setTimeout(() => {
        this.isCopied = !1, this.showToast = !1;
      }, 3500);
    } catch {
      this.toastMessage = this.isLtr ? `Coupon code: ${e}` : `كود الخصم: ${e}`, this.showToast = !0, setTimeout(() => {
        this.showToast = !1;
      }, 3500);
    }
  }
  render() {
    var g, h, m, w, v;
    const e = this.getEffectiveSlides(), t = Math.min(this.currentSlideIndex, Math.max(0, e.length - 1)), n = this.parseHeight((g = this.config) == null ? void 0 : g.height_desktop, "92vh"), r = this.parseHeight((h = this.config) == null ? void 0 : h.height_mobile, "82vh"), a = `--banner-height-desktop: ${n}; --banner-height-mobile: ${r};`, o = this.isSwitchOn((m = this.config) == null ? void 0 : m.slider_navigation, !0) && e.length > 1, c = this.isSwitchOn((w = this.config) == null ? void 0 : w.slider_pagination, !0) && e.length > 1, l = this.isSwitchOn((v = this.config) == null ? void 0 : v.show_progress_btn, !0) && e.length > 1, x = 100 - this.autoplayProgress;
    return i`
      <div
        class="tw-slider-container ${this.isLtr ? "dir-ltr" : "dir-rtl"}"
        style="${a}"
        @mouseenter="${() => this.isPaused = !0}"
        @mouseleave="${() => this.isPaused = !1}"
      >
        <!-- Slides Track -->
        <div class="slides-track">
          ${e.map((y, b) => this.renderSlide(y, b === t, b))}
        </div>

        <!-- Rolling Arrow Navigation -->
        ${o ? i`
              <button
                type="button"
                class="swiper-arrow-btn prev-btn"
                aria-label="${this.isLtr ? "Previous slide" : "الشريحة السابقة"}"
                title="${this.isLtr ? "Previous slide" : "الشريحة السابقة"}"
                @click="${() => this.prevSlide()}"
              >
                <!-- Direction-aware Previous Arrow -->
                <svg viewBox="0 0 24 24">
                  <path
                    d="${this.isLtr ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                class="swiper-arrow-btn next-btn"
                aria-label="${this.isLtr ? "Next slide" : "الشريحة التالية"}"
                title="${this.isLtr ? "Next slide" : "الشريحة التالية"}"
                @click="${() => this.nextSlide()}"
              >
                <!-- Direction-aware Next Arrow -->
                <svg viewBox="0 0 24 24">
                  <path
                    d="${this.isLtr ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}"
                    stroke-width="2.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            ` : ""}

        <!-- Bullets Pagination -->
        ${c ? i`
              <div class="swiper-bullets-wrapper" role="tablist">
                ${e.map(
      (y, b) => i`
                    <button
                      type="button"
                      class="bullet-dot ${b === t ? "active" : ""}"
                      aria-label="${this.isLtr ? `Slide ${b + 1}` : `شريحة ${b + 1}`}"
                      @click="${() => this.goToSlide(b)}"
                    ></button>
                  `
    )}
              </div>
            ` : ""}

        <!-- Shopify-Style Circular Autoplay Progress & Play/Pause Button -->
        ${l ? i`
              <button
                type="button"
                class="autoplay-progress-btn"
                aria-label="${this.isPaused ? this.isLtr ? "Play slideshow" : "تشغيل العرض التلقائي" : this.isLtr ? "Pause slideshow" : "إيقاف العرض التلقائي مؤقتاً"}"
                title="${this.isPaused ? this.isLtr ? "Play" : "تشغيل" : this.isLtr ? "Pause" : "إيقاف مؤقت"}"
                @click="${() => this.toggleAutoplay()}"
              >
                <svg class="circle-progress" viewBox="0 0 36 36">
                  <circle class="bg-circle" cx="18" cy="18" r="15.9155" />
                  <circle
                    class="progress-circle"
                    cx="18"
                    cy="18"
                    r="15.9155"
                    style="--dash-offset: ${x};"
                  />
                </svg>

                ${this.isPaused ? i`
                      <svg class="control-icon" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ` : i`
                      <svg class="control-icon" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    `}
              </button>
            ` : ""}

        <!-- Toast Feedback -->
        <div class="copy-toast ${this.showToast ? "show" : ""}">
          <span>✓</span>
          <span>${this.toastMessage}</span>
        </div>
      </div>
    `;
  }
  renderSlide(e, t, n) {
    const r = this.isSwitchOn(e.coupon_enabled, !0) && !!e.coupon_code, a = this.isSwitchOn(e.countdown_enabled, !1), { cleanDate: o } = this.parseTargetDate(e.countdown_end), c = this.countdownState[n] || {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }, l = this.getVal(
      e.bg_type,
      e.bg_video_url ? "video" : e.bg_image ? "image" : "color"
    ), x = this.getVal(e.theme_style, "luxury-dark"), g = this.getVal(e.content_v_align, "end"), h = this.getVal(e.content_h_align, "center"), m = this.getVal(e.button_style, "solid"), w = this.getVal(e.url, "https://salla.sa"), v = this.getLocalized(e.subheading), y = this.getLocalized(e.title), b = this.getLocalized(e.title_highlight), $ = this.getLocalized(e.subtitle), C = this.getLocalized(e.cta_text, this.isLtr ? "Shop Now" : "تسوق الآن"), d = this.isLtr || this.isTextEnglish(C) || this.isTextEnglish(y), z = d ? "→" : "←", T = d ? "Code:" : "كود الخصم:", L = this.isCopied ? d ? "Copied" : "تم النسخ" : d ? "Copy" : "نسخ", A = d ? "Click to copy coupon code" : "انقر لنسخ كود الخصم", _ = (e.bg_overlay_opacity ?? 25) / 100, P = `v-${g} h-${h}`;
    let f = "";
    e.custom_bg_color && (f += `background: ${e.custom_bg_color}; `), e.heading_color && (f += `--heading-color: ${e.heading_color}; `), e.subheading_color && (f += `--subheading-color: ${e.subheading_color}; `), e.btn_bg_color && (f += `--btn-bg: ${e.btn_bg_color}; --banner-cta-bg: ${e.btn_bg_color}; `), e.btn_text_color && (f += `--btn-text: ${e.btn_text_color}; --banner-cta-text: ${e.btn_text_color}; `), e.btn_bg_color && e.btn_text_color && (f += `--banner-cta-hover-bg: ${e.btn_text_color}; --banner-cta-hover-text: ${e.btn_bg_color}; `);
    const M = `style-${m}`;
    return i`
      <div
        class="slide-item theme-${x} ${t ? "active" : ""}"
        style="${f}"
      >
        <!-- Background Media Layer -->
        ${l === "video" && e.bg_video_url ? i`
              <div class="bg-media-layer">
                <video autoplay muted loop playsinline poster="${e.bg_image || ""}">
                  <source src="${e.bg_video_url}" type="video/mp4" />
                </video>
                <div class="bg-overlay-filter" style="opacity: ${_};"></div>
              </div>
            ` : ""}

        ${l === "image" && (e.bg_image || e.image) ? i`
              <div class="bg-media-layer">
                <div
                  class="bg-image-cover"
                  style="background-image: url('${e.bg_image || e.image}');"
                ></div>
                <div class="bg-overlay-filter" style="opacity: ${_};"></div>
              </div>
            ` : ""}

        ${l === "color" ? i`
              <div class="bg-media-layer">
                <div class="bg-overlay-filter" style="opacity: ${_};"></div>
              </div>
            ` : ""}

        <!-- Full Bleed Flex Container with 9-Direction Alignment -->
        <div class="slide-inner-container ${P}">
          <div class="slide-content-box">
            <!-- Subheading -->
            ${v ? i`
                  <div class="slide-subheading">
                    <span class="slide-subheading-line"></span>
                    <span>${v}</span>
                    <span class="slide-subheading-line"></span>
                  </div>
                ` : ""}

            <!-- Heading -->
            <h2 class="slide-heading">
              ${y}
              ${b ? i`<span class="highlight-span"> ${b}</span>` : ""}
            </h2>

            <!-- Description -->
            ${$ ? i`<p class="slide-description">${$}</p>` : ""}

            <!-- Salla Countdown Block -->
            ${a ? i`
                  <div class="salla-countdown-container">
                    <span class="countdown-title">
                      <span class="countdown-pulse-dot"></span>
                      <span>${d ? "Limited Time Offer Ends In:" : "ينتهي العرض الترويجي خلال:"}</span>
                    </span>

                    <div class="luxury-timer-grid">
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(c.days)}</span>
                        <span class="timer-lbl">${d ? "Days" : "يوم"}</span>
                      </div>
                      <span class="timer-divider">:</span>
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(c.hours)}</span>
                        <span class="timer-lbl">${d ? "Hours" : "ساعة"}</span>
                      </div>
                      <span class="timer-divider">:</span>
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(c.minutes)}</span>
                        <span class="timer-lbl">${d ? "Mins" : "دقيقة"}</span>
                      </div>
                      <span class="timer-divider">:</span>
                      <div class="timer-card">
                        <span class="timer-val">${this.formatNumber(c.seconds)}</span>
                        <span class="timer-lbl">${d ? "Secs" : "ثانية"}</span>
                      </div>
                    </div>

                    <salla-count-down date="${o}" style="display:none;"></salla-count-down>
                  </div>
                ` : ""}

            <!-- Actions Row (CTA & 1-Click Coupon) -->
            <div class="slide-actions-row">
              <a
                href="${w}"
                class="luxury-btn ${M}"
                dir="${d ? "ltr" : "rtl"}"
              >
                <span>${C}</span>
                <span class="btn-arrow-icon">${z}</span>
              </a>

              ${r ? i`
                    <button
                      type="button"
                      class="coupon-pill-btn ${this.isCopied ? "copied" : ""}"
                      @click="${() => this.handleCopyCoupon(e.coupon_code)}"
                      title="${A}"
                      dir="${d ? "ltr" : "rtl"}"
                    >
                      <span class="coupon-lbl">${T}</span>
                      <span class="coupon-tag-badge">${e.coupon_code}</span>
                      <span class="coupon-action-badge">
                        <svg class="coupon-icon" viewBox="0 0 20 20" fill="currentColor">
                          ${this.isCopied ? i`<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />` : i`<path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" /><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />`}
                        </svg>
                        <span>${L}</span>
                      </span>
                    </button>
                  ` : ""}
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
k.styles = D;
let s = k;
p([
  j({ type: Object })
], s.prototype, "config");
p([
  u()
], s.prototype, "currentSlideIndex");
p([
  u()
], s.prototype, "isPaused");
p([
  u()
], s.prototype, "isCopied");
p([
  u()
], s.prototype, "showToast");
p([
  u()
], s.prototype, "toastMessage");
p([
  u()
], s.prototype, "autoplayProgress");
p([
  u()
], s.prototype, "countdownState");
typeof HTMLElement.registerSallaComponent == "function" && s.registerSallaComponent("salla-promo-banner");
customElements.get("promo-banner") || customElements.define("promo-banner", s);
typeof s < "u" && s.registerSallaComponent("salla-promo-banner");
export {
  s as default
};
