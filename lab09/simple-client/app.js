'use strict';

document.addEventListener('DOMContentLoaded', event => {
    console.log("Page loaded");

    document.getElementById('loadbtn').addEventListener('click', async () => {
        // on button click
        try {
            const response = await fetch('http://localhost:3001/api/films')
            if (response.ok) {
                const films = await response.json()
                const div = document.getElementById('filmList')
                div.innerHTML = `<p>We have ${films.length} films</p>`
                for (const f of films) {
                    console.log(f)
                    div.innerHTML += `<p>${f.title}</p>`
                }
            } else {
                console.log('http error code', response.status)
            }
        } catch (e) {
            console.log('Network error')
        }
    })

});  