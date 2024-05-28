import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";

const Contact = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      let res = await axios.get("null/contact");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
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
          <div className="col-md-9">
            <h2 className="mb-3">List Of Donor</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>PAN No.</th>
                  <th>Mobile No.</th>
                  <th>Organisation Name</th>
                  <th>Address</th>
                  <th>Donation Type</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <button className="btn btn-danger">Delete</button>
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

export default Contact;
