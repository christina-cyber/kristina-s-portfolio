
  # KRISHTINA'S PORTFOLIO

  This is a code bundle for User request. The original project is available at https://www.figma.com/design/gLs4yuAEBsuK0ir6sDkopI/User-request.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Email sending (Gmail)

1. Create a `.env` file based on `.env.example` and set `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `GMAIL_TO`.
2. Start the email server in a second terminal with `npm run server`.
3. Keep `npm run dev` running for the UI. The contact form will POST to `/api/contact` and send to your Gmail.

Note: Gmail requires an App Password (enable 2‑Step Verification on your Google account, then create an App Password).
If the API runs on a different origin, set `VITE_API_BASE_URL` in `.env`.
  
