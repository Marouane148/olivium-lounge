'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getSmokeTexture } from './smokeTexture';

const COUNT = 260;

const vertexShader = `
  attribute float aScale;
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aScale * (260.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    vec4 tex = texture2D(uTexture, gl_PointCoord);
    gl_FragColor = vec4(uColor, tex.a * vAlpha);
  }
`;

type SmokeProps = {
  origin?: [number, number, number];
  motionScale?: number;
};

export default function Smoke({ origin = [0, 0, 0], motionScale = 1 }: SmokeProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const texture = useMemo(() => getSmokeTexture(), []);

  const { positions, seeds, life, alphas, scales, basePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const basePositions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const life = new Float32Array(COUNT);
    const alphas = new Float32Array(COUNT);
    const scales = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const bx = origin[0] + (Math.random() - 0.5) * 0.15;
      const by = origin[1];
      const bz = origin[2] + (Math.random() - 0.5) * 0.15;
      basePositions[i * 3] = bx;
      basePositions[i * 3 + 1] = by;
      basePositions[i * 3 + 2] = bz;
      positions[i * 3] = bx;
      positions[i * 3 + 1] = by;
      positions[i * 3 + 2] = bz;
      seeds[i] = Math.random() * Math.PI * 2;
      life[i] = Math.random();
      alphas[i] = 0;
      scales[i] = 0.35 + Math.random() * 0.4;
    }

    return { positions, seeds, life, alphas, scales, basePositions };
  }, [origin]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uColor: { value: new THREE.Color('#E8D5A3') },
    }),
    [texture]
  );

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const alphaAttr = points.geometry.attributes.aAlpha as THREE.BufferAttribute;
    const scaleAttr = points.geometry.attributes.aScale as THREE.BufferAttribute;

    const speed = 0.12 * motionScale;
    const dt = Math.min(delta, 0.05);

    for (let i = 0; i < COUNT; i++) {
      life[i] += (dt / 3.2) * (0.6 + motionScale * 0.4);
      if (life[i] > 1) {
        life[i] = 0;
        positions[i * 3] = basePositions[i * 3] + (Math.random() - 0.5) * 0.1;
        positions[i * 3 + 1] = basePositions[i * 3 + 1];
        positions[i * 3 + 2] = basePositions[i * 3 + 2] + (Math.random() - 0.5) * 0.1;
      }

      const t = life[i];
      positions[i * 3 + 1] += speed * dt * 3.3;
      positions[i * 3] += Math.sin(t * 6 + seeds[i]) * 0.0025 * (0.5 + motionScale);
      positions[i * 3 + 2] += Math.cos(t * 5 + seeds[i]) * 0.0025 * (0.5 + motionScale);

      alphas[i] = Math.sin(t * Math.PI) * 0.11;
      scales[i] = (0.35 + seeds[i] % 1 * 0.4) * (0.6 + t * 2.1);
    }

    posAttr.needsUpdate = true;
    alphaAttr.needsUpdate = true;
    scaleAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aAlpha" args={[alphas, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        args={[
          {
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.NormalBlending,
          },
        ]}
      />
    </points>
  );
}
