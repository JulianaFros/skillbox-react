function ProductCard({ title, price, discount = 0, imageUrl }) {
    const hasDiscount = discount > 0;
    const discountAmount = price * discount;
    const finalPrice = hasDiscount ? price - discountAmount : price;
    const formatPrice = (value) => value.toLocaleString("ru-Ru", { style: "currency", currency: "RUB" });

    return (
        <article className="product-card">
            <img className="product-card__image" src={imageUrl} alt={title} />
            <div className="product-card__content">
                <div className="product-card__prices">
                    {hasDiscount ? (
                        <>
                            <span className="product-card__price product-card__price--new">
                                {formatPrice(finalPrice)}
                            </span>
                            <span className="product-card__price product-card__price--old">
                                {formatPrice(price)}
                            </span>
                        </>
                    ) : (
                        <span className="product-card__price">
                            {formatPrice(price)}
                        </span>
                    )}
                </div>
                <h3 className="product-card__title">{title}</h3>
            </div>
        </article>
    )
}

export default ProductCard;