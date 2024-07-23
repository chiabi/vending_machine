import {
  DoubleSide,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
} from 'three';
import cans from '../assets/cans.json';

export const applyMaterials = (mesh: Mesh): void => {
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
      mesh.material = new MeshStandardMaterial({
        color: 0xa66d5e,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Mine':
      mesh.material = new MeshStandardMaterial({
        color: 0xffb900,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Cactus1':
    case 'Cactus2':
    case 'Cactus3':
    case 'Cactus4':
      mesh.material = new MeshStandardMaterial({
        color: 0x33d83c,
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
    case 'CactusFlowers':
      mesh.material = new MeshStandardMaterial({
        color: 0xfaf2a8,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'SecurityCameraBody':
    case 'CameraBodyBase':
    case 'CameraBody':
    case 'CameraBodyLink':
      mesh.material = new MeshStandardMaterial({
        color: 0xff72af,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CameraBodyBaseScrew':
    case 'CameraStick':
      mesh.material = new MeshStandardMaterial({
        color: 0xff9c11,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CameraLight':
      mesh.material = new MeshStandardMaterial({
        color: 0xff0000,
      });
      break;
    case 'CameraLens':
      mesh.material = new MeshStandardMaterial({
        color: 0x302525,
      });
      break;
    case 'Boolean_1':
    case 'VendingMachineBodyCover':
      mesh.material = new MeshStandardMaterial({
        color: 0xff0000,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Glass':
      mesh.material = new MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0,
        transmission: 0.9,
        transparent: true,
        opacity: 0.4,
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
        transmission: 0.9,
        transparent: true,
        opacity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.4,
        reflectivity: 1,
        side: DoubleSide,
      });
      break;
    case 'CoinEnterTorus':
      mesh.material = new MeshStandardMaterial({
        color: 0x004119,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Boolean':
      mesh.material = new MeshStandardMaterial({
        color: 0x16291d,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CoinEnterOutlineEllipse':
      mesh.material = new MeshStandardMaterial({
        color: 0x18100f,
      });
      break;
    case mesh.name.match(/Bar/)?.input:
      mesh.material = new MeshStandardMaterial({
        color: 0xc20000,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'PriceDisplay':
    case mesh.name.match(/ButtonBody/)?.input:
      mesh.material = new MeshStandardMaterial({
        color: 0x18100f,
      });
      break;
    case mesh.name.match(/ButtonOulineLight/)?.input:
      mesh.material = new MeshPhysicalMaterial({
        color: 0x00d600,
        metalness: 0,
        roughness: 0,
        transmission: 0.5,
        transparent: true,
        opacity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        side: DoubleSide,
      });
      break;
    case mesh.name.match(/ButtonSoldoutLight/)?.input:
      mesh.material = new MeshPhysicalMaterial({
        color: 0xaf6600,
        metalness: 0,
        roughness: 0,
        transmission: 0.5,
        transparent: true,
        opacity: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        side: DoubleSide,
      });
      break;
    case mesh.name.match(/CoinButton/)?.input:
      mesh.material = new MeshStandardMaterial({
        color: 0x7c7c7c,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case mesh.name.match(
      /CanUppiece|CanBase|CanUpcontorn|CanRingball|CanRingpar/
    )?.input:
      mesh.material = new MeshPhysicalMaterial({
        color: 0x888888,
        metalness: 1,
        roughness: 0.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      });
      break;
    case mesh.name.match(/CanBody/)?.input:
      mesh.material = new MeshStandardMaterial({
        color: cans[mesh.name as keyof typeof cans]?.color ?? 0x888888,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    default:
      break;
  }
};
