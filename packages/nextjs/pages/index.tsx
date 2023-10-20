//import Link from "next/link";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import TypewriterComponent from "typewriter-effect";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className=" fixed top-40 left-40 text-8xl">
      <div className="text-transparent pt-8 bg-clip-text bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-gray-600 to-blue-400 animate-text">
          <TypewriterComponent
            options={{
              strings: [
                "Lifafa.xyz",
                "Red Envelope",
                "Claim digital Asset",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
