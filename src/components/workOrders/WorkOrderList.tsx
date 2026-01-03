import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

type Order = 'asc' | 'desc';
type OrderBy = 'file_number' | 'status' | 'company_name' | 'ship_name' | 'topic_name' | 'report_date' | 'responsible' | 'tonnage';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { api, WorkOrder } from '../../services/api';

export default function WorkOrderList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<OrderBy>('file_number');

  useEffect(() => {
    loadWorkOrders();
  }, []);

  const loadWorkOrders = async () => {
    try {
      setLoading(true);
      const orders = await api.workOrders.getAll();
      setWorkOrders(orders);
    } catch (error) {
      console.error('Error loading work orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFileNumberDisplay = (order: WorkOrder) => {
    const year = new Date().getFullYear().toString().slice(-2);
    const paddedNumber = order.file_number.toString().padStart(4, '0');
    return `${order.file_type}${year}-${paddedNumber}`;
  };

  const handleFileTypeChange = (_event: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
    if (newFilter !== null) {
      setFileTypeFilter(newFilter);
      setPage(0);
    }
  };

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedOrders = (orders: WorkOrder[]) => {
    return [...orders].sort((a, b) => {
      let aValue: string | number | null = null;
      let bValue: string | number | null = null;

      switch (orderBy) {
        case 'file_number':
          aValue = a.file_number;
          bValue = b.file_number;
          break;
        case 'status':
          aValue = a.status || '';
          bValue = b.status || '';
          break;
        case 'company_name':
          aValue = a.company_name || '';
          bValue = b.company_name || '';
          break;
        case 'ship_name':
          aValue = a.ship_name || '';
          bValue = b.ship_name || '';
          break;
        case 'topic_name':
          aValue = a.topic_name || '';
          bValue = b.topic_name || '';
          break;
        case 'report_date':
          aValue = a.report_date || '';
          bValue = b.report_date || '';
          break;
        case 'responsible':
          aValue = a.responsible || '';
          bValue = b.responsible || '';
          break;
        case 'tonnage':
          aValue = a.tonnage || 0;
          bValue = b.tonnage || 0;
          break;
      }

      if (aValue === null || bValue === null) return 0;
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const comparison = String(aValue).localeCompare(String(bValue), 'tr');
      return order === 'asc' ? comparison : -comparison;
    });
  };

  const filteredOrders = workOrders.filter((order) => {
    if (fileTypeFilter !== 'all' && order.file_type !== fileTypeFilter) {
      return false;
    }
    const searchLower = searchTerm.toLowerCase();
    const fileNumber = getFileNumberDisplay(order).toLowerCase();
    return (
      fileNumber.includes(searchLower) ||
      (order.company_name || '').toLowerCase().includes(searchLower) ||
      (order.ship_name || '').toLowerCase().includes(searchLower) ||
      (order.topic_name || '').toLowerCase().includes(searchLower)
    );
  });

  const sortedFilteredOrders = sortedOrders(filteredOrders);
  const paginatedOrders = sortedFilteredOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMM yyyy', { locale: tr });
    } catch {
      return '-';
    }
  };

  const handleView = (id: number) => {
    navigate(`/work-orders/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/work-orders/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm(t('common.delete') + '?')) {
      console.log('Delete work order:', id);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {t('menu.workOrders')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/work-orders/new')}
        >
          {t('menu.newWorkOrder')}
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <ToggleButtonGroup
            value={fileTypeFilter}
            exclusive
            onChange={handleFileTypeChange}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                px: 3,
                fontWeight: 600,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              },
            }}
          >
            <ToggleButton value="all">Hepsi</ToggleButton>
            <ToggleButton value="ASIC">ASIC</ToggleButton>
            <ToggleButton value="ASI">ASI</ToggleButton>
            <ToggleButton value="FT">FT</ToggleButton>
          </ToggleButtonGroup>
          <TextField
            fullWidth
            placeholder={t('menu.searchWorkOrders')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'file_number'}
                    direction={orderBy === 'file_number' ? order : 'asc'}
                    onClick={() => handleRequestSort('file_number')}
                  >
                    {t('workOrder.fileNumber')}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'status'}
                    direction={orderBy === 'status' ? order : 'asc'}
                    onClick={() => handleRequestSort('status')}
                  >
                    {t('workOrder.status')}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'company_name'}
                    direction={orderBy === 'company_name' ? order : 'asc'}
                    onClick={() => handleRequestSort('company_name')}
                  >
                    {t('workOrder.company')}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'ship_name'}
                    direction={orderBy === 'ship_name' ? order : 'asc'}
                    onClick={() => handleRequestSort('ship_name')}
                  >
                    {t('workOrder.ship')}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'topic_name'}
                    direction={orderBy === 'topic_name' ? order : 'asc'}
                    onClick={() => handleRequestSort('topic_name')}
                  >
                    {t('workOrder.topic')}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'report_date'}
                    direction={orderBy === 'report_date' ? order : 'asc'}
                    onClick={() => handleRequestSort('report_date')}
                  >
                    {t('workOrder.reportDate')}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'responsible'}
                    direction={orderBy === 'responsible' ? order : 'asc'}
                    onClick={() => handleRequestSort('responsible')}
                  >
                    {t('workOrder.responsible')}
                  </TableSortLabel>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={orderBy === 'tonnage'}
                    direction={orderBy === 'tonnage' ? order : 'asc'}
                    onClick={() => handleRequestSort('tonnage')}
                  >
                    {t('workOrder.tonnage')}
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t('common.actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">{t('common.noData')}</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{getFileNumberDisplay(order)}</TableCell>
                    <TableCell>
                      <Chip
                        label={t(`workOrder.statuses.${order.status}`)}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{order.company_name || '-'}</TableCell>
                    <TableCell>{order.ship_name || '-'}</TableCell>
                    <TableCell>{order.topic_name || '-'}</TableCell>
                    <TableCell>{formatDate(order.report_date)}</TableCell>
                    <TableCell>{order.responsible || '-'}</TableCell>
                    <TableCell>{order.tonnage ? `${Number(order.tonnage).toLocaleString('tr-TR')} ton` : '-'}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title={t('common.view')}>
                          <IconButton size="small" color="primary" onClick={() => handleView(order.id)}>
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" color="info" onClick={() => handleEdit(order.id)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(order.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={sortedFilteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage={t('common.rowsPerPage') || 'Sayfa başına satır:'}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} / ${count !== -1 ? count : `${to}'den fazla`}`
          }
        />
      </Paper>
    </Box>
  );
}
