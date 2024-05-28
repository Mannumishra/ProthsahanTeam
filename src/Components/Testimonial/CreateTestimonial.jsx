import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateTestimonial = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        message: "",
        image: ""
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("message", data.message);
            formData.append("image", data.image);

            const res = await axios.post("null/testimonial", formData);
            if (res.status === 200) {
                toast.success("Testimonial Created Successfully");
                navigate("/testimonial");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container-fluid" style={{ marginTop: 80 }}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h2 className=' p-2 text-dark text-center'>Create Testimonial</h2>
                    <div className="form-container">
                        <form onSubmit={postData}>
                            <div className="mb-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" id="name" className="form-control" onChange={getInputData} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="message" className="form-label">Message</label>
                                <input type="text" name="message" id="message" className="form-control" onChange={getInputData} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" name="image" id="image" className="form-control" onChange={getFileData} />
                            </div>
                            <button type="submit" className="btn btn-dark w-100">Add Testimonial</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTestimonial;
