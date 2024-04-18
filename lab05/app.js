'use strict';

document.addEventListener('DOMContentLoaded', event=>{
    console.log('Page loaded')

    const listFilms = document.getElementById("films-list")

    for(const film of l1.films){
        const li = document.createElement("li")
        li.classList.add("list-group-item")

        listFilms.appendChild(li)

        //Row
        const div = document.createElement("div")
        div.classList.add("row")
        li.appendChild(div)

        //Title
        const title = document.createElement("div")
        title.classList.add("col-6", "col-xl-3", "favorite-title", "d-flex", "gap-2", "align-items-center")
        title.innerText = film.title
        div.appendChild(title)

        //Is Favorite
        const fav = document.createElement("div")
        fav.classList.add("col-3", "text-center")
        const span = document.createElement("span")
        fav.appendChild(span)
        span.classList.add("custom-control", "custom-checkbox")
        div.appendChild(fav)
        
        if(film.favorite == true){
            span.innerHTML = `
                <input type="checkbox" class="custom-control-input" checked>
                <label class="custom-control-label" for="films[1][favorite]">Favorite</label>
            `
        }
        else{
            span.innerHTML = `
            <input type="checkbox" class="custom-control-input" >
            <label class="custom-control-label" for="films[1][favorite]">Favorite</label>
        `
        }

        //Date
        const date = document.createElement("div")
        date.classList.add("col-3", "text-center")
        date.innerText = film.date.format('YYYY-DD-MM')
        div.appendChild(date)

        //Ratings
        const rating = document.createElement("div")
        rating.classList.add("actions-container", "col-3", "text-center")
        div.appendChild(rating)
        const stars = document.createElement("div")
        stars.classList.add("rating")
        for(let i=0; i<film.score; i++){
            stars.innerHTML = `<i class="bi bi-star-fill"></i>`
        }
        for(let i=0; i<(5-film.score); i++){
            stars.innerHTML = `<i class="bi bi-star"></i>`
        }
        rating.appendChild(stars)

        const actions = document.createElement("div")
        actions.classList.add("actions")
        rating.appendChild(actions)

        const buttonPencil = document.createElement("i")
        const buttonTrash = document.createElement("i")
        buttonPencil.classList.add("bi", "bi-pencil")
        buttonTrash.classList.add("bi", "bi-trash")
        actions.appendChild(buttonPencil)
        actions.appendChild(buttonTrash)
    }
})

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

