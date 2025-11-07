const GetProducts = async (page) => {
  let limit = 8;
  let skip = (page - 1) * limit;
  const response = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );
  if (response.status === 200) {
    return response;
  }
};

const displayProductsPagenation = async (page = 1) => {
  try {
    const response = await GetProducts(page);
    const products = response.data.products;
    const productsCount = response.data.total;
    const limit = response.data.limit;
    const numberOfPages = Math.ceil(productsCount / limit);

    console.log(`this  is the  response  of  get products `, response);

    let result = "";
    result = products
      .map((product) => {
        return `
      <div class=" col-lg-4  col-md-6  pb-3 "> 
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
      })
      .join("");

    document.querySelector(
      ".AllproductsDisply_Section   .prodect-col-item"
    ).innerHTML = result;

    renderPagenation(page, numberOfPages);
  } catch (error) {
    console.log(`this  is  error  of  pagention `, error);
  }
};

const renderPagenation = async (currentPage, numberOfPages) => {
  let pagintationLink = ``;

  if (currentPage > 1) {
    pagintationLink += `<li class="page-item">
            <button class="page-link" onclick="displayProductsPagenation(${
              currentPage - 1
            })">Previous</button>
        </li>`;
  } else {
    pagintationLink += `<li class="page-item">
            <button class="page-link" disabled>Previous</button>
        </li>`;
  }

  for (let i = 1; i <= numberOfPages; i++) {
    if (
      i === 1 ||
      i === numberOfPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pagintationLink += `<li class="page-item ${
        i === currentPage ? "active" : ""
      }">
                <button class="page-link" onclick="displayProductsPagenation(${i})">${i}</button>
            </li>`;
    } else if (i === 2 && currentPage > 3) {
      pagintationLink += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    } else if (i === numberOfPages - 1 && currentPage < numberOfPages - 2) {
      pagintationLink += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
    }
  }

  if (currentPage < numberOfPages) {
    pagintationLink += `<li class="page-item">
            <button class="page-link" onclick="displayProductsPagenation(${
              currentPage + 1
            })">Next</button>
        </li>`;
  } else {
    pagintationLink += `<li class="page-item">
            <button class="page-link" disabled>Next</button>
        </li>`;
  }

  document.querySelector(".pagination").innerHTML = pagintationLink;
};

displayProductsPagenation();

const GetProductByCategury = async () => {
  const response = await axios.get(`https://dummyjson.com/products/categories`);
  if (response.status === 200) {
    return response;
  }
};

const displayCategury = async () => {
  const response = await GetProductByCategury();
  const categurys = response.data;
  const categuryCount = response.data.length;

  console.log(`this  is  the  categury list responise`, response);
  console.log(`this  is  the  categury list `, categurys);
  console.log(`this  is  the  categury list count`, categuryCount);

  let result = ``;
  result = categurys
    .map((categury) => {
      return `
      <li class="list-group-item"><a href="./productByCateg.html?categuryName=${categury.name}">${categury.name}</a></li>
    `;
    })
    .join("");

  document.querySelector(".filterByCateguryList").innerHTML = result;
};

displayCategury();



import {displayProd,getProdBySort}from './ProductByCateg.js';

const AscendingBtn=document.querySelector(".Ascending");
const DescendingBtn=document.querySelector(".Descending");

AscendingBtn.addEventListener('click',()=> { displayProd(()=> getProdBySort("asc"))});
DescendingBtn.addEventListener('click',()=>{ displayProd(()=> getProdBySort("desc"))});

