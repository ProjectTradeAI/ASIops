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
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import mockShips from '../../data/mockShips.json';

interface Ship {
  id: number;
  shipName: string;
  imoNumber: string;
  flag: string;
  shipType: string;
  deadweight: number;
  isActive: boolean;
}

export default function ShipsList() {
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingShip, setEditingShip] = useState<Ship | null>(null);
  const [formData, setFormData] = useState<Partial<Ship>>({
    shipName: '',
    imoNumber: '',
    flag: '',
    shipType: '',
    deadweight: 0,
    isActive: true,
  });

  const filteredShips = mockShips.filter((ship) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      ship.shipName.toLowerCase().includes(searchLower) ||
      ship.imoNumber.toLowerCase().includes(searchLower) ||
      ship.flag.toLowerCase().includes(searchLower)
    );
  });

  const paginatedShips = filteredShips.slice(
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

  const handleOpenDialog = (ship?: Ship) => {
    if (ship) {
      setEditingShip(ship);
      setFormData(ship);
    } else {
      setEditingShip(null);
      setFormData({
        shipName: '',
        imoNumber: '',
        flag: '',
        shipType: '',
        deadweight: 0,
        isActive: true,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingShip(null);
  };

  const handleSave = () => {
    console.log('Saving ship:', formData);
    // eslint-disable-next-line no-alert
    alert(
      editingShip
        ? 'Gemi güncellendi! (Prototip)'
        : 'Yeni gemi oluşturuldu! (Prototip)'
    );
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Bu gemiyi silmek istediğinizden emin misiniz?')) {
      console.log('Delete ship:', id);
      // eslint-disable-next-line no-alert
      alert('Gemi silindi! (Prototip)');
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {t('menu.ships')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Yeni Gemi
        </Button>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Gemi ara (isim, IMO no, bayrak)"
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
      </Paper>

      {/* Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Gemi Adı</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>IMO No</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Bayrak</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Tip</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>DWT (ton)</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Durum</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {t('common.actions')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedShips.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">{t('common.noData')}</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedShips.map((ship) => (
                  <TableRow key={ship.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{ship.shipName}</TableCell>
                    <TableCell>{ship.imoNumber}</TableCell>
                    <TableCell>{ship.flag}</TableCell>
                    <TableCell>{ship.shipType}</TableCell>
                    <TableCell>{ship.deadweight.toLocaleString('tr-TR')}</TableCell>
                    <TableCell>
                      <Chip
                        label={ship.isActive ? 'Aktif' : 'Pasif'}
                        color={ship.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title={t('common.edit')}>
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => handleOpenDialog(ship)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('common.delete')}>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(ship.id)}
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
          count={filteredShips.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage={t('common.rowsPerPage')}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              {editingShip ? 'Gemi Düzenle' : 'Yeni Gemi'}
            </Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gemi Adı"
                value={formData.shipName}
                onChange={(e) => setFormData({ ...formData, shipName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IMO Numarası"
                value={formData.imoNumber}
                onChange={(e) => setFormData({ ...formData, imoNumber: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Bayrak"
                value={formData.flag}
                onChange={(e) => setFormData({ ...formData, flag: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gemi Tipi"
                value={formData.shipType}
                onChange={(e) => setFormData({ ...formData, shipType: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Deadweight (ton)"
                value={formData.deadweight}
                onChange={(e) => setFormData({ ...formData, deadweight: Number(e.target.value) })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t('common.cancel')}</Button>
          <Button onClick={handleSave} variant="contained">
            {t('common.save')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}