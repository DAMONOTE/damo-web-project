import React, { Component, PropTypes, useState, useEffect } from "react"
import RichTextEditor from "react-rte"
import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"
import { Link } from "react-router-dom"

const CREATE_POST = gql`
  mutation createPost($Token: String!, $GroupID: ID!, $Title: String, $Contents: String) {
    createPost(Token: $Token, GroupID: $GroupID, Title: $Title, Contents: $Contents) {
      _id
    }
  }
`

const UPLOAD_FILE = gql`
  mutation uploadImage($file: Upload!) {
    uploadImage(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`

const tempStyle = {
  position: "absolute",
  width: "1",
  height: "1",
  padding: "0",
  margin: "-1",
  overflow: "hidden",
  clip: "rect(0,0,0,0)"
}

function Editor() {
  const token = window.localStorage.getItem("auth")
  const groupid = window.localStorage.getItem("group")
  const [value, setValue] = useState(RichTextEditor.createEmptyValue())
  const [creatpost, {  }] = useMutation(CREATE_POST)
  const [uploadfile, {  }] = useMutation(UPLOAD_FILE)
  const [img, setImage] = useState(null);

  var onChange = (value) => {
    setValue(value)
  }

  var onClickUploadButton = () => {
    debugger
    creatpost({
      variables: {
        Token: token,
        GroupID: groupid,
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

  var onClickUploadImgButton = (e) => {
    uploadfile( {variables : {
      file : e.target.files[0]
    }}).then(({ loading, error, data }) => {
      debugger
      alert(data.uploadImage.filename)
    })
    .catch((reason) => {
      alert(reason)
    })
  }

  return (
    <div>
      <RichTextEditor value={value} onChange={onChange} />
      <button onClick={onClickUploadButton}>글쓰기</button>
      <div>
        <label for="file_upload">업로드</label>
        <input id="file_upload" type="file" style={tempStyle} onChange={onClickUploadImgButton} />
      </div>
    </div>
  )
}

export default Editor
