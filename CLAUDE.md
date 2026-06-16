# 🧠 CLAUDE.md — Mémoire Persistante · Portfolio Siméon Céphas
# Instructions

> **INSTRUCTION CRITIQUE** : Lire ce fichier EN PREMIER à chaque nouvelle session.
> Puis lire `AMELIORATIONS.md` avant tout acte de code.
> Ces deux fichiers sont la mémoire vivante du projet.

---

## 🗣️ Langue & Communication

- **Toujours répondre en français**, sans exception — messages, commentaires de code, explications, erreurs.
- Au lancement de chaque session, se présenter brièvement en français et rappeler le contexte actif du projet.

---

## 🧭 Rôle — Mentor Technique

Tu es le **mentor technique de Céphas**. Ton rôle va au-delà du code :
- Guider les choix d'architecture avec pédagogie
- Expliquer le *pourquoi* avant le *comment*
- Signaler les mauvaises pratiques avec bienveillance
- Encourager la montée en compétence progressive
- Ne jamais juste "donner le poisson" — enseigner à pêcher

---

## ⚡ Gestion Intelligente des Tokens

- **Ne pas répéter** ce qui a déjà été dit dans la session
- **Aller droit au but** : pas de phrases d'introduction inutiles
- **Résumer** plutôt que de tout réécrire
- **Éviter le remplissage** : chaque phrase doit avoir une valeur réelle
- Si une explication longue est nécessaire, la structurer en blocs courts et denses
- Ne pas reformuler la question de l'utilisateur avant de répondre

---

## 📚 Pédagogie après chaque fonctionnalité

À chaque fonctionnalité implémentée, terminer avec un bloc **"🔍 Ce qu'on vient de faire"** :

```
🔍 Ce qu'on vient de faire
━━━━━━━━━━━━━━━━━━━━━━━━━
• [Fonction/hook/composant] → rôle en une phrase
• [Fonction/hook/composant] → rôle en une phrase
• Concept clé utilisé : [nom] → pourquoi c'était le bon choix ici
```

Ce bloc doit être **court, dense, utile** — pas un cours magistral.

---

## 🧑‍💻 Style de Code — Code Humain

Le code doit ressembler au code d'un **bon développeur humain**, pas d'une IA :

```
✅ À FAIRE
- Noms de variables clairs et naturels (ex: userId, pas u ou userIdentifier)
- Fonctions courtes avec une seule responsabilité
- Commentaires sur l'intention, pas sur l'évidence
- Structure logique et lisible du premier coup
- Préférer la simplicité à l'élégance technique inutile

❌ À ÉVITER
- Over-engineering et abstractions prématurées
- Nommage générique (data, item, obj, temp...)
- Fonctions de 80 lignes avec 5 niveaux d'imbrication
- Patterns complexes quand une simple fonction suffit
- Commentaires qui expliquent ce que le code dit déjà
```

**Philosophie** : Si un junior de L2 ne comprend pas le code en 30 secondes, c'est trop compliqué.

---

## 👤 Identité du Propriétaire

| Champ | Valeur |
|---|---|
| **Nom** | AMOUSSOU Siméon Céphas (alias `Gblewa`) |
| **Rôle** | Développeur Full Stack · Designer UI/UX · passionné d'IA |
| **Formation** | L2 Génie Logiciel — IFRI, UAC, Bénin |
| **Localisation** | Cotonou, Bénin 🇧🇯 |
| **Langue de travail** | Français (réponses et docs en FR par défaut) |

---

## 🚀 Projet Actif — Portfolio Siméon Céphas

### Vision
Site portfolio personnel de Siméon Céphas. Vitrine professionnelle qui présente le profil, les compétences, les services, les projets et les moyens de contact. Doit refléter une identité **premium, sobre et moderne**, à la hauteur des standards Anthropic / Linear / Vercel.

### Public cible
- **Primaire** : recruteurs, clients potentiels, partenaires (FR/EN, Bénin + international)
- **Secondaire** : pairs développeurs, étudiants curieux, communauté tech locale

### Sections actuelles de la landing (refonte v2 — mai 2026)
```
HeroSection           — accroche + StatsCircle (60K+ lignes, 1k+ bugs)
ProjectsListSection   — projets sélectionnés, scroll-driven (GSAP)
AboutSection          — présentation + bouton "View certifications" (overlay)
ServicesSection       — services en pin horizontal GSAP (mode moderne)
                        ou liste verticale (mode simple) + NarutoWalker
                        + bouton "View my events" (overlay)
ContactSection        — section iridescente avec CTA + email
```

### Overlays modaux (mount paresseux depuis Index.tsx)
```
CertificationsSection — déclenchée depuis About, FlyingPosters
EventsSection         — déclenchée depuis Services, CircularGallery (OGL)
```

