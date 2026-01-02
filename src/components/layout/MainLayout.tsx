import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';

const drawerWidth = 190;

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    // Only close sidebar on mobile
    if (window.innerWidth < 900) {
      setSidebarOpen(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Header onMenuClick={handleMenuClick} />

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: { sm: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
          ml: { sm: sidebarOpen ? `${drawerWidth}px` : 0 },
          transition: 'margin-left 0.3s, width 0.3s',
        }}
      >
        {/* Spacer for fixed AppBar */}
        <Toolbar />

        {/* Content Area */}
        <Box sx={{ flexGrow: 1, py: 3, pr: 2, pl: 0 }}>
          <Breadcrumbs />
          <Outlet />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}
