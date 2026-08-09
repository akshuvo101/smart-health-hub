"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import brainVertex from "./shaders/brainVertex";
import brainFragment from "./shaders/brainFragment";

interface BrainImageProps {
  progress?: number;
}

export default function BrainImage({
  progress = 0,
}: BrainImageProps) {
  const groupRef = useRef<THREE.Group>(null);

  const shaderRef =
    useRef<THREE.ShaderMaterial>(null);

  const texture = useLoader(
    TextureLoader,
    "/images/brain-3.png"
  );

  useMemo(() => {
    texture.colorSpace =
      THREE.SRGBColorSpace;

    texture.anisotropy = 8;

    texture.needsUpdate = true;
  }, [texture]);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: {
          value: texture,
        },

        uTime: {
          value: 0,
        },

        uProgress: {
          value: 0,
        },
      },

      vertexShader: brainVertex,

      fragmentShader: brainFragment,

      transparent: true,

      depthWrite: false,

      blending:
        THREE.NormalBlending,
    });
  }, [texture]);

  useFrame((state) => {
    if (
      !groupRef.current ||
      !shaderRef.current
    ) {
      return;
    }

    const t =
      state.clock.elapsedTime;

    // Floating

    groupRef.current.position.y =
      Math.sin(t * 1.6) * 0.08;

    // Gentle tilt

    groupRef.current.rotation.z =
      Math.sin(t * 0.8) * 0.025;

    // Breathing

    const pulse =
      1 +
      Math.sin(t * 2.2) * 0.025 +
      progress * 0.0005;

    groupRef.current.scale.setScalar(
      pulse
    );

    shaderRef.current.uniforms.uTime.value =
      t;

    shaderRef.current.uniforms.uProgress.value =
      progress / 100;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <planeGeometry
          args={[2.25, 2.25]}
        />

        <primitive
          object={shaderMaterial}
          ref={shaderRef}
          attach="material"
        />
      </mesh>
    </group>
  );
}