'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Hookah from './Hookah';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

function SpinningHookah({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={group} position={[0, -0.55, 0]} scale={0.62}>
      <Hookah />
    </group>
  );
}

export default function ChichaMiniScene() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0.6, 0.3, 3.6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <hemisphereLight color="#E8D5A3" groundColor="#1a1712" intensity={0.75} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 5, 4]} intensity={0.7} color="#F3E3C0" />
      <pointLight position={[-2, 1, 2]} color="#7A9A45" intensity={0.5} />
      <SpinningHookah reducedMotion={reducedMotion} />
    </Canvas>
  );
}
