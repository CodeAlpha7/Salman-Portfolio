// components/ThreeJSIntro.js
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Responsive text based on screen size
const ResponsiveText = ({ text, position, fontSize, color, onComplete }) => {
  const { viewport } = useThree();
  const [displayedChars, setDisplayedChars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  // Adjust font size based on viewport width
  const responsiveFontSize = fontSize * Math.min(1, viewport.width / 10);
  
  useEffect(() => {
    if (displayedChars < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedChars(prevChars => prevChars + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 1500); // Longer delay before transitioning away
    }
  }, [displayedChars, text, onComplete]);
  
  return (
    <Text
      position={position}
      fontSize={responsiveFontSize}
      color={color}
      font="/fonts/PlayfairDisplay-Bold.ttf"
      maxWidth={viewport.width * 0.8}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
    >
      {text.substring(0, displayedChars)}
    </Text>
  );
};

const Particles = ({ count = 2000 }) => {
  const mesh = useRef();
  const { viewport } = useThree();
  
  // Adjust particle spread based on viewport size
  const particleSpread = Math.min(15, viewport.width);
  
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * particleSpread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * particleSpread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * particleSpread;
    }
    return positions;
  });

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1);
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1);
      
      // Add breathing effect to particles
      mesh.current.scale.x = 1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      mesh.current.scale.y = 1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      mesh.current.scale.z = 1 + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={new THREE.Color('#B58F02')}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Floating elements in the background
const BackgroundSpheres = () => {
  const group = useRef();
  const spherePositions = [
    [-3, -2, -5],
    [3, 2, -8],
    [-5, 3, -10],
    [5, -3, -9],
    [0, 5, -7]
  ];
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });
  
  return (
    <group ref={group}>
      {spherePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.5 + Math.random() * 0.5, 8, 8]} />
          <meshStandardMaterial 
            color="#D4AF37" 
            emissive="#D4AF37"
            emissiveIntensity={0.2}
            transparent
            opacity={0.1 + Math.random() * 0.1} 
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

// Camera that moves slowly
const MovingCamera = () => {
  const camera = useRef();
  
  useFrame((state) => {
    if (camera.current) {
      camera.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.8;
      camera.current.position.y = Math.cos(state.clock.getElapsedTime() * 0.2) * 0.4;
      camera.current.lookAt(0, 0, 0);
    }
  });
  
  return <PerspectiveCamera ref={camera} makeDefault position={[0, 0, 5]} />;
};

const ThreeJSIntro = ({ onComplete }) => {
  // Fallback for browsers that don't support WebGL
  const [hasWebGL, setHasWebGL] = useState(true);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);
  
  if (!hasWebGL) {
    // Fallback component for browsers without WebGL
    return (
      <div className="w-full h-screen absolute inset-0 z-50 bg-background flex flex-col items-center justify-center">
        <div className="text-primary text-2xl sm:text-4xl md:text-5xl font-bold text-center px-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary">
          Welcome to Salman&apos;s Portfolio!
        </div>
        <button 
          className="mt-8 px-6 py-2 bg-secondary text-primary rounded-full hover:scale-105 transition-transform"
          onClick={onComplete}
        >
          Continue to Site
        </button>
      </div>
    );
  }
  
  return (
    <div className="w-full h-screen absolute inset-0 z-50 bg-background">
      {/* Vignette overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none" 
           style={{ boxShadow: "inset 0 0 150px rgba(0,0,0,0.5)" }} />
      
      <Canvas>
        <MovingCamera />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <BackgroundSpheres />
        
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.5}
        >
          <ResponsiveText
            text="Welcome to Salman's Portfolio!"
            position={[0, 0, 0]}
            fontSize={0.3}
            color="#D4AF37"
            onComplete={onComplete}
          />
        </Float>
        
        <Particles count={7000} />
      </Canvas>
    </div>
  );
};

export default ThreeJSIntro;