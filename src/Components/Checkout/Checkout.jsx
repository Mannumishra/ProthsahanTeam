import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const [data, setData] = useState([]);
  // const navigate = useNavigate()
  const getApiData = async () => {
    try {
      let res = await axios.get("null/checkout");
      console.log(res);
      setData(res.data.data);
    } catch (error) {}
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
            <h2 className="mt-4 mb-5">UPLOAD NEWS / EVENTS</h2>
            <form action="">
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Event Name:</div>
                <div className="col-md-4">
                  <input id="date" class="form-control" type="text" />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Event Date:</div>
                <div className="col-md-4">
                  <input id="date" class="form-control" type="date" />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Description</div>
                <div className="col-md-4">
                  <textarea id="date" class="form-control" type="date" />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-2">Press Release</div>
                <div className="col-md-4">
                  <input id="date" class="form-control" type="file" />
                </div>
              </div>
              <div className="row mb-3 d-flex justify-content-center">
                <div className="col-md-6">
                 <button className="btn btn-success text-center">Submit & Upload Event Images</button>
                </div>
              </div>
            </form>
            {/* <div className="row">
              <div className="col-md-6">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p>Event Name :</p>
                  </div>
                  <div>
                    <input id="date" class="form-control" type="text" />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p>Event Date :</p>
                  </div>
                  <div>
                    <input id="date" class="form-control" type="date" />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p>Description :</p>
                  </div>
                  <div class="form-floating">
                    <textarea
                      class="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                    ></textarea>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p>Press Release :</p>
                  </div>
                  <div class="form-floating">
                    <input
                      class="form-control form-control-sm"
                      id="formFileSm"
                      type="file"
                    />
                  </div>
                </div>
              </div>
            </div> */}
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
                {data.reverse().map((item, index) => {
                  return (
                    <tr key={index}>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
