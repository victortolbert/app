<template>
  <div class="audio-player">
    <div id="play-btn" />

    <div class="audio-wrapper" id="player-container" href="javascript:;">
      <audio id="player" ontimeupdate="initProgressBar()">
        <source src="http://www.lukeduncan.me/oslo.mp3" type="audio/mp3" />
      </audio>
    </div>

    <div class="player-controls scrubber">
      <p>Oslo <small>by</small> Holy Esque</p>
      <span id="seekObjContainer">
        <progress id="seekObj" value="0" max="1" />
      </span>

      <br />
      <small
        style="float: left; position: relative; left: 15px"
        class="start-time"
      />
      <small
        style="float: right; position: relative; right: 20px"
        class="end-time"
      />
    </div>
    <div
      class="album-image"
      style="
        background-image: url('https://artwork-cdn.7static.com/static/img/sleeveart/00/051/614/0005161476_350.jpg');
      "
    />
  </div>
</template>
<script>
export default {
  mounted() {
    function initProgressBar() {
      var player = document.getElementById('player')
      var length = player.duration
      var current_time = player.currentTime

      // calculate total length of value
      var totalLength = calculateTotalValue(length)
      document.getElementById('end-time').innerHTML = totalLength

      // calculate current value time
      var currentTime = calculateCurrentValue(current_time)
      document.getElementById('start-time').innerHTML = currentTime

      var progressbar = document.getElementById('seek-obj')
      progressbar.value = player.currentTime / player.duration
      progressbar.addEventListener('click', seek)

      if (player.currentTime == player.duration) {
        document.getElementById('play-btn').className = ''
      }

      function seek(event) {
        var percent = event.offsetX / this.offsetWidth
        player.currentTime = percent * player.duration
        progressbar.value = percent / 100
      }
    }

    function initPlayers(num) {
      // pass num in if there are multiple audio players e.g 'player' + i

      for (var i = 0; i < num; i++) {
        ;(function () {
          // Variables
          // ----------------------------------------------------------
          // audio embed object
          var playerContainer = document.getElementById('player-container'),
            player = document.getElementById('player'),
            isPlaying = false,
            playBtn = document.getElementById('play-btn')

          // Controls Listeners
          // ----------------------------------------------------------
          if (playBtn != null) {
            playBtn.addEventListener('click', function () {
              togglePlay()
            })
          }

          // Controls & Sounds Methods
          // ----------------------------------------------------------
          function togglePlay() {
            if (player.paused === false) {
              player.pause()
              isPlaying = false
              document.getElementById('play-btn').className = ''
            } else {
              player.play()
              document.getElementById('play-btn').className = 'pause'
              isPlaying = true
            }
          }
        })()
      }
    }

    function calculateTotalValue(length) {
      var minutes = Math.floor(length / 60),
        seconds_int = length - minutes * 60,
        seconds_str = seconds_int.toString(),
        seconds = seconds_str.substr(0, 2),
        time = minutes + ':' + seconds

      return time
    }

    function calculateCurrentValue(currentTime) {
      var current_hour = parseInt(currentTime / 3600) % 24,
        current_minute = parseInt(currentTime / 60) % 60,
        current_seconds_long = currentTime % 60,
        current_seconds = current_seconds_long.toFixed(),
        current_time =
          (current_minute < 10 ? '0' + current_minute : current_minute) +
          ':' +
          (current_seconds < 10 ? '0' + current_seconds : current_seconds)

      return current_time
    }

    // initPlayers(jQuery('#player-container').length)
  },
}
</script>
<style lang="scss">
.audio-player {
  background: white;
  border: 1px solid lighten(#acacac, 20%);
  width: 50vw;
  text-align: center;
  display: flex;
  flex-flow: row;
  margin: 4rem 0 4rem 0;
}

.album-image {
  min-height: 100px;
  width: 110px;
  background-size: cover;
}

.player-controls {
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  flex: 3;
}

.player-controls progress {
  width: 90%;
}

.player-controls progress[value] {
  -webkit-appearance: none;
  appearance: none;
  background-color: white;
  color: blue;
  height: 5px;
}

.player-controls progress[value]::-webkit-progress-bar {
  background-color: white;
  border-radius: 2px;
  border: 1px solid lighten(#acacac, 20%);
  color: blue;
}

.player-controls progress::-webkit-progress-value {
  background-color: blue;
}

.player-controls p {
  font-size: 1.6rem;
}

#play-btn {
  background-image: url('http://www.lukeduncan.me/images/play-button.png');
  background-size: cover;
  width: 75px;
  height: 75px;
  margin: 2rem 0 2rem 2rem;
}

#play-btn.pause {
  background-image: url('http://www.lukeduncan.me/images/pause-button.png');
}
</style>
