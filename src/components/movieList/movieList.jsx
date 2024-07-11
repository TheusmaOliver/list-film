"use client"

import React, { useState } from 'react';
import Select from 'react-select';

const initialMovies  = [
  { id: 1, name: 'The Shawshank Redemption', genres: ['Drama'] },
  { id: 2, name: 'The Godfather', genres: ['Crime', 'Drama'] },
  { id: 3, name: 'The Dark Knight', genres: ['Action', 'Crime', 'Drama'] },
  { id: 4, name: 'Pulp Fiction', genres: ['Crime', 'Drama'] },
  { id: 5, name: 'Forrest Gump', genres: ['Drama', 'Romance'] },
];

const genres = [
  { value: 'Action', label: 'Action' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Romance', label: 'Romance' },
];

const defaultGenre = { value: 'Drama', label: 'Drama' };

const MovieList = () => {
    const [movies, setMovies] = useState(initialMovies);
    const [selectedGenre, setSelectedGenre] = useState(defaultGenre);

    const handleGenreChange = (selectedOption) => {
        setSelectedGenre(selectedOption || defaultGenre);
    };

    const handleRemoveMovie = (id) => {
        setMovies(movies.filter((movie) => movie.id !== id));
    };
    const filteredMovies = selectedGenre
        ? movies.filter((movie) => movie.genres.includes(selectedGenre.value))
        : movies;

    return (
        <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold my-4">Movie List</h1>
        <div className="my-4">
            <Select
            options={genres}
            className="basic-select"
            classNamePrefix="select"
            value={selectedGenre}
            onChange={handleGenreChange}
            isClearable={false}
            />
        </div>
        <h2 className="text-3xl font-bold my-4">{selectedGenre.value}</h2>
        <ul className="bg-white shadow-md rounded-lg mt-4">
            {filteredMovies.map((movie) => (
            <li
                key={movie.id}
                className="border-2 border-gray-200 p-4 flex justify-between items-center"
            >
                <div>
                <p className='font-bold'>{movie.name}</p>
                <p className='text-sm text-gray-600 font-normal'>{movie.genres.join(', ')}</p>
                </div>
                <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleRemoveMovie(movie.id)}
                >
                Remove
                </button>
            </li>
            ))}
        </ul>
        </div>
  );
};

export default MovieList;
