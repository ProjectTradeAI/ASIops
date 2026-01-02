import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material';
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
      icon: <AddIcon />,
      color: 'primary' as const,
      onClick: () => navigate('/work-orders/new'),
    },
    {
      label: t('menu.searchWorkOrders'),
      icon: <SearchIcon />,
      color: 'secondary' as const,
      onClick: () => navigate('/work-orders/search'),
    },
    {
      label: t('menu.reports'),
      icon: <DescriptionIcon />,
      color: 'info' as const,
      onClick: () => navigate('/reports'),
    },
    {
      label: 'Export Excel',
      icon: <GetAppIcon />,
      color: 'success' as const,
      onClick: () => console.log('Export clicked'),
    },
  ];

  return (
    <Card>
      <CardHeader
        title={t('dashboard.quickActions')}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Button
                variant="contained"
                color={action.color}
                fullWidth
                startIcon={action.icon}
                onClick={action.onClick}
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
