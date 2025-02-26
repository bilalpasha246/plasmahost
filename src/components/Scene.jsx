import { useRef } from "react";
import * as THREE from 'three';
import { useFrame, useLoader } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Scene = () => {
  const sphereRef = useRef();
  const texture = useLoader(THREE.TextureLoader, '/images/earth.jpg');

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x += 0;
      sphereRef.current.rotation.y += 0.01;
    }
  });

  return (
    <>
      <mesh ref={sphereRef} position={[0.2, -2.5, 0.5]} rotation={[2, 0, 0]}>
        <sphereGeometry args={[1, 50, 50]} />
        <meshStandardMaterial map={texture} />
        
      </mesh>
      <ambientLight intensity={8} />
      <EffectComposer>
        <Bloom
          intensity={15}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.7}
        />
      </EffectComposer>
    </>
  );
};

export default Scene;
