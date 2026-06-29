"use client";

import type { Engine } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMemo } from "react";
import { useTheme } from "./ThemeProvider";

async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

export default function StarfieldBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: isDark ? 140 : 110 },
        color: { value: isDark ? "#00f0ff" : "#0066ff" },
        shape: { type: "circle" as const },
        opacity: {
          value: { min: isDark ? 0.2 : 0.35, max: isDark ? 0.6 : 0.9 },
        },
        size: { value: { min: 0.6, max: 2.0 } },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: "out" as const,
        },
        links: {
          enable: true,
          distance: 80,
          color: isDark ? "#00f0ff" : "#0066ff",
          opacity: isDark ? 0.12 : 0.22,
          width: isDark ? 0.5 : 1,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse" as const,
          },
        },
        modes: {
          repulse: {
            distance: 60,
            duration: 0.4,
            factor: 3,
            speed: 0.5,
          },
        },
      },
      detectRetina: true,
    }),
    [isDark],
  );

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        style={{ opacity: isDark ? 0.55 : 0.75 }}
        options={options}
      />
    </ParticlesProvider>
  );
}
