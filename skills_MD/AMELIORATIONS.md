# AMELIORATIONS.md — Journal Vivant (template réutilisable)

> **INSTRUCTION** : Lire ce fichier AVANT de coder dans toute nouvelle session.
> Mettre à jour APRÈS chaque tâche accomplie.
> Ce fichier grandit à chaque session — c'est la mémoire technique du projet.

---

## 🔧 Configuration projet (à remplir une fois)

| Placeholder | Description | Exemple |
|---|---|---|
| `{PROJECT_NAME}` | Nom du projet | Portfolio X / App Y |
| `{OWNER}` | Propriétaire / mainteneur | Nom Prénom |
| `{START_DATE}` | Date de création du journal | YYYY-MM-DD |

> Remplacer dans l'en-tête ci-dessous puis supprimer ce bloc.

---

## 📒 En-tête projet

```
Projet         : {PROJECT_NAME}
Mainteneur     : {OWNER}
Journal ouvert : {START_DATE}
```

---

## 🗂️ Format d'une Entrée

```markdown
### [YYYY-MM-DD] — [Titre court de la tâche]

**Contexte** : Ce qui était demandé
**Ce qui a été fait** : Actions réalisées (bullets)
**Erreurs rencontrées** : Problème exact + message si dispo
**Solution appliquée** : Comment ça a été résolu
**Leçon retenue** : Ce qu'il faut retenir pour la prochaine fois
**Skill utilisée** : Nom de la skill si applicable
**Fichiers produits / modifiés** : Chemins
```

---

## ✍️ Bonnes pratiques de tenue du journal

- **Une entrée = une session ou une tâche cohérente** — ne pas tout fusionner
- **Daté en ISO** (YYYY-MM-DD) — pas "hier", "la semaine dernière"
- **Bullets courts** — un bullet = une action ou une décision
- **Garder les erreurs et leur fix** — c'est la partie la plus précieuse pour la prochaine session
- **Lier les fichiers** au format `path/to/file.ext` (Markdown rendra le lien dans GitHub)
- **Section "Leçon retenue" obligatoire** — même quand tout s'est bien passé. Une session sans leçon = entrée jetable
- **Élaguer périodiquement** — archiver les entrées > 3 mois dans `AMELIORATIONS_archive.md` si le fichier dépasse ~500 lignes

---

## ✅ Journal des Tâches

<!-- Ajouter les entrées du plus récent en haut au plus ancien en bas -->

### {YYYY-MM-DD} — {Titre}

**Contexte** :

**Ce qui a été fait** :
-

**Erreurs rencontrées** :

**Solution appliquée** :

**Leçon retenue** :

**Fichiers modifiés** :

---

## 2026-06-18 · Audit perf scroll + réductions mobile (principe amoussouportfolio)

**Contexte** : Maintenance perf générale (mobile + PC), scroll smooth Lenis. Règle voulue : alléger les fonctionnalités CPU-lourdes sur mobile. Lenis = cœur, à garder partout.

**Décision Lenis** : gardé partout. Sa config par défaut ne smooth que la molette (`syncTouch` off) → au tactile le scroll reste natif, donc le monter sur mobile est inoffensif (pas de jank). Pas besoin de le couper. (NB : amoussouportfolio le DÉSACTIVE sur mobile, mais leur Lenis pilote GSAP ScrollTrigger ; ici on est en framer-motion `useScroll` qui lit le scroll réel que Lenis met à jour → rien à synchroniser.)

**Nouveau hook** : `useDeviceCapabilities.ts` (porté/simplifié de la réf) → `{ isTouch, isMobile, isLowEnd, prefersReducedMotion }`. `isLowEnd` = deviceMemory<=4 || cores<4 || (tactile && largeur<=768). Pas de détection WebGL (aucun composant WebGL ici).

**Réductions appliquées** :
- DotField (Home) : monté seulement si `!isTouch && !isLowEnd && !reduce` (canvas + ~8700 points + setInterval purement curseur → 0 bénéfice tactile). Le `bg-grain` reste visible dessous.
- InkReveal (Contact) : monté desktop seul. Il n'a AUCUN handler tactile → sur mobile il peignait un navy plein masquant le dégradé sans jamais le révéler. Sans lui, le dégradé bleu s'affiche directement (plus premium).
- ScrollShowcase (About) : `lightMode = reduce || isMobile || isLowEnd` → version statique (photo + phrase) au lieu de la séquence 760vh (scale 16x + rideau + 6 colonnes), trop lourde et anti-scroll-tactile.
- ParallaxImage + PageHero : parallax scroll-lié figé sur mobile/reduced (`willChange:transform` ajouté sur desktop).

