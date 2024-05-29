import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Category = () => {
    const [data, setData] = useState([])
    const getApiData = async () => {
        try {
            let res = await axios.get("https://protsahan.onrender.com/api/gallery")
            console.log(res)
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
                            <span><Link to='/createcategory' className='btn btn-dark'>Create Photo galary</Link></span>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Image Title</th>
                                    <th>Image Description</th>
                                    <th>Image </th>
                                    <th>Image </th>
                                    <th>Image </th>
                                    <th>Image </th>
                                    <th>Edit </th>
                                    <th>Delete </th>

                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td><img src={item.image1} alt="" style={{height:50}}/></td>
                                        <td><img src={item.image2} alt="" style={{height:50}}/></td>
                                        <td><img src={item.image3} alt="" style={{height:50}}/></td>
                                        <td><img src={item.image4} alt="" style={{height:50}}/></td>
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