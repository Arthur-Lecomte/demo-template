# Modèle de démo pour arthurlecomte.fr

Squelette Vite minimal, prêt à devenir une démo hébergée sur
[arthurlecomte.fr](https://arthurlecomte.fr) sous `/demos/<slug>/`.
Les règles du portfolio sont déjà câblées : chemins relatifs, lien de
retour, clés `localStorage` préfixées, aucune dépendance externe.
Le fichier `CLAUDE.md` guide l'IA qui travaille sur le projet (règles,
git, definition of done) — le garder à jour.

## Développer

```sh
npm ci
npm run dev       # serveur de développement
npm run build     # fichiers finaux dans dist/
```

## Les règles à ne pas casser (vérifiées au build du portfolio)

- **Aucune requête vers un autre domaine** : pas de CDN, de police
  distante, d'API, de stats. Tout est embarqué dans le projet.
- Pas de cookies, pas de service worker, pas de formulaire qui envoie
  des données.
- `localStorage` uniquement pour une sauvegarde ou des préférences,
  clés préfixées par le slug (voir `src/main.js`).
- Chemins relatifs (`base: './'` dans `vite.config.js` — ne pas retirer).
- Garder le lien « Retour à la fiche du projet » (le slug est ajusté à
  l'intégration).
- Assets (images, sons, polices) : uniquement du libre de droits ou du
  fait maison, licences notées dans le README du projet.
- Besoin d'un serveur, d'une API ou d'un compte ? Alors pas de démo
  hébergée : la fiche du portfolio renverra vers ce repo.

## Intégrer au portfolio

Projet terminé → ouvrir Claude Code dans le repo du portfolio et lancer
`/nouveau-projet <chemin de ce projet>`. La fiche est créée en
brouillon ; la publication reste une décision manuelle.
