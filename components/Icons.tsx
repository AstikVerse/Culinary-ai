import React from 'react';

export const IconSun = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364 0.386l-1.591 1.591M21 12h-2.25m-0.386 6.364l-1.591 -1.591M12 18.75V21m-4.773 -4.227l-1.591 1.591M3 12h2.25m0.386 -6.364l1.591 1.591M15.75 12a3.75 3.75 0 1 1 -7.5 0 3.75 3.75 0 0 1 7.5 0z" />
  </svg>
);

export const IconMoon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0 -9.75 -4.365 -9.75 -9.75 0 -1.33 0.266 -2.597 0.748 -3.752A9.753 9.753 0 0 0 3 11.25c0 5.385 4.365 9.75 9.75 9.75a9.753 9.753 0 0 0 9.002 -5.998z" />
  </svg>
);

export const StickerMascot = ({ className = "w-24 h-24" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#007bff" />
    <defs>
      <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
    </defs>
    <text fill="white" fontSize="9.5" fontWeight="black" fontFamily="Inter, sans-serif" letterSpacing="1">
      <textPath href="#circlePath">
        RATE THE AI CHEF • GIVE FEEDBACK • RATE THE AI CHEF • 
      </textPath>
    </text>
    <circle cx="50" cy="50" r="32" fill="white" />
    <g transform="translate(22, 22) scale(0.6)">
        <path d="M46.5 12C28.5 12 18 24 18 42C18 48 21 54 24 57L21 75H72L69 57C72 54 75 48 75 42C75 24 64.5 12 46.5 12Z" fill="#333" />
        <circle cx="46.5" cy="10" r="10" fill="#333" />
        <path d="M28 42C28 54 36.5 63 46.5 63C56.5 63 65 54 65 42C65 30 56.5 24 46.5 24C36.5 24 28 30 28 42Z" fill="#FFDBAC" />
        <circle cx="40" cy="40" r="3" fill="#333" />
        <circle cx="53" cy="40" r="3" fill="#333" />
        <path d="M42 52C42 52 44 56 46.5 56C49 56 51 52 51 52" stroke="#E57373" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M21 75C21 75 15 85 15 95V105H78V95C78 85 72 75 72 75H21Z" fill="#007bff" />
        <path d="M30 75L60 105" stroke="white" strokeWidth="8" strokeOpacity="0.2" />
        <circle cx="65" cy="85" r="5" fill="white" />
        <circle cx="65" cy="85" r="3" fill="#007bff" />
    </g>
  </svg>
);

export const IconLadyChef = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="8" r="5" fill="currentColor" fillOpacity="0.2"/>
    <path d="M12 13c3.3137 0 6 2.6863 6 6v2H6v-2c0 -3.3137 2.68629 -6 6 -6z" fill="currentColor" fillOpacity="0.2"/>
    <path d="M12 2c-3.31371 0 -6 2.68629 -6 6s2.68629 6 6 6s6 -2.6863 6 -6s-2.6863 -6 -6 -6zm0 10c-2.20914 0 -4 -1.7909 -4 -4s1.79086 -4 4 -4s4 1.7909 4 4s-1.7909 4 -4 4z" fill="currentColor"/>
    <path d="M7 19c0 -2.7614 2.23858 -5 5 -5s5 2.2386 5 5v2H7v-2z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 4c0 -1.5 1.5 -3 3 -3s3 1.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="10" cy="8" r="0.5" fill="currentColor"/>
    <circle cx="14" cy="8" r="0.5" fill="currentColor"/>
  </svg>
);

export const IconCamera = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-0.38 0.054 -0.757 0.112 -1.134 0.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0 -1.067 -0.75 -1.994 -1.802 -2.169a47.865 47.865 0 0 0 -1.134 -0.175 2.31 2.31 0 0 1 -1.64 -1.055l-0.822 -1.316a2.192 2.192 0 0 0 -1.736 -1.039 48.774 48.774 0 0 0 -5.232 0 2.192 2.192 0 0 0 -1.736 1.039l-0.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1 -9 0 4.5 4.5 0 0 1 9 0zM18.75 10.5h0.008v0.008h-0.008V10.5z" />
  </svg>
);

