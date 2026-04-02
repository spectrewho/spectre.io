import React, { useEffect, useState, useRef } from 'react';
import { fetchLatestNtl } from './services/NtlLoader';
import SpectrePlugin from './services/SpectrePlugin';
import './App.css';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ntlCode, setNtlCode] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const initializeNtl = async () => {
      const latestCode = await fetchLatestNtl();
      setNtlCode(latestCode);
    };
    initializeNtl();
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        setIsLoaded(true);
      };
    }
  }, []);

  useEffect(() => {
    if (isLoaded && ntlCode) {
      injectNtlNatively(ntlCode);
    }
  }, [isLoaded, ntlCode]);

  const injectNtlNatively = async (code: string) => {
    console.log('Spectre.io: Calling Native Injection Bridge...');
    try {
      const result = await SpectrePlugin.injectMod({ code });
      if (result.success) {
        console.log('Spectre.io: Native Injection SUCCESS');
      } else {
        console.error('Spectre.io: Native Injection FAILED');
      }
    } catch (e) {
      console.error('Spectre.io: Bridge Error:', e);
    }
  };

  return (
    <div className="spectre-overlay">
      <iframe 
        id="game-container" 
        ref={iframeRef}
        src="https://slither.io" 
        allow="autoplay; fullscreen"
      />
      
      {!isLoaded && <div className="loading-screen">Starting Spectre.io...</div>}
      
      {isLoaded && (
        <div className="hud-indicator">Spectre.io Pro Active</div>
      )}
    </div>
  );
};

export default App;
