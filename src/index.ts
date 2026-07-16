import "dotenv/config";
import express from "express";
import { getPosts } from "./services/posts.js";

const app = express();
const PORT = 3000;

app.get("/", async (_request, response) => {
  try {
    const posts = await getPosts();

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
              max-width: 900px;
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
          </style>
        </head>

        <body>
          <main>
            <h1>Latest posts</h1>
            ${postHtml}
          </main>
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