import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Box,
  alpha,
} from '@mui/material';
import { Visibility as VisibilityIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { parseTurkishDateSafe } from '../../utils/dateUtils';

interface WorkOrder {
  id: number;
  fileNumber: string;
  companyName: string;
  shipName: string;
  reportDate: string | null;
  status: string;
}

interface RecentCompletionsProps {
  workOrders: WorkOrder[];
}

const statusGradients: Record<string, string> = {
  completed: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  in_progress: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  reported: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  created: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
};

export default function RecentCompletions({ workOrders }: RecentCompletionsProps) {
  const { t } = useTranslation();

  const formatDate = (dateString: string | null) => {
    const date = parseTurkishDateSafe(dateString);
    if (!date) return '-';
    return format(date, 'dd MMM yyyy', { locale: tr });
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 4,
                height: 20,
                borderRadius: 1,
                background: 'linear-gradient(180deg, #3b82f6 0%, #8b5cf6 100%)',
              }}
            />
            {t('dashboard.recentCompletions')}
          </Typography>
          <Tooltip title={t('dashboard.viewAll')}>
            <IconButton 
              size="small"
              aria-label={t('dashboard.viewAll')}
              sx={{
                bgcolor: alpha('#3b82f6', 0.1),
                color: 'primary.main',
                '&:hover': {
                  bgcolor: alpha('#3b82f6', 0.2),
                },
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.fileNumber')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.company')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.ship')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.reportDate')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workOrder.status')}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600 }}>{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workOrders.map((order) => {
                const gradient = statusGradients[order.status] || statusGradients.created;
                return (
                  <TableRow
                    key={order.id}
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      '&:hover': {
                        bgcolor: alpha('#3b82f6', 0.04),
                      },
                    }}
                  >
                    <TableCell>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 600,
                          color: 'primary.main',
                        }}
                      >
                        {order.fileNumber}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.companyName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{order.shipName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(order.reportDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={t(`workOrder.statuses.${order.status}`)}
                        size="small"
                        sx={{
                          background: gradient,
                          color: '#fff',
                          fontWeight: 500,
                          fontSize: '0.7rem',
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title={t('common.view')}>
                        <IconButton 
                          size="small"
                          aria-label={t('common.view')}
                          sx={{
                            bgcolor: alpha('#3b82f6', 0.1),
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: alpha('#3b82f6', 0.2),
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
