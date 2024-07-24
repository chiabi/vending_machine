import { Group, LoadingManager, Mesh } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { applyMaterials } from './materials';
import cans from '../assets/cans.json';
import { createCanPriceTextMesh } from './meshes';

const createLoadingManager = (
  onProgress?: (progress: number) => void,
  onLoad?: () => void
): LoadingManager => {
  const manager = new LoadingManager();
  manager.onProgress = (_url, itemsLoaded, itemsTotal) => {
    onProgress?.((itemsLoaded / itemsTotal) * 100);
  };
  manager.onLoad = () => {
    onLoad?.();
  };
  manager.onError = (error) => {
    console.error('An error happened', error);
  };
  return manager;
};

export const loadGLTF = async (
  url: string,
  manager: LoadingManager
): Promise<Group> => {
  const loader = new GLTFLoader(manager);
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => resolve(gltf.scene),
      undefined,
      (error) => reject(error)
    );
  });
};

export const processModel = (model: Group) => {
  model.traverse((child) => {
    if (child instanceof Mesh) {
      applyMaterials(child);
    }
  });
};

export const addPriceTexts = async (model: Group) => {
  for (const { button, price } of Object.values(cans)) {
    const mesh = model.getObjectByName(button);
    if (!mesh) {
      break;
    }
    const textMesh = await createCanPriceTextMesh(price);
    mesh.add(textMesh);
  }
};

export const loadModel = async (
  url: string,
  onProgress?: (progress: number) => void,
  onLoad?: () => void
) => {
  const loadingManager = createLoadingManager(onProgress, onLoad);

  const model = await loadGLTF(url, loadingManager);
  processModel(model);
  addPriceTexts(model);
  return model;
};
