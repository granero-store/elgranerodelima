'use strict';

function Product(ProductID, ProductName, StandardCost, ListPrice, Size, SizeUnitMeasureCode, Weight, WeightUnitMeasureCode, name) {
    this.ProductID = ProductID,
    this.ProductName = ProductName,
    this.StandardCost = StandardCost,
    this.ListPrice = ListPrice,
    this.Size = Size,
    this.SizeUnitMeasureCode = SizeUnitMeasureCode,
    this.WeightUnitMeasureCode = WeightUnitMeasureCode,
    this.Weight = Weight,    
    this.name = name,//nombre archivo jpg
    this.path = "./img/",
    this.extension = ".jpg"
}

//retorna ruta de imagen
Product.prototype.showImage = function (){
    //console.log(this.path + this.name + this.extension);
    //return this.path + this.name + this.extension;       
    return this.path + this.name + this.extension;       
}

function ShoppingCart(ProductID, StandardCost, ListPrice, Size, SizeUnitMeasureCode, WeightUnitMeasureCode, Weight) {
    this.ShoppingCartItemID = ShoppingCartItemID;
    this.ShoppingCartId = ShoppingCartId;
    this.Quantity = Quantity;
    this.ProductID = ProductID;    
    this.SizeUnitMeasureCode = SizeUnitMeasureCode;
    this.WeightUnitMeasureCode = WeightUnitMeasureCode;
    this.Weight = Weight;
}

//let cont = 0;
const mainProduct = [];
const cartProduct = [];

//Lista de productos disponibles
const PerroNegro = new Product(Math.floor(Math.random() * 100), "Charsago blanco Moscatel de Alejandría", 23.5, 35, 360, "ml", 0.75, "kg","charsago");
mainProduct.push(PerroNegro);
const Yupai = new Product(Math.floor(Math.random() * 100), "Perro Negro cabernet suvignon", 30.5, 49.00, 1, "u", 1, "kg","perro-negro");
mainProduct.push(Yupai);

function runAplication() {    
    listAvaiableProducts();       
}

function listAvaiableProducts(){
    //Obtiene imagenes a listar    
    const section = document.getElementById("section");
    const img = document.createElement("img");
    section.appendChild(img);
    img.src = PerroNegro.showImage();
    img.alt = "Random";   
    const select = document.getElementById("selected-product");//desplegable
    for(let i = 0; i < mainProduct.length; i++){        
        const option = document.createElement("option");        
        option.textContent = mainProduct[i].ProductName;        
        select.appendChild(option);
    }
}

runAplication();

function handleForm(e){

    e.preventDefault();    

    cartProduct.push(e.target.selected_product.value);
    const orderDetail = [e.target.selected_product.value, e.target.item_quantity.value]

    // if(cont === 1){
        const section = document.getElementById("output");
    
        const table = document.createElement("table");        
        
        section.appendChild(table);

        const thead = document.createElement("thead");
        table.appendChild(thead);
        let tr = renderTr(); 
        thead.appendChild(tr); 

        for(let i = 0; i < 2; i++){
            let th = renderTh(i);
            tr.appendChild(th);
        }

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
    // };    

    tr = renderTr();
    tr.id = "next-row";
    
    for(let j = 0; j < orderDetail.length; j++){                
        
        let th = renderTh(orderDetail[j]);
        tbody.appendChild(tr);
        tr.appendChild(th);          

    }        

    // if(cartProduct.length = 0){
        // const tfoot = document.createElement("tfoot");
        // table.appendChild(tfoot);
        // tr = renderTr();
        // tfoot.appendChild(tr)    
        // let th = document.createElement("th");
        // th = renderTh("--");
        // tr.appendChild(th); 
    // };    
    
}

const newItem = document.getElementById("adding-item");
newItem.addEventListener("submit", handleForm);

// const btnSend = document.getElementById("btn-sender");
// btnSend.addEventListener("click", function () {
//     //e.preventDefault();
//     // handleForm(e);    
//     const tr = document.getElementById("next-row");
//     console.log("David");    
//     for(let j = 0; j < orderDetail.length; j++){                
        
//         let th = renderTh(orderDetail[j]);
//         tbody.appendChild(tr);
//         tr.appendChild(th);          

//     }   
// });



function renderTr(){
    const tr = document.createElement("tr");
    return tr;
}

function renderTh(text){
    const th = document.createElement("th");
    th.textContent = text;
    return th;
}