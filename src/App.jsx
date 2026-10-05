import { MotionConfig } from 'framer-motion';
import Nav from './sections/Nav';
import Hero from './sections/Hero';
import Ribbon from './sections/Ribbon';
import Story from './sections/Story';
import Services from './sections/Services';
import Process from './sections/Process';
import Bower from './sections/Bower';
import Work from './sections/Work';
import Notes from './sections/Notes';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#story" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Ribbon />
        <Story />
        <Services />
        <Process />
        <Bower />
        <Work />
        <Notes />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
