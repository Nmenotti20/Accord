import React from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import BusinessOwner from "../images/Petersons_Donughts_Img.png";
import { Card } from "react-bootstrap";
import Feed from "../components/Feed";
import StarRating from "../components/StarRating";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

function BizProfile() {
  return (
    <div>
      <div className="d-flex justify-content-center h-100">
        <Card className="card" style={{ height: "auto", width: "auto" }}>
          <Card.Img variant="top" src={BusinessOwner} />
          <Card.Body>
            <Card.Title>Business Name</Card.Title>
            <Card.Text>
              A brief description of goods/ services offered.
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <div className="form-group">
              <Card.Link href="#">Business Website Link</Card.Link>
              <div className="post_options">
                <div className="post_option">
                  <StarRating />
                </div>
                <div className="post_option">
                  <ChatBubbleOutlineIcon />
                  <p>View Comments</p>
                </div>
              </div>
              <input
                type="submit"
                value="Edit Profile"
                className="btn float-right edit_btn"
              />
            </div>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </Card.Body>
        </Card>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default withRouter(BizProfile);
