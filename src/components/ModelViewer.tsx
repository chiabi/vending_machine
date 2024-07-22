import React, { useEffect, useRef } from 'react';
import {
  animate,
  createCamera,
  createLights,
  createRenderer,
  createScene,
  loadModel,
} from '../three';
import { setupGUI } from '../three/gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const ModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    const lights = createLights(scene);

    const controls = new OrbitControls(camera, renderer.domElement);

    mountRef.current.appendChild(renderer.domElement);

    loadModel(scene, '/models/vending_machine.gltf');
    setupGUI({
      scene,
      directionalLight: lights.directionalLight,
      ambientLight: lights.ambientLight,
      camera,
    });

    renderer.setAnimationLoop(() =>
      animate({ renderer, scene, camera, controls })
    );

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};
