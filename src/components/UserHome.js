
import React, { useEffect, useState } from "react";

export default function UserHome() {
    const logOut = () => {
        window.localStorage.clear();
        window.location.href = './sign-in';
    };
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the search when the form is submitted
        // You can use the searchText state to perform the search
    };
    const [isPdfUploaded, setIsPdfUploaded] = useState(false); // State to track whether PDF is uploaded

    const handleFileUpload = () => {
        // Handle the PDF upload logic here

        // If the upload is successful, set isPdfUploaded to true
        setIsPdfUploaded(true);
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid p-3 mb-2 bg-primary-subtle text-emphasis-primary text-center">
                    <button type="button" className="btn btn-primary">back</button>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Dropdown
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        </ul>
                        <img
                            src="https://cdn.mgmtech.org/static/mgmu.ac.in/assets/images/LogoMGM.svg"
                            className="img-fluid"
                            alt="MGM University Logo"
                            style={{ width: '8%' }}
                        />

                        <div className="row row-cols-2" style={{ marginRight: '0.3%', color: '#673700' }}>
                            <h1 style={{ marginLeft: '15px', fontWeight: 'bold' }}>MGM</h1>
                        </div>

                        <div className="row row-cols-2" style={{ marginRight: '18%', color: '#673700' }}>
                            <h1 style={{ fontWeight: 'bold' }}>UNIVERSITY</h1>
                        </div>


                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>


                    </div>
                </div>
            </nav>



            <div className="container-fluid">
                <div className="row">
                    {/* First Part */}
                    <div className="col-1 bg-light">

                        <div className="row row-cols-2" style={{ backgroundColor: '#0e0171', color: 'white', marginBottom: '15px' }}>

                            <h2>Marks</h2>
                        </div>
                        <div className="col">
                            <div className="circle-button">0</div>
                            <div className="circle-button">1</div>
                        </div>
                        <div className="col">
                            <div className="circle-button">2</div>
                            <div className="circle-button">3</div>
                        </div>
                        <div className="col">
                            <div className="circle-button">4</div>
                            <div className="circle-button">5</div>
                        </div>
                        <div className="col">
                            <div className="circle-button">6</div>
                            <div className="circle-button">7</div>
                        </div>
                        <div className="col">
                            <div className="circle-button">8</div>
                            <div className="circle-button">9</div>
                        </div>
                        <div className="col">
                            <div className="circle-button">10</div>
                            <div className="circle-button">1/2</div>
                        </div>

                        <button type="button" className="btn btn-success">
                            <i className="bi bi-check2" style={{ color: 'white' }}></i>
                        </button>
                        <button type="button" className="btn btn-danger">
                            <i className="bi bi-x-circle"></i>
                        </button>


                    </div>

                    {/* Second Part */}
                    <div className="col-8" style={{ backgroundColor: '#e0e0e0' }}>

                        <nav aria-label="...">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                    <span className="page-link">Previous</span>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item active" aria-current="page">
                                    <span className="page-link">2</span>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                        <div>
                            <input
                                className="form-control form-control-lg"
                                id="formFileLg"
                                type="file"
                                onChange={handleFileUpload}
                            />
                            {isPdfUploaded && (
                                <div className="alert alert-success" role="alert">
                                    Pdf uploaded successfully!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Third Part */}
                    <div className="col-3 bg-light">

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ backgroundColor: 'darkblue', color: 'white' }}>Questions</th>
                                    <th scope="col" style={{ backgroundColor: 'darkblue', color: 'white' }}>Out of</th>
                                    <th scope="col" style={{ backgroundColor: 'darkblue', color: 'white' }}>Score</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><button type="button" className="btn btn-primary">Q1</button></td>
                                    <td>10</td>
                                    <td>8</td>
                                </tr>
                                <tr>
                                    <td><button type="button" className="btn btn-primary">Q2</button></td>
                                    <td>15</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td><button type="button" className="btn btn-primary">Q3</button></td>
                                    <td>10</td>
                                    <td>7</td>
                                </tr>
                                <tr>
                                    <td><button type="button" className="btn btn-primary">Q4</button></td>
                                    <td>12</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td><button type="button" className="btn btn-primary">Q5</button></td>
                                    <td>8</td>
                                    <td>6</td>
                                </tr>
                                <tr>
                                    <td><button type="button" className="btn btn-primary">Q6</button></td>
                                    <td>10</td>
                                    <td>9</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button">Calculate Total Score:</button>
                            <div className="d-flex">
                                <button type="button" className="btn1 btn btn-primary btn-sm">Reject Paper</button>
                                <button type="button" className="btn2 btn btn-primary btn-sm">Finish Paper</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
