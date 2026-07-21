"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type ConsentChoices = {
  essential: true;
  analytics: boolean;
};

type StoredConsent = ConsentChoices & { decidedAt: string };

const KEY = "gepromed.cookie-consent";

function readStored(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === "boolean" && typeof parsed?.decidedAt === "string") {
      return { essential: true, analytics: parsed.analytics, decidedAt: parsed.decidedAt };
    }
    return null;
  } catch {
    return null;
  }
}

type Ctx = {
  /** null = no decision recorded yet (or not hydrated) */
  consent: StoredConsent | null;
  hydrated: boolean;
  /** manually reopened via "cookie settings" link, independent of `consent` */
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  save: (choices: ConsentChoices) => void;
};

const CookieConsentContext = createContext<Ctx>({
  consent: null,
  hydrated: false,
  panelOpen: false,
  openPanel: () => {},
  closePanel: () => {},
  save: () => {},
});

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setConsent(readStored());
    setHydrated(true);
  }, []);

  const save = useCallback((choices: ConsentChoices) => {
    const record: StoredConsent = { ...choices, decidedAt: new Date().toISOString() };
    window.localStorage.setItem(KEY, JSON.stringify(record));
    setConsent(record);
    setPanelOpen(false);
  }, []);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);

  return (
    <CookieConsentContext.Provider value={{ consent, hydrated, panelOpen, openPanel, closePanel, save }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}
