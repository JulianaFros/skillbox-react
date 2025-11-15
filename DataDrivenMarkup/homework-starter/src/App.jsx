import {products} from './products.js';
import ProductCard from './ProductCard.jsx';
import './App.css';

function App() {
    return (
        <main className="page">
            <section className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </section>
        </main>
    )
}

export default App;