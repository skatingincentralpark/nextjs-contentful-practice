import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPreviewPostBySlug } from "../../../lib/api";

export async function GET(request: Request) {
  /**
   * Parse query string parameters
   * and validate the secret
   */
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  console.log("----------------------------");
  console.log("Getting preview post");
  console.log(secret);

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const post = await getPreviewPostBySlug(slug);

  if (!post) {
    return new Response("Invalid slug", { status: 401 });
  }

  /**
   * This will set a cookie to enable draft mode. Subsequent
   * requests containing this cookie will trigger Draft Mode
   * changing the behavior for statically generated pages
   */
  console.log("Enabling draft mode!");
  draftMode().enable();
  redirect(`/posts/${post.slug}`);
}
