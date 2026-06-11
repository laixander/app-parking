export type RfidStatus = 'Active' | 'Inactive' | 'Lost' | 'Blocked'

export interface RfidCredential {
  id: string
  tagNumber: string
  vehicleId: string | null
  status: RfidStatus
  assignedDate: string | null
  lastUsedAt: string | null
  createdAt: string
  updatedAt: string
}
