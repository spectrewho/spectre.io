/**
 * Spectre.io Live Patch - V2.0 Final Engine Integration
 * Touch-to-Mouse Emulator and Clean Viewport
 */

(function() {
    console.log('Spectre Live Patch V2.0: Final Native Emulator Active');

    // 1. Clean CSS - Stop fighting the layout, just prevent screen bleed
    var style = document.createElement('style');
    style.innerHTML = `
        /* Lock screen, let UI flow naturally */
        html, body {
            overflow: hidden !important; 
            touch-action: none !important; 
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
        }

        /* Prevent NTL panels from exploding past the phone screen */
        .opensett-data, .popup-data, #login, #playh, #smh {
            max-width: 95vw !important;
            max-height: 95vh !important;
            overflow-y: auto !important;
            box-sizing: border-box !important;
        }

        /* Ensure input typing is visible and big enough */
        input[type="text"] {
            min-height: 44px !important;
            font-size: 16px !important;
        }

        .mybutton, .myPlayButton, button {
            min-height: 44px !important;
            font-size: 18px !important;
            cursor: pointer !important;
        }

        /* Hide unnecessary text to save space */
        .slogan { display: none !important; }
        
        /* Make sure chat box and leaderboard stay inside edges */
        #chat_holder { left: 5px !important; bottom: 5px !important; top: auto !important; transform-origin: bottom left !important; transform: scale(0.8) !important; }
        #divtl { right: 5px !important; top: 5px !important; left: auto !important; transform-origin: top right !important; transform: scale(0.8) !important; }
    `;
    document.head.appendChild(style);


    // 2. Universal Touch-to-Mouse Emulator
    // NTL buttons and select menus are programmed for desktop clicks.
    // This catches your finger taps and translates them into perfect left clicks.
    
    function simulateMouseEvent(type, touch) {
        var event = new MouseEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            clientX: touch.clientX,
            clientY: touch.clientY,
            screenX: touch.screenX,
            screenY: touch.screenY,
            buttons: 1
        });
        touch.target.dispatchEvent(event);
    }

    // Capture when finger touches screen
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
            var target = e.touches[0].target;
            // DO NOT intercept canvas (the game itself needs native touch for snake joystick)
            if (target.tagName !== 'CANVAS') {
                simulateMouseEvent('mousedown', e.touches[0]);
                // If it's an input box, pull up the keyboard
                if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA') {
                    target.focus();
                }
            }
        }
    }, { passive: false });

    // Capture when finger leaves screen
    document.addEventListener('touchend', function(e) {
        if (e.changedTouches.length > 0) {
            var target = e.changedTouches[0].target;
            if (target.tagName !== 'CANVAS') {
                simulateMouseEvent('mouseup', e.changedTouches[0]);
                simulateMouseEvent('click', e.changedTouches[0]);
            }
        }
    }, { passive: false });

})();
