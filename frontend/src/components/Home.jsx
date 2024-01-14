import React from 'react';
import './Home.css';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';

const Home = () => {
    return (
        <div className='home-bg'>
            <div>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                        <h1 className='text-4xl font-semibold'>Find a perfect tutor for you<br /> today.</h1>
                        <form className='mr-20 my-8 sm:mx-2'>
                            <label for="search" className="mb-2 text-sm font-medium"></label>
                            <div className="relative shrink">

                                <input className="search-box w-full placeholder:text-slate-500 pl-5  placeholder:text-lg placeholder: bg-white border-0 rounded-3xl shadow-sm focus:outline-none focus:border-0 h-11 shrink-0" placeholder="What do you want to learn?" type="text" name="search" />
                                <button type="submit" className="search-icon text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm my-1 px-2 py-2 rounded-full ">
                                    <i class="fa-solid fa-magnifying-glass px-1"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="w-full md:w-1/2 lg:w-2/3 p-4">
                        <div className="px-10">
                            <img src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hdGhzfGVufDB8fDB8fHww" alt="" />
                        </div>
                    </div>
                </div>
            </div>


            <Swiper
                slidesPerView={5}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper flex flex-nowrap"
            >
                <SwiperSlide className='shrink-0'>
                    <img src="https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hdGhzfGVufDB8fDB8fHww" alt="" />
                </SwiperSlide>
                <SwiperSlide className='shrink-0'>
                    <img src="https://plus.unsplash.com/premium_photo-1683134169138-9037062cba51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxnZWJyYXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </SwiperSlide>
                <SwiperSlide className='shrink-0'>
                    <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </SwiperSlide>
                <SwiperSlide className='shrink-0'>
                    <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXhhbXxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                </SwiperSlide>
                <SwiperSlide className='shrink-0'>
                    <img src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaWNhbCUyMGV4YW18ZW58MHx8MHx8fDA%3D" alt="" />
                </SwiperSlide>
                <SwiperSlide className='shrink-0'>
                    <img src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW50ZXJ2aWV3fGVufDB8fDB8fHww" alt="" />
                </SwiperSlide>
                <SwiperSlide className='shrink-0'>Slide 7</SwiperSlide>
                <SwiperSlide className='shrink-0'>Slide 8</SwiperSlide>
                <SwiperSlide className='shrink-0'>Slide 9</SwiperSlide>
            </Swiper>

            <div class="flex bg-purple-400 mx-48 my-16">
                <div class="flex-1 w-100">

                    <h2 className='text-2xl'>Become Industry Ready: <br />
                        Journey from campus to <br />Corporate </h2>
                </div>
                <div class="flex-1 w-100">
                    03
                </div>
            </div>


            <div class="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div class="md:flex">

                    <div class="p-2">
                        <div class=" text-2xl font-semibold">Become Industry Ready: <br />
                            Journey from campus to <br />Corporate </div>
                        <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible accommodation for your team</a>
                        <p class="mt-2 text-slate-500">Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of places to do just that.</p>
                    </div>
                    <div class="md:shrink-0">
                        <img class="h-48 w-full object-cover md:h-full md:w-48" src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW50ZXJ2aWV3fGVufDB8fDB8fHww" alt="Modern building architecture" />
                    </div>
                </div>
            </div>






        </div>
    )
}

export default Home