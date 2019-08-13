import React, { useState, Suspense } from 'react';

import { Paper, Container, Grid, Theme, AppBar, Toolbar, Typography, TextField, InputAdornment } from '@material-ui/core';
import { explorerRoute } from './explorer';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import { mount, route } from 'navi'
import { Router, View, useNavigation, NotFoundBoundary } from 'react-navi'
import CircularProgress from '@material-ui/core/CircularProgress';
import { useGlobalState } from './state';
import { loginRoute } from './wallet/login';
import { walletRoute } from './wallet/wallet';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        marginLeft: theme.spacing(3),
    },
    searchIcon: {
        color: "white",
    }
}));

const routes =
    mount({
        '/': route({
            view: <div>Awaiting your DID</div>
        }),
        '/chaintrees/:did': explorerRoute,
        '/login': loginRoute,
        "/wallet": walletRoute,
    })

export const NavBar = () => {
    const classes = useStyles();
    let [search, setSearch] = useState("")
    let navigation = useNavigation()

    const handleSubmit = (evt: React.FormEvent) => {
        evt.preventDefault()
        if (!!search && search !== "") {
            navigation.navigate("/chaintrees/" + search)
        }
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    ChainTree Explorer
            </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={classes.search}
                        id="did"
                        label="search..."
                        type="search"
                        variant="filled"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>,
                        }}
                        value={search}
                        onChange={(evt) => {
                            setSearch(evt.target.value)
                        }} />
                </form>
            </Toolbar>
        </AppBar>
    )
}

export const Layout = () => {
    const classes = useStyles();
    const [userTree, _] = useGlobalState("userTree")

    return (
        <Container maxWidth="md">

            <Router routes={routes} context={userTree}>
                <NavBar />
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item xs={12} >
                        <Paper className={classes.root}>
                            <Suspense fallback={<CircularProgress />}>
                                <NotFoundBoundary render={renderNotFound}>
                                    <View />
                                </NotFoundBoundary>
                            </Suspense>
                        </Paper>
                    </Grid>
                </Grid>
            </Router>

        </Container>
    )
}

const renderNotFound = (err: Error) => {
    return (
        <h1>NotFound</h1>
    )
}