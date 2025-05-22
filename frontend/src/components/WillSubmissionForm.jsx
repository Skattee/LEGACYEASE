import React, { useState } from 'react';
import axios from 'axios';

const WillSubmissionForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/wills`,
                { title, content }
            );
            setSuccess('Will submitted successfully!');
            setTitle('');
            setContent('');
        } catch (err) {
            setError('Failed to submit will. Please try again.');
        }
    };

    return (
        <div>
            <h2>Submit Your Will</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Will</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default WillSubmissionForm;