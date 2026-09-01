import Navbar from "./components/ui/layout/Navbar";
import ProfilePicture from "./components/ui/ProfilePicture";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-20">
        {/* Flex container places image and text side-by-side */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          {/* Profile Picture (Left) */}
          <div className="shrink-0">
            <ProfilePicture />
          </div>

          {/* Welcome & Intro Text (Right) */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Welcome to My Portfolio
            </h1>
            <p className="text-lg text-zinc-400 max-w-xl">
              Hi, I’m Christopher Pham — Software Engineer & AI Developer.
            </p>
          </div>

        </div>
        
      </main>
    </div>
  );
}
 