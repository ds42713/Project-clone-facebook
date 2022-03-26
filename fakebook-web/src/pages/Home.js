import React from 'react'
import PostWrapper from '../components/posts/PostWrapper'

function Home() {
    return (
        <>
            <div className="container my-5">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-6 col-md-9">
                        <PostWrapper />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home