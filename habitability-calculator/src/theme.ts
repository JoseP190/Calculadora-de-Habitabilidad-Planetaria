import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1A0B2E',
      light: '#2A1B3D',
      dark: '#0F0720',
    },
    background: {
      default: '#FFFFFF',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#1A0B2E',
      secondary: 'rgba(26, 11, 46, 0.7)',
    }
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    h3: {
      fontSize: '2.8rem',
      fontWeight: 800,
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      background: 'linear-gradient(90deg, #1A0B2E 0%, #2A1B3D 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '2rem',
    },
    h4: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '0.15em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      marginBottom: '1.5rem',
    },
    h6: {
      fontSize: '1.2rem',
      fontWeight: 500,
      letterSpacing: '0.08em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.05em',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '0.9rem',
      letterSpacing: '0.04em',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
          minHeight: '100vh',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: '2rem',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 8px 32px rgba(26, 11, 46, 0.08)',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 6,
          padding: '15px 0',
          '& .MuiSlider-thumb': {
            height: 18,
            width: 18,
            backgroundColor: '#1A0B2E',
            border: '2px solid #FFFFFF',
            boxShadow: '0 0 10px rgba(26, 11, 46, 0.2)',
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0 0 0 8px rgba(26, 11, 46, 0.16)',
            },
          },
          '& .MuiSlider-track': {
            background: 'linear-gradient(90deg, #1A0B2E 0%, #2A1B3D 100%)',
            border: 'none',
            height: 6,
          },
          '& .MuiSlider-rail': {
            background: 'rgba(26, 11, 46, 0.1)',
            height: 6,
          },
          '& .MuiSlider-mark': {
            backgroundColor: '#1A0B2E',
            height: 6,
          },
          '& .MuiSlider-markLabel': {
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(26, 11, 46, 0.7)',
            top: '32px',
          },
          '& .MuiSlider-valueLabel': {
            fontSize: '0.8rem',
            background: '#1A0B2E',
            padding: '0.5rem 0.8rem',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 30px rgba(26, 11, 46, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '0.8rem 2rem',
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.05em',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 4px 15px rgba(26, 11, 46, 0.15)',
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 8px 32px rgba(26, 11, 46, 0.08)',
          overflow: 'hidden'
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 32,
          padding: '0 12px',
          background: 'rgba(26, 11, 46, 0.08)',
          color: '#1A0B2E',
          border: '1px solid rgba(26, 11, 46, 0.12)',
          '&:hover': {
            background: 'rgba(26, 11, 46, 0.12)',
          },
        },
        label: {
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '0.03em',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 60,
          height: 34,
          padding: 7,
        },
        switchBase: {
          padding: 8,
          '&.Mui-checked': {
            transform: 'translateX(26px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: '#1A0B2E',
            },
          },
        },
        thumb: {
          width: 18,
          height: 18,
          backgroundColor: '#fff',
          boxShadow: '0 2px 4px rgba(26, 11, 46, 0.2)',
        },
        track: {
          borderRadius: 17,
          border: '1px solid rgba(26, 11, 46, 0.2)',
          backgroundColor: 'rgba(26, 11, 46, 0.1)',
          opacity: 1,
        },
      },
    },
  },
}); 