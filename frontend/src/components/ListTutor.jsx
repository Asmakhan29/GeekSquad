import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { categoryData } from '../config';
import { IconAntennaBars5, IconBrandWhatsapp, IconMessage, IconPhone, IconStar } from '@tabler/icons-react';


const ListTutor = () => {

  const { category } = useParams();

  const [tutorList, setTutorList] = useState([]);

  const fetchTutor = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/tutor/${subject}`);
    const data = await response.json();
    setTutorList(data);
  }

  useEffect(() => {
    // fetchTutor();
  }, [])

  const tutorCard = (tutor) => {
    return <div className='bg-white rounded-lg shadow-lg'>
      <div className='bg-cover bg-center' style={{ backgroundImage: `url("/tutor-placeholder.webp")` }}>
        <div className='backdrop-blur-xl card-header  py-14 px-4'>

          <div className='grid grid-cols-4 gap-4'>
            <div className='col-span-1'>
              <img className='w-full rounded-full' src="/tutor-placeholder.webp" alt="" />
            </div>
            <div className='col-span-3'>
              <h5 className='text-xl font-bold'>Tutor Name</h5>
              <p className='tutor-exp'>12+ years exp.</p>
              <p>
                <IconStar className='inline' fill size={16} stroke={0} /> 4.3 (345)
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body p-4'>
        <p className='font-semibold'>Does your child find many topics in Math too challenging to understand?</p>
        <p className='my-2 text-lg'>
          <IconAntennaBars5 className='inline' />
          <span>Teaches Grades 4 to 10</span>
        </p>

        <p className='my-2 text-lg'>Price <span className='font-bold'>₹750</span>/hour</p>

        <div className='grid grid-cols-5'>
          <div className='col-span-3'>

            <button
              type="submit"
              className="mt-3 rounded-3xl transition px-3 py-2 text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white border border-2 border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Explore {categoryData[category].lessonName} Tutors
            </button>
          </div>
          <div className='grid col-span-2 grid-cols-3 gap-3'>
            <button
              type="submit"
              className="mt-3 px-2 transition rounded-full text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white border border-2 border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <IconMessage size={24} />
            </button>
            <button
              type="submit"
              className="mt-3 px-2 transition rounded-full text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white border border-2 border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <IconBrandWhatsapp size={24} />
            </button>
            <button
              type="submit"
              className="mt-3 px-2 transition rounded-full text-sm font-semibold leading-6 text-indigo-600 shadow-sm hover:bg-indigo-600 hover:text-white border border-2 border-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <IconPhone size={24} />
            </button>
            
          </div>
        </div>


      </div>

    </div>
  }


  return (
    <div>
      <header className='tutor-browse-header'>
        <div className='py-10 container container-md'>

          <div className='grid gap-3 grid-cols-2 align-baseline'>
            <div>
              <h3 className='text-3xl'>{categoryData[category].title}</h3>
              <p className='text-gray-500'>{categoryData[category].description}</p>
              <button
                type="submit"
                className="mt-3 flex justify-center rounded-3xl bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Explore {categoryData[category].lessonName} Tutors
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </header>
      <section>
        <div className='container py-10'>
          <h4 className='text-xl font-bold'>Connect with top {categoryData[category].lessonName} tutors</h4>
          <p>Dive right in and start getting results with lessons from expert {categoryData[category].lessonName} instructors.</p>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
            {tutorCard()}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ListTutor;