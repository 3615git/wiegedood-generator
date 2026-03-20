import { SUB_SYMBOL_DEFINITIONS, ORIENTATIONS } from "../lib/symbolGenerator";

function translatePath(path, offsetX, offsetY) {
  return path.replace(
    /([ML])\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)/g,
    (_, cmd, x, y) =>
      `${cmd} ${parseFloat(x) + offsetX} ${parseFloat(y) + offsetY}`,
  );
}

function SubSymbolPreview({
  definition,
  orientation,
  strokeColor,
  strokeWidth,
}) {
  const width = 60,
    height = 60;
  const centerX = width / 2,
    centerY = height / 2;
  const paths = [`M ${centerX} ${centerY - 20} L ${centerX} ${centerY + 20}`];

  if (
    (orientation === "left" || orientation === "both") &&
    definition.paths.left
  ) {
    paths.push(translatePath(definition.paths.left, centerX, centerY));
  }
  if (
    (orientation === "right" || orientation === "both") &&
    definition.paths.right
  ) {
    paths.push(translatePath(definition.paths.right, centerX, centerY));
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          fill="none"
        />
      ))}
    </svg>
  );
}

export default function Catalog() {
  return (
    <div className="sub-symbols-catalog">
      <h2>Catalogue des sous-symboles</h2>
      <div className="catalog-grid">
        {Object.entries(SUB_SYMBOL_DEFINITIONS).map(([type, definition]) =>
          ORIENTATIONS.map((orientation) => (
            <div key={`${type}-${orientation}`} className="catalog-item">
              <SubSymbolPreview
                definition={definition}
                orientation={orientation}
                strokeColor="#c9a227"
                strokeWidth={2}
              />
              <div className="name">{type}</div>
              <div className="orientation">{orientation}</div>
            </div>
          )),
        )}
      </div>
    </div>
  );
}
