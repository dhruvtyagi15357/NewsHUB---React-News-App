import React, { Component } from "react";
export class NewsItem extends Component {
  render() {
    return (
      <div className="my-3">
        <div className="card" style={{}}>
          <img src={this.props.imurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{this.props.title}</h5>
            <p className="card-text">{this.props.desc}</p>
            <a
              href={this.props.newsurl}
              className="btn btn-sm btn-primary"
              target="_blank"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
