import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(`http://hn.algolia.com/api/v1/items/${id}`);
      setPost(response.data);
    };

    fetchPost();
  }, [id]);

  // Function to convert HTML string to plain text and links
  const convertHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = doc.body.textContent || "";
    const links = Array.from(doc.getElementsByTagName('a')).map(a => `\n<a href="${a.href}" target="_blank" rel="noopener noreferrer">${a.textContent}</a>`);
    return { __html: text + (links.length ? "\n\n" + links.join("\n") : "") };
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return post ? (
    <div className="m-4">
      <h1 className="text-center font-bold text-2xl font-serif">{post.title}</h1>
      <p className="text-center">{post.points} points</p>
      <ul>
        {post.children.map(comment => (
          <li key={comment.id} className="bg-gray-200 my-2 p-2">
            <p className="text-sm text-gray-500">by {comment.author} on {formatDate(comment.created_at)}</p>
            <div dangerouslySetInnerHTML={convertHTML(comment.text)} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default PostDetail;
