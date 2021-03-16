import React, { useState, useEffect, useContext, useRef } from 'react';
import UserContext from '../utils/Context/UserContext';
import "./style.css";
import SearchIcon from "@material-ui/icons/Search";
import BusinessOwner from '../images/Petersons_Donughts_Img.png';
import { Card, CardColumns, Modal } from "react-bootstrap";
import { FaStar } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import API from '../utils/API/userAPI';
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";


const Landing = () => {
    const [businesses, setBusinesses] = useState([]);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [reviewBusiness, setReviewBusiness] = useState({});
    const [viewBusiness, setViewBusiness] = useState({
        reviews: []
    });
    const { token, loggedInAs, name, image} = useContext(UserContext);
    const [modalContent, setModalContent] = useState(() => {
        return (
            'please sign in'
        )
    })
    const reviewTitleRef = useRef();
    const reviewRef = useRef();
    const ratingRef = useRef();


    function useDebounce(value, delay) {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value)
            }, delay)

            return () => {
                clearTimeout(handler)
            };
        }, [value, delay])

        return debouncedValue
    }

    const debouncedSearchTerm = useDebounce(search, 500)

    useEffect(() => {
        if (!search) {
            API.findAllBusinesses()
                .then(res => setBusinesses(res.data))
                .catch(err => console.log(err))
        } else if (debouncedSearchTerm) {
            searchBusinesses(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm]);

    function searchBusinesses(search) {
        API.findBusinesses(search)
            .then(res => setBusinesses(res.data))
            .catch(err => console.log(err))
    }

    function handleInputChange(e) {
        setSearch(e.target.value)
    }

    function submitReview(e) {
        e.preventDefault();
        API.makeReview({
            businessId: reviewBusiness.uuid,
            title: reviewTitleRef.current.value,
            message: reviewTitleRef.current.value,
            rating: ratingRef.current.value
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
            setModalContent(() => {
                return (
                    <div>
                        <Card.Img src={`/api/uploads/${reviewBusiness.image}`} />
                        <h1>{reviewBusiness.companyName}</h1>
                        <h4>{reviewBusiness.service}</h4>
                        <form onSubmit={submitReview}>
                            <StarRating />
                            <label>Select Rating</label>
                            <select className="form-select" ref={ratingRef}>
                                <option defaultValue>Select a Rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <br/>
                            <label>Title your review</label>
                            <input className="form-control" ref={reviewTitleRef} />
                            <label>Leave you review here</label>
                            <textarea className="form-control" rows="3" ref={reviewRef}></textarea>
                            <button className="btn btn-primary" type='submit'>Submit Review</button>
                        </form>
                    </div>
                )
            })
    }, [reviewBusiness])

    useEffect(() => {
            setModalContent(() => {
                return (
                    <div>
                            <Card.Img src={`/api/uploads/${viewBusiness.image}`} />
                            <h1>{viewBusiness.companyName}</h1>
                            <h4>{viewBusiness.service}</h4>
                            <h5>{viewBusiness.streetAddress}</h5>
                            <h5>{viewBusiness.city}, {viewBusiness.state} {viewBusiness.zipCode}</h5>
                            <br/>
                            <h5>Phone: {viewBusiness.phone}</h5>
                            <h5><a href={viewBusiness.website}>{viewBusiness.website}</a></h5>
                            {showReviews(viewBusiness.reviews)}
                    </div>
                )
            })
    }, [viewBusiness])

    function showReviews(reviews) {
        if (reviews.length) {
            return (
                <div style={{height: '200px', overflowY: 'scroll'}}>
                    <h3 style={{textDecoration: 'underline'}}>Reviews</h3>
                    {
                        reviews.map(review => (
                                <div key={review.id} className="border p-2">
                                    <h5>{review.title}</h5>
                                    <p>{review.message}</p>
                                </div>
                            )
                        )
                    }
                </div>
                
            )
        } else {
            return (
                <h3 style={{textDecoration: 'underline'}}>This business has no reviews yet</h3>
            )
        }
    }

    function reviewOnClick(e) {
        setShowModal(true);
        if (token && name && loggedInAs === 'user' && image) {
            setReviewBusiness(businesses[e.target.id])
            API.findAllBusinesses()
                .then(res => setBusinesses(res.data))
                .catch(err => console.log(err))
        } else {
            setModalContent(() => {
                return <h1>please log in as shopper to leave a review</h1>
            })
        }
    }

    function seeReviewsOnClick(e) {
        console.log(businesses[e.target.id])
        setViewBusiness(businesses[e.target.id])
        setShowModal(true);
    }

    return (
        <div>
            <div className="header_input mt-5">
                <SearchIcon />
                <input onChange={handleInputChange} placeholder="Search Small Business" type="text" />
            </div>
            <div>
                <CardColumns>
                    {
                        businesses.map((business, index) => (
                            <Card key={business.uuid}>
                                <Card.Img variant="top" src={`/api/uploads/${business.image}`} />
                                <Card.Body>
                                    <Card.Title className="rem2">{business.companyName}</Card.Title>
                                    <Card.Text>
                                        {business.service}
                                    </Card.Text>
                                    <Card.Text>
                                        {business.streetAddress}
                                        <br />
                                        {business.city}, {business.state} {business.zipCode}
                                        <br />
                                        {business.phone}
                                    </Card.Text>
                                    <Card.Text>
                                        <Card.Link href={business.website}>{business.website}</Card.Link>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <StarRating />
                                    <div className="post_option float-left" id={index} onClick={seeReviewsOnClick} style={{cursor: 'pointer'}}>
                                        <p id={index}>See Reviews</p>
                                    </div>
                                    <div className="post_option float-right" id={index} onClick={reviewOnClick} style={{cursor: 'pointer'}}>
                                        <ChatBubbleOutlineIcon id={index} />
                                        <p id={index}>Post a Review</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </CardColumns>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} style={{ opacity: 1 }}>
                {
                    modalContent
                }
            </Modal>
            <div className="container"></div>
        </div>
    );
}

export default Landing;