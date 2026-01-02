import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Mock user data
  const currentUser = {
    name: 'Leyla Sancaklı Yıldız',
    role: 'Manager',
    initials: 'LS',
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleUserMenuClose();
    navigate('/profile');
  };

  const handleSettings = () => {
    handleUserMenuClose();
    navigate('/settings');
  };

  const handleLogout = () => {
    handleUserMenuClose();
    // Mock logout - just navigate to login
    alert('Logout işlemi (prototype)');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#1976d2',
      }}
    >
      <Toolbar>
        {/* Menu button for mobile */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo/Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            ASI Operations Tracker
          </Typography>
          <Typography
            variant="caption"
            sx={{
              ml: 2,
              px: 1,
              py: 0.5,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            PROTOTYPE
          </Typography>
        </Box>

        {/* Current time */}
        <Typography
          variant="body2"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'block' },
          }}
        >
          {new Date().toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>

        {/* User menu */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              display: { xs: 'none', sm: 'block' },
              mr: 1,
            }}
          >
            {currentUser.name}
          </Typography>
          <IconButton
            onClick={handleUserMenuOpen}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={anchorEl ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: 'secondary.main',
                fontSize: '0.875rem',
              }}
            >
              {currentUser.initials}
            </Avatar>
          </IconButton>
        </Box>

        {/* User dropdown menu */}
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2">{currentUser.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {currentUser.role}
            </Typography>
          </Box>
          <Divider />
          <MenuItem onClick={handleProfile}>
            <AccountCircleIcon sx={{ mr: 1, fontSize: 20 }} />
            {t('menu.profile')}
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
            {t('menu.settings')}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
            {t('menu.logout')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
