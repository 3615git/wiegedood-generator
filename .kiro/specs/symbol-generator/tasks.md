# Plan d'Implémentation : Générateur de Symboles Runiques

## Vue d'ensemble

Ce plan décrit les étapes d'implémentation du générateur de symboles runiques en TypeScript. L'approche est incrémentale : on commence par les modèles de données, puis la bibliothèque de sous-symboles, le générateur, le rendu SVG, et enfin la sérialisation.

## Tâches

- [x] 1. Mettre en place la structure du projet et les types de base
  - Créer la structure de dossiers (src/, src/types/, src/lib/)
  - Définir les interfaces TypeScript : Symbol, Stem, AnchorPoint, PlacedSubSymbol
  - Définir les types : SubSymbolType, Orientation
  - Configurer le projet TypeScript (tsconfig.json)
  - Configurer Vitest et fast-check pour les tests
  - _Exigences : 1.1, 2.1, 3.5_

- [x] 2. Implémenter la bibliothèque de sous-symboles
  - [x] 2.1 Créer la classe SubSymbolLibrary
    - Implémenter getAvailableTypes() retournant les 6 types
    - Implémenter getDefinition(type) retournant les chemins SVG
    - Définir les chemins SVG pour chaque type de sous-symbole
    - _Exigences : 3.1, 3.2, 3.3, 3.4_

  - [ ]\* 2.2 Écrire les tests unitaires pour SubSymbolLibrary
    - Vérifier que les 6 types sont disponibles
    - Vérifier que chaque définition contient les chemins SVG requis
    - _Exigences : 3.1, 3.2, 3.3, 3.4_

- [x] 3. Implémenter la génération de la tige
  - [x] 3.1 Créer la fonction de génération de tige
    - Implémenter la création d'une tige avec N points d'ancrage (3-7)
    - Répartir les points d'ancrage uniformément sur la tige (positions 0.0 à 1.0)
    - Valider que le nombre de points d'ancrage est entre 3 et 7
    - _Exigences : 1.1, 1.2, 1.3_

  - [ ]\* 3.2 Écrire le test de propriété pour la présence de la tige
    - **Propriété 1 : Présence de la tige**
    - **Valide : Exigence 1.1**

  - [ ]\* 3.3 Écrire le test de propriété pour le nombre de points d'ancrage
    - **Propriété 2 : Nombre de points d'ancrage**
    - **Valide : Exigence 1.3**

- [x] 4. Implémenter le générateur de symboles
  - [x] 4.1 Créer la classe SymbolGenerator
    - Implémenter generate(config) pour génération configurée
    - Implémenter generateRandom() pour génération aléatoire
    - Valider les configurations (nombre de sous-symboles, types, orientations)
    - Gérer les erreurs de configuration (InvalidAnchorPointCount, InvalidSubSymbolCount, etc.)
    - _Exigences : 2.1, 2.2, 2.3, 2.4, 4.1, 4.2, 4.3, 4.4_

  - [ ]\* 4.2 Écrire le test de propriété pour le nombre de sous-symboles
    - **Propriété 3 : Nombre de sous-symboles**
    - **Valide : Exigences 2.1, 4.1**

  - [ ]\* 4.3 Écrire le test de propriété pour la validité du placement
    - **Propriété 4 : Validité du placement**
    - **Valide : Exigences 2.2, 4.3**

  - [ ]\* 4.4 Écrire le test de propriété pour l'unicité des points d'ancrage
    - **Propriété 5 : Unicité des points d'ancrage**
    - **Valide : Exigence 2.3**

  - [ ]\* 4.5 Écrire le test de propriété pour la limitation par les points d'ancrage
    - **Propriété 6 : Limitation par les points d'ancrage**
    - **Valide : Exigence 2.4**

  - [ ]\* 4.6 Écrire le test de propriété pour la validité de l'orientation
    - **Propriété 7 : Validité de l'orientation**
    - **Valide : Exigences 3.5, 4.4**

  - [ ]\* 4.7 Écrire le test de propriété pour les types de sous-symboles valides
    - **Propriété 8 : Types de sous-symboles valides**
    - **Valide : Exigence 4.2**

- [x] 5. Point de contrôle - Vérifier la génération
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implémenter le rendu SVG
  - [x] 6.1 Créer la classe SymbolRenderer
    - Implémenter renderToSVG(symbol, options) générant le SVG complet
    - Rendre la tige verticale centrée
    - Rendre chaque sous-symbole à sa position d'ancrage avec son orientation
    - Appliquer les options de rendu (width, height, strokeWidth, strokeColor)
    - Gérer les erreurs de rendu (RenderError)
    - _Exigences : 5.1, 5.2, 5.3, 5.4, 6.1, 6.2_

  - [ ]\* 6.2 Écrire le test de propriété pour la validité du SVG
    - **Propriété 9 : Validité du SVG généré**
    - **Valide : Exigences 5.1, 6.2**

  - [ ]\* 6.3 Écrire le test de propriété pour l'uniformité du stroke-width
    - **Propriété 10 : Uniformité de l'épaisseur de trait**
    - **Valide : Exigence 5.4**

- [x] 7. Implémenter la sérialisation JSON
  - [x] 7.1 Créer la classe SymbolSerializer
    - Implémenter serialize(symbol) produisant le JSON avec version
    - Implémenter deserialize(json) reconstruisant le symbole
    - Valider la structure JSON lors de la désérialisation
    - Gérer les erreurs (InvalidJsonSyntax, MissingRequiredField, InvalidFieldType, InvalidSymbolStructure)
    - _Exigences : 7.1, 7.2, 7.3_

  - [ ]\* 7.2 Écrire le test de propriété pour le round-trip de sérialisation
    - **Propriété 11 : Round-trip de sérialisation**
    - **Valide : Exigence 7.4**

  - [ ]\* 7.3 Écrire les tests unitaires pour les erreurs de sérialisation
    - Tester InvalidJsonSyntax avec JSON mal formé
    - Tester MissingRequiredField avec champs manquants
    - _Exigences : 7.3_

- [x] 8. Intégration et export
  - [x] 8.1 Créer le point d'entrée principal
    - Exporter toutes les classes et interfaces publiques
    - Créer une fonction utilitaire pour générer et exporter en une étape
    - _Exigences : 6.1, 6.2, 6.3_

  - [ ]\* 8.2 Écrire les tests d'intégration
    - Tester le flux complet : génération → rendu → export
    - Tester le flux : génération → sérialisation → désérialisation → rendu
    - _Exigences : 5.1, 6.2, 7.4_

- [x] 9. Point de contrôle final
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Les tâches marquées avec `*` sont optionnelles et peuvent être ignorées pour un MVP rapide
- Chaque tâche référence les exigences spécifiques pour la traçabilité
- Les tests de propriétés utilisent fast-check avec minimum 100 itérations
- Le format de tag pour les tests : `Feature: symbol-generator, Property {N}: {titre}`
