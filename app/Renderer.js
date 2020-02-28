"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BABYLON = require("babylonjs");

class Renderer {
    createScene(canvas, engine) {
        const scene = new BABYLON.Scene(engine);
        this.scene = scene;

        let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(150,740,200), scene);	
        camera.rotation = new BABYLON.Vector3(0.4,-2.5,0);

        scene.autoClear = false;

        this.setExplosionConfiguration(parseInt(JSON.parse(config)[0].id));
        document.getElementById("title").innerHTML = " " + JSON.parse(config)[0].title;
        document.getElementById("description").innerHTML = JSON.parse(config)[0].description;
    }
   

    initialize(canvas) {
        const engine = new BABYLON.Engine(canvas, true, null, false);
        this.createScene(canvas, engine);
        engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    setExplosionConfiguration(configuration){
        if(configuration == 1){
            this.renderExplosion(300, new BABYLON.Vector3(50,650,60));
            this.renderExplosion(700, new BABYLON.Vector3(10,650,60));
            this.renderExplosion(1200, new BABYLON.Vector3(70,650,60));
        }else if(configuration == 2){
            this.renderExplosion(300, new BABYLON.Vector3(50,650,60));
            this.renderExplosion(300, new BABYLON.Vector3(10,650,60));
            this.renderExplosion(300, new BABYLON.Vector3(70,650,60));
        }else if(configuration == 3){
            this.renderExplosion(300, new BABYLON.Vector3(50,650,60));
            this.renderExplosion(700, new BABYLON.Vector3(10,500,60));
            this.renderExplosion(1200, new BABYLON.Vector3(70,650,100));
            this.renderExplosion(300, new BABYLON.Vector3(20,700,100));
            this.renderExplosion(700, new BABYLON.Vector3(40,550,30));
            this.renderExplosion(1200, new BABYLON.Vector3(70,650,100));
            this.renderExplosion(300, new BABYLON.Vector3(50,650,-60));
            this.renderExplosion(700, new BABYLON.Vector3(10,500,-60));
            this.renderExplosion(1200, new BABYLON.Vector3(70,650,-100));
            this.renderExplosion(300, new BABYLON.Vector3(-20,700,100));
            this.renderExplosion(700, new BABYLON.Vector3(-40,550,30));
            this.renderExplosion(1200, new BABYLON.Vector3(-70,650,100));
        }else{
            let interval = setInterval(()=>{
                this.explosion(new BABYLON.Vector3(50,650,60));
            },5);
            setTimeout(() => {
                clearInterval(interval);
            },235);
        }
    }

    renderExplosion(delay,impact){
        setTimeout(() => {
            this.explosion(impact);
        }, delay);
    }

    explosion(impact){

        // Based on PatrickRyanMS's code

        // Create default particle systems
        let fireBlast = BABYLON.ParticleHelper.CreateDefault(impact, 50);

        // Emitter
        let fireBlastHemisphere = fireBlast.createHemisphericEmitter(.2, 0);

        // Set emission rate
        fireBlast.emitRate = 175000/10;

        // Start size
        fireBlast.minSize = 105/3.5;
        fireBlast.maxSize = 210/3.5;

        // Lifetime
        fireBlast.minLifeTime = 1;
        fireBlast.maxLifeTime = 3;

        // Emission power
        fireBlast.minEmitPower = 525/3.5;
        fireBlast.maxEmitPower = 1050/3.5;

        // Limit velocity over time
        fireBlast.addLimitVelocityGradient(0, 40);
        fireBlast.addLimitVelocityGradient(0.120, 12.983);
        fireBlast.addLimitVelocityGradient(0.445, 1.780);
        fireBlast.addLimitVelocityGradient(0.691, 0.502);
        fireBlast.addLimitVelocityGradient(0.930, 0.05);
        fireBlast.addLimitVelocityGradient(1.0, 0);
        fireBlast.limitVelocityDamping = 0.9;

        // Start rotation
        fireBlast.minInitialRotation = -Math.PI / 2;
        fireBlast.maxInitialRotation = Math.PI / 2;

        // Texture
        fireBlast.particleTexture = new BABYLON.Texture("./textures/ExplosionSim_Sample.png", this._scene);
        fireBlast.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLYADD; 

        // Color over life
        fireBlast.addColorGradient(0.0, new BABYLON.Color4(1, 1, 1, 0));
        fireBlast.addColorGradient(0.1, new BABYLON.Color4(1, 1, 1, 1));
        fireBlast.addColorGradient(0.9, new BABYLON.Color4(1, 1, 1, 1));
        fireBlast.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 0));

        // // Defines the color ramp to apply
        fireBlast.addRampGradient(0.0, new BABYLON.Color3(1, 1, 1));
        fireBlast.addRampGradient(0.09, new BABYLON.Color3(209/255, 204/255, 15/255));
        fireBlast.addRampGradient(0.18, new BABYLON.Color3(221/255, 120/255, 14/255));
        fireBlast.addRampGradient(0.28, new BABYLON.Color3(200/255, 43/255, 18/255));
        fireBlast.addRampGradient(0.47, new BABYLON.Color3(115/255, 22/255, 15/255));
        fireBlast.addRampGradient(0.88, new BABYLON.Color3(14/255, 14/255, 14/255));
        fireBlast.addRampGradient(1.0, new BABYLON.Color3(14/255, 14/255, 14/255));
        fireBlast.useRampGradients = true;

        // Defines the color remapper over time
        fireBlast.addColorRemapGradient(0, 0, 0.1);
        fireBlast.addColorRemapGradient(0.2, 0.1, 0.8);
        fireBlast.addColorRemapGradient(0.3, 0.2, 0.85);
        fireBlast.addColorRemapGradient(0.35, 0.4, 0.85);
        fireBlast.addColorRemapGradient(0.4, 0.5, 0.9);
        fireBlast.addColorRemapGradient(0.5, 0.95, 1.0);
        fireBlast.addColorRemapGradient(1.0, 0.95, 1.0);

        // Particle system start
        fireBlast.start(30);
        fireBlast.targetStopDuration = .4;

        fireBlast.updateSpeed = 0.0165;

        // Rendering order
        fireBlast.renderingGroupId = 1;
    }

}

exports.default = Renderer;
const renderer = new Renderer();
renderer.initialize(document.getElementById('render-canvas'));