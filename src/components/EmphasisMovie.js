import React from "react";
import './EmphasisMovie.css'

export default ({item}) => {

    let firstDate = new Date(item.first_air_date);

    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }

    let description = item.overview;
    if(description.length > 300){
        description = description.substring(0,300) + "...";
    }
    
    return (
        <section className="emphasis" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="emphasis--vertical">
                <div className="emphasis--horizontal">
                    <div className="emphasis--name">{item.original_name}</div>
                    <div className="emphasis--info">
                        <div className="emphasis--points">{item.vote_average} pontos</div>
                        <div className="emphasis--year">{firstDate.getFullYear()}</div>
                        <div className="emphasis--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="emphasis--description">{description}</div>
                    <div className="emphasis--buttons">
                        <a href={`/watch/${item.id}`} className="emphasis--watchbutton">► Assistir</a>
                        <a href={`/list/add/${item.id}`} className="emphasis--addbutton">+ Minha Lista</a>
                    </div>
                    <div className="emphasis--genres">
                        <strong>Gêneros</strong> {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )
}