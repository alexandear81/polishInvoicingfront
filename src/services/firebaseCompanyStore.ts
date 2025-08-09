import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc, 
  deleteDoc, 
  query, 
  where,
  onSnapshot
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import type { Unsubscribe } from 'firebase/auth';
import { db } from './firebase';
import type { Company } from '../types/company';
import type { FirestoreCompany, FirestoreUserSettings } from '../types/firestore';
import { FIRESTORE_COLLECTIONS } from '../types/firestore';

export const getCompaniesForUser = async (user: User): Promise<Company[]> => {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.COMPANIES),
    where('userId', '==', user.uid)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data() as FirestoreCompany;
    // Remove userId when returning to client
    const { userId, ...company } = data;
    return { ...company, id: doc.id } as Company;
  });
};

export const saveCompanyForUser = async (user: User, company: Company) => {
  const companyWithUser: FirestoreCompany = { ...company, userId: user.uid };
  await setDoc(doc(db, FIRESTORE_COLLECTIONS.COMPANIES, company.id), companyWithUser);
};

export const removeCompanyForUser = async (user: User, companyId: string) => {
  const companyDoc = doc(db, FIRESTORE_COLLECTIONS.COMPANIES, companyId);
  const companySnap = await getDoc(companyDoc);
  
  if (!companySnap.exists()) {
    throw new Error('Company not found');
  }
  
  const companyData = companySnap.data() as FirestoreCompany;
  if (companyData.userId !== user.uid) {
    throw new Error('Not authorized to delete this company');
  }
  
  await deleteDoc(companyDoc);
};

export const getActiveCompanyIdForUser = async (user: User): Promise<string | null> => {
  try {
    const docRef = doc(db, FIRESTORE_COLLECTIONS.USER_SETTINGS, user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data() as FirestoreUserSettings;
    return data.activeCompanyId || null;
  } catch {
    return null;
  }
};

export const setActiveCompanyIdForUser = async (user: User, companyId: string | null) => {
  const docRef = doc(db, FIRESTORE_COLLECTIONS.USER_SETTINGS, user.uid);
  const now = new Date().toISOString();
  const settings: Partial<FirestoreUserSettings> = {
    activeCompanyId: companyId,
    updatedAt: now
  };
  
  // Add createdAt if document doesn't exist
  const existingDoc = await getDoc(docRef);
  if (!existingDoc.exists()) {
    settings.createdAt = now;
  }
  
  await setDoc(docRef, settings, { merge: true });
};

export const subscribeToCompanies = (
  user: User, 
  callback: (companies: Company[]) => void
): Unsubscribe => {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.COMPANIES),
    where('userId', '==', user.uid)
  );
  return onSnapshot(q, (snapshot) => {
    const companies = snapshot.docs.map(doc => {
      const data = doc.data() as FirestoreCompany;
      const { userId, ...company } = data;
      return { ...company, id: doc.id } as Company;
    });
    callback(companies);
  });
};

// Migration helper: move localStorage data to Firebase on first login
export const migrateLocalStorageToFirebase = async (user: User) => {
  try {
    const localCompanies = localStorage.getItem('pi_companies');
    const localActiveId = localStorage.getItem('pi_activeCompanyId');
    
    if (localCompanies) {
      const companies: Company[] = JSON.parse(localCompanies);
      for (const company of companies) {
        await saveCompanyForUser(user, company);
      }
      localStorage.removeItem('pi_companies');
    }
    
    if (localActiveId) {
      await setActiveCompanyIdForUser(user, localActiveId);
      localStorage.removeItem('pi_activeCompanyId');
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
};
