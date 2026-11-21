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
- Assets : libre de droits ou fait maison, licences notées dans le README.
- Un scan automatique au build du portfolio bloque toute infraction ; en
  cas de doute sur une règle, choisir l'option la plus stricte.

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
- Plus aucun « TODO » visible dans l'interface ; `<title>` et `<h1>`
  remplis ; README à jour (quoi, comment lancer, licences des assets).

## Intégration au portfolio

- Projet terminé → ouvrir Claude Code dans le repo du portfolio et lancer
  `/nouveau-projet <chemin de ce projet>` : fiche créée en brouillon,
  build copié dans `demos/<slug>/`, slug ajusté.
- Ne jamais rien inventer sur Arthur ni sur le projet ; c'est Arthur qui
  publie (le `draft: false` se décide côté portfolio, par lui seul).
