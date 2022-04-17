import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { commentPost, deleteComment } from "../../actions/posts";
import DeleteIcon from "@material-ui/icons/Delete";

import useStyles from "./styles";

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const user = JSON.parse(localStorage.getItem("profile"));
    const commentsRef = useRef();

    const userId = user?.result?.googleId || user?.result?._id;

    const handleDelete = async (i) => {
        const newComments = await dispatch(deleteComment(i, post._id));

        setComments(newComments);
    };

    const handleComment = async () => {
        const newComments = await dispatch(
            commentPost(
                `${user?.result.name}: ${comment} : ${userId}`,
                post._id
            )
        );

        setComment("");
        setComments(newComments);

        commentsRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(": ")[0]}</strong>:
                            {c.split(":")[1]}
                            {user &&
                                (user?.result?.googleId === c.split(": ")[2] ||
                                    user?.result?._id === c.split(": ")[2]) && (
                                    <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() => handleDelete(i)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                        Delete
                                    </Button>
                                )}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user && (
                    <div style={{ width: "50%" }}>
                        <Typography gutterBottom variant="h6">
                            Write a comment
                        </Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button
                            style={{ marginTop: "10px" }}
                            fullWidth
                            disabled={!comment}
                            variant="contained"
                            color="primary"
                            onClick={handleComment}
                        >
                            Comment
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
