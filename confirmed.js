
document.getElementById('confirmed-name').innerHTML = "<b>Name: </b>" + localStorage.getItem("name");
document.getElementById('confirmed-street').innerHTML = "<b>Street: </b>" + localStorage.getItem("street");
document.getElementById('confirmed-zip').innerHTML = "<b>Zip code: </b>" + localStorage.getItem("zip");
document.getElementById('confirmed-city').innerHTML = "<b>City: </b>" + localStorage.getItem("city");
document.getElementById('confirmed-email').innerHTML = "<b>E-mail: </b>" + localStorage.getItem("email");
document.getElementById('confirmed-phone').innerHTML = "<b>Phone: </b>" + localStorage.getItem("phone");
document.getElementById('totPrice').innerHTML = '$' + localStorage.getItem('totPrice');
updateCart();

function updateCart() {
    let temp = JSON.parse(localStorage.getItem('prodCart'));
    let inText = ""
    if (temp.length == 0) {
        document.getElementById('cart-item').innerHTML = inText;
    } else {
        for (let i = 0; i < temp.length; i++) {
            inText += `
            <div class="row">
            <div class="col-2"><img src="${temp[i].img}" alt="pic" id="pictureCart"></div>
            <div class="col-3">${temp[i].title}</div>
            <div class="col-1">${temp[i].price}</div>
            <div class="col-1"></div>
            <div class="col-1">${temp[i].qt}</div>
            <div class="col-1"></div>
            </div><hr>`;

            document.getElementById('cart-item').innerHTML = inText;
        }
    }
}

localStorage.clear();