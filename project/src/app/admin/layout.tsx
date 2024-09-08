import React from "react";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>Quản Lý Người Dùng</title>
        <link rel="icon" href="https://logodix.com/logo/1707097.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
