import {
  SUB_SYMBOL_DEFINITIONS,
  TERMINAL_DECORATIONS,
  FLOATING_ELEMENTS,
} from "../lib/symbolGenerator";

function translatePath(path, offsetX, offsetY, scale = 1) {
  return path.replace(
    /([ML])\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g,
    (_, cmd, x, y) =>
      `${cmd} ${parseFloat(x) * scale + offsetX} ${parseFloat(y) * scale + offsetY}`,
  );
}

// Convertit un path en forme effilée (plus fine aux extrémités)
function makeTaperedPath(pathStr, baseWidth, seed = 0) {
  const commands = [
    ...pathStr.matchAll(
      /([MLQ])\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)(?:\s+(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?))?/g,
    ),
  ];

  if (commands.length < 2) return { path: pathStr, isTapered: false };

  // Extraire tous les points
  let points = [];
  for (const cmd of commands) {
    if (cmd[1] === "Q") {
      // Pour Q, on prend le point final (4e et 5e groupes)
      points.push({ x: parseFloat(cmd[4]), y: parseFloat(cmd[5]) });
    } else {
      points.push({ x: parseFloat(cmd[2]), y: parseFloat(cmd[3]) });
    }
  }

  if (points.length < 2) return { path: pathStr, isTapered: false };

  // Si seulement 2 points, interpoler des points intermédiaires pour un meilleur effilage
  if (points.length === 2) {
    const [start, end] = points;
    const interpolated = [start];
    const segments = 5;
    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      interpolated.push({
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
      });
    }
    interpolated.push(end);
    points = interpolated;
  }

  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Créer les contours gauche et droit
  const leftPoints = [];
  const rightPoints = [];

  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const prev = points[i - 1] || p;
    const next = points[i + 1] || p;

    // Direction du segment
    let dx = next.x - prev.x;
    let dy = next.y - prev.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    dx /= len;
    dy /= len;

    // Perpendiculaire
    const nx = -dy;
    const ny = dx;

    // Largeur qui s'affine vers l'extrémité (pleine épaisseur au début, fine à la fin)
    const t = points.length === 1 ? 0.5 : i / (points.length - 1);
    const taper = 1 - t * 0.8; // 1 au début, 0.2 à la fin
    const width = (baseWidth * taper) / 2;

    // Légère variation organique
    const wobble = (random() - 0.5) * 0.5;

    leftPoints.push({
      x: p.x + nx * (width + wobble),
      y: p.y + ny * (width + wobble),
    });
    rightPoints.push({
      x: p.x - nx * (width - wobble),
      y: p.y - ny * (width - wobble),
    });
  }

  // Construire le path fermé
  let tapered = `M ${leftPoints[0].x} ${leftPoints[0].y}`;
  for (let i = 1; i < leftPoints.length; i++) {
    tapered += ` L ${leftPoints[i].x} ${leftPoints[i].y}`;
  }
  for (let i = rightPoints.length - 1; i >= 0; i--) {
    tapered += ` L ${rightPoints[i].x} ${rightPoints[i].y}`;
  }
  tapered += " Z";

  return { path: tapered, isTapered: true };
}

// Convertit une ligne droite en courbe organique avec des points de contrôle légèrement décalés
function makeOrganic(pathStr, seed = 0) {
  const segments = [];
  const commands = [
    ...pathStr.matchAll(/([ML])\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g),
  ];

  // Générateur pseudo-aléatoire basé sur seed
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  let lastX = 0,
    lastY = 0;

  for (let i = 0; i < commands.length; i++) {
    const [, cmd, xStr, yStr] = commands[i];
    const x = parseFloat(xStr);
    const y = parseFloat(yStr);

    if (cmd === "M" || i === 0) {
      segments.push(`M ${x} ${y}`);
    } else {
      // Calcule un point de contrôle légèrement décalé pour créer une courbe
      const midX = (lastX + x) / 2;
      const midY = (lastY + y) / 2;
      const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
      const wobble = dist * 0.08; // 8% de la longueur
      const offsetX = (random() - 0.5) * wobble;
      const offsetY = (random() - 0.5) * wobble;

      // Utilise une courbe quadratique
      segments.push(`Q ${midX + offsetX} ${midY + offsetY} ${x} ${y}`);
    }

    lastX = x;
    lastY = y;
  }

  return segments.join(" ");
}

// Crée un chemin organique pour la tige avec plusieurs points intermédiaires
function makeOrganicStem(startX, startY, endX, endY, seed = 42) {
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const points = [[startX, startY]];
  const segments = 6;

  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const x = startX + (endX - startX) * t + (random() - 0.5) * 2;
    const y = startY + (endY - startY) * t;
    points.push([x, y]);
  }
  points.push([endX, endY]);

  let path = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const midX = (px + x) / 2 + (random() - 0.5) * 1.5;
    const midY = (py + y) / 2;
    path += ` Q ${midX} ${midY} ${x} ${y}`;
  }

  return path;
}

