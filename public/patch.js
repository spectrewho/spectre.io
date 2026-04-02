/**
 * Spectre.io Live Patch - V1.6
 * AGGRESSIVE Full-Screen Rectangular Scaling
 */

(function() {
    console.log('Spectre Live Patch V1.6: Aggressive Rectangular Snap Active');

    // 1. Force the viewport to strict 1:1 rectangular mapping
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
    document.getElementsByTagName('head')[0].appendChild(meta);

    // 2. High-Priority CSS Overrides
    var style = document.createElement('style');
    style.innerHTML = `
        /* KILL THE SQUARE - Force the world to be a rectangle */
        html, body {
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #000 !important;
            position: fixed !important;
        }

        /* Target the main Slither canvas and force it to fill the screen */
        canvas {
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            max-height: none !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 1 !important;
            transform: none !important; /* Kill any desktop-scaling transforms */
        }

        /* Identify NTL's fixed-width containers and smash them */
        #login, #playh, .opensett-data, .popup-data, #rsoverlay, .spectre-dynamic-container {
            width: 90vw !important;
            max-width: 500px !important; /* Keep the menu readable but fit on screen */
            min-width: 0 !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            margin: 0 !important;
            position: absolute !important;
            z-index: 10 !important;
            height: auto !important;
            max-height: 95vh !important;
            overflow-y: auto !important;
        }

        /* Scale down components that are too big for mobile */
        #chat_holder {
            transform: scale(0.7) !important;
            transform-origin: bottom left !important;
            bottom: 5px !important;
            left: 5px !important;
        }

        #divtl {
            transform: scale(0.7) !important;
            transform-origin: top right !important;
            top: 5px !important;
            right: 5px !important;
            left: auto !important;
        }

        /* Kill any scrollbars */
        ::-webkit-scrollbar {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Mutation Observer to catch dynamic elements
    function zapLayout() {
        // Find every div with an ID and check for hardcoded widths
        var divs = document.getElementsByTagName('div');
        for (var i = 0; i < divs.length; i++) {
            var div = divs[i];
            var style = window.getComputedStyle(div);
            // If it has a hardcoded width larger than the screen, reset it
            if (parseInt(style.width) > window.innerWidth) {
                div.style.width = '100vw';
                div.style.maxWidth = '100vw';
            }
        }
        
        // Specifically fix the Slither.io "Outer" containers
        var outer = document.getElementById('outer-container');
        if (outer) outer.style.width = '100vw';
    }

    const observer = new MutationObserver(zapLayout);
    observer.observe(document.body, { childList: true, subtree: true });

    // Run immediately and then frequently
    zapLayout();
    setInterval(zapLayout, 1000);

})();
