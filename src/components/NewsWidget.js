import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.httpAgent.protocol = 'http:';
axios.defaults.httpsAgent.protocol = 'https:';

const NewsWidget = ({ defaultLocation = 'India' }) => {
  const [location, setLocation] = useState(defaultLocation);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews(defaultLocation);
  }, [defaultLocation]);

  const fetchNews = async (location) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?q=${location}&apiKey=${process.env.REACT_APP_NEWSAPI_API_KEY}&pageSize=5`
      );
      setNews(response.data.articles);
      setError(null);
    } catch (error) {
      setError('Failed to fetch news data.');
      setNews([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews(location);
  };

  return (
    <div className="news-widget card shadow-sm p-3 mb-5 bg-white rounded">
      <h2 className="card-title">News Headlines</h2>
      <form onSubmit={handleSubmit} className="d-flex mb-3">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or country..."
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-secondary">
          Search News
        </button>
      </form>
      {error && <p className="text-danger mt-3">{error}</p>}
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{article.title}</h3>
              <p className="card-text">{article.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  Source: {article.source.name}
                </small>
              </p>
              <p className="card-text">
                <small className="text-muted">
                  Published At:{' '}
                  {new Date(article.publishedAt).toLocaleString()}
                </small>
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Read Full Article
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsWidget;
