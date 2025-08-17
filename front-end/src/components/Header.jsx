import { useState } from 'react'
import Results from './Results.jsx'

export default function Header() {
    const [data, setData] = useState();
    const [locationType, setLocationType] = useState('');

    // const fetchData = async() => {  } = prevents variable binding from changing - safer
    async function fetchData(endpoint) {
        const response = await fetch (`http://localhost:8000/${endpoint}`);
        const json = await response.json();
        setData(json);
    };

    const handleChange = (event) => {
        setLocationType(event.target.value);
    };
    return (
        <>
            <h1>Wild Horizons</h1>
            <h1>{locationType != ''? `of ${locationType}` : ''}</h1>
            <div>
                <button onClick={() => fetchData('api')}>Get All</button>
                <input type="text" value={locationType} onChange={handleChange}></input>
                <button onClick={() => fetchData(`api/continent/${locationType.toLowerCase()}`)}>Filter</button>
                <Results data={data}></Results>
            </div>  
        </>
    )
}

