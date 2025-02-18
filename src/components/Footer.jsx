import React from "react";

function Footer() {
  return (
    <>
      <footer className="footer sm:footer-horizontal footer-center bg-slate-900 text-white font-semibold p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Fahri
            Alfa Rizki | Fulstak Developer
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Footer;
