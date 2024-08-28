import React from "react";

interface Props {}

// export const metadata = {
//   title: "유저상세",
// };

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}

export default Layout;
