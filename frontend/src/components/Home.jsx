import React from 'react'

const Home = () => {
    return (
        <>

            <div className="container border px-20 my-20">
                <div className="d-flex ">
                    <div>
                        <h1 className='text-4xl'>Find a perfect tutor for you today.</h1>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control rounded-pill" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            <i className="fa-solid fa-magnifying-glass input-group-text"></i>

                        </div>
                        

                        <form>
                            <label for="search" className="mb-2 text-sm font-medium"></label>
                            <div className="relative">
                                
                            <input className="placeholder:text-slate-500 placeholder:text-lg placeholder: bg-white w-1/2 border-0 rounded-3xl py-2 pl-9 shadow-sm focus:outline-none focus:border-0 " placeholder="What do you want to learn?" type="text" name="search" />
                                    <button type="submit" className="text-white absolute bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-4 py-2 rounded-full ">Q</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



            <div dir="ltr">
                <div className="snap-x">
                    <div className="scroll-ms-6 snap-start">
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>

                    <div className="scroll-ms-6 snap-start">
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>

                    <div className="scroll-ms-6 snap-start">
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>

                    <div className="scroll-ms-6 snap-start">
                        <img src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80" />
                    </div>

                </div>
            </div>


        </>
    )
}

export default Home