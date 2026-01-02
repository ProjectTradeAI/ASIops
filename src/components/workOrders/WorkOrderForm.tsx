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
  Stack,
  IconButton,
  MenuItem,
  Divider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import mockWorkOrders from '../../data/mockWorkOrders.json';

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

const mockTopics = [
  'İHRACAT',
  'İTHALAT',
  'YURTİÇİ',
  'DEPOLAMA',
];

const mockProvinces = [
  'İstanbul',
  'İzmir',
  'Ankara',
  'Zonguldak',
  'Tekirdağ',
  'Kocaeli',
  'Bursa',
  'Mersin',
  'Hatay',
  'Samsun',
];

const districtsByProvince: Record<string, string[]> = {
  'İstanbul': ['Kadıköy', 'Beşiktaş', 'Şişli', 'Üsküdar', 'Beyoğlu', 'Fatih', 'Kartal', 'Pendik'],
  'İzmir': ['Konak', 'Karşıyaka', 'Bornova', 'Aliağa', 'Çiğli', 'Gaziemir'],
  'Ankara': ['Çankaya', 'Keçiören', 'Mamak', 'Yenimahalle', 'Etimesgut'],
  'Zonguldak': ['Merkez', 'Ereğli', 'Çaycuma', 'Devrek', 'Alaplı'],
  'Tekirdağ': ['Çorlu', 'Çerkezköy', 'Süleymanpaşa', 'Ergene', 'Malkara'],
  'Kocaeli': ['İzmit', 'Gebze', 'Darıca', 'Körfez', 'Gölcük'],
  'Bursa': ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Mudanya', 'Gemlik'],
  'Mersin': ['Akdeniz', 'Mezitli', 'Toroslar', 'Yenişehir', 'Tarsus'],
  'Hatay': ['Antakya', 'İskenderun', 'Dörtyol', 'Samandağ'],
  'Samsun': ['İlkadım', 'Atakum', 'Canik', 'Tekkeköy'],
};

const taskOptions = [
  { key: 'countBag', label: 'Adet/Bağ Sayımı' },
  { key: 'holdCleaning', label: 'Ambar Temizlik Gözetimi' },
  { key: 'warehouseStock', label: 'Depo (Stok Kontrolü)' },
  { key: 'draftSurvey', label: 'Draft Survey' },
  { key: 'photography', label: 'Fotoğraf Çekimi' },
  { key: 'damageInspection', label: 'Hasar Gözetimi' },
  { key: 'qualityInspection', label: 'Kalite Gözetimi' },
  { key: 'weighbridge', label: 'Kantar ve Puantaj' },
  { key: 'containerInspection', label: 'Konteyner Gözetimi' },
  { key: 'sealingUnsealing', label: 'Mühürleme/Mühür Sökme' },
  { key: 'samplePreparation', label: 'Numune Alma / Hazırlama' },
  { key: 'radiationMeasurement', label: 'Radyasyon Ölçümü' },
  { key: 'preShipment', label: 'Sevkiyat Öncesi Gözetim' },
  { key: 'dischargeInspection', label: 'Tahliye Gözetimi' },
  { key: 'productionInspection', label: 'Üretim Gözetimi' },
  { key: 'loadingInspection', label: 'Yükleme Gözetimi' },
];

interface FormData {
  fileType: 'ASIC' | 'ASI' | 'FT';
  fileNumber: number;
  status: string;
  openDate: string;
  reportDate: string;
  inspectionDate: string;
  dateRangeEnd: string;
  invoiceNumber: string;
  responsible: string;
  tonnage: string;
  topic: string;
  companyName: string;
  customerRefNo: string;
  shipName: string;
  inspectionArea: string;
  inspectionItem: string;
  inspectionTypes: string[];
  supervisionLocation: string;
  inspectionPersonnel: string[];
  province: string;
  district: string;
  selectedTasks: string[];
  otherTasksDescription: string;
}

const currentYear = new Date().getFullYear().toString().slice(-2);

const getNextFileNumber = (fileType: 'ASIC' | 'ASI' | 'FT'): number => {
  const prefix = `${fileType}${currentYear}-`;
  const existingNumbers = mockWorkOrders
    .filter(order => order.fileNumber.startsWith(prefix))
    .map(order => {
      const match = order.fileNumber.match(/-(\d+)$/);
      return match ? parseInt(match[1], 10) : 0;
    });
  return existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
};

const formatFileNumber = (fileType: 'ASIC' | 'ASI' | 'FT', num: number): string => {
  return `${fileType}${currentYear}-${String(num).padStart(4, '0')}`;
};

