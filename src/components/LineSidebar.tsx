"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import "./LineSidebar.css";

const FALLOFF_CURVES = {
  linear: (p: number) => p,
  smooth: (p: number) => p * p * (3 - 2 * p),
  sharp: (p: number) => p * p * p,
} as const;

type Falloff = keyof typeof FALLOFF_CURVES;

const DEFAULT_ITEMS = [
  "Overview",
  "Components",
  "Animations",
  "Backgrounds",
  "Showcase",
  "Playground",
  "Templates",
  "Changelog",
  "Community",
  "Resources",
  "Documentation",
  "Support",
];

type LineSidebarProps = {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  activeIndex?: number;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
};

export default function LineSidebar({
  items = DEFAULT_ITEMS,
  accentColor = "#A855F7",
  textColor = "#c4c4c4",
  markerColor = "#6c6c6c",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  activeIndex: controlledActive,
  onItemClick,
  className = "",
}: LineSidebarProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef(defaultActive);
  const smoothingRef = useRef(smoothing);
  const falloffRef = useRef(falloff);
  const proximityRadiusRef = useRef(proximityRadius);
  const boundListRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(defaultActive);
  const resolvedActive = controlledActive ?? activeIndex;

  activeRef.current = resolvedActive;
  smoothingRef.current = smoothing;
  falloffRef.current = falloff;
  proximityRadiusRef.current = proximityRadius;

  useEffect(() => {
    if (controlledActive !== undefined) {
      setActiveIndex(controlledActive);
    }
  }, [controlledActive]);

  const getItems = useCallback((list = listRef.current ?? boundListRef.current) => {
    if (!list) return [];
    return Array.from(list.children).filter(
      (node): node is HTMLLIElement => node instanceof HTMLLIElement,
    );
  }, []);

  const runFrame = useCallback(function runFrame(now: number) {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const nodes = getItems();
    for (let i = 0; i < nodes.length; i++) {
      const el = nodes[i];
      const target = Math.max(
        targetsRef.current[i] || 0,
        activeRef.current === i ? 1 : 0,
      );
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, [getItems]);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
    }
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const startLoopRef = useRef(startLoop);
  startLoopRef.current = startLoop;

  const bindListRef = useCallback((node: HTMLUListElement | null) => {
    const prev = boundListRef.current;
    if (prev) {
      prev.onpointermove = null;
      prev.onpointerleave = null;
    }

    listRef.current = node;
    boundListRef.current = node;
    if (!node) return;

    node.onpointermove = (event) => {
      const rect = node.getBoundingClientRect();
      const pointerY = event.clientY - rect.top;
      const ease =
        FALLOFF_CURVES[falloffRef.current] ?? FALLOFF_CURVES.linear;
      const nodes = getItems(node);
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i];
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        const target = ease(
          Math.max(0, 1 - distance / proximityRadiusRef.current),
        );
        targetsRef.current[i] = target;
        currentRef.current[i] = target;
        el.style.setProperty("--effect", target.toFixed(4));
      }
      startLoopRef.current();
    };

    node.onpointerleave = () => {
      targetsRef.current = targetsRef.current.map(() => 0);
      startLoopRef.current();
    };

    startLoopRef.current();
  }, [getItems]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      if (controlledActive === undefined) {
        setActiveIndex(index);
      }
      onItemClick?.(index, label);
    },
    [controlledActive, onItemClick],
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, controlledActive, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      const list = boundListRef.current;
      if (list) {
        list.onpointermove = null;
        list.onpointerleave = null;
      }
    },
    [],
  );

  const markerClass = showMarker ? " line-sidebar--markers" : "";
  const tickClass = scaleTick ? " line-sidebar--scale-tick" : "";

  const sidebarStyle = {
    "--accent-color": accentColor,
    "--text-color": textColor,
    "--marker-color": markerColor,
    "--marker-length": `${markerLength}px`,
    "--marker-gap": `${markerGap}px`,
    "--tick-scale": tickScale,
    "--max-shift": `${maxShift}px`,
    "--item-gap": `${itemGap}px`,
    "--font-size": `${fontSize}rem`,
    "--smoothing": `${smoothing}ms`,
  } as CSSProperties;

  return (
    <nav
      className={`line-sidebar${markerClass}${tickClass}${className ? ` ${className}` : ""}`}
      style={sidebarStyle}
    >
      <ul ref={bindListRef} className="line-sidebar__list">
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            className="line-sidebar__item font-satoshi"
            aria-current={resolvedActive === index ? "true" : undefined}
            onClick={() => handleClick(index, label)}
          >
            {showMarker && (
              <span className="line-sidebar__marker" aria-hidden="true" />
            )}
            <span className="line-sidebar__label">
              {showIndex && (
                <span className="line-sidebar__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span className="line-sidebar__text">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
