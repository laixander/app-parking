export type AllocationType = 'Dedicated' | 'Shared' | 'Temporary'
export type AllocationStatus = 'Active' | 'Transferred' | 'Expired'

export interface ParkingAllocation {
  id: string
  vehicleId: string
  slotId: string
  allocationType: AllocationType
  startDate: string
  endDate: string | null
  status: AllocationStatus
  createdAt: string
  updatedAt: string
}
