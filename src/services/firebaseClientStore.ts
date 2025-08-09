import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';
import type { Client } from '../types/client';
import type { FirestoreClient } from '../types/firestore';
import { FIRESTORE_COLLECTIONS } from '../types/firestore';

export const getClientsForSeller = async (user: User, sellerId: string): Promise<Client[]> => {
  const q = query(
    collection(db, FIRESTORE_COLLECTIONS.CLIENTS),
    where('userId', '==', user.uid),
    where('sellerId', '==', sellerId),
    orderBy('lastUsed', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data() as FirestoreClient;
    const { userId, ...client } = data;
    return { ...client, id: doc.id } as Client;
  });
};

export const saveClientForUser = async (user: User, client: Client) => {
  const clientWithUser: FirestoreClient = { 
    ...client, 
    userId: user.uid,
    lastUsed: new Date().toISOString()
  };
  await setDoc(doc(db, FIRESTORE_COLLECTIONS.CLIENTS, client.id), clientWithUser);
};

export const removeClientForUser = async (clientId: string) => {
  const clientDoc = doc(db, FIRESTORE_COLLECTIONS.CLIENTS, clientId);
  await deleteDoc(clientDoc);
};

export const updateClientLastUsed = async (clientId: string) => {
  const clientDoc = doc(db, FIRESTORE_COLLECTIONS.CLIENTS, clientId);
  await updateDoc(clientDoc, { lastUsed: new Date().toISOString() });
};
