import React from "react";
import { District, User } from "../types/types";
import { displayDistrict, displayVerified, formatDate } from "../utils/utils";

const UserRow = ({
    user,
    districts,
    handleEditState,
    handleDeleteUser,
}: UserRowProps): JSX.Element => (
    <li
        style={{
            marginBottom: "2rem",
            background: "#fff",
            border: "1px solid black",
            padding: "1rem",
        }}
    >
        <div
            style={{
                display: "flex",
                justifyContent: "space-evenly",
                textAlign: "center",
                marginBottom: "0.5rem",
            }}
        >
            <div style={{ width: "5%" }}>{user.id}</div>
            <div style={{ width: "20%" }}>{user.last_name}</div>
            <div style={{ width: "20%" }}>{user.first_name}</div>
            <div style={{ width: "5%" }}>{user.middle_initial}</div>
            <div style={{ width: "20%" }}>
                {displayDistrict(districts, user.district)}
            </div>
            <div style={{ width: "10%" }}>{displayVerified(user.verified)}</div>
            <div style={{ width: "20%" }}>{formatDate(user.created_at)}</div>
        </div>
        <div
            style={{
                marginLeft: "auto",
                width: "10rem",
                display: "flex",
                justifyContent: "space-between",
                paddingRight: "2rem",
            }}
        >
            <button onClick={() => handleEditState(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)} type="button">
                Delete
            </button>
        </div>
    </li>
);

interface UserRowProps {
    user: User;
    districts: District[];
    handleEditState: (user: User) => void;
    handleDeleteUser: (id: number) => void;
}

export default UserRow;
