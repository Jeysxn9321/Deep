# DEEP — Jeu de cartes pour les conversations profondes

DEEP est une application web responsive en français, conçue pour deux personnes ou un groupe. Elle comprend 160 questions originales en français, réparties en 16 catégories et 5 niveaux d’intensité, un tirage aléatoire sans répétition pendant une partie, la rotation des tours et un Joker individuel par joueur.

## Lancer le jeu

Le plus simple : ouvrez `index.html` dans un navigateur moderne. Aucun outil de compilation ni serveur backend n’est nécessaire.

Pour lancer un serveur local (recommandé pour les fonctions PWA) :

```bash
cd DEEP
python3 -m http.server 8000
```

Puis ouvrez http://localhost:8000.

## Sur iPhone

Hébergez le dossier sur un service statique HTTPS, ouvrez l’adresse dans Safari, puis choisissez Partager → Sur l’écran d’accueil.

## Jouer

- Choisissez le mode deux personnes ou groupe (jusqu’à 10 joueurs).
- Modifiez les noms, choisissez les catégories et le niveau d’intensité.
- Révélez une carte à la fois. Les tours alternent après chaque question répondue ou passée.
- Chaque joueur possède exactement un Joker par partie. Il permet de passer une question sans avoir à se justifier.
- Les questions sont mélangées et ne se répètent pas avant épuisement du paquet sélectionné.
- Terminez la partie à tout moment pour consulter le résumé.

## Personnaliser les questions

Modifiez `questions.js`. Chaque question suit ce format :

```js
{ category: 'Identité', level: 3, q: 'Ta question originale ici ?' }
```

## Fichiers

- `index.html` — structure et interface en français
- `styles.css` — styles et animations cinématographiques
- `questions.js` — banque de questions en français
- `app.js` — logique du jeu et interactions
- `manifest.webmanifest` — métadonnées d’installation

## Limites connues

- « Répondue » signifie que le groupe a choisi de passer à la question suivante ; les réponses ne sont pas enregistrées.
- Le jeu fonctionne sur un seul appareil partagé ; il ne synchronise pas plusieurs appareils.
- Le son est désactivé par défaut. Les sons sont synthétisés localement.
- Les polices Google nécessitent une connexion Internet ; des polices système de remplacement sont prévues.

## Visual fix

The card flip uses `backface-visibility` on each face. The outer card no longer uses a CSS `filter`, because filters can flatten 3D rendering in some browsers and make card-back text appear mirrored. The soft shadow is applied to the card faces instead.

## Layout fix

The gameplay layout now caps the card dimensions and reserves a separate visible row for the Joker and “On a répondu” actions. The card scales down on shorter viewports, with additional compact layouts for mobile and short desktop windows.


## Version optimisée pour iPhone 16 Pro Max

Cette version ajuste la hauteur et la largeur des cartes en fonction de la hauteur réelle du viewport (`dvh`) et réserve une zone distincte aux boutons Joker et « On a répondu ». Elle tient compte des zones de sécurité iOS (encoche, Dynamic Island et barre d’accueil), agrandit les zones tactiles et comprend les icônes et le cache PWA.

### Installation sur iPhone

Pour l’ajouter à l’écran d’accueil, le dossier doit être publié sur une adresse HTTPS (par exemple via un hébergement statique). Ensuite, sur l’iPhone 16 Pro Max :

1. Ouvre l’adresse du jeu dans **Safari**.
2. Appuie sur **Partager**.
3. Choisis **Sur l’écran d’accueil** puis **Ajouter**.
4. Lance DEEP depuis la nouvelle icône.

Le service worker permet de mettre en cache les fichiers de l’application après le premier chargement. L’installation PWA et le cache ne sont pas disponibles en ouvrant simplement le fichier HTML localement; le jeu lui-même peut néanmoins être lancé depuis `index.html` sur ordinateur.

### Changements de cette version

- Carte limitée à une largeur proportionnelle à sa hauteur, au lieu de grandir avec la fenêtre.
- Boutons d’action dans une rangée distincte et prioritaire sous la carte.
- Ajustements supplémentaires pour les écrans étroits et les fenêtres basses.
- Prise en charge des zones de sécurité iOS, des icônes d’écran d’accueil et du mode autonome.
