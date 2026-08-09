"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface EnergyFieldProps {
    progress: number;
}

export default function EnergyField({
    progress,
}: EnergyFieldProps) {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!ringRef.current) return;

        const t = state.clock.elapsedTime;

        ringRef.current.rotation.z =
            t *
            (0.35 + progress * 0.003);

        const scale =
            1 +
            Math.sin(t * 2) * 0.03 +
            progress * 0.002;

        ringRef.current.scale.setScalar(scale);

        const material =
            ringRef.current.material as THREE.MeshBasicMaterial;

        material.opacity =
            0.12 +
            progress / 250 +
            Math.sin(t * 3) * 0.03;
    });

    return (
        <mesh ref={ringRef}>
            <ringGeometry
                args={[1.45, 1.55, 128]}
            />

            <meshBasicMaterial
                color="#00E5FF"
                transparent
                opacity={0.18}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    );
}