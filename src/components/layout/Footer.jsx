import React from "react";

function Footer() {
  const date = new Date().getFullYear();

  //@todo link to portfolio
  return (
    <footer className="footer p-10 bg-gray-700 text-primary-content footer-center">
      <div>
        <a
          href="https://gevo222.github.io/#/portfolio"
          className="text-lg font-bold align-middle"
        >
          George Hovakimyan &copy; {date}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
