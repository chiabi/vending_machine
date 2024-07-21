import {
  DoubleSide,
  Mesh,
  MeshPhysicalMaterial,
  MeshToonMaterial,
} from 'three';

export const applyMaterials = (mesh: Mesh): void => {
  if (!/Floor|Rock|Mine|Cactus|Camera|Glass/gi.test(mesh.name))
    console.log(mesh.name);
  switch (mesh.name) {
    case 'Floor':
      mesh.material = new MeshToonMaterial({
        color: 0xfcd783,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Rock1':
    case 'Rock2':
    case 'Rock3':
      mesh.material = new MeshToonMaterial({
        color: 0xa66d5e,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Mine':
      mesh.material = new MeshToonMaterial({
        color: 0xffb900,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Cactus1':
    case 'Cactus2':
    case 'Cactus3':
    case 'Cactus4':
      mesh.material = new MeshToonMaterial({
        color: 0x04d415,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'MiniCactus1':
    case 'MiniCactus2':
      mesh.material = new MeshToonMaterial({
        color: 0x96ff45,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CactusFlowers':
      mesh.material = new MeshToonMaterial({
        color: 0xfa5eaf,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'SecurityCameraBody':
    case 'CameraBodyBase':
    case 'CameraBody':
    case 'CameraBodyLink':
      mesh.material = new MeshToonMaterial({
        color: 0xff72af,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CameraBodyBaseScrew':
    case 'CameraStick':
      mesh.material = new MeshToonMaterial({
        color: 0xff9c11,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CameraLight':
      mesh.material = new MeshToonMaterial({
        color: 0xff0000,
      });
      break;
    case 'CameraLens':
      mesh.material = new MeshToonMaterial({
        color: 0x302525,
      });
      break;
    case 'Boolean_1':
    case 'VendingMachineBodyCover':
      mesh.material = new MeshToonMaterial({
        color: 0xff0000,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Glass':
      mesh.material = new MeshPhysicalMaterial({
        color: 0xc1eceb,
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        transparent: true,
        opacity: 0.5,
        envMapIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        side: DoubleSide,
      });
      break;
    case 'CanPushGlass':
    case 'CoinPushGlass':
      mesh.material = new MeshPhysicalMaterial({
        color: 0xc1eceb,
        metalness: 0,
        roughness: 0,
        transmission: 0.5,
        transparent: true,
        opacity: 0.5,
        envMapIntensity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        side: DoubleSide,
      });
      break;
    default:
      break;
  }
};
