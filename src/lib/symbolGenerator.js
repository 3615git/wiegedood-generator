// === Bibliothèque de sous-symboles ===
// verticalExtent: [haut, bas] - extension verticale relative au point d'ancrage
export const SUB_SYMBOL_DEFINITIONS = {
    "diagonal-up": {
        type: "diagonal-up",
        paths: { left: "M 0 0 L -15 -12", right: "M 0 0 L 15 -12" },
        verticalExtent: [-12, 0],
    },
    "diagonal-down": {
        type: "diagonal-down",
        paths: { left: "M 0 0 L -15 12", right: "M 0 0 L 15 12" },
        verticalExtent: [0, 12],
    },
    "branch-short": {
        type: "branch-short",
        paths: { left: "M 0 0 L -12 0", right: "M 0 0 L 12 0" },
        verticalExtent: [0, 0],
    },
    "branch-long": {
        type: "branch-long",
        paths: { left: "M 0 0 L -22 0", right: "M 0 0 L 22 0" },
        verticalExtent: [0, 0],
    },
    "chevron-up": {
        type: "chevron-up",
        paths: {
            left: "M 0 0 L -12 -8 M 0 0 L -12 8",
            right: "M 0 0 L 12 -8 M 0 0 L 12 8",
        },
        verticalExtent: [-8, 8],
    },
    "chevron-open": {
        type: "chevron-open",
        paths: {
            left: "M -15 -10 L 0 0 L -15 10",
            right: "M 15 -10 L 0 0 L 15 10",
        },
        verticalExtent: [-10, 10],
    },
    "hook-up": {
        type: "hook-up",
        paths: {
            left: "M 0 0 L -12 0 L -12 -12",
            right: "M 0 0 L 12 0 L 12 -12",
        },
        verticalExtent: [-12, 0],
    },
    "hook-down": {
        type: "hook-down",
        paths: {
            left: "M 0 0 L -12 0 L -12 12",
            right: "M 0 0 L 12 0 L 12 12",
        },
        verticalExtent: [0, 12],
    },
    "diamond-half": {
        type: "diamond-half",
        paths: {
            left: "M 0 -10 L -15 0 L 0 10",
            right: "M 0 -10 L 15 0 L 0 10",
        },
        verticalExtent: [-10, 10],
    },
    "triangle-flag": {
        type: "triangle-flag",
        paths: {
            left: "M 0 -8 L -15 0 L 0 8",
            right: "M 0 -8 L 15 0 L 0 8",
        },
        verticalExtent: [-8, 8],
    },
    zigzag: {
        type: "zigzag",
        paths: {
            left: "M 0 0 L -8 -6 L -16 0",
            right: "M 0 0 L 8 -6 L 16 0",
        },
        verticalExtent: [-6, 0],
    },
    "angle-acute": {
        type: "angle-acute",
        paths: {
            left: "M 0 0 L -18 8",
            right: "M 0 0 L 18 8",
        },
        verticalExtent: [0, 8],
    },
    "angle-steep": {
        type: "angle-steep",
        paths: {
            left: "M 0 0 L -8 -18",
            right: "M 0 0 L 8 -18",
        },
        verticalExtent: [-18, 0],
    },
    "cross-half": {
        type: "cross-half",
        paths: {
            left: "M 0 0 L -12 0 M -6 -6 L -6 6",
            right: "M 0 0 L 12 0 M 6 -6 L 6 6",
        },
        verticalExtent: [-6, 6],
    },
    "point-out": {
        type: "point-out",
        paths: {
            left: "M 0 -5 L -15 0 L 0 5",
            right: "M 0 -5 L 15 0 L 0 5",
        },
        verticalExtent: [-5, 5],
    },
    "double-diagonal": {
        type: "double-diagonal",
        paths: {
            left: "M 0 -8 L -12 0 M 0 8 L -12 0",
            right: "M 0 -8 L 12 0 M 0 8 L 12 0",
        },
        verticalExtent: [-8, 8],
    },
};

export const SUB_SYMBOL_TYPES = Object.keys(SUB_SYMBOL_DEFINITIONS);
export const ORIENTATIONS = ["left", "right", "both"];

const MIN_ANCHOR_POINTS = 3;
const MAX_ANCHOR_POINTS = 12;
const MIN_SUB_SYMBOLS = 2;
const MAX_SUB_SYMBOLS = 10;
const STEM_HEIGHT = 160; // Hauteur de référence pour les calculs
const PADDING = 4; // Marge entre sous-symboles

export const TERMINAL_DECORATIONS = {
    dot: { path: "M 0 0 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0" },
    "tick-up": { path: "M 0 0 L -4 -6 M 0 0 L 4 -6" },
    "tick-down": { path: "M 0 0 L -4 6 M 0 0 L 4 6" },
    cross: { path: "M -4 -4 L 4 4 M -4 4 L 4 -4" },
    bar: { path: "M -5 0 L 5 0" },
};
export const DECORATION_TYPES = Object.keys(TERMINAL_DECORATIONS);

