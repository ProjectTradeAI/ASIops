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
  Chip,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
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

  const filteredOrders = workOrders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    const fileNumber = getFileNumberDisplay(order).toLowerCase();
    return (
      fileNumber.includes(searchLower) ||
      (order.company_name || '').toLowerCase().includes(searchLower) ||
      (order.ship_name || '').toLowerCase().includes(searchLower) ||
      (order.topic_name || '').toLowerCase().includes(searchLower)
    );
  });

  const paginatedOrders = filteredOrders.slice(
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.fileNumber')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.status')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.company')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.ship')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.topic')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.reportDate')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.responsible')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.tonnage')}</TableCell>
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
          count={filteredOrders.length}
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
