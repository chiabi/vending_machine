import { LoadingManager, Mesh, Scene } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { applyMaterials } from './materials';

export const loadModel = (
  scene: Scene,
  url: string,
  onProgress?: (progress: number) => void,
  onLoad?: () => void
): void => {
  const manager = new LoadingManager();
  manager.onProgress = (_url, itemsLoaded, itemsTotal) => {
    onProgress?.((itemsLoaded / itemsTotal) * 100);
  };
  manager.onLoad = () => {
    onLoad?.();
  };
  manager.onError = (error) => {
    console.error('An error happened', error);
  };

  const loader = new GLTFLoader(manager);
  loader.load(url, (gltf) => {
    gltf.scene.traverse((child) => {
      if (child instanceof Mesh) {
        applyMaterials(child);
      }
    });
    scene.add(gltf.scene);
    onLoad?.();
  });
};