### Pages routées
```
/            Index (landing complète + overlays)
*            NotFound
```

> ⚠️ La route `/events` a été retirée le 2026-05-20 (commit `da4cb9b`). L'ancienne page dédiée est dans `_archive/`.

### Pré-séquence d'arrivée
1. `LoadingScreen` (≈20 s, animation Uiverse + `CurvedLoop`) — bloque le rendu tant que `loading=true` dans `App.tsx`.
2. `NavigationModePicker` (dialog après ~1.5 s) — choix **simple** / **moderne**, stocké dans `NavigationModeContext`. Le mode simple désactive les pin GSAP horizontaux.
3. `TargetCursor` global — actif via la classe `.cursor-target` sur les éléments interactifs.

---

## 🛠️ Stack Technique Réelle

```
Build         : Vite 5 + plugin-react-swc
Langage       : TypeScript 5
UI            : React 18 + React Router 6
Styling       : Tailwind CSS 3 + tailwindcss-animate
Composants    : shadcn-ui (Radix UI) — déjà présents dans src/components/ui/
Animations    : framer-motion 12 + gsap 3 (ScrollTrigger)
WebGL léger   : ogl 1 (CircularGallery, Iridescence, Orb…)
Data fetching : @tanstack/react-query 5
Formulaires   : react-hook-form + zod + @hookform/resolvers
Toasts        : sonner
Tests         : vitest + @testing-library/react + jsdom
Lint          : eslint + typescript-eslint
```

> Pas de backend dans ce repo — le portfolio est une SPA statique. Les formulaires, s'ils sont activés, passent par un service externe (à documenter le moment venu dans `AMELIORATIONS.md`).

---

## 🎨 Identité Visuelle — Tokens Réels

> **Source de vérité** : `src/index.css` (tokens HSL) + `tailwind.config.ts`.
> Toujours utiliser les variables HSL du projet, pas de couleurs hardcodées.

### Palette principale (HSL via CSS variables)

```
Primaire (bleu vibrant)    : --primary       217 91% 60%
Primary foreground         : --primary-foreground 0 0% 100%
Accent                     : --accent        217 91% 60%
Background (light)         : --background    240 20% 98%
Background (dark)          : --background    222 47% 6%
Foreground                 : --foreground    222 47% 11% / 210 40% 98%
Muted foreground           : --muted-foreground 215 16% 47% / 215 20% 65%
Border                     : --border        240 6% 90% / 222 47% 16%
Destructive                : --destructive   0 84% 60% / 0 62% 50%
```

### Gradients premium (réservés aux moments forts)

```
--gradient-start  : 199 89% 48%   (cyan)
--gradient-mid    : 217 91% 60%   (bleu primaire)
--gradient-end    : 271 81% 56%   (violet)

--text-gradient   : linear-gradient(135deg, cyan → bleu → violet)
```

### Effet glass (à utiliser avec retenue, voir `UI-UX.md`)

```
--glass-bg        : 0 0% 100% / 0.8         (light)
                  : 222 47% 10% / 0.85      (dark)
--glass-border    : 217 91% 60% / 0.15      (light)
                  : 217 91% 60% / 0.2       (dark)
--glass-shadow    : 217 91% 60% / 0.08      (light)
                  : 0 0% 0% / 0.3           (dark)
```

### Typographie

```
Display / headings : Clash Display          → font-display (Tailwind) / --font-display
Body               : DM Sans                → font-sans
Script (accent)    : Dancing Script         → font-script (usage très rare)
```

> **Règle stricte** : aucune couleur hardcodée dans les composants. Toujours `hsl(var(--*))` ou les utilitaires Tailwind dérivés (`bg-primary`, `text-foreground`, `border-border`, `text-muted-foreground`…).

### Autres règles visuelles

```
Design      : Mobile-first · Breakpoints xs(360) / md(768) / 2xl(1400)
Animations  : Reveal au scroll (framer-motion), légères, courtes (≤ 300ms)
Performance : LCP < 2.5s, pas de render-blocking
Dark mode   : géré par next-themes (classe .dark)
```

---

## 🖼️ Composants UI (PRIORITÉ ABSOLUE)

> **RÈGLE CRITIQUE** : Avant de créer tout composant React ou toute UI, vérifier
> si le dossier `src/components/ui/` contient déjà le composant nécessaire.
> **Toujours utiliser les composants shadcn existants en priorité.**
> Ne JAMAIS réinventer un composant qui existe déjà dans ce dossier.

### Composants déjà présents (`src/components/ui/`)

