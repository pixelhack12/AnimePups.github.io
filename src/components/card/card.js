import React from "react";
import './card.css';
import { Link } from 'react-router-dom';

function Card(item){
    var data = item.data;
    var service = item.service;
    var title = data.ru_title.substr(0,90);
    return (
        <Link to={`/${service}/${data.id}`} className="card">
            <div className="poster-container">
                <img src={data.poster} alt={data.ru_title}></img>
                <div className="poster">

                </div>
            </div>
            {/* <div className="title">{data.ru_title}</div> */}
            <div className="title">{title+(title.Lenght==90 ? '...': '')}</div>
        </Link>
    )
}

export default Card;