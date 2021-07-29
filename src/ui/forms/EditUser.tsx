import React from "react";
import { District, User } from "../types/types";

const EditUserForm = ({
    userToEdit,
    districts,
    handleEditSubmit,
    handleEditUser,
}: EditUserFormProps): JSX.Element => {
    return (
        <>
            <form onSubmit={(e) => handleEditSubmit(e)}>
                <input
                    placeholder={userToEdit.last_name}
                    value={userToEdit.last_name}
                    name={"last_name"}
                    onChange={(e) => handleEditUser(e)}
                />
                <input
                    placeholder={userToEdit.first_name}
                    value={userToEdit.first_name}
                    name={"first_name"}
                    onChange={(e) => handleEditUser(e)}
                />
                <input
                    placeholder={userToEdit.middle_initial}
                    value={userToEdit.middle_initial || ""}
                    name={"middle_initial"}
                    onChange={(e) => handleEditUser(e)}
                />
                <input
                    placeholder={userToEdit.email}
                    value={userToEdit.email}
                    name={"email"}
                    onChange={(e) => handleEditUser(e)}
                />
                <select
                    value={userToEdit.district}
                    onChange={(e) => handleEditUser(e)}
                    name="district"
                >
                    {districts &&
                        districts.map((d: District) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                </select>
                <label>
                    <input
                        type="checkbox"
                        name="verified"
                        checked={userToEdit.verified}
                        onChange={(e) => handleEditUser(e)}
                    />
                    Verified?
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="active"
                        checked={userToEdit.active}
                        onChange={(e) => handleEditUser(e)}
                    />
                    Active?
                </label>

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

interface EditUserFormProps {
    userToEdit: User;
    districts: District[];
    handleEditSubmit: (e: React.SyntheticEvent) => void;
    handleEditUser: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
}

export default EditUserForm;
