import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Products from '../components/Products';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Features />
      <Products />
      <CTA />
    </main>
  );
}