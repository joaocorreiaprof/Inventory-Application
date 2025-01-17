import { useEffect, useState } from "react";
import api from "../components/api";
import { useNavigate } from "react-router-dom";
import "../styles/authors.css";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/authors")
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  const handleAuthorClick = (authorId) => {
    navigate(`/books?author=${authorId}`);
  };

  return (
    <div className="authors-page">
      <h2 className="page-title">Authors List:</h2>
      {authors.length > 0 ? (
        <div className="authors-container">
          {authors.map((author) => (
            <div
              key={author.author_id}
              className="author-card"
              onClick={() => handleAuthorClick(author.author_id)}
              style={{
                backgroundImage: `url(${author.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="card-overlay">
                <h3>{author.name}</h3>
                <p>{author.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No authors available</p>
      )}
    </div>
  );
};

export default Authors;
