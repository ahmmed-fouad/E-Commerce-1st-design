import { useGetProductsQuery } from '@/store/services/productsApi'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: productsData, isLoading } = useGetProductsQuery()

  const category = searchParams.get('category')
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'default'

  const filteredProducts = productsData?.products.filter((product) => {
    const matchesCategory = category ? product.category === category : true
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'name-asc':
        return a.title.localeCompare(b.title)
      case 'name-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold">
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8"
              value={search}
              onChange={(e) => {
                setSearchParams((prev) => {
                  if (e.target.value) {
                    prev.set('search', e.target.value)
                  } else {
                    prev.delete('search')
                  }
                  return prev
                })
              }}
            />
          </div>
          <Select
            value={sort}
            onValueChange={(value) => {
              setSearchParams((prev) => {
                if (value === 'default') {
                  prev.delete('sort')
                } else {
                  prev.set('sort', value)
                }
                return prev
              })
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-[300px] animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : (
        <>
          {sortedProducts?.length === 0 ? (
            <div className="flex h-[400px] flex-col items-center justify-center space-y-4">
              <p className="text-lg text-muted-foreground">No products found</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchParams({})
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sortedProducts?.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border bg-background p-2 transition-colors hover:bg-accent"
                >
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${product.price}
                    </p>
                    <Button className="w-full">Add to Cart</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Products 