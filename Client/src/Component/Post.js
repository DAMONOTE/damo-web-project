import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useLocalStorage } from "../Basic/Utils";
import { useParams } from "react-router-dom";
import gql from "graphql-tag";

const GET_POSTINFO = gql`
  query readPost($Token: String!, $PostID: ID!) {
    readPost(Token: $Token, PostID: $PostID) {
      Title
      Contents
    }
  }
`;

function Post() {
  const token = window.localStorage.getItem('auth')
  let { id } = useParams()
  debugger
  const { loading, error, data } = useQuery(GET_POSTINFO, {
    variables: { Token: token, PostID: id },
  });
  if (loading) return <p>로딩 중...</p>;
  else if (error) { 
    return <p>{error.graphQLErrors.map(({ message }, i) => (
      <span key={i}>{message}</span>))}</p>;
  }
  else {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: data.readPost.Contents }}/>
    </div>
  );
  }
}

export default Post;
