import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "aos/dist/aos.css";
import {
  Container,
  Modal,
  Nav,
  NavDropdown,
  Navbar,
  Tooltip,
} from "react-bootstrap";
import { BiSearchAlt } from "react-icons/bi";
import { AiFillPhone, AiOutlineShoppingCart } from "react-icons/ai";
import Contactform from "./Common/Contactform";
const Header = () => {
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const router = useRouter();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const isSticky = scrollPosition > (5 * window.innerHeight) / 100;
      setIsNavbarSticky(isSticky);
    };

    // Add event listener only on larger screens
    if (window.innerWidth >= 992) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      // Remove event listener on unmount
      if (window.innerWidth >= 992) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`header bg-white d-flex p-0  border-b-2 py-2  ${
        isNavbarSticky ? "sticky-navbar" : ""
      }`}
      sticky="top"
    >
      <Container className="header-navigation">
        <div className="row items-center w-11/12 m-auto toggle-section p-0">
          <div className="w-3/12 company-logo">
            <Link href="/">
              <img src="/media/logo.jpg" alt="logo" width={190} height={280} />
            </Link>
          </div>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ width: "fit-content" }}
          />
          <Navbar.Collapse
            id="navbarScroll"
            className="align-items-center w-9/12 flex gap-12 p-0 "
          >
            <Nav className="me-auto my-1 my-lg-0 d-flex gap-3 rounded-[10px] max-h-[600px] w-fit   collapsebar justify-content-center items-center font-semibold">
              {/* <span className="new"></span> */}
              <Nav.Link
                className={`nav-link ${
                  router.pathname === "/" ? "active" : " "
                }`}
                href="/"
              >
                Home
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${
                  router.pathname === "/" ? "active" : " "
                }`}
                href="/about"
              >
                About
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${
                  router.pathname === "/" ? "active" : " "
                }`}
                href="/services"
              >
                Services
              </Nav.Link>
              <Nav.Link
              className={`nav-link ${router.pathname === "/" ? "active" : " "}`}
              href="/team"
            >
              Team
            </Nav.Link>
              <Nav.Link
                className={`nav-link ${
                  router.pathname === "/" ? "active" : " "
                }`}
                href="/blog"
              >
                Blog
              </Nav.Link>
              <Nav.Link
                className={`nav-link ${
                  router.pathname === "/" ? "active" : " "
                }`}
                href="/contact"
              >
                Contact
              </Nav.Link>
              <hr className="rotate-90 w-12 text-black" />
              {/* <Link
              className={`nav-link ${
                router.pathname === "/" ? "active" : " "
              } text-white bg-primary rounded-[10px] `}
              href="/"
            >
              Get A Quote
            </Link> */}
              <button
                className="text-white bg-blue-500 rounded-[10px] p-2 w-[8rem] getquote"
                onClick={handleShow}
              >
                Get A Quote
              </button>
              <Link href="/login"  className="text-white bg-blue-500 rounded-[10px] p-2 w-[8rem] text-center login">
                Login
              </Link>
              <Modal
                show={show}
                onHide={handleClose}
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Get A Quote</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-blue-100 rounded-b-2xl">
                  <Contactform />
                </Modal.Body>
              </Modal>
            </Nav>
            <div className="contact-number flex items-center gap-2 w-25">
              <span className="rounded-full border p-1">
                <AiFillPhone className="fs-2" color="powderblue" />
              </span>
              <div className="flex flex-column font-regular">
                <Link href="tel+:98123456784">+98123456784</Link>
                <small>Contact us</small>
              </div>
            </div>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
