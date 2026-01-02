import { Box, Grid, Typography } from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import StatCard from './StatCard';
import RecentCompletions from './RecentCompletions';
import ActivityChart from './ActivityChart';
import QuickActions from './QuickActions';
import mockWorkOrders from '../../data/mockWorkOrders.json';
import { parseTurkishDateSafe } from '../../utils/dateUtils';

export default function Dashboard() {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    const totalOrders = mockWorkOrders.length;
    const pendingOrders = mockWorkOrders.filter(
      (order) => order.status === 'in_progress' || order.status === 'created'
    ).length;

    const completedThisMonth = mockWorkOrders.filter((order) => {
      if (!order.reportDate) return false;
      const reportDate = parseTurkishDateSafe(order.reportDate);
      if (!reportDate) return false;
      return (
        reportDate.getMonth() === 10 &&
        reportDate.getFullYear() === 2025 &&
        order.status === 'completed'
      );
    }).length;

    const allEmployees = new Set<string>();
    mockWorkOrders.forEach((order) => {
      order.employees.forEach((emp) => allEmployees.add(emp));
    });
    const activeEmployees = allEmployees.size;

    return {
      totalOrders,
      pendingOrders,
      completedThisMonth,
      activeEmployees,
    };
  }, []);

  const recentCompletions = useMemo(() => {
    return mockWorkOrders
      .filter((order) => order.status === 'completed' && order.reportDate)
      .sort((a, b) => {
        const dateA = parseTurkishDateSafe(a.reportDate);
        const dateB = parseTurkishDateSafe(b.reportDate);
        if (!dateA || !dateB) return 0;
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  }, []);

  const activityData = useMemo(() => {
    const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    return days.map((day) => ({
      date: day,
      created: Math.floor(Math.random() * 5) + 1,
      completed: Math.floor(Math.random() * 4) + 1,
    }));
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            background: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('dashboard.title')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('dashboard.welcomeMessage')}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title={t('dashboard.totalWorkOrders')}
            value={stats.totalOrders}
            icon={<AssignmentIcon sx={{ fontSize: 26 }} />}
            color="primary"
            subtitle={t('dashboard.orders')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title={t('dashboard.pendingOrders')}
            value={stats.pendingOrders}
            icon={<ScheduleIcon sx={{ fontSize: 26 }} />}
            color="warning"
            subtitle={t('dashboard.orders')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title={t('dashboard.completedThisMonth')}
            value={stats.completedThisMonth}
            icon={<CheckCircleIcon sx={{ fontSize: 26 }} />}
            color="success"
            subtitle={t('dashboard.thisMonth')}
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title={t('dashboard.activeEmployees')}
            value={stats.activeEmployees}
            icon={<PeopleIcon sx={{ fontSize: 26 }} />}
            color="info"
            subtitle={t('dashboard.employees')}
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 4 }}>
        <QuickActions />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <ActivityChart data={activityData} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <RecentCompletions workOrders={recentCompletions} />
        </Grid>
      </Grid>
    </Box>
  );
}
