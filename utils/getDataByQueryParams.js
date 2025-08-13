export const getDataByQueryParams = (data, queryObj) => {

    const {country, continent, is_open_to_public} = queryObj

    if (is_open_to_public) {
        data = data.filter(destination => {
            return destination['is_open_to_public'] === JSON.parse(is_open_to_public.toLowerCase())
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