import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const { country, category, apikey, pageSize, setProgress } = props;

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    try {
      setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page}&pagesize=${pageSize}`;
	  
      setLoading(true);
      const data = await fetch(url);
      setProgress(30);
      const parsedData = await data.json();
      setProgress(70);
      setArticles(parsedData.articles || []);
      setTotalResults(parsedData.totalResults || 0);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-News Today`
    updateNews();
    //eslint-disable-next-line
  },[]);


  

const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}&page=${page+1}&pagesize=${pageSize}`;
	  setPage((prevPage) => prevPage + 1);
    const data = await fetch(url);
    const parsedData = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults || 0);
};


  return (
    <>
      <h2 className='text-center text-light' style={{ marginTop: '70px' }}>
        NewsToday - Top {capitalizeFirstLetter(category)} Headlines
      </h2>

    
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((ele) => (
              <div className="col-md-4" key={ele.url}>
                <NewsItem
                  title={ele.title ? ele.title.slice(0, 55) : "No Title"}
                  description={ele.description ? ele.description.slice(0, 85) : "No Description"}
                  imageUrl={ele.urlToImage || 'https://via.placeholder.com/150'}
                  newsUrl={ele.url}
                  author={ele.author ? ele.author.slice(0, 11) : 'Unknown'}
                  date={ele.publishedAt}
                  source={ele.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  category: 'general',
  pageSize: 5,
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
  apikey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default News;