function getEndPoint(pathStr) {
  const matches = [
    ...pathStr.matchAll(/(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g),
  ];
  if (matches.length === 0) return null;
  const last = matches[matches.length - 1];
  return { x: parseFloat(last[1]), y: parseFloat(last[2]) };
}

export default function SymbolSVG({
  id,
  symbol,
  width = 100,
  height = 200,
  strokeWidth = 3,
  strokeColor = "#000",
}) {
  const stemX = width / 2;
  const stemStartY = height * 0.1;
  const stemEndY = height * 0.9;
  const stemHeight = stemEndY - stemStartY;

  const stemPath = makeOrganicStem(
    stemX,
    stemStartY,
    stemX,
    stemEndY,
    symbol.stem.anchorPoints.length * 1000,
  );
  const subSymbolGroups = [];
  let pathSeed = 0;

  for (const subSymbol of symbol.subSymbols) {
    const anchorPoint = symbol.stem.anchorPoints.find(
      (ap) => ap.id === subSymbol.anchorPointId,
    );
    const anchorY = stemStartY + anchorPoint.position * stemHeight;
    const definition = SUB_SYMBOL_DEFINITIONS[subSymbol.type];
    const positionScale = anchorPoint.position < 0.33 ? 1.5 : 1;
    const scale = positionScale * (subSymbol.widthScale || 1);
    const rotation = subSymbol.rotation || 0;

    const paths = [];

    if (
      (subSymbol.orientation === "left" || subSymbol.orientation === "both") &&
      definition.paths.left
    ) {
      const translatedPath = translatePath(
        definition.paths.left,
        stemX,
        anchorY,
        scale,
      );
      const organicPath = makeOrganic(translatedPath, ++pathSeed);
      paths.push({
        ...makeTaperedPath(organicPath, strokeWidth, pathSeed),
        isDecoration: false,
      });

      if (subSymbol.decoration) {
        const endPt = getEndPoint(translatedPath);
        if (endPt) {
          const decoPath = makeOrganic(
            translatePath(
              TERMINAL_DECORATIONS[subSymbol.decoration].path,
              endPt.x,
              endPt.y,
              0.8,
            ),
            ++pathSeed,
          );
          paths.push({
            ...makeTaperedPath(decoPath, strokeWidth * 0.7, pathSeed),
            isDecoration: true,
          });
        }
      }
    }

    if (
      (subSymbol.orientation === "right" || subSymbol.orientation === "both") &&
      definition.paths.right
    ) {
      const translatedPath = translatePath(
        definition.paths.right,
        stemX,
        anchorY,
        scale,
      );
      const organicPath = makeOrganic(translatedPath, ++pathSeed);
      paths.push({
        ...makeTaperedPath(organicPath, strokeWidth, pathSeed),
        isDecoration: false,
      });

      if (subSymbol.decoration) {
        const endPt = getEndPoint(translatedPath);
        if (endPt) {
          const decoPath = makeOrganic(
            translatePath(
              TERMINAL_DECORATIONS[subSymbol.decoration].path,
              endPt.x,
              endPt.y,
              0.8,
            ),
            ++pathSeed,
          );
          paths.push({
            ...makeTaperedPath(decoPath, strokeWidth * 0.7, pathSeed),
            isDecoration: true,
          });
        }
      }
    }

    subSymbolGroups.push({ paths, rotation, anchorX: stemX, anchorY });
  }

  // Créer le path effilé pour la tige
  const stemTapered = makeTaperedPath(stemPath, strokeWidth, 999);

  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <path d={stemTapered.path} fill={strokeColor} />
      {subSymbolGroups.map((group, gi) => (
        <g
          key={gi}
          transform={`rotate(${group.rotation} ${group.anchorX} ${group.anchorY})`}
        >
          {group.paths.map((p, pi) =>
            p.isTapered ? (
              <path key={pi} d={p.path} fill={strokeColor} />
            ) : (
              <path
                key={pi}
                d={p.path}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
              />
            ),
          )}
        </g>
      ))}
      {symbol.floatingElement &&
        (() => {
          const fe = symbol.floatingElement;
          const def = FLOATING_ELEMENTS[fe.type];
          const posX = stemX + fe.offsetX;
          const posY = stemStartY + fe.positionY * stemHeight;
          const isTriangle = fe.type === "triangle";
          return (
            <g transform={`translate(${posX}, ${posY}) rotate(${fe.rotation})`}>
              <path
                d={def.path}
                fill={isTriangle ? strokeColor : "none"}
                stroke={isTriangle ? "none" : strokeColor}
                strokeWidth={strokeWidth * 0.6}
                strokeLinecap="round"
              />
            </g>
          );
        })()}
    </svg>
  );
}
