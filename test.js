let products = [
    {
        name: "Devashish",
        age: 21
    }, 
    {
        name: "Napolean",
        age: 30
    }
]


//output 
/* 
let productsU = [];
let productsU = [
    {
        name: "Devashish",
        age: 20
    }, 
    {
        name: "Napolean",
        age: 32
    }
] */

// productsU = [...products];
productsU = products.map((el) => {
    
    let element =  {
        ...el,
        age: 20
    }
    console.log(element);
    return element;
});

console.log(productsU);





