import { District } from "../types/types";
import React from "react";
import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

// util functions

// creates a date SQL style date string
export const createDate = (): string => {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
};

// formats SQL style date string for easier readable string
export const formatDate = (rawDate: string): string => {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    }).format(new Date(rawDate));
    return formattedDate;
};

// maps district id to district name for descriptive readable string
export const displayDistrict = (
    districts: District[],
    district: number
): string => {
    const districtIndex = districts.findIndex(
        (d: District) => district === d.id
    );
    return districts[districtIndex]?.name;
};

// evaluates verified status on user and returns a descriptive icon (green check - true; red x - false)
export const displayVerified = (status: boolean): JSX.Element =>
    status ? (
        <CheckCircleTwoTone
            twoToneColor={"#40DFA0"}
            style={{ fontSize: "1.25rem" }}
        />
    ) : (
        <CloseCircleTwoTone
            twoToneColor={"#eb4034"}
            style={{ fontSize: "1.25rem" }}
        />
    );
