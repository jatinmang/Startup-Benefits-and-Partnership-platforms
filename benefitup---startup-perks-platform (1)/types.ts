
export type AccessLevel = 'public' | 'locked';
export type ClaimStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  avatar?: string;
}

export interface Deal {
  id: string;
  partnerName: string;
  logo: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  benefit: string;
  category: 'Cloud' | 'Marketing' | 'DevTools' | 'Finance' | 'Design';
  accessLevel: AccessLevel;
  conditions: string[];
}

export interface Claim {
  id: string;
  userId: string;
  dealId: string;
  status: ClaimStatus;
  claimedAt: string;
  dealTitle: string;
  partnerName: string;
  logo: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
