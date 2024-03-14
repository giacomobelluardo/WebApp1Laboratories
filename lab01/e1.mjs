import dayjs from 'dayjs';

//Punto 1
function Film(id, title, favorite=false, date=null, score=null, user=1) {
    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.date = date;
    this.score = score;
    this.user = user;

    this.printFilm = () =>{
        let string = "";
        string += "Id: "+ this.id;
        string += ", Title: " + this.title;
        string += ", Favorite: " + this.favorite;
        string += ", Watch date: " 
        if(this.date != null)
            string += this.date.format('MMMM D, YYYY');
        else
            string += this.date;
        string += ", Score: " + this.score;
        string += ", User: " + this.user;

        return string;
    }

    this.deleteDate = () =>{
        if(this.date != null)
            this.date = null;
    }
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
const f1 = new Film(1, 'Pulp fiction', true, dayjs('2024-03-14'), 7);
const f2 = new Film(2, 'Taxi Driver', undefined, dayjs('2024-03-11'), 9, 5);
const f3 = new Film(3, 'Star Wars', true, dayjs('2024-02-12'), 10);

const l1 = new FilmLibrary();

l1.addFilm(f1);
l1.addFilm(f2);
l1.addFilm(f3);
l1.addFilm(new Film(4, '007', true));

l1.printLibrary();

//Punto 2
console.log("***** List of films *****");
l1.sortByDate().forEach(a => console.log(a.printFilm()));

console.log();
l1.deleteFilm(1);
l1.printLibrary();

console.log();
l1.resetWatchedFilms();
l1.printLibrary();

console.log();
console.log("***** Films filtered, only the rated ones *****");
l1.getRated().forEach(a => console.log(a.printFilm()));
