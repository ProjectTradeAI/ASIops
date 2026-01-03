import { useState, useEffect } from 'react';
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
  CircularProgress,
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
import { api } from '../../services/api';

interface WorkOrderData {
  id: number;
  file_type: string;
  file_number: number;
  status: string;
  open_date: string;
  report_date: string | null;
  inspection_date: string | null;
  date_range_end: string | null;
  invoice_number: string;
  responsible: string;
  tonnage: number | null;
  company_name: string | null;
  ship_name: string | null;
  topic_name: string | null;
  inspection_area_name: string | null;
  inspection_item_name: string | null;
  supervision_location_name: string | null;
  province_name: string | null;
  district_name: string | null;
  other_tasks_description: string;
  inspection_types: { id: number; name: string }[];
  personnel: { id: number; full_name: string }[];
  tasks: string[];
}

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

const statusLabels: Record<string, string> = {
  delivered: 'Teslim Edildi',
  in_progress: 'İşlemde',
  reported: 'Raporlandı',
  awaiting_invoice: 'Fatura Bekliyor',
  completed: 'Tamamlandı',
  cancelled: 'İptal Edildi',
  archived: 'Arşivlendi',
};

const taskLabels: Record<string, string> = {
  countBag: 'Adet/Bağ Sayımı',
  holdCleaning: 'Ambar Temizlik Gözetimi',
  warehouseStock: 'Depo (Stok Kontrolü)',
  draftSurvey: 'Draft Survey',
  photography: 'Fotoğraf Çekimi',
  damageInspection: 'Hasar Gözetimi',
  qualityInspection: 'Kalite Gözetimi',
  weighbridge: 'Kantar ve Puantaj',
  containerInspection: 'Konteyner Gözetimi',
  sealingUnsealing: 'Mühürleme/Mühür Sökme',
  samplePreparation: 'Numune Alma / Hazırlama',
  radiationMeasurement: 'Radyasyon Ölçümü',
  preShipment: 'Sevkiyat Öncesi Gözetim',
  dischargeInspection: 'Tahliye Gözetimi',
  productionInspection: 'Üretim Gözetimi',
  loadingInspection: 'Yükleme Gözetimi',
};

export default function WorkOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [workOrder, setWorkOrder] = useState<WorkOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkOrder = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await api.workOrders.getById(Number(id));
        setWorkOrder(data as WorkOrderData);
      } catch (err) {
        console.error('Error loading work order:', err);
        setError('İş emri yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    loadWorkOrder();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !workOrder) {
    return (
      <Box>
        <Typography variant="h5" color="error">
          {error || 'İş emri bulunamadı'}
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
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy, HH:mm', { locale: tr });
    } catch {
      return '-';
    }
  };

  const formatDateShort = (dateString: string | null) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy', { locale: tr });
    } catch {
      return '-';
    }
  };

  const getFileNumberDisplay = () => {
    const year = new Date(workOrder.open_date).getFullYear().toString().slice(-2);
    const paddedNumber = workOrder.file_number.toString().padStart(4, '0');
    return `${workOrder.file_type}${year}-${paddedNumber}`;
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
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <IconButton onClick={() => navigate('/work-orders')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {getFileNumberDisplay()}
            </Typography>
            <Chip
              label={statusLabels[workOrder.status] || workOrder.status}
              color={getStatusColor(workOrder.status)}
            />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ ml: 7 }}>
            {formatDate(workOrder.open_date)}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/work-orders/${id}/edit`)}
          >
            {t('common.edit')}
          </Button>
          <IconButton color="primary">
            <PdfIcon />
          </IconButton>
          <IconButton color="primary">
            <EmailIcon />
          </IconButton>
          <IconButton color="primary">
            <PrintIcon />
          </IconButton>
        </Stack>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label={t('workOrder.generalInfo')} />
          <Tab label={t('workOrder.tasksToPerform')} />
          <Tab label={t('workOrder.inspectionPersonnel')} />
        </Tabs>

        <Box sx={{ p: 3 }}>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {t('workOrder.basicInfo')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <InfoRow label={t('workOrder.fileNumber')} value={getFileNumberDisplay()} />
                <InfoRow label={t('workOrder.status')} value={statusLabels[workOrder.status] || workOrder.status} />
                <InfoRow label={t('workOrder.responsible')} value={workOrder.responsible} />
                <InfoRow label={t('workOrder.openDate')} value={formatDate(workOrder.open_date)} />
                <InfoRow label={t('workOrder.reportDate')} value={formatDateShort(workOrder.report_date)} />
                <InfoRow label={t('workOrder.inspectionDate')} value={formatDateShort(workOrder.inspection_date)} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {t('workOrder.companyInfo')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <InfoRow label={t('workOrder.company')} value={workOrder.company_name} />
                <InfoRow label={t('workOrder.ship')} value={workOrder.ship_name} />
                <InfoRow label={t('workOrder.topic')} value={workOrder.topic_name} />
                <InfoRow label={t('workOrder.tonnage')} value={workOrder.tonnage ? `${Number(workOrder.tonnage).toLocaleString('tr-TR')} ton` : '-'} />
                <InfoRow label={t('workOrder.invoiceNumber')} value={workOrder.invoice_number} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {t('workOrder.inspectionDetails')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <InfoRow label={t('workOrder.inspectionArea')} value={workOrder.inspection_area_name} />
                <InfoRow label={t('workOrder.inspectionItem')} value={workOrder.inspection_item_name} />
                <InfoRow 
                  label={t('workOrder.inspectionType')} 
                  value={workOrder.inspection_types?.map(t => t.name).join(', ') || '-'} 
                />
                <InfoRow label={t('workOrder.supervisionLocation')} value={workOrder.supervision_location_name} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  {t('workOrder.location')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <InfoRow label={t('workOrder.province')} value={workOrder.province_name} />
                <InfoRow label={t('workOrder.district')} value={workOrder.district_name} />
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              {t('workOrder.tasksToPerform')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {workOrder.tasks && workOrder.tasks.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {workOrder.tasks.map((task) => (
                  <Chip key={task} label={taskLabels[task] || task} color="primary" variant="outlined" />
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary">Görev seçilmemiş</Typography>
            )}
            {workOrder.other_tasks_description && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {t('workOrder.otherTasksDescription')}:
                </Typography>
                <Typography>{workOrder.other_tasks_description}</Typography>
              </Box>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
              {t('workOrder.inspectionPersonnel')}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {workOrder.personnel && workOrder.personnel.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {workOrder.personnel.map((person) => (
                  <Chip key={person.id} label={person.full_name} color="secondary" variant="outlined" />
                ))}
              </Stack>
            ) : (
              <Typography color="text.secondary">Personel atanmamış</Typography>
            )}
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
}
