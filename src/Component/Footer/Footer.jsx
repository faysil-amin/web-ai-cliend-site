import React from "react";
import Container from "../Container/Container";
import { FaGithub } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200/80 backdrop-blur-xl border-t border-base-300 text-base-content mt-16 transition-colors duration-300">
      <Container>
        <div className="py-12 px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Brand Info Section */}
          <div className="md:col-span-6 flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 group-hover:shadow-yellow-500/30 transition-all duration-300">
                <HiSparkles className="text-xl text-yellow-100 group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-red-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                WEB AI
              </span>
            </Link>

            <p className="text-sm text-base-content/70 max-w-sm leading-relaxed mt-1">
              Empowering developers and creators with cutting-edge AI models and solutions. Explore, build, and deploy effortlessly.
            </p>
          </div>

          {/* Repository & Links Section */}
          <div className="md:col-span-6 flex flex-col md:items-end">
            <div>
              <h6 className="footer-title text-xs font-bold uppercase tracking-widest text-red-500 opacity-90 mb-4">
                Source Code
              </h6>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Client Link */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/faysil-amin/web-ai-cliend-site"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-base-100 border border-base-300/80 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold group"
                >
                  <FaGithub className="text-xl text-base-content group-hover:text-red-500 transition-colors" />
                  <span>Client Repository</span>
                </a>

                {/* Server Link */}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/faysil-amin/web-ai-server-site"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-base-100 border border-base-300/80 hover:border-amber-500/40 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-0.5 transition-all duration-300 text-sm font-semibold group"
                >
                  <FaGithub className="text-xl text-base-content group-hover:text-amber-500 transition-colors" />
                  <span>Server Repository</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Divider */}
        <div className="border-t border-base-300/60 py-6 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-base-content/60">
          <p>© {new Date().getFullYear()} WEB AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with passion using <span className="text-red-500">React</span> & <span className="text-amber-500">Tailwind CSS</span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;