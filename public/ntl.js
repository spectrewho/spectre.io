/**
 * Spectre.io - NTL Universal Loader (Phase 1.7)
 * This script is the entry point for the real NTL mod.
 * It injects the NTL CSS, jQuery, and the 8.6MB main-mt.js script.
 */

(function() {
    console.log('Spectre.io: Initializing REAL NTL Mod...');

    // 1. Initalize the NTL Environment
    window.localStorage.setItem("loadbench", Date.now());
    window.localStorage.setItem("myscrversion", "9.18");

    // 2. Clean the Slither.io DOM as NTL does
    const removeId = (id) => {
        let el = document.getElementById(id);
        if (el) el.remove();
    };
    removeId("logoih");
    removeId("twt");
    removeId("fb");
    removeId("csrvh");

    // 3. Inject NTL CSS (Bootstrap)
    const injectCss = (url) => {
        let link = document.createElement("link");
        link.href = url + "?t=" + Date.now();
        link.rel = "stylesheet";
        link.type = "text/css";
        document.documentElement.appendChild(link);
    };

    // 4. Inject jQuery & NTL Core
    const injectScript = (url, callback) => {
        let script = document.createElement("script");
        script.src = url + "?t=" + Date.now();
        script.async = false;
        if (callback) script.onload = callback;
        document.documentElement.appendChild(script);
    };

    // Determine the base URL (where these files are located)
    // On the first load, we fetch from our latest GitHub build
    const baseUrl = "https://raw.githubusercontent.com/spectrewho/spectre.io/main/public/";

    try {
        injectCss(baseUrl + "bootstrap.css");
        
        // --- SPECTRE MOBILE PATCH (V1.9) ---
        let mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            /* Force everything to fit the screen */
            html, body { overflow: hidden !important; touch-action: none !important; }
            
            /* Scale down the massive NTL menus for mobile */
            #divtl, .opensett-data, #rsoverlay, .popup-data { 
                transform: scale(0.85); 
                transform-origin: top left; 
            }
            
            /* Make buttons easier to tap */
            .mybutton, .myPlayButton, .savekey, .mygb, .mysb, .mycs, .mypb {
                padding: 12px 20px !important;
                font-size: 16px !important;
                margin: 5px !important;
            }
            
            /* Fix chat position */
            #chat_holder { bottom: 20px !important; left: 20px !important; scale: 1.2; }
            
            /* Fix Leaderboard position */
            #divtl { top: 10px !important; right: 10px !important; left: auto !important; }
            
            /* Better hud visibility */
            .hud-indicator { font-size: 10px; opacity: 0.5; }
        `;
        document.head.appendChild(mobileStyle);

        // Force Mobile Viewport
        var viewport = document.querySelector("meta[name=viewport]");
        if (!viewport) {
            viewport = document.createElement("meta");
            viewport.name = "viewport";
            document.head.appendChild(viewport);
        }
        viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

        injectScript(baseUrl + "jquery-2.2.4.min.js", function() {
            console.log('Spectre.io: jQuery Loaded. Ready for NTL Core...');
            injectScript(baseUrl + "main-mt.js", function() {
                console.log('Spectre.io: REAL NTL CORE LOADED.');
                // alert('Spectre.io: Real NTL Mod is Active!');
            });
        });
    } catch (e) {
        console.error('Spectre.io: NTL Bootstrapping Failed!', e);
    }
})();
