import React, { useEffect, useState } from "react";
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const Branch = () => {
  const { _id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    title: "",
    contact: "",
    city: "",
    address: ""
  })
  const getApiData = async () => {
    try {
      let res = await axios.get("https://api.prothsahanteam.org/api/event/" + _id);
      console.log(res);
      setData(res.data.data);
    } catch (error) { }
  };

  const getInputData = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  const getFileData = (e) => {
    const { name, files } = e.target
    setData({ ...data, [name]: files[0] })
  }
  const dataForm = new FormData()
  dataForm.append("title", data.title)
  dataForm.append("contact", data.contact)
  dataForm.append("city", data.city)
  dataForm.append("address", data.address)

  const sendData = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.put("https://api.prothsahanteam.org/api/event/" + _id, dataForm)
      console.log(res)
      if (res.status === 200) {
        toast.success("Update Successfully")
      }
    } catch (error) {
      toast.error("Update Successfully")

      console.log(error)
    }
  }
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <div
        className="container-fluid"
        style={{ marginTop: 85, marginBottom: 80 }}
      >
        <div className="row">
          <div className="col-md-3 bg-dark">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div
              className="mb-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h2>Recent Registration</h2>
            </div>
            <form action="" onSubmit={sendData}>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">Title: </div>
                  <div className="col-md-4">
                    <input id="date" name="title" value={data.eventname} class="form-control" type="text" onChange={getInputData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">Contact Person: </div>
                  <div className="col-md-4">
                    <input id="date" name="contact" value={data.eventdate} class="form-control" type="text" onChange={getInputData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">City: </div>
                  <div className="col-md-4">
                    <input id="city" name="city" value={data.eventdescription} class="form-control" type="text" onChange={getInputData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">Address: </div>
                  <div className="col-md-4">
                    <input id="address" class="form-control" name="address" type="text" onChange={getFileData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div style={{textAlign:'center'}} className="col-md-6">
                    <button className="btn btn-success">Update Branch</button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Branch;
