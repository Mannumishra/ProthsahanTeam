import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateCategory = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const { _id } = useParams()
    const getInputData = (e) => {
        setName(e.target.value)
    }
    const getApiData = async () => {
        try {
            let res = await axios.get("null/category/" + _id)
            console.log(res);
            setName(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const postData = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.put("null/category/" + _id, { name: name })
            if (res.status === 200) {
                toast.success("Product Category is created")
                navigate("/category")
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
                        <h2 className=' p-2 text-dark text-center'>Update Product Category</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="productName" className="form-label">Category Name</label>
                                    <input type="text" name="name" value={name.name} id="productName" className="form-control" onChange={getInputData} />
                                </div>
                                <button type="submit" className="btn btn-dark w-100">Update Product Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCategory