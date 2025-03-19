import { useState, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Slider, 
  FormControlLabel, 
  Switch,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import kepler442b from './assets/planets/kepler442b.jpg';
import teegardensb from './assets/planets/teegardensb.jpg';
import toi700d from './assets/planets/toi700d.jpg';
import proximab from './assets/planets/proximab.jpg';
import trappist1e from './assets/planets/trappist1e.jpg';
import kepler186f from './assets/planets/kepler186f.jpg';
import k218b from './assets/planets/k218b.jpg';
import kepler62f from './assets/planets/kepler62f.jpg';
import kepler452b from './assets/planets/kepler452b.jpg';
import gliese667cc from './assets/planets/gliese667cc.jpg';
import earth from './assets/planets/earth.jpg';
import mars from './assets/planets/mars.jpg';
import venus from './assets/planets/venus.jpg';
import europa from './assets/planets/europa.jpg';
import PlanetVisualization from './components/PlanetVisualization';

interface PlanetParameters {
  temperature: number;
  gravity: number;
  hasWater: boolean;
  oxygenLevel: number;
  carbonDioxideLevel: number;
  distanceToStar: number;
  solarRadiation: number;
  volcanicActivity: number;
  stormFrequency: number;
  atmosphereDensity: number;
  magneticField: boolean;
  rotationPeriod: number;
}

interface ColonizationTechnology {
  name: string;
  description: string;
  requiredParameters: {
    [key: string]: number | boolean;
  };
  cost: number;
  timeToImplement: number;
  referenceUrl: string;
}

interface EducationalResource {
  title: string;
  description: string;
  category: 'colonization' | 'habitability' | 'technology' | 'research';
  url: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface ExoplanetData extends PlanetData {
  discoveryYear: number;
  starType: string;
  mass: number;
  radius: number;
  orbitalPeriod: number;
  potentialHabitability: number;
  nasaUrl: string;
  wikipediaUrl: string;
}

interface PlanetData {
  name: string;
  parameters: PlanetParameters;
  description: string;
  imageUrl: string;
}

const KNOWN_PLANETS: PlanetData[] = [
  {
    name: "Tierra",
    parameters: {
      temperature: 15,
      gravity: 1,
      hasWater: true,
      oxygenLevel: 21,
      carbonDioxideLevel: 0.04,
      distanceToStar: 1,
      solarRadiation: 1,
      volcanicActivity: 0.5,
      stormFrequency: 0.3,
      atmosphereDensity: 1,
      magneticField: true,
      rotationPeriod: 24
    },
    description: "Nuestro planeta natal, con condiciones óptimas para la vida.",
    imageUrl: earth
  },
  {
    name: "Marte",
    parameters: {
      temperature: -63,
      gravity: 0.38,
      hasWater: false,
      oxygenLevel: 0.13,
      carbonDioxideLevel: 95,
      distanceToStar: 1.52,
      solarRadiation: 0.43,
      volcanicActivity: 0.1,
      stormFrequency: 0.8,
      atmosphereDensity: 0.01,
      magneticField: false,
      rotationPeriod: 24.6
    },
    description: "El planeta rojo, con condiciones extremas pero potencialmente habitable en el futuro.",
    imageUrl: mars
  },
  {
    name: "Venus",
    parameters: {
      temperature: 462,
      gravity: 0.91,
      hasWater: false,
      oxygenLevel: 0,
      carbonDioxideLevel: 96.5,
      distanceToStar: 0.72,
      solarRadiation: 1.91,
      volcanicActivity: 0.9,
      stormFrequency: 0.6,
      atmosphereDensity: 92,
      magneticField: false,
      rotationPeriod: 243
    },
    description: "El planeta más caliente del sistema solar, con una atmósfera densa y tóxica.",
    imageUrl: venus
  },
  {
    name: "Europa",
    parameters: {
      temperature: -160,
      gravity: 0.13,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0,
      distanceToStar: 5.2,
      solarRadiation: 0.04,
      volcanicActivity: 0.2,
      stormFrequency: 0,
      atmosphereDensity: 0.0001,
      magneticField: true,
      rotationPeriod: 85.2
    },
    description: "Una de las lunas de Júpiter, con un océano subterráneo que podría albergar vida.",
    imageUrl: europa
  }
];

const COLONIZATION_TECHNOLOGIES: ColonizationTechnology[] = [
  {
    name: "Generador de Oxígeno",
    description: "Sistema para producir oxígeno a partir de CO2 y agua mediante electrólisis",
    requiredParameters: {
      carbonDioxideLevel: 0.5,
      hasWater: true
    },
    cost: 250000,
    timeToImplement: 2,
    referenceUrl: "https://www.nasa.gov/technology/oxygen-generation-system"
  },
  {
    name: "Hábitat Artificial",
    description: "Estructura presurizada con sistemas de soporte vital integrados",
    requiredParameters: {
      atmosphereDensity: 0.1
    },
    cost: 500000,
    timeToImplement: 3,
    referenceUrl: "https://www.nasa.gov/technology/deep-space-habitat"
  },
  {
    name: "Extractor de Hielo",
    description: "Sistema robótico para extraer y procesar hielo subterráneo",
    requiredParameters: {
      temperature: -50
    },
    cost: 300000,
    timeToImplement: 2,
    referenceUrl: "https://www.nasa.gov/technology/ice-mining"
  },
  {
    name: "Invernadero Hidropónico",
    description: "Sistema de cultivo vertical con iluminación LED y control de nutrientes",
    requiredParameters: {
      temperature: -20
    },
    cost: 150000,
    timeToImplement: 1,
    referenceUrl: "https://www.nasa.gov/technology/space-farming"
  },
  {
    name: "Sistema de Reciclaje de Agua",
    description: "Planta de tratamiento y reciclaje de aguas residuales",
    requiredParameters: {
      hasWater: true
    },
    cost: 200000,
    timeToImplement: 2,
    referenceUrl: "https://www.nasa.gov/technology/water-recycling"
  },
  {
    name: "Generador de Energía Nuclear",
    description: "Reactor nuclear compacto para suministro de energía",
    requiredParameters: {
      temperature: -100
    },
    cost: 1000000,
    timeToImplement: 4,
    referenceUrl: "https://www.nasa.gov/technology/kilopower"
  },
  {
    name: "Sistema de Protección Radiológica",
    description: "Escudos y materiales para proteger contra la radiación espacial",
    requiredParameters: {
      solarRadiation: 1.5
    },
    cost: 400000,
    timeToImplement: 2,
    referenceUrl: "https://www.nasa.gov/technology/radiation-protection"
  },
  {
    name: "Planta de Producción de Combustible",
    description: "Sistema para producir combustible a partir de recursos locales",
    requiredParameters: {
      carbonDioxideLevel: 0.3,
      hasWater: true
    },
    cost: 600000,
    timeToImplement: 3,
    referenceUrl: "https://www.nasa.gov/technology/in-situ-resource-utilization"
  },
  {
    name: "Sistema de Comunicaciones",
    description: "Red de satélites y antenas para comunicación con la Tierra",
    requiredParameters: {
      distanceToStar: 1.5
    },
    cost: 350000,
    timeToImplement: 2,
    referenceUrl: "https://www.nasa.gov/technology/space-communications"
  },
  {
    name: "Planta de Procesamiento de Minerales",
    description: "Sistema para extraer y procesar minerales locales",
    requiredParameters: {
      volcanicActivity: 0.3
    },
    cost: 450000,
    timeToImplement: 3,
    referenceUrl: "https://www.nasa.gov/technology/space-mining"
  }
];

const EDUCATIONAL_RESOURCES: EducationalResource[] = [
  {
    title: "Habitabilidad Planetaria: Una Revisión",
    description: "Análisis completo de los factores que determinan la habitabilidad de un planeta",
    category: 'habitability',
    url: "https://es.wikipedia.org/wiki/Habitabilidad_planetaria",
    difficulty: 'advanced'
  },
  {
    title: "Tecnologías de Terraformación",
    description: "Evaluación de tecnologías actuales y futuras para la modificación planetaria",
    category: 'technology',
    url: "https://es.wikipedia.org/wiki/Terraformaci%C3%B3n",
    difficulty: 'advanced'
  },
  {
    title: "Búsqueda de Vida en Exoplanetas",
    description: "Métodos y técnicas para la detección de vida en planetas distantes",
    category: 'research',
    url: "https://es.wikipedia.org/wiki/B%C3%BAsqueda_de_vida_extraterrestre",
    difficulty: 'advanced'
  },
  {
    title: "Atmósferas de Exoplanetas",
    description: "Análisis de la composición y evolución de atmósferas exoplanetarias",
    category: 'research',
    url: "https://es.wikipedia.org/wiki/Atm%C3%B3sfera_de_exoplanetas",
    difficulty: 'advanced'
  },
  {
    title: "Sistemas de Soporte Vital",
    description: "Diseño y optimización de sistemas de soporte vital para hábitats espaciales",
    category: 'technology',
    url: "https://es.wikipedia.org/wiki/Sistema_de_soporte_vital",
    difficulty: 'intermediate'
  },
  {
    title: "Recursos In-Situ",
    description: "Utilización de recursos locales para la colonización espacial",
    category: 'colonization',
    url: "https://es.wikipedia.org/wiki/Utilizaci%C3%B3n_de_recursos_in_situ",
    difficulty: 'intermediate'
  },
  {
    title: "Radiación Espacial",
    description: "Efectos de la radiación espacial en la habitabilidad planetaria",
    category: 'habitability',
    url: "https://es.wikipedia.org/wiki/Radiaci%C3%B3n_c%C3%B3smica",
    difficulty: 'advanced'
  },
  {
    title: "Sistemas de Energía Espacial",
    description: "Tecnologías de generación y almacenamiento de energía para colonias espaciales",
    category: 'technology',
    url: "https://es.wikipedia.org/wiki/Energ%C3%ADa_solar_espacial",
    difficulty: 'intermediate'
  }
];

const EXOPLANETS: ExoplanetData[] = [
  {
    name: "Kepler-442b",
    parameters: {
      temperature: 20,
      gravity: 1.3,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.1,
      distanceToStar: 0.409,
      solarRadiation: 0.7,
      volcanicActivity: 0.4,
      stormFrequency: 0.3,
      atmosphereDensity: 1.2,
      magneticField: true,
      rotationPeriod: 18.2
    },
    description: "Supertierra con condiciones muy similares a la Tierra, considerado uno de los candidatos más prometedores para la vida",
    imageUrl: kepler442b,
    discoveryYear: 2015,
    starType: "K",
    mass: 2.34,
    radius: 1.34,
    orbitalPeriod: 112.3,
    potentialHabitability: 98,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-442%20b",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Kepler-442b"
  },
  {
    name: "Teegarden's Star b",
    parameters: {
      temperature: 28,
      gravity: 1.1,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.08,
      distanceToStar: 0.025,
      solarRadiation: 1.15,
      volcanicActivity: 0.3,
      stormFrequency: 0.2,
      atmosphereDensity: 1.1,
      magneticField: true,
      rotationPeriod: 16.8
    },
    description: "Planeta rocoso en la zona habitable de una estrella cercana, con masa similar a la Tierra",
    imageUrl: teegardensb,
    discoveryYear: 2019,
    starType: "M",
    mass: 1.05,
    radius: 1.02,
    orbitalPeriod: 4.91,
    potentialHabitability: 95,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Teegarden's%20Star%20b",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Teegarden%27s_Star_b"
  },
  {
    name: "TOI-700 d",
    parameters: {
      temperature: 15,
      gravity: 1.1,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.05,
      distanceToStar: 0.163,
      solarRadiation: 0.86,
      volcanicActivity: 0.4,
      stormFrequency: 0.3,
      atmosphereDensity: 1.0,
      magneticField: true,
      rotationPeriod: 22.1
    },
    description: "Primer planeta del tamaño de la Tierra en zona habitable descubierto por TESS",
    imageUrl: toi700d,
    discoveryYear: 2020,
    starType: "M",
    mass: 1.72,
    radius: 1.19,
    orbitalPeriod: 37.4,
    potentialHabitability: 93,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/TOI-700%20d",
    wikipediaUrl: "https://es.wikipedia.org/wiki/TOI_700_d"
  },
  {
    name: "Proxima Centauri b",
    parameters: {
      temperature: 30,
      gravity: 1.2,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0,
      distanceToStar: 0.0485,
      solarRadiation: 0.65,
      volcanicActivity: 0.3,
      stormFrequency: 0.4,
      atmosphereDensity: 1.5,
      magneticField: true,
      rotationPeriod: 11.2
    },
    description: "El exoplaneta más cercano a la Tierra, potencialmente habitable",
    imageUrl: proximab,
    discoveryYear: 2016,
    starType: "M",
    mass: 1.17,
    radius: 1.1,
    orbitalPeriod: 11.2,
    potentialHabitability: 92,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Proxima%20Cen%20b",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Proxima_Centauri_b"
  },
  {
    name: "TRAPPIST-1e",
    parameters: {
      temperature: 15,
      gravity: 0.92,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0,
      distanceToStar: 0.029,
      solarRadiation: 0.6,
      volcanicActivity: 0.2,
      stormFrequency: 0.3,
      atmosphereDensity: 1.2,
      magneticField: true,
      rotationPeriod: 6.1
    },
    description: "Uno de los siete planetas del sistema TRAPPIST-1, con condiciones similares a la Tierra",
    imageUrl: trappist1e,
    discoveryYear: 2017,
    starType: "M",
    mass: 0.69,
    radius: 0.92,
    orbitalPeriod: 6.1,
    potentialHabitability: 90,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/TRAPPIST-1%20e",
    wikipediaUrl: "https://es.wikipedia.org/wiki/TRAPPIST-1e"
  },
  {
    name: "Kepler-186f",
    parameters: {
      temperature: 10,
      gravity: 1.2,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.06,
      distanceToStar: 0.432,
      solarRadiation: 0.32,
      volcanicActivity: 0.5,
      stormFrequency: 0.4,
      atmosphereDensity: 1.1,
      magneticField: true,
      rotationPeriod: 19.5
    },
    description: "Primer planeta del tamaño de la Tierra descubierto en la zona habitable de otra estrella",
    imageUrl: kepler186f,
    discoveryYear: 2014,
    starType: "M",
    mass: 1.44,
    radius: 1.17,
    orbitalPeriod: 129.9,
    potentialHabitability: 88,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-186%20f",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Kepler-186f"
  },
  {
    name: "K2-18b",
    parameters: {
      temperature: 25,
      gravity: 1.6,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.15,
      distanceToStar: 0.143,
      solarRadiation: 0.95,
      volcanicActivity: 0.6,
      stormFrequency: 0.5,
      atmosphereDensity: 1.8,
      magneticField: true,
      rotationPeriod: 15.3
    },
    description: "Super-Tierra con evidencia de vapor de agua en su atmósfera",
    imageUrl: k218b,
    discoveryYear: 2015,
    starType: "M",
    mass: 8.63,
    radius: 2.6,
    orbitalPeriod: 33,
    potentialHabitability: 85,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/K2-18%20b",
    wikipediaUrl: "https://es.wikipedia.org/wiki/K2-18b"
  },
  {
    name: "Kepler-62f",
    parameters: {
      temperature: 5,
      gravity: 1.3,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.07,
      distanceToStar: 0.718,
      solarRadiation: 0.41,
      volcanicActivity: 0.4,
      stormFrequency: 0.3,
      atmosphereDensity: 1.2,
      magneticField: true,
      rotationPeriod: 21.4
    },
    description: "Supertierra en la zona habitable externa de su estrella",
    imageUrl: kepler62f,
    discoveryYear: 2013,
    starType: "K",
    mass: 2.8,
    radius: 1.41,
    orbitalPeriod: 267,
    potentialHabitability: 83,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-62%20f",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Kepler-62f"
  },
  {
    name: "Kepler-452b",
    parameters: {
      temperature: 22,
      gravity: 1.6,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.09,
      distanceToStar: 1.046,
      solarRadiation: 1.1,
      volcanicActivity: 0.5,
      stormFrequency: 0.4,
      atmosphereDensity: 1.3,
      magneticField: true,
      rotationPeriod: 24.2
    },
    description: "Conocido como 'Súper Tierra 2.0' por sus similitudes con nuestro planeta",
    imageUrl: kepler452b,
    discoveryYear: 2015,
    starType: "G",
    mass: 5,
    radius: 1.63,
    orbitalPeriod: 384.8,
    potentialHabitability: 82,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/Kepler-452%20b",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Kepler-452b"
  },
  {
    name: "Gliese 667 Cc",
    parameters: {
      temperature: 18,
      gravity: 1.3,
      hasWater: true,
      oxygenLevel: 0,
      carbonDioxideLevel: 0.08,
      distanceToStar: 0.123,
      solarRadiation: 0.9,
      volcanicActivity: 0.4,
      stormFrequency: 0.3,
      atmosphereDensity: 1.2,
      magneticField: true,
      rotationPeriod: 14.6
    },
    description: "Supertierra en un sistema estelar triple, ubicado en la zona habitable",
    imageUrl: gliese667cc,
    discoveryYear: 2011,
    starType: "M",
    mass: 3.8,
    radius: 1.54,
    orbitalPeriod: 28.1,
    potentialHabitability: 80,
    nasaUrl: "https://exoplanetarchive.ipac.caltech.edu/overview/GJ%20667%20C%20c",
    wikipediaUrl: "https://es.wikipedia.org/wiki/Gliese_667_Cc"
  }
];

function App() {
  const [parameters, setParameters] = useState<PlanetParameters>({
    temperature: 15,
    gravity: 1,
    hasWater: true,
    oxygenLevel: 21,
    carbonDioxideLevel: 0.04,
    distanceToStar: 1,
    solarRadiation: 1,
    volcanicActivity: 0.5,
    stormFrequency: 0.3,
    atmosphereDensity: 1,
    magneticField: true,
    rotationPeriod: 24
  });

  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (index: number) => {
    setActiveTab(index);
    handleMenuClose();
  };

  const menuItems = [
    { label: 'Calculadora', index: 0 },
    { label: 'Planetas', index: 1 },
    { label: 'Exoplanetas', index: 2 },
    { label: 'Tecnologías', index: 3 },
    { label: 'Recursos', index: 4 }
  ];

  const getAvailableTechnologies = () => {
    return COLONIZATION_TECHNOLOGIES.filter(tech => {
      return Object.entries(tech.requiredParameters).every(([key, value]) => {
        const param = parameters[key as keyof PlanetParameters];
        if (typeof value === 'boolean') {
          return param === value;
        }
        if (typeof param === 'number' && typeof value === 'number') {
          return param >= value;
        }
        return false;
      });
    });
  };

  const calculateHabitability = (params: PlanetParameters): number => {
    let score = 100;
    
    if (params.temperature < 0 || params.temperature > 30) score -= 20;
    if (params.gravity < 0.8 || params.gravity > 1.2) score -= 20;
    if (!params.hasWater) score -= 30;
    if (params.oxygenLevel < 19 || params.oxygenLevel > 23) score -= 15;
    if (params.carbonDioxideLevel > 0.1) score -= 15;
    if (params.distanceToStar < 0.8 || params.distanceToStar > 1.2) score -= 10;
    if (params.solarRadiation < 0.5 || params.solarRadiation > 1.5) score -= 10;
    if (params.volcanicActivity > 0.8) score -= 10;
    if (params.stormFrequency > 0.7) score -= 10;
    if (params.atmosphereDensity < 0.3) score -= 10;
    if (!params.magneticField) score -= 10;
    if (params.rotationPeriod < 12 || params.rotationPeriod > 36) score -= 10;
    
    return Math.max(0, score);
  };

  const handleParameterChange = (param: keyof PlanetParameters, value: number | boolean) => {
    setParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const habitabilityScore = useMemo(() => calculateHabitability(parameters), [parameters]);

  const resultColor = useMemo(() => 
    habitabilityScore > 70 ? 'success.light' : habitabilityScore > 40 ? 'warning.light' : 'error.light',
    [habitabilityScore]
  );

  const resultMessage = useMemo(() => 
    habitabilityScore > 70 
      ? '¡Planeta potencialmente habitable!' 
      : habitabilityScore > 40 
        ? 'Condiciones moderadamente habitables' 
        : 'Condiciones no habitables para humanos',
    [habitabilityScore]
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      <AppBar position="static">
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          '& .MuiButton-root': { 
            background: 'transparent',
            color: '#2A1B3D',
            '&:hover': {
              background: 'linear-gradient(45deg, rgba(42, 27, 61, 0.1) 30%, rgba(68, 49, 141, 0.1) 90%)',
            }
          } 
        }}>
          <Typography variant="h6" component="div" sx={{ 
            color: '#2A1B3D', 
            letterSpacing: '0.1em',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
          }}>
            Calculadora de Habitabilidad
          </Typography>
          
          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
                sx={{ color: '#2A1B3D' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {menuItems.map((item) => (
                  <MenuItem 
                    key={item.index}
                    onClick={() => handleMenuItemClick(item.index)}
                    sx={{
                      color: '#2A1B3D',
                      '&:hover': {
                        backgroundColor: 'rgba(42, 27, 61, 0.08)',
                      }
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: { sm: 1, md: 2 } }}>
              {menuItems.map((item) => (
                <Button
                  key={item.index}
                  color="inherit"
                  onClick={() => setActiveTab(item.index)}
                  sx={{
                    minWidth: { sm: '100px', md: '120px' },
                    fontSize: { sm: '0.85rem', md: '0.9rem' },
                    fontWeight: activeTab === item.index ? 600 : 400,
                    borderBottom: activeTab === item.index ? '2px solid #2A1B3D' : 'none',
                    borderRadius: 0,
                    '&:hover': {
                      borderBottom: '2px solid #2A1B3D',
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ px: 4, py: 4 }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%'
        }}>
          {activeTab === 0 && (
            <>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                  Calculadora de Habitabilidad Planetaria
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Ajusta los parámetros para determinar la habitabilidad de un planeta para la vida humana.
                </Typography>
              </Box>

              <Paper elevation={2} sx={{ p: 3 }}>
                <Grid container spacing={4} sx={{ '& > .MuiGrid-item': { paddingLeft: '44px' } }}>
                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Parámetros Físicos
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Temperatura (°C): {parameters.temperature.toFixed(1)}
                          </Typography>
                          <Slider
                            value={parameters.temperature}
                            onChange={(_, value) => handleParameterChange('temperature', value as number)}
                            min={-50}
                            max={50}
                            step={0.1}
                            marks={[
                              { value: -50, label: '-50°C' },
                              { value: 0, label: '0°C' },
                              { value: 50, label: '50°C' }
                            ]}
                            size="small"
                            sx={{ mt: 3, mb: 1 }}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Gravedad (g): {parameters.gravity.toFixed(2)}
                          </Typography>
                          <Slider
                            value={parameters.gravity}
                            onChange={(_, value) => handleParameterChange('gravity', value as number)}
                            min={0.1}
                            max={2}
                            step={0.1}
                            marks={[
                              { value: 0.1, label: '0.1g' },
                              { value: 1, label: '1g' },
                              { value: 2, label: '2g' }
                            ]}
                            size="small"
                            sx={{ mt: 3, mb: 1 }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Parámetros Atmosféricos
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Nivel de Oxígeno (%): {parameters.oxygenLevel.toFixed(1)}
                          </Typography>
                          <Slider
                            value={parameters.oxygenLevel}
                            onChange={(_, value) => handleParameterChange('oxygenLevel', value as number)}
                            min={0}
                            max={100}
                            step={0.1}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 50, label: '50%' },
                              { value: 100, label: '100%' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Nivel de CO2 (%): {parameters.carbonDioxideLevel.toFixed(3)}
                          </Typography>
                          <Slider
                            value={parameters.carbonDioxideLevel}
                            onChange={(_, value) => handleParameterChange('carbonDioxideLevel', value as number)}
                            min={0}
                            max={100}
                            step={0.001}
                            marks={[
                              { value: 0, label: '0%' },
                              { value: 50, label: '50%' },
                              { value: 100, label: '100%' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Densidad Atmosférica: {parameters.atmosphereDensity.toFixed(2)}
                          </Typography>
                          <Slider
                            value={parameters.atmosphereDensity}
                            onChange={(_, value) => handleParameterChange('atmosphereDensity', value as number)}
                            min={0}
                            max={2}
                            step={0.1}
                            marks={[
                              { value: 0, label: '0' },
                              { value: 1, label: '1' },
                              { value: 2, label: '2' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Parámetros Orbitales
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Distancia a la Estrella (UA): {parameters.distanceToStar.toFixed(2)}
                          </Typography>
                          <Slider
                            value={parameters.distanceToStar}
                            onChange={(_, value) => handleParameterChange('distanceToStar', value as number)}
                            min={0.1}
                            max={2}
                            step={0.1}
                            marks={[
                              { value: 0.1, label: '0.1' },
                              { value: 1, label: '1' },
                              { value: 2, label: '2' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Radiación Solar: {parameters.solarRadiation.toFixed(2)}
                          </Typography>
                          <Slider
                            value={parameters.solarRadiation}
                            onChange={(_, value) => handleParameterChange('solarRadiation', value as number)}
                            min={0}
                            max={2}
                            step={0.1}
                            marks={[
                              { value: 0, label: '0' },
                              { value: 1, label: '1' },
                              { value: 2, label: '2' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Período de Rotación (horas): {parameters.rotationPeriod.toFixed(1)}
                          </Typography>
                          <Slider
                            value={parameters.rotationPeriod}
                            onChange={(_, value) => handleParameterChange('rotationPeriod', value as number)}
                            min={6}
                            max={48}
                            step={0.5}
                            marks={[
                              { value: 6, label: '6h' },
                              { value: 24, label: '24h' },
                              { value: 48, label: '48h' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Parámetros Geológicos
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Actividad Volcánica: {parameters.volcanicActivity.toFixed(2)}
                          </Typography>
                          <Slider
                            value={parameters.volcanicActivity}
                            onChange={(_, value) => handleParameterChange('volcanicActivity', value as number)}
                            min={0}
                            max={1}
                            step={0.1}
                            marks={[
                              { value: 0, label: '0' },
                              { value: 0.5, label: '0.5' },
                              { value: 1, label: '1' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="body1" gutterBottom>
                            Frecuencia de Tormentas: {parameters.stormFrequency.toFixed(2)}
                          </Typography>
                          <Slider
                            value={parameters.stormFrequency}
                            onChange={(_, value) => handleParameterChange('stormFrequency', value as number)}
                            min={0}
                            max={1}
                            step={0.1}
                            marks={[
                              { value: 0, label: '0' },
                              { value: 0.5, label: '0.5' },
                              { value: 1, label: '1' }
                            ]}
                            size="small"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>
                      Otros Parámetros
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={parameters.hasWater}
                              onChange={(e) => handleParameterChange('hasWater', e.target.checked)}
                            />
                          }
                          label="Presencia de Agua Líquida"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={parameters.magneticField}
                              onChange={(e) => handleParameterChange('magneticField', e.target.checked)}
                            />
                          }
                          label="Campo Magnético"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>

              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3, 
                  textAlign: 'center',
                  backgroundColor: resultColor,
                  color: 'white'
                }}
              >
                <Typography variant="h4" gutterBottom>
                  Puntuación de Habitabilidad: {habitabilityScore}/100
                </Typography>
                <Typography variant="h6">
                  {resultMessage}
                </Typography>
              </Paper>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                  Puntuación de Habitabilidad: {calculateHabitability(parameters)}/100
                </Typography>
                <PlanetVisualization 
                  parameters={parameters}
                  habitabilityScore={calculateHabitability(parameters)}
                />
              </Box>
            </>
          )}

          {activeTab === 1 && (
            <>
              <Grid container spacing={2}>
                {KNOWN_PLANETS.map((planet) => (
                  <Grid item xs={12} md={6} key={planet.name}>
                    <Paper 
                      elevation={1} 
                      sx={{ 
                        p: 0, 
                        cursor: 'pointer',
                        bgcolor: selectedPlanet === planet.name ? 'primary.light' : 'background.paper',
                        color: selectedPlanet === planet.name ? 'white' : 'text.primary',
                        overflow: 'hidden'
                      }}
                      onClick={() => setSelectedPlanet(planet.name)}
                    >
                      <Box sx={{ 
                        position: 'relative', 
                        width: '100%', 
                        height: '200px',
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={planet.imageUrl} 
                          alt={planet.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="h6">{planet.name}</Typography>
                        <Typography variant="body2">{planet.description}</Typography>
                        <Typography variant="body2">
                          Puntuación: {calculateHabitability(planet.parameters)}/100
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {selectedPlanet && (
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Información Detallada de {selectedPlanet}
                  </Typography>
                  <Grid container spacing={2}>
                    {KNOWN_PLANETS.find(p => p.name === selectedPlanet) && (
                      <>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Características Físicas
                            </Typography>
                            <Typography variant="body2">
                              Temperatura: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.temperature}°C
                            </Typography>
                            <Typography variant="body2">
                              Gravedad: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.gravity}g
                            </Typography>
                            <Typography variant="body2">
                              Período de Rotación: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.rotationPeriod} horas
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Características Atmosféricas
                            </Typography>
                            <Typography variant="body2">
                              Oxígeno: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.oxygenLevel}%
                            </Typography>
                            <Typography variant="body2">
                              CO2: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.carbonDioxideLevel}%
                            </Typography>
                            <Typography variant="body2">
                              Densidad Atmosférica: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.atmosphereDensity}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Características Orbitales
                            </Typography>
                            <Typography variant="body2">
                              Distancia a la Estrella: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.distanceToStar} UA
                            </Typography>
                            <Typography variant="body2">
                              Radiación Solar: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.solarRadiation}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Características Geológicas
                            </Typography>
                            <Typography variant="body2">
                              Actividad Volcánica: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.volcanicActivity}
                            </Typography>
                            <Typography variant="body2">
                              Frecuencia de Tormentas: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.stormFrequency}
                            </Typography>
                            <Typography variant="body2">
                              Campo Magnético: {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.parameters.magneticField ? 'Sí' : 'No'}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1" color="text.secondary">
                            {KNOWN_PLANETS.find(p => p.name === selectedPlanet)?.description}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Paper>
              )}
            </>
          )}

          {activeTab === 2 && (
            <Grid container spacing={2}>
              {EXOPLANETS.map((planet) => (
                <Grid item xs={12} md={6} key={planet.name}>
                  <Card>
                    <Box sx={{ 
                      position: 'relative', 
                      width: '100%', 
                      height: '200px',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={planet.imageUrl} 
                        alt={planet.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6">{planet.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {planet.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={`Tipo de estrella: ${planet.starType}`} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip 
                          label={`Masa: ${planet.mass} M⊕`} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip 
                          label={`Radio: ${planet.radius} R⊕`} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Puntuación de Habitabilidad: {planet.potentialHabitability}/100
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small"
                        href={planet.wikipediaUrl}
                        target="_blank"
                        sx={{
                          fontSize: '0.75rem',
                          padding: '4px 8px',
                          minWidth: 'auto',
                          background: 'linear-gradient(90deg, #1A0B2E 0%, #2A1B3D 100%)',
                          color: '#FFFFFF',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            background: 'linear-gradient(90deg, #2A1B3D 0%, #1A0B2E 100%)',
                            boxShadow: '0 4px 15px rgba(26, 11, 46, 0.15)',
                          }
                        }}
                      >
                        Ver Detalles
                      </Button>
                      <Button
                        size="small"
                        href={planet.nasaUrl}
                        target="_blank"
                        sx={{
                          fontSize: '0.75rem',
                          padding: '4px 8px',
                          minWidth: 'auto',
                          background: 'linear-gradient(90deg, #1A0B2E 0%, #2A1B3D 100%)',
                          color: '#FFFFFF',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            background: 'linear-gradient(90deg, #2A1B3D 0%, #1A0B2E 100%)',
                            boxShadow: '0 4px 15px rgba(26, 11, 46, 0.15)',
                          }
                        }}
                      >
                        Base de Datos NASA
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 3 && (
            <Grid container spacing={2}>
              {getAvailableTechnologies().map((tech) => (
                <Grid item xs={12} md={6} key={tech.name}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{tech.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tech.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2">
                          Coste: ${tech.cost.toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          Tiempo de implementación: {tech.timeToImplement} años
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 4 && (
            <Grid container spacing={2}>
              {EDUCATIONAL_RESOURCES.map((resource) => (
                <Grid item xs={12} md={6} key={resource.title}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{resource.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {resource.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Chip 
                          label={resource.category} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Chip 
                          label={resource.difficulty} 
                          size="small" 
                          sx={{ mr: 1, mb: 1 }}
                        />
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small"
                        href={resource.url}
                        target="_blank"
                        sx={{
                          fontSize: '0.75rem',
                          padding: '4px 8px',
                          minWidth: 'auto',
                          background: 'linear-gradient(90deg, #1A0B2E 0%, #2A1B3D 100%)',
                          color: '#FFFFFF',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            background: 'linear-gradient(90deg, #2A1B3D 0%, #1A0B2E 100%)',
                            boxShadow: '0 4px 15px rgba(26, 11, 46, 0.15)',
                          }
                        }}
                      >
                        Ver Paper
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default App;
