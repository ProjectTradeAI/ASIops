import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
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

export default function Sidebar({ onClose }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Submenu states
  const [workOrdersOpen, setWorkOrdersOpen] = useState(true);
  const [masterDataOpen, setMasterDataOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close drawer on mobile after navigation
    if (window.innerWidth < 600) {
      onClose();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        {/* Menu Header */}
        <Box sx={{ p: 2 }}>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600 }}>
            MENU
          </Typography>
        </Box>

        <List>
          {/* Dashboard */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive('/')}
              onClick={() => handleNavigation('/')}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={t('menu.dashboard')} />
            </ListItemButton>
          </ListItem>

          <Divider sx={{ my: 1 }} />

          {/* Work Orders Section */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setWorkOrdersOpen(!workOrdersOpen)}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary={t('menu.workOrders')} />
              {workOrdersOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={workOrdersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/work-orders/new')}
                onClick={() => handleNavigation('/work-orders/new')}
              >
                <ListItemIcon>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.newWorkOrder')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/work-orders/search')}
                onClick={() => handleNavigation('/work-orders/search')}
              >
                <ListItemIcon>
                  <SearchIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.searchWorkOrders')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/work-orders/list-asi')}
                onClick={() => handleNavigation('/work-orders/list-asi')}
              >
                <ListItemIcon>
                  <ListIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="ASI" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/work-orders/list-asic')}
                onClick={() => handleNavigation('/work-orders/list-asic')}
              >
                <ListItemIcon>
                  <ListIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="ASIC" />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ my: 1 }} />

          {/* Master Data Section */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => setMasterDataOpen(!masterDataOpen)}>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={t('menu.masterData')} />
              {masterDataOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse in={masterDataOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/companies')}
                onClick={() => handleNavigation('/master-data/companies')}
              >
                <ListItemIcon>
                  <BusinessIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.companies')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/employees')}
                onClick={() => handleNavigation('/master-data/employees')}
              >
                <ListItemIcon>
                  <PeopleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.employees')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/ships')}
                onClick={() => handleNavigation('/master-data/ships')}
              >
                <ListItemIcon>
                  <DirectionsBoatIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.ships')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/inspection-areas')}
                onClick={() => handleNavigation('/master-data/inspection-areas')}
              >
                <ListItemIcon>
                  <CategoryIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.inspectionAreas')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/inspection-items')}
                onClick={() => handleNavigation('/master-data/inspection-items')}
              >
                <ListItemIcon>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.inspectionItems')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/inspection-types')}
                onClick={() => handleNavigation('/master-data/inspection-types')}
              >
                <ListItemIcon>
                  <AssignmentIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.inspectionTypes')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/locations')}
                onClick={() => handleNavigation('/master-data/locations')}
              >
                <ListItemIcon>
                  <LocationOnIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.supervisionLocations')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/tasks')}
                onClick={() => handleNavigation('/master-data/tasks')}
              >
                <ListItemIcon>
                  <CheckCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.tasks')} />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                selected={isActive('/master-data/topics')}
                onClick={() => handleNavigation('/master-data/topics')}
              >
                <ListItemIcon>
                  <TopicIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={t('menu.topics')} />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider sx={{ my: 1 }} />

          {/* Reports */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive('/reports')}
              onClick={() => handleNavigation('/reports')}
            >
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={t('menu.reports')} />
            </ListItemButton>
          </ListItem>

          {/* Settings */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive('/settings')}
              onClick={() => handleNavigation('/settings')}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('menu.settings')} />
            </ListItemButton>
          </ListItem>

          {/* Users (Admin only) */}
          <ListItem disablePadding>
            <ListItemButton
              selected={isActive('/users')}
              onClick={() => handleNavigation('/users')}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t('menu.users')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
