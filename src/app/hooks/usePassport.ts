import { useRef } from "react";
import { WebauthnSigner } from "@0xpass/webauthn-signer";
import { Passport, Network } from "@0xpass/passport";

interface PassportAuthProps {
  scopeId: string;
  network?: Network;
}

export function usePassport({
  scopeId,
  network = Network.TESTNET,
}: PassportAuthProps): {
  passport: Passport;
  signer: WebauthnSigner;
} {
  const signerRef = useRef<WebauthnSigner | null>(null);
  const passportRef = useRef<Passport | null>(null);

  if (!signerRef.current) {
    signerRef.current = new WebauthnSigner({
      rpId: process.env.NEXT_PUBLIC_RP_ID!,
      rpName: "0xPass",
    });
  }

  if (!passportRef.current) {
    passportRef.current = new Passport({
      scopeId: scopeId,
      signer: signerRef.current,
      network: Network.TESTNET,
    });
  }

  return {
    passport: passportRef.current,
    signer: signerRef.current,
  };
}
