import { data } from "../data/data.js"

export async function getDataFromDB() {
  return data;
}

//retrieve data from source and for export to backend - data.js