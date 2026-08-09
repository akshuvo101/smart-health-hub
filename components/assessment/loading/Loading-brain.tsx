"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo } from "react";

import BrainImage from "./BrainImage";
import BrainParticles from "./BrainParticles";
import NeuralConnections from "./NeuralConnections";
import CircularProgress from "./CircularProgress";
import ScanBeam from "./ScanBeam";
import EnergyField from "./EnergyField";

interface LoadingBrainProps {
  progress: number;
}

export default function LoadingBrain({
  progress,
}: LoadingBrainProps) {

  const bloomIntensity = useMemo(() => {
    return 1.5 + progress * 0.025;
  }, [progress]);

  return (
    <div
      className="
        relative
        mx-auto
        h-[220px]
        w-[220px]
        sm:h-[260px]
        sm:w-[260px]
        md:h-[320px]
        md:w-[320px]
        lg:h-[380px]
        lg:w-[380px]
      "
    >
      <CircularProgress progress={progress} />
      <Canvas
        camera={{
          position: [0, 0, 3],
          fov: 45,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        {/* Lights */}

        <ambientLight intensity={1.2} />

        <pointLight
          color="#00E5FF"
          intensity={3}
          position={[2, 2, 2]}
        />

        <pointLight
          color="#7C3AED"
          intensity={2}
          position={[-2, 2, 2]}
        />

        <pointLight
          color="#22D3EE"
          intensity={1.5}
          position={[0, -2, 2]}
        />

        {/* AI Energy Particles */}

        <BrainParticles progress={progress}/>
        <NeuralConnections />
        <EnergyField progress={progress} />
        {/* Brain */}

        <Float
          speed={2}
          floatIntensity={0.25}
          rotationIntensity={0}
        >
          <BrainImage progress={progress} />
          <ScanBeam progress={progress} />
        </Float>

        {/* Bloom */}

        <EffectComposer>
          <Bloom
            intensity={bloomIntensity}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}