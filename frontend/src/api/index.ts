import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = import.meta.env.VITE_DATABASE_URL || "";

export const getMemberByBarcode = (barcode: string): Promise<AxiosResponse> => {
    return axios.get(`/members/barcode/${barcode}`);
}

export const createLog = (barcode: string, date: Date): Promise<AxiosResponse> => {
    const formattedDate = new Date(date.getTime() + 540 * 60 * 1000);
    
    return axios.post(`/logs`, {}, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        params: {
            barcode: barcode,
            date: formattedDate.toISOString().split("T")[0],
        }
    });
}