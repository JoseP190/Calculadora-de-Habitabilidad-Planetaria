import React from 'react';
import { Box } from '@mui/material';

interface PlanetVisualizationProps {
  parameters: {
    temperature: number;
    atmosphereDensity: number;
    carbonDioxideLevel: number;
    stormFrequency: number;
    solarRadiation: number;
    hasWater: boolean;
    magneticField: boolean;
  };
  habitabilityScore: number;
}

const PlanetVisualization: React.FC<PlanetVisualizationProps> = ({ parameters, habitabilityScore }) => {
  // Función para calcular el color del planeta basado en la habitabilidad
  const getPlanetColor = (score: number) => {
    if (score >= 80) return '#4CAF50'; // Verde para muy habitable
    if (score >= 60) return '#8BC34A'; // Verde claro para habitable
    if (score >= 40) return '#FFC107'; // Amarillo para moderadamente habitable
    if (score >= 20) return '#FF9800'; // Naranja para poco habitable
    return '#F44336'; // Rojo para inhabitable
  };

  // Función para calcular la opacidad de la atmósfera
  const getAtmosphereOpacity = (density: number) => {
    return Math.min(0.8, Math.max(0.2, density));
  };

  // Función para calcular la opacidad de las nubes
  const getCloudOpacity = (frequency: number) => {
    return Math.min(0.6, Math.max(0, frequency));
  };

  // Función para calcular la intensidad del anillo de radiación
  const getRadiationIntensity = (radiation: number) => {
    return Math.min(0.8, Math.max(0, radiation - 1));
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '300px',
        height: '300px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Anillo de radiación */}
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `2px solid rgba(255, 0, 0, ${getRadiationIntensity(parameters.solarRadiation)})`,
          animation: 'rotate 20s linear infinite'
        }}
      />

      {/* Atmósfera */}
      <Box
        sx={{
          position: 'absolute',
          width: '80%',
          height: '80%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, 
            rgba(255, 255, 255, ${getAtmosphereOpacity(parameters.atmosphereDensity)}), 
            rgba(255, 255, 255, 0))`,
          filter: 'blur(5px)'
        }}
      />

      {/* Nubes */}
      <Box
        sx={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 40% 40%, 
            rgba(255, 255, 255, ${getCloudOpacity(parameters.stormFrequency)}), 
            rgba(255, 255, 255, 0))`,
          filter: 'blur(8px)',
          animation: 'float 10s ease-in-out infinite'
        }}
      />

      {/* Planeta */}
      <Box
        sx={{
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: getPlanetColor(habitabilityScore),
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Agua */}
        {parameters.hasWater && (
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              left: '20%',
              width: '60%',
              height: '40%',
              background: 'rgba(0, 150, 255, 0.3)',
              borderRadius: '50%',
              filter: 'blur(2px)'
            }}
          />
        )}

        {/* Campo magnético */}
        {parameters.magneticField && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              borderRadius: '50%',
              border: '2px solid rgba(0, 150, 255, 0.3)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default PlanetVisualization; 