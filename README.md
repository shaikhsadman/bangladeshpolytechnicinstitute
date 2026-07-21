# Bangladesh Polytechnic Institute — Next.js version

This is the same Student Management System, rebuilt as a Next.js project.
All the original features (Admin / Teacher / Student logins, CRUD, attendance,
marks, semester results) work exactly the same — the app logic itself lives
in `public/app.js`.

Domain shown in the app: **bangladeshpolytechnicinstitute.vercel.app** (update this once you rename your Vercel project — see Part 4 below)

---

## Part 1 — Run it on your own laptop (to test / show teacher directly)

You need **Node.js** installed once (version 18 or newer).
Download it free from: https://nodejs.org (choose the "LTS" version, click Next-Next-Finish like any installer).

Steps:

1. Copy the whole `bangladeshpolytechnicinstitute` folder to your laptop (from pendrive, or wherever).
2. Open a terminal / Command Prompt **inside that folder**.
   - Windows: open the folder in File Explorer, click the address bar, type `cmd`, press Enter.
   - Mac: right-click the folder → "New Terminal at Folder" (or open Terminal and `cd` into it).
3. Install dependencies (only needed once):
   ```
   npm install
   ```
4. Start the app:
   ```
   npm run dev
   ```
5. Open your browser and go to:
   ```
   http://localhost:3000
   ```
   The full app opens — log in as Admin (`admin` / `admin123`), Teacher (`T001` / `teach123`), or Student (`155001` / `155001`).

To stop it, go back to the terminal and press `Ctrl + C`.

This is the version you can show your teacher on your own laptop screen, or
project on a classroom screen — no internet needed once `npm install` is done.

---

## Part 2 — Put it on a pendrive

Since this is now a real Next.js project (not a single file), a pendrive copy
needs Node.js installed on whichever computer you plug it into — it can't be
opened by just double-clicking anymore (this is the trade-off of moving to
Next.js). To carry it on a pendrive:

1. Copy the entire `bangladeshpolytechnicinstitute` folder onto the pendrive
   (you can skip copying the `node_modules` and `.next` folders — they're
   regenerated automatically and just take up space).
2. On the new computer, install Node.js (see Part 1 link above) if it isn't
   already installed.
3. Copy the folder from the pendrive to the computer.
4. Open a terminal in the folder and run:
   ```
   npm install
   npm run dev
   ```
5. Open `http://localhost:3000` in the browser.

If your teacher's computer already has Node.js, this takes about a minute.

---

## Part 3 — Get a real link you can open on *any* device (phone, teacher's PC, etc.)

This needs a one-time free deployment to **Vercel** (the company that makes
Next.js — deploying a Next.js app there is free and takes a few minutes).

### Option A — Deploy straight from your laptop (fastest, no GitHub needed)

1. Make sure you've already run `npm install` once (Part 1, step 3).
2. In the same terminal, run:
   ```
   npx vercel
   ```
3. First time only, it will ask you to log in — it opens a browser page,
   just sign up/log in with your email or GitHub account (free).
4. It will ask a few questions — just press **Enter** to accept the defaults
   for all of them (project name, directory, etc.).
5. Wait ~30–60 seconds. It will print a link like:
   ```
   https://bangladeshpolytechnicinstitute.vercel.app
   ```
6. That link works on **any device, anywhere** — phone, teacher's PC, another
   country — just open it in a browser, no installation needed on the
   viewing side.
7. Whenever you make changes later, run:
   ```
   npx vercel --prod
   ```
   to update the live link.

### Option B — Deploy via GitHub (if you want it saved online too)

1. Create a free account at https://github.com if you don't have one.
2. Create a new repository and upload the `bangladeshpolytechnicinstitute` folder to it
   (GitHub's website has an "upload files" button — drag the folder in, or
   use `git push` if you know Git).
3. Go to https://vercel.com, sign up/log in with your GitHub account.
4. Click **"Add New… → Project"**, pick your repository, click **Deploy**.
5. Vercel builds it automatically and gives you the same kind of link as
   Option A.

---

## Part 4 — Rename your Vercel project (change the link from "campushub" to "bangladeshpolytechnicinstitute")

Since you already deployed via GitHub + Vercel, you don't need to redeploy
from scratch — you just rename the existing project, and Vercel changes the
`.vercel.app` link for you automatically.

1. Go to https://vercel.com and log in.
2. Open your project (currently showing as something like `campushub-nextjs`).
3. Click the **Settings** tab (top menu of the project page).
4. Under **General**, find the **Project Name** field.
5. Clear it and type: `bangladeshpolytechnicinstitute`
6. Click **Save**.
7. Vercel will immediately update your live link to:
   ```
   https://bangladeshpolytechnicinstitute.vercel.app
   ```
   (If that exact name is already taken by someone else on Vercel, it'll show
   an error and ask you to tweak it slightly, e.g. adding a hyphen or a
   number — whatever it gives you, use that exact link everywhere below.)
8. Now push the code changes from this update (rebranding + new
   credentials) to GitHub — see Options A/B above. Vercel will
   auto-redeploy within a minute or two, and the site will show
   "Bangladesh Polytechnic Institute" everywhere with the new link.

**Important:** the code in this project already has
`bangladeshpolytechnicinstitute.vercel.app` written into the login page and
admin dashboard as plain text (just a label, not a real link/button) — it
assumes your renamed project ends up with exactly that address. If Vercel
gives you a slightly different one, search for
`bangladeshpolytechnicinstitute.vercel.app` inside `app/_body.html` and
`public/app.js` and swap in whatever your actual link turns out to be.

---

## Quick summary — which part do I need?

| What you want to do                                        | Use    |
|-------------------------------------------------------------|--------|
| Show teacher on your own laptop right now                   | Part 1 |
| Carry the project on a pendrive to another PC                | Part 2 |
| Send teacher a link they can open on their own phone/PC      | Part 3 |
| Change the live link from "campushub" to your institute name | Part 4 |
