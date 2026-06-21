import { useEffect, useRef } from "react";
import sprite from "@/assets/mj-cursor.png";
import meta from "@/assets/mj-cursor.json";

// Follower « élastique » style busybeehoney avec chaîne de points.
// Modèle : une corde de N nœuds entre le curseur et MJ.
//   - nœud 0  → lerpe vers le curseur (le plus rapide)
//   - nœud i  → lerpe vers le nœud i-1
//   - MJ      → lerpe vers le dernier nœud (le plus lent)
// Chaque nœud a son propre ressort, donc tout le pointillé a un effet
// élastique : il s'étire quand la souris fonce, se rétracte quand elle s'arrête.
// Les points sont dessinés à la position exacte des nœuds → ils émergent du
// centre de MJ et s'enchaînent jusqu'au curseur, sans décalage.
const FOLLOW_STRENGTH = 0.085;   // lerp final de MJ vers le bout de la chaîne
const CHAIN_LENGTH = 14;          // nb de nœuds dans la chaîne (= nb de points)
const CHAIN_STRENGTH = 0.32;      // lerp d'un nœud vers le précédent
const SIZE = 44;                  // taille d'affichage de MJ (px)
const FRAME_MS = 100;             // durée d'une frame de danse
const DOT_RADIUS = 2.6;           // rayon de base d'un point (px)
const DOT_COLOR = "255, 255, 255";
const HIDE_NEAR_MJ = SIZE * 0.5;  // distance sous laquelle on cache le point pour pas qu'il s'écrase sur MJ

const FRAMES = meta.frames;

export function MoonwalkCursor() {
  const elRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = elRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Cible : position du curseur. Tous les nœuds + MJ démarrent au centre.
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    let tx = startX;
    let ty = startY;
    const chain: Array<{ x: number; y: number }> = Array.from({ length: CHAIN_LENGTH }, () => ({ x: startX, y: startY }));
    let mjX = startX;
    let mjY = startY;
    let visible = false;
    let rafId = 0;
    let lastFrameAt = 0;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
        canvas.style.opacity = "1";
      }
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
      canvas.style.opacity = "0";
    };

    const tick = (now: number) => {
      // 1) Avance la chaîne. Le 1er nœud court après le curseur, chacun
      // poursuit le précédent → corde qui s'étire/se rétracte naturellement.
      chain[0].x += (tx - chain[0].x) * CHAIN_STRENGTH;
      chain[0].y += (ty - chain[0].y) * CHAIN_STRENGTH;
      for (let i = 1; i < CHAIN_LENGTH; i++) {
        chain[i].x += (chain[i - 1].x - chain[i].x) * CHAIN_STRENGTH;
        chain[i].y += (chain[i - 1].y - chain[i].y) * CHAIN_STRENGTH;
      }

      // 2) MJ termine la chaîne : il rattrape le dernier nœud avec son propre lerp,
      // plus lent encore, ce qui crée l'élastique « final » derrière la traînée.
      const tail = chain[CHAIN_LENGTH - 1];
      mjX += (tail.x - mjX) * FOLLOW_STRENGTH;
      mjY += (tail.y - mjY) * FOLLOW_STRENGTH;
      el.style.transform = `translate3d(${mjX - SIZE / 2}px, ${mjY - SIZE / 2}px, 0)`;

      // 3) Dessine les points. On parcourt de la fin (côté MJ) au début (côté
      // curseur) : opacité et taille montent en se rapprochant du curseur.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = CHAIN_LENGTH - 1; i >= 0; i--) {
        const p = chain[i];
        // 1 côté curseur, 0 côté MJ
        const t = (CHAIN_LENGTH - 1 - i) / (CHAIN_LENGTH - 1);
        // Masque les points dans le disque de MJ pour qu'il ne se fasse pas
        // « pixelliser » par les points en surimpression.
        const dx = p.x - mjX;
        const dy = p.y - mjY;
        if (Math.hypot(dx, dy) < HIDE_NEAR_MJ) continue;
        const alpha = 0.18 + t * 0.6;
        const r = DOT_RADIUS * (0.55 + t * 0.7);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT_COLOR}, ${alpha.toFixed(3)})`;
        ctx.fill();
      }

      // 4) Frame de danse.
      if (now - lastFrameAt >= FRAME_MS) {
        frame = (frame + 1) % FRAMES;
        el.style.backgroundPosition = `-${frame * SIZE}px 0`;
        lastFrameAt = now;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 220ms ease",
        }}
      />
      <div
        ref={elRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: SIZE,
          height: SIZE,
          pointerEvents: "none",
          userSelect: "none",
          opacity: 0,
          zIndex: 9999,
          transition: "opacity 220ms ease",
          willChange: "transform",
          backgroundImage: `url(${sprite})`,
          backgroundSize: `${FRAMES * SIZE}px ${SIZE}px`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 0",
          imageRendering: "pixelated",
        }}
      />
    </>
  );
}
