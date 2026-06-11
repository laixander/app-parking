export type VehicleStatus = 'Pending' | 'Approved' | 'Rejected' | 'Inactive'
export type RegistrationType = 'Primary' | 'Secondary'

export interface Vehicle {
  id: string
  unitOwnerId: string
  plateNumber: string
  make: string
  model: string
  color: string
  registrationType: RegistrationType
  status: VehicleStatus
  documentUrls: string[]
  createdAt: string
  updatedAt: string
}
