// ...existing code...
export interface User {
  id: number;
  email: string;
  password_hash: string;
  email_verified: number;
  kyc_status: string;
  kyc_submitted_at?: string;
  created_at: string;
}

export interface Account {
  id: number;
  user_id: number;
  type: "checking" | "savings";
  balance: number;
  status: string;
  created_at: string;
}

export interface Transaction {
  id: number;
  account_id: number;
  amount: number;
  type: "credit" | "debit";
  description?: string;
  created_at: string;
}

export interface KYCSubmission {
  id: number;
  user_id: number;
  status: string;
  submitted_at: string;
}

export interface AuditLog {
  id: number;
  user_id: number;
  action: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