**Repéré (à traiter plus tard)** : assets lourds qui pèsent sur le LCP : `logodef.svg` 1,8 Mo (probable raster embarqué → vectoriser ou remplacer par PNG/webp optimisé), `pexels-marina-zasorina` 1,26 Mo et `pexels-mart-production` 828 Ko (convertir en webp via sharp, cf. leçon du 2026-06-18 Contact). Bundle JS 571 Ko (179 Ko gzip) : code-split possible si besoin.

**Leçon retenue** : la bonne question mobile n'est pas « couper Lenis » mais « couper ce qui n'a pas de sens sans curseur » (canvas mouse-only) et « couper le scroll-jacking lourd » (séquences pin + gros scale, parallax multi-instances). Un canvas sans handler tactile sur mobile = pire que rien (calcul + rendu masquant). Centraliser la détection device dans un hook unique réutilisable.

**Fichiers** : `src/hooks/useDeviceCapabilities.ts` (nouveau), `src/pages/Home.tsx`, `src/pages/Contact.tsx`, `src/pages/About.tsx`, `src/components/ParallaxImage.tsx`, `src/components/PageHero.tsx`.

---

## 2026-06-18 · Perf : menu mobile fluide + séquence About + ajustements

**Contexte** : Retours après la généralisation du grain. 4 points : footer SANS grain, jank du menu mobile (ouverture + fermeture), jank de la photo veste dans la séquence scroll About, position horloge Home sur mobile.

