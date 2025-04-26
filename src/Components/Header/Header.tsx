import React from 'react'
import CustomNavigationMenu from '../CustomNavigationMenu/CustomNavigationMenu'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='flex gap-4 items-center justify-between p-4 bg-(--dark-background) text-(--text-color-main)'>
        <div className='header__name'>DevProtfolio</div>
        <div className='header__navigation'>
        <CustomNavigationMenu/>
        </div>
        <div className='flex gap-4'>
          <Button className='cursor-pointer bg-(--primary-button)'>Sign Up</Button>
          <Button className='cursor-pointer bg-(--primary-button)'>Sign In</Button>
        </div>
    </div>
  )
}

export default Header