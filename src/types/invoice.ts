// src/types/invoice.ts

export interface Party {
  name: string
  nip: string
  address: string
  account?: string
  email?: string
}

export interface InvoiceItem {
  description: string
  unit: string
  quantity: number
  price: number
  vatRate: number
  taxAmount: number
  total: number
}

export interface InvoiceData {
  parties: {
    buyer: Party
    seller: Party
  }
  dates: {
    issueDate: string
    saleDate: string
    dueDate: string
  }
  number?: string
  currency: string
  paymentMethod: string
  items: InvoiceItem[]
}
