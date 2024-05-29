import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'

const Home = () => {
    return (
        <>
            <div className="container-fluid" style={{ marginTop: 70 }}>
                <div className="row">
                    <div className="side col-md-3 bg-dark">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home