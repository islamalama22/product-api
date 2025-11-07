const GetProductById=async()=>{
    const parameters=new URLSearchParams(window.location.search);
    const productID=parameters.get("productId");
     const response=await axios.get(`https://dummyjson.com/products/${productID}`);
     if(response.status===200){ console.log("done get  product  by  id")};
     return response;
    };

const displayProductDetials=async()=>{
    const response=await GetProductById();
    if(!response){console.log("no response  data  ");}

    const prodDetiles=response.data;
    console.log(prodDetiles);


    document.querySelector('.product-img').setAttribute("src",`${prodDetiles.images[0]}`);
    document.querySelector(".title").textContent=`${prodDetiles.title}`;
    document.querySelector(".description").textContent=`${prodDetiles.description}`;
    document.querySelector(".oldprice").textContent=`${prodDetiles.price}`;
    document.querySelector(".descountPrice").textContent=`${prodDetiles.price }*${prodDetiles.discountPercentage}`;
    document.querySelector(".brand").textContent=`${prodDetiles.brand}`;

    let result='';
    const reviews= prodDetiles.reviews;
   
    result=reviews.map((reviwe)=>{
     return `
              <div class="row py-4 ">
                <div class="reviwe-user-data  ">
                    <h3 class="reviewerName">${reviwe.reviewerName}</h3>
                    <h5 class="reviewerEmail"> ${reviwe.reviewerEmail}</h5>
                </div>

                <p class="comment">  ${reviwe.comment}</p>

            </div></div>
     `
    }).join("");

    document.querySelector(".reviews").innerHTML=result;





};
displayProductDetials();