import React, { useEffect, useState } from "react";
import api from "./api";

import './App.css';

import EmphasisMovie from "./components/EmphasisMovie";
import MovieRow from "./components/MovieRow";
import Header from "./components/Header";

function App() {

  const [movieList, setMovieList] = useState([]);
  const [emphasisData, setEmphaisData] = useState(null);
  const [headerBlack, setHeaderBlack] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await api.getHomeList();
      setMovieList(list);

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChose = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chose = originals[0].items.results[randomChose];
      
      let choseInfo = await api.getMovieInfo(chose.id, 'tv');
      setEmphaisData(choseInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10){
        setHeaderBlack(true);
      }else{
        setHeaderBlack(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header headerBlack={headerBlack} />

      {emphasisData &&
        <EmphasisMovie item={emphasisData} />
      }     

      <section className="lists">
      {
        movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))
      }
      </section>

      <footer>
        Feito com <span role="img" aria-label="Amor">❤</span> para aprender e ter uma web melhor<br />
        Direitos de imagem para Netflix<br />
        Dados carregados através da API themoviedb.org
      </footer>

      {movieList.length <=  0 &&
        <div className="loading">
          <img alt="Carregando" src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
        </div>
      }

    </div>
  );
}

export default App;
