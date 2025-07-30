$(document).ready(function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        

        if (cart.length === 0) {
            $("#cart-container").html("<p>Your cart is empty.</p>");
            $("#total-price").text("0.00");
            return;
        }

        let totalPrice = 0;
        cart.forEach((item, index) => {
            const itemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image" "/>
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <label for="qty-${item.id}">Quantity:</label>
                        <input type="number" id="qty-${item.id}" class="cart-item-qty" data-id="${item.id}" value="${item.qty}" min="1" />
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            $("#cart-container").append(itemHTML);
            totalPrice += item.price * item.qty;
        });

        $("#total-price").text(totalPrice.toFixed(2));
    }

    $(document).on("change", ".cart-item-qty", function () {
        const productId = $(this).data("id");
        const newQty = parseInt($(this).val());

        const item = cart.find(p => p.id === productId);
        if (item) {
            item.qty = newQty;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
            location.reload();
        }
    });

    $(document).on("click", ".remove-item", function () {
        const productId = $(this).data("id");

        const updatedCart = cart.filter(p => p.id !== productId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        renderCart();
        location.reload();
    });

    renderCart();

    $("#checkout").on("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            const orderDetails = {
                items: cart,
                total: $("#total-price").text(),
            };
            localStorage.setItem("orderConfirmation", JSON.stringify(orderDetails));
            localStorage.removeItem("cart");
            window.location.href = "orderConfirmation.html";
        }
    });
});
