import React from 'react'
import dayjs from 'dayjs'
import { navIcons, navLinks } from '../constants'

export const Navbar = () => {


  return (
    <nav>
        <div>
            <img src="/images/logo.svg" alt="Logo"/>
            <p className='font-bold'>Mosu Portfolio</p>

            <ul>
                {navLinks.map((item) => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                    </li>
                )
                )}
            </ul>
        </div>
        <div>
            <ul>
                {
                    navIcons.map((icon) => (
                        <li key={icon.id}>
                            <img src={icon.img} alt={icon.id} />
                        </li>
                    ))
                }
            </ul>


            <time>{dayjs().format("ddd MMM D, h:mm A")}</time>

        </div>
    </nav>
  )
}
