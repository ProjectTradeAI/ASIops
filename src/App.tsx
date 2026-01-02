import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './components/dashboard/Dashboard';
import WorkOrderList from './components/workOrders/WorkOrderList';
import WorkOrderDetail from './components/workOrders/WorkOrderDetail';
import WorkOrderForm from './components/workOrders/WorkOrderForm';
import CompaniesList from './components/masterData/CompaniesList';
import EmployeesList from './components/masterData/EmployeesList';
import ShipsList from './components/masterData/ShipsList';
import ReportsPage from './components/reports/ReportsPage';
import SettingsPage from './components/settings/SettingsPage';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Work Orders */}
        <Route path="work-orders" element={<WorkOrderList />} />
        <Route path="work-orders/:id" element={<WorkOrderDetail />} />
        <Route path="work-orders/:id/edit" element={<WorkOrderForm />} />
        <Route path="work-orders/new" element={<WorkOrderForm />} />
        <Route path="work-orders/search" element={<WorkOrderList />} />

        {/* Master Data */}
        <Route path="master-data/companies" element={<CompaniesList />} />
        <Route path="master-data/employees" element={<EmployeesList />} />
        <Route path="master-data/ships" element={<ShipsList />} />

        {/* Legacy routes for backward compatibility */}
        <Route path="companies" element={<CompaniesList />} />
        <Route path="employees" element={<EmployeesList />} />
        <Route path="ships" element={<ShipsList />} />

        {/* Reports & Settings */}
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />

        {/* Placeholder routes for future implementation */}
        <Route path="master-data/inspection-areas" element={<div style={{ padding: 20 }}>Muayene Alanları (Phase 3'te geliştirilecek)</div>} />
        <Route path="master-data/inspection-items" element={<div style={{ padding: 20 }}>Muayene Öğeleri (Phase 3'te geliştirilecek)</div>} />
        <Route path="master-data/inspection-types" element={<div style={{ padding: 20 }}>Muayene Türleri (Phase 3'te geliştirilecek)</div>} />
        <Route path="master-data/locations" element={<div style={{ padding: 20 }}>Gözetim Yerleri (Phase 3'te geliştirilecek)</div>} />
        <Route path="master-data/tasks" element={<div style={{ padding: 20 }}>Yapılacak İşler (Phase 3'te geliştirilecek)</div>} />
        <Route path="master-data/topics" element={<div style={{ padding: 20 }}>Konular (Phase 3'te geliştirilecek)</div>} />
        <Route path="users" element={<div style={{ padding: 20 }}>Kullanıcı Yönetimi (Phase 3'te geliştirilecek)</div>} />

        {/* 404 Not Found - Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
