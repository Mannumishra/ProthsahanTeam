import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/volunteer");
      console.log(res)
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (_id)=>{
    try {
      let res = await axios.delete("http://localhost:8000/api/volunteer/"+_id)
      if(res.status===200){
        toast.success("Donor Deleted Successfully")
      }
      getApiData()
    } catch (error) {
      console.log(error)
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
                  {/* <th>Organisation Name</th> */}
                  <th>Address</th>
                  <th>Donation Type</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.panNo}</td>
                    <td>{item.mobile}</td>
                    <td>{item.address}</td>
                    <td>{item.donation}</td>
                    <td>
                      <button className="btn btn-danger" onClick={()=> deleteItem(item._id)}>Delete</button>
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
