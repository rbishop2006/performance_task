import React from "react";
import { District } from "../types/types";

const Filter = ({
    districts,
    showActiveUsersOnly,
    selectedDistrict,
    handleSelectedDistrict,
    setShowActiveUsersOnly,
}: FilterProps): JSX.Element => {
    return (
        <div>
            <label htmlFor="activeUsers">Active Users Only: </label>
            <input
                type="checkbox"
                name="activeUsers"
                checked={showActiveUsersOnly}
                onChange={() =>
                    setShowActiveUsersOnly((prevState: boolean) => !prevState)
                }
            />
            <label htmlFor="district">Filter by District: </label>
            <select
                value={selectedDistrict}
                onChange={(e) => handleSelectedDistrict(e)}
            >
                {districts &&
                    districts.map((d: District) => (
                        <option key={d.id} value={d.id}>
                            {d.name}
                        </option>
                    ))}
            </select>
        </div>
    );
};

interface FilterProps {
    districts: District[];
    showActiveUsersOnly: boolean;
    selectedDistrict: number;
    handleSelectedDistrict: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    setShowActiveUsersOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

export default Filter;
