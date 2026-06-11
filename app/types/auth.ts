// ============================================================================
// Types: Auth
// ============================================================================

export type SystemRole = 'Property Admin' | 'Parking Operations' | 'Front Desk' | 'Security' | 'Finance'

export interface AuthUser {
    name: string
    role: SystemRole
}
