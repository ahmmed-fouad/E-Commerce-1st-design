import { useGetProductsQuery } from "@/store/services/productsApi";
import CatSections from "../components/CatSections";
import { useSelector } from "react-redux";
import { RootState } from "../store/services/productsApi";


const Home = () => {
  const searchInput = useSelector((state: RootState) =>
    state.user.searchValue.toLowerCase()
  );
  const selectedInput = useSelector((state: RootState) =>
    state.user.SelectedValue.toLowerCase()
  );

  const { data, isLoading, isError, error } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    const errorMessage = error && 'data' in error ? String(error.data) : 'An unknown error occurred';
    return <p>Oops! Unexpected error happened: {errorMessage}</p>;
  }

  if (data) {
    // Group products by category
    const categories = ["beauty", "fragrances", "furniture", "groceries"] as const;
    const sectionTitles: Record<typeof categories[number], string> = {
      beauty: "Beauty and care products",
      fragrances: "Perfumes and fragrant products",
      furniture: "Furniture and decoration products",
      groceries: "Groceries and household needs",
    };

    const filteredSections = categories
      .filter((cat) => selectedInput === "all" || selectedInput === cat)
      .map((cat) => {
        const categoryProducts = data.products
          .filter((prod) => prod.category.toLowerCase() === cat)
          .filter((prod) => prod.title.toLowerCase().includes(searchInput));
        return {
          id: cat,
          secTitle: sectionTitles[cat],
          products: categoryProducts,
        };
      });

    return (
      <div key={data.products.length}>
        {filteredSections.map((section) => (
          <CatSections
            key={`${section.id}-${section.products.length}`}
            category={section.products}
            secTitile={section.secTitle}
          />
        ))}
      </div>
    );
  }
  return null;
};

export default Home;
