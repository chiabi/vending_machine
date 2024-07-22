import {
  AmbientLight,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Scene,
} from 'three';

export const createLights = (scene: Scene) => {
  const directional_light = new DirectionalLight(0xffffff, 2);
  directional_light.position.set(140, 90, -8);
  directional_light.intensity = 2;
  directional_light.shadow.camera.near = 0.5;
  directional_light.shadow.camera.far = 200;
  directional_light.shadow.camera.left = -25;
  directional_light.shadow.camera.right = 70;
  directional_light.shadow.camera.top = 30;
  directional_light.shadow.camera.bottom = -30;
  directional_light.castShadow = true;
  scene.add(directional_light);

  // const light_helper = new DirectionalLightHelper(directional_light, 5);
  // scene.add(light_helper);

  // const camera_helper = new CameraHelper(directional_light.shadow.camera);
  // scene.add(camera_helper);

  const ambient_light = new AmbientLight(0xffffff, 1.5);
  scene.add(ambient_light);

  return {
    directional_light,
    ambient_light,
  };
};
