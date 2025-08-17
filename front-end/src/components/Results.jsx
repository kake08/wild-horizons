import Card from './Card.jsx'

export default function Results({data}) {
    if (!Array.isArray(data)) return null;

    return(
        <>
            <div>
                {data.map((datapoint, index) => {
                    return <Card key={index} datapoint={datapoint}></Card>
                })}
            </div>
        </>
    );
}