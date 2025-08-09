export type Environment = 'test' | 'production';

export interface Company {
  id: string; // internal key, e.g. `${nip}:${environment}`
  name: string;
  nip?: string;
  regon?: string;
  address?: string;
  environment: Environment;
  createdAt: string;
}
