import React, { useEffect, useState } from "react";
import { db } from "../../firebase";

// components

import CardTable from "components/Cards/CardTable.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Tables() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("projects").onSnapshot((snapshot) =>
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const sendPost = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      name: "Test post",
      description: "this is a test",
      message: "this is a test message",
    });
  };
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable posts={posts} />
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
