// src/components/MainLayout.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function MainLayout() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchDrugs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8000/drugs?name_like=${query}`);
      const drugs = response.data;
      if (drugs.length > 0) {
        setSuggestions(drugs);
      } else {
        await getSpellingSuggestions();
      }
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const getSpellingSuggestions = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/spellingsuggestions?name_like=${query}`);
      const suggestions = response.data;
      if (suggestions.length > 0) {
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
        setError('No drugs found.');
      }
    } catch (error) {
      setError('Error fetching spelling suggestions');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchDrugs();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drug Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for drugs"
          className="border p-2 w-full mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mb-4">
          Search
        </button>
      </form>
      {loading && <div className="flex justify-center mb-4"><ClipLoader size={50} /></div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {suggestions.map((drug) => (
          <li
            key={drug.rxcui}
            onClick={() => navigate(`/drugs/${drug.name}`, { state: { drug } })}
            className="cursor-pointer"
          >
            {drug.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainLayout;
