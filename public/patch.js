/**
 * Spectre.io Live Patch - V1.7
 * Pure Fit Protocol
 */

(function() {
    console.log('Spectre Live Patch V1.7: Deep Native Fit Active');

    // 1. Give Slither.io back its native viewport setup.
    // If NTL deletes it, we put back the organic mobile scale.
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);

    // 2. Pure organic CSS lock. 
    // We do NOT use JavaScript to aggressively resize elements anymore.
    var style = document.createElement('style');
    style.innerHTML = `
        /* Lock physical screen boundaries organically */
        html, body {
            overflow: hidden !important; 
            margin: 0 !important;
            padding: 0 !important;
            position: fixed !important;
            top: 0; left: 0; right: 0; bottom: 0;
            touch-action: none !important;
        }

        /* Allow NTL elements to exist, but physically prevent them from bleeding past 100vw */
        .opensett-data, .popup-data, #login, #playh {
            max-width: 95vw !important;
            max-height: 95vh !important;
            box-sizing: border-box !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
        }

        /* Essential text legibility for mobile */
        input, select {
            font-size: 16px !important;
            max-width: 100% !important;
        }
        
        button, .mybutton, .myPlayButton {
            cursor: pointer !important;
        }
    `;
    document.head.appendChild(style);
})();
