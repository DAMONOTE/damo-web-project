import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Editor from './Editor'
import PostList from './PostList'
import Post from './Post'
import CardPosts from './CardPosts'
import { Route, BrowserRouter as Router, Link, Switch, Redirect } from "react-router-dom";

import gql from "graphql-tag"
import { useQuery } from "react-apollo-hooks"

const GET_USERINFO = gql`
  query getUserInfo($Token: String!) {
    getUserInfo(Token: $Token) {
        Gid
    }
  }
`

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        marginTop: 50,
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ResponsiveDrawer(props) {
    const { propwindow } = props
    const token = window.localStorage.getItem("auth")
    const classes = useStyles()
    const theme = useTheme()
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const { loading, error, data } = useQuery(GET_USERINFO, {
        variables: { Token: token },
    })

    if (loading) return <p>로딩 중...</p>
    else if (error) {
        return (<p>
            {error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
            ))}
        </p>)
    } else if (data.getUserInfo) {
        window.localStorage.setItem("group", data.getUserInfo.Gid[0])
        debugger
    } else {

    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <ListItem button key="Editor" component={Link} to="/Editor">
                    <ListItemText primary="Editor" />
                </ListItem>
                <ListItem button key="Posts" component={Link} to="/Posts">
                    <ListItemText primary="Posts" />
                </ListItem>
                <ListItem button key="Cards" component={Link} to="/Cards">
                    <ListItemText primary="Cards" />
                </ListItem>
            </List>
        </div>
    );

    const container = propwindow !== undefined ? () => propwindow().document.body : undefined;

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Responsive drawer
          </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <Switch>
                        <Route exact path="/Editor" component={Editor} />
                        <Route exact path="/Posts" component={PostList} />
                        <Route exact path="/Cards" component={CardPosts} />
                        <Route exact path="/Post/:id" component={Post} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    propwindow: PropTypes.func,
};

export default ResponsiveDrawer;
