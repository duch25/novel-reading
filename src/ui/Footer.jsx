import Logo from './Logo';

function Footer() {
  const curYear = new Date().getFullYear();

  return (
    <footer className="flex items-center space-x-10 border-t border-stone-200 px-4 py-10">
      <Logo />
      <p>
        Copyright &copy; {curYear} by <span className="uppercase">Ptruyen</span>
        , Inc. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
