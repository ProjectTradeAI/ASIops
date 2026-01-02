import { useState } from 'react';
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
import mockWorkOrders from '../../data/mockWorkOrders.json';
import { parseTurkishDateSafe } from '../../utils/dateUtils';
// Data updated: All inspection types now use clean Turkish text

export default function WorkOrderList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Filter work orders based on search
  const filteredOrders = mockWorkOrders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.fileNumber.toLowerCase().includes(searchLower) ||
      order.companyName.toLowerCase().includes(searchLower) ||
      order.shipName.toLowerCase().includes(searchLower) ||
      order.inspectionType.toLowerCase().includes(searchLower)
    );
  });

  // Paginated data
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
    const date = parseTurkishDateSafe(dateString);
    if (!date) return '-';
    return format(date, 'dd MMM yyyy', { locale: tr });
  };

  const handleView = (id: number) => {
    navigate(`/work-orders/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/work-orders/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-alert
    if (window.confirm(t('common.delete') + '?')) {
      console.log('Delete work order:', id);
      // In real app, would call API here
    }
  };

  return (
    <Box>
      {/* Page Header */}
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

      {/* Search and Filters */}
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

      {/* Data Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.fileNumber')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.status')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.company')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.ship')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  {t('menu.inspectionTypes').slice(0, -1)}
                </TableCell>
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
                    <TableCell sx={{ fontWeight: 600 }}>{order.fileNumber}</TableCell>
                    <TableCell>
                      <Chip
                        label={t(`workOrder.statuses.${order.status}`)}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{order.companyName}</TableCell>
                    <TableCell>{order.shipName}</TableCell>
                    <TableCell>{order.inspectionType}</TableCell>
                    <TableCell>{formatDate(order.reportDate)}</TableCell>
                    <TableCell>{order.responsibleUser}</TableCell>
                    <TableCell>{order.tonnage ? `${order.tonnage.toLocaleString('tr-TR')} ton` : '-'}</TableCell>
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

        {/* Pagination */}
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