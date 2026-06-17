import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { IntroLoader } from "@/components/IntroLoader";
import { IntroContext } from "@/components/IntroContext";
import { Layout } from "@/components/layout/Layout";
import { preloadHeroes } from "@/lib/preloadHeroes";

const queryClient = new QueryClient();

function App() {
  // Devient true à la fin du loading : déclenche la chorégraphie (Header + Home).
  const [introReady, setIntroReady] = useState(false);

  // Pendant l'intro, on précharge les images de hero des autres pages pour qu'elles
  // soient déjà en cache au premier clic (pas de flash « fond bleu » avant l'image).
  useEffect(() => {
    preloadHeroes();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <IntroContext.Provider value={introReady}>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
          <Toaster position="bottom-right" />
          <IntroLoader onDone={() => setIntroReady(true)} />
        </IntroContext.Provider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
