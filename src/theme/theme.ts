import { createTheme } from '@mui/material/styles';
import { trTR } from '@mui/material/locale';

// Extend the palette interface to include lighter variants
declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

// ASI Operations Tracker Theme
export const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2', // Blue
        light: '#42a5f5',
        dark: '#1565c0',
        lighter: '#e3f2fd',
        contrastText: '#fff',
      },
      secondary: {
        main: '#dc004e', // Red
        light: '#ff5983',
        dark: '#9a0036',
        lighter: '#fce4ec',
        contrastText: '#fff',
      },
      success: {
        main: '#4caf50', // Green
        light: '#81c784',
        dark: '#388e3c',
        lighter: '#e8f5e9',
      },
      warning: {
        main: '#ff9800', // Orange
        light: '#ffb74d',
        dark: '#f57c00',
        lighter: '#fff3e0',
      },
      error: {
        main: '#f44336', // Red
        light: '#e57373',
        dark: '#d32f2f',
        lighter: '#ffebee',
      },
      info: {
        main: '#2196f3', // Light Blue
        light: '#64b5f6',
        dark: '#1976d2',
        lighter: '#e3f2fd',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
    typography: {
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
  trTR, // Turkish locale
);

// Status colors for work orders
export const statusColors = {
  created: '#9e9e9e', // Gray
  in_progress: '#2196f3', // Blue
  reported: '#ff9800', // Orange
  completed: '#4caf50', // Green
  cancelled: '#f44336', // Red
};
