// Styles et animations pour Home.jsx
export const HOME_STYLES = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-bounce {
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  /* Ultra flash court (0.15s) */
  @keyframes ultraFlash {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .animate-ultraFlash {
    animation: ultraFlash 0.15s ease-out forwards;
  }

  /* Faisceau lumineux expansion */
  @keyframes beamExpand {
    0% {
      width: 0%;
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      width: 100%;
      opacity: 0.8;
    }
  }

  .animate-beamExpand {
    animation: beamExpand 0.8s ease-out forwards;
  }

  /* Film grain animation */
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 35%); }
    90% { transform: translate(-10%, 10%); }
  }

  .animate-grain {
    animation: grain 8s steps(10) infinite;
  }

  /* Scanline effect cyberpunk */
  @keyframes scanline {
    0% { top: 0%; }
    100% { top: 100%; }
  }

  .animate-scanline {
    animation: scanline 3s linear infinite;
  }

  /* Glitch effect */
  @keyframes glitch {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-2px); }
    40% { transform: translateX(2px); }
    60% { transform: translateX(-1px); }
    80% { transform: translateX(1px); }
  }

  .animate-glitch {
    animation: glitch 0.3s ease-in-out infinite;
  }
`;
