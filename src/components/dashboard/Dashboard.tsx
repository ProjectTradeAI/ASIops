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

  // Calculate statistics from mock data
  const stats = useMemo(() => {
    const totalOrders = mockWorkOrders.length;
    const pendingOrders = mockWorkOrders.filter(
      (order) => order.status === 'in_progress' || order.status === 'created'
    ).length;

    // Calculate completed this month (November 2025)
    const completedThisMonth = mockWorkOrders.filter((order) => {
      if (!order.reportDate) return false;
      const reportDate = parseTurkishDateSafe(order.reportDate);
      if (!reportDate) return false;
      return (
        reportDate.getMonth() === 10 && // November (0-indexed)
        reportDate.getFullYear() === 2025 &&
        order.status === 'completed'
      );
    }).length;

    // Count unique employees from all work orders
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

  // Get recent completed work orders (last 5)
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

  // Generate activity chart data (last 7 days)
  const activityData = useMemo(() => {
    const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
    return days.map((day) => ({
      date: day,
      created: Math.floor(Math.random() * 5) + 1, // Mock data
      completed: Math.floor(Math.random() * 4) + 1, // Mock data
    }));
  }, []);

  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        {t('dashboard.title')}
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.totalWorkOrders')}
            value={stats.totalOrders}
            icon={<AssignmentIcon sx={{ fontSize: 28 }} />}
            color="primary"
            subtitle={t('dashboard.orders')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.pendingOrders')}
            value={stats.pendingOrders}
            icon={<ScheduleIcon sx={{ fontSize: 28 }} />}
            color="warning"
            subtitle={t('dashboard.orders')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.completedThisMonth')}
            value={stats.completedThisMonth}
            icon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
            color="success"
            subtitle={t('dashboard.thisMonth')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title={t('dashboard.activeEmployees')}
            value={stats.activeEmployees}
            icon={<PeopleIcon sx={{ fontSize: 28 }} />}
            color="info"
            subtitle={t('dashboard.employees')}
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box sx={{ mb: 3 }}>
        <QuickActions />
      </Box>

      {/* Charts and Tables */}
      <Grid container spacing={3}>
        {/* Activity Chart */}
        <Grid item xs={12} lg={6}>
          <ActivityChart data={activityData} />
        </Grid>

        {/* Recent Completions Table */}
        <Grid item xs={12} lg={6}>
          <RecentCompletions workOrders={recentCompletions} />
        </Grid>
      </Grid>
    </Box>
  );
}
