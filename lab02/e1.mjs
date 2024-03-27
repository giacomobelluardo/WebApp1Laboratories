import dayjs from 'dayjs';
import sqlite from 'sqlite3';

const db = new sqlite.Database('films.db', 
(err)=>{if(err) throw err})

//Punto 1
function Film(id, title, favorite=0, date=null, score=null, user=1) {
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
        string += ", Favorite: ";
        if(this.favorite == 1)
            string += "true"
        else
            string += "false"
        string += ", Watch date: " 
        if(this.date != null || this.date.isValidDate())
            string += this.date.format('MMMM D, YYYY');
        else
            string += "not watched yet";
        string += ", Score: " + this.score;
        string += ", User: " + this.user;

        return string;
    }

    this.deleteDate = () =>{
        if(this.date != null)
            this.date = null;
    }
}


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

function FilmLibrary(){
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
            const sql = `insert into films(id, title, isFavorite, rating, watchDate, userId)
            values(?, ?, ?, ?, ?, ?)`

            db.run(sql, [f.id, f.title, f.favorite, f.score, f.date.format('YYYY-MM-DD'), f.user], (err)=>{         //fields of f as a object film
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
}

const l1 = new FilmLibrary();

//Exercise 1 outputs
l1.storeFilms()
l1.favoriteFilms()
l1.todayFilms(dayjs())
l1.earlierFilms(dayjs('2024-03-20'))
l1.ratedFilms(3)
l1.containStr('i').then(results=>printFilms(results))
/*
const f = new Film(6, 'Clockwork Orange', 1, dayjs('2024-03-13'), 3, 2)

//Exercise 2 outputs
l1.addFilm(f).then(()=>{console.log('Film added successfully')})
.catch(()=>{console.log('Failure on the insertion of a new film')})

l1.deleteFilm(f.id).then(()=>{console.log('Film deleted successfully')})
.catch(()=>{console.log('Failure on the delete of the selected film')})

l1.updateWatchDate().then(()=>{console.log('Database updated successfully')})
.catch(()=>{console.log('Failure on updating the database')})
*/







