import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CarBody() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.8, 0.4, 4]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Fake Glass (Transmission हटाया गया है ताकि GPU लोड न पड़े) */}
      <mesh position={[0, 0.6, -0.2]}>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color="#05050A" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
      </mesh>

      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.9, 0.05, 4.1]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
      </mesh>
      
      <mesh position={[0.6, 0.2, 2]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#FFF" emissive="#FFF" emissiveIntensity={3} /></mesh>
      <mesh position={[-0.6, 0.2, 2]}><boxGeometry args={[0.4, 0.1, 0.1]} /><meshStandardMaterial color="#FFF" emissive="#FFF" emissiveIntensity={3} /></mesh>
      <mesh position={[0, 0.3, -2]}><boxGeometry args={[1.6, 0.1, 0.1]} /><meshStandardMaterial color="#FF003C" emissive="#FF003C" emissiveIntensity={3} /></mesh>
    </group>
  );
}

function Wheel({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.x += delta * 20;
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 12]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.4} />
      </mesh>
    </group>
  );
}

function SmokeTrail() {
  const count = 30; // 100 से घटाकर 30 कर दिए गए हैं
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: 0, y: 0, z: 0,
      vx: (Math.random() - 0.5) * 0.05,
      vy: Math.random() * 0.02 + 0.01,
      vz: -Math.random() * 0.1 - 0.05,
      life: Math.random(),
      scale: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.life -= delta * 0.5;
      if (p.life <= 0) { p.life = 1; p.x = (Math.random() - 0.5) * 0.5; p.y = 0; p.z = -2; p.scale = Math.random() * 0.5 + 0.2; }
      p.x += p.vx; p.y += p.vy; p.z += p.vz; p.scale += delta * 0.5;
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.setScalar(p.scale * p.life);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 6, 6]} />
      <meshStandardMaterial color="#555" transparent opacity={0.3} depthWrite={false} />
    </instancedMesh>
  );
}

export default function CyberCar() {
  const carGroup = useRef<THREE.Group>(null);
  const bodyGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (carGroup.current) {
      const cycle = (t % 10) / 10; 
      const x = THREE.MathUtils.lerp(-15, 15, cycle);
      const z = Math.sin(cycle * Math.PI * 2) * 2; 
      const yaw = Math.cos(cycle * Math.PI * 2) * -0.4; 
      carGroup.current.position.set(x, 0, z);
      carGroup.current.rotation.y = yaw;
      const speedFactor = Math.abs(Math.cos(cycle * Math.PI));
      if (bodyGroup.current) {
        bodyGroup.current.position.y = Math.sin(t * 15) * 0.02 * speedFactor;
        bodyGroup.current.rotation.z = yaw * 0.2; 
      }
    }
  });

  return (
    <group ref={carGroup}>
      <group ref={bodyGroup}>
        <CarBody />
        <Wheel position={[-0.9, -0.1, 1.2]} />
        <Wheel position={[0.9, -0.1, 1.2]} />
        <Wheel position={[-0.9, -0.1, -1.2]} />
        <Wheel position={[0.9, -0.1, -1.2]} />
      </group>
      <SmokeTrail />
      
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#05050A" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
          }
