import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

export default function Breadcrumbs() {
  const { t } = useTranslation();
  const location = useLocation();

  // Build breadcrumb items from pathname
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Route name mapping for translations
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

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mb: 3 }}
    >
      {/* Home link */}
      <Link
        component={RouterLink}
        to="/"
        underline="hover"
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'text.primary',
          '&:hover': { color: 'primary.main' },
        }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
        {t('menu.dashboard')}
      </Link>

      {/* Dynamic breadcrumb items */}
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const routeName = getRouteName(value);

        return last ? (
          <Typography
            key={to}
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center', fontWeight: 600 }}
          >
            {routeName}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            to={to}
            key={to}
            underline="hover"
            sx={{
              color: 'text.primary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {routeName}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
