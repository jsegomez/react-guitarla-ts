import Header from "./components/Header"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"

import useCart from "./hooks/UseCart";

function App() {  
  const { cart, guitars, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, cartTotal } = useCart();  

  return (
    <>
      <Header
        cart={ cart }         
        removeFromCart={ removeFromCart }
        increaseQuantity={ increaseQuantity }
        decreaseQuantity={ decreaseQuantity }
        clearCart={ clearCart }
        cartTotal={ cartTotal }
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            guitars.map((guitar) => (
              <Guitar
                key={guitar.id}
                addToCart={addToCart}                
                guitar={guitar}                                
              />
            ))
          }
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
