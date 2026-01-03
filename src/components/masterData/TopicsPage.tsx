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
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { api, LookupItem } from '../../services/api';

export default function TopicsPage() {
  const { t } = useTranslation();

  const [topics, setTopics] = useState<LookupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<LookupItem | null>(null);
  const [formData, setFormData] = useState<{ name: string; is_active: boolean }>({
    name: '',
    is_active: true,
  });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      const data = await api.topics.getAll();
      setTopics(data);
      setError(null);
    } catch (err) {
      setError('Konular yüklenirken hata oluştu');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTopics = topics.filter((topic) => {
    const searchLower = searchTerm.toLowerCase();
    return topic.name.toLowerCase().includes(searchLower);
  });

  const paginatedTopics = filteredTopics.slice(
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

  const handleOpenDialog = (topic?: LookupItem) => {
    if (topic) {
      setEditingTopic(topic);
      setFormData({ name: topic.name, is_active: topic.is_active ?? true });
    } else {
      setEditingTopic(null);
      setFormData({ name: '', is_active: true });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTopic(null);
  };

  const handleSave = async () => {
    try {
      if (editingTopic) {
        await api.topics.update(editingTopic.id, formData);
      } else {
        await api.topics.create(formData.name);
      }
      await loadTopics();
      handleCloseDialog();
    } catch (err) {
      console.error('Kayıt hatası:', err);
      alert('Kayıt sırasında hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bu konuyu silmek istediğinizden emin misiniz?')) {
      try {
        await api.topics.delete(id);
        await loadTopics();
      } catch (err) {
        console.error('Silme hatası:', err);
        alert('Silme sırasında hata oluştu');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
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

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant="h5" fontWeight={600}>
          {t('menu.topics')}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Konu ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: '100%', sm: 280 } }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
              },
            }}
          >
            Yeni Konu
          </Button>
        </Stack>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.50' }}>
                <TableCell sx={{ fontWeight: 600 }}>Konu Başlığı</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Durum
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="right">
                  İşlemler
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTopics.map((topic) => (
                <TableRow
                  key={topic.id}
                  hover
                  sx={{ '&:last-child td': { border: 0 } }}
                >
                  <TableCell>
                    <Typography fontWeight={500}>{topic.name}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={topic.is_active !== false ? 'Aktif' : 'Pasif'}
                      size="small"
                      color={topic.is_active !== false ? 'success' : 'default'}
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Düzenle">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(topic)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sil">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(topic.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedTopics.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz konu eklenmemiş'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredTopics.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Sayfa başına satır:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} / ${count}`
          }
        />
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600}>
              {editingTopic ? 'Konu Düzenle' : 'Yeni Konu Ekle'}
            </Typography>
            <IconButton size="small" onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ pt: 1 }}>
            <TextField
              label="Konu Başlığı"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            İptal
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name.trim()}
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
              },
            }}
          >
            {editingTopic ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
