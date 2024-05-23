'use strict';

document.addEventListener('DOMContentLoaded', event => {
    console.log("Page loaded");

    document.getElementById('loadbtn').addEventListener('click', async () => {
        // on button click
        try {
            const response = await fetch('http://localhost:3001/api/films')
            if (response.ok) {
                const films = await response.json()
                writeOnPage(films, "All")
            } else {
                console.log('http error code', response.status)
            }
        } catch (e) {
            console.log('Network error')
        }
    })

    //FILTER BUTTONS
    document.getElementById('filterbtn1').addEventListener('click', async () => {
        // on button click
        try {
            const response = await fetch('http://localhost:3001/api/films/favorite')
            if (response.ok) {
                const films = await response.json()
                writeOnPage(films, "Favorite")
            } else {
                console.log('http error code', response.status)
            }
        } catch (e) {
            console.log('Network error')
        }
    })

    document.getElementById('filterbtn2').addEventListener('click', async () => {
        // on button click
        try {
            const response = await fetch('http://localhost:3001/api/films/ratings')
            if (response.ok) {
                const films = await response.json()
                writeOnPage(films, "Best rated")
            } else {
                console.log('http error code', response.status)
            }
        } catch (e) {
            console.log('Network error')
        }
    })

    document.getElementById('filterbtn3').addEventListener('click', async () => {
        // on button click
        try {
            const response = await fetch('http://localhost:3001/api/films/lastMonth')
            if (response.ok) {
                const films = await response.json()
                writeOnPage(films, "Last month")
            } else {
                console.log('http error code', response.status)
            }
        } catch (e) {
            console.log('Network error')
        }
    })

    document.getElementById('filterbtn4').addEventListener('click', async () => {
        // on button click
        try {
            const response = await fetch('http://localhost:3001/api/films/unseen')
            if (response.ok) {
                const films = await response.json()
                writeOnPage(films, "Unseen")
            } else {
                console.log('http error code', response.status)
            }
        } catch (e) {
            console.log('Network error')
        }
    })
});  

function writeOnPage(films, textIntro){
    const div = document.getElementById('filmList')
    div.innerHTML = `<p>${textIntro} films</p>`
    for (const f of films) {
        console.log(f)
        div.innerHTML += `<p>${f.title}</p>`
    }
}