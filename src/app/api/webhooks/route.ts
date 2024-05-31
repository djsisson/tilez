import { Webhook } from "svix";
import { headers } from "next/headers";
import { UserJSON, WebhookEvent } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  const { id } = evt.data;

  switch (evt.type) {
    case "user.created": {
      const { username, first_name, last_name, image_url, email_addresses } =
        evt.data as UserJSON;
      await sql`INSERT INTO nextusers (clerk_id, username, first_name, last_name, email, imglink) VALUES
      (${id}, ${username}, ${first_name}, ${last_name}, ${email_addresses[0].email_address}, ${image_url}) ON CONFLICT DO NOTHING`;
      break;
    }
    case "user.deleted": {
      await sql`DELETE FROM nextusers WHERE clerk_id = ${id}`;
      break;
    }
    case "user.updated": {
      const { username, first_name, last_name, image_url, email_addresses } =
        evt.data as UserJSON;
      await sql`UPDATE nextusers SET username = ${username}, first_name = ${first_name}, last_name = ${last_name}, email = ${email_addresses[0].email_address}, imglink = ${image_url} WHERE clerk_id = ${id}`;
      break;
    }
    default: {
      break;
    }
  }

    console.log(`Webhook with and ID of ${id}`)// and type of ${eventType}`)
  //   console.log('Webhook body:', body)

  return new Response("", { status: 200 });
}
