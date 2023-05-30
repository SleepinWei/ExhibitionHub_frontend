<template>
    <canvas id="canvas">
    </canvas>

    <el-row style="color: white;" justify="center">
        <h1>Online Gallery</h1>
    </el-row>
</template>

<style scoped>
#canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
}
</style>

<script setup>
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'lil-gui'
import { onMounted } from "vue";

function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
  const halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
  const halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
  const distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
 
  // compute a unit vector that points in the direction the camera is now
  // from the center of the box
  const direction = (new THREE.Vector3()).subVectors(camera.position, boxCenter).normalize();
 
  // move the camera to a position distance units way from the center
  // in whatever direction the camera was from the center already
  camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
 
  // pick some near and far values for the frustum that
  // will contain the box.
  camera.near = boxSize / 100;
  camera.far = boxSize * 100;
 
  camera.updateProjectionMatrix();
 
  // point the camera to look at the center of the box
  camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
}

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // renderer.setSize(window.innerWidth, window.innerHeight);

    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 5, 0);
    controls.update();

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');

    const stat = new Stats()
    document.body.appendChild(stat.dom);

    const gui = new GUI();

    const lightOptions= {
        optionBoolean: true,
        optionString: 'hi',
        optionNumber: 1
    }

    {
        gui.addFolder("Light Options");
        gui.add(lightOptions, 'optionBoolean');
        gui.add(lightOptions, 'optionString');
        gui.add(lightOptions, "optionNumber");
    }

    const ModelOption = {
        function() {
            // 弹出选择框，选择模型
        }
    }

    {
        gui.addFolder("Model Selection");
        gui.add(ModelOption, 'function').name("Select Model");
    }


    {
        const skyColor = 0xB1E1FF;  // light blue
        const groundColor = 0xB97A20;  // brownish orange
        const intensity = 0.6;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        scene.add(light);
    }

    {
        const color = 0xFFFFFF;
        const intensity = 0.8;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
    }

    {
        const objLoader = new OBJLoader();
        objLoader.load('/src/assets/models/bunny.obj', (root) => {
            scene.add(root);

            const box = new THREE.Box3().setFromObject(root);
            const boxSize = box.getSize(new THREE.Vector3()).length();
            const boxCenter = box.getCenter(new THREE.Vector3());

            frameArea(boxSize * 1.2, boxSize, boxCenter, camera);

            controls.maxDistance = boxSize * 10;
            controls.target.copy(boxCenter);
            controls.update();
        });
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render() {

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);

        stat.update();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

onMounted(() => {
    main();
})
</script>