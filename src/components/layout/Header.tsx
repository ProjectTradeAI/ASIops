import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Avatar, Divider, Badge, alpha } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    alert('Logout işlemi (prototype)');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid',
        borderColor: alpha('#fff', 0.1),
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            borderRadius: 2,
            bgcolor: alpha('#fff', 0.05),
            '&:hover': {
              bgcolor: alpha('#fff', 0.1),
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#fff',
              }}
            >
              ASI
            </Box>
            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  letterSpacing: '-0.01em',
                  background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Operations Tracker
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha('#fff', 0.5),
                  fontSize: '0.65rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Professional Edition
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{
              color: alpha('#fff', 0.7),
              '&:hover': {
                color: '#fff',
                bgcolor: alpha('#fff', 0.1),
              },
            }}
          >
            <SearchIcon fontSize="small" />
          </IconButton>
          
          <IconButton
            sx={{
              color: alpha('#fff', 0.7),
              '&:hover': {
                color: '#fff',
                bgcolor: alpha('#fff', 0.1),
              },
            }}
          >
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem' } }}>
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: alpha('#fff', 0.1), display: { xs: 'none', md: 'block' } }} />

          <Typography
            variant="body2"
            sx={{
              mr: 1,
              color: alpha('#fff', 0.6),
              display: { xs: 'none', md: 'block' },
              fontSize: '0.8rem',
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

          <Box
            onClick={handleUserMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              py: 1,
              px: 1.5,
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: alpha('#fff', 0.08),
              },
            }}
          >
            <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: '#fff',
                  fontSize: '0.85rem',
                }}
              >
                {currentUser.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: alpha('#fff', 0.5),
                  fontSize: '0.7rem',
                }}
              >
                {currentUser.role}
              </Typography>
            </Box>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: '2px solid',
                borderColor: alpha('#fff', 0.2),
              }}
            >
              {currentUser.initials}
            </Avatar>
          </Box>
        </Box>

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
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{currentUser.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {currentUser.role}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleProfile}>
            <AccountCircleIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
            {t('menu.profile')}
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <SettingsIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
            {t('menu.settings')}
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
            <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
            {t('menu.logout')}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
