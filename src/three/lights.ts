import { DirectionalLight, Scene } from 'three';

export const setupLights = (scene: Scene): void => {
  const direction_light = new DirectionalLight(0xffffff, 0.5);
  direction_light.position.set(5, 5, 5);
  scene.add(direction_light);
};
