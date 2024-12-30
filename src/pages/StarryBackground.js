import React, { useEffect } from 'react';
import * as THREE from 'three';

import '../components/StarryBackground.css';

const StarryBackground = () => {
  useEffect(() => {
    let camera, scene, renderer, material;
    let mouseX = 0, mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    function init() {
      camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 5, 2000);
      camera.position.z = 500;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0000ff, 0.001);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const size = 2000;

      for (let i = 0; i < 20000; i++) {
        const x = (Math.random() * size - size / 2);
        const y = (Math.random() * size - size / 2);
        const z = (Math.random() * size - size / 2);
        vertices.push(x, y, z);
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

      material = new THREE.PointsMaterial({
        size: 3,
        color: 0xffffff,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('starry-bg').appendChild(renderer.domElement);

      document.body.style.touchAction = 'none';
      document.body.addEventListener('pointermove', onPointerMove);
      window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onPointerMove(event) {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;

      const distance = Math.sqrt(mouseX ** 2 + mouseY ** 2);
      material.size = THREE.MathUtils.clamp(10 - distance / 200, 1, 10);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      scene.rotation.x += 0.001;
      scene.rotation.y += 0.002;

      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.body.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return <div id="starry-bg"></div>;
};

export default StarryBackground;
