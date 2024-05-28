import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';

const Banare = () => {
    const [data, setData] = useState([]);

    const getApiData = async () => {
        try {
            const res = await axios.get("null/banare")
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecord = async (_id) => {
        try {
            const res = await axios.delete(`null/banare/${_id}`)
            if (res.status === 200) {
                toast.success("Banare Deleted Successfully");
            }
            getApiData();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <>
            <div className="container-fluid" style={{marginTop:70 ,marginBottom:80}}>
                <div className="row">
                    <div className="side col-md-3 bg-dark">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mb-5">
                        <div className='mb-3' style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Recent Registration</h2>
                            {/* <span><Link to='/createbanare' className='btn btn-dark'>Create Banare</Link></span> */}
                        </div>
                        <table className='table table-bordered table-responsive'>
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Date Of Birth</th>
                                    <th>Email ID</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Country</th>
                                    <th>PinCode</th>
                                    <th>Citizenship</th>
                                    <th>AdditionalNote</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td><img src={item.image} alt="" style={{ height: 50 }} /></td>
                                        <td><Link to={`/updatebanare/${item._id}`}><button className='btn btn-success'>Edit</button></Link></td>
                                        <td><button className='btn btn-danger' onClick={() => { deleteRecord(item._id) }}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banare;
