export type UserRole = "OWNER" | "PARTNER" | "BOTH";

export type Profile = {
  name: string;
  email?: string;
  role: UserRole;
  shareWithPartner: boolean;
  partnerCode?: string;
};
