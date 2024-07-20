import React, { useEffect, useRef } from 'react';

import {
  animate,
  createCamera,
  createRenderer,
  createScene,
  loadModel,
  setupLights,
} from '../three';

export const ModelViewer: React.FC = () => {
  const mount_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount_ref.current) {
      return;
    }

    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer();

    mount_ref.current.appendChild(renderer.domElement);

    setupLights(scene);
    loadModel(scene, '/models/vending_machine.glb');

    renderer.setAnimationLoop(() => animate(renderer, scene, camera));
    return () => {
      mount_ref.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount_ref} />;
};
