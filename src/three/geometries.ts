import { Mesh, MeshBasicMaterial, Object3D, Object3DEventMap } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export const createCanPriceGeometry = (
  targetMesh: Object3D<Object3DEventMap>,
  price: number
) => {
  const fontLoader = new FontLoader();
  fontLoader.load('/fonts/Jaro_Regular.json', (font) => {
    const textGeometry = new TextGeometry(price.toLocaleString(), {
      font: font,
      size: 100,
      depth: 1,
    });

    const textMaterial = new MeshBasicMaterial({ color: 0x787878 });
    const textMesh = new Mesh(textGeometry, textMaterial);

    textGeometry.computeBoundingBox();
    const textWidth =
      (textGeometry.boundingBox?.max.x ?? 0) -
      (textGeometry.boundingBox?.min.x ?? 0);

    textMesh.position.copy(targetMesh.position);

    textMesh.position.x = -40;
    textMesh.position.y += textWidth - 300;
    textMesh.position.z = 23;
    textMesh.rotation.z = 130.38;

    targetMesh.add(textMesh);
  });
};