// === Éléments flottants (non attachés à la tige) ===
export const FLOATING_ELEMENTS = {
    "dot-1": {
        type: "dot-1",
        path: "M 0 0 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0",
        size: 6,
    },
    "dot-2": {
        type: "dot-2",
        path: "M 0 -5 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 0 5 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0",
        size: 16,
    },
    "dot-3": {
        type: "dot-3",
        path: "M 0 -8 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 0 0 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0 M 0 8 m -3 0 a 3 3 0 1 0 6 0 a 3 3 0 1 0 -6 0",
        size: 22,
    },
    "line-1": {
        type: "line-1",
        path: "M 0 -6 L 0 6",
        size: 12,
    },
    "line-2": {
        type: "line-2",
        path: "M -4 -6 L -4 6 M 4 -6 L 4 6",
        size: 12,
    },
    "triangle": {
        type: "triangle",
        path: "M 0 -6 L 6 6 L -6 6 Z",
        size: 12,
    },
};
export const FLOATING_TYPES = Object.keys(FLOATING_ELEMENTS);

// Seeded pseudo-random number generator (mulberry32)
function createRNG(seed) {
    let state = seed;
    return () => {
        state |= 0;
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function createSeededHelpers(rng) {
    const randomInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;

    const shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const getWeightedOrientation = () => {
        const rand = rng();
        if (rand < 0.7) return "both";
        if (rand < 0.85) return "left";
        return "right";
    };

    return { randomInt, shuffleArray, getWeightedOrientation };
}

function createStem(anchorPointCount) {
    const anchorPoints = [];
    for (let i = 0; i < anchorPointCount; i++) {
        const position = 0.1 + (i / (anchorPointCount - 1)) * 0.8;
        anchorPoints.push({
            id: i,
            position: anchorPointCount === 1 ? 0.5 : position,
            occupied: false,
        });
    }
    return { anchorPoints };
}

// Calcule la bounding box verticale d'un sous-symbole
function getVerticalBounds(position, type, scale) {
    const def = SUB_SYMBOL_DEFINITIONS[type];
    const [top, bottom] = def.verticalExtent;
    const posY = position * STEM_HEIGHT * 0.8 + STEM_HEIGHT * 0.1;
    return {
        top: posY + top * scale - PADDING,
        bottom: posY + bottom * scale + PADDING,
    };
}

// Vérifie si deux bounding boxes se chevauchent
function boundsOverlap(a, b) {
    return !(a.bottom < b.top || a.top > b.bottom);
}

export function generateRandomSymbol(seed) {
    // Use provided seed or generate one from Math.random
    const actualSeed = seed !== undefined ? seed : Math.floor(Math.random() * 2147483647);
    const rng = createRNG(actualSeed);
    const { randomInt, shuffleArray, getWeightedOrientation } = createSeededHelpers(rng);

    const anchorPointCount = randomInt(MIN_ANCHOR_POINTS, MAX_ANCHOR_POINTS);
    const maxSubSymbols = Math.min(MAX_SUB_SYMBOLS, anchorPointCount);
    const targetCount = randomInt(MIN_SUB_SYMBOLS, maxSubSymbols);

    const stem = createStem(anchorPointCount);

    const subSymbols = [];
    const usedBounds = [];

    // Mélanger les points d'ancrage pour une sélection aléatoire
    const shuffledPoints = shuffleArray([...stem.anchorPoints]);

    for (const point of shuffledPoints) {
        if (subSymbols.length >= targetCount) break;

        // Choisir un type aléatoire
        const type = SUB_SYMBOL_TYPES[randomInt(0, SUB_SYMBOL_TYPES.length - 1)];
        // 40% de chance d'être élargi
        const isWider = rng() < 0.4;
        const widerScale = isWider ? 1.5 + rng() * 0.3 : 1;
        const positionScale = point.position < 0.33 ? 1.5 : 1;
        const totalScale = positionScale * widerScale;

        // Calculer les bounds de ce sous-symbole
        const bounds = getVerticalBounds(point.position, type, totalScale);

        // Vérifier s'il chevauche un sous-symbole existant
        const overlaps = usedBounds.some(b => boundsOverlap(bounds, b));

        if (!overlaps) {
            usedBounds.push(bounds);
            point.occupied = true;
            subSymbols.push({
                type,
                anchorPointId: point.id,
                orientation: getWeightedOrientation(),
                decoration: rng() < 0.3 ? DECORATION_TYPES[randomInt(0, DECORATION_TYPES.length - 1)] : null,
                widthScale: widerScale,
                rotation: (rng() - 0.5) * 4, // -2 à +2 degrés
            });
        }
    }

    // Ajouter un élément flottant (30% de chance)
    let floatingElement = null;
    if (rng() < 0.3) {
        const floatingType = FLOATING_TYPES[randomInt(0, FLOATING_TYPES.length - 1)];
        const floatingDef = FLOATING_ELEMENTS[floatingType];
        const side = rng() < 0.5 ? "left" : "right";

        // Trouver une position Y qui ne chevauche pas
        const attempts = 10;
        for (let i = 0; i < attempts; i++) {
            const posY = 0.15 + rng() * 0.7; // Entre 15% et 85% de la hauteur
            const offsetX = 18 + rng() * 5; // Distance de la tige (plus proche)

            const floatBounds = {
                top: posY * STEM_HEIGHT - floatingDef.size / 2 - PADDING,
                bottom: posY * STEM_HEIGHT + floatingDef.size / 2 + PADDING,
            };

            const overlaps = usedBounds.some(b => boundsOverlap(floatBounds, b));

            if (!overlaps) {
                usedBounds.push(floatBounds);
                floatingElement = {
                    type: floatingType,
                    positionY: posY,
                    offsetX: side === "left" ? -offsetX : offsetX,
                    rotation: (rng() - 0.5) * 10, // -5 à +5 degrés
                };
                break;
            }
        }
    }

    return { stem, subSymbols, floatingElement, seed: actualSeed };
}
