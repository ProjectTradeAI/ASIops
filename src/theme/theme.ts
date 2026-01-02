import { createTheme, alpha } from '@mui/material/styles';
import { trTR } from '@mui/material/locale';

declare module '@mui/material/styles' {
  interface PaletteColor {
    lighter?: string;
    gradient?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    gradient?: string;
  }
  interface TypeBackground {
    subtle?: string;
  }
}

export const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#1d4ed8',
        lighter: '#eff6ff',
        gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        contrastText: '#fff',
      },
      secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#6d28d9',
        lighter: '#f5f3ff',
        gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
        contrastText: '#fff',
      },
      success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
        lighter: '#ecfdf5',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      },
      warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        lighter: '#fffbeb',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        lighter: '#fef2f2',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      },
      info: {
        main: '#06b6d4',
        light: '#22d3ee',
        dark: '#0891b2',
        lighter: '#ecfeff',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
        subtle: '#f1f5f9',
      },
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
      },
      divider: alpha('#94a3b8', 0.2),
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        letterSpacing: '-0.01em',
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.5,
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.08em',
        lineHeight: 2,
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f5f9',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cbd5e1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#94a3b8',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 10,
            padding: '10px 20px',
            boxShadow: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
            },
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
            },
          },
          containedSecondary: {
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
            },
          },
          outlined: {
            borderWidth: '1.5px',
            '&:hover': {
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            padding: '20px 24px 12px',
          },
          title: {
            fontWeight: 600,
            fontSize: '1.1rem',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: '12px 24px 24px',
            '&:last-child': {
              paddingBottom: 24,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 8,
          },
          filled: {
            '&.MuiChip-colorSuccess': {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            },
            '&.MuiChip-colorWarning': {
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            },
            '&.MuiChip-colorError': {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            },
            '&.MuiChip-colorInfo': {
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight: 600,
              backgroundColor: '#f8fafc',
              color: '#475569',
              borderBottom: '2px solid #e2e8f0',
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.04)',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: '#f1f5f9',
            padding: '16px',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
            boxShadow: '1px 0 3px 0 rgba(0, 0, 0, 0.05)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            margin: '2px 12px',
            padding: '10px 16px',
            transition: 'all 0.2s ease-in-out',
            '&.Mui-selected': {
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
              },
              '& .MuiListItemIcon-root': {
                color: '#3b82f6',
              },
            },
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: 40,
            color: '#64748b',
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: '#1e293b',
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: 8,
            padding: '8px 12px',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              },
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 10,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(226, 232, 240, 0.8)',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '2px 8px',
            padding: '10px 12px',
            '&:hover': {
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(226, 232, 240, 0.8)',
          },
        },
      },
    },
  },
  trTR,
);

export const statusColors = {
  created: '#94a3b8',
  in_progress: '#3b82f6',
  reported: '#f59e0b',
  completed: '#10b981',
  cancelled: '#ef4444',
};

export const gradients = {
  primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  secondary: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  info: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  glass: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
};
