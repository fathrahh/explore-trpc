interface Product {
    id: string;
    name: string;
    price: number;
}

// type constraint
// Multiple generic

function getValue<T extends object,K extends keyof T>(params: T[], key:K){
   const mapping = params.map(items => items[key])
   
   return {
    raw: params,
    mapping
   } 
}

const orderCart: Product[] = [
    {id:"1",name: "kecap",price: 140_000},
    {id:"2",name: "sayuran",price: 140_000},
    {id:"3",name: "sayurrr",price: 140_000}
]

const value1 = getValue(orderCart,"price")

console.log(value1)
