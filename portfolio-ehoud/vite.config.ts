import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Avertit à partir de 700 kB pour ignorer le bruit des assets.
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        // Sépare les vendors lourds : chargement parallèle + cache long terme.
        // React change rarement, framer/gsap encore moins, donc l'utilisateur
        // ne re-télécharge que le chunk modifié.
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion"],
          "radix-vendor": ["@radix-ui/react-dialog", "@radix-ui/react-slot"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
        },
      },
    },
  },
});
