import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export const ModelViewer: React.FC = () => {
  const mount_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount_ref.current) {
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcccccc);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );
    camera.position.set(0, 17, 34);
    camera.rotation.set(-26, 0, 0);
    camera.scale.set(1, 1, 1);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);

    mount_ref.current.appendChild(renderer.domElement);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      '/models/vending_machine.glb',
      (gltf) => {
        scene.add(gltf.scene);
        gltf.scene.position.set(0, 0, 0);
      },
      (progress) => {
        console.log((progress.loaded / progress.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('An error happened', error);
      }
    );

    function animate() {
      renderer.render(scene, camera);
    }
    return () => {
      mount_ref.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount_ref} />;
};
