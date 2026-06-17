import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { IntroLoader } from "@/components/IntroLoader";
import { IntroContext } from "@/components/IntroContext";
import { Layout } from "@/components/layout/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Entrepreneuriat from "@/pages/Entrepreneuriat";
import Articles from "@/pages/Articles";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function App() {
  // Devient true à la fin du loading : déclenche la chorégraphie (Header + Home).
  const [introReady, setIntroReady] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <IntroContext.Provider value={introReady}>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/entrepreneuriat" element={<Entrepreneuriat />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster position="bottom-right" />
          <IntroLoader onDone={() => setIntroReady(true)} />
        </IntroContext.Provider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
