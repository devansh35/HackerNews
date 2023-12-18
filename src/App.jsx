import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import PostDetail from "./components/Postdetail";

const fetchNews = async (query) => {
  const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
  return response.data.hits;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar func={fetchNews}/>} />
      <Route path="/post/:id" element={<PostDetail />} />
    </Routes>
  );
}

export default App;
