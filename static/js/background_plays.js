/**
 * Ewana Environmental Consulting Ltd
 * Background Video Controller (HLS & Native MP4 Fallback + Controls)
 */

(function () {
  const video = document.getElementById("backgroundVideo");
  if (!video) return;

  const isLocalFile = window.location.protocol === "file:";

  const playlist = [
    {
      name: "Environmental Ecology & Canopy",
      hls: "assets/video/ex/ex_bg_720_vid.m3u8",
    },
    {
      name: "Natural Landscape & Watershed",
      hls: "assets/video/landscape/landscape_bg_720_vid.m3u8",
    }
  ];

  let currentIndex = 0;
  let hlsInstance = null;
  let isPlaying = true;

  function loadAndPlayVideo(index) {
    const item = playlist[index];
    if (!item) return;

    // Fade out slightly during switch
    video.style.opacity = "0.2";

    const useMp4Directly = isLocalFile || !window.Hls || !Hls.isSupported();

    if (!useMp4Directly && video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari native HLS
      video.src = item.hls;
      video.load();
      video.play().catch(onAutoplayBlocked);
    } else if (!useMp4Directly && Hls.isSupported()) {
      // Other browsers with HLS.js
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90
      });

      hlsInstance.loadSource(item.hls);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play().catch(onAutoplayBlocked);
      });

      hlsInstance.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          console.warn("HLS stream failed, falling back to MP4:", item.mp4);
          hlsInstance.destroy();
          playMp4(item.mp4);
        }
      });
    } else {
      // Direct MP4 fallback
      playMp4(item.mp4);
    }

    setTimeout(() => {
      video.style.opacity = "1";
    }, 400);
  }

  function playMp4(src) {
    video.src = src;
    video.load();
    video.play().catch(onAutoplayBlocked);
  }

  function onAutoplayBlocked(err) {
    console.log("Autoplay was prevented by browser:", err);
    isPlaying = false;
    updatePlayButtonState();
  }

  video.addEventListener("ended", () => {
    video.style.opacity = "0";
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % playlist.length;
      loadAndPlayVideo(currentIndex);
    }, 800);
  });

  // Video UI controls
  const playBtn = document.getElementById("videoTogglePlay");
  const nextBtn = document.getElementById("videoNextTrack");

  function updatePlayButtonState() {
    if (!playBtn) return;
    if (video.paused) {
      playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        <span>Play Ambient Video</span>
      `;
    } else {
      playBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
        <span>Pause Video</span>
      `;
    }
  }

  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (video.paused) {
        video.play().then(() => {
          isPlaying = true;
          updatePlayButtonState();
        });
      } else {
        video.pause();
        isPlaying = false;
        updatePlayButtonState();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % playlist.length;
      loadAndPlayVideo(currentIndex);
    });
  }

  video.addEventListener("play", updatePlayButtonState);
  video.addEventListener("pause", updatePlayButtonState);

  // Initialize
  loadAndPlayVideo(currentIndex);
})();
