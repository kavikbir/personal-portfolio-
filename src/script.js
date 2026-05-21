import "./style.css";
import Experience from "./Experience/Experience.js";

window.experience = new Experience({
  webglElement: document.querySelector("#webgl"),
  cssArcadeMachine: document.querySelector("#cssArcadeMachine"),
  cssLeftMonitor: document.querySelector("#cssLeftMonitor"),
  cssRightMonitor: document.querySelector("#cssRightMonitor"),
});
