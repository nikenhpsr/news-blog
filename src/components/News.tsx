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
  const [activeTab, setActiveTab] = useState("general");

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
              tag: activeTab,
              paging: "0",
              country: country,
            },
          }
        );
        setCountry("en");
        setNewsData(response.data.result);
        console.log("News data updated:", response.data.result);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [country, activeTab]);

  const tabs = ["general", "sport", "economy"];

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <ul>
        {newsData && newsData.length > 0 ? (
          newsData.map((newsItem) => (
            <li key={newsItem.key} className="news-item">
              <img src={newsItem.image} alt={newsItem.name} />
              <h2>{newsItem.name}</h2>
              <p className="text-neutral-500 dark:text-neutral-300 desc">
                {newsItem.description}
              </p>
              <a
                className="link"
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
              <p className="date">
                Date: {new Date(newsItem.date).toLocaleString()}
              </p>
              <p className="source">Source: {newsItem.source}</p>
              <hr />
            </li>
          ))
        ) : (
          <p>No news data available.</p>
        )}
      </ul>
    </div>
  );
};

export default News;
