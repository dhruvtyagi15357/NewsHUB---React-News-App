import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./Spinner.jsx";
import Spinner from "./Spinner.jsx";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      resultPerPage: props.pageSize,
      totalResults: 0,
      progress: 0,
    };
  }

  componentDidMount() {
    this.update()
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country !== this.props.country
    ) {
      this.update();
    }
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.api_key}&pagesize=${this.state.resultPerPage}&page=${this.state.page}`;
  
      let data = await (await fetch(url)).json();
  
      // Filter out duplicate articles
      let newArticles = data.articles.filter((article) =>
        !this.state.articles.find((a) => a.title === article.title)
      );
  
      this.setState({ articles: this.state.articles.concat(newArticles), totalResults: data.totalResults });
    });
  }
  
  async update() {
    this.setState({ loading: true });
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.api_key}&pagesize=${this.state.resultPerPage}&page=${this.state.page}`;
      let data = await (await fetch(url)).json();
  
      // Filter out duplicate articles
      let newArticles = data.articles.filter((article) =>
        !this.state.articles.find((a) => a.title === article.title)
      );
  
      this.setState({ articles: this.state.articles.concat(newArticles), totalResults: data.totalResults });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className="my-3" >
        <h2
          className="news-heading text-center tw-text-4xl"
          style={{ margin: "35px 0px" }}
        >
          NewHUB - Top {this.props.category} headlines - page {this.state.page}
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          style={{overflow: 'hidden', alignItems: 'center', padding: '0cm 0cm 1cm 0cm'}}
        >
          <div className="container">
            <div className="row" >
              {this.state.articles.map((e) => {
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
}
