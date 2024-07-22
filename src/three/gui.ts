import { GUI } from 'lil-gui';
import {
  Scene,
  DirectionalLight,
  PerspectiveCamera,
  // Color,
  AmbientLight,
} from 'three';

export function setupGUI({
  // scene,
  // directionalLight,
  // ambientLight,
  camera,
}: {
  scene: Scene;
  directionalLight: DirectionalLight;
  ambientLight: AmbientLight;
  camera: PerspectiveCamera;
}) {
  const gui = new GUI();

  // 카메라 컨트롤
  const cameraFolder = gui.addFolder('Camera');
  cameraFolder
    .add(camera.position, 'x', -1000, 1000)
    .onChange(() => camera.updateProjectionMatrix());
  cameraFolder
    .add(camera.position, 'y', -1000, 1000)
    .onChange(() => camera.updateProjectionMatrix());
  cameraFolder
    .add(camera.position, 'z', -1000, 1000)
    .onChange(() => camera.updateProjectionMatrix());
}
