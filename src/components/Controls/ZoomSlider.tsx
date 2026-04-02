import React from 'react';
import './ZoomSlider.css';

interface ZoomSliderProps {
  value: number;
  onChange: (value: number) => void;
}

const ZoomSlider: React.FC<ZoomSliderProps> = ({ value, onChange }) => {
  return (
    <div className="zoom-container">
      <div className="zoom-label">ZOOM</div>
      <input 
        type="range"
        min="0.1"
        max="1.5"
        step="0.05"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="zoom-slider"
      />
    </div>
  );
};

export default ZoomSlider;
