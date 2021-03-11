<script>
export default {
  mounted() {
    const videoContainer = document.getElementById('videoContainer')
    const video = document.getElementById('video')
    const videoControls = document.getElementById('video-controls')
    const playpause = document.getElementById('playpause')
    const stop = document.getElementById('stop')
    const mute = document.getElementById('mute')
    const volinc = document.getElementById('volinc')
    const voldec = document.getElementById('voldec')
    const progress = document.getElementById('progress')
    const progressBar = document.getElementById('progress-bar')
    const fullscreen = document.getElementById('fs')
    const fullScreenEnabled = !!(
      document.fullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled ||
      document.webkitSupportsFullscreen ||
      document.webkitFullscreenEnabled ||
      document.createElement('video').webkitRequestFullScreen
    )

    if (!fullScreenEnabled) {
      fullscreen.style.display = 'none'
    }

    // Hide the default controls
    // video.controls = false;

    // Display the user defined video controls
    // videoControls.style.display = 'block'

    // Display the user defined video controls
    videoControls.setAttribute('data-state', 'visible')

    const supportsProgress =
      document.createElement('progress').max !== undefined

    if (!supportsProgress) progress.setAttribute('data-state', 'fake')

    const handleFullscreen = function () {
      if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen()
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
        else if (document.webkitCancelFullScreen)
          document.webkitCancelFullScreen()
        else if (document.msExitFullscreen) document.msExitFullscreen()
        setFullscreenData(false)
      } else {
        if (videoContainer.requestFullscreen) videoContainer.requestFullscreen()
        else if (videoContainer.mozRequestFullScreen)
          videoContainer.mozRequestFullScreen()
        else if (videoContainer.webkitRequestFullScreen)
          videoContainer.webkitRequestFullScreen()
        else if (videoContainer.msRequestFullscreen)
          videoContainer.msRequestFullscreen()
        setFullscreenData(true)
      }
    }

    const changeButtonState = function (type) {
      // Play/Pause button
      if (type == 'playpause') {
        if (video.paused || video.ended) {
          playpause.setAttribute('data-state', 'play')
        } else {
          playpause.setAttribute('data-state', 'pause')
        }
      } // Mute button
      else if (type == 'mute') {
        mute.setAttribute('data-state', video.muted ? 'unmute' : 'mute')
      }
    }

    video.addEventListener(
      'volumechange',
      function () {
        checkVolume()
      },
      false,
    )

    video.addEventListener('loadedmetadata', function () {
      progress.setAttribute('max', video.duration)
    })

    // video.addEventListener('timeupdate', function() {
    //   progress.value = video.currentTime
    //   progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%'
    // })

    video.addEventListener('timeupdate', function () {
      if (!progress.getAttribute('max'))
        progress.setAttribute('max', video.duration)
      progress.value = video.currentTime
      progressBar.style.width =
        Math.floor((video.currentTime / video.duration) * 100) + '%'
    })

    // // Skip ahead
    // progress.addEventListener('click', function(e) {
    //   var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth
    //   video.currentTime = pos * video.duration
    // })

    playpause.addEventListener('click', function (e) {
      if (video.paused || video.ended) video.play()
      else video.pause()
    })

    stop.addEventListener('click', function (e) {
      video.pause()
      video.currentTime = 0
      progress.value = 0
    })

    mute.addEventListener('click', function (e) {
      video.muted = !video.muted
    })

    volinc.addEventListener('click', function (e) {
      alterVolume('+')
    })

    voldec.addEventListener('click', function (e) {
      alterVolume('-')
    })

    progress.addEventListener('click', function (e) {
      var pos =
        (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft)) /
        this.offsetWidth
      video.currentTime = pos * video.duration
    })

    fullscreen.addEventListener('click', function (e) {
      handleFullscreen()
    })
    // const alterVolume = function(dir) {
    //   const currentVolume = Math.floor(video.volume * 10) / 10;
    //   if (dir === '+') {
    //     if (currentVolume < 1) video.volume += 0.1;
    //   }
    //   else if (dir === '-') {
    //     if (currentVolume > 0) video.volume -= 0.1;
    //   }
    // }

    const checkVolume = function (dir) {
      if (dir) {
        const currentVolume = Math.floor(video.volume * 10) / 10
        if (dir === '+') {
          if (currentVolume < 1) video.volume += 0.1
        } else if (dir === '-') {
          if (currentVolume > 0) video.volume -= 0.1
        }
        // If the volume has been turned off, also set it as muted
        // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
        if (currentVolume <= 0) video.muted = true
        else video.muted = false
      }
      changeButtonState('mute')
    }

    const alterVolume = function (dir) {
      checkVolume(dir)
    }
  },
}
</script>
<template>
  <div id="video-controls" class="controls" data-state="hidden">
    <button id="playpause" type="button" data-state="play">Play/Pause</button>
    <button id="stop" type="button" data-state="stop">Stop</button>
    <div class="progress">
      <progress id="progress" value="0" min="0">
        <span id="progress-bar"></span>
      </progress>
    </div>
    <button id="mute" type="button" data-state="mute">Mute/Unmute</button>
    <button id="volinc" type="button" data-state="volup">Vol+</button>
    <button id="voldec" type="button" data-state="voldown">Vol-</button>
    <button id="fs" type="button" data-state="go-fullscreen">Fullscreen</button>
  </div>
