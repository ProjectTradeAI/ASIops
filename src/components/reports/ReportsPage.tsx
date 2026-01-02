import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  PictureAsPdf as PdfIcon,
  TableChart as ExcelIcon,
  DateRange as DateRangeIcon,
  Business as BusinessIcon,
  DirectionsBoat as ShipIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface ReportCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: string;
}

export default function ReportsPage() {
  const { t } = useTranslation();

  const reports: ReportCard[] = [
    {
      title: 'İş Emri Raporu',
      description: 'Tarih aralığına göre tüm iş emirlerinin detaylı raporu',
      icon: <AssessmentIcon />,
      color: 'primary',
      category: 'İş Emirleri',
    },
    {
      title: 'Firma Bazlı Rapor',
      description: 'Firmaya göre iş emirleri ve muayene istatistikleri',
      icon: <BusinessIcon />,
      color: 'secondary',
      category: 'Firmalar',
    },
    {
      title: 'Gemi Bazlı Rapor',
      description: 'Gemilere göre yapılan muayeneler ve sonuçları',
      icon: <ShipIcon />,
      color: 'info',
      category: 'Gemiler',
    },
    {
      title: 'Personel Performans Raporu',
      description: 'Çalışanların tamamladığı iş emirleri ve performans analizi',
      icon: <PeopleIcon />,
      color: 'success',
      category: 'Personel',
    },
    {
      title: 'Aylık Özet Rapor',
      description: 'Aylık iş emri sayıları, tonaj ve gelir özeti',
      icon: <DateRangeIcon />,
      color: 'warning',
      category: 'Özet',
    },
    {
      title: 'Trend Analizi',
      description: 'Zaman bazlı iş emri trendleri ve tahminler',
      icon: <TrendingIcon />,
      color: 'error',
      category: 'Analiz',
    },
  ];

  const handleGenerateReport = (reportTitle: string) => {
    // eslint-disable-next-line no-alert
    alert(`"${reportTitle}" raporu oluşturuluyor... (Prototip - gerçek rapor Phase 3'te geliştirilecek)`);
    console.log('Generate report:', reportTitle);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          {t('menu.reports')}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sistem raporlarını oluşturun ve dışa aktarın
        </Typography>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.lighter', border: '1px solid', borderColor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toplam İş Emri
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.lighter', border: '1px solid', borderColor: 'success.light' }}>
            <CardContent>
              <Typography variant="h4" color="success.main" sx={{ fontWeight: 600 }}>
                5
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tamamlanan
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.lighter', border: '1px solid', borderColor: 'warning.light' }}>
            <CardContent>
              <Typography variant="h4" color="warning.main" sx={{ fontWeight: 600 }}>
                68,650
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Toplam Tonaj
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'info.lighter', border: '1px solid', borderColor: 'info.light' }}>
            <CardContent>
              <Typography variant="h4" color="info.main" sx={{ fontWeight: 600 }}>
                7
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Aktif Personel
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Available Reports */}
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Mevcut Raporlar
      </Typography>

      <Grid container spacing={3}>
        {reports.map((report, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${report.color}.lighter`,
                      color: `${report.color}.main`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {report.icon}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                      <Typography variant="h6">{report.title}</Typography>
                      <Chip label={report.category} size="small" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {report.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="outlined"
                  startIcon={<PdfIcon />}
                  onClick={() => handleGenerateReport(report.title)}
                  fullWidth
                >
                  PDF Oluştur
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ExcelIcon />}
                  onClick={() => handleGenerateReport(report.title)}
                  fullWidth
                >
                  Excel Oluştur
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Info Box */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: 'info.lighter',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'info.light',
        }}
      >
        <Typography variant="h6" color="info.main" gutterBottom>
          ℹ️ Prototip Notu
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bu raporlar Phase 3'te (Frontend Development) tam fonksiyonlu olarak geliştirilecektir.
          Raporlar tarih aralığı seçimi, filtreleme ve özelleştirme seçenekleri ile birlikte gelecektir.
        </Typography>
      </Box>
    </Box>
  );
}