import React, { useState, useRef, useEffect } from 'react';
import './Joystick.css';

interface JoystickProps {
  onMove: (angle: number, distance: number) => void;
  onEnd: () => void;
}

const Joystick: React.FC<JoystickProps> = ({ onMove, onEnd }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = e.clientX - centerX;
    let deltaY = e.clientY - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxRadius = rect.width / 2;

    if (distance > maxRadius) {
      deltaX = (deltaX / distance) * maxRadius;
      deltaY = (deltaY / distance) * maxRadius;
    }

    setPosition({ x: deltaX, y: deltaY });
    
    // Calculate angle in radians for Slither movement
    const angle = Math.atan2(deltaY, deltaX);
    onMove(angle, distance / maxRadius);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
    onEnd();
  };

  return (
    <div className="joystick-container">
      <div 
        ref={containerRef}
        className="joystick-base"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div 
          className="joystick-thumb"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.15s ease-out'
          }}
        />
      </div>
    </div>
  );
};

export default Joystick;
