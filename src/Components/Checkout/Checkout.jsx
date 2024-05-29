import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";

const Checkout = () => {
  const [formData, setFormData] = useState({
    eventname: "",
    eventdate: "",
    eventdescription: "",
    image: ""
  });
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getInputData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getFileData = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("eventname", formData.eventname);
    dataForm.append("eventdate", formData.eventdate);
    dataForm.append("eventdescription", formData.eventdescription);
    dataForm.append("image", formData.image);

    try {
      if (isEditing) {
        await axios.put(`https://protsahan.onrender.com/api/event/${editingId}`, dataForm);
      } else {
        await axios.post("https://protsahan.onrender.com/api/event", dataForm);
      }
      setFormData({
        eventname: "",
        eventdate: "",
        eventdescription: "",
        image: ""
      });
      setIsEditing(false);
      setEditingId(null);
      getApiData();
    } catch (error) {
      console.log(error);
    }
  };

  const getApiData = async () => {
    try {
      const res = await axios.get("https://protsahan.onrender.com/api/event");
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setEditingId(event._id);
    setFormData({
      eventname: event.eventname,
      eventdate: event.eventdate,
      eventdescription: event.eventdescription,
      image: event.image
    });
  };

  const deleteEvent = async(_id)=>{
    try {
      const res = await axios.delete("https://protsahan.onrender.com/api/event/"+_id);
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
            <h2 className="mt-4 mb-5">{isEditing ? "EDIT EVENT" : "UPLOAD NEWS / EVENTS"}</h2>
            <form onSubmit={sendData}>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Event Name:</div>
                <div className="col-md-4">
                  <input
                    id="eventname"
                    name="eventname"
                    className="form-control"
                    type="text"
                    value={formData.eventname}
                    onChange={getInputData}
                  />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Event Date:</div>
                <div className="col-md-4">
                  <input
                    id="eventdate"
                    name="eventdate"
                    className="form-control"
                    type="date"
                    value={formData.eventdate}
                    onChange={getInputData}
                  />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Description:</div>
                <div className="col-md-4">
                  <textarea
                    id="eventdescription"
                    name="eventdescription"
                    className="form-control"
                    value={formData.eventdescription}
                    onChange={getInputData}
                  />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Press Release:</div>
                <div className="col-md-4">
                  <input
                    id="image"
                    className="form-control"
                    name="image"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-6">
                  <button className="btn btn-success text-center" type="submit">
                    {isEditing ? "Update Event" : "Submit & Upload Event Images"}
                  </button>
                </div>
              </div>
            </form>
            <table className="table table-bordered table-responsive mt-5">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Event Name</th>
                  <th>Event Date</th>
                  <th>Description</th>
                  <th>Press Release</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.reverse().map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.eventname}</td>
                    <td>{item.eventdate}</td>
                    <td>{item.eventdescription}</td>
                    <td><img src={item.image} alt="" height={100} /></td>
                    <td>
                      <button className="btn btn-success" onClick={() => handleEdit(item)}>Edit</button>
                    </td>
                    <td><button className="btn btn-danger" onClick={()=>{deleteEvent(item._id)}}>Delete</button></td>
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

export default Checkout;
