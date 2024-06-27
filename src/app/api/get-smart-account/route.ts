import { currentUser } from "@clerk/nextjs/server";
import { createPassportSigner } from "../../passport";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const passportSigner = await createPassportSigner({
      username: user.emailAddresses[0].emailAddress,
    });
    console.log("Passport Signer: ", passportSigner);
    console.log("Address: ");

    // const address = await passportSigner.getAddress();
    // console.log("Address: ", address);

    const details = await passportSigner.getAuthDetails();
    console.log("Auth Details: ", details);

    // const signedMessage = await passportSigner.signMessage("test");
    // console.log("Signed Message: ", signedMessage);

    // const typedData: {
    //   types: {
    //     Request: { name: string; type: string }[];
    //   };
    //   primaryType: "Request";
    //   message: {
    //     hello: string;
    //   };
    // } = {
    //   types: {
    //     Request: [{ name: "hello", type: "string" }],
    //   },
    //   primaryType: "Request",
    //   message: {
    //     hello: "world",
    //   },
    // };
    // console.log("Typed Data: ", typedData);
    // const signTypedData = await passportSigner.signTypedData(typedData);
    // console.log(signTypedData);

    return new Response(JSON.stringify(details), { status: 200 });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
}
