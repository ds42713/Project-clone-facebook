import React, { useEffect, useState } from 'react'
import axios from '../../config/axios';
import Spinner from '../utils/Spinner';
import PostForm from './PostForm'
import PostList from './PostList'

function PostWrapper() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false);
    const fetchPost = async () => {
        try {
            const res = await axios.get('/posts');
            setPosts(res.data.posts);
        } catch (err) {
            console.log(err);
        }
    };
    
    const createPost = async (title, img) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('img', img);

        try {
            setLoading(true);
            await axios.post('/posts', formData);
            fetchPost();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <>
            {loading && <Spinner />}
            <PostForm createPost={createPost} />
            <PostList posts={posts} />
        </>
    )
}

export default PostWrapper