import express from 'express'
import dayjs from 'dayjs';
import morgan from 'morgan'
import FilmLibrary from "./dao.mjs"

const app = express()
app.use(morgan('commmon'))
app.use(express.json())

const l = new FilmLibrary()

app.get('/films', (req, res)=>{
    l.storeFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/films/favorite', (req, res)=>{
    l.favoriteFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/films/ratings', (req, res)=>{
    l.ratedFilms(4).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/films/lastMonth', (req, res)=>{
    l.monthFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/films/unseen', (req, res)=>{
    l.unseenFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/films/:id', (req, res)=>{
    const idFilm = req.params.id

    l.thatFilm(idFilm).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.post('/films', (req, res)=>{
    const filmJs = req.body

    //Checking input values validity
    if(typeof(filmJs.isFavorite)  != "number")
        res.sendStatus(500)

    if(typeof(filmJs.rating) != "number")
        res.sendStatus(500)

    if(isNaN(dayjs(filmJs.watchDate)))
        res.sendStatus(500)

    if(typeof(filmJs.userId) != "number")
        res.sendStatus(500)

    l.addFilmJson(filmJs).then((q)=>{
        res.send("New film stored succesfully")
        res.end()
    })
})

app.put('/films/:id', (req, res)=>{
    const id = req.params.id
    const filmJs = req.body

    l.changeFilm(id, filmJs).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.put('/films/:id/rating', (req, res)=>{
    const id = req.params.id
    const rating = req.body.rating

    if(typeof(rating) != "number")
        res.sendStatus(500)

    l.changeFilmScore(id, rating).then((q)=>{
        res.send(`Film ${id} rating updated succesfully`)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})


app.put('/films/:id/favorite', (req, res)=>{
    const id = req.params.id
    const fav = req.body.favorite

    if(typeof(fav) != "number")
        res.sendStatus(500)

    l.changeFilmFav(id, fav).then((q)=>{
        res.send(`Film ${id} favorite updated succesfully`)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.delete('/films/:id', (req, res)=>{
    const id = req.params.id
    const rating = req.body.rating

    l.deleteFilm(id).then((q)=>{
        res.send(`Film deleted succesfully`)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.listen(3000, ()=>{console.log("Running!")})