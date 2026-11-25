# CLAUDE.md — démo pour arthurlecomte.fr

Ce fichier guide l'IA qui travaille sur ce projet. Contrairement au repo
portfolio, il est **versionné et public** : tout ce qui y entre doit être
publiable. Il arrive via le template `demo-template` ; adapte la section
« Contexte » au projet réel et garde le reste.

## Contexte

- Projet personnel d'Arthur Lecomte, destiné à être intégré comme démo sur
  son portfolio [arthurlecomte.fr](https://arthurlecomte.fr), sous
  `/demos/<slug>/`. Ce repo reste la source de vérité du code ; le
  portfolio n'en héberge qu'une copie du build.
- TODO(arthur) : décrire ici en 2-3 lignes ce que fait le projet et où il
  en est.

## Règles non négociables

- **Le repo est public pour toujours**, historique compris : aucune donnée
  personnelle (téléphone, adresse, e-mails perso, commune), aucun secret,
  aucune clé d'API. Vérifier texte ET métadonnées de tout fichier fourni
  par Arthur avant de le committer ; s'arrêter si quelque chose cloche.
- La démo intégrée est **100 % statique, sans aucune requête externe** :
  pas de CDN, de police distante, d'API, de stats. Tout est embarqué.
- Pas de cookies, pas de service worker, pas de formulaire qui envoie des
  données. `localStorage` autorisé, clés préfixées par le slug du projet.
- Chemins relatifs uniquement (`base: './'` dans `vite.config.js`, ne pas
  y toucher) ; garder le lien « Retour à la fiche du projet ».
- **Rendu à la demande** : une scène immobile ne se redessine pas. Jamais
  de boucle qui repeint à 60 i/s au repos (le GPU est partagé entre les
  fenêtres : une démo inactive ne doit pas faire saccader une vidéo qui
  tourne à côté). Drapeau « besoin de rendu » levé à chaque mutation
  visuelle, rendu seulement s'il est levé ; respecter aussi
  `prefers-reduced-motion`.
- Assets : libre de droits ou fait maison, licences notées dans le README.
- Un scan automatique au build du portfolio bloque toute infraction ; en
  cas de doute sur une règle, choisir l'option la plus stricte.

## Charte d'interface

But : on passe d'une démo à l'autre sans réapprendre l'interface. La charte
unifie l'habillage, pas la disposition : chaque démo garde sa mise en page
(page qui défile ou application plein écran) et place ses contrôles où
c'est pertinent. Le `src/style.css` de ce template est l'implémentation de
référence.

### Thème

- Thème sombre fixe : `color-scheme: dark` dans `:root`.
- Tokens obligatoires, mêmes noms et valeurs que le mode sombre du site :
  `--color-bg: #101216` ; `--color-text: #e8eaee` ; `--color-muted: #9aa0ab` ;
  `--color-surface: #181b21` ; `--color-border: #2a2e36` ;
  `--color-accent: #8ab0ff` ; `--color-accent-contrast: #0c1f4d` ;
  `--radius-sm: 6px` ; `--radius-md: 8px`.
- L'habillage (fond de page, panneaux, boutons, liens, textes, bordures,
  curseurs) ne consomme que ces tokens. Variables locales dérivées
  autorisées si nécessaires (nommées en anglais, p. ex. un fond translucide
  dérivé de `--color-surface` pour un panneau flottant au-dessus du canvas).
- Les couleurs de la **scène** — tout ce que dessine le canvas — restent
  libres, dans des variables `--scene-*` ou dans le JS : c'est l'identité
  de la démo.
- Police : `system-ui, sans-serif` ; `line-height: 1.5` sur `body`.

### Structure

- `<p class="tagline">` sous le `<h1>` : une phrase qui dit ce qu'on peut
  faire (archétype « document »). En plein écran (archétype « app »), la
  tagline ouvre le volet d'aide à la place (premier paragraphe du dialog).
- Aide « Comment ça marche ? » obligatoire : `<details class="about">`
  fermé par défaut (document) ou `<dialog>` ouvert par un bouton « ? »
  (app). Même libellé partout, exactement « Comment ça marche ? » avec un
  espace insécable avant le ? (`&nbsp;` dans le HTML).
- `<head>` : `<meta name="description">` présent ; `<title>` = « Nom —
  sous-titre ».
- Footer hors de `<main>`, centré, lien « ← Retour à la fiche du projet »
  en `--color-muted`. Ne jamais toucher au `href` du lien de retour.

### Contrôles

