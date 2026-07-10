'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const BUBBLE_COUNT = 18;
const GOLD = '#C8A96B';

export default function DrinkGlass({ position = [-1.3, -0.85, 0.4] as [number, number, number] }) {
  const bubblesRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const bubbleSeeds = useMemo(
    () =>
      Array.from({ length: BUBBLE_COUNT }, () => ({
        x: (Math.random() - 0.5) * 0.32,
        z: (Math.random() - 0.5) * 0.32,
        speed: 0.15 + Math.random() * 0.2,
        offset: Math.random(),
        scale: 0.02 + Math.random() * 0.025,
      })),
    []
  );

  useFrame((_, delta) => {
    const mesh = bubblesRef.current;
    if (!mesh) return;
    const dt = Math.min(delta, 0.05);

    bubbleSeeds.forEach((b, i) => {
      b.offset += dt * b.speed;
      if (b.offset > 1) b.offset = 0;
      const y = -0.35 + b.offset * 0.75;
      dummy.position.set(b.x + Math.sin(b.offset * 10) * 0.015, y, b.z);
      dummy.scale.setScalar(b.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group position={position}>
      {/* Glass */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.34, 0.28, 0.9, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
          roughness={0.05}
          metalness={0}
          transmission={0.85}
          thickness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Liquid */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.32, 0.27, 0.55, 32]} />
        <meshPhysicalMaterial color={GOLD} transparent opacity={0.75} roughness={0.15} transmission={0.3} />
      </mesh>

      {/* Ice cubes */}
      {[
        [0.08, 0.1, 0.05],
        [-0.1, 0.18, -0.06],
        [0.02, 0.24, 0.1],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0.3 * i, 0.5 * i, 0]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.4} roughness={0.05} transmission={0.9} />
        </mesh>
      ))}

      {/* Bubbles */}
      <instancedMesh ref={bubblesRef} args={[undefined, undefined, BUBBLE_COUNT]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#FFE9C2" transparent opacity={0.5} />
      </instancedMesh>
    </group>
  );
}
