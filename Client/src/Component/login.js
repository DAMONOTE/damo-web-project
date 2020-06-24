import React, { useState, useEffect } from "react"
import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { useMutation } from "@apollo/react-hooks"
import { useLocalStorage } from "../Basic/Utils"
import "./Login.css"

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
  const [token, setToken] = useLocalStorage("auth")
  const { loading, error, data } = useQuery(GET_USERINFO, {
    variables: { Token: token },
  })
  const [email, setEmail] = useState("email")
  const [password, setPassword] = useState("password")

  return (
    <div class="form">
      <ul class="tab-group">
        <li class="tab active">
          <a href="#login">Log In</a>
        </li>
        <li class="tab">
          <a href="#signup">Sign Up</a>
        </li>
      </ul>

      <div class="tab-content">
        <div id="login">
          <form action="/" method="post">
            <div class="field-wrap">
              <label>
                Email Address<span class="req">*</span>
              </label>
              <input
                type="email"
                id="logInEmail_id"
                required
                autocomplete="off"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>

            <div class="field-wrap">
              <label>
                Password<span class="req">*</span>
              </label>
              <input
                type="password"
                id="logInPassword_id"
                required
                autocomplete="off"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            <input type="checkbox" id="autoLogin" />
            <label for="autoLogin">Auto Login</label>

            <p class="forgot">
              <a href="#">Forgot Password?</a>
            </p>

            <div class="field-wrap">
              <input
                type="submit"
                onClick={() => {
                  signinuser({ variables: { AccountName: email, Password: password } })
                    .then(({ loading, error, data }) => {
                      alert("로그인 되었습니다!")
                      window.localStorage.setItem("auth", data.signInUser.AccessToken)
                      window.location.reload(false)
                    })
                    .catch((reason) => {
                      alert(reason)
                    })
                }}
                class="button button-block"
                value="submit"
                url=""
                required
                autocomplete="off"
              />
            </div>
          </form>
        </div>

        <div id="signup">
          <form action="/" method="post">
            <div class="field-wrap">
              <label>
                Name<span class="req">*</span>
              </label>
              <input type="text" id="name_id" required autocomplete="off" />
            </div>

            <div class="field-wrap">
              <label>
                Email Address<span class="req">*</span>
              </label>
              <input type="email" id="signUpEmail_id" required autocomplete="off" />
            </div>
            <div class="top-row">
              <div class="field-wrap">
                <label>
                  Set A Password<span class="req">*</span>
                </label>
                <input type="password" id="signUpPassword1_id" required autocomplete="off" />
              </div>
              <div class="field-wrap">
                <label>
                  Check A Password<span class="req">*</span>
                </label>
                <input type="password" id="signUpPassword2_id" required autocomplete="off" />
              </div>
            </div>

            <input
              type="submit"
              class="button button-block"
              onClick={() => alert("loading")}
              value="Get Started"
              url=""
              required
              autocomplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
