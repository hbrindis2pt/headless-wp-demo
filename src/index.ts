import "dotenv/config";
import express from "express";
import {
  getPosts,
  getPostsByCategory,
  getPaywalledPosts,
  getPremiumPosts,
} from "./services/posts.js";

import type { Post } from "./types/post.js";

const app = express();
const PORT = 3000;

app.get("/", async (_request, response) => {
  try {
    const [posts, sidebarPosts, paywalledPosts, premiumPosts,] = await Promise.all([
      getPosts(),
      getPostsByCategory("second-cat", 5),
      getPaywalledPosts(4),
      getPremiumPosts(4),
    ]);
    const paywalledHtml = renderContentRow(
      paywalledPosts,
      "paywalled",
    );

    const premiumHtml = renderContentRow(
      premiumPosts,
      "premium",
    );
    const postHtml = posts
      .map((post) => {
        const imageHtml = post.featuredImage
          ? `
              <img
                src="${escapeHtml(
                  post.featuredImage.node.sourceUrl,
                )}"
                alt="${escapeHtml(
                  post.featuredImage.node.altText ||
                    post.title,
                )}"
                width="300"
                loading="lazy"
              >
            `
          : "";

        return `
          <article>
            ${imageHtml}

            <h2>${post.title}</h2>

            <p>
              <a href="/posts/${post.slug}">
                Read article
              </a>
            </p>

            <div>${post.excerpt}</div>
          </article>
        `;
      })
      .join("");

      const sidebarHtml = sidebarPosts
        .map((post) => {
          const imageHtml = post.featuredImage
            ? `
                <img
                  src="${escapeHtml(
                    post.featuredImage.node.sourceUrl,
                  )}"
                  alt="${escapeHtml(
                    post.featuredImage.node.altText ||
                      post.title,
                  )}"
                  width="100"
                  loading="lazy"
                  style="width: 100px;"
                >
              `
            : "";
          return `
            <article class="sidebar-post">
              ${imageHtml}
              <h3>
                <a href="/posts/${post.slug}">
                  ${post.title}
                </a>
              </h3>
            </article>
          `;
        })
        .join("");
    response.send(`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          >
          <title>Headless WordPress Demo</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              max-width: 1100px;
              margin: 0 auto;
              padding: 24px;
            }

            article {
              margin-bottom: 40px;
              padding-bottom: 32px;
              border-bottom: 1px solid #ccc;
            }

            article img {
              display: block;
              width: 300px;
              height: auto;
              object-fit: cover;
            }
            .page-layout {
              display: grid;
              grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);
              gap: 48px;
              align-items: start;
            }
      
            aside {
              border-left: 1px solid #ccc;
              padding-left: 24px;
            }

            .sidebar-post {
              margin-bottom: 20px;
              padding-bottom: 16px;
              border-bottom: 1px solid #ddd;
            }

            .sidebar-post h3 {
              margin: 0;
              font-size: 18px;
              line-height: 1.3;
            }

            .sidebar-post a {
              color: inherit;
            }
            .bottom-content-section {
              margin-top: 56px;
            }

            .bottom-content-section > h2 {
              margin-bottom: 24px;
            }

            .content-row {
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              gap: 24px;
            }

            .content-card {
              margin: 0;
              padding: 0 0 20px;
              border-bottom: 1px solid #ddd;
            }

            .content-card img {
              display: block;
              width: 100%;
              height: auto;
              aspect-ratio: 16 / 9;
              object-fit: cover;
            }

            .content-card h3 {
              margin: 12px 0 8px;
              font-size: 20px;
              line-height: 1.25;
            }

            .content-card a {
              color: inherit;
            }

            .content-card-excerpt {
              font-size: 15px;
              line-height: 1.5;
            }

            @media (max-width: 700px) {
              .page-layout {
                grid-template-columns: 1fr;
              }

              aside {
                border-left: 0;
                border-top: 1px solid #ccc;
                padding-left: 0;
                padding-top: 24px;
              }
            }
            @media (max-width: 900px) {
              .content-row {
                grid-template-columns: repeat(2, minmax(0, 1fr));
              }
            }

            @media (max-width: 500px) {
              .content-row {
                grid-template-columns: 1fr;
              }
            }
          </style>
        </head>

        <body>
          <div class="page-layout">
            <main>
              <h1>Latest posts</h1>
              ${postHtml}
            </main>

            <aside>
              <h2>Category posts</h2>
              ${sidebarHtml}
            </aside>
          </div>
          <section class="bottom-content-section">
            <h2>Paywalled</h2>

            <div class="content-row">
              ${paywalledHtml}
            </div>
          </section>

          <section class="bottom-content-section">
            <h2>Premium</h2>

            <div class="content-row">
              ${premiumHtml}
            </div>
          </section>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Unable to retrieve posts:", error);

    response.status(500).send(`
      <h1>Could not load posts</h1>
      <pre>${escapeHtml(String(error))}</pre>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function renderContentRow(
  posts: Post[],
  routeBase: string,
): string {
  return posts
    .map((post) => {
      const imageHtml = post.featuredImage
        ? `
            <img
              src="${escapeHtml(
                post.featuredImage.node.sourceUrl,
              )}"
              alt="${escapeHtml(
                post.featuredImage.node.altText ||
                  post.title,
              )}"
              loading="lazy"
            >
          `
        : "";

      return `
        <article class="content-card">
          ${imageHtml}

          <h3>
            <a href="/${routeBase}/${encodeURIComponent(
              post.slug,
            )}">
              ${escapeHtml(post.title)}
            </a>
          </h3>

          <div class="content-card-excerpt">
            ${post.excerpt}
          </div>
        </article>
      `;
    })
    .join("");
}