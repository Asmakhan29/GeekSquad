import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <div className='home-bg'>

            <div className="home-space container py-20">
                <div className="d-flex ">
                    <div className=''>
                        <h1 className='text-4xl font-semibold pr-10'>Find a perfect tutor for you<br/> today.</h1>
                        <form className='mr-20 my-8'>
                            <label for="search" className="mb-2 text-sm font-medium"></label>
                            <div className="relative w-1/2">

                                <input className="search-box w-full placeholder:text-slate-500 placeholder:text-lg placeholder: bg-white border-0 rounded-3xl py-2 pl-9 shadow-sm focus:outline-none focus:border-0 h-11" placeholder="What do you want to learn?" type="text" name="search" />
                                <button type="submit" className="search-icon text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm p-2 mt-1 px-3 rounded-full ">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                        </form>



                    </div>
                </div>
            </div>



            


        </div>
    )
}

export default Home