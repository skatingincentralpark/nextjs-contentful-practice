/**
 * Static rendering is useful when your pages fetch data
 * from a headless CMS. However, it’s not ideal when you’re
 * writing a draft on your headless CMS and want to view the
 * draft immediately on your page. You’d want Next.js to
 * render these pages at request time instead of build time
 * and fetch the draft content instead of the published
 * content. You’d want Next.js to switch to dynamic rendering
 * only for this specific case.
 */
import { draftMode } from "next/headers";
import { getAllPosts } from "@/lib/api";
import Link from "next/link";
import { Post } from "@/lib/types";
import Image from "next/image";

export const revalidate = 10;

export default async function Home() {
  const { isEnabled } = draftMode();
  const posts: Post[] = await getAllPosts(isEnabled);

  return (
    <div className="flex">
      {posts.map((post) => {
        return (
          <Link
            href={`/posts/${post.slug}`}
            key={post.slug}
            className="border rounded p-4 m-4 max-w-xl cursor-pointer active:bg-lime-200 focus-visible:outline outline-2 outline-offset-2 outline-orange-500"
          >
            <div className="flex flex-col gap-2">
              <div className="aspect-[5/2] overflow-hidden bg-neutral-100">
                <Image
                  src={post.coverImage.url}
                  alt=""
                  width={500}
                  height={500}
                  className="object-cover rounded"
                />
              </div>
              <h2 className="font-bold">{post.title}</h2>
              <div>
                <p className="text-sm text-neutral-400 font-mono">
                  {post.date}
                </p>
                <p>{post.excerpt}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
