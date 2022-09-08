import React, { useState } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  //  const hic=()=>{
  //   window.location.reload();
  //  }
  return (
    <main className={show ? 'space-toggle' : null}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header-toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
      </header>

      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <NavLink to='/' className='nav-logo'>
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className='nav-logo-name'>Home</span>
            </NavLink >

            <div className='nav-list'>
              <NavLink  to='/' className='nav-link active' >
                {/* <i className='fas fa-tachometer-alt nav-link-icon'></i> */}
                <span className='nav-link-name'>Dashboard</span>
              </NavLink >
              <NavLink to='/crawl-link' className='nav-link' >
              {/* <i className="fa-solid fa-download"></i> */}
                <span className='nav-link-name'>Crawl theo link </span>
              </NavLink >
              <NavLink  to='/crawl-key' className='nav-link'>
              {/* <i className="fa-solid fa-download"></i> */}
                <span className='nav-link-name'>Crawl từ khóa</span>
              </NavLink >



              <NavLink  to='/gallery' className='nav-link'>
           
                <span className='nav-link-name'>Chỉnh sửa Footer</span>
              </NavLink >
            </div>
          </div>

          <NavLink to='/logout' className='nav-link'>
            <i className='fas fa-sign-out nav-link-icon'></i>
            <span className='nav-link-name'>Logout</span>
          </NavLink >
        </nav>
      </aside>

      
    </main>
  );
};

export default Sidebar;
