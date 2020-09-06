import React, { Component, PropTypes, useState, useEffect } from "react"
import gql from "graphql-tag"
import Sidebar from "./Sidebar"
import SidebarTest from "./SidebarTest"
import { useQuery } from "react-apollo-hooks"
import SignBox from "./SignBox"

const SIGNIN_TOKEN = gql`
  query signInToken($Token: String!) {
    signInToken(Token: $Token) {
      AccessToken
    }
  }
`

function Main() {
  const token = window.localStorage.getItem("auth")
  debugger
  const { loading, error, data } = useQuery(SIGNIN_TOKEN, {
    variables: { Token: token },
  })
  if (loading) return <p>로딩 중...</p>
  else if (error) {
    return <SignBox></SignBox>
    /*return (<p>{error.graphQLErrors.map(({ message }, i) => (
      <span key={i}>{message}</span>))}</p>)*/
  } else if (data.signInToken.AccessToken) {
    window.localStorage.setItem("auth", data.signInToken.AccessToken)
    return <SidebarTest></SidebarTest>
  } else {
    return <SignBox></SignBox>
  }
}

export default Main
