import React from "react";

const NewsItem =(props)=>{

    let { title, description, imageUrl, newsUrl, author, date ,source} = props;
    return (
      <div className="my-4">
        <div className="card" style={{minHeight:'520px'}}>
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
          <span className="badge rounded-pill bg-danger" style={{left:'92%',zIndex:'1'}}>
            {source}
            
          </span>
          </div>
          
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://th.bing.com/th/id/OIP.hw38kWVxCeef1QYy_kUAHgHaEK?w=328&h=184&c=7&r=0&o=5&pid=1.7"
            }
            className="card-img-top"
            alt="..."
            height={"225px"}
          />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on{" "}{new Date(date).toGMTString()}
              </small>
            </p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary btn-dark" style={{position:'absolute',bottom:'20px',width:'100px'}}>Read More</a>
          </div>
        </div>
      </div>
    )
}
export default NewsItem;
