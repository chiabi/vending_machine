import { Mesh, Scene } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { applyMaterials } from './materials';

export const loadModel = (
  scene: Scene,
  url: string,
  onProgress?: (progress: number) => void,
  onLoad?: () => void
): void => {
  const loader = new GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      gltf.scene.traverse((child) => {
        if (child instanceof Mesh) {
          applyMaterials(child);
        }
      });
      scene.add(gltf.scene);
      onLoad?.();
    },
    (progress) => {
      onProgress?.((progress.loaded / progress.total) * 100);
    },
    (error) => {
      console.error('An error happened', error);
    }
  );
};