export default function WorkOrderForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<FormData>({
    fileType: 'ASIC',
    fileNumber: 1,
    status: 'created',
    openDate: new Date().toISOString().slice(0, 16),
    reportDate: '',
    inspectionDate: '',
    dateRangeEnd: '',
    invoiceNumber: '',
    responsible: 'Leyla',
    tonnage: '',
    topic: '',
    companyName: '',
    customerRefNo: '',
    shipName: '',
    inspectionArea: '',
    inspectionItem: '',
    inspectionTypes: [],
    supervisionLocation: '',
    inspectionPersonnel: [],
    province: '',
    district: '',
    selectedTasks: [],
    otherTasksDescription: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogField, setAddDialogField] = useState('');
  const [newItemValue, setNewItemValue] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      const workOrder = mockWorkOrders.find((order) => order.id === Number(id));
      if (workOrder) {
        const fileType = workOrder.fileNumber.startsWith('ASIC') ? 'ASIC' : 
                        workOrder.fileNumber.startsWith('ASI') ? 'ASI' : 'FT';
        const numberMatch = workOrder.fileNumber.match(/-(\d+)$/);
        const fileNumber = numberMatch ? parseInt(numberMatch[1], 10) : 1;
        
        setFormData({
          fileType,
          fileNumber,
          status: workOrder.status,
          openDate: new Date().toISOString().slice(0, 16),
          reportDate: workOrder.reportDate || '',
          inspectionDate: workOrder.inspectionDateStart || '',
          dateRangeEnd: workOrder.inspectionDateEnd || '',
          invoiceNumber: workOrder.invoiceNumber || '',
          responsible: 'Leyla',
          tonnage: workOrder.tonnage?.toString() || '',
          topic: '',
          companyName: workOrder.companyName,
          customerRefNo: '',
          shipName: workOrder.shipName || '',
          inspectionArea: workOrder.inspectionArea,
          inspectionItem: workOrder.inspectionItem,
          inspectionTypes: workOrder.inspectionType ? [workOrder.inspectionType] : [],
          supervisionLocation: workOrder.supervisionLocation,
          inspectionPersonnel: workOrder.employees || [],
          province: workOrder.province,
          district: workOrder.district,
          selectedTasks: [],
          otherTasksDescription: '',
        });
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        fileNumber: getNextFileNumber(prev.fileType),
      }));
    }
  }, [id, isEditMode]);

  const handleFileTypeChange = (_: React.MouseEvent<HTMLElement>, newType: 'ASIC' | 'ASI' | 'FT' | null) => {
    if (newType) {
      setFormData((prev) => ({
        ...prev,
        fileType: newType,
        fileNumber: getNextFileNumber(newType),
      }));
    }
  };

  const handleChange = (field: keyof FormData, value: string | string[] | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleProvinceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, province: value, district: '' }));
  };

  const handleTaskToggle = (taskKey: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTasks: prev.selectedTasks.includes(taskKey)
        ? prev.selectedTasks.filter((t) => t !== taskKey)
        : [...prev.selectedTasks, taskKey],
    }));
  };

  const openAddDialog = (field: string) => {
    setAddDialogField(field);
    setNewItemValue('');
    setAddDialogOpen(true);
  };

  const handleAddNewItem = () => {
    if (newItemValue.trim()) {
      console.log(`Adding new ${addDialogField}: ${newItemValue}`);
      alert(`Yeni kayıt eklendi: ${newItemValue} (Prototip - gerçek veri kaydedilmedi)`);
    }
    setAddDialogOpen(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName) newErrors.companyName = t('validation.required');
    if (!formData.inspectionArea) newErrors.inspectionArea = t('validation.required');
    if (!formData.inspectionItem) newErrors.inspectionItem = t('validation.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log('Submitting work order:', formData);
    alert(
      isEditMode
        ? 'İş emri güncellendi! (Prototip - gerçek veri kaydedilmedi)'
        : 'Yeni iş emri oluşturuldu! (Prototip - gerçek veri kaydedilmedi)'
    );
    navigate('/work-orders');
  };

  const getDialogTitle = () => {
    const titles: Record<string, string> = {
      topic: t('workOrder.topic'),
      company: t('workOrder.company'),
      ship: t('workOrder.ship'),
      inspectionArea: t('workOrder.inspectionArea'),
      inspectionItem: t('workOrder.inspectionItem'),
      inspectionType: t('workOrder.inspectionType'),
      location: t('workOrder.supervisionLocation'),
      personnel: t('workOrder.inspectionPersonnel'),
    };
    return `${t('common.add')} - ${titles[addDialogField] || ''}`;
  };

  return (
    <Box>
      <Paper sx={{ mb: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={() => navigate('/work-orders')} aria-label={t('common.back')}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {t('workOrder.formTitle')}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <ToggleButtonGroup
              value={formData.fileType}
              exclusive
              onChange={handleFileTypeChange}
              size="small"
              aria-label={t('workOrder.fileType')}
              sx={{
                '& .MuiToggleButton-root': {
                  px: 3,
                  fontWeight: 600,
                  '&.Mui-selected': {
                    bgcolor: '#ef5350',
                    color: 'white',
                    '&:hover': { bgcolor: '#d32f2f' },
                  },
                },
              }}
            >
              <ToggleButton value="ASIC" aria-label="ASIC">
                <DescriptionIcon sx={{ mr: 1 }} /> ASIC
              </ToggleButton>
              <ToggleButton value="ASI" aria-label="ASI">
                <DescriptionIcon sx={{ mr: 1 }} /> ASI
              </ToggleButton>
              <ToggleButton value="FT" aria-label="FT">
                <DescriptionIcon sx={{ mr: 1 }} /> FT
              </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" startIcon={<SearchIcon />} aria-label={t('common.search')}>
              {t('common.search')}
            </Button>
            <Button variant="contained" color="error" startIcon={<AddIcon />} aria-label={t('common.add')}>
              {t('common.add')}
            </Button>
          </Stack>
        </Box>

        <Box sx={{ bgcolor: '#1a237e', color: 'white', py: 1, px: 2 }}>
          <Typography variant="body2">
            <AddIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
            {t('workOrder.addForm')}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.fileNumber').toUpperCase()}
                  </Typography>
                  <TextField
                    select
                    size="small"
                    value={formData.fileType}
                    onChange={(e) => {
                      const newType = e.target.value as 'ASIC' | 'ASI' | 'FT';
                      setFormData((prev) => ({
                        ...prev,
                        fileType: newType,
                        fileNumber: getNextFileNumber(newType),
                      }));
                    }}
                    sx={{ minWidth: 100 }}
                    inputProps={{ 'aria-label': t('workOrder.fileType') }}
                  >
                    <MenuItem value="ASIC">ASIC</MenuItem>
                    <MenuItem value="ASI">ASI</MenuItem>
                    <MenuItem value="FT">FT</MenuItem>
                  </TextField>
                  <TextField
                    size="small"
                    value={formData.fileNumber}
                    disabled
                    sx={{ width: 80 }}
                    inputProps={{ 'aria-label': t('workOrder.fileNumber') }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    ({formatFileNumber(formData.fileType, formData.fileNumber)}) - {t('common.autoGenerated')}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.openDate').toUpperCase()}
                  </Typography>
                  <TextField
                    size="small"
                    type="datetime-local"
                    value={formData.openDate}
                    disabled
                    helperText={t('common.autoGenerated')}
                    inputProps={{ 'aria-label': t('workOrder.openDate') }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.reportDate').toUpperCase()}
                  </Typography>
                  <TextField
                    size="small"
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleChange('reportDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ 'aria-label': t('workOrder.reportDate') }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.responsible').toUpperCase()}
                  </Typography>
                  <Typography variant="body1">{formData.responsible}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.inspectionDate').toUpperCase()}
                  </Typography>
                  <TextField
                    size="small"
                    type="date"
                    value={formData.inspectionDate}
                    onChange={(e) => handleChange('inspectionDate', e.target.value)}
                    inputProps={{ 'aria-label': t('workOrder.inspectionDate') }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.dateRange').toUpperCase()}
                  </Typography>
                  <TextField
                    size="small"
                    type="date"
                    value={formData.dateRangeEnd}
                    onChange={(e) => handleChange('dateRangeEnd', e.target.value)}
                    inputProps={{ 'aria-label': t('workOrder.dateRange') }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.invoiceNumber').toUpperCase()}
                  </Typography>
                  <TextField
                    size="small"
                    value={formData.invoiceNumber}
                    onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                    helperText={t('workOrder.invoiceHint')}
                    inputProps={{ 'aria-label': t('workOrder.invoiceNumber') }}
                    sx={{ flex: 1, maxWidth: 300 }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.tonnage').toUpperCase()}
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    value={formData.tonnage}
                    onChange={(e) => handleChange('tonnage', e.target.value)}
                    inputProps={{ 'aria-label': t('workOrder.tonnage') }}
                    sx={{ width: 150 }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.topic').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={mockTopics}
                    value={formData.topic || null}
                    onChange={(_, v) => handleChange('topic', v || '')}
                    sx={{ flex: 1, maxWidth: 250 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('topic')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.customerRefNo').toUpperCase()}
                  </Typography>
                  <TextField
                    size="small"
                    value={formData.customerRefNo}
                    onChange={(e) => handleChange('customerRefNo', e.target.value)}
                    inputProps={{ 'aria-label': t('workOrder.customerRefNo') }}
                    sx={{ flex: 1, maxWidth: 300 }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.company').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={mockCompanies}
                    value={formData.companyName || null}
                    onChange={(_, v) => handleChange('companyName', v || '')}
                    sx={{ flex: 1, maxWidth: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t('common.pleaseSelect')}
                        error={Boolean(errors.companyName)}
                        helperText={errors.companyName}
                      />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('company')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.ship').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={mockShips}
                    value={formData.shipName || null}
                    onChange={(_, v) => handleChange('shipName', v || '')}
                    sx={{ flex: 1, maxWidth: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('ship')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.inspectionArea').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={mockInspectionAreas}
                    value={formData.inspectionArea || null}
                    onChange={(_, v) => handleChange('inspectionArea', v || '')}
                    sx={{ flex: 1, maxWidth: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t('common.pleaseSelect')}
                        error={Boolean(errors.inspectionArea)}
                        helperText={errors.inspectionArea}
                      />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionArea')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.inspectionItem').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={mockInspectionItems}
                    value={formData.inspectionItem || null}
                    onChange={(_, v) => handleChange('inspectionItem', v || '')}
                    sx={{ flex: 1, maxWidth: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t('common.pleaseSelect')}
                        error={Boolean(errors.inspectionItem)}
                        helperText={errors.inspectionItem}
                      />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionItem')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140, pt: 1 }}>
                    {t('workOrder.inspectionType').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    multiple
                    size="small"
                    options={mockInspectionTypes}
                    value={formData.inspectionTypes}
                    onChange={(_, v) => handleChange('inspectionTypes', v)}
                    sx={{ flex: 1, maxWidth: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionType')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.supervisionLocation').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={mockLocations}
                    value={formData.supervisionLocation || null}
                    onChange={(_, v) => handleChange('supervisionLocation', v || '')}
                    sx={{ flex: 1, maxWidth: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('location')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140, pt: 1 }}>
                    {t('workOrder.inspectionPersonnel').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    multiple
                    size="small"
                    options={mockEmployees}
                    value={formData.inspectionPersonnel}
                    onChange={(_, v) => handleChange('inspectionPersonnel', v)}
                    sx={{ flex: 1, maxWidth: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('personnel')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.province').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={mockProvinces}
                    value={formData.province || null}
                    onChange={(_, v) => handleProvinceChange(v || '')}
                    sx={{ flex: 1, maxWidth: 250 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.district').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={formData.province ? (districtsByProvince[formData.province] || []) : []}
                    value={formData.district || null}
                    onChange={(_, v) => handleChange('district', v || '')}
                    disabled={!formData.province}
                    sx={{ flex: 1, maxWidth: 250 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={formData.province ? t('common.pleaseSelect') : t('common.selectFirstProvince')}
                      />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="body2" fontWeight={600} color="primary">
                    {t('workOrder.tasksToPerform').toUpperCase()}
                  </Typography>
                  <FormGroup>
                    <Grid container spacing={1}>
                      {taskOptions.map((task) => (
                        <Grid item xs={6} sm={4} md={3} key={task.key}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                checked={formData.selectedTasks.includes(task.key)}
                                onChange={() => handleTaskToggle(task.key)}
                              />
                            }
                            label={<Typography variant="body2">{task.label}</Typography>}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={2}>
                  <Typography variant="body2" fontWeight={600} color="primary">
                    {t('workOrder.otherTasksDescription').toUpperCase()}
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.otherTasksDescription}
                    onChange={(e) => handleChange('otherTasksDescription', e.target.value)}
                    inputProps={{ 'aria-label': t('workOrder.otherTasksDescription') }}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 140 }}>
                    {t('workOrder.operation').toUpperCase()}
                  </Typography>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ minWidth: 200 }}
                  >
                    {t('common.submit')}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>

      <Dialog 
        open={addDialogOpen} 
        onClose={() => setAddDialogOpen(false)}
        aria-labelledby="add-dialog-title"
      >
        <DialogTitle id="add-dialog-title">{getDialogTitle()}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            label={t('common.addNewItem')}
            inputProps={{ 'aria-label': t('common.addNewItem') }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleAddNewItem} variant="contained" disabled={!newItemValue.trim()}>
            {t('common.add')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
