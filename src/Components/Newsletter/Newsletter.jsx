import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Sidebar from '../Sidebar'

const Newsletter = () => {
    const [data, setData] = useState([])
    const deleteRecord = async (_id) => {
        try {
            let res = await axios.delete("null/newsletter/" + _id)
            console.log(res);
            if (res.status === 200)
                toast.success("Newsletter Deleted Successfully")
            getApiData()
        } catch (error) {

        }
    }
    const getApiData = async () => {
        try {
            let res = await axios.get("null/newsletter")
            setData(res.data.data)
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
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Newsletter</h2>
                        </div>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.email}</td>
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

export default Newsletter