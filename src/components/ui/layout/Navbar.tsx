import Logo from "../Logo";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/75 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 transition hover:opacity-90">
          <Logo className="h-7" />
        </a>

        <nav className="flex min-w-0 items-center gap-4 md:gap-8">
          <div className="flex min-w-0 max-w-[55vw] items-center gap-4 overflow-x-auto whitespace-nowrap pb-1 md:max-w-none md:gap-6 md:overflow-visible md:pb-0">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="rounded-full bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-zinc-900 transition hover:bg-zinc-300"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}