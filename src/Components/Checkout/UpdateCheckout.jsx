import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const UpdateCheckout = () => {
  const { _id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    eventname: "",
    eventdate: "",
    eventdescription: "",
    image: ""
  })
  const getApiData = async () => {
    try {
      let res = await axios.get("https://protsahan.onrender.com/api/event/" + _id);
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
  dataForm.append("eventname", data.eventname)
  dataForm.append("eventdate", data.eventdate)
  dataForm.append("eventdescription", data.eventdescription)
  dataForm.append("image", data.image)

  const sendData = async (e) => {
    e.preventDefault()
    try {
      let res = await axios.put("https://protsahan.onrender.com/api/event/" + _id, dataForm)
      console.log(res)
      if (res.status === 200) {
        toast.success("Event Update Successfully")
        navigate("/upload-news-events")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <>
        <div className="container-fluid" style={{ marginTop: 70 }}>
          <div className="row">
            <div className="side col-md-3 bg-dark">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h2 className="mt-4 mb-5">UPLOAD NEWS / EVENTS</h2>
              <form action="" onSubmit={sendData}>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">Event Name:</div>
                  <div className="col-md-4">
                    <input id="date" name="eventname" value={data.eventname} class="form-control" type="text" onChange={getInputData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">Event Date:</div>
                  <div className="col-md-4">
                    <input id="date" name="eventdate" value={data.eventdate} class="form-control" type="date" onChange={getInputData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">Description</div>
                  <div className="col-md-4">
                    <textarea id="date" name="eventdescription" value={data.eventdescription} class="form-control" type="date" onChange={getInputData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-2">Press Release</div>
                  <div className="col-md-4">
                    <input id="date" class="form-control" name="image" type="file" onChange={getFileData} />
                  </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                  <div className="col-md-6">
                    <button className="btn btn-success text-center">Submit & Upload Event Images</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  )
}

export default UpdateCheckout