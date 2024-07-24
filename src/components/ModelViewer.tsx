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
import {
  CameraHelper,
  DirectionalLightHelper,
  PerspectiveCamera,
  Scene,
} from 'three';

const addDebugHelpers = (
  scene: Scene,
  lights: ReturnType<typeof createLights>,
  camera: PerspectiveCamera
) => {
  import('../three/gui').then(({ setupGUI }) => {
    setupGUI({
      scene,
      directionalLight: lights.directionalLight,
      ambientLight: lights.ambientLight,
      camera,
    });
  });
  const lightHelper = new DirectionalLightHelper(lights.directionalLight, 5);
  scene.add(lightHelper);

  const cameraHelper = new CameraHelper(lights.directionalLight.shadow.camera);
  scene.add(cameraHelper);
};

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
    const lights = createLights();
    const controls = new OrbitControls(camera, renderer.domElement);

    scene.add(lights.directionalLight);
    scene.add(lights.ambientLight);

    loadModel('/models/vending_machine.gltf', onProgress, onLoadComplete).then(
      (model) => scene.add(model)
    );
    mountRef.current?.appendChild(renderer.domElement);
    renderer.setAnimationLoop(() =>
      animate({ renderer, scene, camera, controls })
    );

    if (import.meta.env.DEV) {
      addDebugHelpers(scene, lights, camera);
    }

    return () => {
      renderer.setAnimationLoop(null);
      controls.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};
