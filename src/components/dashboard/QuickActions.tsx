import { Card, CardContent, Typography, Grid, Button, Box, alpha } from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Description as DescriptionIcon,
  GetApp as GetAppIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function QuickActions() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const actions = [
    {
      label: t('menu.newWorkOrder'),
      icon: <AddIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      shadow: 'rgba(59, 130, 246, 0.4)',
      onClick: () => navigate('/work-orders/new'),
    },
    {
      label: t('menu.searchWorkOrders'),
      icon: <SearchIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
      shadow: 'rgba(139, 92, 246, 0.4)',
      onClick: () => navigate('/work-orders/search'),
    },
    {
      label: t('menu.reports'),
      icon: <DescriptionIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      shadow: 'rgba(6, 182, 212, 0.4)',
      onClick: () => navigate('/reports'),
    },
    {
      label: t('dashboard.exportExcel'),
      icon: <GetAppIcon sx={{ fontSize: 24 }} />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      shadow: 'rgba(16, 185, 129, 0.4)',
      onClick: () => console.log('Export clicked'),
    },
  ];

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 4,
              height: 20,
              borderRadius: 1,
              background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%)',
            }}
          />
          {t('dashboard.quickActions')}
        </Typography>
        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Button
                fullWidth
                onClick={action.onClick}
                sx={{
                  py: 2.5,
                  px: 3,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  color: '#fff',
                  background: action.gradient,
                  boxShadow: `0 8px 24px -8px ${action.shadow}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 16px 32px -8px ${action.shadow}`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha('#fff', 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                  }}
                >
                  {action.icon}
                </Box>
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
