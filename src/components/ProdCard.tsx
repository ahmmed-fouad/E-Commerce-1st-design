
import { useSelector } from "react-redux";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../store/services/productsApi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ProductForm from "./ProductForm";


const ProdCard = ({
  id,
  title,
  description,
  price,
  rating,
  stock,
  images,
  discountPercentage,
  category,
}) => {
  const userOrAdmin = useSelector((state) => state.user.ifAdmin);

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const { refetch } = useGetProductsQuery();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct({ id }).unwrap();
        console.log("Deleted!");
        refetch();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };
  return (
    <div className="border mt-7 shadow-xl text-center py-3 h-[25rem] flex flex-col justify-between">
      <div>
        <p className="text-[#2b2a29] font-bold">{title}</p>
        <span className="text-[#f26522] text-sm">Price </span>
        <span className="text-sm">$ {price}</span>
      </div>
      <img className=" self-center" src={images[0]} alt={title} />
      <div>
        {userOrAdmin === "admin" && (
          <div className="flex justify-between w-full px-3">
            <Sheet>
              <SheetTrigger
                className="font-bold text-sm text-xs uppercase text-[#f26522] 
              hover:text-[#2b2a29] cursor-pointer"
              >
                update
              </SheetTrigger>

              <SheetContent className="!bg-[#30302e] border-none" side={"left"}>
                <SheetHeader>
                  <SheetTitle className="text-white">
                    Update The Product
                  </SheetTitle>
                </SheetHeader>
                <ProductForm
                  mode="edit"
                  defaultValues={{
                    id,
                    title,
                    description,
                    price,
                    discountPercentage,
                    rating,
                    stock,
                    category,
                  }}
                />
              
              </SheetContent>
            </Sheet>

            <button
              onClick={() => handleDelete(id)}
              className="font-bold text-xs uppercase text-[#f26522] hover:text-[#2b2a29] cursor-pointer"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}

        {userOrAdmin === "user" && (
          <div className="flex justify-between px-3 w-full">
            <button className="font-bold text-xs uppercase text-[#f26522] hover:text-[#2b2a29] cursor-pointer">
              Buy Now
            </button>
            <AlertDialog>
              <AlertDialogTrigger className="font-bold text-xs text-[#2b2a29] hover:text-[#f26522] cursor-pointer">
                See More
              </AlertDialogTrigger>

              <AlertDialogContent className="flex gap-8">
                <img
                  className="w-[10rem] self-center"
                  src={images}
                  alt={title}
                />
                <div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {description}
                    </AlertDialogDescription>
                    <div className="flex  gap-10">
                      <AlertDialogDescription>
                        price : {price} $
                      </AlertDialogDescription>
                      <AlertDialogDescription>
                        Discount : {discountPercentage} %
                      </AlertDialogDescription>
                    </div>
                    <div className="flex  gap-8">
                      <AlertDialogDescription>
                        rating : {rating} ⭐
                      </AlertDialogDescription>
                      <AlertDialogDescription>
                        stock : {stock}
                      </AlertDialogDescription>
                    </div>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogAction className="cursor-pointer">
                      add to cart
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdCard;
