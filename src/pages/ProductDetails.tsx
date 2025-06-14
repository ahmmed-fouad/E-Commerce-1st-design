import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '@/store/services/productsApi'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Star } from 'lucide-react'

const ProductDetails = () => {
  const { id } = useParams()
  const { data: product, isLoading } = useGetProductByIdQuery(Number(id))

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-lg bg-muted" />
        <div className="space-y-4">
          <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center space-y-4">
        <p className="text-lg text-muted-foreground">Product not found</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go back
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`${product.title} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="mt-2 flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating} rating)
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-2xl font-bold">${product.price}</p>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              {product.discountPercentage}% off
            </p>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Brand</p>
              <p className="font-medium">{product.brand}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stock</p>
              <p className="font-medium">{product.stock} units</p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <Button size="lg" className="flex-1">
            Add to Cart
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails 