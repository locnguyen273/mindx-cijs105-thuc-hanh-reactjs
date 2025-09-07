import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllPosts } from './../../stores/postReducer';

const ListPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);
  const postStatus = useSelector(state => state.post.status);

  React.useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchAllPosts());
    }
  }, [postStatus, dispatch]);

  if (postStatus === 'loading') {
    return <div>Loading posts...</div>;
  }

  return (
    <div className='d-grid' style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
      {posts && posts.length > 0 && posts.map(post => (
        <div key={post.id}>
          <img src="https://picsum.photos/200" alt="" />
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  )
}

export default ListPosts