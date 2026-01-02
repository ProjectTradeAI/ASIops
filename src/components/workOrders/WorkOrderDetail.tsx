import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Grid,
  Tabs,
  Tab,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  PictureAsPdf as PdfIcon,
  Email as EmailIcon,
  Print as PrintIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import mockWorkOrders from '../../data/mockWorkOrders.json';
import { parseTurkishDateSafe } from '../../utils/dateUtils';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function WorkOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);

  // Find work order by ID
  const workOrder = mockWorkOrders.find((order) => order.id === Number(id));

  if (!workOrder) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          {t('common.error')}: İş emri bulunamadı
        </Typography>
        <Button onClick={() => navigate('/work-orders')} sx={{ mt: 2 }}>
          {t('common.back')}
        </Button>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      case 'reported':
        return 'warning';
      case 'created':
        return 'default';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string | null) => {
    const date = parseTurkishDateSafe(dateString);
    if (!date) return '-';
    return format(date, 'dd MMMM yyyy, HH:mm', { locale: tr });
  };

  const formatDateShort = (dateString: string | null) => {
    const date = parseTurkishDateSafe(dateString);
    if (!date) return '-';
    return format(date, 'dd MMM yyyy', { locale: tr });
  };

  const InfoRow = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography variant="body1">{value || '-'}</Typography>
      </Grid>
    </Grid>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <IconButton onClick={() => navigate('/work-orders')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {workOrder.fileNumber}
            </Typography>
            <Chip
              label={t(`workOrder.statuses.${workOrder.status}`)}
              color={getStatusColor(workOrder.status)}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
            {formatDate(workOrder.fileOpenDate)}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<PdfIcon />}
            onClick={() => console.log('Export PDF')}
          >
            {t('common.exportPDF')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<EmailIcon />}
            onClick={() => console.log('Send Email')}
          >
            {t('common.sendEmail')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            {t('common.print')}
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/work-orders/${id}/edit`)}
          >
            {t('common.edit')}
          </Button>
        </Stack>
      </Box>

      {/* Tabs */}
      <Paper>
        <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
          <Tab label={t('workOrder.generalInfo')} />
          <Tab label={t('workOrder.inspectionDetails')} />
          <Tab label={t('workOrder.personnel')} />
          <Tab label={t('workOrder.auditTrail')} />
        </Tabs>

        <Divider />

        {/* Tab 1: General Info */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Dosya Bilgileri
              </Typography>
              <InfoRow label={t('workOrder.fileNumber')} value={workOrder.fileNumber} />
              <InfoRow
                label={t('workOrder.status')}
                value={
                  <Chip
                    label={t(`workOrder.statuses.${workOrder.status}`)}
                    color={getStatusColor(workOrder.status)}
                    size="small"
                  />
                }
              />
              <InfoRow label={t('workOrder.openDate')} value={formatDate(workOrder.fileOpenDate)} />
              <InfoRow label={t('workOrder.reportDate')} value={formatDateShort(workOrder.reportDate)} />
              <InfoRow label={t('workOrder.responsible')} value={workOrder.responsibleUser} />
              <InfoRow label={t('workOrder.invoiceNumber')} value={workOrder.invoiceNumber} />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Firma ve Gemi Bilgileri
              </Typography>
              <InfoRow label={t('workOrder.company')} value={workOrder.companyName} />
              <InfoRow label={t('workOrder.ship')} value={workOrder.shipName} />
              <InfoRow label={t('workOrder.province')} value={workOrder.province} />
              <InfoRow label={t('workOrder.district')} value={workOrder.district} />
              <InfoRow
                label={t('workOrder.tonnage')}
                value={workOrder.tonnage ? `${workOrder.tonnage.toLocaleString('tr-TR')} ton` : '-'}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 2: Inspection Details */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Muayene Bilgileri
              </Typography>
              <InfoRow label={t('workOrder.inspectionArea')} value={workOrder.inspectionArea} />
              <InfoRow label={t('workOrder.inspectionItem')} value={workOrder.inspectionItem} />
              <InfoRow label={t('workOrder.inspectionType')} value={workOrder.inspectionType} />
              <InfoRow
                label={t('workOrder.supervisionLocation')}
                value={workOrder.supervisionLocation}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Tarihler
              </Typography>
              <InfoRow
                label="Muayene Başlangıç"
                value={formatDateShort(workOrder.inspectionDateStart)}
              />
              <InfoRow
                label="Muayene Bitiş"
                value={formatDateShort(workOrder.inspectionDateEnd)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 3: Personnel */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Görevli Personel
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {workOrder.employees.length > 0 ? (
              workOrder.employees.map((employee, index) => (
                <Chip key={index} label={employee} color="primary" variant="outlined" />
              ))
            ) : (
              <Typography color="text.secondary">Personel atanmamış</Typography>
            )}
          </Stack>
        </TabPanel>

        {/* Tab 4: Audit Trail */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            İşlem Geçmişi
          </Typography>
          <Stack spacing={2}>
            <Box sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 2, py: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {formatDate(workOrder.fileOpenDate)}
              </Typography>
              <Typography variant="body1">
                <strong>{workOrder.responsibleUser}</strong> tarafından oluşturuldu
              </Typography>
            </Box>
            {workOrder.reportDate && (
              <Box sx={{ borderLeft: 3, borderColor: 'success.main', pl: 2, py: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {formatDate(workOrder.reportDate)}
                </Typography>
                <Typography variant="body1">Rapor tamamlandı</Typography>
              </Box>
            )}
          </Stack>
        </TabPanel>
      </Paper>
    </Box>
  );
}