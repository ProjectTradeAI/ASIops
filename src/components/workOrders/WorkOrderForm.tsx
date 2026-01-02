import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Autocomplete,
  Chip,
  Stack,
  IconButton,
  MenuItem,
  Divider,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Save as SaveIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import mockWorkOrders from '../../data/mockWorkOrders.json';

// Mock data for autocomplete fields
const mockCompanies = [
  'ORUA GENERAL TRADING',
  'AVEKS İÇ VE DIŞ TİCARET A.Ş.',
  'KAPTAN DEMİR ÇELİK END. VE TİCARET A.Ş.',
  'POLİMETAL MADENCİLİK SAN. VE TİC. A.Ş.',
  'CRESCO COMMODITIES',
];

const mockShips = [
  'ANGORA 4',
  'BONITA',
  'CAPTAIN OMAR',
  'OCEAN CENTURY',
  'BLUE FISH',
];

const mockEmployees = [
  'Tolga Ülcin',
  'Zafer Turan',
  'İmam Ok',
  'Zeki Erdem',
  'Okan Çalışkan',
  'Servet Çakır',
  'Altan Gungormus',
];

const mockInspectionAreas = [
  'KÖMÜR',
  'AĞI METALLER VE AĞI METALLERDEN EŞYA',
  'KIYMETLI METALLER',
];

const mockInspectionItems = [
  'KÖMÜR',
  'PİK DEMİR',
  'ÇELİK HURDASI',
  'GÜMÜŞ KİLÇE',
  'HBI',
];

const mockInspectionTypes = [
  'DRAFT SURVEY',
  'TARTIMA VE NUMUNE ALMAYA NEZARET',
  'MALZEME HASAR GÖZETİMİ',
  'STOK GÖZETİMİ',
];

const mockLocations = [
  'ERDEMİR LİMANI',
  'ALİAĞA',
  'MARTAŞ',
  'NADİR METAL RAFİNERİSİ',
  'GÜRCİSTAN',
];

const mockProvinces = [
  'Zonguldak',
  'İzmir',
  'Tekirdağ',
  'İstanbul',
];

interface FormData {
  fileNumber: string;
  status: string;
  companyName: string;
  shipName: string;
  inspectionArea: string;
  inspectionItem: string;
  inspectionType: string;
  supervisionLocation: string;
  province: string;
  district: string;
  tonnage: string;
  employees: string[];
  inspectionDateStart: string;
  inspectionDateEnd: string;
  reportDate: string;
  invoiceNumber: string;
}

