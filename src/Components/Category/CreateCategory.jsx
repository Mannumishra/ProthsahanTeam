import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateCategory = () => {
    const [isLoading,setIsLoading] = useState(false)
    const [data, setData] = useState({
        title: '',
        description: '',
        images: [], // State to store multiple images
    });

    const navigate = useNavigate();

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        setData((prevData) => ({
            ...prevData,
            images: fileArray,
        }));
    };

    const formDataToSend = new FormData();
    formDataToSend.append('title', data.title);
    formDataToSend.append('description', data.description);
    data.images.forEach((file) => {
        formDataToSend.append('images', file);
    });

    const postData = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            let res = await axios.post('http://localhost:8000/api/gallery', formDataToSend);
            console.log(res);
            setIsLoading(false)

            if (res.status === 200) {
                toast.success('Gallery Created');
                navigate('/category');
            }
        } catch (error) {
            setIsLoading(false)

            console.log(error);
        }
    };

    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2 className="p-2 text-dark text-center">Create Photo Gallery</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="form-control"
                                        onChange={getInputData}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        onChange={getInputData}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-md-3 mb-2">
                                        <label htmlFor={`images`} className="form-label">
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            name="images"
                                            className="form-control"
                                            onChange={handleFileChange}
                                            multiple 
                                        />
                                    </div>
                                </div>
                                <button type="submit" disabled={isLoading} className={`btn btn-dark w-100 ${isLoading ? 'not':'yes'}  `}>
                                    {isLoading ? "Please Wait":"Create Gallery"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
