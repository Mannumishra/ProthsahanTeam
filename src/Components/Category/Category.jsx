import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Category = () => {
    const [data, setData] = useState([])
    const getApiData = async () => {
        try {
            let res = await axios.get("null/category")
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("null/category/" + _id)
            if (res.status === 200) {
                toast.success("Category Deletd Succssfully")
            }
            getApiData()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <>
            <div className="container-fluid" style={{ marginTop: 70 }}>
                <div className="row">
                    <div className="side col-md-3 bg-dark">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>All Medical Camp Images</h2>
                            <span><Link to='/createcategory' className='btn btn-dark'>Create Product Category</Link></span>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Image Title</th>
                                    <th>Image Name</th>
                                    <th>Posted Date</th>
                                    <th>Category</th>
                                    <th>Delete Item</th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>
                                            <Link to={`/updatecategory/${item._id}`}>
                                                <button className='btn btn-success'>Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => { deleteRecord(item._id) }}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category