"use client";

import { ReactLenis } from "lenis/react";

const HEADER_OFFSET = -72;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        anchors: { offset: HEADER_OFFSET },
      }}
    >
      {children}
    </ReactLenis>
  );
}
