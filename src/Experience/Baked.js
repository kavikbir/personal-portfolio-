import { Mesh, MeshBasicMaterial, SRGBColorSpace, Box3, Vector3, Group, CanvasTexture, PlaneGeometry, DoubleSide } from "three";
import Experience from "./Experience.js";

export default class Baked {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.renderer = this.experience.renderer.instance;
    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();
    this.setModels();
  }

  setMaterial = (object, material) => {
    object.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });
  };

  configureTexture = (texture) => {
    texture.anisotropy = this.maxAnisotropy;
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  };

  setModels = () => {
    this.model = {};
    this.model.room1 = this.resources.items._roomModel.scene;

    this.bakedTexture1 = this.configureTexture(this.resources.items.baked1);
    this.model.material = new MeshBasicMaterial({
      map: this.bakedTexture1,
    });

    this.model.room2 = this.resources.items._roomModel2.scene;
    this.bakedTexture2 = this.configureTexture(this.resources.items.baked2);

    this.model.material2 = new MeshBasicMaterial({
      map: this.bakedTexture2,
    });

    this.model.room3 = this.resources.items._roomModel3.scene;
    this.bakedTexture3 = this.configureTexture(this.resources.items.baked3);

    this.model.material3 = new MeshBasicMaterial({
      map: this.bakedTexture3,
    });

    this.model.linkedin = this.resources.items.linkedin.scene;
    this.model.linkedin.name = "linkedin";
    this.model.github = this.resources.items.github.scene;
    this.model.github.name = "github";
    this.model.itchio = this.resources.items.itchio.scene;
    this.model.itchio.name = "itchio";

    this.setMaterial(this.model.room1, this.model.material);
    this.setMaterial(this.model.room2, this.model.material2);
    this.setMaterial(this.model.room3, this.model.material3);
    this.setMaterial(this.model.linkedin, this.model.material3);
    this.setMaterial(this.model.github, this.model.material3);
    this.setMaterial(this.model.itchio, this.model.material3);

    this.scene.add(this.model.room1);
    this.scene.add(this.model.room2);
    this.scene.add(this.model.room3);

    this.scene.add(this.model.linkedin);
    this.scene.add(this.model.github);
    
    this.model.itchio.visible = false;
    this.scene.add(this.model.itchio);

    // Create Instagram Logo Texture
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");
    
    const gradient = ctx.createLinearGradient(0, 512, 512, 0);
    gradient.addColorStop(0, "#f09433");
    gradient.addColorStop(0.25, "#e6683c");
    gradient.addColorStop(0.5, "#dc2743");
    gradient.addColorStop(0.75, "#cc2366");
    gradient.addColorStop(1, "#bc1888");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, 512, 512, 100);
    ctx.fill();
    
    ctx.strokeStyle = "white";
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.roundRect(100, 100, 312, 312, 80);
    ctx.stroke();
    
    ctx.lineWidth = 40;
    ctx.beginPath();
    ctx.arc(256, 256, 80, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(350, 160, 20, 0, Math.PI * 2);
    ctx.fill();
    
    const instaTexture = new CanvasTexture(canvas);
    instaTexture.colorSpace = SRGBColorSpace;
    const instaMaterial = new MeshBasicMaterial({ map: instaTexture, transparent: true, side: DoubleSide });
    
    const instaMesh = new Mesh(new PlaneGeometry(0.18, 0.18), instaMaterial);
    
    const box = new Box3().setFromObject(this.model.itchio);
    const center = new Vector3();
    box.getCenter(center);
    
    instaMesh.position.copy(center);
    instaMesh.position.y += 0.05;
    instaMesh.rotation.x = -Math.PI / 8;
    
    this.model.instagram = new Group();
    this.model.instagram.add(instaMesh);
    this.model.instagram.name = "instagram";
    this.scene.add(this.model.instagram);
  };
}
