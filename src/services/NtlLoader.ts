/**
 * NtlLoader Service - Phase 3 (Live Updates Ready)
 * 
 * This service now uses a bundled version of NTL for maximum reliability.
 * When you use Capacitor Appflow to update your app, just push your new NTL code
 * to the GitHub repository and all users will get the update instantly!
 */

const LOCAL_NTL_PATH = '/ntl.js';

export const fetchLatestNtl = async (): Promise<string | null> => {
  try {
    console.log('Loading bundled NTL mod...');
    const response = await fetch(LOCAL_NTL_PATH);
    if (!response.ok) throw new Error('Failed to load bundled NTL');
    
    return await response.text();
  } catch (error) {
    console.warn('Could not load bundled NTL mod.', error);
    return null;
  }
};

export const getInjectedScript = (code: string) => {
  return `
    (function() {
      console.log("Spectre.io: Injecting Live NTL Mod...");
      try {
        ${code}
      } catch (e) {
        console.error("Spectre.io: NTL Injection Error:", e);
      }

      // Input Relay for HUD
      window.addEventListener('message', (event) => {
        if (event.data.type === 'spectre_input') {
          const { input, data } = event.data;
          
          if (input === 'move' && window.xm && window.ym) {
            window.xm = data.x;
            window.ym = data.y;
          }
          
          if (input === 'boost') {
            const down = data.active ? 1 : 0;
            if (window.setAcceleration) window.setAcceleration(down);
            if (window.snake) window.snake.sp = data.active ? 2 : 1;
          }
          
          if (input === 'zoom' && window.snake) {
            window.snake.sc = data.value;
          }
        }
      });
    })();
  `;
};
