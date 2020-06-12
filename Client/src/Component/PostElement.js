import React from "react";
import { Link } from "react-router-dom";
import '../Component/PostList.css'

function PostElement({ onClick, id, title, contents }) {
  return (
    <Link to={`/Post/${id}`} onClick={onClick}>
      <div class="avatar">
        <img src="http://www.croop.cl/UI/twitter/images/doug.jpg" />
        <div class="hover">
          <div class="icon-twitter"></div>
        </div>
      </div>
      <div class="bubble-container">
        <div class="bubble">
          <div class="retweet">
            <div class="icon-retweet"></div>
          </div>
          <h3>{title}</h3>
          <br />
          {contents}
          <div class="over-bubble">
            <div class="icon-mail-reply action"></div>
            <div class="icon-retweet action"></div>
            <div class="icon-star"></div>
          </div>
        </div>

        <div class="arrow"></div>
      </div>
    </Link>
  );
}

export default PostElement;
