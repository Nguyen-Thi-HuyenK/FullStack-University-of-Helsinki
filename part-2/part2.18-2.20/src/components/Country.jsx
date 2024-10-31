import React, {useState, useEffect} from "react";
import axios from "axios";

const Country =() => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                setMessage('Error fetching data. Please try again.');
                setTimeout(() => {
                    setMessage('');
                }, 5000);
            });
    }, []);

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
      };

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
    );

    const renderCountriesList = () => {
        
        if (filteredCountries.length > 10) {
            
          return <p>Too many matches, please specify your query.</p>;
          
        } else if (filteredCountries.length > 1) {
          return filteredCountries.map((country) => (
            <div key={country.cca3} onClick={() => handleCountryClick(country)}>
              {country.name.common}
            </div>
          ));
        } else if (filteredCountries.length === 1) {
          const { name, capital, area, flags, languages } = filteredCountries[0];
          return (
            <div>
              <h2>{name.common}</h2>
              <img src={flags.png} alt={`Flag of ${name.common}`} width="150" />
              <p>Capital:{capital}</p>
              <p>Area: {area} km²</p>
              <p><strong>Languages:</strong> {Object.values(languages).join(', ')}</p>
            </div>
          );
        }
    };

    return (
        <div>
            <h1>Find country</h1>
            <input 
                type="text" 
                placeholder="Search for a country"
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
            />
            {message && <div>{message}</div>}
            {search && renderCountriesList()}
        </div>
    )
}

export default Country;