function SearchNovels() {
  return (
    <>
      <input
        placeholder="Search novels..."
        className="w-64 rounded-full bg-sky-100 px-4 py-2 text-sm text-gray-900 transition-all duration-300 placeholder:text-stone-400 focus:w-72 focus:outline-none focus:ring focus:ring-sky-500 focus:ring-opacity-50"
      />
      <ion-icon class="search-icon" name="search-outline"></ion-icon>
    </>
  );
}

export default SearchNovels;
