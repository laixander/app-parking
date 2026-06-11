// ============================================================================
// Utility: SeederService
// ============================================================================
// Provides mock data generation using faker.js for demo purposes.
// Used primarily by stores to populate the initial state when deploying demo data.
//
// Usage:
//   import { SeederService } from '~/utils/seeder'
//   const mockUsers = SeederService.generateUsers(5)

import { faker } from '@faker-js/faker'
import type { User } from '../types/user'
import type { DashboardData } from '../types/dashboard'
import type { KanbanCard } from '../types/kanban'
import type { ParkingSlot } from '../types/parkingSlot'
import type { Vehicle } from '../types/vehicle'
import type { RfidCredential } from '../types/rfidCredential'
import type { ParkingAllocation } from '../types/parkingAllocation'
import type { VisitorReservation } from '../types/visitorReservation'
import type { ParkingSession } from '../types/parkingSession'
import type { BillingTransaction } from '../types/billingTransaction'

export type { User } from '../types/user'
export type { DashboardData } from '../types/dashboard'
export type { KanbanCard } from '../types/kanban'
export type { ParkingSlot } from '../types/parkingSlot'
export type { Vehicle } from '../types/vehicle'
export type { RfidCredential } from '../types/rfidCredential'
export type { ParkingAllocation } from '../types/parkingAllocation'
export type { VisitorReservation } from '../types/visitorReservation'
export type { ParkingSession } from '../types/parkingSession'
export type { BillingTransaction } from '../types/billingTransaction'

