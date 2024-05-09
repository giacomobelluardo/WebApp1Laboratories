import dayjs from 'dayjs';

function Film(id, title, favorite=false, date=null, score=null, user=1) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date;
    this.score = score;
    this.user = user;
}

function FilmLibrary(){
    this.films = [];

    this.addFilm = (film) =>{
        this.films.push(film);
    }

    this.allFilms = () =>{
        return [...this.films];
    }
}

export {Film, FilmLibrary}