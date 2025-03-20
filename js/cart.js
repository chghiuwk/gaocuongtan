// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();

    // Hiển thị popup với tên sản phẩm
    const popup = document.getElementById('popup');
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    if (popup) {
        // Cập nhật nội dung popup với tên sản phẩm
        const productName = product.name; // Lấy tên sản phẩm
        popup.querySelector('p').textContent = `Đã thêm ${productName} vào giỏ hàng!`;
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }

    // Xử lý sự kiện cho nút OK
    const okButton = document.getElementById('okButton');
    if (okButton) {
        okButton.onclick = function() {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        };
    }

    // Xử lý sự kiện cho nút "Tiến tới giỏ hàng"
    const goToCartButton = document.getElementById('goToCartButton');
    if (goToCartButton) {
        goToCartButton.onclick = function() {
            window.location.href = "cart.html";
        };
    }

    // Đóng popup khi nhấn vào nút đóng hoặc overlay
    const closePopup = popup ? popup.querySelector('.close-popup') : null;
    if (closePopup) {
        closePopup.onclick = function() {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        };
    }

    if (overlay) {
        overlay.onclick = function() {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        };
    }
}

// Hàm cập nhật giỏ hàng
function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIcon = document.querySelector(".icon-header-noti");
    const cartItems = document.getElementById("cart-items");

    const cartIconM = document.querySelector(".wrap-header-mobile .icon-header-noti");
    const cartItemsM = document.getElementById("cart-items-m");

    // Cập nhật giá trị của data-notify
    if (cartIcon) {
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.setAttribute("data-notify", totalQuantity);
        cartIconM.setAttribute("data-notify", totalQuantity);
    }

    // Cập nhật danh sách sản phẩm trong giỏ hàng
    if (cartItems) {
        cartItems.innerHTML = "";
        cart.forEach(item => {
            const row = `
                <div class="flex-w flex-str m-b-25">
                    <div class="size-w-15 flex-w flex-t">
                        <a href="${item.link}" class="wrap-pic-w bo-all-1 bocl12 size-w-16 hov3 trans-04 m-r-10" style="flex: 1.5">
                            <img src="${item.image}" alt="${item.name}">
                        </a>
                        <div class=" size-w-17 flex-sb-m" style="align-self: center">
                            <div class="item-info" style="flex: 2">
                                <a href="${item.link}" class="added-item-name txt-s-108 cl3 hov-cl10 trans-04">
                                    ${item.name}
                                </a>
                            </div>
                            <div class="flex-m flex-c" style="flex: 3">
                                <button class="btn-minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="order-amount txt-s-109 m-rl-2 cl12">
                                    ${item.quantity}
                                </span>
                                <button class="btn-plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <div class="item-total-price txt-s-101 m-rl-2 cl9" style="flex: 3">
                                ${(parseFloat(item.price.replace(/[^0-9]/g, "")) * item.quantity).toLocaleString("vi-VN")}đ
                            </div>
                            <div class="size-w-14 flex-b" style="flex: 0.5">
                                <button class="lh-10" onclick="confirmRemove(${item.id})">
                                    <img src="images/icons/icon-close.png" alt="CLOSE">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartItems.innerHTML += row;
        });
    }
        
    if (cartItemsM) {
        cartItemsM.innerHTML = "";
        cart.forEach(item => {
            const row = `
                <div class="flex-w flex-str m-b-25">
                    <div class="size-w-15 flex-w flex-t">
                        <a href="${item.link}" class="wrap-pic-w bo-all-1 bocl12 size-w-16 hov3 trans-04 m-r-10" style="flex: 1.5">
                            <img src="${item.image}" alt="${item.name}">
                        </a>
                        <div class=" size-w-17 flex-sb-m" style="align-self: center">
                            <div class="item-info" style="flex: 2">
                                <a href="${item.link}" class="added-item-name txt-s-108 cl3 hov-cl10 trans-04">
                                    ${item.name}
                                </a>
                            </div>
                            <div class="flex-m flex-c" style="flex: 3">
                                <button class="btn-minus" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="order-amount txt-s-109 m-rl-2 cl12">
                                    ${item.quantity}
                                </span>
                                <button class="btn-plus" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <div class="item-total-price txt-s-101 m-rl-2 cl9" style="flex: 3">
                                ${(parseFloat(item.price.replace(/[^0-9]/g, "")) * item.quantity).toLocaleString("vi-VN")}đ
                            </div>
                            <div class="size-w-14 flex-b" style="flex: 0.5">
                                <button class="lh-10" onclick="confirmRemove(${item.id})">
                                    <img src="images/icons/icon-close.png" alt="CLOSE">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartItemsM.innerHTML += row;
        });
    }

    // Cập nhật tổng tiền
    const totalAmountElement = document.querySelector(".total-amount");
    if (totalAmountElement) {
        const totalAmount = cart.reduce((sum, item) => {
            // Chuyển đổi giá từ chuỗi sang số (giữ nguyên các số 0 ở cuối)
            const priceNumber = parseFloat(item.price.replace(/[^0-9]/g, "")); // Loại bỏ tất cả ký tự không phải số
            return sum + priceNumber * item.quantity;
        }, 0);

        // Hiển thị tổng tiền với định dạng tiền tệ (thêm dấu phân cách hàng nghìn)
        totalAmountElement.innerText = `${totalAmount.toLocaleString("vi-VN")}đ`;
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function confirmRemove(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?")) {
        removeFromCart(id);
    }
}

