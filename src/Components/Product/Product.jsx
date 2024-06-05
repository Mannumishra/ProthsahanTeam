import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Product = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      let res = await axios.get("https://api.prothsahanteam.org/api/job");
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItem = async (_id) => {
    console.log(_id)
    try {
      let res = await axios.delete(
        "https://api.prothsahanteam.org/api/job/" +_id
      );
      console.log(res);
      getApiData()
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ marginTop: 85 }}>
        <div className="row">
          <div className="side col-md-3 bg-dark">
            <Sidebar />
          </div>
          <div className="col-md-9 mt-2 mb-5">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2>Posted Job</h2>
              <span>
                <Link to="/createproduct" className="btn btn-dark">
                  Create Product
                </Link>
              </span>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Post Vacancy</th>
                    <th>Qualification</th>
                    <th>Experience</th>
                    <th>Package Offered</th>
                    <th>Organization Name</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>PinCode</th>
                    <th>Contact Person</th>
                    <th>Mobile Number</th>
                    <th>Email ID</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{item.jobpost}</td>
                      <td>{item.qualification}</td>
                      <td>{item.experience}</td>
                      <td>{item.packageanual}</td>
                      <td>{item.organisationname}</td>
                      <td>{item.address}</td>
                      <td>{item.state}</td>
                      <td>{item.city}</td>
                      <td>{item.pincode}</td>
                      <td>{item.contact}</td>
                      <td>{item.mobile}</td>
                      <td>{item.email}</td>
                      <td>
                        <button className="btn btn-success"><Link to={`/updateproduct/${item._id}`}>Edit</Link></button>
                      </td>
                      <td>
                        <button
                          onClick={() => deleteItem(item._id)}
                          className="btn btn-danger"
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
      </div>
    </>
  );
};

export default Product;
