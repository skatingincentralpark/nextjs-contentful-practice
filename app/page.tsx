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
    <main className="p-4 space-y-4">
      <Intro />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, i) => {
          return (
            <Link
              href={`/posts/${post.slug}`}
              key={post.slug}
              className="border rounded p-4 max-w-xl cursor-pointer active:bg-lime-200 focus-visible:outline outline-2 outline-offset-2 outline-orange-500"
            >
              <div className="flex flex-col gap-2">
                <div className="aspect-[5/2] overflow-hidden">
                  <Image
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
                    priority={i < 4}
                    src={post.coverImage.url}
                    alt={post.title}
                    width={500}
                    height={500}
                    className="object-cover h-full object-top bg-neutral-100"
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
    </main>
  );
}

function Intro() {
  const LINK_CLASS =
    "underline rounded active:bg-lime-200 focus-visible:outline outline-2 outline-offset-2 outline-orange-500";

  return (
    <section className="space-y-4">
      <p>
        Simple blog created with{" "}
        <span className="text-orange-500">Next.js</span>,{" "}
        <span className="text-orange-500">Contentful</span> and{" "}
        <span className="text-orange-500">Tailwind</span> (as of Mon 4 Dec
        2023).
      </p>

      <ul>
        Links:
        <li>
          <a
            href="https://github.com/skatingincentralpark/nextjs-contentful-practice"
            className={LINK_CLASS}
          >
            GitHub For This Project
          </a>
        </li>
        <li>
          <a href="https://www.charliezhao.com/" className={LINK_CLASS}>
            My Portfolio
          </a>
        </li>
      </ul>

      <p>
        Features Draft Mode API, on-demand validation and Tailwind Typography
        plugin for content.
      </p>
    </section>
  );
}