export const IconVideo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72 -4.72a0.75 0.75 0 0 1 1.28 0.53v11.38a0.75 0.75 0 0 1 -1.28 0.53l-4.72 -4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25 -2.25v-9a2.25 2.25 0 0 0 -2.25 -2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25z" />
  </svg>
);

export const IconBriefcase = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094 -0.787 2.036 -1.872 2.18 -2.087 0.277 -4.216 0.42 -6.378 0.42s-4.291 -0.143 -6.378 -0.42c-1.085 -0.144 -1.872 -1.086 -1.872 -2.18v-4.25m16.5 0a2.18 2.18 0 0 0 0.75 -1.661V8.706c0 -1.081 -0.768 -2.015 -1.837 -2.175a48.114 48.114 0 0 0 -3.413 -0.387m4.5 8.006c-0.194 0.165 -0.42 0.295 -0.673 0.38A23.978 23.978 0 0 1 12 15.75c-2.648 0 -5.195 -0.429 -7.577 -1.22a2.016 2.016 0 0 1 -0.673 -0.38m0 0a2.18 2.18 0 0 1 -0.75 -1.661V8.706c0 -1.081 0.768 -2.015 1.837 -2.175a48.111 48.111 0 0 1 3.413 -0.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0 -2.25 2.25v0.894m7.5 0a48.667 48.667 0 0 0 -7.5 0M12 12.75h0.008v0.008H12v-0.008z" />
  </svg>
);

export const IconChefHat = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 1 15 0v0.75a2.25 2.25 0 0 1 -2.25 2.25h-0.75v3.75a1.5 1.5 0 0 1 -1.5 1.5h-6a1.5 1.5 0 0 1 -1.5 -1.5V15h-0.75A2.25 2.25 0 0 1 4.5 12.75V12z" />
  </svg>
);

export const IconShoppingList = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h0.007v0.008H3.75V6.75zm0.375 0a0.375 0 1 1 -0.75 0 0.375 0.375 0 0 1 0.75 0zM3.75 12h0.007v0.008H3.75V12zm0.375 0a0.375 0 1 1 -0.75 0 0.375 0.375 0 0 1 0.75 0zm-0.375 5.25h0.007v0.008H3.75v-0.008zm0.375 0a0.375 0 1 1 -0.75 0 0.375 0.375 0 0 1 0.75 0z" />
  </svg>
);

export const IconFlame = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21a8.25 8.25 0 0 1 -5.962 -13.952A8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.361 -6.867 8.21 8.21 0 0 0 3 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 0.495 -7.467 5.99 5.99 0 0 0 -1.925 3.546 5.974 5.974 0 0 1 -2.133 -1A3.75 3.75 0 0 0 12 18z" />
  </svg>
);

export const IconClock = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1 -18 0 9 9 0 0 1 18 0z" />
  </svg>
);

export const IconUpload = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5 -9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

export const IconPlay = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0 -0.856 0.917 -1.398 1.667 -0.986l11.54 6.348a1.125 1.125 0 0 1 0 1.971l-11.54 6.347a1.125 1.125 0 0 1 -1.667 -0.985V5.653z" />
  </svg>
);

export const IconVolumeUp = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72 -4.72a0.75 0.75 0 0 1 1.28 0.53v15.88a0.75 0.75 0 0 1 -1.28 0.53l-4.72 -4.72H4.51c-0.88 0 -1.704 -0.507 -1.938 -1.354A9.01 9.01 0 0 1 2.25 12c0 -0.83 0.112 -1.633 0.322 -2.414 0.235 -0.847 1.058 -1.354 1.938 -1.354h2.24z" />
  </svg>
);

export const IconCheck = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9 -13.5" />
  </svg>
);

export const IconPlus = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5 -7.5h-15" />
  </svg>
);

export const IconArrowLeft = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5 -7.5M3 12h18" />
  </svg>
);

export const IconGlobe = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716 -6.747M12 21a9.004 9.004 0 0 1 -8.716 -6.747M12 21c2.485 0 4.5 -4.03 4.5 -9S14.485 3 12 3m0 18c-2.485 0 -4.5 -4.03 -4.5 -9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0 -7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0 -5.74 -1.1 -7.843 -2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 0.778 -0.099 1.533 -0.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0 -6.133 -0.815 -8.716 -2.247m0 0A9.015 9.015 0 0 1 3 12c0 -1.605 0.42 -3.113 1.157 -4.418" />
  </svg>
);

