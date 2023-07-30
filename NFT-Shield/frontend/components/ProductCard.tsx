
type Item = {
    id: number
    name: string
    description : string
    image: string
    price: number
  }

export function ProductCard ({name, description, image}: Item) {

    return (

  <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={image} alt="Sunset in the mountains"/>
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-gray-700 text-base">
      {description}
      </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Add to Cart</button>
  </div>
</div>

    )



}