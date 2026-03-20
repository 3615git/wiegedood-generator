# Générateur de Symboles Runiques

Générateur procédural de symboles inspirés des runes, avec animations et effets visuels.

## Fonctionnalités

- Génération procédurale de symboles à partir d'un seed (texte ou nombre)
- Animation de distorsion (feTurbulence + feDisplacementMap) avec effet de "twitch"
- Effet de pluie animé
- Seed synchronisé avec l'URL pour partage facile
- Position horizontale aléatoire du symbole selon le seed

## Utilisation

Tapez n'importe quel texte ou nombre dans le champ en haut de page pour générer un symbole unique. Le seed est automatiquement ajouté à l'URL, permettant de partager un symbole spécifique.

## Installation

```bash
npm install
npm run dev
```

## Technologies

- React + Vite
- SVG avec filtres feTurbulence/feDisplacementMap
- CSS animations
