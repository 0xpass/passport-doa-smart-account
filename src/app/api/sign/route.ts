import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { KeySigner } from "@0xpass/key-signer";
import { Passport, Network } from "@0xpass/passport";
import { stringToHex } from "viem";

export async function POST(req: Request) {
  const payload = await req.json();
  const { type, data } = payload;

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

  if (type === "message") {
    const signature = await passport.signMessage(stringToHex(data));
    return NextResponse.json({ signature });
  } else if (type === "transaction") {
    const signature = await passport.signTransaction(data);
    return NextResponse.json({ signature });
  } else {
    return new Response("Invalid type", { status: 400 });
  }
}
