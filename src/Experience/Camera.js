import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";
import { CAMERA_POSITION } from "./constants.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.config = this.experience.config;
    this.scene = this.experience.scene;
    this.setInstance();
  }

  setInstance = () => {
    // Set up
    this.instance = new PerspectiveCamera(
      20,
      this.config.width / this.config.height,
      0.1,
      1000
    );
    this.instance.rotation.reorder("YXZ");
    this.instance.position.copy(CAMERA_POSITION);

    // Responsive FOV for mobile/portrait viewports
    const aspect = this.config.width / this.config.height;
    const baseFov = 20;
    const aspectTarget = 1.6;
    if (aspect < aspectTarget) {
      const baseFovRad = (baseFov * Math.PI) / 180;
      const hFovTan = Math.tan(baseFovRad / 2) * aspectTarget;
      const newFovRad = 2 * Math.atan(hFovTan / aspect);
      this.instance.fov = (newFovRad * 180) / Math.PI;
    } else {
      this.instance.fov = baseFov;
    }

    this.scene.add(this.instance);
  };

  resize = () => {
    const aspect = this.config.width / this.config.height;
    this.instance.aspect = aspect;

    const baseFov = 20;
    const aspectTarget = 1.6;
    if (aspect < aspectTarget) {
      const baseFovRad = (baseFov * Math.PI) / 180;
      const hFovTan = Math.tan(baseFovRad / 2) * aspectTarget;
      const newFovRad = 2 * Math.atan(hFovTan / aspect);
      this.instance.fov = (newFovRad * 180) / Math.PI;
    } else {
      this.instance.fov = baseFov;
    }

    this.instance.updateProjectionMatrix();
  };

  update = () => {
    this.instance.updateProjectionMatrix();
  };
}
