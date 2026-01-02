import { Box, Typography, Link, alpha, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 4,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
          © {currentYear} Alex Stewart Denetim ve Analiz Hizmetleri Ltd. Şti.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Link 
            href="#" 
            color="text.secondary" 
            underline="hover"
            sx={{ 
              fontSize: '0.875rem',
              transition: 'color 0.2s',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {t('footer.privacy')}
          </Link>
          <Typography variant="body2" color="text.disabled">•</Typography>
          <Link 
            href="#" 
            color="text.secondary" 
            underline="hover"
            sx={{ 
              fontSize: '0.875rem',
              transition: 'color 0.2s',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {t('footer.terms')}
          </Link>
          <Typography variant="body2" color="text.disabled">•</Typography>
          <Link 
            href="#" 
            color="text.secondary" 
            underline="hover"
            sx={{ 
              fontSize: '0.875rem',
              transition: 'color 0.2s',
              '&:hover': { color: 'primary.main' },
            }}
          >
            {t('footer.contact')}
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
