import React, { Component } from "react";
import NewsItem from "./NewsItem";
import "./Spinner.jsx";
import Spinner from "./Spinner.jsx";
import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            resultPerPage: props.pageSize,
        };
    }

    async fetchData() {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c3f9a26c882d473db649b4307afdca35&pagesize=${this.state.resultPerPage}&page=${this.state.page}`;
        let data = await (await fetch(url)).json();
        console.log(url);
        console.log(data)
        this.setState({ articles: data.articles,
            totalResults: data.totalResults });
        this.setState({ loading: false });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category !== this.props.category || prevProps.country !== this.props.country) {
            this.fetchData();
        }
    }


    handleNext = async () => {
        if (this.state.page+1 <= Math.ceil(this.state.totalResults/this.state.resultPerPage)){
            const nextPage = this.state.page + 1;
            this.setState({ loading: true });
            try {
                let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=c3f9a26c882d473db649b4307afdca35&pagesize=${this.state.resultPerPage}&page=${nextPage}`;
                let data = await (await fetch(url)).json();
                this.setState({ articles: data.articles, page: nextPage });
            } catch (error) {
                console.error(error);
            } finally {
                this.setState({ loading: false });
            }
        }
        else{
            alert("No more pages left");
        }
    }

    handlePrev = async () => {
        const prevPage = this.state.page - 1;
        this.setState({ loading: true });
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=c3f9a26c882d473db649b4307afdca35&pagesize=${this.state.resultPerPage}&page=${prevPage}`;
            let data = await (await fetch(url)).json();
            this.setState({ articles: data.articles, page: prevPage });
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h2 className="news-heading text-center tw-text-4xl">NewHUB - Top headlines - {this.state.page}</h2>
                {this.state.loading && <Spinner/>}
                <div className="row my-2">
                    {!this.state.loading && this.state.articles.map((e) => { return (
                        <div className="col-md-3" key={e.url}>
                            <NewsItem title={e.title? e.title.length > 45 ? e.title.slice(0, 45) + "...": e.title.slice(0, 45): ""} 
                                desc={e.description ? e.description.length > 85? e.description.slice(0, 85) + "..." : e.description.slice(0, 85) : ""}
                                newsurl={e.url}
                                imurl={e.urlToImage? e.urlToImage: "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=2048x2048&w=is&k=20&c=ZyHCcX0F_DVM-r_R_vG8OX_CqYLb-G16afTyaVGtB3o="}
                            />
                        </div>
                    );})}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled = {this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePrev}>Previous page</button>
                    <button disabled = {(this.state.page+1 >  Math.ceil(this.state.totalResults/this.state.resultPerPage))} type="button" className="btn btn-primary" onClick={this.handleNext}>Next page</button>
                </div>
            </div>
        );
    }
}
