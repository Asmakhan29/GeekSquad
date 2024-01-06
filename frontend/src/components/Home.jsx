import React from 'react'

const Home = () => {
    return (
        <>

            <div className="container">
                <div className="d-flex">
                    <div>
                        <h2>Find a perfect tutor for you today.</h2>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                            <div class="input-group-append">
                                <span class="input-group-text" id="basic-addon1">@</span>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home