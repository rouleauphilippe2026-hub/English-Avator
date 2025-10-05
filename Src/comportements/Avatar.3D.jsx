import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Charge le modèle GLB hébergé sur GitHub
function EunomiaModel({ talking }) {
  const gltf = useGLTF("https://github.com/rouleauphilippe2023-oss/English-Avator/raw/main/eunomia%20(1).glb");
  const meshRef = useRef();

  useEffect(() => {
    // Traverse le modèle pour trouver le mesh avec morphTarget "MouthOpen"
    gltf.scene.traverse((obj) => {
      if (obj.isMesh && obj.morphTargetDictionary && obj.morphTargetDictionary["MouthOpen"]) {
        const idx = obj.morphTargetDictionary["MouthOpen"];
        obj.morphTargetInfluences[idx] = talking ? 1 : 0;
      }
    });
  }, [talking, gltf.scene]);

  return <primitive object={gltf.scene} scale={1.2} ref={meshRef} />;
}

export default function Avatar3D({ talking }) {
  return (
    <div style={{ width: 320, height: 320 }}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <EunomiaModel talking={talking} />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
