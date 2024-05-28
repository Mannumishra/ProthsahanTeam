import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateBestSeller = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [data, setData] = useState({
        productName: "",
        image: ""
    });

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("productName", data.productName);
            formData.append("image", data.image);

            const res = await axios.put(`null/bestseller/`+_id, formData)
            console.log(res)
            if (res.status === 200) {
                toast.success("Best Seller Update Successfully");
                navigate("/bestseller");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getApiData = async () => {
        try {
            const res = await axios.get(`null/bestseller/`+_id)
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div className="container-fluid"  style={{marginTop:80}}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h2 className='  text-dark text-center'>Update Best Seller</h2>
                    <div className="form-container">
                        <form onSubmit={postData}>
                            <div className="mb-2">
                                <label htmlFor="productName" className="form-label">Name</label>
                                <input type="text" name="productName" id="productName" onChange={getInputData} className="form-control" value={data.productName} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" name="image" id="image" onChange={getFileData} className='form-control' />
                            </div>
                            <button type="submit" className="btn btn-dark w-100">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBestSeller;
