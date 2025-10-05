import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Charge le modèle GLB hébergé sur GitHub
function EunomiaModel({ talking }) {
  const gltf = useGLTF("https://github.com/rouleauphilippe2023-oss/English-Avator/raw/main/eunomia%20(1).glb");
  const meshRef = useRef();

  // Animation bouche ouverte si talking
  useEffect(() => {
    if (meshRef.current && meshRef.current.morphTargetDictionary) {
      const mouthIdx = meshRef.current.morphTargetDictionary["MouthOpen"];
      if (mouthIdx !== undefined) {
        meshRef.current.morphTargetInfluences[mouthIdx] = talking ? 1 : 0;
      }
    }
  }, [talking]);

  // Cherche le mesh principal du visage (souvent le premier mesh)
  let faceMesh = null;
  gltf.scene.traverse((obj) => {
    if (obj.isMesh && obj.morphTargetDictionary && obj.morphTargetDictionary["MouthOpen"]) {
      faceMesh = obj;
    }
  });

  return (
    <primitive
      object={gltf.scene}
      ref={faceMesh ? meshRef : undefined}
      scale={1.2}
    />
  );
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
