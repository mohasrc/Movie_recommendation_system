
async function record_movie(elm){
    movie_data = document.getElementById(elm).innerText
    let data = await eel.movie_watched(movie_data)(); // Pass data to localhost
    swal("(" + data[1] + ") movie", data[0]+" has been watched", "success");
}

async function run_algo() {
    signal = await eel.run_algo()();
    if (signal == "NONE"){
        swal("NO RECORDS", "Make sure to watch movies first", "error");
    }else{
        let movies_info_txt_tag = document.getElementsByName("movie_info_txt")
        var mov_counter = 0

        for (let current_movie_index = 0; current_movie_index < signal.length; current_movie_index++) {
            const elm = signal[current_movie_index];
            for (let ii = 0; ii < elm.length; ii++) {
                // Iteration of all movies by each genre
                let movies_info = elm[ii][0]
                let poster_link = elm[ii][1]
                
                let movie_genre = movies_info[1]
                let movie_rating = movies_info[3]
                let movie_date = movies_info[movies_info.length - 1]
                
                // UI info update
                let movie_txt = "Genre: "+movie_genre+"<br>Year: "+movie_date+"<br>Rate: "+movie_rating
                movies_info_txt_tag[mov_counter].innerHTML = movie_txt

                // i.e. Zookeeper,Comedy,14,42,80,2011
                let movie_specs = movies_info[0]+","+movies_info[1]+","+movies_info[2]+","+movies_info[3]+","+movies_info[4]+","+movies_info[5]
                document.getElementById("movie_info_"+(mov_counter+10)).innerText = movie_specs

                document.getElementById("RM_image"+mov_counter).style.backgroundImage = "url("+poster_link+")"

                mov_counter++
            }
        }

        swal("ALGORITHM WORKED SUCCESSFULLY", "recommendations generated", "success");
    }
}

async function get_graph() {
    signal = await eel.get_graph()();
    if (signal == "NONE"){
        swal("NO DATA PROVIDED", "Make sure to Run Algo. first", "error");
    }
}

async function get_statistics() {
    signal = await eel.get_statistics()();
    if (signal == "NONE"){
        swal("NO DATA PROVIDED", "Make sure to Run Algo. first", "error");
    }
}

async function get_history() {
    signal = await eel.get_history()();
    if (signal == "NONE"){
        swal('No history available', "")
    }else{
        result = ""
        limit = signal.length
        if (signal.length >= 6){
            limit = 5
        }
        for (let index = 0; index < limit; index++) {
            const elm = signal[index];
            result += elm + "\n"
        }
        swal('Last 5 movies watched', result)
    }
}