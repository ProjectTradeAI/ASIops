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

const getNextFileNumber = (fileType: 'ASIC' | 'ASI' | 'FT'): number => {
  const existingNumbers = mockWorkOrders
    .filter(order => order.fileNumber.startsWith(fileType))
    .map(order => {
      const match = order.fileNumber.match(/\d+$/);
      return match ? parseInt(match[0], 10) : 0;
    });
  return Math.max(...existingNumbers, 0) + 1;
};

export default function WorkOrderForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<FormData>({
    fileType: 'ASIC',
    fileNumber: 26,
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
    inspectionTypes: ['', '', '', '', ''],
    supervisionLocation: '',
    inspectionPersonnel: ['', '', '', '', ''],
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
        const numberMatch = workOrder.fileNumber.match(/\d+$/);
        const fileNumber = numberMatch ? parseInt(numberMatch[0], 10) : 0;
        
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
          inspectionTypes: [workOrder.inspectionType, '', '', '', ''],
          supervisionLocation: workOrder.supervisionLocation,
          inspectionPersonnel: workOrder.employees?.slice(0, 5) || ['', '', '', '', ''],
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

  const handleInspectionTypeChange = (index: number, value: string) => {
    const newTypes = [...formData.inspectionTypes];
    newTypes[index] = value;
    setFormData((prev) => ({ ...prev, inspectionTypes: newTypes }));
  };

  const handlePersonnelChange = (index: number, value: string) => {
    const newPersonnel = [...formData.inspectionPersonnel];
    newPersonnel[index] = value;
    setFormData((prev) => ({ ...prev, inspectionPersonnel: newPersonnel }));
  };

  const openAddDialog = (field: string) => {
    setAddDialogField(field);
    setNewItemValue('');
    setAddDialogOpen(true);
  };

  const handleAddNewItem = () => {
    console.log(`Adding new ${addDialogField}: ${newItemValue}`);
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
              <ToggleButton value="ASIC">
                <DescriptionIcon sx={{ mr: 1 }} /> ASIC
              </ToggleButton>
              <ToggleButton value="ASI">
                <DescriptionIcon sx={{ mr: 1 }} /> ASI
              </ToggleButton>
            </ToggleButtonGroup>
            <Button variant="outlined" startIcon={<SearchIcon />}>
              {t('common.search')}
            </Button>
            <Button variant="contained" color="error" startIcon={<AddIcon />}>
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
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.fileNumber').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={formData.fileType}
                      onChange={(e) => handleChange('fileType', e.target.value)}
                    >
                      <MenuItem value="ASIC">ASIC</MenuItem>
                      <MenuItem value="ASI">ASI</MenuItem>
                      <MenuItem value="FT">FT</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      size="small"
                      value={formData.fileNumber}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      {t('common.autoGenerated')}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.reportDate').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={formData.reportDate}
                      onChange={(e) => handleChange('reportDate', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.openDate').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      type="datetime-local"
                      value={formData.openDate}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.inspectionDate').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={formData.inspectionDate}
                      onChange={(e) => handleChange('inspectionDate', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.dateRange').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={formData.dateRangeEnd}
                      onChange={(e) => handleChange('dateRangeEnd', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.invoiceNumber').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleChange('invoiceNumber', e.target.value)}
                      helperText={t('workOrder.invoiceHint')}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.responsible').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1">{formData.responsible}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.tonnage').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      value={formData.tonnage}
                      onChange={(e) => handleChange('tonnage', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.topic').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      size="small"
                      options={mockTopics}
                      value={formData.topic || null}
                      onChange={(_, v) => handleChange('topic', v || '')}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={t('common.pleaseSelect')} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('topic')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.company').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      size="small"
                      options={mockCompanies}
                      value={formData.companyName || null}
                      onChange={(_, v) => handleChange('companyName', v || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('common.pleaseSelect')}
                          error={Boolean(errors.companyName)}
                          helperText={errors.companyName}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('company')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.customerRefNo').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      size="small"
                      value={formData.customerRefNo}
                      onChange={(e) => handleChange('customerRefNo', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.ship').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      size="small"
                      options={mockShips}
                      value={formData.shipName || null}
                      onChange={(_, v) => handleChange('shipName', v || '')}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={t('common.pleaseSelect')} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('ship')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.inspectionArea').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      size="small"
                      options={mockInspectionAreas}
                      value={formData.inspectionArea || null}
                      onChange={(_, v) => handleChange('inspectionArea', v || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('common.pleaseSelect')}
                          error={Boolean(errors.inspectionArea)}
                          helperText={errors.inspectionArea}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionArea')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.inspectionItem').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      size="small"
                      options={mockInspectionItems}
                      value={formData.inspectionItem || null}
                      onChange={(_, v) => handleChange('inspectionItem', v || '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('common.pleaseSelect')}
                          error={Boolean(errors.inspectionItem)}
                          helperText={errors.inspectionItem}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionItem')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.inspectionType').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Stack spacing={1}>
                      {formData.inspectionTypes.map((type, index) => (
                        <Autocomplete
                          key={index}
                          size="small"
                          options={mockInspectionTypes}
                          value={type || null}
                          onChange={(_, v) => handleInspectionTypeChange(index, v || '')}
                          renderInput={(params) => (
                            <TextField {...params} placeholder={t('common.pleaseSelect')} />
                          )}
                        />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionType')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.supervisionLocation').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      size="small"
                      options={mockLocations}
                      value={formData.supervisionLocation || null}
                      onChange={(_, v) => handleChange('supervisionLocation', v || '')}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={t('common.pleaseSelect')} />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('location')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.inspectionPersonnel').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Stack spacing={1}>
                      {formData.inspectionPersonnel.map((person, index) => (
                        <Autocomplete
                          key={index}
                          size="small"
                          options={mockEmployees}
                          value={person || null}
                          onChange={(_, v) => handlePersonnelChange(index, v || '')}
                          renderInput={(params) => (
                            <TextField {...params} placeholder={t('common.pleaseSelect')} />
                          )}
                        />
                      ))}
                    </Stack>
                  </Grid>
                  <Grid item xs={3}>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('personnel')}>
                      {t('common.add')}
                    </Button>
                    <TextField size="small" placeholder={t('common.addNewItem')} sx={{ ml: 1, width: 180 }} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.province').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Autocomplete
                      size="small"
                      options={mockProvinces}
                      value={formData.province || null}
                      onChange={(_, v) => handleProvinceChange(v || '')}
                      renderInput={(params) => (
                        <TextField {...params} placeholder={t('common.pleaseSelect')} />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={4}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.district').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Autocomplete
                      size="small"
                      options={formData.province ? (districtsByProvince[formData.province] || []) : []}
                      value={formData.district || null}
                      onChange={(_, v) => handleChange('district', v || '')}
                      disabled={!formData.province}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={formData.province ? t('common.pleaseSelect') : t('common.selectFirstProvince')}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12} md={2}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.tasksToPerform').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <FormGroup row>
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
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12} md={2}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.otherTasksDescription').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      value={formData.otherTasksDescription}
                      onChange={(e) => handleChange('otherTasksDescription', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Typography variant="body2" fontWeight={600} color="primary">
                      {t('workOrder.operation').toUpperCase()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{ minWidth: 200 }}
                    >
                      {t('common.submit')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Paper>

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
        <DialogTitle>{t('common.addNewItem')}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            placeholder={t('common.addNewItem')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleAddNewItem} variant="contained">{t('common.add')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
