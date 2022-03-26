import React from 'react'

function PostContent({ post: {title, img}}) {
  return (
    <>
    { title && <p className="text-justify px-3 py-1"> {title} </p> }

    { img && <img src={img} className="img-fluid" alt="post-img"/> }
    </>
  )
}

export default PostContent