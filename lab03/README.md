# `lab 3`

Laboratory 3

## APIs

2 objects : Film, Film library

GET /films
give me the list of all films available

[{id, title, isFavorite, watchDate, rating, userId}, {id, title, isFavorite, watchDate, rating, userId}]            #full content of elements

GET /films/favorite
give me the list of favorite films

[
    {
        "id": 2,
        "title": "Example 1 film",
        "isFavorite": true,
        "watchDate": "2024-04-02",
        "rating": 3,
        "userId": 1
    },
    {
        "id": 3,
        "title": "Example 2 film",
        "isFavorite": true,
        "watchDate": "2024-04-01",
        "rating": 4,
        "userId": 1
    }
]

GET /films/ratings
Retrieve me all films with maximum score

give me the list of favorite films

[
    {
        "id": 2,
        "title": "Example 1 film",
        "isFavorite": true,
        "watchDate": "2024-04-02",
        "rating": 5,
        "userId": 1
    },
    {
        "id": 3,
        "title": "Example 2 film",
        "isFavorite": true,
        "watchDate": "2024-04-01",
        "rating": 5,
        "userId": 1
    }
]

GET /films/lastMonth
retrieve the list of films seen last month
[
    {
        "id": 2,
        "title": "Example 1 film",
        "isFavorite": true,
        "watchDate": "2024-04-02",
        "rating": 3,
        "userId": 1
    },
    {
        "id": 3,
        "title": "Example 2 film",
        "isFavorite": true,
        "watchDate": "2024-04-01",
        "rating": 4,
        "userId": 1
    }
]

GET /films/unseen
retrieve the list of films unseen

[
    {
        "id": 2,
        "title": "Example 1 film",
        "isFavorite": true,
        "watchDate": null,
        "rating": 3,
        "userId": 1
    },
    {
        "id": 3,
        "title": "Example 2 film",
        "isFavorite": true,
        "watchDate": null,
        "rating": 4,
        "userId": 1
    }
]

GET /films/:id
Retrieve a film with a chosen id

GET /films/2

{
    "id": 2,
    "title": "Example 2 film",
    "isFavorite": true,
    "watchDate": null,
    "rating": 4,
    "userId": 1
}

POST /films
Will add a new Film

In the request body:
{
    "title": "Example 2 film",
    "isFavorite": true,
    "watchDate": "2024-04-02",
    "rating": 4,
    "userId": 1
}

server will automatically assign the ID

In the response body:
{
   "id":4,
    "title": "Example 2 film",
    "isFavorite": true,
    "watchDate": "2024-04-02",
    "rating": 4,
    "userId": 1
}

PUT films/:id
Modify a film 

PUT films/4

In the request body:
{
    "title": "Example 4 film",
    "isFavorite": true,
    "watchDate": "2024-04-01",
    "rating": 4,
    "userId": 1
}

In the response body
{
   "id":4,
    "title": "Example 4 film",
    "isFavorite": true,
    "watchDate": "2024-04-01",
    "rating": 4,
    "userId": 1
}

PUT films/:id/score
Modify the score of a chosen film

PUT films/4/score

In the request body:
{
    "rating":3
}

PUT films/:id/favorite
Modify the value of isFavorite of a film given its id

PUT films/4/favorite

In the request body:
{
    "isFavorite":0
}

DELETE films/:id
Delete a film given its id