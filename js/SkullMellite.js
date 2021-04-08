
export default class BlocMellite {
    constructor(coordx, coordy, coordz) {
        this.posx = coordx;
        this.posy = coordy;
        this.posz = coordz;
        this.body = [];
        this.range = 100;
        this.damage = 30;
        this.maxCooldown = 100;
        this.cooldown = this.maxCooldown;
    }

    getPositionX() { return this.posx; }
    getPositionY() { return this.posy; }
    getPositionZ() { return this.posz; }

    setPositionY(y) {
        this.posy = y;
    }

    create (scene) {
        this.body = BABYLON.SceneLoader.ImportMesh("", "scenes/", "skull.babylon", scene, (meshes, particles, skeletons) => {
            let skull = meshes[0];
            skull.position.set(this.posx, 50 + this.posy, this.posz);
        });

    }
}