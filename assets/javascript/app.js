var differentAnimals = ["Fish", "Iguanas", "Dogs", "Cats", "Scorpions", "Snakes", "Turtles", "Chameleons",
    "Sharks", "Alligators", "Sea Horses", "Horses"]

// $(".newGif").on("click", function() {
//     event.preventDefault()
//     var newTerm = $(".newInput").val()
//     var anotherButton = $("<button class='anAnimal'>" + newTerm + "</button>")
//     anotherButton.attr("data-name", newTerm)
//     $(".theTopCenter").prepend(anotherButton)
// })

differentAnimals.forEach(function (anAnimal) {
    var newButton = $("<button class='anAnimal'>" + anAnimal + "</button>")
    newButton.attr("data-name", differentAnimals[differentAnimals.indexOf(anAnimal)])
    $(".theTopCenter").append(newButton)
})

$(".anAnimal").on("click", function () {
    console.log("hi")
    $(".theBottomCenter").empty()
    var anAnimal = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RFZKvc0VsGl0teRHhey8hqFjg69V6a1y&q="
        + anAnimal + "&limit=10&offset=0&&lang=en"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var theArray = response.data
        theArray.forEach(function(eachGif) {
            var theRating = $("<h2 class='theRating'>Rating: " + eachGif.rating.toUpperCase() + "</h2>")
            var createDiv = $("<div class='aDiv'>")
            var createGif = $("<img class='aGif' src='" + eachGif.images["480w_still"].url + "'>")
            createGif.attr("dataStill", eachGif.images["480w_still"].url)
            createGif.attr("dataAnimate", eachGif.images.original.url)
            createGif.attr("dataState", "still")
            createDiv.append(createGif)
            createDiv.append(theRating)
            
            $(".theBottomCenter").append(createDiv)
            
            
        })
        $(".aGif").on("click", function() {
            var state = $(this).attr("dataState")
            if(state === "still") {
                $(this).attr("src", $(this).attr("dataAnimate"))
                $(this).attr("dataState", "animate")
            } else if(state === "animate") {
                $(this).attr("src", $(this).attr("dataStill"))
                $(this).attr("dataState", "still")
            }
        })


        console.log(response.data[0])
    })
})