export const IconMap = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6 -6v8.25m0.503 3.498l4.875 -2.437c0.381 -0.19 0.622 -0.58 0.622 -1.006V4.82c0 -0.836 -0.88 -1.38 -1.628 -1.006l-3.869 1.934c-0.317 0.159 -0.69 0.159 -1.006 0L9.503 3.252a1.125 1.125 0 0 0 -1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 0.836 0.88 1.38 1.628 1.006l3.869 -1.934c0.317 -0.159 0.69 -0.159 1.006 0l4.994 2.497c0.317 0.159 0.69 0.159 1.006 0z" />
  </svg>
);

export const IconUtensils = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25V18a2.25 2.25 0 0 0 2.25 2.25h1.5A2.25 2.25 0 0 0 10.5 18V8.25m-6 0h6M19.5 8.25v9.75a0.75 0.75 0 0 1 -1.5 0V8.25m1.5 0V3.75a0.75 0.75 0 0 0 -0.75 -0.75H16.5a0.75 0.75 0 0 0 -0.75 0.75v4.5m1.5 0H19.5" />
  </svg>
);

export const IconCross = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const IconYoutube = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.615 3.184c-3.604 -0.246 -11.631 -0.245 -15.23 0 -3.897 0.266 -4.356 2.62 -4.385 8.816c0.029 6.185 0.484 8.549 4.385 8.816c3.6 0.245 11.626 0.246 15.23 0c3.897 -0.266 4.356 -2.62 4.385 -8.816c-0.029 -6.185 -0.484 -8.549 -4.385 -8.816zM9 16V8l8 3.993l-8 4.007z" />
  </svg>
);

export const IconChat = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75h6.75m-6.75 3h4.5m-7.875 6.364A9 9 0 1 1 3.375 4.636a9.003 9.003 0 0 1 17.25 4.114c0 2.41 -0.952 4.62 -2.5 6.25L21 21l-6.364 -3.886z" />
  </svg>
);

export const IconSend = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0 1 21.485 12a59.77 59.77 0 0 1 -18.215 8.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const IconUser = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1 -7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0 -5.216 -0.584 -7.499 -1.632z" />
  </svg>
);

export const IconLock = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0 -9 0v3.75m-0.75 11.25h10.5a2.25 2.25 0 0 0 2.25 -2.25v-6.75a2.25 2.25 0 0 0 -2.25 -2.25H6.75a2.25 2.25 0 0 0 -2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25z" />
  </svg>
);

export const IconMessage = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a0.375 0.375 0 1 1 -0.75 0 0.375 0.375 0 0 1 0.75 0zm0 0H8.25m4.125 0a0.375 0.375 0 1 1 -0.75 0 0.375 0.375 0 0 1 0.75 0zm0 0H12m4.125 0a0.375 0.375 0 1 1 -0.75 0 0.375 0.375 0 0 1 0.75 0zm0 0h-0.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227c1.129 0.166 2.27 0.293 3.423 0.379c0.35 0.026 0.67 0.21 0.865 0.501L12 21l2.755 -4.133a1.14 1.14 0 0 1 0.865 -0.501c1.153 -0.086 2.294 -0.213 3.423 -0.379c1.584 -0.233 2.707 -1.626 2.707 -3.227V6.741c0 -1.602 -1.123 -2.995 -2.707 -3.228A48.394 48.394 0 0 0 12 3c-2.392 0 -4.744 0.175 -7.043 0.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

export const IconClose = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const IconLogout = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0 -2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25 -2.25V15m3 0l3 -3m0 0l-3 -3m3 3H9" />
  </svg>
);

