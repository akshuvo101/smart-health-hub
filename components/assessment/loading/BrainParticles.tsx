"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BrainParticlesProps {
    progress: number;
}

const PARTICLE_COUNT = 140;

export default function BrainParticles({
    progress,
}: BrainParticlesProps) {
    const pointsRef = useRef<THREE.Points>(null);

    const { positions, scales } = useMemo(() => {
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const scales = new Float32Array(PARTICLE_COUNT);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const radius = 1.3 + Math.random() * 0.8;

            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i * 3] =
                radius * Math.sin(phi) * Math.cos(theta);

            positions[i * 3 + 1] =
                radius * Math.cos(phi);

            positions[i * 3 + 2] =
                radius * Math.sin(phi) * Math.sin(theta);

            scales[i] = Math.random();
        }

        return {
            positions,
            scales,
        };
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;

        const t = state.clock.elapsedTime;

        pointsRef.current.rotation.y =
            t * (0.08 + progress * 0.002);
        pointsRef.current.rotation.x =
            Math.sin(t * 0.25) * 0.08;

        const material =
            pointsRef.current.material as THREE.PointsMaterial;

        material.opacity =
            0.55 +
            progress * 0.003 +
            Math.sin(t * 2.5) * 0.2;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>

            <pointsMaterial
                color="#00E5FF"
                size={0.035}
                sizeAttenuation
                transparent
                opacity={0.8}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}