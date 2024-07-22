import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ModelViewer } from './ModelViewer';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

vi.mock('three', () => {
  const actual_three = vi.importActual('three');
  return {
    ...actual_three,
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
    update: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
}));

vi.mock('lil-gui', () => {
  const actual_lil_gui = vi.importActual('lil-gui');

  const mockAdd = vi.fn().mockReturnValue({
    onChange: vi.fn(),
  });

  const mockFolder = {
    add: mockAdd,
  };

  return {
    ...actual_lil_gui,
    GUI: vi.fn(() => ({
      addFolder: vi.fn().mockReturnValue(mockFolder),
    })),
  };
});

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
      expect.any(Function),
      expect.any(Function)
    );
  });
});
