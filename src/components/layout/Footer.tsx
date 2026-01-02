import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {currentYear} Alex Stewart Denetim ve Analiz Hizmetleri Ltd. Şti.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 0.5 }}>
        {t('footer.allRightsReserved')}
        {' | '}
        <Link href="#" color="inherit" underline="hover">
          {t('footer.privacy')}
        </Link>
        {' | '}
        <Link href="#" color="inherit" underline="hover">
          {t('footer.terms')}
        </Link>
        {' | '}
        <Link href="#" color="inherit" underline="hover">
          {t('footer.contact')}
        </Link>
      </Typography>
      <Typography variant="caption" color="text.disabled" align="center" sx={{ display: 'block', mt: 1 }}>
        {t('footer.prototypeVersion')} v0.0.1
      </Typography>
    </Box>
  );
}