**Ce qui a été fait** :
- Footer : grain retiré (revert `bg-grain` → `bg-theme-bg-primary`). Les footers n'en veulent pas.
- Menu mobile (`MobileMenu.tsx`) : (1) jank d'ouverture causé par `.grain-overlay` en `mix-blend-mode: overlay` qui se recompose à chaque frame pendant l'anim `clipPath` → voile supprimé (le `bg-grain` cuit suffit). (2) La fermeture par cercle ne se voyait pas : le wrapper extérieur faisait un fade opacity 0.2s qui masquait le cercle (0.65s) + un `delay: 0.45` retardait la fermeture → wrapper gardé opaque (`exit` opacity duration 0.01 delay 0.55) et cercle fermé sans délai (0.55s). Clic sur un lien = même cercle qui se referme au coin d'origine. `will-change: clip-path` ajouté.
- Séquence About (`ScrollShowcase`) : la photo veste « grattait » à cause de `drop-shadow-2xl` (filter) re-rasterisée à chaque frame pendant le `scale`. Fix : couche GPU dédiée via `[will-change:transform] [backface-visibility:hidden]` sur la photo, le texte zoom (scale 16x), le plan blanc et les 6 `RevealColumn`. `decoding="async"` sur la photo. (NB : `transform-gpu` Tailwind inutilisable ici, framer écrit `transform` inline et l'écrase → passer par `will-change` brut.)
- Horloge Home mobile : `-translate-x-28 -translate-y-6` → `-translate-x-36 -translate-y-1` (plus à gauche, plus bas). Desktop `md:` inchangé.

**Leçon retenue** : 2 pièges perf récurrents sur ce projet — (a) `mix-blend-mode` + animation simultanée = recompositing par frame, à éviter pendant toute transition ; (b) `filter: drop-shadow` sur un élément `scale`-animé = re-rasterisation par frame, fixer en promouvant l'élément sur sa propre couche GPU (`will-change:transform`). Avec framer-motion, ne pas compter sur `transform-gpu` (Tailwind) : framer pose `transform` inline, utiliser `will-change` brut.

**Fichiers modifiés** : `src/components/layout/Footer.tsx`, `src/components/layout/MobileMenu.tsx`, `src/pages/About.tsx`, `src/pages/Home.tsx`.

---

## 2026-06-18 · Grain premium généralisé sur toutes les surfaces bleues

**Contexte** : Objectif Awwwards. Etat hétérogène du grain : certaines pages l'avaient (`bg-grain`), d'autres à moitié (sections internes en `bg-navy` nu), d'autres pas du tout. Veut le grain sur toute page au fond bleu uni (les pages « comme Home »). Référence : E:\Amoussouportfolio applique `.bg-grain` partout par défaut (utility identique à celle déjà ici).

**Deux utilities de grain** :
- `.bg-grain` = navy + bruit SVG cuit (alpha 0.30). A utiliser sur surface navy plate.
- `.grain-overlay` = voile transparent `mix-blend-overlay`. A utiliser quand la couleur n'est pas navy (thèmes blue/sky/pale) ou par-dessus un fond non remplaçable.

**Ce qui a été fait** :
- Home : root `bg-theme-bg-primary` → `bg-grain` (le DotField, canvas transparent, reste par-dessus, grain visible entre les points).
- About : conteneur scroll `h-[760vh]` + fallback reduced-motion passés `bg-navy` → `bg-grain`. Les `RevealColumn` laissées en `bg-navy` nu (le grain s'y carrellerait avec coutures visibles entre colonnes).
- Layout : root + overlay de transition `bg-theme-bg-primary` → `bg-grain` (grain pendant les transitions, pas de flash navy plat).
- Footer (présent partout) → `bg-grain`.
- `Section` : nouveau prop `grain` qui pose un `grain-overlay` + passe le contenu en `relative z-[1]`. Activé sur Entrepreneuriat (theme blue) et NotFound (theme marine).

**Leçon retenue** : le grain cuit (`bg-grain`) ne marche QUE sur navy (couleur hardcodée dans le SVG). Pour grainer une surface d'une autre couleur, utiliser le voile `grain-overlay` (blend overlay, couleur-agnostique). NE PAS poser `bg-grain` sur des colonnes/tuiles juxtaposées : le `background-size: 220px` se réinitialise par élément → coutures.

**Fichiers modifiés** : `src/pages/Home.tsx`, `src/pages/About.tsx`, `src/components/layout/Section.tsx`, `src/components/layout/Layout.tsx`, `src/components/layout/Footer.tsx`, `src/pages/Entrepreneuriat.tsx`, `src/pages/NotFound.tsx`.

---

## 2026-06-18 · Mobile-first : menu mobile (trou) + base grain premium

**Contexte** : Objectif portfolio premium « Awwwards ». Etape 1 demandee : mobile-first, en commencant par un menu mobile au style de simeonamoussou.com.

**Ce qui a été fait** :
- Constat : aucun menu mobile (`Header` nav en `hidden lg:flex`, pas de hamburger) -> liens inaccessibles sur mobile. Cree `MobileMenu.tsx` : overlay plein ecran navy + grain, grands liens cursive en stagger, close, langue + CTA Contact, scroll bloque.
- `Header` : hamburger `lg:hidden`, actions desktop `hidden lg:flex`. `.grain-overlay` (bruit SVG feTurbulence, mix-blend overlay) ajoute a `index.css` comme base reutilisable.

**Limite** : simeonamoussou.com est une SPA React -> WebFetch ne renvoie que le titre, impossible de scraper le menu/grain exacts. Menu construit selon l'identite Ehoud ; capture d'ecran requise pour un match exact.

**Reste (roadmap premium)** : horloge verticale sur mobile ; audit mobile-first page par page (Home/About/Offre/Portfolio) ; grain applique au bg global ; passe espacements + polish award. `premium-frontend-ui` (skill) chargee comme reference.

**Fichiers** : `src/components/layout/MobileMenu.tsx` (nouveau), `src/components/layout/Header.tsx`, `src/index.css`.

---

## 2026-06-18 · Transition Contact + section Perspective (About)

**Ce qui a été fait** :
- Transition vers /contact qui « grattait » : cause = `ehoud-bomber.jpg` (6,7 Mo) + init du canvas InkReveal plein ecran, tous deux sur le main-thread pile pendant la montee de page. Fix : image convertie en webp via sharp (`ehoud-bomber-hero.webp`, 466 Ko, x14 plus leger) + montage de `<InkReveal>` differe a 1,2s (apres la transition) via un flag `inkReady` ; `decoding="async"` sur le hero.
- About / section Perspective : manifeste passe de `font-display uppercase` (Bristone, lourd) a casse normale + poids normal (reduire le gras global). Voile de fond `bg-navy/40` -> `bg-navy/20` (voir l'image proprement), lisibilite assuree par un `text-shadow` sur le bloc epingle. Titre `perspectiveEyebrow` renomme « Notre/Our perspective » -> « Ma/My perspective ».

**Leçon retenue** : un « grattage » d'entree de page = travail synchrone main-thread (gros decode image, init canvas) qui tombe pendant l'anim de transform. La transition elle-meme (transform GPU) n'est pas en cause : differer/alleger ce qui se monte avec la page. Toujours convertir en webp les assets > 1 Mo (sharp est dispo dans le repo).

**Reste** : manifeste Perspective garde « on/notre » / « we/our » alors que le titre est passe au « je/my » — coherence a confirmer avec l'utilisateur. `ehoud-bomber.jpg` (6,7 Mo) n'est plus reference (source du webp, conserve).

**Fichiers modifiés** : `src/pages/Contact.tsx`, `src/pages/About.tsx`, `src/i18n/translations.ts`, + `src/assets/ehoud-bomber-hero.webp` (nouveau).

---

## 2026-06-18 · Offre : cartes accordees aux affiches + fluidite de l'empilement

**Contexte** : Couleur de chaque carte service mal assortie ; lag croissant quand les cartes `sticky` s'empilent. Objectif : couleur tiree de l'affiche voisine + scroll fluide facon Lenis.

**Ce qui a été fait** :
- Lecture directe des 6 affiches (`src/assets/offers/*.webp`) via le tool Read (affichage image) pour extraire une couleur dominante chacune. 6 tokens HSL crees dans `index.css` (`--svc-identity` poudre, `--svc-campaign` acier, `--svc-social` orange, `--svc-print` magenta, `--svc-event` azur, `--svc-art` vert). `services.ts` mappe bg+text par carte (contraste navy/white adapte).
- Perf : suppression du `useScroll`/`useTransform` parallax PAR affiche (6 abonnements scroll + 6 images upscalees x1.2 recalculees chaque frame = cause n°1 du jank cumulatif). Hover-rotate CSS conserve.
- GPU : `transform-gpu will-change-transform [backface-visibility:hidden]` sur la div qui scale ; `will-change-transform` sur les croix. Croix passees en `currentColor` (visibles sur fond clair ET fonce).

**Leçon retenue** : sur un empilement de N cartes `sticky`, le cout qui « grandit avec la pile » vient des animations scroll-liees actives sur TOUTES les cartes a la fois (skill gsap-performance §7 : reduire le travail simultane). Retirer les `useScroll` par-carte > micro-optim. Les rotations CSS (`animate-spin`) restent sur le compositor, peu couteuses ; le vrai poids etait le parallax JS main-thread.

**Limite** : pas d'Adobe MCP utilise (Read affiche deja l'image, suffisant pour juger la couleur) ; couleurs choisies a l'oeil, pas par echantillonnage pixel exact.

**Fichiers modifiés** : `src/pages/Services.tsx`, `src/data/services.ts`, `src/index.css`.

---

## 2026-06-18 · Contact : formulaire repris a l'identique de HoH/dear-honey

**Contexte** : Abandonner le formulaire « switch » (panneau coulissant work/feedback, notre invention) et reproduire la structure + les effets du formulaire houseofhoney.com/dear-honey.

**Ce qui a été fait** :
- `ContactForm.tsx` reecrit en editorial une colonne : portrait rond + titre cursive + sous-titre centres, puis Nom/Email/Message en champs « soulignement », bouton Send a remplissage. Mode unique (plus de toggle).
- Effet HoH cle : champ underline anime au focus via `peer` + `<span>` `scale-x-0 -> peer-focus:scale-x-100` (trait bleu logo qui se deploie). Reveals au scroll echelonnes (delays 0.1->0.3).
- Section passee de `theme="marine"` (navy) a `theme="pale"` (fond clair) pour le rendu editorial clair de HoH. Palette tokens : navy/blanc/`--logo` (#0553EC).

**Limite rencontree** : WebFetch ne restitue que le markdown (pas le CSS/JS externe Squarespace), donc extraction au pixel impossible. Reproduction fidele de la STRUCTURE + langage visuel, pas un clone pixel-perfect des micro-animations proprietaires.

**Leçon retenue** : pour cloner un site JS/Squarespace, le scrap markdown donne la structure et les textes, jamais les effets ; reconstruire les effets avec les composants maison (Reveal, FillButton) + un focus underline `peer`. Demander une capture si parite pixel exigee.

**Reste** : clés i18n `panelTo*` desormais inutilisees (inoffensives) a nettoyer ; portrait rond reutilise `ehoud-bomber.jpg` (a confirmer vs une photo dediee).

**Fichiers modifiés** : `src/components/ContactForm.tsx`, `src/pages/Contact.tsx`, `tailwind.config.ts` (token `logo`), `src/i18n/translations.ts` (clés panel ajoutees au tour precedent).

---

## 2026-06-16 · Page Studio (/a-propos) : fond navy + portrait détouré centré

**Ce qui a été fait** :
- Sections bio/déclaration/« ce que je fais » passées de `bg-theme-bg-secondary` (--pale, rendu blanc) à `bg-theme-bg-primary` (--navy), le bleu de Home/Space. Plus aucune zone blanche.
- Portrait : `ehoud-suit.jpg` (CMYK, sujet collé aux bords) remplacé par `ehoud-suit-centered.png` généré via Pillow (crop sur bbox alpha + marges latérales 13% + respiration 6% en haut). Affiché `object-contain` centré, sans cadre ParallaxImage qui rognait la tête.

**Leçon retenue** : un PNG détouré ne doit PAS passer par un cadre `object-cover` + parallax 119% (rogne le sujet). Le poser `object-contain` sur le fond. Pour « centrer » un détourage, recadrer sur la bbox alpha puis re-padder symétriquement, ne pas se fier au canvas d'origine.

**Fichiers modifiés** : `src/pages/About.tsx`, `src/assets/ehoud-suit-centered.png` (nouveau).

**Reste à faire** : sections image plein-cadre supplémentaires (visuels CV non utilisés) pour coller à la structure exacte du studio HoH — direction visuelle à confirmer.

---

## 2026-06-17 · Studio : 2e photo (PC) + affiches COJAS fraîches + hero confirmé

**Ce qui a été fait** :
- 2e photo d'Ehoud (au travail, laptop) ajoutée en section image après la déclaration : `ehoud-laptop.webp` (idx 2 du CV, 1400px, ratio 0.71), ParallaxImage contenu max-w 820px.
- « Ce que je fais » : visuels déjà publiés (boom/taka/social) remplacés par 3 affiches COJAS inutilisées (bleu/magenta/violet = idx 28/29/31). Les rouge/verte (affiche-poster-03/04) étaient déjà sur le site, écartées.
- Hero `/a-propos` conservé (pexels-steve-29708294.jpg) : le plus dynamique du dossier hero/, et déjà en place comme demandé.

**Méthode dédup affiches** : comparer planche des webp publiés (src/assets/portfolio) vs images extraites du CV, repérer la série COJAS et n'utiliser que les couleurs non publiées.

**Fichiers** : `src/pages/About.tsx`, + `cojas-bleu/magenta/violet.webp`, `ehoud-laptop.webp` (nouveaux).

---

## 2026-06-17 · Studio : section « Notre perspective » (sticky + parallax + filet animé)

**Ce qui a été fait** :
- Composant `Perspective` dans About.tsx, clone fidèle du bloc studio HoH : image de fond en parallax (motion translateY), bloc texte `sticky top-[18vh]` épinglé dans une section `min-h-[170vh]`, filet `h-px origin-left` qui se dessine en `scaleX` au scroll (useScroll/useTransform).
- Manifeste original d'Ehoud (4 phrases), nouvelles clés i18n `perspectiveEyebrow`/`perspectiveP1..4` (fr+en). Texte HoH NON repris (droits).
- Fond : `pexels-steve-29404569.jpg` + voile `bg-navy/70` pour lisibilité.

**Piège résolu (sticky)** : `overflow-hidden` sur l'ANCÊTRE direct d'un élément `sticky` casse l'épinglage relatif au viewport (l'ancêtre devient le conteneur de scroll). Le clipping du parallax doit rester sur le wrapper image (sibling), jamais sur la section qui contient le sticky.

**Fichiers** : `src/pages/About.tsx`, `src/i18n/translations.ts`.

---
