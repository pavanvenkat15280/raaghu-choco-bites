const ordersDiv =
document.querySelector("#orders");


let orders =
JSON.parse(localStorage.getItem("orders")) || [];



function showOrders(){


ordersDiv.innerHTML="";



if(orders.length===0){

ordersDiv.innerHTML=
"<p>No orders yet.</p>";

return;

}



orders.forEach((order,index)=>{


let box=document.createElement("div");


box.className="product-card";


box.innerHTML=`

<h3>
Order #${index+1}
</h3>


<p>
Name:
${order.name}
</p>


<p>
Phone:
${order.phone}
</p>


<p>
Address:
${order.address}
</p>


<p>
Items:
<br>
${order.items}
</p>


<h3>
Total ₹${order.total}
</h3>


`;



ordersDiv.appendChild(box);


});


}



showOrders();



document.querySelector("#clear-orders")
.onclick=()=>{


localStorage.removeItem("orders");


orders=[];


showOrders();


};