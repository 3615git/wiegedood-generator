# Document des Exigences

## Introduction

Ce document définit les exigences pour un générateur de symboles inspirés des runes nordiques. Le système permet de créer des symboles uniques composés d'une tige verticale centrale sur laquelle viennent se greffer entre 1 et 5 sous-symboles décoratifs, dans un style évoquant l'alphabet runique scandinave.

## Glossaire

- **Générateur**: Le système principal responsable de la création des symboles runiques
- **Symbole**: Une composition graphique complète constituée d'une tige et de sous-symboles
- **Tige**: Le trait vertical central qui forme l'axe principal du symbole
- **Sous_Symbole**: Un élément graphique décoratif qui se greffe sur la tige (traits diagonaux, branches, crochets, etc.)
- **Point_Ancrage**: Position sur la tige où un sous-symbole peut être attaché
- **Rendu**: La représentation visuelle finale du symbole généré

## Exigences

### Exigence 1 : Génération de la tige centrale

**User Story:** En tant qu'utilisateur, je veux que chaque symbole possède une tige verticale centrale, afin d'avoir une base structurelle cohérente pour tous les symboles générés.

#### Critères d'acceptation

1. THE Générateur SHALL créer une tige verticale comme élément de base de chaque symbole
2. THE Générateur SHALL positionner la tige au centre horizontal du symbole
3. THE Générateur SHALL définir entre 3 et 7 points d'ancrage répartis le long de la tige

### Exigence 2 : Ajout des sous-symboles

**User Story:** En tant qu'utilisateur, je veux pouvoir ajouter entre 1 et 5 sous-symboles sur la tige, afin de créer des symboles variés et uniques.

#### Critères d'acceptation

1. WHEN un symbole est généré, THE Générateur SHALL attacher entre 1 et 5 sous-symboles à la tige
2. THE Générateur SHALL placer chaque sous-symbole sur un point d'ancrage disponible de la tige
3. THE Générateur SHALL garantir qu'un point d'ancrage ne peut recevoir qu'un seul sous-symbole
4. IF le nombre de sous-symboles demandé dépasse le nombre de points d'ancrage disponibles, THEN THE Générateur SHALL limiter le nombre de sous-symboles au nombre de points d'ancrage

### Exigence 3 : Bibliothèque de sous-symboles

**User Story:** En tant qu'utilisateur, je veux disposer d'une variété de sous-symboles inspirés des runes nordiques, afin d'obtenir des symboles authentiques et diversifiés.

#### Critères d'acceptation

1. THE Générateur SHALL proposer au minimum 6 types de sous-symboles différents
2. THE Générateur SHALL inclure des sous-symboles de type trait diagonal (gauche et droite)
3. THE Générateur SHALL inclure des sous-symboles de type branche (simple et double)
4. THE Générateur SHALL inclure des sous-symboles de type crochet (orienté haut et bas)
5. WHEN un sous-symbole est sélectionné, THE Générateur SHALL permettre son placement à gauche, à droite ou des deux côtés de la tige

### Exigence 4 : Génération aléatoire

**User Story:** En tant qu'utilisateur, je veux pouvoir générer des symboles de manière aléatoire, afin d'obtenir rapidement des créations uniques sans configuration manuelle.

#### Critères d'acceptation

1. WHEN l'utilisateur demande une génération aléatoire, THE Générateur SHALL sélectionner aléatoirement le nombre de sous-symboles entre 1 et 5
2. WHEN l'utilisateur demande une génération aléatoire, THE Générateur SHALL sélectionner aléatoirement les types de sous-symboles parmi la bibliothèque disponible
3. WHEN l'utilisateur demande une génération aléatoire, THE Générateur SHALL sélectionner aléatoirement les positions des sous-symboles sur les points d'ancrage
4. WHEN l'utilisateur demande une génération aléatoire, THE Générateur SHALL sélectionner aléatoirement l'orientation de chaque sous-symbole (gauche, droite ou symétrique)

### Exigence 5 : Rendu visuel du symbole

**User Story:** En tant qu'utilisateur, je veux visualiser le symbole généré, afin de voir le résultat de la génération.

#### Critères d'acceptation

1. WHEN un symbole est généré, THE Générateur SHALL produire un rendu visuel du symbole complet
2. THE Rendu SHALL afficher la tige et tous les sous-symboles attachés avec des proportions cohérentes
3. THE Rendu SHALL utiliser un style graphique évoquant les runes nordiques (traits nets, angles marqués)
4. THE Rendu SHALL maintenir une épaisseur de trait uniforme pour tous les éléments du symbole

### Exigence 6 : Exportation du symbole

**User Story:** En tant qu'utilisateur, je veux pouvoir exporter le symbole généré, afin de l'utiliser dans d'autres contextes.

#### Critères d'acceptation

1. WHEN l'utilisateur demande une exportation, THE Générateur SHALL produire une représentation du symbole dans un format standard
2. THE Générateur SHALL supporter l'exportation au format SVG pour une utilisation vectorielle
3. IF l'exportation échoue, THEN THE Générateur SHALL afficher un message d'erreur descriptif

### Exigence 7 : Sérialisation et désérialisation des symboles

**User Story:** En tant qu'utilisateur, je veux pouvoir sauvegarder et recharger mes symboles, afin de les conserver et les modifier ultérieurement.

#### Critères d'acceptation

1. THE Générateur SHALL sérialiser un symbole en format JSON contenant la structure complète (tige, points d'ancrage, sous-symboles)
2. WHEN un fichier JSON valide est fourni, THE Générateur SHALL désérialiser et reconstruire le symbole correspondant
3. IF un fichier JSON invalide est fourni, THEN THE Générateur SHALL retourner une erreur descriptive
4. FOR ALL symboles valides, la sérialisation puis la désérialisation SHALL produire un symbole équivalent à l'original (propriété aller-retour)
