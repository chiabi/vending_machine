import { AmbientLight, DirectionalLight } from 'three';

export const createLights = () => {
  const directionalLight = new DirectionalLight(0xffffff, 2);
  directionalLight.position.set(140, 90, -8);
  directionalLight.intensity = 2;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 200;
  directionalLight.shadow.camera.left = -25;
  directionalLight.shadow.camera.right = 70;
  directionalLight.shadow.camera.top = 30;
  directionalLight.shadow.camera.bottom = -30;
  directionalLight.castShadow = true;

  const ambientLight = new AmbientLight(0xffffff, 1.5);
  return {
    directionalLight,
    ambientLight,
  };
};
