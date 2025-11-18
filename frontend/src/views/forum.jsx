import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseconfiguration";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc,
} from "firebase/firestore";
import "./forum.css";

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [anonymous, setAnonymous] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "comments"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let commentData = {};
      snapshot.docs.forEach((doc) => {
        const comment = { id: doc.id, ...doc.data() };
        commentData[comment.postId] = [...(commentData[comment.postId] || []), comment];
      });
      setComments(commentData);
    });

    return () => unsubscribe();
  }, []);

  const handlePost = async () => {
    if (!newPost.trim()) return;
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "posts"), {
      content: newPost,
      authorId: anonymous ? "anonymous" : user.uid,
      authorName: anonymous ? "Anonymous" : user.displayName || user.email,
      createdAt: serverTimestamp(),
      upvotes: 0,
      downvotes: 0,
    });

    setNewPost("");
  };

  const handleComment = async (postId) => {
    if (!newComments[postId]?.trim()) return;
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(collection(db, "comments"), {
      postId,
      content: newComments[postId],
      authorId: user.uid,
      authorName: user.displayName || user.email,
      createdAt: serverTimestamp(),
      upvotes: 0,
      downvotes: 0,
    });

    setNewComments({ ...newComments, [postId]: "" });
  };

  const handleVote = async (docId, type, collectionName) => {
    const user = auth.currentUser;
    if (!user) return;

    const reactionRef = doc(db, "reactions", `${user.uid}_${docId}`);
    const docRef = doc(db, collectionName, docId);

    const reactionSnap = await getDoc(reactionRef);
    if (!reactionSnap.exists()) {
      await setDoc(reactionRef, { userId: user.uid, docId, type });

      await updateDoc(docRef, {
        [type === "upvote" ? "upvotes" : "downvotes"]: increment(1),
      });
    } else {
      const existingType = reactionSnap.data().type;
      if (existingType !== type) {
        await updateDoc(docRef, {
          [existingType === "upvote" ? "upvotes" : "downvotes"]: increment(-1),
          [type === "upvote" ? "upvotes" : "downvotes"]: increment(1),
        });
        await updateDoc(reactionRef, { type });
      }
    }
  };

  return (
    <div className="forum-container">
      <h2>COMMUNITY</h2>
      <div className="post-box">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Ask a question or share something..."
        ></textarea>
        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
            Post Anonymously
          </label>
          <button onClick={handlePost}>Post</button>
        </div>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.authorName}</h3>
          <p>{post.content}</p>

          <div className="comments-section">
            <textarea
              value={newComments[post.id] || ""}
              onChange={(e) =>
                setNewComments({ ...newComments, [post.id]: e.target.value })
              }
              placeholder="Write a comment..."
            ></textarea>
            <button onClick={() => handleComment(post.id)}>Comment</button>

            <div className="comments">
              {comments[post.id]?.map((comment) => (
                <div key={comment.id} className="comment">
                  <h4>{comment.authorName}</h4>
                  <p>{comment.content}</p>
                  <div className="actions">
                    <button onClick={() => handleVote(comment.id, "upvote", "comments")}>
                      👍 {comment.upvotes}
                    </button>
                    <button onClick={() => handleVote(comment.id, "downvote", "comments")}>
                      👎 {comment.downvotes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forum;



