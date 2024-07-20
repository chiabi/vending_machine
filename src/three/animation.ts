import { WebGLRenderer, Scene, Camera } from 'three';

export const animate = (
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera
): void => {
  renderer.render(scene, camera);
};
