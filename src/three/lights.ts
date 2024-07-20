import {
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  Scene,
} from 'three';

export const createLights = (scene: Scene) => {
  const directional_light = new DirectionalLight(0xffffff, 2);
  directional_light.position.set(360, 140, 90);
  directional_light.castShadow = true;
  scene.add(directional_light);

  const helper = new DirectionalLightHelper(directional_light, 5);
  scene.add(helper);

  const ambient_light = new AmbientLight(0xffffff, 1.5);
  scene.add(ambient_light);

  return {
    directional_light,
    ambient_light,
  };
};
