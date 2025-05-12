import { Canvas } from "@react-three/fiber";
import React from "react";
import '../style.css'
import { OrbitControls } from "@react-three/drei";
import ImageContainer from "../imageContainer";



const Landing = () => {
  return (
    <Canvas  style={{backgroundColor:"black",height:"100vh"}}>
        <OrbitControls/>
         <ImageContainer/>
     
    </Canvas>
    
  );
};

export default Landing;
