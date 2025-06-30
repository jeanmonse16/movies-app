import './App.css'
import React, { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Grid } from "@mui/material"
import Card from './components/Card'
import { getMovies, getStudios } from './api'
import Filters from './components/Filters'
import TransferMovieModal from './modals/TransferMovie'
import NoMoviesFound from './components/NoMoviesFoundMessage'
import Loading from './components/Loading'

const App = () => {
  const [studios, setStudios] = useState([])
  const [movies, setMovies] = useState([])
  const [loader, setLoader] = useState(false)
  const [responsiveStyle, setResponsiveStyle] = useState({ avatarSize: 280, cardStyle: 'regularCard' })

  const [titleFilter, setTitleFilter] = useState('') 
  const [selectedGenres, setSelectedGenres] = useState([])
  const [priceRange, setPriceRange] = useState({ from: 0, to: 5000 })

  const [movieToTransfer, setMovieToTransfer] = useState(null)

  const updateMovies = async () => {
    setLoader(true)
    return Promise.all([getMovies(), getStudios()])
      .then(responses => {
        setMovies(responses[0])
        setStudios(responses[1])
      })
      .then(() => setLoader(false))
      .catch(() => setLoader(false))
      
  }

  useEffect(() => {
    let timeoutId

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setResponsiveStyle(
          window.innerWidth < 600
            ? { avatarSize: 60, cardStyle: 'smallCard' }
            : { avatarSize: 280, cardStyle: 'regularCard' }
        );
      }, 150)
    }

    window.addEventListener('resize', handleResize)

    handleResize()
    
    updateMovies()

    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }

  }, [])

  const filteredMovies = () => movies
      .filter(movie => 
        movie.name.toLocaleLowerCase().includes(titleFilter.toLocaleLowerCase())
      )
      .filter(movie => selectedGenres.length > 0 ? selectedGenres.includes(movie.genreName) : true)
      .filter(movie => priceRange.from <= movie.price && movie.price <= priceRange.to )
  
  return (
    <>
    <div className="App">
        <div className="App-studios App-flex"> 
          
          <Filters 
            titleFilter={titleFilter} 
            setTitleFilter={setTitleFilter}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          
          <h3>Images:</h3>
           <div 
      
    >
      {
        loader
          ? <Loading />
          : <Grid container justify="center" alignItems="center">
            {
              filteredMovies().length === 0
                ? <NoMoviesFound />
                : filteredMovies()
                .map(movie =>
                <Card 
                  key={movie.id} 
                  movie={movie} 
                  avatarSize={responsiveStyle.avatarSize} 
                  cardStyle={responsiveStyle.cardStyle} 
                  studios={studios}
                  setMovieToTransfer={setMovieToTransfer}
                />
              )
            }
          </Grid>
      }

    </div>
         
    </div>
      </div>
      {
        movieToTransfer !== null && createPortal(
          <TransferMovieModal 
            onClose={() => setMovieToTransfer(null) } 
            selectedMovie={movieToTransfer} 
            studios={studios.filter(studio => Number(studio.id) !== Number(movieToTransfer.studioId))}
            updateMovies={updateMovies}
          />,
          document.body
        )
      }
    </>
      
    )
}

export default React.memo(App)
