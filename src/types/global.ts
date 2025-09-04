/* eslint-disable @typescript-eslint/no-explicit-any */
export type NavItemTypes = {
  label: string;
  href: string;
};


// types/index.ts
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
}

export interface Voucher {
  id: string;
  name: string;
  amount: number;
  expireDate: string;
}

export interface Bond {
  id: string;
  name: string;
  discipline: string;
  service: string;
  sessions: number;
  price: number;
}

export interface Service {
  id: string;
  name: string;
  discipline: string;
  price: number;
}

export interface InvoiceItem {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  total: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "cash" | "voucher" | "bond";
  icon?: any;
}