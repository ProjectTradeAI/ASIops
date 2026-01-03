import { useState, useEffect, useCallback } from 'react';
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
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { api, Company, Employee, Ship, LookupItem, Province, District } from '../../services/api';

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

const statusOptions = [
  { value: 'delivered', label: 'Teslim Edildi' },
  { value: 'in_progress', label: 'İşlemde' },
  { value: 'reported', label: 'Raporlandı' },
  { value: 'awaiting_invoice', label: 'Fatura Bekliyor' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'cancelled', label: 'İptal Edildi' },
  { value: 'archived', label: 'Arşivlendi' },
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
  topicId: number | null;
  companyId: number | null;
  customerRefNo: string;
  shipId: number | null;
  inspectionAreaId: number | null;
  inspectionItemId: number | null;
  inspectionTypeIds: number[];
  supervisionLocationId: number | null;
  personnelIds: number[];
  provinceId: number | null;
  districtId: number | null;
  selectedTasks: string[];
  otherTasksDescription: string;
}

const currentYear = new Date().getFullYear().toString().slice(-2);

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
    status: 'in_progress',
    openDate: new Date().toISOString().slice(0, 16),
    reportDate: '',
    inspectionDate: '',
    dateRangeEnd: '',
    invoiceNumber: '',
    responsible: 'Leyla',
    tonnage: '',
    topicId: null,
    companyId: null,
    customerRefNo: '',
    shipId: null,
    inspectionAreaId: null,
    inspectionItemId: null,
    inspectionTypeIds: [],
    supervisionLocationId: null,
    personnelIds: [],
    provinceId: null,
    districtId: null,
    selectedTasks: [],
    otherTasksDescription: '',
  });

  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [inspectionAreas, setInspectionAreas] = useState<LookupItem[]>([]);
  const [inspectionItems, setInspectionItems] = useState<LookupItem[]>([]);
  const [inspectionTypes, setInspectionTypes] = useState<LookupItem[]>([]);
  const [locations, setLocations] = useState<LookupItem[]>([]);
  const [topics, setTopics] = useState<LookupItem[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogField, setAddDialogField] = useState('');
  const [newItemValue, setNewItemValue] = useState('');

  const loadNextFileNumber = useCallback(async (fileType: 'ASIC' | 'ASI' | 'FT') => {
    try {
      const result = await api.workOrders.getNextNumber(fileType);
      return result.nextNumber;
    } catch (err) {
      console.error('Error loading next file number:', err);
      return 1;
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [
          companiesData,
          employeesData,
          shipsData,
          areasData,
          itemsData,
          typesData,
          locationsData,
          topicsData,
          provincesData,
        ] = await Promise.all([
          api.companies.getAll(),
          api.employees.getAll(),
          api.ships.getAll(),
          api.inspectionAreas.getAll(),
          api.inspectionItems.getAll(),
          api.inspectionTypes.getAll(),
          api.locations.getAll(),
          api.topics.getAll(),
          api.provinces.getAll(),
        ]);

        setCompanies(companiesData);
        setEmployees(employeesData);
        setShips(shipsData);
        setInspectionAreas(areasData);
        setInspectionItems(itemsData);
        setInspectionTypes(typesData);
        setLocations(locationsData);
        setTopics(topicsData);
        setProvinces(provincesData);

        if (!isEditMode) {
          const nextNumber = await loadNextFileNumber('ASIC');
          setFormData((prev) => ({ ...prev, fileNumber: nextNumber }));
        }
      } catch (err) {
        console.error('Error loading form data:', err);
        setError('Veriler yüklenirken hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isEditMode, loadNextFileNumber]);

  useEffect(() => {
    const loadDistricts = async () => {
      if (formData.provinceId) {
        try {
          const districtsData = await api.districts.getByProvince(formData.provinceId);
          setDistricts(districtsData);
        } catch (err) {
          console.error('Error loading districts:', err);
        }
      } else {
        setDistricts([]);
      }
    };
    loadDistricts();
  }, [formData.provinceId]);

  const handleFileTypeChange = async (_: React.MouseEvent<HTMLElement>, newType: 'ASIC' | 'ASI' | 'FT' | null) => {
    if (newType) {
      const nextNumber = await loadNextFileNumber(newType);
      setFormData((prev) => ({
        ...prev,
        fileType: newType,
        fileNumber: nextNumber,
      }));
    }
  };

  const handleChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleProvinceChange = (provinceId: number | null) => {
    setFormData((prev) => ({ ...prev, provinceId, districtId: null }));
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

  const handleAddNewItem = async () => {
    if (!newItemValue.trim()) {
      setAddDialogOpen(false);
      return;
    }

    try {
      switch (addDialogField) {
        case 'topic':
          const newTopic = await api.topics.create(newItemValue);
          setTopics((prev) => [...prev, newTopic]);
          break;
        case 'company':
          const newCompany = await api.companies.create({ company_name: newItemValue });
          setCompanies((prev) => [...prev, newCompany]);
          break;
        case 'ship':
          const newShip = await api.ships.create({ ship_name: newItemValue });
          setShips((prev) => [...prev, newShip]);
          break;
        case 'inspectionArea':
          const newArea = await api.inspectionAreas.create(newItemValue);
          setInspectionAreas((prev) => [...prev, newArea]);
          break;
        case 'inspectionItem':
          const newItem = await api.inspectionItems.create(newItemValue);
          setInspectionItems((prev) => [...prev, newItem]);
          break;
        case 'inspectionType':
          const newType = await api.inspectionTypes.create(newItemValue);
          setInspectionTypes((prev) => [...prev, newType]);
          break;
        case 'location':
          const newLocation = await api.locations.create(newItemValue);
          setLocations((prev) => [...prev, newLocation]);
          break;
        case 'personnel':
          const newEmployee = await api.employees.create({ full_name: newItemValue });
          setEmployees((prev) => [...prev, newEmployee]);
          break;
      }
      alert(`Yeni kayıt eklendi: ${newItemValue}`);
    } catch (err) {
      console.error('Error adding new item:', err);
      alert('Kayıt eklenirken hata oluştu');
    }
    setAddDialogOpen(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyId) newErrors.companyId = t('validation.required');
    if (!formData.inspectionAreaId) newErrors.inspectionAreaId = t('validation.required');
    if (!formData.inspectionItemId) newErrors.inspectionItemId = t('validation.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await api.workOrders.create({
        file_type: formData.fileType,
        file_number: formData.fileNumber,
        status: formData.status,
        report_date: formData.reportDate || null,
        inspection_date: formData.inspectionDate || null,
        date_range_end: formData.dateRangeEnd || null,
        invoice_number: formData.invoiceNumber,
        responsible: formData.responsible,
        tonnage: formData.tonnage ? parseFloat(formData.tonnage) : null,
        topic_id: formData.topicId,
        company_id: formData.companyId,
        customer_ref_no: formData.customerRefNo,
        ship_id: formData.shipId,
        inspection_area_id: formData.inspectionAreaId,
        inspection_item_id: formData.inspectionItemId,
        supervision_location_id: formData.supervisionLocationId,
        province_id: formData.provinceId,
        district_id: formData.districtId,
        other_tasks_description: formData.otherTasksDescription,
        inspection_type_ids: formData.inspectionTypeIds,
        personnel_ids: formData.personnelIds,
        selected_tasks: formData.selectedTasks,
      });
      alert(isEditMode ? 'İş emri güncellendi!' : 'Yeni iş emri oluşturuldu!');
      navigate('/work-orders');
    } catch (err) {
      console.error('Error submitting work order:', err);
      alert('İş emri kaydedilirken hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

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
                    onChange={async (e) => {
                      const newType = e.target.value as 'ASIC' | 'ASI' | 'FT';
                      const nextNumber = await loadNextFileNumber(newType);
                      setFormData((prev) => ({
                        ...prev,
                        fileType: newType,
                        fileNumber: nextNumber,
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
                    {t('workOrder.status').toUpperCase()}
                  </Typography>
                  <TextField
                    select
                    size="small"
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    sx={{ minWidth: 200 }}
                    inputProps={{ 'aria-label': t('workOrder.status') }}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
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

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.topic').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={topics}
                    getOptionLabel={(option) => option.name}
                    value={topics.find((t) => t.id === formData.topicId) || null}
                    onChange={(_, v) => handleChange('topicId', v?.id || null)}
                    sx={{ flex: 1, maxWidth: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('topic')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
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

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.company').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={companies}
                    getOptionLabel={(option) => option.company_name}
                    value={companies.find((c) => c.id === formData.companyId) || null}
                    onChange={(_, v) => handleChange('companyId', v?.id || null)}
                    sx={{ flex: 1, maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t('common.pleaseSelect')}
                        error={Boolean(errors.companyId)}
                        helperText={errors.companyId}
                      />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('company')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.ship').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={ships}
                    getOptionLabel={(option) => option.ship_name}
                    value={ships.find((s) => s.id === formData.shipId) || null}
                    onChange={(_, v) => handleChange('shipId', v?.id || null)}
                    sx={{ flex: 1, maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('ship')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.inspectionArea').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={inspectionAreas}
                    getOptionLabel={(option) => option.name}
                    value={inspectionAreas.find((a) => a.id === formData.inspectionAreaId) || null}
                    onChange={(_, v) => handleChange('inspectionAreaId', v?.id || null)}
                    sx={{ flex: 1, maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t('common.pleaseSelect')}
                        error={Boolean(errors.inspectionAreaId)}
                        helperText={errors.inspectionAreaId}
                      />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionArea')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.inspectionItem').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={inspectionItems}
                    getOptionLabel={(option) => option.name}
                    value={inspectionItems.find((i) => i.id === formData.inspectionItemId) || null}
                    onChange={(_, v) => handleChange('inspectionItemId', v?.id || null)}
                    sx={{ flex: 1, maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={t('common.pleaseSelect')}
                        error={Boolean(errors.inspectionItemId)}
                        helperText={errors.inspectionItemId}
                      />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionItem')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200, pt: 1 }}>
                    {t('workOrder.inspectionType').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    multiple
                    size="small"
                    options={inspectionTypes}
                    getOptionLabel={(option) => option.name}
                    value={inspectionTypes.filter((t) => formData.inspectionTypeIds.includes(t.id))}
                    onChange={(_, v) => handleChange('inspectionTypeIds', v.map((item) => item.id))}
                    sx={{ flex: 1, maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('inspectionType')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.supervisionLocation').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={locations}
                    getOptionLabel={(option) => option.name}
                    value={locations.find((l) => l.id === formData.supervisionLocationId) || null}
                    onChange={(_, v) => handleChange('supervisionLocationId', v?.id || null)}
                    sx={{ flex: 1, maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('location')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200, pt: 1 }}>
                    {t('workOrder.inspectionPersonnel').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    multiple
                    size="small"
                    options={employees}
                    getOptionLabel={(option) => option.full_name}
                    value={employees.filter((e) => formData.personnelIds.includes(e.id))}
                    onChange={(_, v) => handleChange('personnelIds', v.map((item) => item.id))}
                    sx={{ flex: 1, maxWidth: 500 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                  <Button size="small" startIcon={<AddIcon />} onClick={() => openAddDialog('personnel')}>
                    {t('common.add')}
                  </Button>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.province').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={provinces}
                    getOptionLabel={(option) => option.name}
                    value={provinces.find((p) => p.id === formData.provinceId) || null}
                    onChange={(_, v) => handleProvinceChange(v?.id || null)}
                    sx={{ flex: 1, maxWidth: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('common.pleaseSelect')} />
                    )}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography variant="body2" fontWeight={600} color="primary" sx={{ minWidth: 200 }}>
                    {t('workOrder.district').toUpperCase()}
                  </Typography>
                  <Autocomplete
                    size="small"
                    options={districts}
                    getOptionLabel={(option) => option.name}
                    value={districts.find((d) => d.id === formData.districtId) || null}
                    onChange={(_, v) => handleChange('districtId', v?.id || null)}
                    disabled={!formData.provinceId}
                    sx={{ flex: 1, maxWidth: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder={formData.provinceId ? t('common.pleaseSelect') : t('common.selectFirstProvince')}
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
                    disabled={submitting}
                    sx={{ minWidth: 200 }}
                  >
                    {submitting ? <CircularProgress size={24} /> : t('common.submit')}
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
