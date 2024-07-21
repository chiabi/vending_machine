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
  const mount_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount_ref.current) {
      return;
    }

    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();
    const lights = createLights(scene);

    const controls = new OrbitControls(camera, renderer.domElement);

    mount_ref.current.appendChild(renderer.domElement);

    loadModel(scene, '/models/vending_machine.gltf');
    setupGUI({
      scene,
      directional_light: lights.directional_light,
      ambient_light: lights.ambient_light,
      camera,
    });

    renderer.setAnimationLoop(() =>
      animate({ renderer, scene, camera, controls })
    );

    return () => {
      mount_ref.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount_ref} />;
};