</template>

<style scoped>
figure {
  max-width: 64rem;
  width: 100%;
  max-height: 30.875rem;
  height: 100%;
  margin: 1.25rem auto;
  padding: 1.051%;
  background-color: #666;
}
.controls {
  width: 100%;
  height: 8.0971659919028340080971659919028%; /* of figure's height */
  position: relative;
}

.controls[data-state='hidden'] {
  display: none;
}

.controls[data-state='visible'] {
  display: block;
}

.controls > * {
  float: left;
  width: 3.90625%;
  height: 100%;
  margin-left: 0.1953125%;
  display: block;
}

.controls > *:first-child {
  margin-left: 0;
}

.controls .progress {
  cursor: pointer;
  width: 75.390625%;
}

.controls button {
  border: none;
  cursor: pointer;
  background: transparent;
  background-size: contain;
  background-repeat: no-repeat;
}

.controls button:hover,
.controls button:focus {
  opacity: 0.5;
}

/* .controls button[data-state="play"] {
   background-image: url('data:image/png;base64,iVBORw0KGgoAAA ... ');
}

.controls button[data-state="pause"] {
   background-image: url('data:image/png;base64,iVBORw0KGgoAAA ... ');
} */

.controls progress {
  display: block;
  width: 100%;
  height: 81%;
  margin-top: 0.125rem;
  border: none;
  color: #0095dd;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
}

.controls progress[data-state='fake'] {
  background: #e6e6e6;
  height: 65%;
}
.controls progress span {
  width: 0%;
  height: 100%;
  display: inline-block;
  background-color: #2a84cd;
}

.controls progress::-moz-progress-bar {
  background-color: #0095dd;
}

.controls progress::-webkit-progress-value {
  background-color: #0095dd;
}

@media screen and (max-width: 64em) {
  figure {
    padding-left: 0;
    padding-right: 0;
    height: auto;
  }

  .controls {
    height: 1.876rem;
  }
}

@media screen and (max-width: 42.5em) {
  .controls {
    height: auto;
  }

  .controls > * {
    display: block;
    width: 16.6667%;
    margin-left: 0;
    height: 2.5rem;
    margin-top: 2.5rem;
  }

  .controls .progress {
    position: absolute;
    top: 0;
    width: 100%;
    float: none;
    margin-top: 0;
  }

  .controls .progress progress {
    width: 98%;
    margin: 0 auto;
  }

  .controls button {
    background-position: center center;
  }
}
</style>
