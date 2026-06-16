import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

// Coquille partagée par toutes les pages : header sticky + contenu routé + footer.
// Le thème par défaut est "marine" ; chaque page peut le surcharger sur son propre wrapper.
export function Layout() {
  useSmoothScroll();

  return (
    <div className="theme-marine min-h-screen bg-theme-bg-primary">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
