import Logo from './Logo';

function Footer() {
  const curYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-300 px-32">
      <div className="m-auto grid max-w-6xl grid-cols-[1.5fr_1.5fr_1fr_1fr] gap-x-16 gap-y-24 py-8">
        <div className="flex flex-col">
          <Logo />

          <ul className="mt-1 flex gap-6">
            <li>
              <a className="footer-link" href="#">
                <ion-icon class="social-icon" name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <ion-icon class="social-icon" name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <ion-icon class="social-icon" name="logo-twitter"></ion-icon>
              </a>
            </li>
          </ul>

          <p className="mt-auto text-sm text-gray-500">
            Copyright &copy; {curYear} by PTruyen, Inc. All rights reserved.
          </p>
        </div>

        <div>
          <p className="footer-heading">Contact us</p>
          <address className="not-italic">
            <p className="mb-6">Linh Trung, Thu Duc, Ho Chi Minh City</p>
            <p>
              <a className="footer-link" href="tel:0123-456-789">
                0123-456-789
              </a>
              <br />
              <a className="footer-link" href="mailto:hello@ptruyen.com">
                hello@ptruyen.com
              </a>
            </p>
          </address>
        </div>

        <nav>
          <p className="footer-heading">Company</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="#">
                About PTruyen
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                For Business
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Careers
              </a>
            </li>
          </ul>
        </nav>

        <nav>
          <p className="footer-heading">Resources</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="#">
                Help center
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Privacy & terms
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
