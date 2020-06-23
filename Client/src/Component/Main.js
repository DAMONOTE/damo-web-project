import React, { Component, PropTypes, useState, useEffect } from "react"
import gql from "graphql-tag"
import { useLocalStorage } from "../Basic/Utils"
import Sidebar from "./Sidebar"
import { useMutation } from "@apollo/react-hooks"
import { useQuery } from "@apollo/react-hooks"
import Login from "./login"

const SIGNIN_TOKEN = gql`
  query signInToken($Token: String!) {
    signInToken(Token: $Token) {
      AccessToken
    }
  }
`

function Main({ history }) {
  const token = window.localStorage.getItem("auth")
  debugger
  const { loading, error, data } = useQuery(SIGNIN_TOKEN, {
    variables: { Token: token },
  })
  if (loading) return <p>로딩 중...</p>
  else if (error) {
    debugger
    console.log("asdasd2")
    return <Login></Login>
    /*return (<p>{error.graphQLErrors.map(({ message }, i) => (
      <span key={i}>{message}</span>))}</p>)*/
  } else if (data.signInToken.AccessToken) {
    debugger
    window.localStorage.setItem("auth", data.signInToken.AccessToken)
    return <Sidebar></Sidebar>
  } else {
    console.log("asdasd")
    return <Login></Login>
  }
}

export default Main
