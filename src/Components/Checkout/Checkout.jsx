import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import "../Checkout/checkout.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Checkout = () => {
  const [formData, setFormData] = useState({
    eventname: "",
    eventdate: "",
    eventdescription: "",
    images: []
  });
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getInputData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getFileData = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setFormData((prevData) => ({
      ...prevData,
      images: fileArray,
    }));
  };

  const sendData = async (e) => {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("eventname", formData.eventname);
    dataForm.append("eventdate", formData.eventdate);
    dataForm.append("eventdescription", formData.eventdescription);
    formData.images.forEach((file) => {
      dataForm.append('images', file);
    });

    try {
      if (isEditing) {
        await axios.put(
          `https://api.prothsahanteam.org/api/event/${editingId}`,
          dataForm
        );
        //   if (e.status === 200) {
        //     toast.success("Update Successfully")
        // }
      } else {
        let res = await axios.post("http://localhost:8000/api/event", dataForm);
        console.log(res)
        toast.success('Data Send Successfully')
      }
      setFormData({
        eventname: "",
        eventdate: "",
        eventdescription: "",
        images: []
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
      const res = await axios.get("https://api.prothsahanteam.org/api/event");
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
      images: event.images,
    });
  };

  const deleteEvent = async (_id) => {
    try {
      const res = await axios.delete(
        "https://api.prothsahanteam.org/api/event/" + _id
      );
      if (res.status === 200) {
        toast.success("Deletd Succssfully")
      }
      getApiData();
    } catch (error) {
      toast.error("Error")
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
          <div className="col-md-9 mb-5">
            <h2 className="mt-4 mb-5">
              {isEditing ? "EDIT EVENT" : "UPLOAD NEWS / EVENTS"}
            </h2>
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
                <div className="row">
                  <div className="col-md-12 mb-2">
                    <label htmlFor={`images`} className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      name="images"
                      className="form-control"
                      onChange={getFileData}
                      multiple
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-6 buttonsubmit">
                  <button
                    className="btn btn-success text-center mt-3"
                    type="submit"
                  >
                    {isEditing
                      ? "Update Event"
                      : "Submit & Upload Event Images"}
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
                  <th>Image Gallery</th>
                  {/* <th>Edit</th> */}
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
                    <td>
                      {item.images && item.images.slice(0, 3).map((image, idx) => (
                        <img key={idx} src={image} alt={`Image ${idx}`} style={{ width: '100px', height: 'auto', marginRight: '5px' }} />
                      ))}
                    </td>
                    {/* <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </td> */}
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteEvent(item._id);
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

export default Checkout;
