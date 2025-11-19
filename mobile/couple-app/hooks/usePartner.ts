import { useState, useMemo } from "react";

export type PartnerStatus = "UNLINKED" | "PENDING" | "LINKED";

function randomCode(len: number = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function usePartner() {
  const [myCode] = useState(() => randomCode());
  const [status, setStatus] = useState<PartnerStatus>("UNLINKED");
  const [partnerCode, setPartnerCode] = useState<string | null>(null);

  function markLinked(code: string) {
    setPartnerCode(code);
    setStatus("LINKED");
  }

  function unlink() {
    setPartnerCode(null);
    setStatus("UNLINKED");
  }

  const info = useMemo(
    () => ({
      myCode,
      status,
      partnerCode,
    }),
    [myCode, status, partnerCode]
  );

  return {
    ...info,
    markLinked,
    unlink,
  };
}
