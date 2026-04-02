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
