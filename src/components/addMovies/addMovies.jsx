"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Select from 'react-select';

const genres = [
  { value: 'Action', label: 'Action' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Romance', label: 'Romance' },
];

const AddMovie = () => {
  const [name, setName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Certifique-se de que o roteador está pronto antes de usá-lo
    if (!router.isReady) return;
  }, [router.isReady]);

  const handleAddMovie = () => {
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
    const newMovie = {
      id: storedMovies.length + 1,
      name,
      genres: selectedGenres.map(g => g.value)
    };
    const updatedMovies = [...storedMovies, newMovie];
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Add New Movie</h1>
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700">Movie Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700">Genres</label>
        <Select
          options={genres}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={selectedGenres}
          onChange={setSelectedGenres}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        onClick={handleAddMovie}
      >
        Add Movie
      </button>
    </div>
  );
};

export default AddMovie;
