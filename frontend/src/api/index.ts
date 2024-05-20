import axios, { AxiosResponse } from "axios";
import { InputValues } from "../@types";

axios.defaults.baseURL = import.meta.env.VITE_DATABASE_URL || "";

export const getCourses = (): Promise<AxiosResponse> => {
    return axios.get(`/courses`);
}

export const registerMember = (inputValues: InputValues): Promise<AxiosResponse> => {
    return axios.post(`/members`, {}, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        params: {
            last_name: inputValues.name.lastName,
            first_name: inputValues.name.firstName,
            grade: inputValues.grade,
            course_name: inputValues.courseName,
            number: inputValues.number,
            barcode: inputValues.barcode,
        }
    });
}

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