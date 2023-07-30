// import { useState } from 'react'

// interface Item {
//   name: string
//   price: number
//   imageUrl: string
// }

// const Cart = () => {
//   const [items, setItems] = useState<Item[]>([])

//   const addItem = (item: Item) => setItems([...items, item])
//   const removeItem = (index: number) => setItems(items.filter((item, i) => i !== index))

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//       <table className="table-auto w-full">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">Product</th>
//             <th className="px-4 py-2">Price</th>
//             <th className="px-4 py-2"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index}>
//               <td className="px-4 py-2 flex items-center">
//                 <img src={item.imageUrl} className="w-12 h-12  mr-4" />
//                 {item.name}
//               </td>
//               <td className="px-4 py-2">${item.price}</td>
//               <td className="px-4 py-2">
//                 <button
//                   onClick={() => removeItem(index)}
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
//                 >
//                   Remove
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="my-4 flex justify-end">
//         <button
//           onClick={() => addItem({ name: 'New Item', price: 9.99, imageUrl: 'https://via.placeholder.com/150' })}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
//         >
//           Add Item
//         </button>
//       </div>
//       <div className="my-4 flex justify-end">
//         <span className="font-bold">Total: ${items.reduce((acc, item) => acc + item.price, 0)}</span>
//       </div>
//     </div>
//   )
// }

// export default Cart
















// import React, { useState } from 'react'

// interface Item {
//   title: string
//   imageUrl: string
//   price: number
// }

// const Cart: React.FC<{ items: Item[], onAddItem: (item: Item) => void }> = ({ items, onAddItem }) => {
//   const addItem = (title: string, imageUrl: string, price: number) => {
//     onAddItem({ title, imageUrl, price })
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//       const result = {items.map((item, index) => (
//         <div key={index} className="flex items-center mb-2">
//           <img src={item.imageUrl} className="w-12 h-12 mr-4" />
//           <div>
//             <div className="font-bold">{item.title}</div>
//             <div>${item.price}</div>
//           </div>
//         </div>
//       ))}
      
//       <div className="my-4 flex justify-end">
//         <span className="font-bold">Total: ${items.reduce((acc, item) => acc + item.price, 0)}</span>
//       </div>
//     </div>
//   )
// }

// export default Cart


import Image from 'next/image';
// Importing hooks from react-redux
import { useSelector, useDispatch } from 'react-redux';

const cart = () => {

   // Extracting cart state from redux store
   const cart = useSelector((state) => state.cart);

   // Reference to the dispatch function from redux store
   const dispatch = useDispatch();

   console.log(cart)

   return (
      <>
      <h1>hellooo</h1>
      <div>
         {cart.map((item) =>
         <div>
         <p>{item.name}</p>
         <p>{item.image}</p>
         <p>{item.description}</p>
         </div>)}
      </div>
      </>
   )
}

export default cart;