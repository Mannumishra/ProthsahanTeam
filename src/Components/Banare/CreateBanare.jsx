import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreateBanare = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/contact");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecord = async (_id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/contact/${_id}`);
      if (res.status === 200) {
        toast.success("Contact Deleted Successfully");
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
      <div
        className="container-fluid"
        style={{ marginTop: 70, marginBottom: 80 }}
      >
        <div className="row">
          <div className="side col-md-3 bg-dark">
            <Sidebar />
          </div>
          <div className="col-md-9 mb-5">
            <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2>Recent Registration</h2>
              {/* <span><Link to='/createbanare' className='btn btn-dark'>Create Banare</Link></span> */}
            </div>
            <table className="table table-bordered table-responsive">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email ID</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.subject}</td>
                    <td>{item.message}</td>
                    <td>{item.city}</td>
                    <td>{item.country}</td>
                    <td>{item.number}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteRecord(item._id);
                        }}
                      >
                        Delete
                      </button>
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

export default CreateBanare;