// ── Palette constants (mirrored from useChart composable) ──────────────────
const palette = {
  blue: { solid: 'rgb(14, 165, 233)', soft: 'rgba(14, 165, 233, 0.15)' },
  violet: { solid: 'rgb(139, 92, 246)', soft: 'rgba(139, 92, 246, 0.15)' },
  green: { solid: 'rgb(34, 197, 94)', soft: 'rgba(34, 197, 94, 0.15)' },
  orange: { solid: 'rgb(249, 115, 22)', soft: 'rgba(249, 115, 22, 0.15)' },
  pink: { solid: 'rgb(236, 72, 153)', soft: 'rgba(236, 72, 153, 0.15)' },
  teal: { solid: 'rgb(20, 184, 166)', soft: 'rgba(20, 184, 166, 0.15)' },
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const

/** Generate an array of random integers in a given range */
const randInts = (count: number, min: number, max: number): number[] =>
  Array.from({ length: count }, () => faker.number.int({ min, max }))

export const SeederService = {
  // ── User entity ────────────────────────────────────────────────────────

  /** Generates a single mock user profile. */
  generateSingleUser(): User {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: `https://api.dicebear.com/10.x/thumbs/svg?seed=${encodeURIComponent(faker.person.fullName())}`,
      role: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(['Active', 'Active', 'Active', 'Inactive'] as const),
    }
  },

  /** Generates an array of mock users. */
  generateUsers(count: number = 5): User[] {
    return Array.from({ length: count }, () => this.generateSingleUser())
  },

  /** Returns an empty array representing a cleared user state. */
  clearUsers(): User[] {
    return []
  },

  // ── Dashboard entity ───────────────────────────────────────────────────

  /** Generates a complete mock dashboard data structure. */
  generateDashboard(): DashboardData {
    return {
      overview: {
        totalRevenue: 0,
        unpaidInvoices: 0,
        activeSessions: 0,
        occupancyRate: 0,
      },
      recentActivity: Array.from({ length: 15 }, () => ({
        id: faker.string.uuid(),
        type: faker.helpers.arrayElement(['Entry', 'Exit', 'Payment'] as const),
        description: faker.helpers.arrayElement([
          `Resident parking fee paid`,
          `Vehicle entry scanned at Main Gate`,
          `Vehicle exited from Basement 2`,
          `Visitor penalty charge applied`,
          `Overstay detected`
        ]),
        timestamp: faker.date.recent().toISOString()
      })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      revenueChart: Array.from({ length: 7 }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        return {
          date: d.toISOString().split('T')[0] as string,
          amount: Number(faker.commerce.price({ min: 1000, max: 5000 }))
        }
      })
    }
  },

  /** Returns an empty state structure for the dashboard. */
  clearDashboard(): DashboardData {
    return {
      overview: { totalRevenue: 0, unpaidInvoices: 0, activeSessions: 0, occupancyRate: 0 },
      recentActivity: [],
      revenueChart: []
    }
  },

  // ── Kanban entity ──────────────────────────────────────────────────────

  /** Generates a single mock Kanban card with random tags and priorities. */
  generateSingleKanbanCard(): KanbanCard {
    return {
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.datatype.boolean({ probability: 0.7 }) ? faker.lorem.paragraph() : undefined,
      priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'critical']),
      tags: faker.helpers.arrayElements(['Bug', 'Feature', 'UI', 'Backend', 'Docs', 'Planning', 'Design', 'Research'], { min: 0, max: 3 }),
      locked: faker.datatype.boolean({ probability: 0.1 }),
      createdAt: faker.date.recent({ days: 30 }).toISOString(),
    }
  },

  /** Generates an array of mock Kanban cards. */
  generateKanbanCards(count: number = 5): KanbanCard[] {
    return Array.from({ length: count }, () => this.generateSingleKanbanCard())
  },

  // ── ParkingSlot entity ───────────────────────────────────────────────────

  /** Generates a single mock ParkingSlot. */
  generateSingleParkingSlot(): ParkingSlot {
    return {
      id: faker.string.uuid(),
      code: `${faker.helpers.arrayElement(['A', 'B', 'C', 'D'])}-${faker.number.int({ min: 1, max: 5 })}-${faker.number.int({ min: 10, max: 99 })}`,
      classification: faker.helpers.arrayElement(['Resident', 'Visitor', 'Reserved', 'Pay Parking'] as const),
      tower: faker.helpers.arrayElement(['Tower 1', 'Tower 2', 'Tower 3']),
      floor: `Level ${faker.number.int({ min: 1, max: 6 })}`,
      zone: faker.helpers.arrayElement(['North', 'South', 'East', 'West']),
      status: faker.helpers.arrayElement(['Available', 'Occupied', 'Maintenance'] as const),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  },

  /** Generates an array of mock ParkingSlots. */
  generateParkingSlots(count: number = 5): ParkingSlot[] {
    return Array.from({ length: count }, () => this.generateSingleParkingSlot())
  },

  /** Returns an empty array representing a cleared ParkingSlot state. */
  clearParkingSlots(): ParkingSlot[] {
    return []
  },

  // ── Vehicle entity ───────────────────────────────────────────────────────

  /** Generates a single mock Vehicle. */
  generateSingleVehicle(): Vehicle {
    return {
      id: faker.string.uuid(),
      unitOwnerId: faker.string.uuid(),
      plateNumber: `${faker.string.alpha({ length: 3, casing: 'upper' })}-${faker.string.numeric(4)}`,
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      color: faker.vehicle.color(),
      registrationType: faker.helpers.arrayElement(['Primary', 'Secondary'] as const),
      status: faker.helpers.arrayElement(['Pending', 'Approved', 'Rejected', 'Inactive'] as const),
      documentUrls: [faker.image.url()],
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  },

  /** Generates an array of mock Vehicles. */
  generateVehicles(count: number = 5): Vehicle[] {
    return Array.from({ length: count }, () => this.generateSingleVehicle())
  },

  /** Returns an empty array representing a cleared Vehicle state. */
  clearVehicles(): Vehicle[] {
    return []
  },

  // ── RfidCredential entity ────────────────────────────────────────────────

  /** Generates a single mock RfidCredential. */
  generateSingleRfidCredential(): RfidCredential {
    const isAssigned = faker.datatype.boolean({ probability: 0.8 })
    return {
      id: faker.string.uuid(),
      tagNumber: `RFID-${faker.string.alphanumeric({ length: 8, casing: 'upper' })}`,
      vehicleId: isAssigned ? faker.string.uuid() : null,
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'Lost', 'Blocked'] as const),
      assignedDate: isAssigned ? faker.date.past().toISOString() : null,
      lastUsedAt: isAssigned ? faker.date.recent().toISOString() : null,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  },

  /** Generates an array of mock RfidCredentials. */
  generateRfidCredentials(count: number = 5): RfidCredential[] {
    return Array.from({ length: count }, () => this.generateSingleRfidCredential())
  },

  /** Returns an empty array representing a cleared RfidCredential state. */
  clearRfidCredentials(): RfidCredential[] {
    return []
  },

  // ── ParkingAllocation entity ─────────────────────────────────────────────

  /** Generates a single mock ParkingAllocation. */
  generateSingleParkingAllocation(): ParkingAllocation {
    const isExpired = faker.datatype.boolean({ probability: 0.2 })
    return {
      id: faker.string.uuid(),
      vehicleId: faker.string.uuid(),
      slotId: faker.string.uuid(),
      allocationType: faker.helpers.arrayElement(['Dedicated', 'Shared', 'Temporary'] as const),
      startDate: faker.date.past().toISOString(),
      endDate: isExpired ? faker.date.recent().toISOString() : null,
      status: isExpired ? 'Expired' : faker.helpers.arrayElement(['Active', 'Transferred'] as const),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  },

  /** Generates an array of mock ParkingAllocations. */
  generateParkingAllocations(count: number = 5): ParkingAllocation[] {
    return Array.from({ length: count }, () => this.generateSingleParkingAllocation())
  },

  /** Returns an empty array representing a cleared ParkingAllocation state. */
  clearParkingAllocations(): ParkingAllocation[] {
    return []
  },

  // ── VisitorReservation entity ────────────────────────────────────────────

  /** Generates a single mock VisitorReservation. */
  generateSingleVisitorReservation(): VisitorReservation {
    return {
      id: faker.string.uuid(),
      residentId: faker.string.uuid(),
      visitorName: faker.person.fullName(),
      plateNumber: `${faker.string.alpha({ length: 3, casing: 'upper' })}-${faker.string.numeric(4)}`,
      expectedArrival: faker.date.soon().toISOString(),
      expectedDeparture: faker.date.soon({ days: 1 }).toISOString(),
      qrCodeRef: `QR-${faker.string.alphanumeric({ length: 10, casing: 'upper' })}`,
      status: faker.helpers.arrayElement(['Pending', 'Approved', 'Validated', 'Expired', 'No-Show'] as const),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  },

  /** Generates an array of mock VisitorReservations. */
  generateVisitorReservations(count: number = 5): VisitorReservation[] {
    return Array.from({ length: count }, () => this.generateSingleVisitorReservation())
  },

  /** Returns an empty array representing a cleared VisitorReservation state. */
  clearVisitorReservations(): VisitorReservation[] {
    return []
  },

  // ── ParkingSession entity ────────────────────────────────────────────────

  /** Generates a single mock ParkingSession. */
  generateSingleParkingSession(): ParkingSession {
    const isCompleted = faker.datatype.boolean()
    return {
      id: faker.string.uuid(),
      type: faker.helpers.arrayElement(['Resident', 'Visitor', 'Walk-in'] as const),
      plateNumber: `${faker.string.alpha({ length: 3, casing: 'upper' })}-${faker.string.numeric(4)}`,
      referenceId: faker.datatype.boolean() ? faker.string.uuid() : null,
      slotId: faker.datatype.boolean() ? faker.string.uuid() : null,
      entryTime: faker.date.recent({ days: 2 }).toISOString(),
      exitTime: isCompleted ? faker.date.recent().toISOString() : null,
      status: isCompleted ? 'Completed' : faker.helpers.arrayElement(['Active', 'Overstay'] as const),
      validatedBy: faker.string.uuid(),
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  },

  /** Generates an array of mock ParkingSessions. */
  generateParkingSessions(count: number = 8): ParkingSession[] {
    return Array.from({ length: count }, () => this.generateSingleParkingSession())
  },

  /** Returns an empty array representing a cleared ParkingSession state. */
  clearParkingSessions(): ParkingSession[] {
    return []
  },

  // ── BillingTransaction entity ────────────────────────────────────────────

  /** Generates a single mock BillingTransaction. */
  generateSingleBillingTransaction(): BillingTransaction {
    const isPaid = faker.datatype.boolean()
    return {
      id: faker.string.uuid(),
      sessionId: faker.datatype.boolean() ? faker.string.uuid() : null,
      type: faker.helpers.arrayElement(['ResidentCharge', 'VisitorPenalty', 'PayParking'] as const),
      amount: Number(faker.commerce.price({ min: 50, max: 1500, dec: 2 })),
      status: isPaid ? 'Paid' : faker.helpers.arrayElement(['Unpaid', 'Cancelled'] as const),
      paymentMethod: isPaid ? faker.helpers.arrayElement(['Cash', 'Card', 'E-Wallet'] as const) : null,
      receiptNumber: isPaid ? `RCPT-${faker.string.alphanumeric({ length: 8, casing: 'upper' })}` : null,
      transactionDate: isPaid ? faker.date.recent().toISOString() : null,
      createdAt: faker.date.past().toISOString(),
      updatedAt: faker.date.recent().toISOString(),
    }
  },

  /** Generates an array of mock BillingTransactions. */
  generateBillingTransactions(count: number = 8): BillingTransaction[] {
    return Array.from({ length: count }, () => this.generateSingleBillingTransaction())
  },

  /** Returns an empty array representing a cleared BillingTransaction state. */
  clearBillingTransactions(): BillingTransaction[] {
    return []
  },
}