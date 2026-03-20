import { useState, useMemo, useEffect, useRef } from "react";
import { generateRandomSymbol } from "./lib/symbolGenerator";
import SymbolSVG from "./components/SymbolSVG";

import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";

const jacketImages = [img1, img2, img3];

// Convert any string to a numeric seed using a simple hash
function stringToSeed(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// SVG filters with different turbulence seeds for animation
function TurbulenceFilters() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        {[0, 1, 2, 3, 4].map((seed) => (
          <filter key={seed} id={`turbulence-${seed}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves="2"
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
        <filter id="turbulence-none">
          <feOffset in="SourceGraphic" dx="0" dy="0" />
        </filter>
      </defs>
    </svg>
  );
}

// Individual symbol with its own twitch animation
function TwitchingSymbol({
  symbol,
  scale,
  width,
  height,
  strokeWidth,
  strokeColor,
}) {
  const [filterIndex, setFilterIndex] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const scheduleNextTwitch = () => {
      // Long pause: 2-6 seconds
      const pauseDuration = 2000 + Math.random() * 4000;

      timeoutRef.current = setTimeout(() => {
        // Quick twitch burst: 3-7 rapid changes
        const twitchCount = 3 + Math.floor(Math.random() * 5);
        let twitchIndex = 0;

        const doTwitch = () => {
          if (twitchIndex < twitchCount) {
            setFilterIndex(Math.floor(Math.random() * 5));
            twitchIndex++;
            // Very fast: 30-60ms between twitches
            timeoutRef.current = setTimeout(doTwitch, 30 + Math.random() * 30);
          } else {
            // End twitch, go back to no filter
            setFilterIndex(null);
            scheduleNextTwitch();
          }
        };

        doTwitch();
      }, pauseDuration);
    };

    // Start with random initial delay so symbols don't sync
    const initialDelay = Math.random() * 3000;
    timeoutRef.current = setTimeout(scheduleNextTwitch, initialDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const filter =
    filterIndex !== null
      ? `url(#turbulence-${filterIndex})`
      : "url(#turbulence-none)";

  return (
    <div
      className="symbol-item"
      style={{
        transform: `scale(${scale})`,
        filter,
      }}
    >
      <SymbolSVG
        symbol={symbol}
        width={width}
        height={height}
        strokeWidth={strokeWidth}
        strokeColor={strokeColor}
      />
    </div>
  );
}

// Rain effect component
function Rain({ dropCount = 30 }) {
  const drops = useMemo(() => {
    return Array.from({ length: dropCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.4 + Math.random() * 0.3,
    }));
  }, [dropCount]);

  return (
    <div className="rain">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="drop"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        >
          <div
            className="stem"
            style={{
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [seedInput, setSeedInput] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSeed = urlParams.get("seed");
    return urlSeed || String(Math.floor(Math.random() * 2147483647));
  });

  const numericSeed = useMemo(() => {
    const parsed = parseInt(seedInput, 10);
    return isNaN(parsed) ? stringToSeed(seedInput) : parsed;
  }, [seedInput]);

  // Sync seed to URL
  useEffect(() => {
    const url = new URL(window.location);
    url.searchParams.set("seed", seedInput);
    window.history.replaceState({}, "", url);
  }, [seedInput]);

  const symbol = useMemo(() => {
    return generateRandomSymbol(numericSeed);
  }, [numericSeed]);

  const justifyContent = useMemo(() => {
    const positions = ["center", "left", "right"];
    const rng = (numericSeed * 9301 + 49297) % 233280;
    return positions[rng % 3];
  }, [numericSeed]);

  const strokeWidth = 5;
  const strokeColor = "#cececeff";

  const jacketBg = useMemo(() => {
    const img = jacketImages[Math.floor(Math.random() * jacketImages.length)];
    return `url('${img}')`;
  }, []);

  return (
    <div className="container">
      <input
        type="text"
        className="seed-input"
        value={seedInput}
        onChange={(e) => setSeedInput(e.target.value)}
        spellCheck={false}
      />
      <TurbulenceFilters />
      <div
        className="jacket"
        style={{ backgroundImage: jacketBg, justifyContent }}
      >
        <Rain />
        <div className="symbols-display">
          <TwitchingSymbol
            key={numericSeed}
            symbol={symbol}
            scale={2.6}
            width={100}
            height={200}
            strokeWidth={strokeWidth}
            strokeColor={strokeColor}
          />
        </div>
      </div>
    </div>
  );
}
