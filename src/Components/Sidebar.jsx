import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const loginvalue = sessionStorage.getItem("login")
    return (
        <>
            <div className="list-group mt-3" style={{lineHeight:'31px'}}>
               {
                loginvalue? <Link to="/home" className="list-group-item list-group-item-action">Home</Link>:
                <Link to="/" className="list-group-item list-group-item-action">Home</Link>
               }
                <Link to="/view-registration" className="list-group-item list-group-item-action list-group-item-primary">View Registration</Link>
                <Link to="/view-enquiry" className="list-group-item list-group-item-action list-group-item-secondary">View Enquiry</Link>
                <Link to="/upload-news-events" className="list-group-item list-group-item-action list-group-item-success">Upload News / Events</Link>
                <Link to="/category" className="list-group-item list-group-item-action list-group-item-danger">Upload Photo Gallery</Link>
                <Link to="/product" className="list-group-item list-group-item-action list-group-item-light">Employer Zone</Link>
                <Link to="/testimonial" className="list-group-item list-group-item-action list-group-item-dark">Employee Zone</Link>
                <Link to="/contact" className="list-group-item list-group-item-action list-group-item-warning">View Donor</Link>
                 <Link to="/login" className="list-group-item list-group-item-action list-group-item-info">LogOut</Link>
                {/* <Link to="/" className="list-group-item list-group-item-action list-group-item-dark"></Link> */}
                {/* <Link to="/order" className="list-group-item list-group-item-action list-group-item-danger">Order Section</Link> */}
            </div>
        </>
    )
}

export default Sidebar