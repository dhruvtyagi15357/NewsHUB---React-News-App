import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./Spinner.jsx";
import Spinner from "./Spinner.jsx";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect } from "react";

const News = (props) => {

  const [articles, setArticles] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const [resultPerPage, setResultPerPage] = React.useState(props.pageSize)
  const [totalResults, setTotalResults] = React.useState(0)
  const [progress, setProgress] = React.useState(0)

  // in order to use componentDidMount() in functional component,
  // we use useEffect() hook
  useEffect(() => {
    document.title = `${props.category} - NewHUB`;
    update()
  }, [])
  
  useEffect(() => {
    document.title = `${props.category} - NewHUB`;
    categoryUpdate()
  }, [props.category, props.country])
  

  const categoryUpdate = async () => {
    setLoading(true);
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.api_key}&pagesize=${resultPerPage}&page=${page}`;
      let data = await (await fetch(url)).json();
  
      // Filter out duplicate articles
      let newArticles = data.articles.filter((article) =>
        !articles.find((a) => a.title === article.title)
      );
  
      setArticles(newArticles)
      setTotalResults(data.totalResults)
      setPage(1)

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false );
    }
  }

  const update = async () => {
    setLoading(true);
    try { 
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.api_key}&pagesize=${resultPerPage}&page=${page}`;
      let data = await (await fetch(url)).json();
  
      // Filter out duplicate articles
      let newArticles = data.articles.filter((article) =>
        !articles.find((a) => a.title === article.title)
      );
  
      setArticles(articles.concat(newArticles))
      setTotalResults(data.totalResults)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const fetchMoreData = async () => {
    setLoading(true);
    setPage(page + 1)
    try { 
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.api_key}&pagesize=${resultPerPage}&page=${page}`;
      let data = await (await fetch(url)).json();
  
      // Filter out duplicate articles
      let newArticles = data.articles.filter((article) =>
        !articles.find((a) => a.title === article.title)
      );
  
      setArticles(articles.concat(newArticles))
      setTotalResults(data.totalResults)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

    return (
      <div className="my-3" >
        <h2
          className="news-heading text-center tw-text-4xl"
          style={{ margin: "35px 0px" }}
        >
          NewHUB - Top {props.category} headlines - page {page}
        </h2>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          style={{overflow: 'hidden', alignItems: 'center', padding: '0cm 0cm 1cm 0cm'}}
        >
          <div className="container">
            <div className="row" >
              {articles.map((e) => {
                return (
                  <div className="col-md-3" key={e.url} >
                    <NewsItem
                      title={e.title ? e.title.length > 45 ? e.title.slice(0, 45) + "..." : e.title.slice(0, 45) : ""}
                      desc={e.description ? e.description.length > 85 ? e.description.slice(0, 85) + "..." : e.description.slice(0, 85) : ""}
                      newsurl={e.url}
                      imurl={
                        e.urlToImage
                          ? e.urlToImage
                          : "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=2048x2048&w=is&k=20&c=ZyHCcX0F_DVM-r_R_vG8OX_CqYLb-G16afTyaVGtB3o="
                      }
                      author={e.author}
                      date={e.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }

export default News;

//proptypes and default props
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};