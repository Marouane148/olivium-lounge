'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Smoke from './Smoke';
import { getSmokeTexture } from './smokeTexture';

const GOLD = '#C8A96B';
const GOLD_LIGHT = '#E8D5A3';
const OLIVE = '#556B2F';
const DARK = '#161311';

function useVaseGeometry() {
  return useMemo(() => {
    const points: THREE.Vector2[] = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.55, 0.02),
      new THREE.Vector2(0.72, 0.18),
      new THREE.Vector2(0.78, 0.42),
      new THREE.Vector2(0.66, 0.68),
      new THREE.Vector2(0.42, 0.86),
      new THREE.Vector2(0.22, 0.94),
      new THREE.Vector2(0.16, 1.0),
    ];
    return new THREE.LatheGeometry(points, 48);
  }, []);
}

export default function Hookah() {
  const coalRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const vaseGeometry = useVaseGeometry();
  const glowTexture = useMemo(() => getSmokeTexture(), []);

  const hosePath = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.16, 1.55, 0),
      new THREE.Vector3(0.55, 1.35, 0.25),
      new THREE.Vector3(0.95, 0.95, 0.55),
      new THREE.Vector3(1.05, 0.5, 0.7),
      new THREE.Vector3(0.95, 0.15, 0.75),
    ]);
  }, []);

  const hoseGeometry = useMemo(() => new THREE.TubeGeometry(hosePath, 64, 0.045, 12, false), [hosePath]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const flicker = 0.65 + Math.sin(t * 6) * 0.12 + Math.sin(t * 13) * 0.05;
    if (coalRef.current) {
      coalRef.current.intensity = flicker;
    }
    if (glowRef.current) {
      const s = 0.55 + flicker * 0.18;
      glowRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group position={[0, -1.1, 0]}>
      {/* Base vase */}
      <mesh geometry={vaseGeometry} castShadow>
        <meshStandardMaterial color={GOLD} metalness={0.45} roughness={0.4} />
      </mesh>

      {/* Water fill inside vase */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.45, 0.4, 0.4, 32]} />
        <meshPhysicalMaterial
          color={OLIVE}
          transparent
          opacity={0.55}
          roughness={0.1}
          metalness={0}
          transmission={0.4}
        />
      </mesh>

      {/* Tray */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.32, 0.34, 0.05, 32]} />
        <meshStandardMaterial color={GOLD_LIGHT} metalness={0.25} roughness={0.85} />
      </mesh>

      {/* Stem */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.5, 16]} />
        <meshStandardMaterial color={GOLD} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Bowl (head) */}
      <mesh position={[0.16, 1.58, 0]}>
        <cylinderGeometry args={[0.16, 0.12, 0.16, 24]} />
        <meshStandardMaterial color={DARK} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Coal ember */}
      <mesh position={[0.16, 1.67, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshStandardMaterial color="#FF7A3C" emissive="#FF5A1F" emissiveIntensity={1.6} />
      </mesh>
      <pointLight ref={coalRef} position={[0.16, 1.7, 0]} color="#FF7A3C" intensity={0.7} distance={1.1} />
      {/* Soft glow halo (hand-rolled bloom substitute, avoids a postprocessing dependency) */}
      <sprite ref={glowRef} position={[0.16, 1.68, 0]} scale={[0.6, 0.6, 1]}>
        <spriteMaterial
          map={glowTexture}
          color="#FF8A45"
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      {/* Hose */}
      <mesh geometry={hoseGeometry}>
        <meshStandardMaterial color="#1E1B18" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0.95, 0.1, 0.76]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.14, 16]} />
        <meshStandardMaterial color={GOLD} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Rising smoke from the coal */}
      <Smoke origin={[0.16, 1.72, 0]} />
    </group>
  );
}
