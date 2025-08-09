import type { Environment } from './company';

export interface Client {
  id: string; // Format: {sellerId}_{clientNip/Regon}:{environment}
  sellerId: string; // ID of the company this client belongs to
  name: string;
  nip?: string;
  regon?: string;
  address?: string;
  email?: string;
  environment: Environment;
  createdAt: string;
  lastUsed?: string;
}
