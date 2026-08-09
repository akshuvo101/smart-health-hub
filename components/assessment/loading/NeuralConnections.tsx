"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const NODE_COUNT = 18;

export default function NeuralConnections() {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    const points: THREE.Vector3[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const radius = 1.1 + Math.random() * 0.6;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      points.push(
        new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        )
      );
    }

    return points;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {positions.map((start, index) => {
        const end = positions[(index + 1) % positions.length];

        return (
          <Line
            key={index}
            points={[start, end]}
            color="#22D3EE"
            lineWidth={1}
            transparent
            opacity={0.35}
          />
        );
      })}
    </group>
  );
}