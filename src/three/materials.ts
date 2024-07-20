import { Mesh, MeshStandardMaterial } from 'three';

export const applyMaterials = (mesh: Mesh): void => {
  if (mesh.name.includes('Body')) console.log(mesh.name);
  switch (mesh.name) {
    case 'Floor':
      mesh.material = new MeshStandardMaterial({
        color: 0xffdf0f,
        roughness: 0.5,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Rock1':
    case 'Rock2':
    case 'Rock3':
      mesh.material = new MeshStandardMaterial({
        color: 0xa66d5e,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Cactus1':
    case 'Cactus2':
    case 'Cactus3':
    case 'Cactus4':
      mesh.material = new MeshStandardMaterial({
        color: 0x04d415,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'MiniCactus1':
    case 'MiniCactus2':
      mesh.material = new MeshStandardMaterial({
        color: 0x96ff45,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    default:
      break;
  }
};
