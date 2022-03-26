import { useEffect } from 'react';
import PostCard from './PostCard';

function PostList({ posts }) {

  useEffect(()=>{
    console.log(posts)
  },[])
  return (
    <>
      {posts.map(item => (
        <PostCard key={item.id} post={item} />
      ))}
    </>
  );
}

export default PostList;