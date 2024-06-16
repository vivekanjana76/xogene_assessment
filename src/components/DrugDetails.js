// src/components/DrugDetails.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function DrugDetails() {
  const location = useLocation();
  const drug = location.state?.drug;
  const [ndcs, setNdcs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNDCs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${drug.rxcui}/ndcs.json`);
        setNdcs(response.data.ndcGroup.ndcList.ndc);
      } catch (error) {
        setError('Error fetching NDCs');
      } finally {
        setLoading(false);
      }
    };

    if (drug) {
      fetchNDCs();
    }
  }, [drug]);

  if (!drug) return <div>No drug information available</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{drug.name}</h1>
      <p><strong>RxCUI:</strong> {drug.rxcui}</p>
      <p><strong>Synonym:</strong> {drug.synonym}</p>
      <h2 className="text-xl font-bold mt-4">NDCs</h2>
      {loading && <div className="flex justify-center mb-4"><ClipLoader size={50} /></div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul>
        {ndcs.map((ndc) => (
          <li key={ndc}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
}

export default DrugDetails;
