import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const AddReview = () => {
    const [reviewData, setReviewData] = useState({
        title: "",
        content: ""
    })
    const navigate = useNavigate()
    const inputHandler = (e) => {
        setReviewData({ ...reviewData, [e.target.name]: e.target.value })
    }
    const formSubmit = async(e) => {
        e.preventDefault()
        console.log(reviewData);
        try {
           await axios.post("/api/review", reviewData).then((res)=>{
            if (res.status === 201) {
                
                navigate("/")
            }
           }).catch((e)=>{
            console.log("api",e);
           })
        } catch (error) {
            console.log(error);
        }
    }
    const resetForm = (e) => {
        e.preventDefault()
        setReviewData({
            title: "",
            content: ""
        })
    }
    const cancelFun = () => {
        setReviewData({
            title: "",
            content: ""
        })
        navigate("/")
    }

    return (
        <>
            <div className="container">
                <div className='ReivewHead review-page'>
                    <div className="review_head">
                        <h3>New Review</h3>
                    </div>
                    <form action="" className='FormBox' onSubmit={formSubmit} onReset={resetForm}>
                        <div className='inputTitle'>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" placeholder='Review Title' onChange={inputHandler} value={reviewData.title} required/>
                        </div>
                        <div className='inputContent'>
                            <label htmlFor="content">Content</label>
                            <textarea name="content" id="content" cols="30" rows="10" placeholder='Review Content' onChange={inputHandler} value={reviewData.content} required></textarea>
                        </div>
                        <div className='butttonGroup'>
                            <input type="submit" value="Add" className='submitBtn' />
                            <input type="reset" value="Reset" className='resetBtn' />
                            <button type="button" className='cancelBtn' onClick={cancelFun}>Cancel</button>

                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default AddReview