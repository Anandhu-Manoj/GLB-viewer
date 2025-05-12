import React from "react";
import { useGLTF } from "@react-three/drei";

const ImageContainer = () => {
  const { scene } = useGLTF("/mac.glb"); 
  return <primitive object={scene} />;
};

export default ImageContainer;
