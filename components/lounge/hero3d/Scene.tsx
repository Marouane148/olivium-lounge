'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Hookah from './Hookah';
import DrinkGlass from './DrinkGlass';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const BASE_POSITION: [number, number, number] = [1.0, -0.75, 0];

function Rig({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    group.current.rotation.y += delta * 0.12;
    group.current.position.y = BASE_POSITION[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
  });

  return (
    <group ref={group} position={BASE_POSITION} scale={0.6}>
      <Hookah />
      <DrinkGlass />
    </group>
  );
}

export default function Scene() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [1.1, 0.7, 6.8], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <hemisphereLight color="#E8D5A3" groundColor="#1a1712" intensity={0.75} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} color="#F3E3C0" />
      <spotLight position={[-2, 3, 4]} angle={0.5} penumbra={0.8} intensity={0.6} color="#E8D5A3" />
      <pointLight position={[-3, 1, -2]} color="#7A9A45" intensity={0.6} />

      <Rig reducedMotion={reducedMotion} />

      <OrbitControls
        target={[0.5, -0.2, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.9}
        autoRotate={false}
        rotateSpeed={0.4}
      />
    </Canvas>
  );
}
