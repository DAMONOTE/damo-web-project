import React, { Component, PropTypes, useState, useEffect } from "react"
import RichTextEditor from "react-rte"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"
import { Link } from "react-router-dom"

const CREATE_POST = gql`
  mutation createPost($Token: String!, $GroupID: ID!, $Title: String, $Contents: String) {
    createPost(Token: $Token, GroupID: $GroupID, Title: $Title, Contents: $Contents) {
      _id
    }
  }
`

function Editor() {
  const token = window.localStorage.getItem("auth")
  const [value, setValue] = useState(RichTextEditor.createEmptyValue())
  const [creatpost, { loading: loading, error: error }] = useMutation(CREATE_POST)

  var onChange = (value) => {
    setValue(value)
  }

  var onClickButton = () => {
    debugger
    creatpost({
      variables: {
        Token: token,
        GroupID: "5ed7905c28dfce321c348a35",
        Title: "fuck you",
        Contents: value.toString("html"),
      },
    })
      .then(({ loading, error, data }) => {
        alert("업로드 되었습니다!")
        window.location.reload(false)
      })
      .catch((reason) => {
        alert(reason)
      })
  }

  return (
    <div>
      <RichTextEditor value={value} onChange={onChange} />
      <button onClick={onClickButton}>글쓰기</button>
    </div>
  )
}

export default Editor
