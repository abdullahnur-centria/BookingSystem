import ProductCard from './ProductCard';

export default function Products() {
  return (
    <section className="products">
      <h2>Our Rental Bikes</h2>
      <div className="product-grid">
        <ProductCard 
          image="/cycle-2.jpg" 
          altText="hybrid rental bike"
          title="Hybrid Cruiser" 
          description="Great for city rides and short commutes. Comfortable and easy to handle." 
        />
        <ProductCard 
          image="/cycle-3.jpg" 
          altText="Sleek white road bike for fast travel"
          title="Road Racer" 
          description="Lightweight frame with speed-focused design. Perfect for road warriors." 
        />
        <ProductCard 
          image="/cycle-4.jpg" 
          altText="Minimal yellow fixie bike"
          title="Urban Fixie" 
          description="Minimalist single-speed for the stylish city explorer." 
        />
      </div>
    </section>
  );
}