import { useState } from "react";
import thin from "@/assets/fonts/bristone-thin.woff2";
import regular from "@/assets/fonts/bristone-regular.woff2";
import medium from "@/assets/fonts/bristone-medium.woff2";
import bold from "@/assets/fonts/bristone-bold.woff2";
import display from "@/assets/fonts/bristone-display.woff2";
import hollow from "@/assets/fonts/bristone-display-hollow.woff2";

// Panneau de test TEMPORAIRE — à supprimer une fois la variante choisie.
// Chaque variante a un nom de famille unique pour éviter tout conflit avec
// une police installée localement.
const VARIANTS = [
  { id: "Thin", family: "BTest Thin", url: thin },
  { id: "Regular", family: "BTest Regular", url: regular },
  { id: "Medium", family: "BTest Medium", url: medium },
  { id: "Bold", family: "BTest Bold", url: bold },
  { id: "Display", family: "BTest Display", url: display },
  { id: "Hollow", family: "BTest Hollow", url: hollow },
];

export function FontTester() {
  const [selected, setSelected] = useState<(typeof VARIANTS)[number] | null>(null);

  const faces = VARIANTS.map(
    (v) => `@font-face{font-family:"${v.family}";src:url(${v.url}) format("woff2");font-display:swap;}`,
  ).join("\n");

  // Quand une variante est choisie, on force tous les grands titres dessus.
  const override = selected
    ? `.font-poster{font-family:"${selected.family}","Work Sans",sans-serif !important;}`
    : "";

  return (
    <>
      <style>{faces + "\n" + override}</style>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 99999,
          background: "#0b1f3a",
          color: "#EBF7FD",
          padding: 14,
          width: 340,
          maxHeight: "100vh",
          overflow: "auto",
          fontFamily: "monospace",
          fontSize: 12,
          boxShadow: "0 0 24px rgba(0,0,0,.6)",
        }}
      >
        <div style={{ marginBottom: 10, lineHeight: 1.4 }}>
          PANNEAU DE TEST — clique une variante : elle s'applique en direct aux grands titres du site.
          {selected && (
            <div style={{ marginTop: 6, color: "#79CDF2" }}>
              ✅ Sélection actuelle : <strong>{selected.id}</strong> — dis-moi ce nom et je le verrouille.
            </div>
          )}
        </div>
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => setSelected(v)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              margin: "8px 0",
              padding: "10px 12px",
              background: selected?.id === v.id ? "#1178B7" : "#173861",
              color: "#EBF7FD",
              border: "1px solid #79CDF2",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: `"${v.family}", sans-serif`,
                fontSize: 24,
                textTransform: "uppercase",
                display: "block",
                lineHeight: 1.1,
              }}
            >
              Je donne une voix
            </span>
            <span style={{ opacity: 0.7 }}>→ {v.id}</span>
          </button>
        ))}
      </div>
    </>
  );
}
