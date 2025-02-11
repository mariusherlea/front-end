// ./components/Site/Header.tsx

import Link from "next/link";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full bg-red-700 p-4 text-red-50">
      <div className="wrapper mx-auto max-w-3xl">
        <Link href="/">
          <figure className="site-logo font-heading text-2xl font-black uppercase">
            The Q&A Times
          </figure>
        </Link>
      </div>
    </header>
  );
};

export default SiteHeader;
