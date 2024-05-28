import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateBanare = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [data, setData] = useState({
    image: ''
  });

  const getFileData = (e) => {
    const { name, files } = e.target;
    setData({ ...data, [name]: files[0] });
  };

  const formData = new FormData();
  formData.append('image', data.image);

  const getApiData = async () => {
    try {
      const res = await axios.get(`null/banare/${_id}`)
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`null/banare/${_id}`, formData)
      if (res.status === 200) {
        toast.success('Banare Updated successfully');
        navigate('/banare');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <div className="container-fluid"  style={{marginTop:80}}>
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h2 className='bg-primary p-2 text-light text-center'>Update Banare</h2>
            <div className="form-container">
              <form onSubmit={postData}>
                <input type="file" name="image" id="" onChange={getFileData} /><br />
                <button className='btn btn-success mt-2'>Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateBanare;
