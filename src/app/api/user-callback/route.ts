import { NextResponse } from "next/server";
import { KeySigner } from "@0xpass/key-signer";
import { Passport, Network } from "@0xpass/passport";

export async function GET(req: Request) {
  return new Response(`Hello, world!, ${req.url}`);
}

export async function POST(req: Request) {
  const payload = await req.json();

  console.log(payload);
  const keySigner = new KeySigner(process.env.PRIVATE_KEY!, true);
  console.log(keySigner);

  const passport = new Passport({
    network: Network.TESTNET,
    scopeId: process.env.NEXT_PUBLIC_SCOPE_ID!,
    signer: keySigner,
  });
  console.log(process.env.NEXT_PUBLIC_SCOPE_ID);

  await passport.setupEncryption();
  const data = await passport.delegatedRegisterAccount({
    username: payload.emailAddress,
  });

  console.log(data);
  return NextResponse.json(data);
}
