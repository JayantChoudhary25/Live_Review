import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../Socket";
import { toast } from "react-toastify";

const headItems = ["S. No.", "Title", "Content", "Date", "Action"];

const Review = () => {
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [searchData, setSearchData] = useState("")

    const getAllData = () => {
        const options = {
            method: "GET",
            url: `/api/review/?search=${searchData}`
        };
        axios
            .request(options)
            .then((response) => {
                if (response.status === 200) {
                    setAllData(response?.data?.data);
                } else {
                    return;
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        getAllData();
    }, [searchData]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server");
        });

        // Listen for new reviews
        socket.on("newReview", () => {
            console.log("Received event from server..");
            getAllData();
        });

        // Listen for updated reviews
        socket.on("updatedReview", () => {
            console.log("Received event from server..");
            getAllData();
        });

        // Listen for deleted reviews
        socket.on("deletedReview", () => {
            console.log("Received event from server..");
            getAllData();
        });

        return () => {
            socket.off("connect");
            socket.off("newReview");
            socket.off("updateReview");
            socket.off("deleteReview");
        };

    }, []);

    const deleteHandler = async(id) =>{
        try {
            await axios.delete(`/api/review/${id}`).then((res)=>{
                if (res.data.success) {
                    toast.success("Delete Successfully!!!")
                    getAllData()
                }
            }).catch((e)=>{
                console.log("Error:",e);
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="review_page container">
                <div className="review_head ReviewHeadgroup">
                    <h3>Review</h3>
                    <button className="cancelBtn" onClick={() => navigate("/new")}>Create New Review</button>
                </div>

                <div className="review_table">
                    <input type="search" className="inputSearch" placeholder="Search" onChange={(e) =>{setSearchData(e.target.value)}} />
                    <table>
                        <thead>
                            <tr className=" ">
                                {headItems.map((items, inx) => (
                                    <th key={inx}>
                                        <p> {items}</p>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {allData?.length > 0 &&
                                allData?.map((items, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{items?.title}</td>
                                        <td>{items?.content}</td>
                                        <td>{new Date(items?.datetime).toLocaleString()}</td>
                                        <td>
                                            <div className="review_btn">
                                                <button
                                                    className="submitBtn"
                                                    onClick={() => navigate(`/edit-review/${items?._id}`)}
                                                >
                                                    Edit
                                                </button>

                                                <button type='button' className='resetBtn' onClick={()=>deleteHandler(items?._id)}>Delete</button> 
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default Review;
