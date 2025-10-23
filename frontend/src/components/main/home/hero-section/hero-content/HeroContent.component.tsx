import SearchForm from "./search-form/SearchForm.component";

export default function HeroContent() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 gap-12">
      <div className="w-full flex flex-col gap-4 items-center text-center text-white">
        <h1 className="text-8xl font-heading font-medium capitalize">
          Find Your Perfect Stay
        </h1>
        <p className="text-3xl capitalize">
          Discover amazing hotels worldwide at the best prices
        </p>
      </div>

      <SearchForm />
    </div>
  );
}
