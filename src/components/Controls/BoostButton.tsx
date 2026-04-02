import React from 'react';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import './BoostButton.css';

interface BoostButtonProps {
  onPress: (isBoosting: boolean) => void;
}

const BoostButton: React.FC<BoostButtonProps> = ({ onPress }) => {
  const handlePointerDown = async () => {
    onPress(true);
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  const handlePointerUp = () => {
    onPress(false);
  };

  return (
    <div className="boost-container">
      <button 
        className="boost-button"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <span className="boost-label">BOOST</span>
      </button>
    </div>
  );
};

export default BoostButton;
