import React from 'react'
import CustomNavigationMenu from '../CustomNavigationMenu/CustomNavigationMenu'
import { Button } from '../ui/button'
import { useLocation, useNavigate } from 'react-router';

function Header() {
  const navigate =useNavigate();
  const location=useLocation();
  const isLoginPage=location.pathname==='/login';
  const userLogin = localStorage.getItem("userInfo");
  return (
    <div className='flex gap-4 items-center justify-between p-4 bg-(--dark-background) text-(--text-color-main)'>
        <img src="./imageForSite.png" className='w-72 min-h-24'/>
        {!isLoginPage && <div className='header__navigation'>
       <CustomNavigationMenu/>
        </div>}
        <div className='flex gap-4'>
          {!userLogin?<>
          <Button className='cursor-pointer bg-(--primary-button)' onClick={()=>navigate('/register')}>Sign Up</Button>
          {!isLoginPage && <Button className='cursor-pointer bg-(--primary-button)' onClick={()=>navigate('/login')}>Sign In</Button>}
          </>:<Button className='cursor-pointer bg-(--primary-button)'
            onClick={()=>{
              localStorage.removeItem("userInfo");
              navigate('/login');
            }}
          >Log Out</Button>}
        </div>
    </div>
  )
}

export default Header