- Libellés standard : « Lecture » / « Pause » — le bouton affiche l'action
  qu'il déclenche et alterne son libellé, sans `aria-pressed` (le libellé
  porte l'état). « Réinitialiser » = revenir à l'état de départ.
  « Effacer » = vider ce que le visiteur a dessiné ou saisi. Les toggles à
  libellé fixe (outils, cases) portent `aria-pressed` ou sont de vraies
  checkboxes.
- Pas d'emoji dans les titres et libellés ; les symboles porteurs de sens
  (←, ⟲, ⟳) restent permis avec un libellé accessible.
- Slider : `<label>Texte <input type="range"> <output>…</output></label>`,
  dans cet ordre ; `accent-color: var(--color-accent)` ; `<output>` dès que
  la valeur affichée aide.
- Boutons : fond `--color-surface`, texte `--color-text`, bordure
  `--color-border`, rayon `--radius-sm`, hauteur de cible >= 44px
  (`min-height`, ranges compris) ; survol =
  `border-color: var(--color-muted)` ; bouton principal (classe `primary`) :
  fond `--color-accent`, texte `--color-accent-contrast`.
- Focus : `:focus-visible { outline: 2px solid var(--color-accent);
  outline-offset: 2px; }` universel (remplace les listes d'éléments).
- Panneaux / volets (`details.about`, `dialog`, panneaux de contrôle) :
  fond `--color-surface`, bordure `--color-border`, rayon `--radius-md`.

### Divers

- `* { box-sizing: border-box }` partout.
- `[hidden] { display: none !important }` si l'attribut `hidden` est utilisé.
- `prefers-reduced-motion` respecté : rien ne bouge sans action du
  visiteur — une simulation qui tourne en continu démarre en pause dans ce
  mode ; transitions décoratives coupées.

## Git

- Plus aucun commit direct sur `main` une fois le projet lancé. Une
  branche par sujet : `feat/` `fix/` `docs/` `chore/`. Commits petits,
  Conventional Commits, en anglais, qui disent quoi et pourquoi.
- Pas de CI ici : avant de fusionner, `npm run build` vert en local et
  vérification à la main de la Definition of done ci-dessous.
- Jamais de contournement (`--no-verify`, règle assouplie), jamais de
  force-push ni de réécriture d'historique sur `main`.
- Identité des commits : adresse noreply GitHub, configurée en local du
  repo. Garder la signature Claude Code (`Co-Authored-By`).

## Façon de travailler

- Parler à Arthur en français, 5 lignes max : ce qui est fait, ce qu'il
  doit décider ou tester. Une seule question à la fois, options en langage
  courant, ta recommandation d'abord. Les détails techniques vont dans les
  commits ou le README, pas dans la conversation.
- Déléguer à des sous-agents ce qui en vaut le coup (recherches, audits,
  tâches parallèles) ; un sous-agent ne sait rien : lui donner l'objectif,
  les règles utiles et la forme du résultat, puis relire ce qu'il rend.
- Doute sur un détail technique → option la plus simple, notée en 2 lignes
  dans le README. S'arrêter seulement si une exigence est impossible ou
  demande un serveur, un secret ou un service tiers.
- Dépendances : le minimum, chacune justifiée ; `package-lock.json`
  committé, installation par `npm ci`.
- Code, commentaires, messages de commit : anglais. Textes visibles de la
  démo et échanges avec Arthur : français.
- Scripts d'outillage en Node uniquement (environnement Windows), jamais
  de bash.

## Definition of done (avant chaque fusion)

- `npm run build` vert ; `npm run preview` fonctionne ; assets relatifs
  dans `dist/` (aucune URL absolue ni domaine externe).
- Zéro erreur console ; utilisable au clavier ; contrastes et textes
  alternatifs corrects (viser WCAG AA).
- Démo au repos = zéro redessin, mesuré (compter les draw calls WebGL ou
  les layouts sur 3 s d'inactivité : le total doit être 0).
- Plus aucun « TODO » visible dans l'interface ; `<title>` et `<h1>`
  remplis ; README à jour (quoi, comment lancer, licences des assets).
- Conformité à la charte d'interface ci-dessus vérifiée.

## Intégration au portfolio

- Projet terminé → ouvrir Claude Code dans le repo du portfolio et lancer
  `/nouveau-projet <chemin de ce projet>` : fiche créée en brouillon,
  build copié dans `demos/<slug>/`, slug ajusté.
- Ne jamais rien inventer sur Arthur ni sur le projet ; c'est Arthur qui
  publie (le `draft: false` se décide côté portfolio, par lui seul).
