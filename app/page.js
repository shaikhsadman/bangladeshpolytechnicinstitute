import fs from 'fs';
import path from 'path';
import Script from 'next/script';

export default function Page() {
  const bodyHtmlPath = path.join(process.cwd(), 'app', '_body.html');
  const bodyHtml = fs.readFileSync(bodyHtmlPath, 'utf-8');

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      {/* app.js contains all original app logic (login, CRUD, attendance, marks, results).
          It runs as a normal script so its top-level functions attach to window,
          which is what the inline onclick="" handlers above call into. */}
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
