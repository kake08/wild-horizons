export const getDataByQueryParams = (data, queryObj) => {

    // return data.


    // deconstructor for query object
    //conditional statements for all country, continent and is_open_to_public
    //are these present in the query obj? if so, filter accordingly and return
    const {country, continent, is_open_to_public} = queryObj

    if (is_open_to_public) {
        data = data.filter(destination => {
            return destination['is_open_to_public'] === JSON.parse(is_open_to_public)
        })
    }
    if (country) {
        data = data.filter(destination => {
            return destination['country']?.toLowerCase() === country.toLowerCase()
        })
    }
    if (continent) {
        data = data.filter(destination => {
            return destination['continent']?.toLowerCase() === continent.toLowerCase()
        })
    }

    return data;

}