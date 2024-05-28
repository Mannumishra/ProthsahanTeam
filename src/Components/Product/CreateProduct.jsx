import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast/headless';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
    const navigate = useNavigate()
    const [catedata, setCatedata] = useState([])
    const getApiData = async () => {
        try {
            let res = await axios.get("null/category")
            setCatedata(res.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    const [data, setData] = useState({
        name: '',
        category: '',
        sizes: [{ size: '', price: '', discountprice: '', finalprice: '', stock: '' }],
        productdetails: "",
        description: '',
        tag: '',
        pic1: '',
        pic2: '',
        pic3: '',
        pic4: ''
    });

    const getInputData = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const getInputfile = (e) => {
        const { name, files } = e.target;
        setData({ ...data, [name]: files[0] });
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...data.sizes];
        updatedSizes[index][field] = value;
        setData(prevData => ({ ...prevData, sizes: updatedSizes }));
    };

    const postData = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("category", data.category);
            formData.append("stock", data.stock);
            formData.append("description", data.description);
            formData.append("productdetails", data.productdetails);
            formData.append("tag", data.tag);
            formData.append("pic1", data.pic1);
            formData.append("pic2", data.pic2);
            formData.append("pic3", data.pic3);
            formData.append("pic4", data.pic4);
            data.sizes.forEach((size, index) => {
                formData.append(`sizes[${index}][size]`, size.size);
                formData.append(`sizes[${index}][price]`, size.price);
                formData.append(`sizes[${index}][discountprice]`, size.discountprice);
                formData.append(`sizes[${index}][finalprice]`, size.finalprice);
                formData.append(`sizes[${index}][stock]`, size.stock);
            });
            const res = await axios.post("null/product", formData);
            console.log(res);
            if (res.status === 200) {
                toast.success("New Product created")
                navigate("/product")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        getApiData()
    }, [])
    return (
        <div className="container-fluid" style={{ marginTop: 80 }}>
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <h1 className="mt-5">Add Product</h1>
                    <form onSubmit={postData} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Product Name:</label>
                            <input type="text" id="name" name="name" onChange={getInputData} className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="category">Select Category</label>
                            <select name="category" id="category" onChange={getInputData} className="form-control">
                                <option disabled>Chose Category</option>
                                {
                                    catedata.map((item, index) =>
                                        <option key={index}>{item.name}</option>
                                    )
                                }
                            </select>
                        </div>
                        {data.sizes.map((size, index) => (
                            <div key={index} className="mb-3">
                                <label htmlFor={`size${index + 1}`} className="form-label">Size {index + 1}:</label>
                                <input type="text" id={`size${index + 1}`} name={`size${index + 1}`} value={size.size} onChange={(e) => handleSizeChange(index, 'size', e.target.value)} className="form-control" required />
                                <label htmlFor={`price${index + 1}`} className="form-label">Price {index + 1}:</label>
                                <input type="number" id={`price${index + 1}`} name={`price${index + 1}`} value={size.price} onChange={(e) => handleSizeChange(index, 'price', e.target.value)} className="form-control" required />
                                <label htmlFor={`discountprice${index + 1}`} className="form-label">Discount Price {index + 1}:</label>
                                <input type="number" id={`discountprice${index + 1}`} name={`discountprice${index + 1}`} value={size.discountprice} onChange={(e) => handleSizeChange(index, 'discountprice', e.target.value)} className="form-control" required />
                                <label htmlFor={`finalprice${index + 1}`} className="form-label">Final Price {index + 1}:</label>
                                <input type="number" id={`finalprice${index + 1}`} name={`finalprice${index + 1}`} value={size.finalprice} onChange={(e) => handleSizeChange(index, 'finalprice', e.target.value)} className="form-control" required />
                                <label htmlFor={`stock${index + 1}`} className="form-label">Stock {index + 1}:</label>
                                <input type="text" id={`stock${index + 1}`} name={`stock${index + 1}`} value={size.stock} onChange={(e) => handleSizeChange(index, 'stock', e.target.value)} className="form-control" required />
                            </div>
                        ))}
                        <button type="button" onClick={() => setData(prevData => ({ ...prevData, sizes: [...prevData.sizes, { size: '', price: '', discountprice: '', finalprice: '', stock: '' }] }))} className="btn btn-dark mb-3">Add Size</button>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Productdetail:</label>
                            <textarea id="description" name="productdetails" rows="4" cols="50" onChange={getInputData} className="form-control"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea id="description" name="description" rows="4" cols="50" onChange={getInputData} className="form-control"></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag:</label>
                            <input type="text" id="tag" name="tag" onChange={getInputData} className="form-control" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pic1" className="form-label">Picture 1:</label>
                            <input type="file" name="pic1" onChange={getInputfile} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pic2" className="form-label">Picture 2:</label>
                            <input type="file" name="pic2" onChange={getInputfile} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pic3" className="form-label">Picture 3:</label>
                            <input type="file" name="pic3" onChange={getInputfile} className="form-control" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="pic4" className="form-label">Picture 4:</label>
                            <input type="file" name="pic4" onChange={getInputfile} className="form-control" />
                        </div>

                        <button type="submit" className="btn btn-dark w-100" style={{ marginBottom: 100 }}>Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
