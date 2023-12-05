import Link from "next/link";
import { draftMode } from "next/headers";

import { getAllPosts, getPostAndMorePosts } from "@/lib/api";
import { Markdown } from "@/lib/markdown";
import Image from "next/image";

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
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);
  const { title, coverImage, date, excerpt, slug, content } = post;

  const imageAlt = `${coverImage.title}${
    coverImage.description ? ` - ${coverImage.description}` : ""
  }`;

  const LINK_CLASS =
    "underline rounded active:bg-lime-200 focus-visible:outline outline-2 outline-offset-2 outline-orange-500";

  return (
    <div className="space-y-4">
      <div>
        <Link
          href="/"
          className={`${LINK_CLASS} fixed py-1 px-4 bottom-4 xs:bottom-auto xs:top-4 left-4 bg-white shadow-lg border z-10`}
        >
          🏡 Back to home
        </Link>
        <Image
          src={coverImage.url}
          alt={imageAlt}
          width={coverImage.width}
          height={coverImage.height}
          className="max-h-96 object-cover bg-lime-200 object-top"
        />
      </div>
      <div className={`${proseClass} p-4`}>
        <div>
          <div className="text-gray-500 text-sm mb-2 font-mono">
            Published on: {date}
          </div>
          <h1>{title}</h1>
        </div>
        <Markdown content={content} />
      </div>
      <div className="p-4 border-t border-black text-right xs:text-left">
        {morePosts.length > 0 && (
          <>
            <h2 className="font-bold">More Posts</h2>
            <ul>
              {morePosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    className={`${LINK_CLASS}`}
                    href={`/posts/${post.slug}`}
                  >
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
  prose-img:m-0

  max-w-md
`;
