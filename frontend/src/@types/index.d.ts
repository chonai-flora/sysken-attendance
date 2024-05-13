export type Member = {
    id: string;
    name: string;
    grade: number;
    course_id: number;
    number: number;
    barcode: string;
};

export type InputValues = {
    name: {
        lastName: string;
        firstName: string;
    };
    grade: number;
    courseName: string;
    number: number;
    barcode: string;
};