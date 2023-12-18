import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ func }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await func(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  // Function to calculate time passed since the post was created
  const timePassed = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const diffInTime = currentDate.getTime() - postDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays < 365 ? `${Math.round(diffInDays)} days ago` : `${Math.round(diffInDays / 365)} years ago`;
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-orange-500 p-2 flex items-center justify-between space-x-4 z-50">
        <div className="flex items-center space-x-2">
          <img src="./hacker_news.png" alt="Logo" className="h-8"/>
          <div className="flex flex-col items-start space-y-0">
            <span className="text-black">Search</span>
            <span className="text-black mt-[-4]">Hacker News</span>
          </div>
        </div>
        <input 
          type="text" 
          placeholder="Search stories by title, url or author" 
          className="p-2 rounded flex-grow"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="text-white">Search</button>
      </div>
      <div className="mt-20 bg-gray-200 text-black p-4">
        {searchResults.map(result => (
          <div key={result.objectID} className="p-4 m-2 bg-white text-black">
            <Link to={`/post/${result.objectID}`}>{result.title}</Link>
            <p>{result.points} points | {result.author} | {timePassed(result.created_at)} | {result.children.length} comments</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Navbar;
