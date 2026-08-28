import { Cagliostro, Bricolage_Grotesque } from "next/font/google";

/**
 * Kokoro typography — both faces are self-hosted by next/font at build time
 * (no runtime request to Google, font-display: swap by default).
 *
 * - Cagliostro         → expressive display headings & branded moments
 * - Bricolage Grotesque → body copy, navigation, buttons, labels, UI
 */

export const cagliostro = Cagliostro({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-cagliostro",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bricolage",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "Segoe UI",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});
