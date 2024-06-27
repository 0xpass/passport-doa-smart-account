"use client";
import { passkeyConnector } from "@0xpass/connector";
import { Network } from "@0xpass/passport";
import { WebauthnSigner } from "@0xpass/webauthn-signer";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { signMessage } from "@wagmi/core";
import { config } from "../config";

export default function ConnectorPage() {
  const { address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const [username, setUsername] = useState("");
  const [signature, setSignature] = useState("");

  return (
    <div className="p-8">
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}

      <div className="flex items-start flex-col space-y-4 w-1/4">
        <button className="p-1 w-full border border-black rounded-md" onClick={() => disconnect()}>
          Disconnect
        </button>
        <input
          type="text"
          className="p-1 w-full border border-black rounded-md text-center"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="p-1 border border-black rounded-md w-full"
          onClick={() =>
            connect({
              chainId: 1,
              connector: passkeyConnector({
                scopeId: process.env.NEXT_PUBLIC_SCOPE_ID!,
                network: Network.TESTNET
                username: username,
                userDisplayName: username,
                signer: new WebauthnSigner({
                  rpId: process.env.NEXT_PUBLIC_RP_ID!,
                  rpName: "0xPass",
                }),
              }),
            })
          }
        >
          Connect
        </button>

        {signature && (
          <div className="flex flex-col items-start">
            <div className="text-center font-bold">Signature</div>
            <div className="text-center">{signature}</div>
          </div>
        )}
        <button
          className="p-1 border border-black rounded-md w-full"
          onClick={async () => {
            const signature = await signMessage(config, { message: "hello world" });
            setSignature(signature);
          }}
        >
          Sign Message
        </button>
      </div>
    </div>
  );
}
