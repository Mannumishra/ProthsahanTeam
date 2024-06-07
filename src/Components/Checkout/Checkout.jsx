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
    image: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
    image7: "",
    image8: "",
    image9: "",
    image10: "",
    pdf: "",
    name: "",
    address: "",
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
    dataForm.append("image1", formData.image1);
    dataForm.append("image2", formData.image2);
    dataForm.append("image3", formData.image3);
    dataForm.append("image4", formData.image4);
    dataForm.append("image5", formData.image5);
    dataForm.append("image6", formData.image6);
    dataForm.append("image7", formData.image7);
    dataForm.append("image8", formData.image8);
    dataForm.append("image9", formData.image9);
    dataForm.append("image10", formData.image10);
    dataForm.append("name", formData.name);
    dataForm.append("address", formData.address);
    dataForm.append("pdf", formData.pdf);
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
       let res =  await axios.post("https://api.prothsahanteam.org/api/event", dataForm);
        console.log(res)
        toast.success('Data Send Successfully')
      }
      setFormData({
        eventname: "",
        eventdate: "",
        eventdescription: "",
        image: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        image6: "",
        image7: "",
        image8: "",
        image9: "",
        image10: "",
        pdf: "",
        name: "",
        address: "",
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
      image: event.image,
      image1: event.image1,
      image2: event.image2,
      image3: event.image3,
      image4: event.image4,
      image5: event.image5,
      image6: event.image6,
      image7: event.image7,
      image8: event.image8,
      image9: event.image9,
      image10: event.image10,
      pdf: event.pdf,
      name: event.name,
      adddress: event.address,
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
      // console.log(error);
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
                <div className="col-md-2">Image Name:</div>
                <div className="col-md-4">
                  <input
                    // id="image"
                    className="form-control"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={getInputData}
                  />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Image Address</div>
                <div className="col-md-4">
                  <input
                    // id="image"
                    className="form-control"
                    name="address"
                    type="text"
                    onChange={getInputData}
                    value={formData.address}
                  />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Image Gallery:</div>
                <div className="col-md-4">
                  <input
                    // id="image"
                    className="form-control"
                    name="image"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image1"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image2"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image3"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image4"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image5"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image6"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image7"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image8"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image9"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    // id="image"
                    className="form-control"
                    name="image10"
                    type="file"
                    onChange={getFileData}
                  />
                </div>
              </div>
              <div className="row mt-5 d-flex justify-content-center">
                <div className="col-md-2">Press Release:</div>
                <div className="col-md-4">
                  <input
                    // id="image"
                    className="form-control"
                    name="pdf"
                    type="file"
                    onChange={getFileData}
                  />
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
                  <th>Press Release</th>
                  <th>Image Gallery</th>
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
                    <td>
                      <Link
                        to={`https://api.prothsahanteam.org/${item.pdf}`}
                      ></Link>
                      <object
                        data={`https://api.prothsahanteam.org/${item.pdf}`}
                        type="application/pdf"
                        width="100%"
                      >
                        <a href={`https://api.prothsahanteam.org/${item.pdf}`}>
                          Download PDF
                        </a>
                      </object>
                    </td>
                    <td>
                      <img src={item.image} alt="" height={100} />
                    </td>
                    <td>
                      <button
                        className="btn btn-success"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </td>
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
