"use client";

import { useEffect, useState, useCallback, useRef } from "react";

type Phase = "init" | "stagger" | "bounced" | "idle" | "flip";

interface Segment {
  text: string;
  highlight?: boolean;
}

const SEGMENTS: Segment[] = [
  { text: "这是我的" },
  { text: "技术实验空间" },
  { text: "，收录了我在" },
  { text: " " },
  { text: "前端、后端、AI、工具链", highlight: true },
  { text: " " },
  { text: "等领域的" },
  { text: "开源项目。" },
];

const DELAYS = [0, 140, 280, 380, 440, 620, 700, 860];

const BOUNCE_DURATION = 700;
const IDLE_MIN = 18000;
const IDLE_MAX = 26000;
const FLIP_CHANCE = 0.15;

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function HeroSection() {
  const [phase, setPhase] = useState<Phase>("init");
  const [cycle, setCycle] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = useCallback(() => {
    timers.current.forEach((id) => clearTimeout(id));
    timers.current = [];
  }, []);

  const delay = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const startStagger = useCallback(() => {
    setPhase("stagger");
    delay(() => setPhase("bounced"), 1400);
    delay(() => setPhase("idle"), 1400 + BOUNCE_DURATION);
  }, [delay]);

  const runCycle = useCallback(
    (isFirst: boolean) => {
      clearAll();
      setCycle((c) => c + 1);

      if (isFirst) {
        setPhase("init");
        delay(startStagger, 900);
      } else {
        if (Math.random() < FLIP_CHANCE) {
          setPhase("flip");
          delay(() => startStagger(), 1900);
        } else {
          startStagger();
        }
      }

      delay(
        () => runCycle(false),
        (isFirst ? 900 : 0) +
          1400 +
          BOUNCE_DURATION +
          rand(IDLE_MIN, IDLE_MAX),
      );
    },
    [clearAll, startStagger, delay],
  );

  useEffect(() => {
    const id = setTimeout(() => runCycle(true), 300);
    timers.current.push(id);
    return () => clearAll();
  }, [runCycle, clearAll]);

  const titleClass =
    phase === "init"
      ? "animate-title-flip-in"
      : phase === "flip"
        ? "animate-title-flip-360"
        : phase === "bounced"
          ? "animate-title-bounce"
          : "";

  return (
    <section className="relative z-10 shrink-0 pt-32 pb-8 text-center">
      <h1
        className={`text-5xl font-bold tracking-tight text-text-primary sm:text-6xl lg:text-7xl ${titleClass}`}
        style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      >
        Welcome to{" "}
        <span className="text-gradient glow-text inline-block">GVRAY</span>
      </h1>

      <p className="mt-6 text-lg text-text-secondary sm:text-xl min-h-[1.75em]">
        {SEGMENTS.map((seg, i) => (
          <span
            key={`${cycle}-${i}`}
            className={`inline-block transition-all duration-500 ${
              phase === "init" && i > 1
                ? "opacity-0 translate-y-3"
                : phase === "stagger" || phase === "bounced" || phase === "idle" || phase === "flip"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
            } ${seg.highlight ? "font-semibold text-accent" : ""}`}
            style={{
              transitionDelay:
                phase === "stagger" || phase === "bounced" || phase === "idle" || phase === "flip"
                  ? `${DELAYS[i]}ms`
                  : "0ms",
            }}
          >
            {seg.text === " " ? " " : seg.text}
          </span>
        ))}
      </p>
    </section>
  );
}
