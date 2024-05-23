import dayjs from 'dayjs'

export default function Film(id, title, favorite=0, date=null, score=null, user=1) {
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
        const watchDate = this.date ? this.date.format('DD/MM/YYYY') : null
        if (watchDate != null)
            string += watchDate
        else
            string += "not watched yet"
        string += ", Score: " + this.score;
        string += ", User: " + this.user;

        return string;
    }

    this.deleteDate = () =>{
        if(this.date != null)
            this.date = null;
    }
}