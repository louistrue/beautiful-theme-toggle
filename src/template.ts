/**
 * Returns the SVG markup for the animated theme toggle.
 *
 * The SVG uses a viewBox of 800x400 with a pill-shaped track (600x240, rx=120)
 * centered at x=100, y=80. The thumb (sun/moon) slides 360px between light
 * and dark positions. Scene elements (clouds, stars, birds, shooting star)
 * are clipped to the track area.
 */
export function getSvgTemplate(): string {
  // Randomize easter egg timing per toggle instance so sightings feel organic.
  const issDelay = (Math.random() * 28).toFixed(2);
  const issDuration = (36 + Math.random() * 20).toFixed(2);
  const dayDelay = (Math.random() * 24).toFixed(2);
  const dayDuration = (30 + Math.random() * 16).toFixed(2);

  const getBalloonMarkup = (className: string, c1: string, c2: string, c3: string, clipId: string, shadeId: string) => `
      <g class="tgl-day-balloon ${className}">
        <path d="M-4,16 L-2.5,21 M-1.5,16 L-1,21 M1.5,16 L1,21 M4,16 L2.5,21" stroke="#8D6E63" stroke-width="0.6"/>
        <circle cx="0" cy="17.5" r="1.5" fill="#FF8A65" opacity="0.8"/>
        <circle cx="0" cy="17.5" r="0.8" fill="#FFD54F"/>
        <rect x="-3" y="21" width="6" height="4.5" rx="0.5" fill="#795548"/>
        <rect x="-3" y="21" width="6" height="1" fill="#5D4037"/>
        <rect x="-3" y="23" width="6" height="0.5" fill="#5D4037"/>
        <rect x="-3" y="24.5" width="6" height="0.5" fill="#5D4037"/>
        <rect x="-3.5" y="22.5" width="1.2" height="1.8" rx="0.5" fill="#D7CCC8"/>
        <rect x="2.3" y="22.5" width="1.2" height="1.8" rx="0.5" fill="#D7CCC8"/>
        <g clip-path="url(#tgl-balloon-clip)">
          <rect x="-20" y="-24" width="40" height="42" fill="${c1}"/>
          <ellipse cx="0" cy="-4" rx="10.5" ry="24" fill="${c2}"/>
          <ellipse cx="0" cy="-4" rx="7" ry="24" fill="${c1}"/>
          <ellipse cx="0" cy="-4" rx="3.2" ry="24" fill="${c2}"/>
          <rect x="-20" y="-24" width="40" height="42" fill="url(#tgl-balloon-shade)"/>
        </g>
        <ellipse cx="0" cy="16" rx="4.5" ry="1.2" fill="${c3}"/>
        <ellipse cx="0" cy="16" rx="3" ry="0.6" fill="#424242"/>
      </g>
  `;

  return `
<svg viewBox="0 0 800 400" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
     style="--tgl-iss-delay:${issDelay}s; --tgl-iss-duration:${issDuration}s; --tgl-day-delay:${dayDelay}s; --tgl-day-duration:${dayDuration}s;">
  <defs>
    <!-- Sky gradients -->
    <linearGradient id="tgl-day-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4A90E2"/>
      <stop offset="100%" stop-color="#90C6F9"/>
    </linearGradient>
    <linearGradient id="tgl-night-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0B1021"/>
      <stop offset="100%" stop-color="#1A2340"/>
    </linearGradient>
    <radialGradient id="tgl-night-glow" cx="78%" cy="-10%" r="90%">
      <stop offset="0%" stop-color="rgba(120,166,255,0.42)"/>
      <stop offset="35%" stop-color="rgba(120,166,255,0.12)"/>
      <stop offset="100%" stop-color="rgba(120,166,255,0)"/>
    </radialGradient>

    <!-- Celestial body gradients -->
    <radialGradient id="tgl-sun-grad" cx="45%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="50%" stop-color="#FFD54F"/>
      <stop offset="100%" stop-color="#FFB300"/>
    </radialGradient>
    <radialGradient id="tgl-moon-grad" cx="40%" cy="35%" r="55%">
      <stop offset="0%" stop-color="#F5F5F5"/>
      <stop offset="60%" stop-color="#E0E0E0"/>
      <stop offset="100%" stop-color="#BDBDBD"/>
    </radialGradient>

    <!-- Cloud gradient -->
    <linearGradient id="tgl-cloud-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E8EAF0"/>
    </linearGradient>

    <!-- Track inset shadow overlay -->
    <linearGradient id="tgl-track-overlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0.18)"/>
      <stop offset="10%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="90%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.1)"/>
    </linearGradient>
    <linearGradient id="tgl-track-gloss" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.35)"/>
      <stop offset="45%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.08)"/>
    </linearGradient>
    <linearGradient id="tgl-thumb-ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0.82)"/>
      <stop offset="55%" stop-color="rgba(255,255,255,0.28)"/>
      <stop offset="100%" stop-color="rgba(226,236,252,0.74)"/>
    </linearGradient>

    <!-- Thumb drop shadow -->
    <filter id="tgl-thumb-shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="rgba(0,0,0,0.25)"/>
    </filter>

    <!-- Sun glow filter -->
    <filter id="tgl-sun-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="18"/>
    </filter>

    <!-- Moon glow filter -->
    <filter id="tgl-moon-glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="12"/>
    </filter>

    <!-- Star shape (4-point) -->
    <path id="tgl-star" d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="white"/>

    <!-- Clip path for track interior -->
    <clipPath id="tgl-track-clip">
      <rect x="100" y="80" width="600" height="240" rx="120"/>
    </clipPath>

    <clipPath id="tgl-balloon-clip">
      <path d="M0,-24 C16,-24 18,-1 11,9 C8,13 4.5,17 4.5,17 L-4.5,17 C-4.5,17 -8,13 -11,9 C-18,-1 -16,-24 0,-24 Z"/>
    </clipPath>

    <linearGradient id="tgl-balloon-shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(0,0,0,0.35)"/>
      <stop offset="30%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="70%" stop-color="rgba(255,255,255,0.3)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.45)"/>
    </linearGradient>
  </defs>

  <!-- ===== TRACK ===== -->
  <g class="tgl-track-group">
    <!-- Night sky (always rendered, day sky overlays it) -->
    <rect class="tgl-night-track" x="100" y="80" width="600" height="240" rx="120" fill="url(#tgl-night-sky)"/>
    <rect class="tgl-night-glow" x="100" y="80" width="600" height="240" rx="120" fill="url(#tgl-night-glow)"/>
    <!-- Day sky (fades to 0 in dark mode) -->
    <rect class="tgl-day-track" x="100" y="80" width="600" height="240" rx="120" fill="url(#tgl-day-sky)"/>

    <!-- Scene elements clipped to track -->
    <g clip-path="url(#tgl-track-clip)">

      <!-- ===== STARS (night) ===== -->
      <g class="tgl-stars">
        <use href="#tgl-star" class="tgl-twinkle-1" transform="translate(280 115) scale(1.1)"/>
        <use href="#tgl-star" class="tgl-twinkle-2" transform="translate(350 100) scale(0.7)"/>
        <use href="#tgl-star" class="tgl-twinkle-3" transform="translate(430 130) scale(1.0)"/>
        <use href="#tgl-star" class="tgl-twinkle-1" transform="translate(510 105) scale(0.6)"/>
        <use href="#tgl-star" class="tgl-twinkle-2" transform="translate(580 140) scale(0.9)"/>
        <use href="#tgl-star" class="tgl-twinkle-3" transform="translate(320 155) scale(0.5)"/>
        <use href="#tgl-star" class="tgl-twinkle-1" transform="translate(460 100) scale(0.8)"/>
        <use href="#tgl-star" class="tgl-twinkle-2" transform="translate(600 120) scale(0.65)"/>
        <use href="#tgl-star" class="tgl-twinkle-3" transform="translate(540 165) scale(0.45)"/>
        <use href="#tgl-star" class="tgl-twinkle-1" transform="translate(380 170) scale(0.55)"/>
        <use href="#tgl-star" class="tgl-twinkle-2" transform="translate(650 155) scale(0.7)"/>
        <use href="#tgl-star" class="tgl-twinkle-3" transform="translate(260 170) scale(0.4)"/>
      </g>

      <!-- ===== SHOOTING STARS (night) - Randomized via interleaved prime timings ===== -->
      <g class="tgl-shooting-stars">
        <line class="tgl-shooting-star star-1" x1="600" y1="95" x2="450" y2="155" stroke="white" stroke-width="2" stroke-linecap="round" stroke-dasharray="250" stroke-dashoffset="250"/>
        <line class="tgl-shooting-star star-2" x1="480" y1="75" x2="350" y2="127" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="250" stroke-dashoffset="250"/>
        <line class="tgl-shooting-star star-3" x1="680" y1="130" x2="520" y2="194" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="250" stroke-dashoffset="250"/>
      </g>
      <!-- Tiny ISS easter egg: occasional pass in dark mode -->
      <g class="tgl-iss-orbit">
        <g class="tgl-iss">
          <rect x="0" y="-1.4" width="13" height="2.8" rx="1.1" fill="#BFC7D6"/>
          <rect x="3.6" y="-3.2" width="5.8" height="6.4" rx="1.4" fill="#D8DFEC"/>
          <rect x="-8.8" y="-4.2" width="8.2" height="8.4" rx="1.2" fill="#335D9A"/>
          <rect x="13.6" y="-4.2" width="8.2" height="8.4" rx="1.2" fill="#335D9A"/>
          <line x1="3.1" y1="0" x2="-1.1" y2="0" stroke="#8EA0BE" stroke-width="0.8"/>
          <line x1="9.9" y1="0" x2="14.1" y2="0" stroke="#8EA0BE" stroke-width="0.8"/>
          <circle cx="6.5" cy="0" r="0.8" fill="#8CD1FF"/>
        </g>
      </g>

      <!-- ===== CLOUDS (day) ===== -->
      <g class="tgl-clouds">
        <g class="tgl-cloud-1" transform="translate(380 130)">
          <circle cx="0" cy="0" r="26" fill="url(#tgl-cloud-grad)" opacity="0.95"/>
          <circle cx="24" cy="6" r="20" fill="url(#tgl-cloud-grad)" opacity="0.9"/>
          <circle cx="-22" cy="8" r="18" fill="url(#tgl-cloud-grad)" opacity="0.92"/>
          <circle cx="10" cy="12" r="23" fill="url(#tgl-cloud-grad)" opacity="0.88"/>
        </g>
        <g class="tgl-cloud-2" transform="translate(560 165)" opacity="0.65">
          <circle cx="0" cy="0" r="18" fill="url(#tgl-cloud-grad)"/>
          <circle cx="16" cy="4" r="14" fill="url(#tgl-cloud-grad)"/>
          <circle cx="-14" cy="5" r="12" fill="url(#tgl-cloud-grad)"/>
        </g>
        <g class="tgl-cloud-3" transform="translate(260 155)" opacity="0.5">
          <circle cx="0" cy="0" r="14" fill="url(#tgl-cloud-grad)"/>
          <circle cx="12" cy="3" r="10" fill="url(#tgl-cloud-grad)"/>
          <circle cx="-10" cy="4" r="9" fill="url(#tgl-cloud-grad)"/>
        </g>
        <g class="tgl-cloud-4" transform="translate(480 100)" opacity="0.4">
          <circle cx="0" cy="0" r="12" fill="url(#tgl-cloud-grad)"/>
          <circle cx="10" cy="2" r="9" fill="url(#tgl-cloud-grad)"/>
          <circle cx="-8" cy="3" r="8" fill="url(#tgl-cloud-grad)"/>
        </g>
        <g class="tgl-cloud-5" transform="translate(310 110)" opacity="0.7">
          <circle cx="0" cy="0" r="20" fill="url(#tgl-cloud-grad)"/>
          <circle cx="18" cy="5" r="16" fill="url(#tgl-cloud-grad)"/>
          <circle cx="-16" cy="6" r="14" fill="url(#tgl-cloud-grad)"/>
        </g>
      </g>

      <!-- ===== BIRDS (day) ===== -->
      <g class="tgl-birds">
        <path d="M0,0 Q4,-5 8,0 M0,0 Q-4,-5 -8,0"
              fill="none" stroke="#5D6B82" stroke-width="1.5" stroke-linecap="round"
              transform="translate(420 140) scale(1.1)"/>
        <path d="M0,0 Q4,-5 8,0 M0,0 Q-4,-5 -8,0"
              fill="none" stroke="#5D6B82" stroke-width="1.5" stroke-linecap="round"
              transform="translate(450 128) scale(0.75)"/>
        <path d="M0,0 Q4,-5 8,0 M0,0 Q-4,-5 -8,0"
              fill="none" stroke="#5D6B82" stroke-width="1.5" stroke-linecap="round"
              transform="translate(465 146) scale(0.85)"/>
      </g>
      <!-- Gorgeous detailed day easter egg: hot air balloons -->
      <g class="tgl-day-balloons">
        ${getBalloonMarkup('balloon-1', '#E53935', '#F9FAFB', '#B71C1C', 'tgl-balloon-clip', 'tgl-balloon-shade')}
        ${getBalloonMarkup('balloon-2', '#1E88E5', '#FFB300', '#1565C0', 'tgl-balloon-clip', 'tgl-balloon-shade')}
        ${getBalloonMarkup('balloon-3', '#43A047', '#F9FAFB', '#2E7D32', 'tgl-balloon-clip', 'tgl-balloon-shade')}
      </g>

    </g>

    <!-- Track inset shadow overlay -->
    <rect x="100" y="80" width="600" height="240" rx="120" fill="url(#tgl-track-overlay)" pointer-events="none"/>
    <rect x="100" y="80" width="600" height="240" rx="120" fill="url(#tgl-track-gloss)" pointer-events="none"/>
    <rect class="tgl-track-stroke" x="102" y="82" width="596" height="236" rx="118" fill="none" stroke="rgba(255,255,255,0.34)" stroke-width="2"/>
  </g>

  <!-- ===== THUMB (slides from sun→moon position) ===== -->
  <g class="tgl-thumb" filter="url(#tgl-thumb-shadow)">

    <!-- Sun halo glow -->
    <circle class="tgl-sun-halo" cx="220" cy="200" r="105" fill="rgba(255,245,157,0.35)" filter="url(#tgl-sun-glow)"/>
    <!-- Moon halo glow -->
    <circle class="tgl-moon-halo" cx="220" cy="200" r="95" fill="rgba(100,149,237,0.25)" filter="url(#tgl-moon-glow)"/>

    <!-- Moon group -->
    <g class="tgl-moon">
      <!-- Moon body -->
      <circle cx="220" cy="200" r="68" fill="url(#tgl-moon-grad)"/>
      <path d="M258 200 C258 234 235 258 201 258 C224 243 238 222 238 200 C238 178 224 157 201 142 C235 142 258 166 258 200 Z"
            fill="rgba(255,255,255,0.24)"/>
      <!-- Craters -->
      <circle cx="200" cy="185" r="13" fill="#B0B0B0" opacity="0.35"/>
      <circle cx="198" cy="183" r="11" fill="#C0C0C0" opacity="0.2"/>
      <circle cx="242" cy="212" r="9" fill="#B0B0B0" opacity="0.3"/>
      <circle cx="241" cy="211" r="7" fill="#C0C0C0" opacity="0.15"/>
      <circle cx="213" cy="235" r="6" fill="#B0B0B0" opacity="0.28"/>
      <circle cx="238" cy="182" r="5" fill="#B0B0B0" opacity="0.22"/>
    </g>

    <!-- Sun group -->
    <g class="tgl-sun">
      <!-- Rotating rays -->
      <g class="tgl-sun-rays">
        <!-- Cardinal rays -->
        <line x1="220" y1="108" x2="220" y2="92" stroke="#FFB300" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="220" y1="292" x2="220" y2="308" stroke="#FFB300" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="108" y1="200" x2="92" y2="200" stroke="#FFB300" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="332" y1="200" x2="348" y2="200" stroke="#FFB300" stroke-width="4.5" stroke-linecap="round"/>
        <!-- Diagonal rays -->
        <line x1="141" y1="121" x2="130" y2="110" stroke="#FFB300" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="299" y1="279" x2="310" y2="290" stroke="#FFB300" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="299" y1="121" x2="310" y2="110" stroke="#FFB300" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="141" y1="279" x2="130" y2="290" stroke="#FFB300" stroke-width="3.5" stroke-linecap="round"/>
      </g>
      <!-- Sun body -->
      <circle cx="220" cy="200" r="68" fill="url(#tgl-sun-grad)"/>
      <circle cx="205" cy="183" r="16" fill="rgba(255,255,255,0.26)"/>
    </g>

    <!-- Overlay Ring -->
    <circle class="tgl-thumb-ring" cx="220" cy="200" r="76" fill="none" stroke="url(#tgl-thumb-ring)" stroke-width="9"/>

  </g>

  <!-- Gorgeous detailed day easter egg: hot air balloons (rendered over the sun) -->
  <g clip-path="url(#tgl-track-clip)">
    <g class="tgl-day-balloons">
      ${getBalloonMarkup('balloon-1', '#E53935', '#F9FAFB', '#B71C1C', 'tgl-balloon-clip', 'tgl-balloon-shade')}
      ${getBalloonMarkup('balloon-2', '#1E88E5', '#FFB300', '#1565C0', 'tgl-balloon-clip', 'tgl-balloon-shade')}
      ${getBalloonMarkup('balloon-3', '#43A047', '#F9FAFB', '#2E7D32', 'tgl-balloon-clip', 'tgl-balloon-shade')}
    </g>
  </g>
</svg>
`;
}

