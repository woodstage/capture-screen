const { desktopCapturer } = require('electron')

desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  if (error) throw error
  for (let i = 0; i < sources.length; ++i) {
    //debugger
    //if (sources[i].name === 'Electron') {
      navigator.webkitGetUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sources[i].id,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }, handleStream, handleError)
      return
    //}
  }
})

function handleStream (stream) {
  var video = document.createElement('video')
  var autoplay = document.createAttribute('autoplay')
  video.setAttributeNode(autoplay)
  video.src = URL.createObjectURL(stream)
  document.body.appendChild(video);
}

function handleError (e) {
  console.log(e)
}
