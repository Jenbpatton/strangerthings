import React from 'react';
import Post from '../components/Post';
import GuestPost from '../components/GuestPost';
import { useOutletContext } from 'react-router-dom';

const PostList = () => {
    const [isLoggedIn] = useOutletContext();

    // Render either ClientPost or GuestPost based on the isLoggedIn state
    return isLoggedIn ? <Post /> : <GuestPost />;
};

export default PostList;