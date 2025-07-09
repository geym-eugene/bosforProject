import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, useGLTF, Environment, Edges } from "@react-three/drei";
import { Center } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";

function HouseModel() {
  const { scene } = useGLTF("/models/jeka.glb");
  console.log("hu:", scene);

  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      child.material = new MeshStandardMaterial({
        color: "blue",
        metalness: 0.1,
        visible: true,
        transparent: true,
        opacity: 0.5,
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

export function HouseScene() {
  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      shadows
      camera={{ position: [0, 2, 5], fov: 75 }}
    >
      <Environment preset="dawn" background />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={7} castShadow />

      {/* задержка зашрузки */}
      <Suspense fallback={null}>
        <HouseModel />
        <OrbitControls />
      </Suspense>
      {/* <EffectComposer multisampling={8}>
        <Outline
          blendFunction={BlendFunction.SCREEN}
          edgeStrength={5.0}
          pulseSpeed={0}
          visibleEdgeColor={0x000000}
          hiddenEdgeColor={0x666666}
          width={1000}
        />
      </EffectComposer> */}
    </Canvas>
  );
}
