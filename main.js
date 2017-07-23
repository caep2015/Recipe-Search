function searchFood() {
  var input = document.getElementById("searchRecipe").value;

  fetch(`https://crossorigin.me/http://www.recipepuppy.com/api/?q=${input}`)

    .then(function(response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json().then(function(data) {
        let main = document.querySelector('.main')

        var template = `
        <div class ="search-wrap">
    	   <div class = "searchBox">
            <input type="search" id="searchRecipe">
            <button type="submit" onclick="searchFood();">
            <i class="fa fa-search"></i></button>
          </div>
        </div>
        <div class = "container">
	      `
        for (var i = 0; i < data.results.length; i++) {
          console.log(data.results[i].title);
          template += `
          <div class = "returnedFoods">
            <a href="${data.results[i].href}">
            <img src = "${data.results[i].thumbnail}"
            onerror = "this.src='recipe_placeholder.jpg'"></a>
            <h3>${data.results[i].title}</h3>
          </div>
          `
        }
        template += `</div>`;
        document.querySelector('body').innerHTML = template
      });
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}
