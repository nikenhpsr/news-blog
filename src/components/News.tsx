import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";

interface NewsDataProps {
  key: number;
  name: string;
  image: string;
  source: string;
  description: string;
  url: string;
  date: string;
}

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsDataProps[]>([]);
  const [country, setCountry] = useState("en");
  const [tag, setTag] = useState("general");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.collectapi.com/news/getNews",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "apikey 4DkjM6zclrZJB1cgRhEtFt:1eduddcL4WIP70RIqFv1x1",
            },
            params: {
              country: country,
              tag: tag,
              paging: "0", // Default page number
            },
          }
        );

        setNewsData(response.data.result);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [country, tag]);

  return (
    <div>
      <div className="dropdowns">
        <div className="dropdown">
          <label htmlFor="country">Select Country: </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="tr">Turkey</option>
            <option value="de">Germany</option>
            <option value="en">England</option>
            <option value="ru">Russia</option>
          </select>
        </div>
        <div className="dropdown">
          <label htmlFor="tag">Select News Topic: </label>
          <select id="tag" value={tag} onChange={(e) => setTag(e.target.value)}>
            <option value="general">General</option>
            <option value="sport">Sport</option>
            <option value="economy">Economy</option>
          </select>
        </div>
      </div>
      <ul className="news-list">
        {newsData.map((newsItem) => (
          <li key={newsItem.key} className="news-item">
            <h2>{newsItem.name}</h2>
            <p>{newsItem.description}</p>
            <img src={newsItem.image} alt={newsItem.name} className="image" />
            <p>Date: {new Date(newsItem.date).toLocaleString()}</p>
            <p>Source: {newsItem.source}</p>
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
