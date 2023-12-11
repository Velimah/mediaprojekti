import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from "../contexts/UserContext";
import { useNotification } from "../contexts/NotificationContext";
import ProtectedComponent from "./ProtectedComponent";

const Header = () => {

  const [activePage, setActivePage] = useState('Build');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [handleCloseAnim, setHandleCloseAnim] = useState<boolean>(false);
  const {user, setUser} = useUser();
  const navigate = useNavigate();
  const {setNotification} = useNotification();

  // TODO: add router/page switch
  const renderPage = () => {
    switch (activePage) {
      case "Build":
        return null;
      case "About":
        return;
      default:
        return;
    }
  };
  renderPage();

  // Checks screen width - if mobile width, change isMobile to true (show mobile nav)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

   // Close MobileMenu if active page changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activePage]);

  // render mobile menu
  const MobileMenu = () => {
    return (
      <div className={`w-full h-full absolute top-1/2 left-1/2 transform translate-x-[-50%] -translate-y-1/2 z-10`}>
        <div className={`absolute z-[1] w-full h-full bg-black rounded-lg shadow-lg top-0 ${handleCloseAnim ? 'animate-height-out h-0' : 'animate-height-in'}`}
        onAnimationEnd={() => {
          if(handleCloseAnim){
            setMobileMenuOpen(false);
            setHandleCloseAnim(false);
          }
      }}>
          <div className="text-white flex flex-col items-center justify-center h-full">
            <button onClick={()=>setHandleCloseAnim(!handleCloseAnim)} className="flex pb-20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
            <ul className={`list-none flex flex-col items-center text-xl	gap-5 text-white ${handleCloseAnim ? 'animate-fade-out opacity-0' : 'animate-fade-in'}`}>
              <NavigationItems/>
            </ul>
          </div>
        </div>       
      </div>
    );
  }

  const Logout = () => {
    setUser(null);
    setNotification("default", "Logged out");
    navigate("/");
  }
  // render navigation items
  const NavigationItems = () => {
    return (
            <>
            <li className="flex">
              <Link to="/">
                <button onClick={() => {setActivePage('Build'); setHandleCloseAnim(!handleCloseAnim);}} className={`flex items-center ${activePage === 'Build' ? 'active' : 'font-normal'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 md:w-6 md:h-6 pr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  BUILD
                </button>
              </Link>
            </li>
            <ProtectedComponent hasAuth={<>
            <li className="md:pl-4 ">
              <Link to="/account">
                <button onClick={() => {setActivePage('Account'); setHandleCloseAnim(!handleCloseAnim);}} className={'uppercase flex items-center ' + (activePage === 'Account' ? 'active' : 'font-normal')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-6 md:h-6 ">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                  {/* ACCOUNT */}
                  {user?.username}
                </button>
              </Link>              
            </li>
            <li className="md:pl-4">
              <button onClick={() => {Logout(); setHandleCloseAnim(!handleCloseAnim);}} className={'flex items-center  ' + (activePage === 'LogOut' ? 'active' : 'font-normal')}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-6 md:h-6 ">
                  <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
                LOG OUT
              </button>
            </li>
            </>} noAuth={
            <li className="md:pl-4 ">
              <Link to="/login">
                <button onClick={() => {setActivePage('Login'); setHandleCloseAnim(!handleCloseAnim);}} className={`flex items-center ${activePage === 'Login' ? 'active' : 'font-normal'}`}>
                LOGIN
                 </button>
              </Link>
            </li>
            }/>
            {/*
            <li className="md:pl-4">
              <button onClick={() => setActivePage('About')} className={`flex items-center ${activePage === 'About' ? 'active' : 'font-normal'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 md:w-6 md:h-6 ">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                ABOUT
              </button>
          </li>
          */}
            </>
    );
  }

    return (
      <nav id="navigation" className="font-bold bg-ai-black-100 md:m-5 p-4 h-12 w-max-screen md:rounded-md flex items-center justify-between shadow-lg">
        <Link to="/" onClick={() => setActivePage('Build')} className="text-ai-primary flex items-center text-2xl font-robot">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-1">
            <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
          </svg>
          <h1>AI PAGEBUILDER</h1>
        </Link>
        <ul className="list-none flex items-center text-white" id="navMenu">
        {isMobile ? (
          <li>
            {mobileMenuOpen && <MobileMenu />}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ) : (
          <NavigationItems/>
        )}
        </ul>
      </nav>
      );
    };
    
export default Header;
