import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider } from './context/SidebarContext'
import { CustomerProvider } from './context/CustomerContext'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import CategoriesPage from './pages/CategoriesPage'
import SpendingTrendsPage from './pages/SpendingTrendsPage'
import CustomerOverviewPage from './pages/CustomerOverviewPage'
import MerchantInsightsPage from './pages/MerchantInsightsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CustomerProvider>
          <SidebarProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/spending-trends" element={<SpendingTrendsPage />} />
                <Route path="/customers" element={<CustomerOverviewPage />} />
                <Route path="/merchants" element={<MerchantInsightsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </MainLayout>
          </SidebarProvider>
        </CustomerProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
