import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const LinkedinUrl = "https://www.linkedin.com/in/shazinabdulnazarv";
  const GitHubUrl = "https://github.com/shazin-v";
  const PortFolio = "https://shazin-v.github.io/my-portfolio/";
  return (
    <>
      <footer className=" bottom-0 left-0 w-full bg-white shadow dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {currentYear} . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href={GitHubUrl} className="hover:underline me-4 md:me-6">
                GitHub
              </a>
            </li>
            <li>
              <a href={LinkedinUrl} className="hover:underline me-4 md:me-6">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={PortFolio} className="hover:underline">
                PortFolio
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
