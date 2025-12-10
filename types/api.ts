// types/api.ts

export interface User {
  _id: string;
  name_en?: string;
  name_km?: string;
  role: string; // 'user', 'premium_user', 'admin'
  settings: UserSettings;
}

export interface UserSettings {
  language: string;
  currency_mode: 'single' | 'dual';
  primary_currency?: string;
  rate_preference: 'live' | 'fixed';
  fixed_rate: number;
  initial_balances: {
    USD: number;
    KHR: number;
    [key: string]: number; // Allow dynamic currency keys
  };
  categories: {
    expense: string[];
    income: string[];
  };
}

export interface Transaction {
  _id: string;
  account_id: string;
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  categoryId: string;
  accountName: string;
  description: string;
  timestamp: string; // ISO Date
}

export interface Debt {
  _id: string;
  type: 'lent' | 'borrowed';
  person: string;
  originalAmount: number;
  remainingAmount: number;
  currency: string;
  status: 'open' | 'settled' | 'canceled';
  purpose?: string;
  created_at: string;
}

export interface SummaryResponse {
  balances: Record<string, number>; // e.g. { USD: 100, KHR: 4000 }
  debts_owed_by_you: Array<{ total: number; _id: string }>;
  debts_owed_to_you: Array<{ total: number; _id: string }>;
  periods: Record<string, any>; // Simplified for now
}

export interface AnalyticsSummary {
  totalIncomeUSD: number;
  totalExpenseUSD: number;
  netSavingsUSD: number;
  balanceAtStartUSD: number;
  balanceAtEndUSD: number;
}

export interface ExpenseBreakdown {
  category: string;
  totalUSD: number;
  [key: string]: any; // <--- REQUIRED FOR RECHARTS
}

export interface SpendingPoint {
  date: string;
  total_spent_usd: number;
  [key: string]: any; // <--- REQUIRED FOR RECHARTS
}

export interface AnalyticsReport {
  startDate: string;
  endDate: string;
  summary: AnalyticsSummary;
  expenseBreakdown: ExpenseBreakdown[];
  incomeBreakdown: ExpenseBreakdown[];
  spendingOverTime: SpendingPoint[];
  financialSummary: {
    totalLentUSD: number;
    totalBorrowedUSD: number;
    totalRepaidToYouUSD: number;
    totalYouRepaidUSD: number;
  };
}

export interface UserProfile {
  account_id: string;
  name_en?: string;
  name_km?: string;
  email?: string;
  settings: {
    language: string;
    currency_mode: 'single' | 'dual';
    primary_currency?: string;
    rate_preference: 'live' | 'fixed';
    fixed_rate: number;
    initial_balances: {
      USD: number;
      KHR: number;
      [key: string]: number; // Allow dynamic currency keys
    };
    categories: {
      expense: string[];
      income: string[];
    };
  };
}