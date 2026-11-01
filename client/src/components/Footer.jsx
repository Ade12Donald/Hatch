import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const iconLink = "p-2 transition duration-300 hover:scale-110 hover:opacity-70";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-base-300">
      <div className="mx-auto max-w-5xl px-6 pt-8 pb-5 flex flex-col items-center gap-3 md:flex-row md:items-start md:justify-between">
        <div className="text-center md:text-left">
          <h4 className="font-heading text-2xl font-semibold">Hatch</h4>
          <p className="mt-1 text-base opacity-80">
            Swap skills. Hatch new ones.
          </p>
          <a
            href="mailto:donaldade.dev@gmail.com"
            className="mt-3 inline-block text-sm opacity-80 hover:underline"
          >
            donaldade.dev@gmail.com
          </a>
        </div>

        <div className="flex gap-2">
          <a
            aria-label="Email Hatch"
            href="mailto:donaldade.dev@gmail.com"
            className={iconLink}
          >
            <MdEmail size={24} />
          </a>
          <a
            aria-label="Hatch on GitHub"
            href="https://github.com/Ade12Donald/Skill-Swap"
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
          >
            <FaGithub size={24} />
          </a>
          <a
            aria-label="Hatch on LinkedIn"
            href="https://www.linkedin.com/in/donald-adebowale-ba4781400"
            target="_blank"
            rel="noopener noreferrer"
            className={iconLink}
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>

      {/* Bottom strip: fine print */}
      <div className="border-t border-base-300 py-4 text-center text-sm opacity-70">
        &#169; 2026 Hatch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
