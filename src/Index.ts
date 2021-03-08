import { drawConnectors } from '@mediapipe/drawing_utils/drawing_utils';
import { Camera } from '@mediapipe/camera_utils/camera_utils';
import { FaceMesh, FACEMESH_TESSELATION } from '@mediapipe/face_mesh/face_mesh';
import { ControlPanel, StaticText, Toggle, Slider, FPS } from '@mediapipe/control_utils/control_utils';

const fpsControl = new FPS();

const ctrl = new ControlPanel(window.document.body, {
  selfieMode: true,
  maxNumFaces: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
});

ctrl.add([
  new StaticText({ title: 'MediaPipe Face Mesh' }),
  fpsControl,
  new Toggle({ title: 'Selfie Mode', field: 'selfieMode' }),
  new Slider({
    title: 'Max Number of Faces',
    field: 'maxNumFaces',
    range: [1, 4],
    step: 1
  }),
  new Slider({
    title: 'Min Detection Confidence',
    field: 'minDetectionConfidence',
    range: [0, 1],
    step: 0.01
  }),
  new Slider({
    title: 'Min Tracking Confidence',
    field: 'minTrackingConfidence',
    range: [0, 1],
    step: 0.01
  }),
])

console.log(FaceMesh);
console.log(Camera);
console.log(ControlPanel);
console.log(StaticText);
console.log(Toggle);
console.log(Slider);
console.log(drawConnectors);
console.log(FACEMESH_TESSELATION);

console.log("HELLO WORLD");