import GUI from 'lil-gui';
import {
  Scene,
  DirectionalLight,
  PerspectiveCamera,
  Color,
  AmbientLight,
} from 'three';

export function setupGUI({
  scene,
  directional_light,
  ambient_light,
  camera,
}: {
  scene: Scene;
  directional_light: DirectionalLight;
  ambient_light: AmbientLight;
  camera: PerspectiveCamera;
}) {
  const gui = new GUI();

  // 배경색 컨트롤
  const bgColor = { color: 0xffdf0f };
  gui.addColor(bgColor, 'color').onChange((value: number) => {
    scene.background = new Color(value);
  });

  // 조명 컨트롤
  const lightFolder = gui.addFolder('Directional Light');
  lightFolder
    .add(directional_light.position, 'x', -1000, 1000)
    .onChange(() => directional_light.updateMatrixWorld());
  lightFolder
    .add(directional_light.position, 'y', -1000, 1000)
    .onChange(() => directional_light.updateMatrixWorld());
  lightFolder
    .add(directional_light.position, 'z', -1000, 1000)
    .onChange(() => directional_light.updateMatrixWorld());
  lightFolder.add(directional_light, 'intensity', 0, 2);

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
