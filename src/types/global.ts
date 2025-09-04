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
  id?: string;
  name?: string;
  discipline?: string;
  services?: string;
  service?: string;
  sessions?: number;
  price?: string | number;
  status?: "Active" | "Inactive";
}

export interface Service {
  id: string;
  name: string;
  discipline: string;
  price: number;
}

export interface InvoiceItem {
  id?: string;
  name?: string;
  type?: string;
  quantity?: number | string;
  price?: number | string;
  total?: number | string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "card" | "cash" | "voucher" | "bond";
  icon?: any;
}

export interface ProductTab {
  id: string;
  discipline: string;
}

export interface SettingService {
  name: string;
  discipline: string;
  services: string;
  price: string
}

export interface AllStaffs {
  name: string;
  email: string;
  discipline: string;
  role: string;
  status: "Active" | "Inactive"
}