export type ReservationStatus = 'Pending' | 'Approved' | 'Validated' | 'Expired' | 'No-Show'

export interface VisitorReservation {
  id: string
  residentId: string
  visitorName: string
  plateNumber: string
  expectedArrival: string
  expectedDeparture: string
  qrCodeRef: string
  status: ReservationStatus
  createdAt: string
  updatedAt: string
}