export const IconHeart = ({ className = "w-6 h-6", fill = "none" }: { className?: string, fill?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0 -2.485 -2.099 -4.5 -4.688 -4.5c-1.935 0 -3.597 1.126 -4.312 2.733c-0.715 -1.607 -2.377 -2.733 -4.313 -2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9 -4.78 9 -12z" />
  </svg>
);

export const IconStar = ({ className = "w-6 h-6", fill = "none" }: { className?: string, fill?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={fill} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a0.562 0.562 0 0 1 1.04 0l2.125 5.111a0.563 0.563 0 0 0 0.475 0.345l5.518 0.442a0.562 0.562 0 0 1 0.321 0.988l-4.204 3.602a0.563 0.563 0 0 0 -0.182 0.557l1.285 5.385a0.562 0.562 0 0 1 -0.84 0.61l-4.725 -2.885a0.563 0.563 0 0 0 -0.586 0L6.982 20.54a0.562 0.562 0 0 1 -0.84 -0.61l1.285 -5.386a0.562 0.562 0 0 0 -0.182 -0.557l-4.204 -3.602a0.563 0.563 0 0 1 0.321 -0.988l5.518 -0.442a0.563 0.563 0 0 0 0.475 -0.345L11.48 3.5z" />
    </svg>
);

export const IconSearch = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197 -5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
  </svg>
);

export const IconButterfly = ({ className = "w-6 h-6", style }: { className?: string, style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 4.5c0.3 0 0.5 0.3 0.5 0.5v1.5a0.5 0.5 0 0 1 -1 0V5c0 -0.2 0.2 -0.5 0.5 -0.5zm-4.3 2.1c0.3 -0.3 0.8 -0.1 1.1 0.2l0.5 0.6a0.5 0.5 0 0 1 -0.7 0.7l-0.5 -0.6c-0.3 -0.3 -0.4 -0.8 0 -1.1c-0.1 0.1 0.2 0 -0.4 0.2zm8.6 0c-0.3 -0.3 -0.8 -0.1 -1.1 0.2l-0.5 0.6a0.5 0.5 0 0 0 0.7 0.7l0.5 -0.6c0.3 -0.3 0.4 -0.8 0 -1.1c0.1 0.1 -0.2 0 0.4 0.2zM8.5 9c-0.3 0 -0.5 0.2 -0.5 0.5v1c0 0.3 0.2 0.5 0.5 0.5h7c0.3 0 0.5 -0.2 0.5 -0.5v-1c0 -0.3 -0.2 -0.5 -0.5 -0.5h-7zm-4.4 2.8c-0.2 -0.2 -0.2 -0.6 0 -0.8l0.8 -0.7c0.2 -0.2 0.6 -0.2 0.8 0l0.5 0.6a0.5 0.5 0 0 0 0.8 -0.6l-0.6 -0.7c-0.4 -0.4 -1.2 -0.4 -1.6 0l-0.8 0.7c-0.4 0.4 -0.4 1.1 0 1.5c0.1 0 0.2 0.1 0.2 0.1c-0.1 0 0 -0.1 -0.1 -0.1zm15.8 0c0.2 -0.2 0.2 -0.6 0 -0.8l-0.8 -0.7c-0.2 -0.2 -0.6 -0.2 -0.8 0l-0.5 0.6a0.5 0.5 0 0 1 -0.8 -0.6l0.6 -0.7c0.4 -0.4 1.2 -0.4 1.6 0l0.8 0.7c0.4 0.4 0.4 1.1 0 1.5c-0.1 0 -0.2 0.1 -0.2 0.1c0.1 0 0 -0.1 0.1 -0.1zM6.5 13c-0.3 0 -0.5 0.2 -0.5 0.5v2c0 0.3 0.2 0.5 0.5 0.5h0.5c0.3 0 0.5 -0.2 0.5 -0.5v-2c0 -0.3 -0.2 -0.5 -0.5 -0.5h-0.5zm11 0c-0.3 0 -0.5 0.2 -0.5 0.5v2c0 0.3 0.2 0.5 0.5 0.5h0.5c0.3 0 0.5 -0.2 0.5 -0.5v-2c0 -0.3 -0.2 -0.5 -0.5 -0.5h-0.5z" />
    <path fillOpacity="0.4" d="M18.5 8c-1.7 0 -3.2 0.8 -4.2 2c-1 -1.2 -2.5 -2 -4.2 -2C6.5 8 4 10.5 4 14c0 1.9 1 3.5 2.5 4.5c-0.5 -1 -1 -2.5 -1 -4c0 -2.5 1.5 -4 3.5 -4c1.2 0 2.2 0.5 3 1.2c0.8 -0.7 1.8 -1.2 3 -1.2c2 0 3.5 1.5 3.5 4c0 1.5 -0.5 3 -1 4c1.5 -1 2.5 -2.6 2.5 -4.5c0 -3.5 -2.5 -6 -6 -6z" />
  </svg>
);

export const IconWine = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1 -0.659 1.591L5 14.5M9.75 3.104c-0.251 0.023 -0.501 0.05 -0.75 0.082m0.75 -0.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 0.597 0.237 1.17 0.659 1.591L19.8 15.3M14.25 3.104c0.251 0.023 0.501 0.05 0.75 0.082M19.8 15.3l-1.57 0.393a9.065 9.065 0 0 1 -6.23 -0.693a9.065 9.065 0 0 0 -6.23 -0.693L5 14.5m14.8 0.8l1.402 1.402c1.232 1.232 0.65 3.318 -1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0 -5.491 -0.235 -8.135 -0.687c-1.718 -0.293 -2.3 -2.3 -1.067 -3.61L5 14.5" />
  </svg>
);

export const IconLightbulb = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5 -4.5c0 -3.3137 -2.6863 -6 -6 -6s-6 2.6863 -6 6a6.01 6.01 0 0 0 1.5 4.5ZM13.5 4.5a1.5 1.5 0 1 1 -3 0 1.5 1.5 0 0 1 3 0ZM15.75 9c0 3.682 -1.614 7.008 -4.108 9.375a1.125 1.125 0 0 1 -1.284 0C7.864 16.008 6.25 12.682 6.25 9a6.25 6.25 0 0 1 9.5 0z" />
  </svg>
);

