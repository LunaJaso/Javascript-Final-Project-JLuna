$(document).ready(function () {
    const orderDetails = JSON.parse(localStorage.getItem("orderConfirmation"));
    if (!orderDetails) {
        $("#order-details").html("<p>No order information found. Your cart might be empty.</p>");
        return;
    }

    let orderHTML = "<h2>Your Order Has Been Placed!</h2>";
    orderDetails.items.forEach((item) => {
        orderHTML += `
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <p>Price: $${item.price.toFixed(2)}</p>
            <p>Quantity Ordered: ${item.qty}</p>
        `;
    });

    orderHTML += `<p><strong>Total Price:</strong> $${orderDetails.total}</p>`;
    $("#order-details").html(orderHTML);

    localStorage.removeItem("orderConfirmation");
});
