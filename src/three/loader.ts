import { Scene } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const loadModel = (scene: Scene, url: string): void => {
  const loader = new GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 0, 0);
    },
    (progress) => {
      console.log((progress.loaded / progress.total) * 100 + '% loaded');
    },
    (error) => {
      console.error('An error happened', error);
    }
  );
};
