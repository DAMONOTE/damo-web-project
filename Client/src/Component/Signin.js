import React from "react"
import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"
import { TextField, Button } from '@material-ui/core';

const SIGNIN_USER = gql`
  mutation signInUser($AccountName: String!, $Password: String!) {
    signInUser(AccountName: $AccountName, Password: $Password) {
      AccessToken
    }
  }
`

const GET_USERINFO = gql`
  query getUserInfo($Token: String!) {
    getUserInfo(Token: $Token) {
      AccountName
    }
  }
`

function Login({ history }) {
  const [signinuser, { loading: usermutationLoading, error: usermutationError }] = useMutation(
    SIGNIN_USER
  )
  let password = ""
  let accountname = ""

  return (
    <div>
      <TextField id="username" label="Username" type="email" fullWidth autoFocus required 
      onChange={(e) => { accountname = e.target.value }}/>
      <TextField id="password" label="Password" type="password" fullWidth autoFocus required 
      onChange={(e) => { password = e.target.value }}/>
      <Button variant="outlined" color="primary" style={{ textTransform: "none" }}
      onClick={
        () => {
            signinuser({
                variables: {
                  AccountName: accountname,
                  Password: password
                },
              })
                .then(({ loading, error, data }) => {
                  alert("로그인 되었습니다!")
                  window.localStorage.setItem("auth", data.signInUser.AccessToken)
                  window.location.reload(false)
                })
                .catch((reason) => {
                  alert(reason)
                })
        }}>Login</Button>
    </div>
  )
}

export default Login
