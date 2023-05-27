<template>
    <canvas id="canvas">
    </canvas>

    <el-row style="color: white;" justify="center">
        <h1>Online Gallery</h1>
    </el-row>

    <el-drawer v-model="visible" title="Select Model" direction="ltr">
        <el-row>
            <p>选择你想要的查看的模型</p>
        </el-row>
        <el-card v-for="model in availModels" :body-style=" {padding : '0px'}"
            style="margin-bottom: 20px;"
            @click="selectCallBack(model.url)">
            <img :src="model.thumbnail" class="image" style="width: 100%;display: block;"/>
            <el-row style="padding: 14px;">
                <span>{{model.name}}</span>
            </el-row>
        </el-card>
    </el-drawer>
</template>

<style scoped>
#canvas {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -2;
}

</style>

<script setup>
import * as THREE from "three";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI, { Controller } from 'lil-gui'
import { onMounted, watch } from "vue";
import { ref } from "vue";

// page related variables
const visible = ref(false);
const availModels = ref([
    {
        id: 0,
        url: "/src/assets/models/dragon.obj",
        thumbnail: "/src/assets/models/dragon.jpg",
        name:"dragon"
    },
    {
        id : 1, 
        url: "/src/assets/models/bunny.obj",
        thumbnail: "/src/assets/models/bunny.jpg",
        name:"bunny"
    },
    {
        id:2,
        url: "/src/assets/models/Venus_de_Milo_SMK_KAS434_1_10pct.obj",
        thumbnail: "/src/assets/models/Venus.jpg",
        name:"Venus"
    }]);

const modelChange = ref(false);

const selectedModel = ref("");

const selectCallBack = (url) => {
    modelChange.value = true;
    selectedModel.value = url;
};

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

let lastObj = null;

function loadObj(url,scene,controls,camera){
        const objLoader = new OBJLoader();
        objLoader.load(url, (root) => {
            lastObj = root;
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

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    renderer.set
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
    stat.dom.style.setProperty("z-index",-1);
    document.body.appendChild(stat.dom);

    const gui = new GUI();


    const lightOptions= {
        optionBoolean: true,
        optionString: 'hi',
        optionNumber: 1
    }

    {
        const folder = gui.addFolder("Light Options");
        folder.add(lightOptions, 'optionBoolean');
        folder.add(lightOptions, 'optionString');
        folder.add(lightOptions, "optionNumber");
    }

    const ModelOption = {
        function() {
            // 弹出选择框，选择模型
            visible.value= true;
        }
    }

    {
        const folder = gui.addFolder("Model Selection");
        folder.add(ModelOption, 'function').name("Select Model");
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

    // {
    //     const objLoader = new OBJLoader();
    //     objLoader.load('/src/assets/models/bunny.obj', (root) => {
    //         scene.add(root);

    //         const box = new THREE.Box3().setFromObject(root);
    //         const boxSize = box.getSize(new THREE.Vector3()).length();
    //         const boxCenter = box.getCenter(new THREE.Vector3());

    //         frameArea(boxSize * 1.2, boxSize, boxCenter, camera);

    //         controls.maxDistance = boxSize * 10;
    //         controls.target.copy(boxCenter);
    //         controls.update();
    //     });
    // }
    loadObj(availModels.value[0].url, scene, controls,camera);

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

    watch(modelChange, (changeVal) => {
        if (changeVal == true) {
            modelChange.value = false;
            scene.remove(lastObj);
            loadObj(selectedModel.value, scene, controls,camera);
        }
    })

    requestAnimationFrame(render);
}

onMounted(() => {
    main();
})
</script>