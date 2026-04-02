/**
 * Spectre.io Live Patch - 100% Dynamic Responsive Layout (V1.3)
 * No hardcoded pixels. Uses Flexbox, VW/VH, and relative scaling.
 */

(function() {
    console.log('Spectre Live Patch V1.3: Pure Dynamic Layout Execution');

    // 1. Inject responsive CSS classes
    var style = document.createElement('style');
    style.innerHTML = `
        /* Lock screen to viewport, disable zooming/bouncing */
        html, body {
            overflow: hidden !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            touch-action: none !important;
        }

        /* The dynamic login container overrides */
        .spectre-dynamic-container {
            /* Fluid width based on screen size */
            width: 90vw !important;
            max-width: 450px !important;
            height: auto !important;
            max-height: 85vh !important;
            
            /* Pure dynamic centering without negative margins */
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin: 0 !important;
            
            /* Internal layout */
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            padding: 5% !important;
            box-sizing: border-box !important;
        }

        /* 100% responsive logo */
        .spectre-dynamic-logo {
            max-width: 100% !important;
            height: auto !important;
            margin-bottom: 3vh !important;
            object-fit: contain !important;
        }

        /* Fluid input fields */
        .spectre-dynamic-input {
            width: 100% !important;
            height: 8vh !important;
            min-height: 45px !important;
            font-size: clamp(16px, 4vw, 22px) !important;
            text-align: center !important;
            box-sizing: border-box !important;
            border-radius: 8px !important;
        }

        /* Fluid buttons */
        .spectre-dynamic-btn {
            width: 100% !important;
            padding: 3vh 0 !important;
            min-height: 50px !important;
            font-size: clamp(16px, 5vw, 24px) !important;
            margin-top: 2vh !important;
            box-sizing: border-box !important;
            border-radius: 12px !important;
            text-align: center !important;
        }

        /* Move chat strictly to bottom left dynamically */
        #chat_holder, .c_fl {
            left: 2vw !important;
            bottom: 2vh !important;
            top: auto !important;
            max-width: 80vw !important;
            transform: scale(0.85) !important;
            transform-origin: bottom left !important;
        }

        /* Leaderboard and server info dynamically tied to Top-Right */
        #divtl, .nsi {
            right: 2vw !important;
            top: 2vh !important;
            left: auto !important;
            transform: scale(0.8) !important;
            transform-origin: top right !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Intelligent DOM Walker
    // Instead of guessing IDs, it finds the Nickname input, walks UP the tree to find its main 
    // center wrapper, and applies the dynamic classes.
    function applyDynamicClasses() {
        // Find the exact nickname text box
        var nickTarget = document.querySelector('input[name="nick"], input[id="nick"]');
        
        if (nickTarget) {
            nickTarget.classList.add('spectre-dynamic-input');
            
            // Walk up to find the root UI panel that overlays the screen
            var parent = nickTarget.parentElement;
            var loginContainer = null;
            
            while (parent && parent.tagName !== 'BODY') {
                // The root login box usually has a high z-index and absolute positioning
                if (window.getComputedStyle(parent).position === 'absolute' && 
                    parseInt(window.getComputedStyle(parent).zIndex || 0) > 5) {
                    loginContainer = parent;
                    // Keep walking up just in case there's an even higher wrapper
                }
                parent = parent.parentElement;
            }

            // If we found the root UI panel, take full control of it
            if (loginContainer) {
                loginContainer.classList.add('spectre-dynamic-container');
                
                // Force all images inside it to behave
                var imgs = loginContainer.querySelectorAll('img');
                imgs.forEach(img => img.classList.add('spectre-dynamic-logo'));
                
                // Force play buttons to behave
                var playBtns = loginContainer.querySelectorAll('.myPlayButton, button');
                playBtns.forEach(btn => btn.classList.add('spectre-dynamic-btn'));
                
                // Fix NTL's hardcoded inline styles wiping out our CSS
                loginContainer.style.left = '50%';
                loginContainer.style.marginLeft = '0px';
                loginContainer.style.marginTop = '0px';
                loginContainer.style.width = '90vw';
            }
        }
    }

    // NTL dynamically creates DOM elements over several seconds.
    // We attach our dynamic listener on an interval so it dominates any NTL changes.
    setInterval(applyDynamicClasses, 500);

})();
