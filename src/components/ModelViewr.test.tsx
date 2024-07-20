import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { ModelViewer } from './ModelViewer';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

vi.mock('three', () => {
  const actualThree = vi.importActual('three');
  return {
    ...actualThree,
    WebGLRenderer: vi.fn(() => ({
      setSize: vi.fn(),
      setAnimationLoop: vi.fn(),
      render: vi.fn(),
      domElement: document.createElement('canvas'),
    })),
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
    })),
  };
});

const mockLoad = vi.fn();
vi.mock('three/addons/loaders/GLTFLoader.js', () => ({
  GLTFLoader: vi.fn(() => ({
    load: mockLoad,
  })),
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
  });

  it('loads the 3D model', async () => {
    render(<ModelViewer />);

    expect(GLTFLoader).toHaveBeenCalled();
    expect(mockLoad).toHaveBeenCalledWith(
      '/models/vending_machine.glb',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function)
    );
  });
});
