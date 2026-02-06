
import { User, Deal, Claim, AuthState } from '../types';
import { MOCK_DEALS } from '../constants';

const STORAGE_KEY = 'benefitup_db';

interface DB {
  users: User[];
  claims: Claim[];
}

const getDB = (): DB => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { users: [], claims: [] };
};

const saveDB = (db: DB) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const authService = {
  register: async (name: string, email: string): Promise<{ user: User; token: string }> => {
    await new Promise(r => setTimeout(r, 800));
    const db = getDB();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      isVerified: Math.random() > 0.3, // Simulate random verification status for demo
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    db.users.push(newUser);
    saveDB(db);
    return { user: newUser, token: 'mock-jwt-token' };
  },

  login: async (email: string): Promise<{ user: User; token: string }> => {
    await new Promise(r => setTimeout(r, 800));
    const db = getDB();
    let user = db.users.find(u => u.email === email);
    if (!user) {
      // For demo purposes, auto-register if not found
      return authService.register(email.split('@')[0], email);
    }
    return { user, token: 'mock-jwt-token' };
  }
};

export const dealService = {
  getDeals: async (): Promise<Deal[]> => {
    await new Promise(r => setTimeout(r, 500));
    return MOCK_DEALS;
  },
  getDealById: async (id: string): Promise<Deal | undefined> => {
    await new Promise(r => setTimeout(r, 300));
    return MOCK_DEALS.find(d => d.id === id);
  }
};

export const claimService = {
  claimDeal: async (userId: string, dealId: string): Promise<Claim> => {
    await new Promise(r => setTimeout(r, 1200));
    const db = getDB();
    const deal = MOCK_DEALS.find(d => d.id === dealId);
    if (!deal) throw new Error('Deal not found');

    const newClaim: Claim = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      dealId,
      status: 'pending',
      claimedAt: new Date().toISOString(),
      dealTitle: deal.title,
      partnerName: deal.partnerName,
      logo: deal.logo
    };
    db.claims.push(newClaim);
    saveDB(db);
    return newClaim;
  },

  getUserClaims: async (userId: string): Promise<Claim[]> => {
    await new Promise(r => setTimeout(r, 500));
    const db = getDB();
    return db.claims.filter(c => c.userId === userId);
  }
};
