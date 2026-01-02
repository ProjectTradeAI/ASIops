import { Card, CardContent, Typography, Box, alpha, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  subtitle?: string;
}

const colorGradients: Record<string, { gradient: string; light: string }> = {
  primary: {
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    light: 'rgba(59, 130, 246, 0.1)',
  },
  secondary: {
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    light: 'rgba(139, 92, 246, 0.1)',
  },
  success: {
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    light: 'rgba(16, 185, 129, 0.1)',
  },
  warning: {
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    light: 'rgba(245, 158, 11, 0.1)',
  },
  error: {
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    light: 'rgba(239, 68, 68, 0.1)',
  },
  info: {
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    light: 'rgba(6, 182, 212, 0.1)',
  },
};

export default function StatCard({ title, value, icon, color, subtitle }: StatCardProps) {
  const theme = useTheme();
  const colorConfig = colorGradients[color] || colorGradients.primary;

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: 150,
          height: 150,
          background: colorConfig.light,
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
        },
      }}
    >
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography 
              color="text.secondary" 
              variant="body2" 
              sx={{ 
                mb: 1.5, 
                fontWeight: 500,
                fontSize: '0.85rem',
              }}
            >
              {title}
            </Typography>
            <Typography 
              variant="h3" 
              component="div" 
              sx={{ 
                mb: 0.5, 
                fontWeight: 700,
                fontSize: '2.25rem',
                background: colorConfig.gradient,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography 
                variant="caption" 
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 3,
              background: colorConfig.gradient,
              color: '#fff',
              boxShadow: `0 8px 16px -4px ${alpha(theme.palette[color].main, 0.4)}`,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
