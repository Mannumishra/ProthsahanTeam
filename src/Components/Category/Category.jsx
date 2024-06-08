import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Category = () => {
    const [data, setData] = useState([])
    
    const getApiData = async () => {
        try {
            let res = await axios.get("https://api.prothsahanteam.org/api/gallery")
            setData(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    
    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("https://api.prothsahanteam.org/api/gallery/" + _id)
            if (res.status === 200) {
                toast.success("Category Deleted Successfully")
                getApiData(); // Refresh data after deletion
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getApiData();
    }, []);

    return (
        <>
            <div className="container-fluid" style={{ marginTop: 70 }}>
                <div className="row">
                    <div className="side col-md-3 bg-dark">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mt-3">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>All Medical Camp Images</h2>
                            <span><Link to='/createcategory' className='btn btn-dark mt-3'>Create Photo gallery</Link></span>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Image Title</th>
                                    <th>Image Description</th>
                                    <th>Images</th>
                                    {/* <th>Edit</th> */}
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            {item.images && item.images.slice(0,4).map((image, idx) => (
                                                <img key={idx} src={image} alt={`Image ${idx}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                                            ))}
                                        </td>
                                        <td>
                                            <Link to={`/updatecategory/${item._id}`}><button className='btn btn-success'>Edit</button></Link>
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

export default Category;
