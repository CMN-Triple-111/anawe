/**
 * Ewana Environmental Consulting Ltd
 * Background Video Controller (HLS & Native MP4 Fallback + Controls)
 */

(function () {
  const video = document.getElementById("backgroundVideo");
  if (!video) return;

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

  // Set explicit mobile playback flags on video element
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");

  function loadAndPlayVideo(index) {
    const item = playlist[index];
    if (!item) return;

    // Fade out slightly during switch
    video.style.opacity = "0.2";

    // 1. Native HLS support (iOS Safari, iPadOS, macOS Safari)
    // Mobile Safari does not support MediaSource for HLS, but supports native m3u8
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
      }
      video.src = item.hls;
      video.load();
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlaying = true;
          updatePlayButtonState();
        }).catch(onAutoplayBlocked);
      }
    }
    // 2. MediaSource Extensions via Hls.js (Chrome, Firefox, Edge, Android)
    else if (window.Hls && Hls.isSupported()) {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 60
      });

      hlsInstance.loadSource(item.hls);
      hlsInstance.attachMedia(video);

      hlsInstance.on(Hls.Events.MANIFEST_PARSED, function () {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            updatePlayButtonState();
          }).catch(onAutoplayBlocked);
        }
      });

      hlsInstance.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          console.warn("HLS stream encountered fatal error:", data.type, data.details);
          hlsInstance.destroy();
          hlsInstance = null;
          // Switch to alternate stream if fatal
          if (playlist.length > 1) {
            currentIndex = (currentIndex + 1) % playlist.length;
            setTimeout(() => loadAndPlayVideo(currentIndex), 1200);
          }
        }
      });
    } else {
      console.warn("HLS video streaming is not supported on this browser.");
    }

    setTimeout(() => {
      video.style.opacity = "1";
    }, 400);
  }

  function onAutoplayBlocked(err) {
    console.log("Autoplay was prevented by mobile browser policy:", err);
    isPlaying = false;
    updatePlayButtonState();
  }

  // Wake up video upon first mobile touch / scroll if autoplay was constrained
  function onFirstUserInteraction() {
    if (video.paused) {
      video.play().then(() => {
        isPlaying = true;
        updatePlayButtonState();
      }).catch(() => {});
    }
    window.removeEventListener("touchstart", onFirstUserInteraction);
    window.removeEventListener("scroll", onFirstUserInteraction);
    window.removeEventListener("click", onFirstUserInteraction);
  }
  window.addEventListener("touchstart", onFirstUserInteraction, { passive: true, once: true });
  window.addEventListener("scroll", onFirstUserInteraction, { passive: true, once: true });
  window.addEventListener("click", onFirstUserInteraction, { passive: true, once: true });

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
        }).catch((e) => console.log("Play error:", e));
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
