import { currentUser } from "@clerk/nextjs/server";
import { KeySigner } from "@0xpass/key-signer";
import { Passport, Network } from "@0xpass/passport";
import { createPassportClient } from "@0xpass/passport-viem";
import { http } from "viem";
import { mainnet } from "viem/chains";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const keySigner = new KeySigner(process.env.PRIVATE_KEY!, true);

    const passport = new Passport({
      network: Network.TESTNET,
      scopeId: process.env.NEXT_PUBLIC_SCOPE_ID!,
      signer: keySigner,
    });

    passport.setUserData({ username: user.emailAddresses[0].emailAddress });
    await passport.setupEncryption();

    const client = await createPassportClient(
      await passport.getDelegatedAuthenticatedHeaders(),
      http("https://rpc.ankr.com/eth_sepolia"),
      mainnet,
      process.env.NEXT_PUBLIC_ENDPOINT!
    );

    const addresses = await client.requestAddresses();
    return new Response(JSON.stringify(addresses), { status: 200 });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
}
