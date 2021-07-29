import React from "react";
import { District, User } from "../types/types";

const NewUserForm = ({
    userToAdd,
    districts,
    handleAddUser,
    addNewUserSubmit,
}: NewUserFormProps): JSX.Element => {
    return (
        <>
            <form onSubmit={(e) => addNewUserSubmit(e)}>
                <input
                    placeholder={userToAdd.last_name}
                    value={userToAdd.last_name}
                    name={"last_name"}
                    onChange={(e) => handleAddUser(e)}
                />
                <input
                    placeholder={userToAdd.first_name}
                    value={userToAdd.first_name}
                    name={"first_name"}
                    onChange={(e) => handleAddUser(e)}
                />
                <input
                    placeholder={"middle initial (opt.)"}
                    value={userToAdd.middle_initial || ""}
                    name={"middle_initial"}
                    onChange={(e) => handleAddUser(e)}
                />
                <input
                    placeholder={"email"}
                    value={userToAdd.email}
                    name={"email"}
                    onChange={(e) => handleAddUser(e)}
                />

                <select
                    value={userToAdd.district}
                    onChange={(e) => handleAddUser(e)}
                    name="district"
                >
                    {districts && (
                        <>
                            <option key={0} value={0}>
                                select district
                            </option>
                            {districts.map((d: District) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </>
                    )}
                </select>
                <label>
                    <input
                        type="checkbox"
                        name="active"
                        checked={userToAdd.active}
                        onChange={(e) => handleAddUser(e)}
                    />
                    Active?
                </label>

                <button type="submit">Create</button>
            </form>
        </>
    );
};

interface NewUserFormProps {
    userToAdd: User;
    districts: District[];
    handleAddUser: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    addNewUserSubmit: (e: React.SyntheticEvent) => void;
}

export default NewUserForm;
