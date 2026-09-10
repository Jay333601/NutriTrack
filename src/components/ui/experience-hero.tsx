"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;

    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uMouse.value.lerp(state.mouse, 0.05);
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1]} />

      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;

          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;

            float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;

            float wave =
              (
                sin(uv.x * 8.0 + t + m.x * 12.0) +
                sin(uv.y * 6.0 - t + m.y * 12.0)
              ) * 0.5 + 0.5;

            float intensity =
              smoothstep(0.0, 1.0, wave);

            vec3 dark =
              vec3(0.004, 0.012, 0.009);

            vec3 green =
              vec3(0.025, 0.090, 0.065);

            gl_FragColor =
              vec4(mix(dark, green, intensity), 1.0);
          }
        `}
      />
    </mesh>
  );
};

const NutritionOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y =
      state.clock.getElapsedTime() * 0.18;

    meshRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.35) * 0.12;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.35}
      floatIntensity={1.2}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 3]} />

        <MeshDistortMaterial
          color="#d8d8d8"
          speed={2.5}
          distort={0.32}
          roughness={0.08}
          metalness={0.75}
        />
      </mesh>
    </Float>
  );
};

type ExperienceHeroProps = {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  onLogFood?: () => void;
};

export const ExperienceHero = ({
  calories = 0,
  protein = 0,
  carbs = 0,
  fat = 0,
  onLogFood,
}: ExperienceHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        {
          filter: "blur(26px)",
          opacity: 0,
          scale: 1.02,
        },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 1.8,
          ease: "expo.out",
        }
      );

      gsap.from(".nutrition-panel", {
        x: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1.15,
        ease: "power4.out",
        delay: 0.55,
        clearProps: "all",
      });

      const handleMouseMove = (event: MouseEvent) => {
        if (!ctaRef.current) return;

        const rect =
          ctaRef.current.getBoundingClientRect();

        const dx =
          event.clientX -
          (rect.left + rect.width / 2);

        const dy =
          event.clientY -
          (rect.top + rect.height / 2);

        const distance = Math.hypot(dx, dy);

        if (distance < 150) {
          gsap.to(ctaRef.current, {
            x: dx * 0.25,
            y: dy * 0.25,
            duration: 0.5,
          });
        } else {
          gsap.to(ctaRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };

      window.addEventListener(
        "mousemove",
        handleMouseMove
      );

      return () => {
        window.removeEventListener(
          "mousemove",
          handleMouseMove
        );
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-76px)] w-full overflow-hidden bg-[#020403] text-white"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <Canvas
          camera={{
            position: [0, 0, 60],
            fov: 35,
          }}
        >
          <ambientLight intensity={0.45} />

          <spotLight
            position={[40, 40, 40]}
            intensity={2.2}
          />

          <pointLight
            position={[-30, -10, 20]}
            intensity={1.2}
            color="#666666"
          />

          <LiquidBackground />
          <NutritionOrb />
        </Canvas>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 flex min-h-[calc(100vh-76px)] w-full flex-col gap-12 p-6 sm:p-8 md:flex-row md:items-stretch md:p-12 lg:p-16"
      >
        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-2.5 w-2.5 rounded-full bg-white">
              <div className="absolute inset-0 animate-ping rounded-full bg-white opacity-30" />
            </div>

            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/75">
              NUTRITRACK // LIVE
            </span>
          </div>

          <div className="max-w-4xl lg:-translate-y-6">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-white/35">
              Your daily nutrition
            </p>

            <h1 className="text-[clamp(4rem,9vw,9.5rem)] font-black leading-[0.84] tracking-[-0.07em]">
              YOUR
              <br />
              <span className="text-[#8fb8aa]">
                NUTRITION
              </span>
            </h1>

            <p className="mt-7 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.28em] text-white/45">
              Track what you eat, discover better meals,
              and understand your nutrition at a glance.
            </p>
          </div>

          <button
            ref={ctaRef}
            type="button"
            onClick={onLogFood}
            className="group flex w-fit items-center gap-5"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:bg-white">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-white transition-colors duration-500 group-hover:stroke-black"
              >
                <path
                  d="M7 17L17 7M17 7H8M17 7V16"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
              Log today's food
            </span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex w-full flex-shrink-0 flex-col justify-center gap-4 md:w-72 lg:w-80">
          <NutritionPanel
            id="001"
            title="CALORIES"
            value={Math.round(calories).toLocaleString()}
            suffix="KCAL"
          />

          <NutritionPanel
            id="002"
            title="PROTEIN"
            value={protein.toFixed(1)}
            suffix="G"
          />

          <NutritionPanel
            id="003"
            title="CARBS"
            value={carbs.toFixed(1)}
            suffix="G"
          />

          <NutritionPanel
            id="004"
            title="FAT"
            value={fat.toFixed(1)}
            suffix="G"
          />
        </div>
      </div>
    </section>
  );
};

function NutritionPanel({
  id,
  title,
  value,
  suffix,
}: {
  id: string;
  title: string;
  value: string;
  suffix: string;
}) {
  return (
    <div className="nutrition-panel border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl">
      <span className="block font-mono text-[9px] tracking-[0.22em] text-white/25">
        {id} // {title}
      </span>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="text-3xl font-semibold tracking-[-0.04em]">
          {value}
        </div>

        <div className="font-mono text-[10px] text-white/40">
          {suffix}
        </div>
      </div>

      <div className="mt-5 h-px w-full bg-white/10" />
    </div>
  );
}
