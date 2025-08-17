export default function Card({ datapoint }) {
  const imageUrl = datapoint.image 
    ? `http://localhost:8000/images/${datapoint.image}`
    : `https://source.unsplash.com/400x200/?${encodeURIComponent(datapoint.name)}`;

    
    console.log(datapoint)
    return(
        <>
            <div>
                <h3>{datapoint.name}</h3>
                <img src={imageUrl} alt={datapoint.name}/>
                <p>Location: {datapoint.location}, {datapoint.country}</p>
                <p>{datapoint.details[1].description}</p>
            </div>

        </>
    )
}

                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

