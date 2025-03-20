const products = [
    { id: 1, name: "Gạo Hương Cốm", price: "190.000đ/túi", image: "images/product-01.jpg", link: "gao-huong-com.html", filter: ["gao-huong-com", "gao-dac-biet", "noi-bat"] },
    { id: 2, name: "Gạo Cốm Sen", price: "190.000đ/túi", image: "images/product-02.jpg", link: "gao-com-sen.html", filter: ["gao-com-sen", "gao-dac-biet", "noi-bat"] },
    { id: 3, name: "Gạo Nhật", price: "190.000đ/túi", image: "images/product-03.jpg", link: "gao-nhat.html", filter: ["gao-nhat", "gao-dac-biet", "noi-bat"] },
    { id: 4, name: "Gạo Thiên Trường", price: "190.000đ/túi", image: "images/product-05.jpg", link: "gao-thien-truong.html", filter: ["gao-thien-truong", "gao-truyen-thong"] },
    { id: 5, name: "Gạo Lài Thơm", price: "190.000đ/túi", image: "images/product-05.jpg", link: "gao-lai-thom.html", filter: ["gao-lai-thom", "gao-truyen-thong"] },
    { id: 6, name: "Gạo Nếp", price: "190.000đ/túi", image: "images/product-06.jpg", link: "gao-nep.html", filter: ["gao-nep", "gao-truyen-thong"] },
    { id: 7, name: "Gạo Séng Cù", price: "190.000đ/túi", image: "images/product-06.jpg", link: "gao-seng-cu.html", filter: ["gao-seng-cu", "gao-truyen-thong"] },
    { id: 8, name: "Gạo Lứt", price: "190.000đ/túi", image: "images/product-06.jpg", link: "gao-lut.html", filter: ["gao-lut", "gao-dinh-duong"] },
    { id: 9, name: "Gạo Nàng Tấm ST25", price: "190.000đ/túi", image: "images/product-04.jpg", link: "gao-nang-tam-st25.html", filter: ["gao-nang-tam", "gao-dinh-duong", "noi-bat"] },
];

// Lấy container cho sản phẩm thường và sản phẩm nổi bật
const productContainer = document.querySelector(".isotope-grid");
const featuredProductsContainer = document.querySelector(".slick5");

// Hàm tạo HTML cho một sản phẩm
function createProductHTML(product) {
    return `
        <div class="col-sm-6 col-md-4 col-lg-3 p-b-50 isotope-item ${product.filter.join(" ")}">
            <div class="block1">
                <div class="block1-bg wrap-pic-w bo-all-1 bocl12 hov3 trans-04">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="block1-content flex-col-c-m p-b-46">
                        <a href="${product.link}" class="txt-m-103 cl3 txt-center hov-cl10 trans-04 js-name-b1">
                            ${product.name}
                        </a>
                        <span class="block1-content-more txt-m-104 cl9 p-t-21 trans-04">
                            ${product.price}
                        </span>
                        <div class="block1-wrap-icon flex-c-m flex-w trans-05">
                            <a href="${product.link}" class="block1-icon flex-c-m wrap-pic-max-w">
                                <img src="images/icons/icon-view.png" alt="Xem chi tiết">
                            </a>
                            <button onclick="addToCart(${product.id})" class="block1-icon flex-c-m wrap-pic-max-w js-addcart-b1">
                                <img src="images/icons/icon-cart.png" alt="Thêm vào giỏ hàng">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Hàm tạo HTML cho một sản phẩm nổi bật
function createFeaturedProductHTML(product) {
    return `
        <div class="item-slick5 p-all-15 ${product.filter.join(" ")}">
            <div class="block1">
                <div class="block1-bg wrap-pic-w bo-all-1 bocl12 hov3 trans-04">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="block1-content flex-col-c-m p-b-46">
                        <a href="${product.link}" class="txt-m-103 cl3 txt-center hov-cl10 trans-04 js-name-b1">
                            ${product.name}
                        </a>
                        <span class="block1-content-more txt-m-104 cl9 p-t-21 trans-04">
                            ${product.price}
                        </span>
                        <div class="block1-wrap-icon flex-c-m flex-w trans-05">
                            <a href="${product.link}" class="block1-icon flex-c-m wrap-pic-max-w">
                                <img src="images/icons/icon-view.png" alt="Xem chi tiết">
                            </a>
                            <button onclick="addToCart(${product.id})" class="block1-icon flex-c-m wrap-pic-max-w js-addcart-b1">
                                <img src="images/icons/icon-cart.png" alt="Thêm vào giỏ hàng">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Hiển thị tất cả sản phẩm ban đầu
products.forEach(product => {
    productContainer.innerHTML += createProductHTML(product);
});

// Lọc và hiển thị sản phẩm nổi bật
const featuredProducts = products.filter(product => product.filter.includes("noi-bat"));
featuredProductsContainer.innerHTML = featuredProducts.map(createFeaturedProductHTML).join(" ");

// Khởi tạo slick slider sau khi thêm sản phẩm
$(document).ready(function(){
    $('.wrap-slick5').each(function(){
        var wrapSlick = $(this);
        var slick = $(this).find('.slick5');


        var showDot = false;
        if($(wrapSlick).find('.wrap-dot-slick5').length > 0) {
            showDot = true;
        }

        var showArrow = false;
        if($(wrapSlick).find('.wrap-arrow-slick5').length > 0) {
            showArrow = true;
        }

        $(wrapSlick).find('.slick5').slick({
            pauseOnFocus: false,
            pauseOnHover: false,
            slidesToShow: 6,
            slidesToScroll: 6,
            fade: false,
            infinite: false,
            autoplay: false,
            autoplaySpeed: 6000,
            arrows: showArrow,
            appendArrows: $(wrapSlick).find('.wrap-arrow-slick5'),
            prevArrow: $(wrapSlick).find('.prev-slick5'),
            nextArrow: $(wrapSlick).find('.next-slick5'),
            dots: showDot,
            appendDots: $(wrapSlick).find('.wrap-dot-slick5'),
            dotsClass:'slick5-dots',
            customPaging: function(slick, index) {
                return '<div></div>';
            },
            responsive: [
                {
                  breakpoint: 1900,
                  settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                  }
                },
                {
                  breakpoint: 1680,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                  }
                },
                {
                  breakpoint: 1420,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                  }
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: 575,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]

        });

    });
});

// Lắng nghe sự kiện click trên các nút lọc
const filterButtons = document.querySelectorAll(".filter-tope-group button");
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Xóa class active của tất cả các nút
        filterButtons.forEach(btn => btn.classList.remove("how-active1"));
        // Thêm class active cho nút được nhấn
        button.classList.add("how-active1");

        // Lấy giá trị data-filter của nút được nhấn
        const filterValue = button.getAttribute("data-filter");

        // Lọc và hiển thị sản phẩm
        if (filterValue === "*") {
            // Hiển thị tất cả sản phẩm
            document.querySelectorAll(".isotope-item").forEach(item => {
                item.style.display = "block";
            });
        } else {
            // Ẩn tất cả sản phẩm
            document.querySelectorAll(".isotope-item").forEach(item => {
                item.style.display = "none";
            });
            // Hiển thị sản phẩm phù hợp với filter
            document.querySelectorAll(filterValue).forEach(item => {
                item.style.display = "block";
            });
        }
    });
});