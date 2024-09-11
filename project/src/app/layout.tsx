"use client";
import "./globals.css";
import { ReduxProvider } from "./Provider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>rikkeiacademy</title>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Giao%20H%C3%A0ng%20%C6%AFu%20Ti%C3%AAn.png?alt=media&token=d49cc39d-a2f9-41d6-ac26-de5d037956a4"
        />
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
