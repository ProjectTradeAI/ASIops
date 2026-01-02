import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Switch,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Settings as SettingsIcon,
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function SettingsPage() {
  const { t } = useTranslation();

  const [settings, setSettings] = useState({
    emailNotifications: true,
    whatsappNotifications: false,
    darkMode: false,
    autoSave: true,
    twoFactor: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    // eslint-disable-next-line no-alert
    alert(`Ayar güncellendi! (Prototip - gerçek kaydetme Phase 3'te)`);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {t('menu.settings')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistem ayarlarını ve tercihlerinizi yönetin
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color="primary" />
              Profil Ayarları
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItemButton>
                <ListItemText
                  primary="Kişisel Bilgiler"
                  secondary="Ad, soyad, email ve iletişim bilgileri"
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemText
                  primary="Şifre Değiştir"
                  secondary="Hesap güvenliği için şifrenizi güncelleyin"
                />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <NotificationsIcon color="primary" />
              Bildirim Ayarları
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Email Bildirimleri"
                  secondary="Yeni iş emri ve güncellemeler için email"
                />
                <Switch
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WhatsAppIcon />
                </ListItemIcon>
                <ListItemText
                  primary="WhatsApp Bildirimleri"
                  secondary="Önemli güncellemeler için WhatsApp"
                />
                <Switch
                  checked={settings.whatsappNotifications}
                  onChange={() => handleToggle('whatsappNotifications')}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaletteIcon color="primary" />
              Görünüm Ayarları
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <PaletteIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Karanlık Mod"
                  secondary="Gece kullanımı için karanlık tema (Yakında)"
                />
                <Switch
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                  disabled
                />
              </ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Dil Seçimi" secondary="Türkçe (Varsayılan)" />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SecurityIcon color="primary" />
              Güvenlik Ayarları
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <SecurityIcon />
                </ListItemIcon>
                <ListItemText
                  primary="İki Faktörlü Doğrulama"
                  secondary="Ekstra güvenlik katmanı (Yakında)"
                />
                <Switch
                  checked={settings.twoFactor}
                  onChange={() => handleToggle('twoFactor')}
                  disabled
                />
              </ListItem>
              <ListItemButton>
                <ListItemText
                  primary="Oturum Geçmişi"
                  secondary="Giriş yapılan cihazlar ve konumlar"
                />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SettingsIcon color="primary" />
              Sistem Ayarları
            </Typography>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemText
                  primary="Otomatik Kaydetme"
                  secondary="Değişiklikleri otomatik olarak kaydet"
                />
                <Switch
                  checked={settings.autoSave}
                  onChange={() => handleToggle('autoSave')}
                />
              </ListItem>
              <ListItemButton>
                <ListItemText
                  primary="Veri Yedekleme"
                  secondary="Veritabanı yedekleme ve geri yükleme"
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemText
                  primary="API Ayarları"
                  secondary="Harici entegrasyonlar ve API anahtarları"
                />
              </ListItemButton>
              <ListItemButton>
                <ListItemText
                  primary="Sistem Bilgisi"
                  secondary="Versiyon v0.0.1 (Prototip) • Son güncelleme: Aralık 2025"
                />
              </ListItemButton>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Info Box */}
      <Card sx={{ mt: 4, bgcolor: 'warning.lighter', border: '1px solid', borderColor: 'warning.light' }}>
        <CardContent>
          <Typography variant="h6" color="warning.main" gutterBottom>
            ⚙️ Geliştirme Notu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bu ayarlar sayfası prototip aşamasındadır. Bazı ayarlar Phase 3'te (Frontend Development)
            tam fonksiyonlu hale getirilecektir. Şu an için ayar değişiklikleri gerçek bir veritabanına
            kaydedilmemektedir.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}