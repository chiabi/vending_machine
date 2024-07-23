import React, { useEffect, useRef } from 'react';
import {
  animate,
  createCamera,
  createLights,
  createRenderer,
  createScene,
  loadModel,
} from '../three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ModelViewerProps {
  onProgress?: (progress: number) => void;
  onLoadComplete?: () => void;
}

export const ModelViewer: React.FC<ModelViewerProps> = ({
  onProgress,
  onLoadComplete,
}) => {
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

    loadModel(
      scene,
      '/models/vending_machine.gltf',
      onProgress,
      onLoadComplete
    );

    if (import.meta.env.DEV) {
      import('../three/gui').then(({ setupGUI }) => {
        setupGUI({
          scene,
          directionalLight: lights.directionalLight,
          ambientLight: lights.ambientLight,
          camera,
        });
      });
    }

    renderer.setAnimationLoop(() =>
      animate({ renderer, scene, camera, controls })
    );

    return () => {
      renderer.setAnimationLoop(null);
      controls.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};
