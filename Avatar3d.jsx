import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function EunomiaModel(props) {
  const gltf = useGLTF("https://github.com/rouleauphilippe2023-oss/English-Avator/raw/main/eunomia%20(1).glb");
  return <primitive object={gltf.scene} {...props} />;
}

export default function Avatar3D() {
  return (
    <div style={{ width: 320, height: 320 }}>
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.8} />
        <Suspense fallback={null}>
          <EunomiaModel scale={1.2} />
        </Suspense>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
