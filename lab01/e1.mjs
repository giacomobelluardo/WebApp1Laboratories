import dayjs from 'dayjs';

function Film(id, title, date, rating) {
    this.id = id;
    this.title = title;
    this.favorite = false;
    this.date = date;
    this.rating = rating;
    this.idPerson = 1;

    this.addFavorite = (favorite) =>{
        this.favorite = favorite;
    }

    this.idPerson = (idP) => {
        idPerson = idP;
    }

    this.printFilm = () =>{
        
    }
}

function FilmLibrary(){
    this.films = [];

    this.addFilm = (film) =>{
        this.films.push(film);
    }

    this.printLibrary = () =>{
        this.films.forEach(x => x.printFilm())
    }
}
