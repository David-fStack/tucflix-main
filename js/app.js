const get_data = async(texto_buscar, pagina) => {
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=edc78b25d434d9e6e022821ef7ede8b7&language=es-ES&query=${texto_buscar}&page=${pagina}&include_adult=false`)
  const json = await data.json()

  return json
}

const get_peliculas = async(pagina) => {
  const texto = document.getElementById('textoBuscar')
  const buscar = texto.value
  
  if (buscar != "")
  {
    const resultado = await get_data(buscar,pagina)
    const resultadoTexto = document.getElementById('resultadoBuscarTexto')
    const resultadoCards = document.getElementById('resultadoBuscarCards')
    const resultadoPaginas = document.getElementById('resultadoBuscarPaginas')

    const cantidadPeliculas = resultado.total_results
    const cantidadPaginas = resultado.total_pages

    if (cantidadPeliculas === 0)
    {
      resultadoTexto.innerHTML = `<h5 class="m-2 fs-5 text-white">No hay resultados para su busqueda...</h5>`
      resultadoCards.innerHTML = ""
      resultadoPaginas.innerHTML = ""
      return;
    }
     
    const resultadoOrdenado = resultado.results.sort(function (a, b) {
        if (a.popularity > b.popularity) {
          return -1;
        }
        if (a.popularity < b.popularity) {
          return 1;
        }
        return 0;
      })


    localStorage.clear()

    resultadoTexto.innerHTML  = `<h5 class="m-2 fs-7 text-white">Se encontraron ${cantidadPeliculas} películas...</h5>`

    const dataCard = resultadoOrdenado.map(p => `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class = "color-azul  w-100 h-100 m-2">
          <a href="detalle.html" onclick="set_pelicula_seleccionada(${p.id})">
            <img src="https://image.tmdb.org/t/p/w300${p.poster_path}" onerror="this.src='./img/sin-imagen.jpg'" class="card-img-formato" alt="${p.id}" data-bs-toggle="tooltip" data-bs-placement="top" title="${p.title}"
            Tooltip on topid=img-"${p.id}">
          </a>
        </div>
      </div>`)
      resultadoCards.innerHTML = dataCard.join(" ")

      
  }
  else
  {
    alert("Debe ingresar un texto a buscar")
  }
}


// ESTRENOS
const ordenarPorPopularidad = (a, b) => {
    if (a.popularity > b.popularity){
      return -1;
    }

    if (a.popularity < b.popularity) {
      return 1;
    }
    
    return 0;
}
const getEstrenos = () => {
  fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=89df84660fd894ea35a8a575fc64f376&language=es-ES&page=1')
  .then(response => response.json())
  .then(data => {
      const box =  document.getElementById('cardEstrenos')

      const infoData= data.results.sort (ordenarPorPopularidad).map(info => 
      `<div class="d-flex justify-content-between col-12 col-sm-6 col-md-4 col-lg-3" style="width: 16rem;">
      <a href="detalle.html"  onclick="set_pelicula_seleccionada(${info.id})">
      <img class="card-img-formato" src="https://image.tmdb.org/t/p/w500${info.poster_path}" class="card-img-top" alt="${info.id}">
      <div class="card-body">
      </a>
      </div>`)
      box.innerHTML= infoData

    })
  }

const getPeliculasPopulares = () => {
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=edc78b25d434d9e6e022821ef7ede8b7&language=es-ES&page=1')
  .then(response => response.json())
  .then(data => {
      const box =  document.getElementById('cardPeliculasPopulares')

      const infoData= data.results.sort (ordenarPorPopularidad).map(info => 
      `<div class="d-flex justify-content-between col-12 col-sm-6 col-md-4 col-lg-3" style="width: 16rem;">
      <a href="detalle.html"  onclick="set_pelicula_seleccionada(${info.id})">
      <img class="card-img-formato" src="https://image.tmdb.org/t/p/w500${info.poster_path}" class="card-img-top" alt="${info.id}">
      <div class="card-body">
      </a>
      </div>`)
      box.innerHTML= infoData
  }) 
}

const getSeriesPopulares = () => {
  fetch('https://api.themoviedb.org/3/tv/popular?api_key=edc78b25d434d9e6e022821ef7ede8b7&language=es-ES&page=1')
  .then(response => response.json())
  .then(data => {
      const box =  document.getElementById('cardSeriesPopulares')

      const infoData= data.results.sort (ordenarPorPopularidad).map(info => 
      `<div class="d-flex justify-content-between col-12 col-sm-6 col-md-4 col-lg-3" style="width: 16rem;">
      <a href="detalleSerie.html"  onclick="set_serie_seleccionada(${info.id})">
      <img class="card-img-formato" src="https://image.tmdb.org/t/p/w500${info.poster_path}" class="card-img-top" alt="${info.id}">
      <div class="card-body">
      </a>
      </div>`)
      box.innerHTML= infoData
  }) 
}  

getEstrenos()
getPeliculasPopulares()
getSeriesPopulares()

const set_pelicula_seleccionada = async(idpelicula) => {
   localStorage.setItem("peliculaSeleccionada", idpelicula)
}

const set_serie_seleccionada = async(idserie) => {
  localStorage.setItem("serieSeleccionada", idserie)
}

// formulario
const getFormulario = () => {
  const name = document.getElementById('nameFormulario').value
  const email = document.getElementById('emailFormulario').value
  const series = document.getElementById('select1').checked
  const pelis = document.getElementById('select2').checked
  const text = document.getElementById('textAreaForm').value

  localStorage.setItem('name', name)
  localStorage.setItem('email', email)
  localStorage.setItem('series', series)
  localStorage.setItem('pelis', pelis)
  localStorage.setItem('text', text)

}//FIN DE FORMULARIO