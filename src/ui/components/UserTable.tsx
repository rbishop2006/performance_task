import React, { useState, useEffect, useRef } from "react";
import EditUserForm from "../forms/EditUser";
import NewUserForm from "../forms/NewUser";
import { District, User } from "../types/types";
import { createDate } from "../utils/utils";
import Filter from "./Filter";
import UserRow from "./UserRow";

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [showActiveUsersOnly, setShowActiveUsersOnly] =
        useState<boolean>(false);
    const [selectedDistrict, setSelectedDistrict] = useState<number>(1);
    const [isEditState, setIsEditState] = useState<boolean>(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [userToAdd, setUserToAdd] = useState<User>();
    const [creatingUserState, setCreatingUserState] = useState(false);

    const isFetchingUsersRef = useRef<boolean>(false);
    const isFetchingDistrictsRef = useRef<boolean>(false);

    useEffect(() => {
        isFetchingUsersRef.current = false;
        const fetchUsers = async () => {
            const responseUsers = await fetch("users.json");

            if (responseUsers.ok) {
                const responseUsersJSON = await responseUsers.json();
                setUsers(responseUsersJSON);
            } else {
                throw new Error("Something wrong with users");
            }
        };
        if (!isFetchingUsersRef.current) {
            try {
                fetchUsers();
            } catch (error) {
                console.log(error);
            }
        }

        return () => {
            isFetchingUsersRef.current = true;
        };
    }, []);

    useEffect(() => {
        isFetchingDistrictsRef.current = false;
        const fetchDistricts = async () => {
            const respDistricts = await fetch("districts.json");
            if (respDistricts.ok) {
                const respDistrictsJSON = await respDistricts.json();
                setDistricts(respDistrictsJSON);
            } else {
                throw new Error("Something wrong with districts");
            }
        };
        if (!isFetchingUsersRef.current) {
            try {
                fetchDistricts();
            } catch (error) {
                console.log(error);
            }
        }

        return () => {
            isFetchingDistrictsRef.current = true;
        };
    }, []);

    const handleEditState = (user: User) => {
        setIsEditState(true);
        setUserToEdit(user);
    };

    const handleEditUser = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (userToEdit) {
            const target = e.target as HTMLInputElement;

            const value =
                target?.name === "district"
                    ? parseInt(target.value)
                    : target?.type === "checkbox" // eslint-disable-next-line indent
                    ? target.checked // eslint-disable-next-line indent
                    : target.value;

            const name = target.name;
            setUserToEdit({ ...userToEdit, [name]: value });
        }
    };

    const handleEditSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (userToEdit) {
            const editedUserIndex = users.findIndex(
                (u: User) => u.id === userToEdit.id
            );
            setUserToEdit(null);
            setIsEditState(false);
            setUsers(users.splice(editedUserIndex, 1, userToEdit));
            setUsers([...users]);
        }
    };

    const handleAddUser = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        if (userToAdd) {
            const target = e.target as HTMLInputElement;

            const value =
                target?.name === "district"
                    ? parseInt(target.value)
                    : target?.type === "checkbox" // eslint-disable-next-line indent
                    ? target.checked // eslint-disable-next-line indent
                    : target.value;

            const name = target.name;
            setUserToAdd({ ...userToAdd, [name]: value });
        }
    };

    const createNewUser = () => {
        setUserToAdd({
            active: false,
            created_at: createDate(),
            district: 0,
            email: "",
            first_name: "",
            id: Math.random(),
            last_name: "",
            middle_initial: "",
            verified: false,
        });
    };

    const handleCreateUser = () => {
        createNewUser();
        setCreatingUserState(true);
    };

    const addNewUserSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (userToAdd) {
            setUserToEdit(null);
            setCreatingUserState(false);
            setUsers([...users, userToAdd]);
        }
    };

    const handleDeleteUser = (userId: number) => {
        setUsers((prevUsers) => prevUsers.filter((u: User) => u.id !== userId));
    };

    const handleSelectedDistrict = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setSelectedDistrict(parseInt(e.target.value));

    console.log(users);
    console.log(districts);
    console.log("active users only?", showActiveUsersOnly);
    console.log("user to add", userToEdit);
    console.log("user to add", userToAdd);

    return (
        <div className="admin-user-table" style={{ marginTop: "7rem" }}>
            <Filter
                districts={districts}
                showActiveUsersOnly={showActiveUsersOnly}
                selectedDistrict={selectedDistrict}
                handleSelectedDistrict={handleSelectedDistrict}
                setShowActiveUsersOnly={setShowActiveUsersOnly}
            />
            <button onClick={() => handleCreateUser()}>Create User</button>

            {isEditState && userToEdit && (
                <EditUserForm
                    userToEdit={userToEdit}
                    districts={districts}
                    handleEditSubmit={handleEditSubmit}
                    handleEditUser={handleEditUser}
                />
            )}
            {creatingUserState && userToAdd && (
                <NewUserForm
                    userToAdd={userToAdd}
                    districts={districts}
                    handleAddUser={handleAddUser}
                    addNewUserSubmit={addNewUserSubmit}
                />
            )}

            <div
                style={{
                    border: "1px solid black",
                    width: "50rem",
                    marginTop: "2rem",
                }}
            >
                <h2
                    style={{ textAlign: "center", textDecoration: "underline" }}
                >
                    Users
                </h2>
                <ul
                    style={{
                        listStyle: "none",
                        paddingLeft: 0,
                        height: "30rem",
                    }}
                >
                    <li
                        style={{
                            fontWeight: 700,
                            borderBottom: "2px solid black",
                            marginBottom: "1rem",
                            padding: "1rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ width: "5%" }}>ID</div>
                            <div style={{ width: "20%" }}>Last Name</div>
                            <div style={{ width: "20%" }}>First Name</div>
                            <div style={{ width: "5%" }}>M.I.</div>
                            <div style={{ width: "20%" }}>District</div>
                            <div style={{ width: "10%" }}>Verified</div>
                            <div style={{ width: "20%" }}>Created</div>
                        </div>
                    </li>
                    {users &&
                        showActiveUsersOnly &&
                        users.map((user: User) => {
                            if (user.active) {
                                if (user.district === selectedDistrict) {
                                    return (
                                        <React.Fragment key={user.id}>
                                            <UserRow
                                                user={user}
                                                districts={districts}
                                                handleEditState={
                                                    handleEditState
                                                }
                                                handleDeleteUser={
                                                    handleDeleteUser
                                                }
                                            />
                                        </React.Fragment>
                                    );
                                }
                            }
                        })}
                    {users &&
                        !showActiveUsersOnly &&
                        users.map((user: User) => {
                            if (user.district === selectedDistrict) {
                                return (
                                    <React.Fragment key={user.id}>
                                        <UserRow
                                            user={user}
                                            districts={districts}
                                            handleEditState={handleEditState}
                                            handleDeleteUser={handleDeleteUser}
                                        />
                                    </React.Fragment>
                                );
                            }
                        })}
                </ul>
            </div>
        </div>
    );
};

export default UserTable;
