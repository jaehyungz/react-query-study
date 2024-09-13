import Script from "next/script";
import React from "react";

interface Props {}

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const {} = props

  return (
    <>
      <Script
        strategy="beforeInteractive"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
      />
      {children}
    </>
  );
}

export default Layout;
