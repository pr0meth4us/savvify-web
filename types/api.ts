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