"use client";

import type { Engine } from "@tsparticles/engine";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useMemo } from "react";
import { useTheme } from "@/providers/ThemeProvider";

async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

function DarkParticles() {
  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      particles: {
        number: { value: 140 },
        color: { value: "#00f0ff" },
        shape: { type: "circle" as const },
        opacity: {
          value: { min: 0.2, max: 0.6 },
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
          color: "#00f0ff",
          opacity: 0.12,
          width: 0.5,
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
    [],
  );

  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="tsparticles"
        className="starfield-bg absolute inset-0 z-0"
        style={{ opacity: 0.55 }}
        options={options}
      />
    </ParticlesProvider>
  );
}

export default function StarfieldBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return isDark ? <DarkParticles /> : null;
}
