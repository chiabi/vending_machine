import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ModelViewer } from './ModelViewer';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

vi.mock('three', () => {
  const actualThree = vi.importActual('three');
  return {
    ...actualThree,
    WebGLRenderer: vi.fn(() => ({
      setSize: vi.fn(),
      setAnimationLoop: vi.fn(),
      render: vi.fn(),
      domElement: document.createElement('canvas'),
      shadowMap: {
        enabled: true,
        type: null,
      },
    })),
    PCFSoftShadowMap: vi.fn(),
    PerspectiveCamera: vi.fn(() => ({
      position: { set: vi.fn() },
      rotation: { set: vi.fn() },
      scale: { set: vi.fn() },
      lookAt: vi.fn(),
    })),
    Scene: vi.fn(() => ({
      add: vi.fn(),
      background: null,
    })),
    Color: vi.fn(),
    DirectionalLight: vi.fn(() => ({
      position: { set: vi.fn() },
      intensity: null,
      shadow: {
        camera: {
          near: null,
          far: null,
          left: null,
          right: null,
          top: null,
          bottom: null,
        },
      },
    })),
    AmbientLight: vi.fn(),
    LoadingManager: vi.fn(() => ({
      onProgress: vi.fn(),
      onLoad: vi.fn(),
      onError: vi.fn(),
    })),
    DirectionalLightHelper: vi.fn(),
    CameraHelper: vi.fn(),
  };
});

const mockLoad = vi.fn();
vi.mock('three/addons/loaders/GLTFLoader.js', () => ({
  GLTFLoader: vi.fn(() => ({
    load: mockLoad,
  })),
}));

vi.mock('three/examples/jsm/controls/OrbitControls', () => ({
  OrbitControls: vi.fn(() => ({
    dispose: vi.fn(),
    update: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
}));

vi.mock('lil-gui', () => {
  const actualLilGui = vi.importActual('lil-gui');

  const mockAdd = vi.fn().mockReturnValue({
    onChange: vi.fn(),
  });

  const mockFolder = {
    add: mockAdd,
  };

  return {
    ...actualLilGui,
    GUI: vi.fn(() => ({
      addFolder: vi.fn().mockReturnValue(mockFolder),
    })),
  };
});

vi.mock('../three/gui', () => ({
  setupGUI: vi.fn(),
}));

describe('ModelViewer', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<ModelViewer />);
    expect(container).toBeTruthy();
  });

  it('initializes Three.js scene', () => {
    render(<ModelViewer />);
    expect(THREE.Scene).toHaveBeenCalled();
    expect(THREE.PerspectiveCamera).toHaveBeenCalled();
    expect(THREE.WebGLRenderer).toHaveBeenCalled();
    expect(THREE.Color).toHaveBeenCalled();
    expect(THREE.DirectionalLight).toHaveBeenCalled();
    expect(THREE.AmbientLight).toHaveBeenCalled();
  });

  it('loads the 3D model', async () => {
    render(<ModelViewer />);
    expect(GLTFLoader).toHaveBeenCalled();
    expect(mockLoad).toHaveBeenCalledWith(
      '/models/vending_machine.gltf',
      expect.any(Function),
      undefined,
      expect.any(Function)
    );
  });

  it('initializes OrbitControls', () => {
    render(<ModelViewer />);
    expect(OrbitControls).toHaveBeenCalled();
  });

  it('calls setupGUI and Helpers in DEV environment', async () => {
    const originalEnv = import.meta.env.DEV;
    import.meta.env.DEV = true;

    await render(<ModelViewer />);
    const { setupGUI } = await import('../three/gui');
    expect(setupGUI).toHaveBeenCalled();
    expect(THREE.DirectionalLightHelper).toHaveBeenCalled();
    expect(THREE.CameraHelper).toHaveBeenCalled();

    import.meta.env.DEV = originalEnv;
  });

  it('does not call setupGUI and Helpers in non-DEV environment', async () => {
    const originalEnv = import.meta.env.DEV;
    import.meta.env.DEV = false;

    await render(<ModelViewer />);
    const { setupGUI } = await import('../three/gui');
    expect(setupGUI).not.toHaveBeenCalled();
    expect(THREE.DirectionalLightHelper).not.toHaveBeenCalled();
    expect(THREE.CameraHelper).not.toHaveBeenCalled();

    import.meta.env.DEV = originalEnv;
  });

  it('cleans up resources on unmount', () => {
    const { unmount } = render(<ModelViewer />);
    unmount();
    expect(
      vi.mocked(THREE.WebGLRenderer).mock.results[0].value.setAnimationLoop
    ).toHaveBeenCalledWith(null);
    expect(
      vi.mocked(OrbitControls).mock.results[0].value.dispose
    ).toHaveBeenCalled();
  });
});
