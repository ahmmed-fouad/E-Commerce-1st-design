import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetails from '@/pages/ProductDetails'
import Cart from '@/pages/Cart'
import Header from './components/Header'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header/>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App
