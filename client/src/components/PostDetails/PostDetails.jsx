import React, { useEffect } from "react";
import {
    Paper,
    Typography,
    CircularProgress,
    Divider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import moment from "moment";

import CommentSection from "./CommentSection";
import { getPost, getPostsBySearch } from "../../actions/posts";
import useStyles from "./styles";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(
                getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
            );
        }
    }, [post]);

    const openPost = (_id) => {
        navigate(`/posts/${_id}`);
    };

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        color="textSecondary"
                        component="h2"
                    >
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by:
                        <Link
                            to={`/creators/${post.name}`}
                            style={{ textDecoration: "none", color: "#3f51b5" }}
                        >
                            {` ${post.name}`}
                        </Link>
                    </Typography>
                    <Typography variant="body1">
                        {moment(post.createdAt).fromNow()}
                    </Typography>

                    <Divider style={{ margin: "20px 0" }} />
                    <CommentSection post={post} />
                    <Divider style={{ margin: "20px 0" }} />
                </div>
                <div className={classes.imageSection}>
                    <img
                        style={{ paddingBottom: "15px" }}
                        className={classes.media}
                        src={
                            post.selectedFile ||
                            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt={post.title}
                    />
                </div>
            </div>
            {recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">
                        You might also like:{" "}
                    </Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts
                            .splice(0, 7)
                            .map(
                                ({
                                    title,
                                    message,
                                    name,
                                    likes,
                                    selectedFile,
                                    _id,
                                }) => (
                                    <div
                                        style={{
                                            margin: "20px",
                                            cursor: "pointer",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                        }}
                                        onClick={() => openPost(_id)}
                                        key={_id}
                                    >
                                        <Typography gutterBottom variant="h6">
                                            {title}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                        >
                                            {name}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle2"
                                        >
                                            {message.slice(0, 100)}
                                            {message.length > 100 && "..."}
                                        </Typography>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                        >
                                            Like: {likes.length}
                                        </Typography>
                                        <img
                                            src={selectedFile}
                                            width="200px"
                                            height="150px"
                                            style={{
                                                marginTop: "auto",
                                            }}
                                        />
                                    </div>
                                )
                            )}
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default PostDetails;
