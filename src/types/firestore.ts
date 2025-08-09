import type { Company } from './company';

// Collection names
export const FIRESTORE_COLLECTIONS = {
  COMPANIES: 'companies',
  USER_SETTINGS: 'userSettings',
} as const;

// Firestore document interfaces (what gets stored in Firebase)
export interface FirestoreCompany extends Company {
  userId: string; // Firebase auth UID
}

export interface FirestoreUserSettings {
  activeCompanyId: string | null;
  createdAt: string;
  updatedAt: string;
}

// Helper type for collection paths
export type CollectionPath = typeof FIRESTORE_COLLECTIONS[keyof typeof FIRESTORE_COLLECTIONS];
