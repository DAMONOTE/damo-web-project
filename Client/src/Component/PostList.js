import React from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { useLocalStorage } from "../Basic/Utils"
import PostElement from "./PostElement"
import "../Component/PostList.css"
import { Link } from "react-router-dom"

const GET_POSTS = gql`
  query listPost($Token: String!, $GroupID: ID!, $Amount: Int, $Page: Int) {
    listPost(Token: $Token, GroupID: $GroupID, Amount: $Amount, Page: $Page) {
      _id
      Title
    }
  }
`

function onClickPost() {
  console.log("Post Clicked!")
}

function PostList() {
  const token = window.localStorage.getItem("auth")
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      Token: token,
      GroupID: "5ed7905c28dfce321c348a35",
      Amount: 100,
      Page: 1,
    },
  })
  if (loading) return <p>로딩 중...</p>
  else if (error) {
    return (
      <p>
        {error.graphQLErrors.map(({ message }, i) => (
          <span key={i}>{message}</span>
        ))}
      </p>
    )
  } else {
    const elements = []
    //for (let i in data.listPost) {
    for (let i = 0; i < data.listPost.length; i++) {
      elements.push(
        <li>
          <PostElement
            onClick={onClickPost}
            id={data.listPost[i]._id}
            title={data.listPost[i].Title}
            contents={data.listPost[i].Contents}
          />
          {/*<PostElement onClick={onClickPost} title={i} contents="" />*/}
        </li>
      )
    }
    return (
      <div className="body">
        <Link className="listbutton" to="/Editor">
          Post작성
        </Link>
        <ul class="timeline">{elements}</ul>
      </div>
    )
  }
}

export default PostList
