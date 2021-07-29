import { District } from "../types/types";

export const formatDate = (rawDate: string): string => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(new Date(rawDate));
    return formattedDate;
};

export const createDate = (): string => {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
};

export const displayDistrict = (
    districts: District[],
    district: number
): string => {
    const districtIndex = districts.findIndex(
        (d: District) => district === d.id
    );
    return districts[districtIndex]?.name;
};

export const displayVerified = (status: boolean): string =>
    status ? "True" : "False";
