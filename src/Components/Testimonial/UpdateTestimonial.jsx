import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTestimonial = () => {
    const { _id } = useParams();
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

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("message", data.message);
    formData.append("image", data.image);

    const postData = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`null/testimonial/${_id}`, formData);
            if (res.status === 200) {
                toast.success("Testimonial Updated Successfully");
                navigate("/testimonial");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getApiData = async () => {
        try {
            const res = await axios.get(`null/testimonial/${_id}`);
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div className="container-fluid" style={{ marginTop: 80 }}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h2 className='bg-dark p-2 text-light text-center'>Update Testimonial</h2>
                    <div className="form-container">
                        <form onSubmit={postData}>
                            <label htmlFor="">Name</label>
                            <input type="text" name="name" id="" className='form-control' onChange={getInputData} value={data.name} />
                            <label htmlFor="">Message</label>
                            <input type="text" name="message" id="" className='form-control' onChange={getInputData} value={data.message} />
                            <label htmlFor="">Image</label>
                            <input type="file" name="image" id=""  className="form-control"onChange={getFileData} /><br />
                            <button className='btn btn-dark mt-2'>Update Testimonial</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTestimonial;
