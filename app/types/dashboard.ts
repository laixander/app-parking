export interface DashboardData {
  overview: {
    totalRevenue: number
    unpaidInvoices: number
    activeSessions: number
    occupancyRate: number
  }
  recentActivity: Array<{
    id: string
    type: 'Entry' | 'Exit' | 'Payment'
    description: string
    timestamp: string
  }>
  revenueChart: Array<{
    date: string
    amount: number
  }>
}
