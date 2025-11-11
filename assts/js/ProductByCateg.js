const GetProductByCategury = async () => {
  const attributs = new URLSearchParams(window.location.search);
  console.log("the  attribut  of  url of  categury page is  ", attributs);
  const categuryName = attributs.get('categuryName');
  console.log("the  attribut  of  url of  categury name is  ", categuryName);

  document.querySelector(".titleOfPage").textContent=`${categuryName}`;
  const responise =
    await axios.get(`https://dummyjson.com/products/category/${categuryName}
`);

      console.log("categury respons ",responise);
      if(responise.status===200){
        return responise;
      }

};



export const  displayProd=async(getFunction)=>{
    const response=await getFunction();
    
    console.log("disply fun= ",response.data.products);
    const products=response.data.products;
    const contOfProdcts=products.length;
    console.log("contOfProdcts is = ",contOfProdcts);

    if(contOfProdcts===0){
      document.querySelector(".userMassege").textContent=(" no  prodcutes  ,  it wll be  ")
    }else{


    let result=``;
    result=products.map((product)=>{
        return `
         <div class=" col-lg-3  col-md-4  pb-3 "> 
                        <div class="card" >
                             <img src="${product.thumbnail}" class="card-img-top w-100" alt="..."> 
                            <div class="card-body">
                                <h5 class="card-title">${product.title}</h5>
                                <p class="card-text ">${product.description}</p>
                                <a href="./productDetiles.html?productId=${product.id}" class="btn btn-primary">  more</a>
            </div>
         </div>
      </div>
    
        `;
    }).join("");

    document.querySelector(".AllproductsDisply_Section   .prodect-col-item").innerHTML=result;}
};

displayProd(GetProductByCategury);


export const getProdBySort=async(order)=>{

    const respons=await axios.get(`https://dummyjson.com/products?sortBy=title&order=${order}`);
    console.log(' sort  =' , respons);
    return respons;

};




const AscendingBtn=document.querySelector(".Ascending");
const DescendingBtn=document.querySelector(".Descending");

AscendingBtn.addEventListener('click',()=> { displayProd(()=> getProdBySort("asc"))});
DescendingBtn.addEventListener('click',()=>{ displayProd(()=> getProdBySort("desc"))});


