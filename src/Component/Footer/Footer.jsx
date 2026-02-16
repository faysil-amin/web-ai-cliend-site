import React from "react";
import Container from "../Container/Container";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-neutral text-neutral-content">
      <Container>
        <footer className="mt-8 footer sm:footer-horizontal  p-10">
          <aside>
            <h1 className="text-2xl font-bold">Web AI</h1>
            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          </aside>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="flex flex-col gap-2 gap-4">
              <a
                target="_blank"
                href="https://github.com/faysil-amin/web-ai-cliend-site"
                className="flex items-center gap-2"
              >
                <span className="text-2xl">
                  <FaGithub />
                </span>
                Clend site git link{" "}
              </a>
              <a
                target="_blank"
                href="https://github.com/faysil-amin/web-ai-server-site"
                className="flex items-center gap-2"
              >
                <span className="text-2xl">
                  <FaGithub />
                </span>
                server site git link{" "}
              </a>
            </div>
          </nav>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
