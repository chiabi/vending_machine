import { PerspectiveCamera } from 'three';

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(0, 17, 34);
  camera.rotation.set(-26, 0, 0);
  camera.scale.set(1, 1, 1);
  camera.lookAt(0, 0, 0);
  return camera;
};
