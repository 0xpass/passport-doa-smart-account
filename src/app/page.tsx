"use client";
import { SignUpButton, useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <p
        className={`font-bold text-2xl p-4 ${
          isSignedIn ? "text-green-500" : "text-red-500"
        }`}
      >
        Status: {isSignedIn ? "Authenticated" : "Not authenticated"}
      </p>

      <main className="flex flex-col items-center justify-center p-8 bg-gray-100 shadow-md rounded-lg space-y-8">
        <h2 className="font-bold italic text-2xl text-gray-900">Sign In</h2>
        <div className="space-y-4 flex flex-col w-full max-w-xs">
          <SignUpButton
            mode="modal"
            afterSignInUrl="/auth/callback"
            afterSignUpUrl="/auth/callback"
          >
            <button className="border border-1 rounded p-2 border-gray-400 w-full  text-gray-900">
              Sign Up / In With Clerk
            </button>
          </SignUpButton>
        </div>
        <div className="w-full max-w-xs">
          <h2 className="font-bold italic text-2xl py-4 text-gray-900">
            Methods
          </h2>
          <div className="space-y-4">
            <button
              onClick={async () => {
                try {
                  const response = await fetch("/api/get-account", {
                    method: "GET",
                  });

                  if (response.ok) {
                    const addresses = await response.json();
                    alert(addresses.result[0]);
                  }
                } catch (error) {
                  alert(error);
                }
              }}
              className="border border-1 rounded p-2 border-gray-400 w-full  text-gray-900"
            >
              Get Address
            </button>

            <button
              className="border border-1 rounded p-2 border-gray-400 w-full  text-gray-900"
              onClick={async () => {
                try {
                  const transaction = {
                    from: "0x078352189fEDC08a20A904C7effB2bE7438f901e",
                    nonce: "1",
                    gasPrice: "0x9184E72A000", // Example: 1 Gwei in hex
                    to: "0xb89FF4E9AD6B33F69153fa710F9849f51712eEc4",
                    gas: "0x7530", // 30,000
                    value: "0x2386F26FC10000", // 0.01 ETH in Wei
                    chainId: "0x5", // Goerli's chain ID
                    type: "0x00",
                  };

                  const res = await fetch("/api/sign", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      type: "transaction",
                      data: transaction,
                    }),
                  });
                  console.log("rest", res);
                  alert(JSON.stringify(res));
                } catch (e) {
                  alert(e);
                }
              }}
            >
              Sign Transaction
            </button>
            <button
              className="border border-1 rounded p-2 border-gray-400 w-full  text-gray-900"
              onClick={async () => {
                try {
                  const res = await fetch("/api/sign", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      type: "message",
                      data: "hello world!",
                    }),
                  });
                  alert(JSON.stringify(res));
                } catch (e) {
                  alert(e);
                }
              }}
            >
              Sign Message
            </button>
            <button
              className="border border-1 rounded p-2 border-gray-400 w-full  text-gray-900"
              onClick={async () => {
                try {
                  const response = await fetch("/api/get-smart-account", {
                    method: "GET",
                  });

                  if (response.ok) {
                    alert(await response.json());
                  }
                } catch (error) {
                  alert(error);
                }
              }}
            >
              Get Smart Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
