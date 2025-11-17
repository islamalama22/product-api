 export const GetProducts = async ( limit=10) => {
  console.log("hi");
  const response = await axios.get(`https://dummyjson.com/products?limit=${limit}`);
  console.log("the response of get all is", response.data.products);

  if (response.status === 200) {
    return response;
  }
}; 

export const displayProducts = async () => {
  try {
    const response = await GetProducts();
    if (!response) return;

    let result = "";
    const products = response.data.products;

    result = products
      .map((product) => {
        return `                   
         <div class=" col-lg-3 col-md-4 col-sm-6 pb-4"> 
                        <div class="card" >
                             <img src="${product.images[0]}" class="card-img-top" alt="..."> 
                            <div class="card-body" >
                                <h5 class="card-title fst-italic"> ${product.title}</h5>
                                <p class="card-text  " style="height: 180px;">${product.description}</p>
                                <a href="./productDetiles.html?productId=${product.id}"  class="btn btn-primary DetailsBtn"  >Details</a>
                            </div>
                        </div> 
         </div>

        `;
      })
      .join("");

    document.querySelector(".products_home .row").innerHTML =result;
    
  } catch (error) {
    console.log(error);
  }
};


displayProducts();

