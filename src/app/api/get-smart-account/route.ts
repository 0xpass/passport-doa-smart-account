import { currentUser } from "@clerk/nextjs/server";
import { createPassportSigner } from "../../passport";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      return new Response("Unauthorized", { status: 401 });
    }

    const passportSigner = await createPassportSigner({
      username: user.emailAddresses[0].emailAddress,
    });

    const details = await passportSigner.getAuthDetails();

    return new Response(JSON.stringify(details.addresses[0]), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(`${error}`, { status: 500 });
  }
}
