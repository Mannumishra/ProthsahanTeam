import React, { useState } from 'react'
import Sidebar from '../Sidebar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CreateCategory = () => {
    const [name, setName] = useState("")
    const navigate = useNavigate()
    const getInputData = (e) => {
        setName(e.target.value)
    }
    const postData = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("null/category", { name: name })
            if (res.status === 200) {
                toast.success("Product Category is created")
                navigate("/category")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container-fluid" style={{ marginTop: 80 }}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2 className=' p-2 text-dark text-center'>Create Product Category</h2>
                        <div className="form-container">
                            <form onSubmit={postData}>
                                <div className="mb-2">
                                    <label htmlFor="productName" className="form-label">Category Name</label>
                                    <input type="text" name="name" id="productName" className="form-control" onChange={getInputData} />
                                </div>
                                <button type="submit" className="btn btn-dark w-100">Add Product Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory