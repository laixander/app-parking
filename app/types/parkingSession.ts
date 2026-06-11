export type SessionType = 'Resident' | 'Visitor' | 'Walk-in'
export type SessionStatus = 'Active' | 'Completed' | 'Overstay'

export interface ParkingSession {
  id: string
  type: SessionType
  plateNumber: string
  referenceId: string | null
  slotId: string | null
  entryTime: string
  exitTime: string | null
  status: SessionStatus
  validatedBy: string | null
  createdAt: string
  updatedAt: string
}
