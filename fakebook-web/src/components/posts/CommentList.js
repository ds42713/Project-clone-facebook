import React from 'react'
import CommentItem from './CommentItem'

function CommentList({ comments }) {
    return (
        <div className='pt-1'>
            {comments.map(item => (
                <CommentItem key={item.id} comment={item} />
            ))}
        </div>
    )
}


export default CommentList

