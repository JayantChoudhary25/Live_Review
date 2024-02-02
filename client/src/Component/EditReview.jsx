import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const EditReview = () => {
    const [reviewData, setReviewData] = useState({
        title: "",
        content: ""
    })
    const {id} = useParams()
    const navigate = useNavigate()
    const inputHandler = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value })
    }
    const formSubmit = async(e) => {
        e.preventDefault()
        // console.log(reviewData);
        try {
            await axios.put(`/api/review/${id}`,reviewData).then((res)=>{
                console.log(res.data);
                if (res.data.success) {
                    navigate("/")
                }
                
            }).catch((e)=>{
                console.log("apiget",e);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const cancelFun = () => {
        setReviewData({
            title: "",
            content: ""
        })
        navigate("/")
    }
    const deleteHandler = async() =>{
        try {
            await axios.delete(`/api/review/${id}`).then((res)=>{
                // console.log(res.data.data);
                if (res.data.success) {
                    toast.success("Delete Successfully!!!")
                    setTimeout(() => {
                        navigate("/")
                        
                    }, 500);
                }
            }).catch((e)=>{
                console.log("apiget",e);
            })
        } catch (error) {
            console.log(error);
        }
    }
    const defaultApi = async() =>{
        try {
            await axios.get(`/api/review/${id}`).then((res)=>{
                // console.log(res.data.data);
                setReviewData(res.data.data)
            }).catch((e)=>{
                console.log("apiget",e);
            })
        } catch (error) {
            console.log(error);
        }
    }
    // console.log(id);
    useEffect(() => {
        defaultApi()
    }, [])
    
    return (
        <div className="container">
            <div className='ReivewHead review-page'>
                <div className="review_head">
                    <h3>Edit Review</h3>
                </div>
                <form action="" className='FormBox' onSubmit={formSubmit} >
                    <div className='inputTitle'>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" id="title" placeholder='Review Title' onChange={inputHandler} value={reviewData.title} />
                    </div>
                    <div className='inputContent'>
                        <label htmlFor="content">Content</label>
                        <textarea name="content" id="content" cols="30" rows="10" placeholder='Review Content' onChange={inputHandler} value={reviewData.content}></textarea>
                    </div>
                    <div className='butttonGroup'>
                        <input type="submit" value="Update" className='submitBtn' />
                        {/* <input type="reset" value="Reset" className='resetBtn' /> */}
                        <button type='button' className='resetBtn' onClick={deleteHandler}>Delete</button> 
                        <button type="button" className='cancelBtn' onClick={cancelFun}>Cancel</button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default EditReview