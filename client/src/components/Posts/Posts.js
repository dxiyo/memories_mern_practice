import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

import Post from './Post/Post'

import useStyles from './style'


const Posts = ({ setCurrentId }) => {
    const classes = useStyles()

    const posts = useSelector((state) => state.posts)
    console.log('these are the posts:' + JSON.stringify(posts))


    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.containter} container alignItems="stretch" spacing={3}>
                {posts.map(post => (
                    <Grid key={post._id} item xs={12} sm={6} >
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}    
            </Grid>
        )
    )
}

export default Posts
