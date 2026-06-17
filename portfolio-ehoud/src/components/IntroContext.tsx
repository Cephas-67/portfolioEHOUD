import { createContext, useContext } from "react";

// Passe à `true` quand l'écran de chargement a fini (les blocs commencent à
// s'ouvrir). Le Header et la Home n'enclenchent leur chorégraphie qu'à ce moment.
export const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);
