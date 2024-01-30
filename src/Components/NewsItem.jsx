import React from "react";
const NewsItem = (props) =>{
    return (
      <div className="my-3">
        <div className="card" style={{}}>
          <img src={props.imurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.desc}</p>
            <p className="card-text"><small className='text-muted'>
                By {!props.author ? 'Unknown' : props.author}<br/> on {!props.date?'Unknown':new Date(props.date).toLocaleString()}
            </small></p>
            <a href={props.newsurl} className="btn btn-sm btn-primary" target="_blank">
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  }

export default NewsItem;
