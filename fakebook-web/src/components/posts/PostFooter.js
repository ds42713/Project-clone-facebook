import React, { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
import PostAction from './PostAction'
import axios from '../../config/axios';

function PostFooter({ post: { Comments, id } }) {

    const [comments, setComments] = useState(Comments)
    const [showComment, setShowComment] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const toggleShowComment = () => {
        
        if (showForm && !showComment) {
            setShowComment(prev => !prev);
        } else {
            setShowComment(prev => !prev);
            setShowForm(prev => !prev);
        }
    };

    const toggleShowForm = () => {  
        setShowForm(true);
    };

  
    const createComment = async title => {
        try {
            const res = await axios.post('/comments', { title, postId: id });
            console.log(res.data);
            setComments(prev => [...prev, res.data.comment]); // 20/1/2022 เช้า 2.44.00
            setShowComment(true);
            setShowForm(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-2">
            <PostAction
                numComment={comments.length}
                toggleShowComment={toggleShowComment}
                toggleShowForm={toggleShowForm}
            />
            {showComment && <CommentList comments={comments} />}
            {showForm && <CommentForm createComment={createComment} />}
        </div>
    )
}

export default PostFooter