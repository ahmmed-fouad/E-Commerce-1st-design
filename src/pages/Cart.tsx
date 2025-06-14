import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Trash2 } from 'lucide-react'

const Cart = () => {
  // This is a placeholder for the cart state
  const cartItems = [
    {
      id: 1,
      title: 'iPhone 9',
      price: 549,
      quantity: 1,
      thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
    },
    {
      id: 2,
      title: 'iPhone X',
      price: 899,
      quantity: 2,
      thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
    },
  ]

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const shipping = 10
  const total = subtotal + shipping

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex h-[400px] flex-col items-center justify-center space-y-4">
          <p className="text-lg text-muted-foreground">Your cart is empty</p>
          <Button asChild>
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 rounded-lg border p-4"
                >
                  <div className="h-24 w-24 overflow-hidden rounded-lg">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="w-20"
                      onChange={() => {}}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 rounded-lg border p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart 