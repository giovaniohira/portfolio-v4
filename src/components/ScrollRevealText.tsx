"use client";

import { useRef, type RefObject } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const GRAY = "#6c6c6c";
const WHITE = "#f6f7ff";

function DuplicateChar({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const color = useTransform(progress, [start, end], [GRAY, WHITE], { clamp: true });

  return (
    <span className="relative inline-block">
      <span className="absolute opacity-20">{char}</span>
      <motion.span style={{ color }}>{char}</motion.span>
    </span>
  );
}

function DuplicateWord({
  word,
  startIndex,
  total,
  progress,
}: {
  word: string;
  startIndex: number;
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <span className="relative mt-2 mr-2 inline-block">
      {word.split("").map((char, i) => (
        <DuplicateChar
          key={`${startIndex}-${i}`}
          char={char}
          index={startIndex + i}
          total={total}
          progress={progress}
        />
      ))}
    </span>
  );
}

type ScrollRevealTextProps = {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3";
  center?: boolean;
  scrollTargetRef?: RefObject<HTMLElement | null>;
};

export function ScrollRevealText({
  text,
  className = "",
  as: Tag = "p",
  center = false,
  scrollTargetRef,
}: ScrollRevealTextProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const target = scrollTargetRef ?? localRef;

  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 0.9", "end 0.1"],
  });

  const words = text.split(" ");
  const wordTexts = words.map((word, i) => (i < words.length - 1 ? `${word} ` : word));
  const totalChars = wordTexts.reduce((n, w) => n + w.length, 0);

  let charOffset = 0;

  const content = (
    <Tag
      className={`flex flex-wrap ${center ? "justify-center" : ""} ${className}`}
    >
      {wordTexts.map((word, i) => {
        const startIndex = charOffset;
        charOffset += word.length;
        return (
          <DuplicateWord
            key={`${word}-${i}`}
            word={word}
            startIndex={startIndex}
            total={totalChars}
            progress={scrollYProgress}
          />
        );
      })}
    </Tag>
  );

  if (scrollTargetRef) return content;

  return <div ref={localRef}>{content}</div>;
}
