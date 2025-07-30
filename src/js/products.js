$(document).ready(function () {
    const products = [
        { id: 1, name: "Standard Bone", desc: "Delicious treat for your pet.", price: 10.99, qty: 100, image: "images/treat1.jpg" },
        { id: 2, name: "Healthy Bone", desc: "Treat made with the natural nutrients for your dog.", price: 7.99, qty: 50, image: "images/treat2.jpg" },
        { id: 3, name: "Cow Toy", desc: "Fluffy friend for your pet.", price: 15.49, qty: 100, image: "images/animal.jpg" },
        { id: 4, name: "Beach Ball", desc: "Interactive beach toy for your pet.", price: 10.99, qty: 100, image: "images/beachBall.jpg" },
        { id: 5, name: "Chicken", desc: "Durable chew toy for dogs.", price: 12.99, qty: 200, image: "images/chicken.jpg" },
        { id: 6, name: "Frisbee", desc: "Play fetch with your dog at long distances.", price: 15.49, qty: 200, image: "images/frisbee.jpg" },
        { id: 7, name: "Air Ball", desc: "Ball with holes in it for maximum airflow.", price: 10.99, qty: 500, image: "images/holeBall.jpg" },
        { id: 8, name: "Rope", desc: "Durable pull toy for your dog.", price: 14.99, qty: 200, image: "images/rope.jpg" },
        { id: 9, name: "Tire", desc: "Durable rubber tire for your dog to chew on.", price: 15.49, qty: 200, image: "images/tire.jpg" },
        { id: 10, name: "Water Ball", desc: "Ball that floats in water, designed for water play.", price: 10.99, qty: 100, image: "images/waterBall.jpg" },
    ];

    products.forEach(product => {
        const productHTML = `
            <div class="product">
                <a href="${product.image}" data-lightbox="product-images" data-title="${product.name} - $${product.price}">
                    <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 300px; object-fit: contain;" />
                </a>
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <p>Price: $${product.price.toFixed(2)}</p>
                <p>Quantity Available: ${product.qty}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart<div class="loader"></div></button>
            </div>
        `;
        $("#product-container").append(productHTML);
    });

    $(".add-to-cart").on("click", function () {
        const productId = $(this).data("id");
        const product = products.find(p => p.id === productId);

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingProduct = cart.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        const $button = $(this);
        const $loader = $button.find(".loader");

        $loader.css("display", "inline-block");
        $button.prop("disabled", true);

        setTimeout(() => {
            $loader.hide();
            $button.prop("disabled", false);
        }, 2000);
    });
});
