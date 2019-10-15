(function () {
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const genreList = document.getElementById('list-tab')
  const movieContent = document.getElementById('nav-tabContent')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }

  // 將API資料存入localStorage
  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    localStorage.setItem('results', JSON.stringify(data))
  }).catch((err) => console.log(err))

  const results = JSON.parse(localStorage.getItem('results'))

  // set genre lists
  function genreDisplay() {
    for (var item in genres) {
      genreList.innerHTML += `<a class="list-group-item list-group-item-action" id="list-${genres[item]}-list" data-toggle="list" href="#list-${genres[item]}" role="tab" aria-controls="${genres[item]}" data-id="${item}">${genres[item]}</a>`
    }
    // 預設選取第一列Action
    const firstItem = document.querySelector('#list-Action-list')
    firstItem.classList.add('active')
  }

  // set movie display
  function movieDisplay(data, genre) {
    let htmlContent = ''
    data.forEach(function (item) {

      if (item.genres.indexOf(genre) !== -1) {
        htmlContent += `
          <div class="col-sm-3">
            <div class="card mb-3" style="min-width:120px;">
              <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
              <div class="card-body pb-0 movie-item-body">
                <h6 class="card-title">${item.title}</h6>
              </div>
              <!-- Genre info -->
              <div class="card-footer border-top-0 pt-0">
        `
        item.genres.forEach(function (genre) {
          htmlContent += `
                <small class="text-muted pr-3">${genres[genre]}</small>
        `
        })
        htmlContent += `
              </div>
            </div>
          </div>
        `
      }
      movieContent.innerHTML = htmlContent
    })
  }

  // 監聽器設置
  genreList.addEventListener('click', function () {
    movieDisplay(results, Number(event.target.dataset.id))
  })


  // 設定初始頁面
  genreDisplay()
  movieDisplay(results, 1)
})()