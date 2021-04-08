import SkullMellite from "/js/SkullMellite.js";

export default class MelliteWorld {

    constructor () {
        this.canvas = document.querySelector("#myCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = this.createScene ();

        this.engine.runRenderLoop(() => {
            let deltaTime = this.engine.getDeltaTime();
            this.scene.render();
        });

        
    }

    createScene () {
        let scene = new BABYLON.Scene(this.engine);
        let ground = this.createGround(scene);
        let freeCamera = this.createFreeCamera(scene);
        let light = this.createLights(scene);

        for (let i=1; i<6; i++) {
            new SkullMellite (i * 200, 0, i * 200).create(scene);
        }

        return scene;
    }

    createGround (scene) {
        let ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", 'images/hmap1.png', 
            { width:5000, height:5000, subdivisions:20, minHeight:0, maxHeight:100, onReady: () => {
                const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
                groundMaterial.diffuseTexture = new BABYLON.Texture("images/desert.jpg");
                ground.material = groundMaterial;
                ground.checkCollisions = true;
            }}, scene);
        return ground;
    }

    createLights (scene) {
        return new BABYLON.DirectionalLight("dir0", new BABYLON.Vector3(-1, -1, 0), scene);
    }
    
    createFreeCamera (scene) {
        let camera = new BABYLON.FreeCamera("freeCamera", new BABYLON.Vector3(0, 50, 0), scene);
        camera.attachControl(this.canvas);
        // prevent camera to cross ground
        camera.checkCollisions = true; 
        // avoid flying with the camera
        camera.applyGravity = true;
    
        // Add extra keys for camera movements
        // Need the ascii code of the extra key(s). We use a string method here to get the ascii code
        camera.keysUp.push('z'.charCodeAt(0));
        camera.keysDown.push('s'.charCodeAt(0));
        camera.keysLeft.push('q'.charCodeAt(0));
        camera.keysRight.push('d'.charCodeAt(0));
        camera.keysUp.push('Z'.charCodeAt(0));
        camera.keysDown.push('S'.charCodeAt(0));
        camera.keysLeft.push('Q'.charCodeAt(0));
        camera.keysRight.push('D'.charCodeAt(0));
    
        return camera;
    }

}