const get_serie = async(idserie) => {
  const data = await fetch(`https://api.themoviedb.org/3/tv/${idserie}?api_key=edc78b25d434d9e6e022821ef7ede8b7&language=es-ES`)
  const json = await data.json()

  return json
}

const get_reparto = async(idserie) => {
  const data = await fetch(`https://api.themoviedb.org/3/tv/${idserie}/credits?api_key=edc78b25d434d9e6e022821ef7ede8b7&language=es-ES`)
  const json = await data.json()

  return json
}

const get_videos = async(idserie) => {
  const data = await fetch(`https://api.themoviedb.org/3/tv/${idserie}/videos?api_key=edc78b25d434d9e6e022821ef7ede8b7&language=es-ES`)
  const json = await data.json()

  return json
}


const ver_datos = async() => {
  const idserie = localStorage.getItem("serieSeleccionada")
  const datos = await get_serie(idserie) 
  const datosReparto = await get_reparto(idserie)
  const datosVideos = await get_videos(idserie)
  
  const portada = document.getElementById("portada")
  const reparto = document.getElementById("reparto")

  const generos = datos.genres.map(p => p.name).join(" / ")
  
  const imagenFondo = document.getElementById("imagen-fondo")
  const imagenFondoHtml = `<img class = "w-100 opacity-25" src="https://image.tmdb.org/t/p/original${datos.backdrop_path}" />`
  imagenFondo.innerHTML = imagenFondoHtml

  const htmlData = `
      <div class="col-12 col-sm-6 text-center">
        <img class="m-3 img-formato z-index2" src="https://image.tmdb.org/t/p/w500${datos.poster_path}" />
      </div>  
      <div class="col-12 col-sm-6">
        <h2 class="ms-3 mt-3 me-3 fs-1 fw-bold text-white">${datos.name}</h2>
        <h5 class="ms-3 mt-0 me-3 fs-6 text-white">${datos.tagline} </h5>

        <br>
        <h3 class="ms-3 mb-0 fs-5  text-white">${datos.number_of_seasons} Temporadas / ${datos.number_of_episodes} Episodios</h3>

        <br>
        <h3 class="ms-3 mb-0 fs-4 fw-bold text-white">Sinopsis</h3>
        <p class="ms-3 mt-0 me-3 fs-6 text-white">${datos.overview}</p>

        <br>
        <h3 class="ms-3 mb-0 fs-5 fw-bold text-white">Género/s</h3>
        <p class="ms-3 mt-0 me-3 fs-6 text-white">${generos}</p>

        <br>
        <a href="${datos.homepage}" target="_blank" class="ms-3 mt-0 me-3 fs-6 text-white">${datos.homepage}</a>

        <div>
          <button type="button" class="btn btn-danger m-3 fw-bold">Ver Ahora</button>
        </div>

      </div>
    `
  portada.innerHTML = htmlData

  const htmlReparto= datosReparto.cast.map(info => 
    `<div class="card col-4 col-sm-4 col-md-2 me-4 my-1" >
      <img src="https://image.tmdb.org/t/p/w200${info.profile_path}" onerror="this.src='./img/sin-imagen.jpg'" class="card-img-top" alt="${info.name}">
      <div class="card-body card-reparto">
        <p class="card-text">${info.name}</p>
      </div>
    </div>`
   )
  reparto.innerHTML= htmlReparto.join(" ")

  if (datosVideos.results.length > 0)
  {
    const posicion = datosVideos.results.findIndex(p => p.type === 'Trailer' && p.site === 'YouTube')
    if (posicion != -1)
    {
      const video = datosVideos.results[posicion]
      const trailer = document.getElementById("trailer")
      
      const htmlTrailer = `
        <div class = "my-2">
          <div class = "trailerpc">
            <h2 class="py-3 fs-5 fw-bold text-white">Trailer Oficial</h2>
            <iframe width="962" height="541" src="https://www.youtube.com/embed/${video.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class = "trailertb">
            <h2 class="py-3 fs-5 fw-bold text-white">Trailer</h2>
            <iframe width="673" height="378" src="https://www.youtube.com/embed/${video.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div class = "trailermb">
            <h2 class="py-3 fs-5 fw-bold text-white">Trailer</h2>
            <iframe src="https://www.youtube.com/embed/${video.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `
      trailer.innerHTML = htmlTrailer
    }
  }
}

ver_datos()

