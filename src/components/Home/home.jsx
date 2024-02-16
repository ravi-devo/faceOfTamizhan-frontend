import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useCreatePostMutation, useGetPostMutation, useAddCommentMutation, useDeleteCommentMutation, useDeletePostMutation } from "../../slices/postApiSlice";
import { setInitialPost, createPost, addComment, deleteComment, deletePost } from "../../slices/postSlice";
import { useEffect } from "react";
import Header from "../NavBar/navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [GetPost] = useGetPostMutation();
    const [CreatePostAPI] = useCreatePostMutation();
    const [AddCommentAPI] = useAddCommentMutation();
    const [DeleteCommentAPI] = useDeleteCommentMutation();
    const [DeletePostAPI] = useDeletePostMutation();
    const postItems = useSelector((state) => state.post.postItems);

    const createPostHandler = async () => {
        try {
            const res = await CreatePostAPI({ title: "Can we see it without refreshing the page", content: "Content from UI" }).unwrap();
            console.log(`Response ${JSON.stringify(res)}`)
            if (res.message === 'Post Created successfully') {
                console.log(`Post created successfully`)
                dispatch(createPost(res.data));
            }
        } catch (error) {
            toast.error(`Internal server error ${JSON.stringify(error)}`)
        }
    }

    const addCommentHandler = async () => {
        try {
            const postId = '65c8a062a0d8b4259724a08b';
            const res = await AddCommentAPI({ postId, text: { text: "Texting from UI really" } }).unwrap();
            console.log(`Response ${JSON.stringify(res)}`)
            if (res.message === 'Comment added successfully') {
                console.log(`Comment added successfully`)
                dispatch(addComment({ postId, comment: res.data }));
            }
        } catch (error) {
            toast.error(`Internal server error ${JSON.stringify(error)}`)
        }
    }

    const deleteCommentHandler = async () => {
        const postId = '65c8a062a0d8b4259724a08b';
        const commentId = '65ceca04191d47f1b25d18ce';
        try {
            const res = await DeleteCommentAPI({ postId, commentId }).unwrap();
            console.log(`Response ${JSON.stringify(res)}`)
            if (res.message === 'Comment deleted successfully') {
                console.log(`Comment deleted successfully`)
                dispatch(deleteComment({ postId, commentId }));
            }
        } catch (error) {
            toast.error(`Internal server error ${JSON.stringify(error)}`)
        }
    }
    const deletePostHandler = async () => {
        const postId = '65c8c61a6707301cd32f486e';
        try {
            const res = await DeletePostAPI(postId).unwrap();
            console.log(`Response ${JSON.stringify(res)}`)
            if (res.message === 'Post deleted successfully') {
                console.log(`Post deleted successfully`)
                dispatch(deletePost(postId));
            }
        } catch (error) {
            toast.error(`Internal server error ${JSON.stringify(error)}`)
        }
    }

    const navigateToPost = () => {
        navigate('/post');
    }

    useEffect(() => {
        const getPostHandler = async () => {
            try {
                const res = await GetPost().unwrap();
                if (res.message === 'Posts fetched successfully') {
                    dispatch(setInitialPost(res.data));
                }
            } catch (error) {
                toast.error(`Couldn't get post`);
                console.log(`Error ${error}`)
            }
        }
        getPostHandler();
    }, []);
    return (
        <div>
            <Header />
            <h1>Welcome to home screen, you are now logged in.</h1>
            <Button className="mx-2" onClick={createPostHandler}>Create Post</Button>
            <Button className="mx-2" onClick={addCommentHandler}>Add Comment</Button>
            <Button className="mx-2" onClick={deleteCommentHandler}>Delete Comment</Button>
            <Button className="mx-2" onClick={deletePostHandler}>Delete Post</Button>
            <Button className="mx-2" onClick={navigateToPost}>Post Page</Button>
            {/* Render fetched posts */}
            <div>
                {postItems.map(post => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;