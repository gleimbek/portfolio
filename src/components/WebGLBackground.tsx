import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uDistortion;
  uniform vec2 uDirection;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Wave distortion based on scroll velocity
    float wave = sin(uv.y * 10.0 + uTime * 0.5) * uDistortion * 0.5;
    float wave2 = cos(uv.x * 8.0 + uTime * 0.3) * uDistortion * 0.3;
    
    uv.x += wave * uDirection.x + wave2;
    uv.y += wave * uDirection.y + wave2;
    
    // RGB shift based on distortion
    float rgbShift = uDistortion * 0.008;
    vec4 colorR = texture2D(uTexture, uv + vec2(rgbShift, 0.0) * uDirection);
    vec4 colorG = texture2D(uTexture, uv);
    vec4 colorB = texture2D(uTexture, uv - vec2(rgbShift, 0.0) * uDirection);
    
    vec4 color = vec4(colorR.r, colorG.g, colorB.b, 1.0);
    
    // Vignette
    float vignette = 1.0 - length(vUv - 0.5) * 0.5;
    color.rgb *= vignette;
    
    gl_FragColor = color;
  }
`;

interface DistortionPlaneProps {
  imageSrc: string;
  distortion: number;
  direction: { x: number; y: number };
}

function DistortionPlane({ imageSrc, distortion, direction }: DistortionPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imageSrc);
  
  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uDistortion: { value: 0 },
    uDirection: { value: new THREE.Vector2(0, 0) }
  }), [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uDistortion.value = THREE.MathUtils.lerp(
        material.uniforms.uDistortion.value,
        distortion,
        0.08
      );
      material.uniforms.uDirection.value.x = THREE.MathUtils.lerp(
        material.uniforms.uDirection.value.x,
        direction.x,
        0.1
      );
      material.uniforms.uDirection.value.y = THREE.MathUtils.lerp(
        material.uniforms.uDirection.value.y,
        direction.y,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.2, 1.24, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface WebGLBackgroundProps {
  imageSrc: string;
  distortion?: number;
  direction?: { x: number; y: number };
}

function WebGLScene({ imageSrc, distortion = 0, direction = { x: 0, y: 0 } }: WebGLBackgroundProps) {
  return (
    <DistortionPlane 
      imageSrc={imageSrc} 
      distortion={distortion} 
      direction={direction} 
    />
  );
}

export default function WebGLBackground({ imageSrc, distortion = 0, direction = { x: 0, y: 0 } }: WebGLBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <WebGLScene imageSrc={imageSrc} distortion={distortion} direction={direction} />
      </Canvas>
      {/* Overlay gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(11,11,13,0.25) 0%, rgba(11,11,13,0.55) 100%)'
        }}
      />
    </div>
  );
}
