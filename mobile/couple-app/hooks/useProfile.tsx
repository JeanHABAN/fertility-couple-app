// mobile/couple-app/hooks/useProfile.ts
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "safeFertility.profile.v1";

// --- Types ----------------------------------------------------

export type UserRole = "OWNER" | "PARTNER" | "BOTH";

export type Profile = {
  name?: string;
  email?: string;
  role?: UserRole;
  shareWithPartner?: boolean;
  partnerCode?: string;
};

type ProfileContextValue = {
  profile: Profile;

  // onboarding helpers
  setRole: (role: UserRole) => void;

  // generic updater used across onboarding/settings
  updateProfile: (patch: Partial<Profile>) => void;

  // partner-sharing helpers
  setShareWithPartner: (enabled: boolean) => void;
  ensurePartnerCode: () => void;
};

// --- Context setup --------------------------------------------

const defaultProfile: Profile = {
  name: "",
  email: undefined,
  role: "OWNER",
  shareWithPartner: false,
  partnerCode: undefined,
};

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

// --- Provider -------------------------------------------------

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loaded, setLoaded] = useState(false);

  // load from AsyncStorage once
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<Profile>;
          setProfile((prev) => ({ ...prev, ...parsed }));
        }
      } catch (e) {
        console.warn("Failed to load profile", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // persist whenever profile changes (after first load)
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      } catch (e) {
        console.warn("Failed to save profile", e);
      }
    })();
  }, [profile, loaded]);

  const updateProfile = (patch: Partial<Profile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  };

  const setRole = (role: UserRole) => {
    updateProfile({ role });
  };

  const setShareWithPartner = (enabled: boolean) => {
    updateProfile({ shareWithPartner: enabled });
  };

  const ensurePartnerCode = () => {
    setProfile((prev) => {
      if (prev.partnerCode) return prev;
      const code = generatePartnerCode();
      return { ...prev, partnerCode: code };
    });
  };

  const value: ProfileContextValue = {
    profile,
    setRole,
    updateProfile,
    setShareWithPartner,
    ensurePartnerCode,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

// --- Hook -----------------------------------------------------

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used inside <ProfileProvider>");
  }
  return ctx;
}

// --- Helpers --------------------------------------------------

function generatePartnerCode(): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let raw = "";
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    raw += chars[idx];
  }
  return `${raw.slice(0, 3)}-${raw.slice(3)}`; // e.g. AB3-F7Q
}
