const cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(" Cart Items:", cart);


const GetProductById = async (ID) => {
    let id = ID;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    console.log(" cal  the  cart id  :", response.data);
    return response.data;
};


const GetIdCart = async () => {
    const cartId = []; //  new  array  stoe  only  the  id 

    cart.forEach(async (item) => {
        cartId.push(item.id);
        const response = await GetProductById(item.id);
       diplayCart(cart);

    });

    console.log(cartId);

};
GetIdCart();


const diplayCart = async (CartItems) => {

  
    let result = ``;
    result = CartItems.map((CartItem) => {

        return `
         <tr>
      <td>${CartItem.title}</td>
      <td><img src=" ${CartItem.image}" width="150px"></td>
      <td>
        <div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary btn1 " id="btn1">+</button>
  <button type="button" class="btn btn-secondary btn2" id="btn2">1</button>
  <button type="button" class="btn btn-secondary btn3" id="btn3">-</button>
</div>
      </td>
     <td> ${CartItem.price}</td>
     <td>  <button class=" btn " onclick="deleteItemCart(${CartItem.id})"> delete</button>  </td>

    </tr>
        `;
    }).join("");

    document.querySelector(".myCart_section .tableBody").innerHTML = result;

};


function deleteItemCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updatedCart = cart.filter(item => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  diplayCart(updatedCart);
}
