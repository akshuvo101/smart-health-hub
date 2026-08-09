"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface ScanBeamProps {
    progress: number;
}

export default function ScanBeam({ progress }: ScanBeamProps) {
    const beamRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!beamRef.current) return;

        const t = state.clock.elapsedTime;

        // Move from top to bottom
        beamRef.current.position.y =
            1.3 - ((t * 0.9) % 2.6);

        const speed =
            0.8 + progress * 0.02;

        beamRef.current.position.y =
            1.3 -
            ((t * speed) % 2.6);
        // Small pulse
        const material =
            beamRef.current.material as THREE.MeshBasicMaterial;

        material.opacity =
            0.15 +
            progress * 0.002;
    });

    return (
        <mesh ref={beamRef}>
            <planeGeometry args={[2.4, 0.08]} />

            <meshBasicMaterial
                color="#00E5FF"
                transparent
                opacity={0.18}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
            />
        </mesh>
    );
}