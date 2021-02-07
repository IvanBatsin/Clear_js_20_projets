const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Promt to select media stream, pass to video element and then play it
async function selectVideoStream(){
  try {
    const media = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = media;
    videoElement.onloadedmetadata = () => videoElement.play();
    console.log(media);
  } catch (err) {
    console.log(err);
  }
}

button.addEventListener('click', async () => {
  // Disabled button
  button.disabled = true;
  // Start picture in picture
  await videoElement.requestPictureInPicture();
  // Reset button
  button.disabled = false;
});

// On load
selectVideoStream();