
const CONFIG = {
  ESP_URL: "http://192.168.1.60"
};
const Log = {
  add(message) {
    const logEl = document.getElementById("log");
    if (!logEl) return;
    const li = document.createElement("li");
    li.textContent = new Date().toLocaleTimeString() + " - " + message;
    logEl.prepend(li);
  }
};
function sendCommand(cmd) {
  const url = `${CONFIG.ESP_URL}/${cmd}`;
  Log.add(`Sending ESP32 Command: ${cmd} → ${url}`);

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      Log.add(`ESP32 ACK OK: ${cmd}`);
    })
    .catch(err => {
      Log.add("ESP32 Error: " + err.message);
    });
}

window.sendCommand = sendCommand;
function updateDroneStatus() {
  const statusEl = document.getElementById("status");
  const batteryEl = document.getElementById("battery");
  const modeEl = document.getElementById("mode");

  statusEl.innerText = "Connected (Demo)";
  batteryEl.innerText = `${Math.floor(Math.random() * 30 + 70)}%`;
  modeEl.innerText = "AI Human Counting Mode";
}


let liveModel = null;
let liveVideo = null;
let liveCanvas = null;
let liveCtx = null;
let lastHumanCount = 0;

async function startDetection() {
  try {
    Log.add("Loading AI model (COCO-SSD)...");
    liveModel = await cocoSsd.load({ base: "lite_mobilenet_v2" });
    Log.add("Model Loaded Successfully");

    liveVideo = document.getElementById("liveVideo");
    liveCanvas = document.getElementById("liveCanvas");
    liveCtx = liveCanvas.getContext("2d");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false
    });

    liveVideo.srcObject = stream;

    liveVideo.onloadedmetadata = () => {
      liveVideo.play();
      liveCanvas.width = liveVideo.videoWidth;
      liveCanvas.height = liveVideo.videoHeight;
      Log.add("Webcam Started — Beginning Detection...");
      detectFrame();
    };
  } catch (err) {
    Log.add("Error starting detection: " + err.message);
  }
}

async function detectFrame() {
  if (!liveModel || liveVideo.readyState !== 4) {
    requestAnimationFrame(detectFrame);
    return;
  }

  const predictions = await liveModel.detect(liveVideo);
  const humans = predictions.filter(p => p.class === "person" && p.score > 0.5);

  liveCtx.clearRect(0, 0, liveCanvas.width, liveCanvas.height);

  liveCtx.lineWidth = 3;
  liveCtx.font = "10px monospace";

  humans.forEach(p => {
    const [x, y, w, h] = p.bbox;

    liveCtx.strokeStyle = "lime";
    liveCtx.strokeRect(x, y, w, h);

    const label = "Human";
    const textWidth = liveCtx.measureText(label).width;
    const textHeight = 18;

    liveCtx.fillStyle = "rgba(0, 0, 0, 0.7)";
    liveCtx.fillRect(x, y - textHeight, textWidth + 8, textHeight);

    liveCtx.fillStyle = "lime";
    liveCtx.fillText(label, x + 4, y - 4);
  });

  const count = humans.length;
  document.getElementById("altitude").innerText = count;

  if (count !== lastHumanCount) {
    Log.add(`Human Count Changed: ${lastHumanCount} → ${count}`);
    lastHumanCount = count;
  }

  requestAnimationFrame(detectFrame);
}

document.addEventListener("DOMContentLoaded", () => {
  Log.add("Drona Vahana WebApp Loaded");

  setInterval(updateDroneStatus, 3000);

  startDetection();
});
