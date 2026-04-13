export default function ProductCard({ image, title, description, altText }) {
  return (
    <article className="product-card">
      <img src={image} alt={altText} />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}