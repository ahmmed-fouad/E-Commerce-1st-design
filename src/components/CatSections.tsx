import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ProdCard from "./ProdCard";
import ProductForm from "./ProductForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/services/productsApi";
import { Product } from "../store/services/productsApi";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface CatSectionsProps {
  category: Product[];
  secTitile: string;
}

const CatSections = ({ category, secTitile }: CatSectionsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4300 }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const paginationRef = useRef<HTMLDivElement>(null);
  const userOrAdmin = useSelector((state: RootState) => state.user.ifAdmin);

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList());
      emblaApi.on("select", () =>
        setSelectedIndex(emblaApi.selectedScrollSnap())
      );
    }
  }, [emblaApi]);

  useEffect(() => {
    if (
      !paginationRef.current ||
      !paginationRef.current.children[selectedIndex]
    )
      return;
    const container = paginationRef.current;
    const activeChild = container.children[selectedIndex] as HTMLElement;
    const scrollPosition =
      activeChild.offsetLeft -
      container.offsetWidth / 2 +
      activeChild.offsetWidth / 2;
    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }, [selectedIndex]);

  return (
    <div className="max-w-[75%] m-auto">
      <h2 className="text-[#30302e] mt-8 font-bold text-3xl text-center">
        {secTitile}
      </h2>

      {userOrAdmin === "admin" && (
        <div className="flex justify-center gap-0 ml-3 mr-7 px-2 mt-4">
          <button
            className="hover:bg-[#f26522]
              cursor-pointer text-white px-8 py-2 font-bold rounded-l bg-[#30302e] capitalize text-xs "
          >
            delete {secTitile}
          </button>

          <Sheet>
            <SheetTrigger
              className="hover:bg-[#f26522] cursor-pointer text-white 
                  px-8 py-2 font-bold rounded-r bg-[#30302e] capitalize text-xs "
            >
              add product
            </SheetTrigger>
            <SheetContent className="!bg-[#30302e] border-none" side={"left"}>
              <SheetHeader className="">
                <SheetTitle className="text-white">
                  Add a new Product
                </SheetTitle>
              </SheetHeader>
              <ProductForm mode="add" />
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div className="overflow-hidden mt-6" ref={emblaRef}>
        <div className="flex">
          {category.map((item) => (
            <div key={item.id} className="min-w-[33.33%] px-2">
              <ProdCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button onClick={() => emblaApi?.scrollPrev()}>
              <PaginationPrevious />
            </button>
          </PaginationItem>

          <div
            ref={paginationRef}
            className="flex w-[7rem] h-8 overflow-hidden whitespace-nowrap space-x-1 items-center"
          >
            {scrollSnaps.map((_, index) => (
              <li
                key={index}
                className="shrink-0 w-6 h-6 flex items-center justify-center"
              >
                <button
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`${
                    selectedIndex === index ? "font-bold text-blue-600" : ""
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </div>

          <PaginationItem>
            <button onClick={() => emblaApi?.scrollNext()}>
              <PaginationNext />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CatSections;
