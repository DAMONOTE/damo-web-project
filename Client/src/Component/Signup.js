import React from "react"
import gql from "graphql-tag"
import { useMutation } from "react-apollo-hooks"
import { TextField, Button } from '@material-ui/core';

const SIGNUP_USER = gql`
  mutation signUpUser($AccountName: String!, $Password: String!,$Name: String!, $Email: String!) {
    signUpUser(AccountName: $AccountName, Password: $Password,Name: $Name, Email: $Email) {
      _id
      AccountName
    }
  }
`

/*const CREATE_GROUP = gql`
  mutation createGroup($GroupName: String!, $Token: String!) {
    createGroup(GroupName: $GroupName, Token: $Token) {
      _id
      GroupName
    }
  }
`*/

function Signup({ history }) {
  const [signupuser, { loading: usermutationLoading, error: usermutationError }] = useMutation(
    SIGNUP_USER
  )
  /*const [creategroup, { loading: creategroupLoading, error: creategroupError }] = useMutation(
    CREATE_GROUP
  )*/

  let email = ""
  let password = ""
  let accountname = ""
  let name = ""

  return (
    <div>
      <TextField id="accountname" label="AccountName" type="id" fullWidth autoFocus required
        onChange={(e) => { accountname = e.target.value }} />
      <TextField id="password" label="Password" type="password" fullWidth autoFocus required
        onChange={(e) => { password = e.target.value }} />
      <TextField id="name" label="Name" type="name" fullWidth autoFocus required
        onChange={(e) => { name = e.target.value }} />
      <TextField id="email" label="Email" type="email" fullWidth autoFocus required
        onChange={(e) => { email = e.target.value }} />
      <Button variant="outlined" color="primary" style={{ textTransform: "none" }}
        onClick={
          () => {
            signupuser({
              variables: {
                AccountName: accountname,
                Password: password,
                Name: name,
                Email: email,
              },
            })
              .then(({ loading, error, data }) => {
                alert("회원가입 되었습니다!")
                window.location.reload(false)
              })
              .catch((reason) => {
                alert(reason)
              })
          }
        }>SignUp</Button>
    </div>
  )
}

export default Signup
