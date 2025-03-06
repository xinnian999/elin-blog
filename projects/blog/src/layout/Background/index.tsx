"use client";

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // 使用 slim 版本代替 full
import "./style.css";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine); // 加载 slim 版本
  }, []);

  return (
    <div className="background">
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="hidden dark:block"
        options={{
          background: {
            color: "#000",
          },
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
            move: {
              enable: true,
              speed: 1,
            },
          },
        }}
      />
    </div>
  );
}