export const IconCalendar = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25 -2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h0.008v0.008H12v-0.008zm0 3h0.008v0.008H12v-0.008zm0 2.25h0.008v0.008H12v-0.008zm-2.25 -2.25h0.008v0.008H9.75v-0.008zm0 2.25h0.008v0.008H9.75v-0.008zm-2.25 -2.25h0.008v0.008H7.5v-0.008zm0 2.25h0.008v0.008H7.5v-0.008zm6.75 -4.5h0.008v0.008h-0.008v-0.008zm0 2.25h0.008v0.008h-0.008v-0.008zm0 2.25h0.008v0.008h-0.008v-0.008zm2.25 -4.5h0.008v0.008H16.5v-0.008zm0 2.25h0.008v0.008H16.5v-0.008z" />
  </svg>
);

export const IconRupee = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3 -3h1.5a3 3 0 1 0 0 -6M21 12a9 9 0 1 1 -18 0 9 9 0 0 1 18 0z" />
  </svg>
);

export const IconUsers = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625 0.372a9.337 9.337 0 0 0 4.121 -0.952a4.125 4.125 0 0 0 -7.533 -2.493M15 19.128v-0.003c0 -1.113 -0.285 -2.16 -0.786 -3.07M15 19.128v0.106A12.318 12.318 0 0 1 8.624 21c-2.331 0 -4.512 -0.645 -6.374 -1.766l-0.001 -0.109a6.375 6.375 0 0 1 11.964 -3.07M12 6.375a3.375 3.375 0 1 1 -6.75 0a3.375 3.375 0 0 1 6.75 0zm8.25 2.25a2.625 2.625 0 1 1 -5.25 0a2.625 2.625 0 0 1 5.25 0z" />
  </svg>
);

export const IconExternalLink = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

export const IconCart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c0.51 0 0.955 0.343 1.087 0.835l0.383 1.437M7.5 14.25a3 3 0 0 0 -3 3h15.75m-12.75 -3h11.218c1.121 -2.3 2.1 -4.684 2.924 -7.138a60.114 60.114 0 0 0 -16.536 -1.84M7.5 14.25L5.106 5.272M6 20.25a0.75 0.75 0 1 1 -1.5 0 0.75 0.75 0 0 1 1.5 0zm12.75 0a0.75 0 1 1 -1.5 0 0.75 0.75 0 0 1 1.5 0z" />
  </svg>
);

