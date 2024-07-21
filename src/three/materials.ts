import {
  DoubleSide,
  Mesh,
  MeshPhysicalMaterial,
  MeshToonMaterial,
} from 'three';

export const applyMaterials = (mesh: Mesh): void => {
  if (/Can/gi.test(mesh.name)) console.log(mesh.name);
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
        clearcoat: 1,
        clearcoatRoughness: 0,
        reflectivity: 1,
        side: DoubleSide,
      });
      break;
    case 'CoinEnterTorus':
      mesh.material = new MeshToonMaterial({
        color: 0x004119,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'Boolean':
      mesh.material = new MeshToonMaterial({
        color: 0x16291d,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CoinEnterOutlineEllipse':
      mesh.material = new MeshToonMaterial({
        color: 0x18100f,
      });
      break;
    case mesh.name.match(/Bar/)?.input:
      mesh.material = new MeshToonMaterial({
        color: 0xc20000,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'PriceDisplay':
    case mesh.name.match(/ButtonBody/)?.input:
      mesh.material = new MeshToonMaterial({
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
      mesh.material = new MeshToonMaterial({
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
    case 'CanBody':
      mesh.material = new MeshToonMaterial({
        color: 0xff8a8a,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CanBody_1':
      mesh.material = new MeshToonMaterial({
        color: 0x00d5ff,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CanBody_2':
      mesh.material = new MeshToonMaterial({
        color: 0x0bb148,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CanBody_3':
      mesh.material = new MeshToonMaterial({
        color: 0xdd0edb,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CanBody_4':
      mesh.material = new MeshToonMaterial({
        color: 0x49c409,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CanBody_5':
      mesh.material = new MeshToonMaterial({
        color: 0x500f50,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CanBody_6':
      mesh.material = new MeshToonMaterial({
        color: 0x172cdd,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    case 'CanBody_7':
      mesh.material = new MeshToonMaterial({
        color: 0xee9b13,
      });
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      break;
    default:
      break;
  }
};
