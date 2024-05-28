import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast/headless";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    jobpost: "",
    qualification: "",
    experience: "",
    packageanual: "",
    organisationname: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    contact: "",
    mobile: "",
    email: "",
  });


  const getInputfile = (e) => {
    const { name,value } = e.target;
    setData({ ...data, [name]:[value] });
  };
  const getApiData = async () => {
    try {
      let res = await axios.get("https://protsahan.onrender.com/api/job/" + _id);
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "https://protsahan.onrender.com/api/job/" + _id,data);
        console.log(res)
      if (res.status === 200) {
        toast.success("Product Updated created");
        navigate("/product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getApiData()
  }, []);
  return (
    <div className="container Allpagemargin">
      <div
        className="mt-5 mb-5"
        style={{ boxShadow: "0px 0px 37px 0px lightgray", padding: "2rem" }}
      >
        <h1 style={{ color: "#00C851", marginBottom: "2rem" }}>Edit Job Post Detail</h1>

        <form onSubmit={postData} action="">
          <div className="row" style={{ lineHeight: "34px" }}>
            <div className="col-md-12">
              <div>
                <label htmlFor="">Vacancy For (Post)</label>
                <input
                  onChange={getInputfile}
                  value={data.jobpost}
                  required
                  style={{ width: "100%" }}
                  type="text"
                  name="jobpost"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label htmlFor="">Edu. Qualification</label>
                <input
                  onChange={getInputfile}
                  required
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Edu. Qualification"
                  name="qualification"
                  value={data.qualification}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label htmlFor="">Experience</label>
                <input
                  onChange={getInputfile}
                  required
                  name="experience"
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Experience"
                  value={data.experience}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div>
                <label htmlFor="">Package Offered (annually)</label>
                <input
                  onChange={getInputfile}
                  required
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Package Offered (annually)"
                  name="packageanual"
                  value={data.packageanual}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div>
                <label htmlFor="">Organization Name</label>
                <input
                  onChange={getInputfile}
                  required
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Organization Name"
                  name="organisationname"
                  value={data.organisationname}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h4
              style={{ color: "#ff4444", marginBottom: "2rem" }}
              className="mb-2"
            >
              <u>Location</u>
            </h4>
            <div style={{ lineHeight: "33px" }} className="row">
              <div className="col-md-6">
                <label htmlFor="">Address</label>
                <textarea
                  class="form-control"
                  onChange={getInputfile}
                  name="address"
                  required
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  value={data.address}
                ></textarea>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="">State</label>
                  <input
                    onChange={getInputfile}
                    required
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="State"
                    name="state"
                    value={data.state}
                  />
                </div>
                <label htmlFor="">City</label>
                <input
                  onChange={getInputfile}
                  required
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="City"
                  name="city"
                  value={data.city}
                />
                <label htmlFor="">Pin/Zip Code</label>
                <input
                  onChange={getInputfile}
                  required
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Pin / Zip Code"
                  name="pincode"
                  value={data.pincode}
                />
              </div>
              <div className="col-md-12">
                <div>
                  <label htmlFor="">Contact Person</label>
                  <input
                    onChange={getInputfile}
                    required
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="Contact"
                    name="contact"
                    value={data.contact}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="">Mobile</label>
                  <input
                    onChange={getInputfile}
                    required
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Mobile"
                    name="mobile"
                    value={data.mobile}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    onChange={getInputfile}
                    required
                    style={{ width: "100%" }}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                  />
                </div>
              </div>
              <div>
                <h3 className="mt-3 mb-3" style={{ color: "#ff4444" }}>
                  <u>Terms & Conditions</u>
                </h3>
                <ul>
                  <li className="termcondition">
                    I, owner/ partner/ director of the organization hereby
                    certify the above mentioned current reqirement of my office
                    as on today, is confirmed.
                  </li>
                  <li className="termcondition">
                    I would like to thank prothsahanteam effort for putting my
                    requirement on their website free of cost to support youth
                    employment initiative.
                  </li>
                  <li className="termcondition">
                    I will verify all employees with my own resources and I know
                    there is no responsibility of prothsahanteam after providing
                    the resumes.
                  </li>
                </ul>
                <div className="text-center">
                  <button className="btn btn-success">Update Job Post</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
