/**
 * Returns the SVG markup for the animated theme toggle.
 *
 * The SVG uses a viewBox of 800x400 with a pill-shaped track (600x240, rx=120)
 * centered at x=100, y=80. The thumb (sun/moon) slides 360px between light
 * and dark positions. Scene elements (clouds, stars, birds, shooting star)
 * are clipped to the track area.
 */
export function getSvgTemplate(): string {
  return `
<svg viewBox="0 0 800 400" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
  </defs>

  <!-- ===== TRACK ===== -->
  <g class="tgl-track-group">
    <!-- Night sky (always rendered, day sky overlays it) -->
    <rect class="tgl-night-track" x="100" y="80" width="600" height="240" rx="120" fill="url(#tgl-night-sky)"/>
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

      <!-- ===== SHOOTING STAR (night) ===== -->
      <line class="tgl-shooting-star" x1="600" y1="95" x2="510" y2="135"
            stroke="white" stroke-width="2" stroke-linecap="round"
            stroke-dasharray="80" stroke-dashoffset="80"/>

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

    </g>

    <!-- Track inset shadow overlay -->
    <rect x="100" y="80" width="600" height="240" rx="120" fill="url(#tgl-track-overlay)" pointer-events="none"/>
  </g>

  <!-- ===== THUMB (slides from sun→moon position) ===== -->
  <g class="tgl-thumb" filter="url(#tgl-thumb-shadow)">

    <!-- Sun halo glow -->
    <circle class="tgl-sun-halo" cx="220" cy="200" r="105" fill="rgba(255,245,157,0.35)" filter="url(#tgl-sun-glow)"/>
    <!-- Moon halo glow -->
    <circle class="tgl-moon-halo" cx="220" cy="200" r="95" fill="rgba(100,149,237,0.25)" filter="url(#tgl-moon-glow)"/>

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
    </g>

    <!-- Moon group -->
    <g class="tgl-moon">
      <!-- Moon body -->
      <circle cx="220" cy="200" r="68" fill="url(#tgl-moon-grad)"/>
      <!-- Craters -->
      <circle cx="200" cy="185" r="13" fill="#B0B0B0" opacity="0.35"/>
      <circle cx="198" cy="183" r="11" fill="#C0C0C0" opacity="0.2"/>
      <circle cx="242" cy="212" r="9" fill="#B0B0B0" opacity="0.3"/>
      <circle cx="241" cy="211" r="7" fill="#C0C0C0" opacity="0.15"/>
      <circle cx="213" cy="235" r="6" fill="#B0B0B0" opacity="0.28"/>
      <circle cx="238" cy="182" r="5" fill="#B0B0B0" opacity="0.22"/>
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
  background: none;
  cursor: pointer;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  line-height: 0;
}
${btn}:focus-visible {
  outline: 3px solid #6EA8FE;
  outline-offset: 4px;
  border-radius: 9999px;
}

/* ===== Thumb slide ===== */
${btn} .tgl-thumb {
  transform: translateX(0);
  transition: transform 0.75s cubic-bezier(0.68, -0.05, 0.265, 1.15);
}
${btn}.tgl-dark .tgl-thumb {
  transform: translateX(360px);
}

/* ===== Day/night sky crossfade ===== */
${btn} .tgl-day-track {
  opacity: 1;
  transition: opacity 0.7s ease-in-out;
}
${btn}.tgl-dark .tgl-day-track {
  opacity: 0;
}

/* ===== Sun ===== */
${btn} .tgl-sun {
  opacity: 1;
  transform: scale(1) rotate(0deg);
  transform-origin: 220px 200px;
  transform-box: fill-box;
  transition: opacity 0.5s ease-in-out, transform 0.7s ease-in-out;
}
${btn}.tgl-dark .tgl-sun {
  opacity: 0;
  transform: scale(0.4) rotate(180deg);
}

/* ===== Sun rays rotation ===== */
${btn} .tgl-sun-rays {
  transform-origin: 220px 200px;
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
  transform-origin: 220px 200px;
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

/* ===== Shooting star ===== */
${btn} .tgl-shooting-star {
  opacity: 0;
  stroke-dashoffset: 80;
  transition: opacity 0.3s ease-in-out;
}
${btn}.tgl-dark .tgl-shooting-star {
  opacity: 1;
  animation: tgl-shoot 3s ease-in-out 0.8s infinite;
}
@keyframes tgl-shoot {
  0%   { stroke-dashoffset: 80; opacity: 0; }
  15%  { opacity: 1; }
  40%  { stroke-dashoffset: -80; opacity: 0; }
  100% { stroke-dashoffset: -80; opacity: 0; }
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
`;
}
