import { Canvas } from "@react-three/fiber";
import { motion, useTransform, useScroll } from "framer-motion";
import Navbar from "../components/Navbar";
import Scene from "../components/Scene";
import { useState } from "react";
import PropTypes from "prop-types";

// Reusable AnimatedText component
function AnimatedText({ text, className = "", delay = 0, startOffset = 100 }) {
  const { scrollY } = useScroll();
  const words = text.split(" ");

  const opacityValues = words.map((_, i) =>
    useTransform(
      scrollY,
      [startOffset + (i + delay) * 7, startOffset + (i + 1 + delay) * 7],
      [0, 1]
    )
  );

  return (
    <div className={`text-container ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          style={{
            opacity: opacityValues[index],
            transition: "opacity 0.2s ease-in-out",
          }}
          className="inline-block mx-1 text-white"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
  startOffset: PropTypes.number,
};

function FAQSection({ question, answer, delay = 180 }) {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  const opacity = useTransform(scrollY, [delay * 5, delay * 6], [0, 1]);

  return (
    <motion.div style={{ opacity }} className="mt-10 bg-white p-6 rounded-lg">
      <button
        className="w-full text-left text-plasma-black text-lg flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-plasma-black text-lg"
        >
          ▼
        </motion.span>
      </button>

      <motion.div
        className="text-plasma-black text-md overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="mt-2 p-2 box-border">{answer}</div>
      </motion.div>
    </motion.div>
  );
}

function Home() {
  return (
    <>
      <Navbar />
      <div className="relative h-screen w-full flex px-64">
        <div className="w-1/2 mt-64">
          <h1 className="text-3xl font-bold">DXF to OBJ Converter</h1>
          <p className="text mt-1 text-gray-200">Automating the conversion process for greater accuracy and efficiency.</p>
          <a href="/convert" className="group not-prose inline-flex items-center gap-1 mt-4 text-blue-400 hover:text-blue-200 cursor-pointer transition-all duration-300">Start Conversion Process
            <svg viewBox="0 0 24 24" className="size-5 stroke-[3px] stroke-current transition-opacity duration-300 ease-in-out">
              <line x1="5" y1="12" x2="19" y2="12" className="scale-x-0 translate-x-[10px] group-hover:translate-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
              <polyline points="12 5 19 12 12 19" className="-translate-x-2 group-hover:translate-x-0 transition-transform duration-300 ease-in-out" />
            </svg>
          </a>
        </div>

        <div className="relative w-1/2 h-full">
          <Canvas
            camera={{
              position: [0, -8, 0],
              fov: 45,
              near: 0.1,
              far: 1000,
            }}
          >
            <Scene />
          </Canvas>
        </div>
      </div>

      <div className="flex justify-center pb-[15vh]">
        <div className="text-left max-w-3xl">
          <div className="mb-10">
            <div className="mb-5">
              <AnimatedText text="ABOUT US" className="text-2xl" delay={2} />
            </div>
            <div>
              <div className="mb-5">
                <AnimatedText
                  text="We are Team 500-AA-2-Plasma, a group of passionate Software Engineering students at the University of Calgary, dedicated to building innovative software solutions. Our current project focuses on developing a Centralized File Conversion API, a cloud-based tool that seamlessly converts DXF files to OBJ format."
                  delay={15}
                />
              </div>
              <div className="mb-5">
                <AnimatedText
                  text="This project is sponsored by Seequent, a global leader in geoscience software solutions, and is guided by Dr. Usman Alim and Dr. Hamid Zareipour. Our goal is to streamline 3D modeling workflows by providing a scalable, efficient, and secure conversion service, eliminating the need for manual and error-prone data translation methods."
                  delay={43}
                />
              </div>
            </div>
          </div>

          <div className="mb-10">
            <div className="mb-5">
              <AnimatedText text="THE TEAM" className="text-2xl" delay={66} />
            </div>

            <div>
              <div className="flex justify-between w-full mb-6">
                <div className="w-1/2 pr-2">
                  <AnimatedText
                    text="AHMAD ELSHILTAWI"
                    className="text-lg"
                    delay={92}
                  />
                  <AnimatedText
                    text="Software engineering student and project manager for this project. Technical interests include graphics, network, and low-level programming. Programming languages of interest include C/C++, and C#."
                    className="text-sm"
                    delay={92}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <AnimatedText
                    text="BILAL PASHA"
                    className="text-lg"
                    delay={92}
                  />
                  <AnimatedText
                    text="Software engineering student with an interest in computer graphics, computer security, networks and assembly low-level programming. Programming languages of interest include Python, C/C++, and JavaScript."
                    className="text-sm"
                    delay={92}
                  />
                </div>
              </div>

              <div className="flex justify-between w-full mb-6">
                <div className="w-1/2 pr-2">
                  <AnimatedText
                    text="YOUSEF HAMMAD"
                    className="text-lg"
                    delay={100}
                  />
                  <AnimatedText
                    text="Software engineering student with an interest in full stack development, optimizing processes through automation, and project management. Programming languages of interest include Python, JavaScript, and Java."
                    className="text-sm"
                    delay={100}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <AnimatedText
                    text="AHMAD JANJUA"
                    className="text-lg"
                    delay={100}
                  />
                  <AnimatedText
                    text="Software engineering student with an interest in graphics, automation, and applied mathematics in software with expertise in C/C++, Python and Java."
                    className="text-sm"
                    delay={100}
                  />
                </div>
              </div>
            </div>

            <div className="mb-10 mt-10">
              <div className="mb-5">
                <AnimatedText
                  text="FREQUENTLY ASKED QUESTIONS"
                  className="text-2xl"
                  delay={108}
                />
              </div>

              <FAQSection
                question="1. What is the main purpose of the DXF to OBJ file conversion API?"
                answer="The primary goal of this project is to develop a cloud-based file conversion service that efficiently transforms DXF (CAD files) into OBJ (3D modeling files). This solution helps automate and streamline the workflow for engineers and geoscientists by eliminating the need for manual conversion methods and enhancing collaboration through an accessible web-based platform."
                delay={183}
              />

              <FAQSection
                question="2. How does the system ensure scalability and efficiency in file conversion?"
                answer="The project leverages AWS cloud services, including AWS Lambda, S3, and SQS, to handle file processing efficiently. Using serverless computing, the system dynamically scales based on user demand, ensuring low latency and cost-effectiveness. Additionally, the Scrum Agile methodology is used to continuously refine and improve the system’s performance and scalability."
                delay={203}
              />

              <FAQSection
                question="3. What features does the web platform offer to users?"
                answer="The web platform is designed to be user-friendly and efficient, offering a seamless experience for file conversion and visualization. Users can upload DXF files, which are then processed through an AWS-powered backend and converted into OBJ format. The platform includes a built-in 3D visualizer, utilizing Three.js, allowing users to preview their converted files directly within the browser. Additionally, users have the option to download the converted OBJ files for further use in their projects. To ensure reliability and efficiency, the system also generates performance and data integrity reports, helping users assess the accuracy and quality of their file conversions."
                delay={223}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

