import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BestSeller = () => {
    const [data, setData] = useState([]);

    const getApiData = async () => {
        try {
            const res = await axios.get("null/bestseller")
            setData(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecord = async (_id) => {
        try {
            const res = await axios.delete(`null/bestseller/`+_id);
            if (res.status === 200) {
                getApiData(); // Refresh data after deletion
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <>
            <div className="container-fluid"  style={{marginTop:80}}>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 mb-5">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Best Seller Product</h2>
                            <span><Link to='/createbestseller' className='btn btn-dark'>Create Best Seller</Link></span>
                        </div>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>
                                            <a href={item.image} target='_blank' rel="noopener noreferrer">
                                                <img src={item.image} alt="" style={{ height: 50 }} />
                                            </a>
                                        </td>
                                        <td>
                                            <Link to={`/updatebestseller/${item._id}`}>
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
    );
};

export default BestSeller;
