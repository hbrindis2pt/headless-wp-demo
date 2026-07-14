import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_request, response) => {
  response.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Headless WordPress Demo</title>
      </head>

      <body>
        <h1>Headless WordPress Demo</h1>
        <p>The Node frontend is running.</p>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT}`);
});