export default function WorkOrderForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<FormData>({
    fileNumber: '',
    status: 'created',
    companyName: '',
    shipName: '',
    inspectionArea: '',
    inspectionItem: '',
    inspectionType: '',
    supervisionLocation: '',
    province: '',
    district: '',
    tonnage: '',
    employees: [],
    inspectionDateStart: '',
    inspectionDateEnd: '',
    reportDate: '',
    invoiceNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load existing work order data in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const workOrder = mockWorkOrders.find((order) => order.id === Number(id));
      if (workOrder) {
        setFormData({
          fileNumber: workOrder.fileNumber,
          status: workOrder.status,
          companyName: workOrder.companyName,
          shipName: workOrder.shipName || '',
          inspectionArea: workOrder.inspectionArea,
          inspectionItem: workOrder.inspectionItem,
          inspectionType: workOrder.inspectionType,
          supervisionLocation: workOrder.supervisionLocation,
          province: workOrder.province,
          district: workOrder.district,
          tonnage: workOrder.tonnage?.toString() || '',
          employees: workOrder.employees || [],
          inspectionDateStart: workOrder.inspectionDateStart || '',
          inspectionDateEnd: workOrder.inspectionDateEnd || '',
          reportDate: workOrder.reportDate || '',
          invoiceNumber: workOrder.invoiceNumber || '',
        });
      }
    } else {
      // Generate file number for new work order
      setFormData((prev) => ({
        ...prev,
        fileNumber: `ASI25-${String(Math.floor(Math.random() * 1000) + 100).padStart(4, '0')}`,
      }));
    }
  }, [id, isEditMode]);

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is modified
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName) newErrors.companyName = t('validation.required');
    if (!formData.inspectionArea) newErrors.inspectionArea = t('validation.required');
    if (!formData.inspectionItem) newErrors.inspectionItem = t('validation.required');
    if (!formData.inspectionType) newErrors.inspectionType = t('validation.required');
    if (!formData.supervisionLocation) newErrors.supervisionLocation = t('validation.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // In real app, would call API here
    console.log('Submitting work order:', formData);

    // eslint-disable-next-line no-alert
    alert(
      isEditMode
        ? 'İş emri güncellendi! (Prototip - gerçek veri kaydedilmedi)'
        : 'Yeni iş emri oluşturuldu! (Prototip - gerçek veri kaydedilmedi)'
    );

    navigate('/work-orders');
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate('/work-orders')}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {isEditMode ? `${t('common.edit')} ${t('workOrder.title')}` : t('menu.newWorkOrder')}
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <Paper sx={{ p: 3 }}>
          {/* File Information */}
          <Typography variant="h6" gutterBottom>
            Dosya Bilgileri
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label={t('workOrder.fileNumber')}
                value={formData.fileNumber}
                disabled
                helperText="Otomatik oluşturuldu"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                select
                label={t('workOrder.status')}
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <MenuItem value="created">{t('workOrder.statuses.created')}</MenuItem>
                <MenuItem value="in_progress">{t('workOrder.statuses.in_progress')}</MenuItem>
                <MenuItem value="reported">{t('workOrder.statuses.reported')}</MenuItem>
                <MenuItem value="completed">{t('workOrder.statuses.completed')}</MenuItem>
                <MenuItem value="cancelled">{t('workOrder.statuses.cancelled')}</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label={t('workOrder.invoiceNumber')}
                value={formData.invoiceNumber}
                onChange={(e) => handleChange('invoiceNumber', e.target.value)}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Company and Ship */}
          <Typography variant="h6" gutterBottom>
            Firma ve Gemi Bilgileri
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={mockCompanies}
                value={formData.companyName}
                onChange={(_, newValue) => handleChange('companyName', newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('workOrder.company')}
                    required
                    error={Boolean(errors.companyName)}
                    helperText={errors.companyName}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={mockShips}
                value={formData.shipName}
                onChange={(_, newValue) => handleChange('shipName', newValue || '')}
                renderInput={(params) => (
                  <TextField {...params} label={t('workOrder.ship')} />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Autocomplete
                freeSolo
                options={mockProvinces}
                value={formData.province}
                onChange={(_, newValue) => handleChange('province', newValue || '')}
                renderInput={(params) => <TextField {...params} label={t('workOrder.province')} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label={t('workOrder.district')}
                value={formData.district}
                onChange={(e) => handleChange('district', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="number"
                label={t('workOrder.tonnage')}
                value={formData.tonnage}
                onChange={(e) => handleChange('tonnage', e.target.value)}
                InputProps={{ endAdornment: 'ton' }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Inspection Details */}
          <Typography variant="h6" gutterBottom>
            Muayene Bilgileri
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={mockInspectionAreas}
                value={formData.inspectionArea}
                onChange={(_, newValue) => handleChange('inspectionArea', newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('workOrder.inspectionArea')}
                    required
                    error={Boolean(errors.inspectionArea)}
                    helperText={errors.inspectionArea}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={mockInspectionItems}
                value={formData.inspectionItem}
                onChange={(_, newValue) => handleChange('inspectionItem', newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('workOrder.inspectionItem')}
                    required
                    error={Boolean(errors.inspectionItem)}
                    helperText={errors.inspectionItem}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={mockInspectionTypes}
                value={formData.inspectionType}
                onChange={(_, newValue) => handleChange('inspectionType', newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('workOrder.inspectionType')}
                    required
                    error={Boolean(errors.inspectionType)}
                    helperText={errors.inspectionType}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                options={mockLocations}
                value={formData.supervisionLocation}
                onChange={(_, newValue) => handleChange('supervisionLocation', newValue || '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('workOrder.supervisionLocation')}
                    required
                    error={Boolean(errors.supervisionLocation)}
                    helperText={errors.supervisionLocation}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Dates and Personnel */}
          <Typography variant="h6" gutterBottom>
            Tarihler ve Personel
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Muayene Başlangıç"
                value={formData.inspectionDateStart}
                onChange={(e) => handleChange('inspectionDateStart', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Muayene Bitiş"
                value={formData.inspectionDateEnd}
                onChange={(e) => handleChange('inspectionDateEnd', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                type="date"
                label={t('workOrder.reportDate')}
                value={formData.reportDate}
                onChange={(e) => handleChange('reportDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={mockEmployees}
                value={formData.employees}
                onChange={(_, newValue) => handleChange('employees', newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip label={option} {...getTagProps({ index })} key={option} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label={t('workOrder.personnel')} placeholder="Personel seç" />
                )}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
            <Button variant="outlined" onClick={() => navigate('/work-orders')}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              {t('common.save')}
            </Button>
          </Stack>
        </Paper>
      </form>
    </Box>
  );
}