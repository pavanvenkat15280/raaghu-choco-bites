// ---------------------------
// Dark Mode
// ---------------------------

const themeToggle = document.querySelector("#theme-toggle");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️ Light Mode";
}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        localStorage.setItem("theme","dark");
        themeToggle.textContent="☀️ Light Mode";

    }else{

        localStorage.setItem("theme","light");
        themeToggle.textContent="🌙 Dark Mode";

    }

});


// ---------------------------
// Cart System
// ---------------------------


const buttons = document.querySelectorAll(".add-to-cart");

const cartCount = document.querySelector("#cart-count");

const cartItems = document.querySelector("#cart-items");

const cartTotal = document.querySelector("#cart-total");


let cart = JSON.parse(localStorage.getItem("cart")) || [];


renderCart();



buttons.forEach(button=>{


button.addEventListener("click",()=>{


let name = button.dataset.name;

let price = Number(button.dataset.price);



let item = cart.find(product=>product.name===name);



if(item){

    item.quantity++;

}else{


cart.push({

name:name,

price:price,

quantity:1

});


}


saveCart();

renderCart();


});


});



function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

}



function renderCart(){


cartItems.innerHTML="";


let total=0;

let count=0;



cart.forEach((item,index)=>{


total += item.price * item.quantity;

count += item.quantity;



let li=document.createElement("li");



li.innerHTML=`

<strong>${item.name}</strong>

<br>

₹${item.price} × ${item.quantity}

<br>


<button class="minus">−</button>

<button class="plus">+</button>

<button class="remove">Remove</button>


`;




li.querySelector(".plus").onclick=()=>{


item.quantity++;

saveCart();

renderCart();


};



li.querySelector(".minus").onclick=()=>{


item.quantity--;


if(item.quantity<=0){

cart.splice(index,1);

}


saveCart();

renderCart();


};



li.querySelector(".remove").onclick=()=>{


cart.splice(index,1);

saveCart();

renderCart();


};



cartItems.appendChild(li);



});



cartCount.textContent=count;

cartTotal.textContent=total;


}


// ---------------------------
// WhatsApp Checkout
// ---------------------------


const checkoutBtn=document.querySelector("#checkout-btn");



checkoutBtn.addEventListener("click",()=>{


if(cart.length===0){

alert("Your cart is empty!");

return;

}



let name=document.querySelector("#customer-name").value;

let phone=document.querySelector("#customer-phone").value;

let address=document.querySelector("#customer-address").value;



if(name==="" || phone==="" || address===""){


alert("Please fill delivery details");

return;


}



let message=

`🍫 Raaghu's Choco Bites Order

Customer Name:
${name}

Phone:
${phone}

Address:
${address}


Order Details:

`;



let total=0;



cart.forEach(item=>{


message +=

`${item.name}
Quantity: ${item.quantity}
Price: ₹${item.price * item.quantity}


`;


total += item.price * item.quantity;


});



message +=

`Total Amount: ₹${total}`;



let whatsappURL =

"https://wa.me/917892156866?text="

+

encodeURIComponent(message);


// Save order for admin


let orderData={

name:name,

phone:phone,

address:address,

items:cart.map(item=>

`${item.name} x ${item.quantity}`

).join(", "),


total:total


};



let savedOrders =

JSON.parse(localStorage.getItem("orders")) || [];



savedOrders.push(orderData);



localStorage.setItem(

"orders",

JSON.stringify(savedOrders)

);
window.open(
whatsappURL,
"_blank"
);
alert("🎉 Order prepared! WhatsApp is opening.");



});
// =====================
// Loading Screen
// =====================


window.addEventListener("load",()=>{


const loader=document.querySelector("#loader");


setTimeout(()=>{

loader.style.opacity="0";


setTimeout(()=>{

loader.style.display="none";


},500);


},800);



});




// =====================
// Image Lightbox
// =====================


const productImages=document.querySelectorAll(".product-image");

const lightbox=document.querySelector("#lightbox");

const lightboxImg=document.querySelector("#lightbox-img");



productImages.forEach(img=>{


img.addEventListener("click",()=>{


lightbox.style.display="flex";


lightboxImg.src=img.src;


});


});



lightbox.addEventListener("click",()=>{


lightbox.style.display="none";


});
