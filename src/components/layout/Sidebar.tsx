import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  Box,
  Typography,
  alpha,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import CategoryIcon from '@mui/icons-material/Category';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TopicIcon from '@mui/icons-material/Topic';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const drawerWidth = 280;

export default function Sidebar({ open, onClose }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [workOrdersOpen, setWorkOrdersOpen] = useState(true);
  const [masterDataOpen, setMasterDataOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));

  const NavSection = ({ title }: { title: string }) => (
    <Typography
      variant="overline"
      component="h2"
      sx={{
        px: 3,
        pt: 3,
        pb: 1,
        display: 'block',
        color: 'text.secondary',
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.1em',
      }}
    >
      {title}
    </Typography>
  );

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }} />
      
      <Box sx={{ flex: 1, overflow: 'auto', py: 2 }}>
        <NavSection title={t('sidebar.mainMenu')} />
        
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive('/')}
              onClick={() => handleNavigation('/')}
              sx={{
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: 4,
                    height: '60%',
                    borderRadius: '0 4px 4px 0',
                    background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%)',
                  },
                },
              }}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ fontSize: 22 }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('menu.dashboard')} 
                primaryTypographyProps={{ fontWeight: isActive('/') ? 600 : 500, fontSize: '0.9rem' }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <NavSection title={t('sidebar.workOrdersSection')} />

        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => setWorkOrdersOpen(!workOrdersOpen)}
              sx={{
                '&:hover': { bgcolor: 'transparent' },
                ...(isParentActive(['/work-orders']) && {
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                }),
              }}
            >
              <ListItemIcon>
                <DescriptionIcon sx={{ fontSize: 22 }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('menu.workOrders')}
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
              />
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transition: 'all 0.2s',
                }}
              >
                {workOrdersOpen ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
              </Box>
            </ListItemButton>
          </ListItem>

          <Collapse in={workOrdersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { path: '/work-orders/new', icon: AddIcon, label: t('menu.newWorkOrder') },
                { path: '/work-orders/search', icon: SearchIcon, label: t('menu.searchWorkOrders') },
              ].map((item) => (
                <ListItemButton
                  key={item.path}
                  sx={{ 
                    pl: 4,
                    ml: 3,
                    borderLeft: '2px solid',
                    borderColor: isActive(item.path) ? 'primary.main' : alpha(theme.palette.divider, 0.5),
                    borderRadius: 0,
                    my: 0.5,
                  }}
                  selected={isActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <item.icon sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: isActive(item.path) ? 600 : 400 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>

        <NavSection title={t('sidebar.dataSection')} />

        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => setMasterDataOpen(!masterDataOpen)}
              sx={{
                '&:hover': { bgcolor: 'transparent' },
                ...(isParentActive(['/master-data']) && {
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                }),
              }}
            >
              <ListItemIcon>
                <CategoryIcon sx={{ fontSize: 22 }} />
              </ListItemIcon>
              <ListItemText 
                primary={t('menu.masterData')}
                primaryTypographyProps={{ fontWeight: 500, fontSize: '0.9rem' }}
              />
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  transition: 'all 0.2s',
                }}
              >
                {masterDataOpen ? <ExpandLess sx={{ fontSize: 18 }} /> : <ExpandMore sx={{ fontSize: 18 }} />}
              </Box>
            </ListItemButton>
          </ListItem>

          <Collapse in={masterDataOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { path: '/master-data/companies', icon: BusinessIcon, label: t('menu.companies') },
                { path: '/master-data/employees', icon: PeopleIcon, label: t('menu.employees') },
                { path: '/master-data/ships', icon: DirectionsBoatIcon, label: t('menu.ships') },
                { path: '/master-data/inspection-areas', icon: CategoryIcon, label: t('menu.inspectionAreas') },
                { path: '/master-data/inspection-items', icon: CheckCircleIcon, label: t('menu.inspectionItems') },
                { path: '/master-data/inspection-types', icon: AssignmentIcon, label: t('menu.inspectionTypes') },
                { path: '/master-data/locations', icon: LocationOnIcon, label: t('menu.supervisionLocations') },
                { path: '/master-data/tasks', icon: CheckCircleIcon, label: t('menu.tasks') },
                { path: '/master-data/topics', icon: TopicIcon, label: t('menu.topics') },
              ].map((item) => (
                <ListItemButton
                  key={item.path}
                  sx={{ 
                    pl: 4,
                    ml: 3,
                    borderLeft: '2px solid',
                    borderColor: isActive(item.path) ? 'primary.main' : alpha(theme.palette.divider, 0.5),
                    borderRadius: 0,
                    my: 0.5,
                  }}
                  selected={isActive(item.path)}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <item.icon sx={{ fontSize: 18 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: isActive(item.path) ? 600 : 400 }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>

        <NavSection title={t('sidebar.systemSection')} />

        <List disablePadding>
          {[
            { path: '/reports', icon: AssessmentIcon, label: t('menu.reports') },
            { path: '/settings', icon: SettingsIcon, label: t('menu.settings') },
            { path: '/users', icon: PersonIcon, label: t('menu.users') },
          ].map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={isActive(item.path)}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: 4,
                      height: '60%',
                      borderRadius: '0 4px 4px 0',
                      background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%)',
                    },
                  },
                }}
              >
                <ListItemIcon>
                  <item.icon sx={{ fontSize: 22 }} />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: isActive(item.path) ? 600 : 500, fontSize: '0.9rem' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
            {t('sidebar.appName')}
          </Typography>
          <Typography variant="caption" color="primary.main" sx={{ fontWeight: 600 }}>
            {t('sidebar.version')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
