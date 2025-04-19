import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import Container from "../components/container/Container.jsx";
import appService from "../appwrite/configuration.js";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="py-8 w-full mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <h1 className="text-2xl  font-bold hover:text-gray-500">
              Login to Read Posts
            </h1>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
