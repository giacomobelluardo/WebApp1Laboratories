import express from 'express'
import dayjs from 'dayjs';
import morgan from 'morgan'
import cors from 'cors'
import FilmLibrary from "./dao.mjs"

//init
const app = express();
const port = 3001;

app.use(morgan('commmon'));
app.use(express.json());
app.use(cors());

// This function is used to handle validation errors
const onValidationErrors = (validationResult, res) => {
    const errors = validationResult.formatWith(errorFormatter);
    return res.status(422).json({validationErrors: errors.mapped()});
};

// Only keep the error message in the response
const errorFormatter = ({msg}) => {
    return msg;
};

const l = new FilmLibrary()

//ROUTES

app.get('/api/films', (req, res)=>{
    l.storeFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/api/films/favorite', (req, res)=>{
    l.favoriteFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/api/films/ratings', (req, res)=>{
    l.ratedFilms(4).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/api/films/lastMonth', (req, res)=>{
    l.monthFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/api/films/unseen', (req, res)=>{
    l.unseenFilms().then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.get('/api/films/:id', (req, res)=>{
    const idFilm = req.params.id

    l.thatFilm(idFilm).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.post('/api/films', (req, res)=>{
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

app.put('/api/films/:id', (req, res)=>{
    const id = req.params.id
    const filmJs = req.body

    l.changeFilm(id, filmJs).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

app.put('/api/films/:id/rating', (req, res)=>{
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


app.put('/api/films/:id/favorite', (req, res)=>{
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

app.delete('/api/films/:id', (req, res)=>{
    const id = req.params.id
    const rating = req.body.rating

    l.deleteFilm(id).then((q)=>{
        res.send(`Film deleted succesfully`)
    }).catch((err)=>{
        res.statusCode(500).send("Database error: " + err)
    }
    )
})

// start the server
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });
