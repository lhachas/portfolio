import React from 'react';
import { Composition, Still } from 'remotion';
import { HeroCinematic, type HeroCinematicProps } from './HeroCinematic';

const defaultProps: HeroCinematicProps = {
  accentColor: '#3f87f5', // Azul Clásico oficial por defecto
  secondaryColor: '#cdb30c', // Oro Leonel Hacha Salazar
  emeraldColor: '#10b981', // Status operational
  backgroundColor: '#14171f', // Dark canvas 100% sólido
  gridSpacing: 80,
  speed: 1.0,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HeroCinematic"
        component={HeroCinematic}
        durationInFrames={300} // 10 segundos a 30 FPS en loop perfecto
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
      <Still
        id="HeroCinematicPoster"
        component={HeroCinematic}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
    </>
  );
};
