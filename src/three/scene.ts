import { Scene, Color } from 'three';

export const createScene = () => {
  const scene = new Scene();
  scene.background = new Color(0xffdf0f);
  return scene;
};
