let reviews = new Array;
reviews.push(			   
		{ 
		"name": "Joshua B.",
		"rating": "4", 
		"text": "I was skeptical about the Blammock at first - I mean, a blanket that's a hammock? isnt that just a deconstructed hammock on the floor? But then I realized that the extra lining makes it a real picnic blanket, AND an extra comfortable hammock." 
		}
	);	

reviews.push(			   
		{ 
		"name": "John M.",
		"rating": "5" , 
		"text": "If you're looking for a product that combines the thrill of being suspended in the air with the comfort of being swaddled like a baby, the Blammock is for you."
		}
	);	
	
reviews.push(			   
		{ 
		"name": "Cassandra H.",
		"rating": "5" , 
		"text": "It doubles as a cape if you tie the ends together. Superhero status achieved!"
		}
	);	

reviews.push(			   
		{ 
		"name": "Hater McHater",
		"rating": "2" , 
		"text": "The Blammock is like a jack-of-all-trades, but a master of none. It's a backpack, a tote, a hammock, and a blanket - but it's not very good at any of those things. I felt like a clown trying to juggle all the different components, and ended up feeling more stressed than relaxed."
		}
	);	

reviews.push(			   
		{ 
		"name": "Steve C.",
		"rating": "3" , 
		"text": "While the Blammock is a cool idea, it's not very versatile. The backpack straps are awkward to use when the hammock is set up, and the tote function doesn't hold much."
		}
	);	
reviews.push(			   
	{ 
		"name": "Elissa M",
		"rating": "4" , 
		"text": "I was hesitant to try the Blammock, but I'm so glad I did. It's surprisingly comfortable to lie in, and the blanket keeps me warm even on chilly days. Plus, the backpack feature makes it so easy to carry around - I've taken it on hikes, picnics, and even to the beach. Highly recommend!"
		}
	);	
reviews.push(			   
	{ 
		"name": "Tyler L.",
		"rating": "4" , 
		"text": "I was impressed with the quality of the Blammock - it feels sturdy and well-made, but it's also lightweight enough to not weigh me down. The straps are adjustable and the fabric is breathable, so it doesn't get too hot or sweaty. It's perfect for those who want a comfortable and convenient way to relax outdoors."
		}
	);	
reviews.push(			   
	{ 
		"name": "Phil M.",
		"rating": "5" , 
		"text": "I suffer from chronic pain and find it difficult to sit for long periods of time. The Blammock has been a lifesaver - it allows me to lie down and rest my back without having to carry around a bulky mattress or cushion. It's also easy to adjust the straps and find the perfect angle for my body. I highly recommend it for anyone who needs a comfortable and supportive place to lie down."
		}
	);	


listAllReviews();

function listAllReviews(){
	reset();
    let output = document.querySelector("#results").innerHTML + "<br>";
    for(let i=0; i<reviews.length; i++){

        output += "<strong>" + reviews[i].name + " </strong><br>";

		for(let j=0; j < parseInt(reviews[i].rating); j++)
			{output += "<img src = media/StarFilled.png>"}

		for(let j = parseInt(reviews[i].rating); j< 5; j++)
			{output += "<img src = media/StarClear.png>"}

		output += "<br>" + reviews[i].text + " <br><br>";
    }
    document.querySelector("#results").innerHTML = output + "<br>";

}


document.querySelector("#search").addEventListener("click", function(){
    showResults();
})

function showResults(){
    reset();
    let search = document.querySelector("#keyword").value;
    //alert(search);
    let found = document.querySelector("#results").innerHTML + "<br>";
    for(let i=0; i<reviews.length; i++){
        if(reviews[i].text.indexOf(search) != -1){
            found += "<strong>" + reviews[i].name + " </strong><br>";

			for(let j=0; j < parseInt(reviews[i].rating); j++)
				{found += "<img src = media/StarFilled.png>"}

			for(let j = parseInt(reviews[i].rating); j< 5; j++)
				{found += "<img src = media/StarClear.png>"}

			found += "<br>" + reviews[i].text.replace(new RegExp(search, "gi"),  match => `<mark>${match}</mark>`) + "<br><br>";
        }
    }
    document.querySelector("#results").innerHTML = found + "<br>";
	document.querySelector("#keyword").value = "";

}

function reset(){
    document.querySelector("#results").innerHTML = "<hr>";
}
