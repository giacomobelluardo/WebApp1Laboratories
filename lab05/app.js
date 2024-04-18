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
}