/**
 * Returns CSS styles scoped to the given instance ID.
 *
 * The toggle uses class-based CSS transitions: adding `.tgl-dark` to the
 * button triggers all elements to smoothly transition from day→night state.
 */
export function getStyles(id: string): string {
  const btn = `.${id}-btn`;

  return `
/* ===== Button reset ===== */
${btn} {
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  border-radius: 9999px;
  background: none;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  line-height: 0;
  transition: transform 220ms ease, filter 240ms ease;
}
${btn}:hover {
  transform: translateY(-1px);
  filter: saturate(1.04);
}
${btn}:active {
  transform: translateY(0) scale(0.995);
}
${btn}:focus-visible {
  outline: 3px solid #6EA8FE;
  outline-offset: 4px;
  border-radius: 9999px;
}

/* ===== Thumb slide ===== */
${btn} .tgl-thumb {
  transform: translateX(0);
  transition: transform 0.78s cubic-bezier(0.34, 1.28, 0.42, 1);
}
${btn}.tgl-dark .tgl-thumb {
  transform: translateX(360px);
}
${btn} .tgl-thumb-ring {
  opacity: 0.86;
  transition: opacity 0.45s ease-in-out;
}
${btn}.tgl-dark .tgl-thumb-ring {
  opacity: 0.62;
}

/* ===== Day/night sky crossfade ===== */
${btn} .tgl-day-track {
  opacity: 1;
  transition: opacity 0.7s ease-in-out;
}
${btn}.tgl-dark .tgl-day-track {
  opacity: 0;
}
${btn} .tgl-night-glow {
  opacity: 0;
  transition: opacity 0.85s ease-in-out;
}
${btn}.tgl-dark .tgl-night-glow {
  opacity: 1;
}
${btn} .tgl-track-stroke {
  transition: stroke 0.6s ease-in-out;
}
${btn}.tgl-dark .tgl-track-stroke {
  stroke: rgba(172, 205, 255, 0.3);
}

/* ===== Sun ===== */
${btn} .tgl-sun {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  transform-origin: center;
  transform-box: fill-box;
  transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
}
${btn}.tgl-dark .tgl-sun {
  opacity: 0;
  transform: scale(0.4) rotate(180deg);
}

/* ===== Sun rays rotation ===== */
${btn} .tgl-sun-rays {
  transform-origin: center;
  transform-box: fill-box;
  animation: tgl-spin 25s linear infinite;
}
@keyframes tgl-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ===== Sun halo pulse ===== */
${btn} .tgl-sun-halo {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  animation: tgl-sun-pulse 4s ease-in-out infinite;
}
${btn}.tgl-dark .tgl-sun-halo {
  opacity: 0;
  animation: none;
}
@keyframes tgl-sun-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.45; }
}

/* ===== Moon ===== */
${btn} .tgl-moon {
  opacity: 0;
  transform: scale(0.4) rotate(-180deg);
  transform-origin: center;
  transform-box: fill-box;
  transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
}
${btn}.tgl-dark .tgl-moon {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* ===== Moon halo ===== */
${btn} .tgl-moon-halo {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}
${btn}.tgl-dark .tgl-moon-halo {
  opacity: 1;
  animation: tgl-moon-pulse 5s ease-in-out infinite;
}
@keyframes tgl-moon-pulse {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.35; }
}

/* ===== Clouds ===== */
${btn} .tgl-clouds {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
}
${btn}.tgl-dark .tgl-clouds {
  opacity: 0;
  transform: translateX(-80px);
}
${btn} .tgl-cloud-1 {
  animation: tgl-cloud-float-1 14.3s ease-in-out infinite;
}
${btn} .tgl-cloud-2 {
  animation: tgl-cloud-float-2 19.7s ease-in-out 1.2s infinite;
}
${btn} .tgl-cloud-3 {
  animation: tgl-cloud-float-3 11.5s ease-in-out 0.5s infinite;
}
${btn} .tgl-cloud-4 {
  animation: tgl-cloud-float-1 17.1s ease-in-out 3.4s infinite;
}
${btn} .tgl-cloud-5 {
  animation: tgl-cloud-float-2 23.3s ease-in-out 2.1s infinite;
}
@keyframes tgl-cloud-float-1 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-12px, -4px); }
}
@keyframes tgl-cloud-float-2 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(8px, 3px); }
}
@keyframes tgl-cloud-float-3 {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-6px, 5px); }
}

/* ===== Stars ===== */
${btn} .tgl-stars {
  opacity: 0;
  transition: opacity 0.6s ease-in-out 0.15s;
}
${btn}.tgl-dark .tgl-stars {
  opacity: 1;
}

/* Star twinkling */
${btn}.tgl-dark .tgl-twinkle-1 { animation: tgl-twinkle 3s ease-in-out infinite; }
${btn}.tgl-dark .tgl-twinkle-2 { animation: tgl-twinkle 3s ease-in-out 1s infinite; }
${btn}.tgl-dark .tgl-twinkle-3 { animation: tgl-twinkle 3s ease-in-out 2s infinite; }
@keyframes tgl-twinkle {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
}

/* ===== Shooting stars ===== */
${btn} .tgl-shooting-star {
  opacity: 0;
  stroke-dashoffset: 285;
  transition: opacity 0.3s ease-in-out;
}
${btn}.tgl-dark .tgl-shooting-star.star-1 {
  animation: tgl-shoot 17.3s ease-in-out 2.1s infinite;
}
${btn}.tgl-dark .tgl-shooting-star.star-2 {
  animation: tgl-shoot 28.1s ease-in-out 7.5s infinite;
}
${btn}.tgl-dark .tgl-shooting-star.star-3 {
  animation: tgl-shoot 43.9s ease-in-out 12.3s infinite;
}
@keyframes tgl-shoot {
  0%   { stroke-dashoffset: 285; opacity: 0; }
  5%   { stroke-dashoffset: 250; opacity: 1; }
  15%  { stroke-dashoffset: -35; opacity: 1; }
  20%  { stroke-dashoffset: -35; opacity: 0; }
  100% { stroke-dashoffset: -35; opacity: 0; }
}

/* ===== Night easter egg: ISS pass (rare + random timing) ===== */
${btn} .tgl-iss-orbit {
  opacity: 0;
  transform: translate(-150px, 136px) rotate(-13deg) scale(1.55);
  transform-origin: center;
  pointer-events: none;
}
${btn}.tgl-dark .tgl-iss-orbit {
  animation: tgl-iss-pass var(--tgl-iss-duration, 44s) linear var(--tgl-iss-delay, 0s) infinite;
}
${btn} .tgl-iss {
  filter: drop-shadow(0 0 1.5px rgba(180, 220, 255, 0.45));
}
@keyframes tgl-iss-pass {
  0%, 6% {
    opacity: 0;
    transform: translate(-150px, 136px) rotate(-13deg) scale(1.45);
  }
  9%, 20% {
    opacity: 1;
    transform: translate(290px, 96px) rotate(-12deg) scale(1.52);
  }
  26% {
    opacity: 0.95;
    transform: translate(760px, 76px) rotate(-11deg) scale(1.6);
  }
  28%, 100% {
    opacity: 0;
    transform: translate(800px, 70px) rotate(-11deg) scale(1.6);
  }
}

/* ===== Day easter egg: hot air balloon drift (rare + random timing) ===== */
${btn} .tgl-day-balloon {
  opacity: 0;
  transform: translate(-95px, 226px) scale(1.55);
  pointer-events: none;
}
${btn}:not(.tgl-dark) .tgl-day-balloon.balloon-1 {
  animation: tgl-day-balloon-1 31.7s linear 2.3s infinite;
}
${btn}:not(.tgl-dark) .tgl-day-balloon.balloon-2 {
  animation: tgl-day-balloon-2 47.1s linear 14.5s infinite;
}
${btn}:not(.tgl-dark) .tgl-day-balloon.balloon-3 {
  animation: tgl-day-balloon-3 61.9s linear 37.2s infinite;
}

@keyframes tgl-day-balloon-1 {
  0% { opacity: 0; transform: translate(-100px, 250px) scale(1.45); }
  8% { opacity: 0.98; transform: translate(20px, 235px) scale(1.5); }
  92% { opacity: 0.98; transform: translate(680px, 160px) scale(1.7); }
  100% { opacity: 0; transform: translate(800px, 150px) scale(1.72); }
}

@keyframes tgl-day-balloon-2 {
  0% { opacity: 0; transform: translate(-120px, 210px) scale(1.1); }
  8% { opacity: 0.9; transform: translate(10px, 205px) scale(1.12); }
  92% { opacity: 0.9; transform: translate(690px, 155px) scale(1.3); }
  100% { opacity: 0; transform: translate(800px, 145px) scale(1.32); }
}

@keyframes tgl-day-balloon-3 {
  0% { opacity: 0; transform: translate(-100px, 230px) scale(0.9); }
  8% { opacity: 0.95; transform: translate(20px, 220px) scale(0.95); }
  92% { opacity: 0.95; transform: translate(680px, 140px) scale(1.15); }
  100% { opacity: 0; transform: translate(800px, 130px) scale(1.18); }
}

/* ===== Birds ===== */
${btn} .tgl-birds {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.4s ease-in-out, transform 0.7s ease-in-out;
}
${btn}.tgl-dark .tgl-birds {
  opacity: 0;
  transform: translateX(180px);
}

@media (prefers-reduced-motion: reduce) {
  ${btn} .tgl-thumb,
  ${btn} .tgl-day-track,
  ${btn} .tgl-sun,
  ${btn} .tgl-moon,
  ${btn} .tgl-sun-halo,
  ${btn} .tgl-moon-halo,
  ${btn} .tgl-clouds,
  ${btn} .tgl-stars,
  ${btn} .tgl-shooting-star,
  ${btn} .tgl-birds,
  ${btn} .tgl-night-glow {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
`;
}
