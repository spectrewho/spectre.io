/**
 * Spectre.io Live Patch - V1.5
 * Fully Dynamic Full-Screen Layout
 */

(function() {
    console.log('Spectre Live Patch V1.5: Applying Dynamic Fullscreen Constraints');

    // 1. Force the WebView to snap back to the actual device dimensions 
    // This totally disables the "square in a rectangle" OverviewMode zooming.
    var vp = document.querySelector('meta[name="viewport"]');
    if (!vp) {
        vp = document.createElement('meta');
        vp.name = 'viewport';
        document.head.appendChild(vp);
    }
    vp.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

    // 2. Inject fluid CSS rules
    var style = document.createElement('style');
    style.innerHTML = `
        /* Lock canvas to exact screen */
        html, body {
            overflow: hidden !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            touch-action: none !important;
            background-color: black !important;
        }

        /* Essential components bounds */
        #login, #playh, .spectre-dynamic-container {
            width: 90vw !important;
            max-width: 600px !important;
            height: auto !important;
            max-height: 90vh !important;
            
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin: 0 !important;
            
            overflow-y: auto !important;
            overflow-x: hidden !important;
            box-sizing: border-box !important;
            padding: 10px !important;
            z-index: 9999 !important;
        }

        /* Dynamically constrain the logo */
        img {
            max-width: 100% !important;
            height: auto !important;
            object-fit: contain !important;
        }
        
        .slogan { display: none !important; } /* Hide unnecessary text taking up space */

        /* Make inputs and buttons touch-friendly */
        input[type="text"], input[name="nick"] {
            width: 100% !important;
            height: 50px !important;
            font-size: 20px !important;
            margin-bottom: 10px !important;
            text-align: center !important;
            box-sizing: border-box !important;
        }

        .myPlayButton, button, .mybutton {
            width: 100% !important;
            min-height: 50px !important;
            font-size: 20px !important;
            box-sizing: border-box !important;
            margin: 5px 0 !important;
        }

        /* Force Canvas to fill entire background perfectly without scaling issues */
        canvas {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            max-height: none !important;
            transform: none !important;
        }

        /* Fix Leaderboard and Minimap */
        #divtl {
            transform: scale(0.7) !important;
            transform-origin: top right !important;
            right: 5px !important;
            top: 5px !important;
            left: auto !important;
        }
        
        #smh, .nsi {
            max-width: 100vw !important;
        }
        
        #chat_holder, .c_fl {
            transform: scale(0.8) !important;
            transform-origin: bottom left !important;
            left: 5px !important;
            bottom: 5px !important;
            top: auto !important;
        }
        
        /* Any generic NTL sub-menus should scale down instead of breaking bounds */
        .opensett-data, .popup-data {
            max-width: 90vw !important;
            max-height: 90vh !important;
            transform: translate(-50%, -50%) scale(0.8) !important;
            left: 50% !important;
            top: 50% !important;
            margin: 0 !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Dynamic Crawler to intercept NTL UI elements
    function enforceDynamicLayout() {
        // Target the exact nickname box
        var nick = document.querySelector('input[name="nick"], input[type="text"]');
        if (nick) {
            // Find its main parent container that defines the login window
            var container = nick.parentElement;
            while (container && container.tagName !== 'BODY') {
                if (window.getComputedStyle(container).position === 'absolute' || 
                    parseInt(window.getComputedStyle(container).zIndex || 0) > 5) {
                    
                    container.classList.add('spectre-dynamic-container');
                    
                    // Reset NTL's hardcoded margins which cause it to drift off-center
                    container.style.left = '50%';
                    container.style.top = '50%';
                    container.style.marginLeft = '0px';
                    container.style.marginTop = '0px';
                    break;
                }
                container = container.parentElement;
            }
        }
        
        // Ensure body background is clean
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
    }

    // NTL loads UI asynchronously, so we pulse our logic to ensure it catches everything
    setInterval(enforceDynamicLayout, 500);

})();
