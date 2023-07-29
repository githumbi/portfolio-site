// lib/Hotjar.js
import React from "react";

const Hotjar = () => (
  <React.Fragment>
    {/* Hotjar Tracking Code */}
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid: 3593122,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
      }}
    />
  </React.Fragment>
);

export default Hotjar;
