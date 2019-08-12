import React, { useState } from 'react';

import { Paper, Container, Grid, Theme, AppBar, Toolbar, Typography, TextField, InputAdornment } from '@material-ui/core';
import Explorer from './explorer';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import { debounce } from 'ts-debounce';

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

export const Layout = () => {
    const classes = useStyles();
    let [search,setSearch] = useState("")
    const debouncedSearch = debounce((searchVal) => {
        setSearch(searchVal)
    }, 200)

    return (
        <Container maxWidth="md">
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        ChainTree Explorer
                    </Typography>
                    <TextField 
                        className={classes.search} 
                        id="did" 
                        label="search..." 
                        type="search" 
                        variant="filled"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon className={classes.searchIcon} /></InputAdornment>,
                        }}
                        onChange={(evt)=> {
                            debouncedSearch(evt.target.value)
                        }}/>
                </Toolbar>
            </AppBar>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item xs={12} >
                    <Paper className={classes.root}>
                        <Explorer did={search}></Explorer>
                    </Paper>
                </Grid>
            </Grid>

        </Container>
    )
}