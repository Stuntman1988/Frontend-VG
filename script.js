function addItemToCart(inId) {
    let temp = JSON.parse(localStorage.getItem('prodCart')) || [];
    let exists = false;
    let index = 0;
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == inId) {
            exists = true;
            index = i;
        }
    }

    if (exists) {
        changeQuantityP(inId);
    } else {
        fetch(`https://fakestoreapi.com/products/${inId}`)
            .then(res => {
                return res.json();
            })
            .then(product => {
                const imageUrl = product.image;
                product = {
                    id: product.id,
                    img: imageUrl,
                    title: product.title,
                    price: product.price,
                    qt: 1,
                    totPrice: product.price
                };
                temp.push(product);
                localStorage.setItem('prodCart', JSON.stringify(temp));
            })
    }
}

function removeItemFromCart(inId) {
    let temp = JSON.parse(localStorage.getItem('prodCart'));
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == inId) {
            temp.splice(i, 1);
            localStorage.setItem('prodCart', JSON.stringify(temp));
        }
    }
    updateCart();
}

function updateCart() {
    let temp = JSON.parse(localStorage.getItem('prodCart')) || [];
    let inText = ""
    console.log(temp)
    if (temp.length == 0) {
        document.getElementById('cart-item').innerHTML = inText;
        document.querySelector('#purchasebtn').disabled = true;
    } else {
        for (let i = 0; i < temp.length; i++) {
            inText += `
        <div class="row align-items-center">
        <div class="col-2"><img src="${temp[i].img}" alt="pic" id="pictureCart"></div>
        <div class="col-1"></div>
        <div class="col-3">${temp[i].title}</div>
        <div class="col-1">$${temp[i].price}<br>$${temp[i].totPrice}</div>
        <div class="col-1"></div>
        <div class="col-3">${temp[i].qt}<button type="button" onclick="changeQuantityP(${temp[i].id})" id="chgBtn">+</button>
        <button type="button" onclick="changeQuantityM(${temp[i].id})" id="chgBtn">-</button></div>
        <div class="col-1"><button class="btn btn-danger" type="button" onclick="removeItemFromCart(${temp[i].id})">REMOVE</button></div>
        </div><hr>`;

            document.getElementById('cart-item').innerHTML = inText;
        }
    }
    updateTotalPrice()
}

function changeQuantityP(inId) {
    let temp = JSON.parse(localStorage.getItem('prodCart')) || [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == inId) {
            let quantity = temp[i].qt + 1;
            temp[i].qt = quantity;
            temp[i].totPrice = temp[i].qt * temp[i].price;
            localStorage.setItem('prodCart', JSON.stringify(temp));
        }
    }
    updateCart();
}

function changeQuantityM(inId) {
    let temp = JSON.parse(localStorage.getItem('prodCart')) || [];
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].id == inId && temp[i].qt != 1) {
            let quantity = temp[i].qt - 1;
            temp[i].qt = quantity;
            temp[i].totPrice = temp[i].qt * temp[i].price;
            localStorage.setItem('prodCart', JSON.stringify(temp));
        }
    }
    updateCart();
}

function updateTotalPrice() {
    let temp = JSON.parse(localStorage.getItem('prodCart')) || [];
    let total = 0;
    for (let i = 0; i < temp.length; i++) {
        total += temp[i].price * temp[i].qt;
    }
    localStorage.setItem('totPrice', JSON.stringify(total));
    document.getElementById('totPrice').innerHTML = '$' + total.toFixed(2);
}

function removeAll() {
    localStorage.clear();
    updateCart();
}



fetch('https://fakestoreapi.com/products')
    .then(res => {
        return res.json();
    })
    .then(data => {

        data.forEach(product => {
            let description = product.description;
            let title = product.title;
            const markup = `
        <div class="col h-100"   
            <div class="product">
                <div class="product-content">
                    <img src="${product.image}" alt="" class="product-img">
                    <h5 class="product-title">${title.length > 20 ? title.substring(0, 20).concat('...') : title}</h5>
                    <p class="product-category">${product.category}</p>
                    <p class="product-description">${description.length > 20 ? description.substring(0, 20).concat('<a href class="more" data-productId=' + product.id + '  data-bs-toggle="modal" data-bs-target="#modal"> ..more</a>') : description}</p>
                    <div class="procuct-price-container">
                        <div class="row" id="pricecon">
                            <div class="col-md-6">
                                <h5 class="product-price">$${product.price}</h5>
                            </div>
                            <div class="col-md-6">
                                <button type="button" onclick="addItemToCart(${product.id})" data-productId=${product.id}  class="add-to-cart" 
                                >Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`


            const productCol = document.createElement('div');
            productCol.classList.add('col-md-3');
            productCol.innerHTML = markup;

            document.querySelector('#product-row').appendChild(productCol);

            const moreLink = productCol.querySelector('.more');
            moreLink.addEventListener('click', () => {
                fetch(`https://fakestoreapi.com/products/${product.id}`)
                    .then(res => {
                        return res.json();
                    })
                    .then(product => {
                        const modalBody = document.querySelector('.modal-body');
                        modalBody.innerHTML = `
                <div class="product-details">
                <img src="${product.image}" alt="" class="product-img">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <h5 class="product-price">$${product.price}</h5>
              </div>
                `
                        const productModal = new bootstrap.Modal(document.querySelector('modal'))
                        productModal.show();

                    })
                    .catch(error => {
                        console.error(error);
                    })

            })

        });

    })

updateCart();

function validate() {
    let name = document.getElementById('name').value;
    let street = document.getElementById('street').value;
    let zip = document.getElementById('zip').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    const zipPattern = /^\d{3}\s\d{2}$/;
    const phonePattern = /^\(?(\d{3})?\)?[-]?\s?(\d{7})$/;
    let valid = 0;


    if (name.length < 2 || name.length > 50) {
        document.getElementById('name-text').innerHTML = "Name too short or too long or blank";
    } else {
        document.getElementById('name-text').innerHTML = "";
        localStorage.setItem("name", name);
        valid++;
    }

    if (street.length <= 0 || street.length > 50) {
        document.getElementById('street-text').innerHTML = "Too many letters";
    } else {
        document.getElementById('street-text').innerHTML = "";
        localStorage.setItem("street", street);
        valid++;
    }

    if (!zipPattern.test(zip)) {
        document.getElementById('zip-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('zip-text').innerHTML = "";
        localStorage.setItem("zip", zip);
        valid++;
    }

    if (city.length <= 0 || city.length > 50) {
        document.getElementById('city-text').innerHTML = "Too many letters";
    } else {
        document.getElementById('city-text').innerHTML = "";
        localStorage.setItem("city", city);
        valid++;
    }

    if (!email.includes('@') || email.length > 50) {
        document.getElementById('email-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('email-text').innerHTML = "";
        localStorage.setItem("email", email);
        valid++;
    }

    if (phone <= 0 || !phonePattern.test(phone)) {
        document.getElementById('phone-text').innerHTML = "Incorrect format";
    } else {
        document.getElementById('phone-text').innerHTML = "";
        localStorage.setItem("phone", phone);
        valid++;
    }
    console.log(valid)
    if (valid == 6) {
        window.location.href = "confirmed.html";
    }
}