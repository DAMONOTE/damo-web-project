import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Fab from "@material-ui/core/Fab"
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import TrendingFlat from '@material-ui/icons/TrendingFlat';

import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"
import { Link } from "react-router-dom"

const useStyles = makeStyles(theme => ({
    root: {
        padding: 30,
    },
    fab:{
        position: "fixed",
        right:10,
        bottom:10,
    },
}));

const GET_POSTS = gql`
  query listPost($Token: String!, $GroupID: ID!, $Amount: Int, $Page: Int) {
    listPost(Token: $Token, GroupID: $GroupID, Amount: $Amount, Page: $Page) {
      _id
      Title
    }
  }
`

function Posts(props) {
    const classes = useStyles();
    const token = window.localStorage.getItem("auth")
    const groupid = window.localStorage.getItem("group")
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: {
            Token: token,
            GroupID: groupid,
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
    const posts = []
    //for (let i in data.listPost) {
    for (let i = 0; i < data.listPost.length; i++) {
        posts.push(
            {
                id:data.listPost[i]._id,
                title:data.listPost[i].Title,
                contents:data.listPost[i].Contents,
                image:'https://picsum.photos/200/300?random=1'
            }
      )
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                {posts.map(post => (
                    <Grid item xs={16} sm={6} md={4} key={post.title}>
                        <Link to={`/Post/${post.id}`} >
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Post Image"
                                    height="160"
                                    image={post.image}
                                    title="Post Image"
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {post.title}
                                    </Typography>
                                    <Typography variant="body2" component="p">{post.contents}</Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Read More <TrendingFlat/>
                                </Button>
                            </CardActions>
                        </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Link to='/Editor'> 
                <Fab className={classes.fab}/>
            </Link>
        </div>
    );
    }
}

export default Posts;