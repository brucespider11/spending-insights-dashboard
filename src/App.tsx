import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { SidebarProvider } from './context/SidebarContext'
import { CustomerProvider } from './context/CustomerContext'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import MainLayout from './components/layout/MainLayout'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import CategoriesPage from './pages/CategoriesPage'
import SpendingTrendsPage from './pages/SpendingTrendsPage'
import CustomerOverviewPage from './pages/CustomerOverviewPage'
import MerchantInsightsPage from './pages/MerchantInsightsPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CustomerProvider>
          <SidebarProvider>
            <ErrorBoundary>
              <MainLayout>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ErrorBoundary>
                        <DashboardPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <ErrorBoundary>
                        <TransactionsPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/categories"
                    element={
                      <ErrorBoundary>
                        <CategoriesPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/spending-trends"
                    element={
                      <ErrorBoundary>
                        <SpendingTrendsPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/customers"
                    element={
                      <ErrorBoundary>
                        <CustomerOverviewPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/merchants"
                    element={
                      <ErrorBoundary>
                        <MerchantInsightsPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ErrorBoundary>
                        <SettingsPage />
                      </ErrorBoundary>
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </MainLayout>
            </ErrorBoundary>
          </SidebarProvider>
        </CustomerProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
