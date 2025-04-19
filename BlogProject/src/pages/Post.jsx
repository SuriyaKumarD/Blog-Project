import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Button from "../components/Button.jsx";
import Container from "../components/container/Container.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/configuration.js";
import appwriteServices from "../appwrite/file.js";
import { Link } from "react-router-dom";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteServices.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-b-xl p-2">
          <img
            src={appwriteServices.preview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/editPost/${post.id}`}>
                <Button className="bg-green-500 text-white px-4 py-2 rounded-lg">
                  Edit
                </Button>
              </Link>

              <Button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="mb-6 w-full">
          <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post?.content)}</div>
      </Container>
    </div>
  ) : null;
}

export default Post;
