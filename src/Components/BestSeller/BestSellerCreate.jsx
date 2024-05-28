import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const BestSellerCreate = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        productName: "",
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
            formData.append("productName", data.productName);
            formData.append("image", data.image);

            const res = await axios.post("null/bestseller", formData)
            console.log(res)
            if (res.status === 200) {
                toast.success("Best Seller Product created successfully");
                navigate("/bestseller");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container-fluid"  style={{marginTop:80}}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2 className=' p-2 text-dark text-center'>Create New Best Seller</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="productName" className="form-label">Name</label>
                                    <input type="text" name="productName" id="productName" className="form-control" onChange={getInputData} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="image" className="form-label">Image</label>
                                    <input type="file" name="image" id="image" className="form-control" onChange={getFileData} />
                                </div>
                                <button type="submit" className="btn btn-dark w-100">Add BestSeller</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BestSellerCreate;