function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateQuantity(id, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let item = cart.find(item => item.id === id);

    if (item) {
        item.quantity = Math.max(1, item.quantity + change); // Đảm bảo số lượng không nhỏ hơn 1
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(); // Cập nhật lại giỏ hàng
    }
}

// Hàm hiển thị thông tin đơn hàng trên trang checkout
// Hàm hiển thị thông tin đơn hàng
function displayOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItems = document.getElementById("order-items");
    const orderTotal = document.getElementById("order-total");

    if (orderItems && orderTotal) {
        orderItems.innerHTML = ""; // Xóa nội dung cũ
        let totalAmount = 0;

        if (cart.length === 0) {
            orderItems.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
            orderTotal.innerText = "0đ";
            return;
        }

        cart.forEach(item => {
            const itemTotal = parseFloat(item.price.replace(/[^0-9]/g, "")) * item.quantity;
            totalAmount += itemTotal;

            const itemRow = `
                <div class="flex-w flex-sb-m txt-s-101 cl6 bo-b-1 bocl15 p-b-21 p-t-18">
                    <span>
                        ${item.name}
                        <img class="m-rl-3" src="images/icons/icon-multiply.png" alt="icon">
                        ${item.quantity}
                    </span>
                    <span>
                        ${itemTotal.toLocaleString("vi-VN")}đ
                    </span>
                </div>
            `;
            orderItems.innerHTML += itemRow;
        });

        // Hiển thị tổng tiền
        orderTotal.innerText = `${totalAmount.toLocaleString("vi-VN")}đ`;
    }
}

function submitOrder() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const note = document.getElementById("note").value;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const products = cart.map(item => `${item.name} x ${item.quantity}`).join(", ");
    const total = document.getElementById("order-total").innerText;

    const orderData = {
        name: name,
        phone: phone,
        email: email,
        address: address,
        products: products,
        total: total,
        note: note
    };

    fetch('https://script.google.com/macros/s/AKfycby9PpnICNOc_9F6F3whK9Wtf0ylx_mtIF_cw3I7pBgrVT8LdGCOUUGO658xPy5-tkSS4g/exec', {
        method: 'POST',
        body: JSON.stringify(orderData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(result => {
        alert(result); 
        localStorage.removeItem("cart"); 
        window.location.href = "thank-you.html";
    })
    .catch(error => {
        console.error('Lỗi:', error);
        alert("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");
    });
}


document.getElementById("submit-order").addEventListener("click", function (e) {
    e.preventDefault(); // Ngăn chặn form submit mặc định
    submitOrder();
});


window.onload = function() {
    displayOrderSummary();
};

function checkCartBeforeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.");
        return false;
    } else {
        window.location.href = "checkout.html";
        return true;
    }
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCart(); // Cập nhật lại giao diện giỏ hàng
}

// Thêm sự kiện cho nút đặt hàng
const orderButton = document.querySelector(".btn-order");
if (orderButton) {
    orderButton.onclick = function(event) {
        event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ <a>
        if (checkCartBeforeOrder()) {
            // Sau khi chuyển đến trang checkout, hiển thị thông tin đơn hàng
            displayOrderSummary();
        }
    };
}

// Xử lý sau khi đặt hàng thành công (ví dụ: khi người dùng nhấn nút "Xác nhận đặt hàng" trên trang checkout)
function confirmOrder() {
    if (confirm("Bạn có chắc chắn muốn đặt hàng?")) {
        clearCart(); // Xóa giỏ hàng
        alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
        window.location.href = "index.html"; // Chuyển về trang chủ hoặc trang cảm ơn
    }
}

// Gọi hàm hiển thị thông tin đơn hàng khi trang checkout được tải
if (window.location.pathname.includes("checkout.html")) {
    displayOrderSummary();
}

// Khởi tạo giỏ hàng khi trang được tải
updateCart();
