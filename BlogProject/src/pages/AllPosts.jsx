import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import Container from "../components/container/Container.jsx";
import appService from "../appwrite/configuration.js";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  });

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap"></div>
        {posts.map((post) => {
          <div key={post.$id} className="p-2 w-1/4">
            <PostCard {...post} />
          </div>;
        })}
      </Container>
    </div>
  );
}

export default AllPosts;
