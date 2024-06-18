// let products = [
//     {
//         name: "Devashish",
//         age: 21
//     },
//     {
//         name: "Napolean",
//         age: 30
//     }
// ]

// //output
// /*
// let productsU = [];
// let productsU = [
//     {
//         name: "Devashish",
//         age: 20
//     },
//     {
//         name: "Napolean",
//         age: 32
//     }
// ] */

// // productsU = [...products];
// productsU = products.map((el) => {

//     let element =  {
//         ...el,
//         age: 20
//     }
//     console.log(element);
//     return element;
// });

// console.log(productsU);

let product = {
  name: "Devashish",
  age: 21,
  addresses: [
    {
      country: "Nepal",
      continent: "Asia",
    },
    {
      capital: "Kathmandu",
      municipality: "Tarkeshwor",
    },
  ],
};

// let fruits = ['apple', 'banana', 'carrot', {name: "dragon fruit"}, [1, 2, 3, 4, 5]];

let employee = {
  name: "Napolean Hill",
  book: "Think and Rich grow",
  citizen: "America",
};

employee.age = 20;

console.log({ ...employee });
