import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      screens: {
        xs: "360px",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
      colors: {
        navy: "hsl(var(--navy))",
        sky: "hsl(var(--sky))",
        blue: "hsl(var(--blue))",
        logo: "hsl(var(--logo))",
        pale: "hsl(var(--pale))",
        // Rôles thématiques par section (système hérité du modèle)
        theme: {
          "bg-primary": "hsl(var(--theme-bg-primary))",
          "bg-secondary": "hsl(var(--theme-bg-secondary))",
          "text-primary": "hsl(var(--theme-text-primary))",
          "text-secondary": "hsl(var(--theme-text-secondary))",
          accent: "hsl(var(--theme-accent))",
        },
      },
      fontFamily: {
        // 3 rôles : Work Sans (corps) · Bristone Display (navbar/footer/labels) · Pinyon Script (grands titres)
        sans: ['"Work Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Bristone Display LBC"', '"Work Sans"', "sans-serif"],
        // Grands titres calligraphiés. L'horloge garde Mokgech via la classe .font-ios.
        script: ['"Pinyon Script LBC"', "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
