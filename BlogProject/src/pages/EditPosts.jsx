import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import Container from "../components/container/Container.jsx";
import appService from "../appwrite/configuration.js";
import { useNavigate, useParams } from "react-router-dom";

function EditPosts() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostCard post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPosts;
