import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PostList = ({ posts }) => {
    const token = localStorage.getItem('token');
    const { username } = token ? jwt_decode(token) : { username: '' };
    const navigate = useNavigate();

    // Check if 'posts' is defined and is an array
    if (!Array.isArray(posts)) {
        return <div>No posts to display.</div>;
    }

    // Function to navigate to SinglePost page
    const navigateSinglePost = ({ _id, author, description, price, location, title, isAuthor }) => {
        navigate('/SinglePost', {
            state: { _id, author, description, price, location, title, isAuthor },
        });
    };

    // Function to navigate to Message page
    const navigateSendMessage = ({ _id, author, description, price, location, title, isAuthor }) => {
        navigate('/Message', {
            state: { _id, author, description, price, location, title, isAuthor },
        });
    };

    return (
        <section>
            {posts.map(({ _id, author, description, price, location, title, isAuthor }) => (
                <div key={_id} className="posts">
                    <div
                        onClick={() =>
                            navigateSinglePost({
                                _id,
                                author,
                                description,
                                price,
                                location,
                                title,
                                isAuthor,
                            })
                        }
                    >
                        <h2>{title}</h2>
                        {description && <h4>Description: {description}</h4>}
                        {price && <h4>Price: {price}</h4>}
                        {author && <h4>Seller: {author.username}</h4>}
                        {location && <h4>Location: {location}</h4>}
                    </div>
                    <div>
                        {author.username !== username && (
                            <button
                                onClick={() =>
                                    navigateSendMessage({
                                        _id,
                                        author,
                                        description,
                                        price,
                                        location,
                                        title,
                                        isAuthor,
                                    })
                                }
                                className="functionalButton"
                            >
                                Send Message
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
};

PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            author: PropTypes.shape({
                username: PropTypes.string.isRequired,
            }).isRequired,
            description: PropTypes.string,
            price: PropTypes.string.isRequired,
            location: PropTypes.string,
            title: PropTypes.string.isRequired,
            isAuthor: PropTypes.bool.isRequired,
        })
    ),
};

export default PostList;