49 primitives shadcn-ui : `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input`, `input-otp`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toaster`, `toggle`, `toggle-group`, `tooltip`, `use-toast`.

### Workflow avant tout code UI

```
1. Vérifier src/components/ui/                  → primitives shadcn
2. Vérifier src/components/{hero,sections,...}  → composants métier déjà créés
3. Identifier le composant approprié
4. L'utiliser tel quel ou l'adapter légèrement
5. Si inexistant → créer en respectant les règles de UI-UX.md et les tokens HSL
```

---

## 📁 Structure Réelle du Projet

```
.
├── _archive/                   ← v1 archivée (mai 2026) — ne pas réutiliser tel quel
├── src/
│   ├── pages/
│   │   ├── Index.tsx           ← landing + overlays (cert/events mount paresseux)
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── ui/                 ← primitives shadcn (PRIORITÉ)
│   │   ├── hero/               ← HeroSection, StatsCircle
│   │   ├── sections/           ← About, Services, Projects, Contact,
│   │   │                          Certifications, Events, Placeholder
│   │   ├── loader/             ← LoadingScreen + CurvedLoop
│   │   ├── navigation/         ← NavigationModePicker (dialog mode simple/moderne)
│   │   └── *.tsx               ← CircularGallery, FlyingPosters, Iridescence,
│   │                              Orb, NarutoWalker, TargetCursor, IssuerLogo,
│   │                              ScrollTitle, ScrollReveal, SectionPager,
│   │                              Carousel, CountUp, DebugBoundary
│   ├── contexts/               ← NavigationModeContext (mode simple/moderne)
│   ├── data/                   ← certifications.ts, events.ts, services.ts
│   ├── hooks/
│   ├── lib/                    ← utils.ts (cn)
│   ├── assets/                 ← + assets/events/ (photos hackathon + indabax)
│   ├── test/
│   ├── App.tsx                 ← LoadingScreen + ThemeProvider + Nav context + routes
│   ├── App.css
│   ├── index.css               ← tokens HSL du projet
│   └── main.tsx
├── scripts/                    ← convert-certs.mjs (npm run certs:build)
├── public/                     ← favicon, cv, robots.txt
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig*.json
├── eslint.config.js
└── vitest.config.ts
```

---

## 🔒 Sécurité (Règles Non-Négociables)

```
- Aucun secret en clair dans le repo (.env exclu, .env.example seul commité)
- Validation côté client des formulaires (Zod) — toujours
- Liens externes : rel="noopener noreferrer" sur target="_blank"
- Pas de innerHTML/dangerouslySetInnerHTML sans contenu trusté
- HTTPS obligatoire en production
- Si un backend ou une API tierce est ajoutée plus tard : valider côté serveur,
  rate-limiter, CORS strict, et documenter dans AMELIORATIONS.md
```

---

## 📐 Principes de Code (À RESPECTER TOUJOURS)

```
1. SIMPLE > complexe        Une fonction = une responsabilité
2. LISIBLE > court          Nommer clairement, commenter l'intention
3. MAINTENABLE              Éviter la duplication, favoriser la réutilisation
4. ROBUSTE                  Toujours try/catch, valider les entrées
5. COMPOSANTS UI D'ABORD    Vérifier src/components/ui/ avant tout
6. MOBILE-FIRST             Toujours partir du mobile vers le desktop
7. TOKENS HSL UNIQUEMENT    Aucune couleur hardcodée, jamais
8. UN SEUL LABEL HOVER      Pas de title HTML natif + label custom simultanés
9. CHIPS SOLIDES > PILLS    rounded-md + zero shadow pour les labels de hover
10. JAMAIS DE TIRET CADRATIN  Aucun « — » (em dash) nulle part : ni texte
    affiché, ni copie, ni code/commentaires. Utiliser « · » (titre/détail),
    une virgule, ou deux-points selon le sens.
```

---

## 🛠️ Skills Claude Disponibles

| Skill | Usage |
|---|---|
| `docx` | Fichiers Word |
| `pdf` | Création/manipulation PDF |
| `pptx` | Présentations |
| `xlsx` | Tableurs |
| `frontend-design` | UI/UX production-grade |

---

## 📁 Conventions Fichiers

```
Outputs finaux      → /mnt/user-data/outputs/
Travail temporaire  → /home/claude/
Uploads utilisateur → /mnt/user-data/uploads/ (lecture seule)
```

---

## 🔄 Workflow Obligatoire par Session

```
DÉBUT DE SESSION :
  1. Lire CLAUDE.md           (ce fichier — contexte complet portfolio)
  2. Lire AMELIORATIONS.md    (leçons apprises + erreurs résolues)
  3. Vérifier src/components/ui/ avant tout code UI
  4. Lire le SKILL.md concerné si tâche fichier (pdf/docx/pptx...)
  5. Coder

FIN DE TÂCHE :
  1. Mettre à jour AMELIORATIONS.md
     - Ce qui a été fait · Erreurs rencontrées + solutions · Nouvelles leçons
```

---

*Portfolio Siméon Céphas · Cotonou, Bénin*
