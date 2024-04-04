import dayjs from 'dayjs';
import sqlite from 'sqlite3';
import Film from "./Film.mjs"

const today = dayjs()

const db = new sqlite.Database('films.db', 
(err)=>{if(err) throw err})

//Function to map every row in a Film object
function mapRows(rows){
    return rows.map(a => new Film(a.id, a.title, a.isFavorite, dayjs(a.watchDate), a.rating, a.userId))         //fields of a as a row result from a query in SQL
}

//Function to print every film in the array
function printFilms(films){
    films.forEach(f=>console.log(f.printFilm()))
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

export default function FilmLibrary(){
    this.films = [];

    //EXERCISE 1
    this.storeFilms = function(){
        return new Promise((resolve, reject)=>{
            const sql = `select *
                         from films f`
            
            db.all(sql, (err, films)=> {
                if(err) reject(err)
                else    resolve(mapRows(films))})
        })
    }

    //b. Retrieve all favorite films and return a Promise that resolves to an array of Film objects.
    this.favoriteFilms = function(){
        return new Promise((resolve, reject) =>{
            const sql = `select *
            from films f
            where f.isFavorite=1`

            db.all(sql, (err, filmsPr) => {
                if(err) reject(err)
                else resolve(mapRows(filmsPr))
            })
        })
    }

    //c. Retrieve all films watched today and return a Promise that resolves to an array of Film objects.
    this.todayFilms = function(date){
        return new Promise((resolve, reject)=>{
            const sql = `
            select *
            from films f
            where f.watchDate=?`

            db.all(sql, [date.format('YYYY-MM-DD')], (err, todFilms) =>{
                if(err) reject(err)
                else resolve(mapRows(todFilms))
            })
        })
    }

    //d. Retrieve films whose watch date is earlier than a given date (received as a parameter). Return a Promise that resolves to an array of Film objects
    this.earlierFilms = function(date){
        return new Promise((resolve, reject)=>{
            const sql = `
            select *
            from films f
            where f.watchDate<?`

            db.all(sql, [date.format('YYYY-MM-DD')], (err, todFilms) =>{
                if(err) reject(err)
                else resolve(mapRows(todFilms))
            })
        })
    }

    //Retrieve films whose watch date is in the last month
    this.monthFilms = function(){
        return new Promise((resolve, reject)=>{
            const lastMonth = today.month() - 1
            const lastDayLm = dayjs().endOf(lastMonth)
            const date1 = dayjs(`2024-${lastMonth}-01`)
            const date2 = dayjs(`2024-${lastMonth}-${lastDayLm}`)
        
            const sql = `
            select *
            from films f
            where f.watchDate>? and f.watchDate<?`

            db.all(sql, [date1.format('YYYY-MM-DD'), date2.format('YYYY-MM-DD')], (err, todFilms) =>{
                if(err) reject(err)
                else resolve(mapRows(todFilms))
            })
        })
    }

    //Retrieve all unseen films
    this.unseenFilms = function(){
        return new Promise((resolve, reject)=>{
            const sql = `
            select *
            from films f
            where f.watchDate=NULL`

            db.all(sql, (err, todFilms) =>{
                if(err) reject(err)
                else resolve(mapRows(todFilms))
            })
        })
    }

    //Retrieve a film, given its id
    this.thatFilm = function(id){
        return new Promise((resolve, reject)=>{
            const sql = `
            select *
            from films f
            where f.id=?`

            db.all(sql, [id], (err, todFilms) =>{
                if(err) reject(err)
                else resolve(mapRows(todFilms))
            })
        })
    }

    //e. Retrieve films whose rating is greater than or equal to a given number (received as a parameter). Return a Promise that resolves to an array of Film objects.
    this.ratedFilms = function(n){
        return new Promise((resolve, reject) => {
            const sql = `
                    select * 
                    from films f
                    where f.rating>?
            `

            db.all(sql, [n], (err, rFilms) =>{
                if(err) reject(err)
                else resolve(mapRows(rFilms))
            })
        })
    }

    //f. Retrieve films whose title contains a given string (received as a parameter).
    this.containStr = function(string){
        return new Promise((resolve, reject) => {
            let str = `%${string}%`
    
            const sql = `
                select * 
                from films f
                where f.title LIKE ?
            `
    
            db.all(sql, [str], (err, fs)=>{
                if(err) reject(err)
                else    resolve(mapRows(fs))
            })

        })
    }

    //EXERCISE 2

    //a. Store a new movie into the database. After completion, print a confirmation/failure message.
    this.addFilm = function(f){
        return new Promise((resolve, reject) =>{
            const sql = `insert into films(title, isFavorite, rating, watchDate, userId)
            values(?, ?, ?, ?, ?, ?)`

            db.run(sql, [f.id, f.title, f.favorite, f.score, f.date.format('YYYY-MM-DD'), f.user], (err)=>{         //fields of f as a object film
                if(err) reject(err)
                else resolve()
            })
        })
    }

    this.addFilmJson = function(f){
        return new Promise((resolve, reject) =>{
            const sql = `insert into films(title, isFavorite, rating, watchDate, userId)
            values(?, ?, ?, ?, ?)`

            db.run(sql, [f.title, f.isFavorite, f.rating.i, dayjs(f.watchDate).format('YYYY-MM-DD'), f.userId], (err)=>{         //fields of f as a object film
                if(err) reject(err)
                else resolve()
            })
        })
    }

    //b. Delete a movie from the database (using its ID as a reference). After completion, print a confirmation/failure message.
    this.deleteFilm = function(id){
        return new Promise((resolve, reject) =>{
            const sql = `delete from films
                where id=?`

            db.run(sql, [id], (err)=>{
                if(err) reject(err)
                else resolve()
            })
        })
    }

    //c. Delete the watch date of all films stored in the database. After completion, print a confirmation/failure message.
    this.updateWatchDate = function(){
        return new Promise((resolve, reject)=>{
            const sql = `update films 
                    set
                    watchDate=NULL`
            
            db.run(sql, (err)=>{
                if(err) reject(err)
                else resolve()
            })
        })
    }

    //Update a film given its id
    this.changeFilm = function(id, f){
        return new Promise((resolve, reject) =>{
            const sql = `update films
                set
                title = ?,
                isFavorite=?,
                rating=?,
                watchDate=?,
                userId=?
                where id=?
                `

            db.run(sql, [f.title, f.isFavorite, f.rating, dayjs(f.watchDate).format('YYYY-MM-DD'), f.userId, id], (err)=>{         //fields of f as a json format
                if(err) reject(err)
                else resolve()
            })
        })
    }

    //Update a film score given its id
    this.changeFilmScore = function(id, rating){
        return new Promise((resolve, reject) =>{
            const sql = `update films
                set
                rating=?
                where id=?
                `

            db.run(sql, [rating, id], (err)=>{         //fields of f as a json format
                if(err) reject(err)
                else resolve()
            })
        })
    }

    //Update a film favorite given its id
    this.changeFilmFav = function(id, fav){
        return new Promise((resolve, reject) =>{
            const sql = `update films
                set
                isFavorite=?
                where id=?
                `

            db.run(sql, [fav, id], (err)=>{         //fields of f as a json format
                if(err) reject(err)
                else resolve()
            })
        })
    }

}

const l1 = new FilmLibrary();
