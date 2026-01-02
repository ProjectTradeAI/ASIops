import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility as VisibilityIcon } from '@mui/icons-material';
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

export default function RecentCompletions({ workOrders }: RecentCompletionsProps) {
  const { t } = useTranslation();

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
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string | null) => {
    const date = parseTurkishDateSafe(dateString);
    if (!date) return '-';
    return format(date, 'dd MMM yyyy', { locale: tr });
  };

  return (
    <Card>
      <CardHeader
        title={t('dashboard.recentCompletions')}
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent sx={{ pt: 0 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('workOrder.fileNumber')}</TableCell>
                <TableCell>{t('workOrder.company')}</TableCell>
                <TableCell>{t('workOrder.ship')}</TableCell>
                <TableCell>{t('workOrder.reportDate')}</TableCell>
                <TableCell>{t('workOrder.status')}</TableCell>
                <TableCell align="center">{t('common.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workOrders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{order.fileNumber}</TableCell>
                  <TableCell>{order.companyName}</TableCell>
                  <TableCell>{order.shipName}</TableCell>
                  <TableCell>{formatDate(order.reportDate)}</TableCell>
                  <TableCell>
                    <Chip
                      label={t(`workOrder.statuses.${order.status}`)}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={t('common.view')}>
                      <IconButton size="small" color="primary">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
