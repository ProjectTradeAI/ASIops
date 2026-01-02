import { Breadcrumbs as MuiBreadcrumbs, Typography, Link, Box } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const getRouteName = (path: string): string => {
    const routeMap: Record<string, string> = {
      'work-orders': t('menu.workOrders'),
      'new': t('menu.newWorkOrder'),
      'search': t('menu.searchWorkOrders'),
      'list-asi': 'ASI',
      'list-asic': 'ASIC',
      'master-data': t('menu.masterData'),
      'companies': t('menu.companies'),
      'employees': t('menu.employees'),
      'ships': t('menu.ships'),
      'inspection-areas': t('menu.inspectionAreas'),
      'inspection-items': t('menu.inspectionItems'),
      'inspection-types': t('menu.inspectionTypes'),
      'locations': t('menu.supervisionLocations'),
      'tasks': t('menu.tasks'),
      'topics': t('menu.topics'),
      'reports': t('menu.reports'),
      'settings': t('menu.settings'),
      'users': t('menu.users'),
    };

    return routeMap[path] || path;
  };

  if (pathnames.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 3 }}>
      <MuiBreadcrumbs 
        separator={<NavigateNextIcon sx={{ fontSize: 16, color: 'text.disabled' }} />}
        sx={{
          '& .MuiBreadcrumbs-separator': {
            mx: 1,
          },
        }}
      >
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'color 0.2s',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <HomeIcon sx={{ fontSize: 18 }} />
          {t('menu.dashboard')}
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const routeName = getRouteName(value);

          return last ? (
            <Typography 
              key={to} 
              sx={{ 
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              {routeName}
            </Typography>
          ) : (
            <Link
              key={to}
              component={RouterLink}
              to={to}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.2s',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {routeName}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}
