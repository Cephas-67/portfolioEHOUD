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
