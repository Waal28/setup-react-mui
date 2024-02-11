import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL_API;
export async function getData(route: any) {
  try {
    const res = await axios.get(`${baseURL}/${route}`);
    return res.data.data;
  } catch (error: any) {
    return error.data;
  }
}

export async function postData(route: any, data: any) {
  try {
    await axios.post(`${baseURL}/${route}`, data);
    return { status: 200 };
  } catch (error: any) {
    return error.response;
  }
}
