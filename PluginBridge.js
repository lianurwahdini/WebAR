let unityInstance;
function SendPositionToUnity(x,y,z) {
  if (unityInstance) {
    unityInstance.SendMessage('WebARManager', 'OnReceivePosition', `${x},${y},${z}`);
  }
}
async function startCameraAndTrack() {
  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  document.body.appendChild(video);
  const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
  video.srcObject = stream;
  video.onloadedmetadata = ()=> {
    video.play();
    trackLoop();
  };
  window.unityInstance = unityInstance = unityInstance || window.unityInstance;
}
function trackLoop() {
  // contoh sederhana: kirim titik (0,0,0) terus-menerus
  SendPositionToUnity(0, 0, 0);
  requestAnimationFrame(trackLoop);
}
