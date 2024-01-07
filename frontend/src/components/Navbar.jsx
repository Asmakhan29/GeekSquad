import React from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
    return (
        <>
            <header className='top w-full'>
                <nav className='mx-4 flex px-4 bg-white py-4'>
                    <ul className='flex mx-auto'>
                        <li className='mx-3'>categories</li>
                        <li className='mx-3'>Teach with Us</li>
                        <li className='mx-3'>Instant Learning</li>
                        <li className='mx-3'>Quizzes</li>

                    </ul>
                </nav>
            </header>





        </>
    )
}

export default Navbar