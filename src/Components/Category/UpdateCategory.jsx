import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateCategory = () => {
    const [data, setData] = useState({
        title: "",
        description: "",
        image10: null,
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        image6: null,
        image7: null,
        image8: null,
        image9: null
    });
    const navigate = useNavigate()
    const { _id } = useParams()
    const getApiData = async () => {
        try {
            let res = await axios.get("https://api.prothsahanteam.org/api/gallery/" + _id)
            console.log(res);
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getFileData = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    for (let i = 1; i <= 10; i++) {
        const fieldName = `image${i}`;
        if (data[fieldName]) {
            formData.append(fieldName, data[fieldName]);
        }
    }
    const postData = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.put("https://api.prothsahanteam.org/api/gallery/" + _id, formData);
            if (res.status === 200) {
                toast.success("Gallery Created");
                navigate("/category");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2 className=' p-2 text-dark text-center'>Update Photo Gallery</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" name="title" value={data.title} id="title" className="form-control" onChange={getInputData} />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" name="description" value={data.description} id="description" className="form-control" onChange={getInputData} />
                                </div>
                                {/* <div className="row">
                                    {[...Array(10)].map((_, index) => (
                                        <div key={index} className="col-md-3 mb-2">
                                            <label htmlFor={`image${index + 1}`} className="form-label">Image</label>
                                            <input type="file" name={`image${index + 1}`} id={`image${index + 1}`} className="form-control" onChange={getFileData} />
                                        </div>
                                    ))}
                                </div> */}
                                <button type="submit" className="btn btn-dark w-100">Update Gallery</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCategory