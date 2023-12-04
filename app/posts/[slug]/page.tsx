import { getAllPosts, getPostAndMorePosts } from "@/lib/api";
import { Markdown } from "@/lib/markdown";
import { Post } from "@/lib/types";
import { draftMode } from "next/headers";
import Link from "next/link";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const { post, morePosts }: { post: Post; morePosts: Post[] } =
    await getPostAndMorePosts(params.slug, isEnabled);

  return (
    <div className="p-4 space-y-4">
      <Link
        href="/"
        className="underline rounded active:bg-lime-200 focus-visible:outline outline-2 outline-offset-2 outline-orange-500"
      >
        Back to home
      </Link>
      <div className={proseClass}>
        <h1>{post.title}</h1>
        <Markdown content={post.content} />
      </div>
      <div>
        {morePosts.length > 0 && (
          <>
            <h2 className="font-bold">More Posts</h2>
            <ul>
              {morePosts.map((post) => (
                <li key={post.slug}>
                  <Link className="underline" href={`/posts/${post.slug}`}>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

const proseClass = `
  prose
  text-black

  prose-h1:text-xl

  prose-h2:text-lg

  prose-p:text-base
  prose-a:text-blue-500
  prose-a:cursor-pointer

  prose-blockquote:font-light
  prose-blockquote:not-italic
  prose-blockquote:border-l
  prose-blockquote:border-black

  prose-li:m-0
  prose-li:text-sm

  prose-img:w-full

  max-w-md
`;
