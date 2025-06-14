import NaveBar from "./Navbar";
import { ChevronDown, Menu, Search, ShoppingCart, User } from "lucide-react";
import bannerBg from "../assets/banner.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  setSearchValue,
  setSelectedValue,
  setIfAdmin,
} from "@/store/features/userSlice";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const userOrAdmin = useSelector((state: RootState) => state.user.ifAdmin);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-[26rem] relative">
      <img
        src={bannerBg}
        alt="Banner Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-[1]"
      />

      <div className="max-w-[75%] m-auto relative z-10">
        <NaveBar />
        <p className="text-white text-3xl font-[700] text-center mt-3">
          Welcome to Our Store
        </p>

        {/* Desktop Header Controls */}
        <div className="hidden md:flex w-full justify-center items-center gap-5 mt-2">
          {/* Admin / User Toggle */}
          {userOrAdmin === "admin" ? (
            <button
              className="hover:bg-[#f26522] cursor-pointer text-white h-7 text-center
                px-5 w-[11rem] py-1 font-bold rounded bg-[#30302e] capitalize text-xs"
            >
              delet all
            </button>
          ) : (
            <Sheet>
              <SheetTrigger className="flex text-white gap-1 text-sm items-center cursor-pointer hover:text-gray-800">
                <ShoppingCart strokeWidth={2} size={25} />
                <p>Cart</p>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle>Your products</SheetTitle>
                </SheetHeader>
                <div>
                  <div className="flex justify-between">
                    <img src="" alt="" />
                    <div>
                      <div className="flex justify-between">
                        <p>product name (title)</p>
                        <p>product price (price)</p>
                      </div>
                      <div className="flex justify-between">
                        <p>amount</p>
                        <p>total</p>
                      </div>
                      <div className="flex justify-between">
                        <button>+</button>
                        <button>-</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button>conferm</button>
                    <button>delete</button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Dropdown Category */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex text-xs gap-1 px-2 items-center border cursor-pointer
             border-none h-7 rounded hover:bg-[#f26522] bg-[#30302e] text-white"
            >
              <p className="min-w-[5rem]">All Category</p>
              <ChevronDown className="w-4 pt-1" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white border-gray-400 rounded">
              {["all", "Beauty", "fragrances", "Furniture", "Groceries"].map(
                (cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => dispatch(setSelectedValue(cat))}
                    className="text-sm cursor-pointer hover:bg-red-50 duration-700"
                  >
                    {cat}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search Bar */}
          <div className="flex w-[20rem] items-center">
            <input
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
              type="text"
              placeholder="Search this blog"
              className="border-l border-y text-xs px-2 py-1.5 outline-none border-none bg-white w-full rounded-l"
            />
            <div className="bg-[#f26522] rounded-r w-7 h-7 justify-items-center font-bold">
              <Search strokeWidth={4} className="text-white w-3 h-full" />
            </div>
          </div>

          {/* Language Switch */}
          <Select>
            <SelectTrigger className="cursor-pointer w-[4rem] text-white bg-[#30302e] hover:bg-[#f26522] h-[30px] border-none">
              <SelectValue placeholder="Ar" />
            </SelectTrigger>

            <SelectContent
              align="center"
              className="bg-white min-w-[unset] w-[60px] !cursor-pointer"
            >
              <SelectItem className="h-[25px] cursor-pointer" value="light">
                Ar
              </SelectItem>
              <SelectItem className="h-[25px] cursor-pointer" value="dark">
                En
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Admin/User Buttons */}
          <button
            onClick={() => dispatch(setIfAdmin("user"))}
            className="flex text-white gap-1 text-sm items-center cursor-pointer hover:text-gray-800"
          >
            <User strokeWidth={3} size={14} />
            <p>User</p>
          </button>

          <button
            onClick={() => dispatch(setIfAdmin("admin"))}
            className="flex text-white gap-1 text-sm items-center cursor-pointer hover:text-gray-800"
          >
            <User strokeWidth={3} size={14} />
            <p>Admin</p>
          </button>
        </div>

        {/* Mobile Header Controls */}
        <div className="md:hidden flex justify-center mt-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2"
          >
            <Menu size={24} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#30302e] mt-2 p-4 rounded-lg">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <div className="flex w-full items-center">
                <input
                  onChange={(e) => dispatch(setSearchValue(e.target.value))}
                  type="text"
                  placeholder="Search this blog"
                  className="border-l border-y text-xs px-2 py-1.5 outline-none border-none bg-white w-full rounded-l"
                />
                <div className="bg-[#f26522] rounded-r w-7 h-7 justify-items-center font-bold">
                  <Search strokeWidth={4} className="text-white w-3 h-full" />
                </div>
              </div>

              {/* Mobile Category Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex text-xs gap-1 px-2 items-center border cursor-pointer
                 border-none h-7 rounded hover:bg-[#f26522] bg-[#30302e] text-white w-full justify-between"
                >
                  <p>All Category</p>
                  <ChevronDown className="w-4 pt-1" />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white border-gray-400 rounded w-full">
                  {["all", "Beauty", "fragrances", "Furniture", "Groceries"].map(
                    (cat) => (
                      <DropdownMenuItem
                        key={cat}
                        onClick={() => dispatch(setSelectedValue(cat))}
                        className="text-sm cursor-pointer hover:bg-red-50 duration-700"
                      >
                        {cat}
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Admin/User Toggle */}
              <div className="flex justify-between">
                <button
                  onClick={() => dispatch(setIfAdmin("user"))}
                  className="flex text-white gap-1 text-sm items-center cursor-pointer hover:text-gray-800"
                >
                  <User strokeWidth={3} size={14} />
                  <p>User</p>
                </button>

                <button
                  onClick={() => dispatch(setIfAdmin("admin"))}
                  className="flex text-white gap-1 text-sm items-center cursor-pointer hover:text-gray-800"
                >
                  <User strokeWidth={3} size={14} />
                  <p>Admin</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Carousel Section */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="mt-[50px] w-full md:w-[40rem] mx-auto"
        >
          <CarouselContent>
            <CarouselItem className="text-white text-center uppercase">
              <p className="font-[800] text-2xl md:text-4xl leading-19">Get Start</p>
              <p className="font-[800] text-2xl md:text-4xl">Your favriot shoping</p>
              <button
                className="hover:bg-[#f26522] cursor-pointer 
               mt-[55px] px-8 py-2 font-bold rounded bg-[#30302e] uppercase text-xs"
              >
                buy now
              </button>
            </CarouselItem>
            <CarouselItem className="text-white text-center uppercase">
              <p className="font-[800] text-2xl md:text-4xl leading-19">Get Start</p>
              <p className="font-[800] text-2xl md:text-4xl">Your favriot shoping</p>
              <button
                className="hover:bg-[#f26522] cursor-pointer 
              cursor-pointer mt-[55px] px-8 py-2 font-bold rounded bg-[#30302e] uppercase text-xs"
              >
                buy now
              </button>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="bg-[#eed595] border-none w-7 h-7" />
          <CarouselNext className="bg-[#eed595] border-none w-7 h-7" />
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
