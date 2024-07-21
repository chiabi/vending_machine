import { WebGLRenderer, Scene, Camera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const animate = ({
  renderer,
  scene,
  camera,
  controls,
}: {
  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  controls: OrbitControls;
}): void => {
  controls.update();
  renderer.render(scene, camera);
};
