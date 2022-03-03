const API_URL = 'https://rickandmortyapi.com/api/character'
const urlBusqueda = 'https://rickandmortyapi.com/api/character/?name='



const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.querySelector('#main')

const getMovies = async (url, busqueda) => {
    try {
        const res = await fetch(url)
        const data = await res.json()
        if (data.results.length === 0) {
            swal.fire({
                title: 'Error!',
                text: `No se ha encontrado nada referente a ${busqueda}`,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        } else {
            showMovies(data.results)
        }
    } catch (error) {
        swal.fire({
            title: 'Error!',
            text: `No se ha encontrado nada referente a ${busqueda}`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
}
getMovies(API_URL)

//otra forma de hacerlo
// const getMovies=()=>{
//     const res = fetch(url)
//     const data = res.json()
//     console.log(data.results);
// }
// getMovies(API_URL)

const showMovies = (movies) => {
    main.innerHTML = ''
    movies.forEach(movie => {
        const { id, name, species, image, status } = movie
        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')
        movieDiv.innerHTML = `
        <img src="${image}" alt="${id}">
        <div class="movie-info">
            <h3>${name}</h3>
            <span class="green">${species}</span>
        </div>
        <div class="overview">
        <h3>Status</h3>
            <h3>${status}</h3>
        </div>
        `
        main.appendChild(movieDiv)
    });


    console.log(movies);
}



form.addEventListener('submit', e => {
    e.preventDefault()

    const searchTerm = search.value.toLocaleLowerCase()
    if (searchTerm && searchTerm !== '') {
        getMovies(urlBusqueda + searchTerm, searchTerm)
        search.value = ''
    } else {
        swal.fire({
            title: 'Error!',
            text: 'Debe escribir algo en la barra de busqueda',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })
    }
})