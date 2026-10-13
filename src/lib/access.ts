import type { Access, FieldAccess } from 'payload'

export function isStaff(user: { role?: string | null } | null | undefined): boolean {
  return user?.role === 'admin' || user?.role === 'editor'
}
export const staff: Access = ({ req }) => isStaff(req.user)
export const adminOnly: Access = ({ req }) => req.user?.role === 'admin'
export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin'
export const publishedOrStaff: Access = ({ req }) => (isStaff(req.user) ? true : { _status: { equals: 'published' } })
export const contentAccess = { read: publishedOrStaff, create: staff, update: staff, delete: staff, readVersions: staff }
/** Plain lookup data (cities): public read, staff write, no drafts. */
export const dataAccess = { read: () => true, create: staff, update: staff, delete: staff }
// Globals are read by trusted server-side queries; REST access is staff-only so drafts never leak.
export const globalAccess = { read: staff, update: staff, readVersions: staff }
