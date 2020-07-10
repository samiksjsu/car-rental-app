import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = ({ currentCars, loading }) => {
    // if (loading) return <div className="spinner-border text-danger"></div>
    console.log(currentCars)
    return (
        <ul className="list-group mb-4">
            {
                currentCars.map((currentCar) => (
                    <li key={currentCar} className="list-group-item">
                        {currentCar}
                    </li>
                ))
            }
        </ul>
    )
}

export default Posts