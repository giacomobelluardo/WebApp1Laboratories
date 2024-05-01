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

    this.printLibrary = () =>{
        this.films.forEach(x => console.log(x.printFilm()))
    }

    this.sortByDate = () => {
        const copy1 = [...this.films.filter(a => a.date != null)];          //watched
        const copy2 = [...this.films.filter(a => a.date == null)];          //not watched

        copy1.sort((a1, a2) => {
            if(a1.date.isBefore(a2.date))
                return -1;
            else if(a1.date.isAfter(a2.date))
                return 1;
            else
                return 0;
        });

        return [...copy1, ...copy2];
    }

    this.deleteFilm = (id) =>{
        const toDelete = this.films.find(a => a.id == id);
        const indexToDelete = this.films.indexOf(toDelete);

        this.films.splice(indexToDelete, 1);
    }

    this.favoriteFilms = () =>{
        return this.films.filter(a=>a.favorite == true);
    }

    this.bestFilms = () => {
        return this.films.filter(a=>a.score == 5);
    }

    this.monthFilm = () => {
        lastMonth = dayjs().month()             //today's month

        return this.films.filter(a=>a.date.month() == lastMonth);
    }

    this.unseen = () =>{
        return this.films.filter(a=>a.date == null);
    }

    this.resetWatchedFilms = ()=> {
       this.films.filter(a => a.date!= null).forEach(a => a.deleteDate());
    }
    
    this.getRated = () =>{
        const scoredFilms = this.films.filter(a => a.score != null);

        return scoredFilms.sort((a1, a2) => {
            if(a1.score < a2.score)
                return 1;
            else if (a1.score > a2.score)
                return -1;
            else
                return 0;
        })
    }

    this.allFilms = () =>{
        return [...this.films];
    }
}

export {Film, FilmLibrary}