import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import CyberCar from './CyberCar';

export default function Scene() {
  return (
    <Canvas
      dpr={0.75} // मोबाइल के लिए रेजोल्यूशन कम किया
      camera={{ position: [0, 2, 8], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }} // हीटिंग रोकने के लिए
      onCreated={({ gl }) => gl.setClearColor('#05050A')}
    >
      <color attach="background" args={['#05050A']} />
      <fog attach="fog" args={['#05050A', 15, 40]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 2, -5]} color="#FF003C" intensity={1.5} distance={10} />
      <pointLight position={[5, 2, 5]} color="#00F0FF" intensity={1.5} distance={10} />

      <CyberCar />
      
      <Environment preset="night" />
      
      {/* Bloom और Shadows को 6GB RAM के लिए पूरी तरह हटा दिया गया है */}
    </Canvas>
  );
}
