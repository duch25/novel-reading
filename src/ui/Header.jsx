import Logo from './Logo';
import MainNav from './MainNav';
import SearchNovels from './SearchNovels';

function Header() {
  return (
    <header className="flex items-center border-b border-stone-200 bg-sky-950 px-6 py-3 text-stone-200">
      <div className="mr-auto flex w-1/2 items-center justify-between">
        <Logo />
        <MainNav />
      </div>

      <SearchNovels />
    </header>
  );
}

export default Header;
