import React, { useEffect, useState, useRef } from 'react';
import { fetchLatestNtl, getInjectedScript } from './services/NtlLoader';
import Joystick from './components/Controls/Joystick';
import BoostButton from './components/Controls/BoostButton';
import ZoomSlider from './components/Controls/ZoomSlider';
import './App.css';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ntlCode, setNtlCode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.8);
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
    if (isLoaded && ntlCode && iframeRef.current) {
      injectNTL(iframeRef.current, ntlCode);
    }
  }, [isLoaded, ntlCode]);

  const injectNTL = (iframe: HTMLIFrameElement, code: string) => {
    console.log('Injecting NTL logic into Slither.io...');
    const script = getInjectedScript(code);
    
    // In Capacitor, we'll eventually use native bridge. 
    // For now, we simulate with postMessage for the Web build.
    iframe.contentWindow?.postMessage({ type: 'spectre_inject', script }, 'https://slither.io');
  };

  const sendInput = (type: string, data: any) => {
    iframeRef.current?.contentWindow?.postMessage({ 
      type: 'spectre_input', 
      input: type, 
      data 
    }, 'https://slither.io');
  };

  const handleMove = (angle: number, distance: number) => {
    // Convert angle to virtual mouse position around center
    const x = Math.cos(angle) * 200 + window.innerWidth / 2;
    const y = Math.sin(angle) * 200 + window.innerHeight / 2;
    sendInput('move', { x, y });
  };

  const handleBoost = (active: boolean) => {
    sendInput('boost', { active });
  };

  const handleZoomChange = (value: number) => {
    setZoom(value);
    sendInput('zoom', { value });
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
        <>
          <div className="hud-indicator">Spectre.io Pro</div>
          
          <Joystick 
            onMove={handleMove} 
            onEnd={() => sendInput('move_end', {})} 
          />
          
          <BoostButton onPress={handleBoost} />
          
          <ZoomSlider 
            value={zoom} 
            onChange={handleZoomChange} 
          />
        </>
      )}
    </div>
  );
};

export default App;
