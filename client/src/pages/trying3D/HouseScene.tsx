import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, useGLTF, Environment, Edges } from "@react-three/drei";
import { Center } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import React from "react";

function HouseModel() {
  const { scene } = useGLTF("/models/jeka.glb");
  console.log("hu:", scene);

  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = new MeshStandardMaterial({
        color: "green",
        metalness: 0.1,
        visible: true,
        transparent: true,
        opacity: 0.8,
        // wireframe: true,
      });
    }
  });

  //   scene.position.set(0, 0, 0);
  return (
    <Center>
      <primitive
        object={scene}
        scale={[0.2, 0.2, 0.2]}
        // position={[1, -1, -1]}
      />
      {/* <Edges
    threshold={10}
    scale={2}
    color="black"
  /> */}
      {/* <Edges threshold={50} color="black" />; */}
    </Center>
  );
}

const HouseSceneComponent: React.FC = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", background: "transparent" }}
      className=""
      shadows
      camera={{ position: [0, 2, 5], fov: 75 }}
    >
      {/* <Environment preset='warehouse' background /> */}
      <Environment files="/models/lala.jpg" background />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={7} castShadow />
      {/* задержка зашрузки */}
      <Suspense fallback={null}>
        <HouseModel />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
};

export const HouseScene = React.lazy(
  () =>
    new Promise<{ default: React.FC }>((resolve) => {
      setTimeout(() => {
        resolve({ default: HouseSceneComponent });
      }, 1000);
    })
);
