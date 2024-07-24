import { Mesh, MeshBasicMaterial } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { loadFont } from './fontLoader';

interface TextOptions {
  size: number;
  depth: number;
  color: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    z: number;
  };
}

export const createTextMesh = async (
  text: string,
  options: TextOptions
): Promise<Mesh> => {
  const font = await loadFont('/fonts/Jaro_Regular.json');

  const geometry = new TextGeometry(text, {
    font: font,
    size: options.size,
    height: options.depth,
  });

  const material = new MeshBasicMaterial({ color: options.color });
  const mesh = new Mesh(geometry, material);

  mesh.position.set(options.position.x, options.position.y, options.position.z);
  mesh.rotation.z = options.rotation.z;

  return mesh;
};

const DEFAULT_CAN_PRICE_TEXT_MESH_SETTING: TextOptions = {
  size: 100,
  depth: 1,
  color: 0x787878,
  position: { x: -40, y: -200, z: 23 },
  rotation: { z: 130.38 },
};

export const createCanPriceTextMesh = async (
  price: number,
  customSettings?: Partial<TextOptions>
) => {
  const settings = {
    ...DEFAULT_CAN_PRICE_TEXT_MESH_SETTING,
    ...customSettings,
  };

  const textMesh = await createTextMesh(price.toString(), settings);
  textMesh.geometry.computeBoundingBox();

  const textWidth =
    (textMesh.geometry.boundingBox?.max.x ?? 0) -
    (textMesh.geometry.boundingBox?.min.x ?? 0);
  textMesh.position.y += textWidth;

  return textMesh;
};