export const IconTrophy = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3 -3m9 0v-3.375c0 -0.621 -0.503 -1.125 -1.125 -1.125h-0.871M7.5 18.75v-3.375c0 -0.621 0.504 -1.125 1.125 -1.125h0.872m5.007 0H9.497m5.007 0V5.625a2.25 2.25 0 1 1 4.5 0v3.375c0 1.109 -0.846 2.025 -1.921 2.125a4.125 4.125 0 0 0 -1.889 1.875M9.497 14.25V5.625a2.25 2.25 0 0 0 -4.5 0v3.375c0 1.109 0.846 2.025 1.921 2.125a4.125 4.125 0 0 1 1.889 1.875m4.345 -4.5a4.125 4.125 0 1 1 -7.252 0a4.125 4.125 0 0 1 7.252 0z" />
  </svg>
);

export const IconShield = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268 -0.63 2.39 -1.593 3.068a3.745 3.745 0 0 1 -1.043 3.296a3.745 3.745 0 0 1 -3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0 -2.39 -0.63 -3.068 -1.593a3.746 3.746 0 0 1 -3.296 -1.043a3.745 3.745 0 0 1 -1.043 -3.296A3.745 3.745 0 0 1 3 12c0 -1.268 0.63 -2.39 1.593 -3.068a3.745 3.745 0 0 1 1.043 -3.296a3.746 3.746 0 0 1 3.296 -1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39 0.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043a3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
  </svg>
);

export const IconWallet = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0 -2.25 -2.25H15a3 3 0 1 1 -6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1 -2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0 -2.25 -2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0 -2.25 -2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
  </svg>
);

export const IconDashboard = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1 -2.25 2.25H6a2.25 2.25 0 0 1 -2.25 -2.25V6zM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1 -2.25 2.25H6a2.25 2.25 0 0 1 -2.25 18v-2.25zM13.5 6a2.25 2.25 0 0 1 2.25 -2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1 -2.25 -2.25V6zM13.5 15.75a2.25 2.25 0 0 1 2.25 -2.25H18a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1 -2.25 2.25h-2.25a2.25 2.25 0 0 1 -2.25 -2.25v-2.25z" />
  </svg>
);

export const IconCalendarCheck = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-0.065 0.21 -0.1 0.433 -0.1 0.664c0 0.414 0.336 0.75 0.75 0.75h4.5a0.75 0.75 0 0 0 0.75 -0.75a2.25 2.25 0 0 0 -0.1 -0.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867 0.668 2.15 1.586m-5.8 0c-0.376 0.023 -0.75 0.05 -1.124 0.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-0.621 0 -1.125 0.504 -1.125 1.125v11.25c0 0.621 0.504 1.125 1.125 1.125h9.75c0.621 0 1.125 -0.504 1.125 -1.125V9.375c0 -0.621 -0.504 -1.125 -1.125 -1.125H8.25zM6.75 12h0.008v0.008H6.75V12zm0 3h0.008v0.008H6.75V15zm0 3h0.008v0.008H6.75V18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.75h-0.375v0.008H20.25V6.75zm0 3h-0.375v0.008H20.25V9.75zm0 3h-0.375v0.008H20.25V12.75zm0 3h-0.375v0.008H20.25V15.75zm0 3h-0.375v0.008H20.25V18.75z" />
  </svg>
);

export const IconMenu = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const IconSettings = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c0.09 -0.542 0.56 -0.94 1.11 -0.94h2.593c0.55 0 1.02 0.398 1.11 0.94l0.213 1.281c0.063 0.374 0.313 0.686 0.645 0.87c0.074 0.04 0.147 0.083 0.22 0.127c0.324 0.196 0.72 0.257 1.075 0.124l1.217 -0.456a1.125 1.125 0 0 1 1.37 0.49l1.296 2.247a1.125 1.125 0 0 1 -0.26 1.431l-1.003 0.827c-0.293 0.24 -0.438 0.613 -0.431 0.992a6.759 6.759 0 0 1 0 0.255c-0.007 0.378 0.138 0.75 0.43 0.99l1.005 0.828c0.424 0.35 0.534 0.954 0.26 1.43l-1.298 2.247a1.125 1.125 0 0 1 -1.369 0.491l-1.217 -0.456c-0.355 -0.133 -0.75 -0.072 -1.076 0.124a6.57 6.57 0 0 1 -0.22 0.128c-0.331 0.183 -0.581 0.495 -0.644 0.869l-0.213 1.28c-0.09 0.543 -0.56 0.941 -1.11 0.941h-2.594c-0.55 0 -1.02 -0.398 -1.11 -0.94l-0.213 -1.281c-0.062 -0.374 -0.312 -0.686 -0.644 -0.87a6.52 6.52 0 0 1 -0.22 -0.127c-0.325 -0.196 -0.72 -0.257 -1.076 -0.124l-1.217 0.456a1.125 1.125 0 0 1 -1.369 -0.49l-1.297 -2.247a1.125 1.125 0 0 1 0.26 -1.431l1.004 -0.827c0.292 -0.24 0.437 -0.613 0.43 -0.992a6.932 6.932 0 0 1 0 -0.255c0.007 -0.378 -0.138 -0.75 -0.43 -0.99l-1.004 -0.828a1.125 1.125 0 0 1 -0.26 -1.43l1.297 -2.247a1.125 1.125 0 0 1 1.37 -0.491l1.216 0.456c0.356 0.133 0.751 0.072 1.076 -0.124c0.072 -0.044 0.146 -0.087 0.22 -0.128c0.332 -0.183 0.582 -0.495 0.644 -0.869l0.214 -1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1 -6 0a3 3 0 0 1 6 0z" />
  </svg>
);

