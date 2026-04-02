/**
 * Spectre.io Live Patch - Auto Mobile Scaler (V1.2)
 * Fetched via GitHub for live mobile layout adjustments without APK rebuilds!
 */

(function() {
    console.log('Spectre Live Patch: V1.2 - Executing robust Mobile Auto-Scaler...');

    // 1. Force the document to obey the boundaries and inject some hard overrides.
    var style = document.createElement('style');
    style.innerHTML = `
        /* General safety for small screens */
        html, body {
            overflow: hidden !important; 
            touch-action: none !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* Enforce absolute max limits on all menus to prevent screen blowout */
        .opensett-data, .popup-data, #rsoverlay, #divtl {
            max-width: 95vw !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
            transform-origin: center center !important;
        }

        /* Chat placement */
        #chat_holder {
            bottom: 5px !important;
            left: 5px !important;
            transform: scale(0.8) !important;
            transform-origin: bottom left !important;
        }
        
        /* Nickname placeholder and inputs */
        input[name="nick"], input[type="text"] {
            width: 80% !important;
            max-width: 300px !important;
            height: 45px !important;
            font-size: 18px !important;
            text-align: center !important;
            margin: 10px auto !important;
            display: block !important;
            border-radius: 8px !important;
        }

        /* Beef up touch targets for mobile */
        .mybutton, .myPlayButton, .mygb, .mysb, .mycs, .mypb, .savekey {
            padding: 15px 25px !important;
            font-size: 18px !important;
            min-height: 48px !important;
            min-width: 120px !important;
            margin: 5px !important;
            border-radius: 12px !important;
            box-sizing: border-box !important;
        }
        
        /* Stop huge logos pushing everything out */
        img {
            max-width: 80vw !important;
            height: auto !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Aggressive JS Scaling Loop
    // Because NTL uses hardcoded inline pixels (e.g. left: 50%; margin-left: -300px), 
    // CSS rules alone won't always work. We must calculate the viewport and override.
    function applyMobileFixes() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        
        // We only need to fix if the screen is "mobile" size (e.g. width under 850px)
        if (w > 850) return; 

        var scaleRatio = w / 800; // If NTL expects 800px, we scale down by this ratio to fit.

        // Loop over direct children of body that look like UI panels
        var elements = document.querySelectorAll('body > div');
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var z = parseInt(el.style.zIndex || 0, 10);
            
            // Only affect high z-index elements (UI), skip background or canvas
            if (z >= 10 && el.id !== 'chat_holder' && el.style.display !== 'none') {
                
                // Target the main login UI (often absolutely positioned in center)
                if (el.style.left === '50%' || el.style.position === 'absolute') {
                    
                    // Reset NTL's hardcoded fixed margin logic and use CSS transform
                    el.style.left = '50%';
                    el.style.marginLeft = '0px'; 
                    
                    // The magic trick to perfectly center and scale any NTL container:
                    el.style.transform = 'translate(-50%, 0) scale(' + scaleRatio + ')';
                    el.style.transformOrigin = 'top center';
                    
                    // If it's pushed way down, adjust its top
                    if (parseInt(el.style.top || 0, 10) > 100) {
                        el.style.top = '15%'; // Move it up slightly on mobile
                    }
                }
            }
        }
        
        // Also specifically fix any logo images inside a div
        var imgs = document.querySelectorAll('img');
        for (var j = 0; j < imgs.length; j++) {
            if (imgs[j].src && (imgs[j].src.indexOf('logo') !== -1 || imgs[j].src.indexOf('slogo') !== -1)) {
                imgs[j].style.width = '100%'; 
                imgs[j].style.maxWidth = '300px'; 
                imgs[j].style.height = 'auto';
                imgs[j].style.display = 'block';
                imgs[j].style.margin = '0 auto';
                if (imgs[j].parentElement) {
                    imgs[j].parentElement.style.width = '100%';
                    imgs[j].parentElement.style.textAlign = 'center';
                }
            }
        }
    }

    // Run this several times as NTL initializes and injects different components
    setInterval(applyMobileFixes, 2000); // Check and enforce layout every 2 seconds

})();
