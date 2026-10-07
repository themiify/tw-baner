export type MultilingualText = string | { ar?: string; en?: string; [key: string]: string | undefined };

export interface BannerSlide {
  // Background
  bg_type?: any;
  bg_video_url?: string;
  bg_image?: string;
  custom_bg_color?: string;
  theme_style?: any;
  bg_overlay_opacity?: number;

  // Alignment & Positioning
  content_v_align?: any; // فوق, في النص, تحت
  content_h_align?: any; // يمين, في النص, شمال

  // Text & Content (Multilingual supported)
  subheading?: MultilingualText;
  title: MultilingualText;
  title_highlight?: MultilingualText;
  subtitle?: MultilingualText;
  heading_color?: string;
  subheading_color?: string;

  // Actions & Links
  cta_text?: MultilingualText;
  url?: any;
  button_style?: any;
  btn_bg_color?: string;
  btn_text_color?: string;

  // Features
  badge_enabled?: boolean;
  badge_text?: MultilingualText;
  coupon_enabled?: boolean;
  coupon_code?: string;
  countdown_enabled?: boolean;
  countdown_end?: string;
  image?: string;
}

export interface PromoBannerConfig {
  height_desktop?: number; // In vh (e.g. 92)
  height_mobile?: number;  // In vh (e.g. 82)
  slider_autoplay?: boolean;
  slider_delay?: number;
  slider_navigation?: boolean;
  slider_pagination?: boolean;
  show_progress_btn?: boolean;
  slides?: BannerSlide[];

  // Fallbacks
  height_mode?: string;
  bg_type?: any;
  theme_style?: any;
  custom_bg_color?: string;
  bg_image?: string;
  bg_video_url?: string;
  bg_overlay_opacity?: number;
  title?: MultilingualText;
  subtitle?: MultilingualText;
  cta_text?: MultilingualText;
  cta_url?: string;
  image?: string;
  countdown_enabled?: boolean;
  countdown_end?: string;
  coupon_code?: string;
}
