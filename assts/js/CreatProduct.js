const AddForm = document.querySelector(".AddProduct-form");
const inputs = Array.from(document.querySelectorAll(".form-control"));
const categSelect = document.querySelector("select.form-select");
const AddBtn = document.querySelector(".submit");

AddBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const IDvalid = await ValidId();
    if (!IDvalid) return;
    const product = {
        id: inputs[0].value,
        title: inputs[1].value,
        description: inputs[2].value,
        price: inputs[3].value,
        category: categSelect.value,
    };

    const response = await axios.post(
        "https://dummyjson.com/products/add",
        product
    );

    console.log(" added  done  ");
    Swal.fire({
        title: "Add successfuly !",
        icon: "success",
        draggable: true
    });


    console.log(product);

});

const GetCateguryList = async () => {
    const response = await axios.get(
        "https://dummyjson.com/products/category-list"
    );

    if (response.status === 200) {
        return response;
    }
};
const DisplayCategory = async () => {
    const response = await GetCateguryList();

    let result = ``;
    const categoryList = response.data;
    console.log(categoryList);

    result = categoryList
        .map((category) => {
            return `
      <option value="${category}"> ${category}</option>
    `;
        }).join("");
    document.querySelector(".categoryList .form-select").innerHTML = result;
};

DisplayCategory();



const ValidId = async () => {
    //  inpute  id  
    const response = await axios.get("https://dummyjson.com/products");
    const products = response.data.products;
    console.log(products);


    const IsIdExist = products.some(product => product.id === Number(inputs[0].value));


    if (IsIdExist ) {
        console.log(" ID already exists");
        alert("This ID already exists, please use another one.");
        return false;
    } else {
        console.log("ID is unique");
        return true;
    }


};