export const IconFileText = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0 -3.375 -3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0 -3.375 -3.375H8.25m2.25 0H5.625c-0.621 0 -1.125 0.504 -1.125 1.125v17.25c0 0.621 0.504 1.125 1.125 1.125h12.75c0.621 0 1.125 -0.504 1.125 -1.125V11.25a9 9 0 0 0 -9 -9z" />
  </svg>
);

export const IconBarChart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125c0 -0.621 0.504 -1.125 1.125 -1.125h2.25c0.621 0 1.125 0.504 1.125 1.125v6.75c0 0.621 -0.504 1.125 -1.125 1.125h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75zM9.75 8.625c0 -0.621 0.504 -1.125 1.125 -1.125h2.25c0.621 0 1.125 0.504 1.125 1.125v11.25c0 0.621 -0.504 1.125 -1.125 1.125h-2.25a1.125 1.125 0 0 1 -1.125 -1.125V8.625zM16.5 4.125c0 -0.621 0.504 -1.125 1.125 -1.125h2.25c0.621 0 1.125 0.504 1.125 1.125v15.75c0 0.621 -0.504 1.125 -1.125 1.125h-2.25a1.125 1.125 0 0 1 -1.125 -1.125V4.125z" />
  </svg>
);

export const IconPieChart = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5z" />
  </svg>
);

export const IconActivity = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5 -11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export const IconDocument = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0 -3.375 -3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0 -3.375 -3.375H8.25m2.25 0H5.625c-0.621 0 -1.125 0.504 -1.125 1.125v17.25c0 0.621 0.504 1.125 1.125 1.125h12.75c0.621 0 1.125 -0.504 1.125 -1.125V11.25a9 9 0 0 0 -9 -9z" />
  </svg>
);

export const IconFilter = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455 0.232 8.083 0.678c0.533 0.09 0.917 0.556 0.917 1.096v1.044a2.25 2.25 0 0 1 -0.659 1.591l-5.432 5.432a2.25 2.25 0 0 0 -0.659 1.591v2.927a2.25 2.25 0 0 1 -1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0 -0.659 -1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0 -0.54 0.384 -1.006 0.917 -1.096A48.32 48.32 0 0 1 12 3z" />
  </svg>
);

export const IconRefresh = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-0.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803 -3.7M4.031 9.865a8.25 8.25 0 0 1 13.803 -3.7l3.181 3.182m0 -4.991v4.99" />
  </svg>
);

export const IconCreditCard = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25 -2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0 -2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5z" />
  </svg>
);

export const IconDownload = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const IconHistory = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1 -18 0 9 9 0 0 1 18 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 -5.385 4.365 -9.75 9.75 -9.75s9.75 4.365 9.75 9.75s-4.365 9.75 -9.75 9.75S2.25 17.385 2.25 12zM19.61 14.896c-0.355 0.966 -1.058 1.782 -1.939 2.244" />
  </svg>
);

export const IconBank = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9 -6l9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0 -5.056 0.2 -7.5 0.582V21M3 21h18M12 6.75h0.008v0.008H12V6.75z" />
  </svg>
);