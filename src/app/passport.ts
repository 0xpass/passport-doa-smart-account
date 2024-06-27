import { PassportSigner } from "@alchemy/aa-signers/passport";
import { Network, Passport } from "@0xpass/passport";
import { http } from "viem";
import { sepolia } from "@alchemy/aa-core";
import { KeySigner } from "@0xpass/key-signer";

const keySigner = new KeySigner(process.env.PRIVATE_KEY!, true);

export const passport = new Passport({
  network: Network.TESTNET,
  scopeId: process.env.NEXT_PUBLIC_SCOPE_ID!,
  signer: keySigner,
});

export const createPassportSigner = async ({
  username,
}: {
  username: string;
}) => {
  passport.setUserData({ username });
  const passportSigner = new PassportSigner({ inner: passport });

  // await passportSigner.authenticate({
  //   username: "test",
  //   userDisplayName: "test",
  //   chain: sepolia,
  //   fallbackProvider: process.env.NEXT_PUBLIC_ALCHEMY_URL || "",
  // });

  return passportSigner;
};
