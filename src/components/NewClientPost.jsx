import { useState } from "react";
import { addNewPost } from '../api/api'
import { useNavigate } from "react-router-dom";

const NewClientPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState(false);
    const [postErrorMessage, setPostErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    async function submitPost(e) {
        e.preventDefault();

        if (!title || !description || !price) {
            setPostErrorMessage('Please fill in required fields.');
        } else {
            const post = {
                post: {
                    title,
                    description,
                    price,
                    location: location || "[On Request]",
                    willDeliver
                }
            }

            try {
                const response = await addNewPost(post, token);
                console.log(response);
                setSuccessMessage('Post created successfully!');
                // Reset form fields for a new post
                setTitle('');
                setDescription('');
                setPrice('');
                setLocation('');
                setWillDeliver(false);
                // Optionally, you can add a delay and then clear the success message
                setTimeout(() => setSuccessMessage(''), 3000);
            } catch (error) {
                console.error('Error creating a new post:', error);
            }
        }
    }

    return (
        <form onSubmit={submitPost} className="panel">
            <h1>Add New Post</h1>
            <input 
                type="text" 
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input 
                type="text" 
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input 
                type="text" 
                value={price}
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input 
                type="text" 
                value={location}
                placeholder="Location (optional)"
                onChange={(e) => setLocation(e.target.value)}
            />
            <label>
                <input 
                    type="checkbox"
                    value={willDeliver}
                    onChange={() => setWillDeliver(!willDeliver)}
                />
                Willing to Deliver?
            </label>
            
            <button type="submit" className="createButton">Create</button>
            
            {postErrorMessage && <p className="error">{postErrorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </form>
    );
}

export default NewClientPost;
