import Navbar from "./components/ui/layout/Navbar";
import ChatBox from "./components/ui/ChatBox";
import About from "./components/ui/About";
import Contact from "./components/ui/Contact";
import Experience from "./components/ui/Experience";
import ProfilePicture from "./components/ui/ProfilePicture";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-20">
        <section className="scroll-mt-24" id="home">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="shrink-0">
            <ProfilePicture />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Welcome to My Portfolio
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl">
              Hi, I’m Christopher Pham — Software Engineer & AI Developer.
            </p>
          </div>
          </div>
        </section>

        <section className="scroll-mt-24 py-24" id="about">
          <About />
        </section>

        <section className="scroll-mt-24 py-24" id="projects">
          <h2 className="text-2xl font-semibold text-white">Projects</h2>
          <p className="mt-3 text-zinc-400">A selection of my recent work is coming soon.</p>
        </section>

        <section className="scroll-mt-24 py-24" id="experience">
          <Experience />
        </section>

        <section className="scroll-mt-24 py-24" id="contact">
          <Contact />
        </section>

      </main>

      <ChatBox />
    </div>
  );
}
 