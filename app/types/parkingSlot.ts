export type SlotClassification = 'Resident' | 'Visitor' | 'Reserved' | 'Pay Parking'
export type SlotStatus = 'Available' | 'Occupied' | 'Maintenance'

export interface ParkingSlot {
  id: string
  code: string
  classification: SlotClassification
  tower: string
  floor: string
  zone: string
  status: SlotStatus
  createdAt: string
  updatedAt: string
}
