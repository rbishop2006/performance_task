import { Col, Drawer, List, Row, Button, Tooltip, BackTop, Form } from "antd";
import {
    UserAddOutlined,
    UserOutlined,
    PlusOutlined,
    EditOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import EditUserForm from "../forms/EditUser";
import NewUserForm from "../forms/NewUser";
import { District, User } from "../types/types";
import { createDate } from "../utils/utils";
import Filter from "./Filter";
import UserRow from "./UserRow";
import Modal from "antd/lib/modal/Modal";

const UserTable: React.FC = () => {
    // state
    const [users, setUsers] = useState<User[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [showActiveUsersOnly, setShowActiveUsersOnly] =
        useState<boolean>(false);
    const [selectedDistrict, setSelectedDistrict] = useState<number>(0);
    const [isEditState, setIsEditState] = useState<boolean>(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);
    const [creatingUserState, setCreatingUserState] = useState(false);
    const [isActiveNewUser, setIsActiveNewUser] = useState(false);

    // refs
    const isFetchingUsersRef = useRef<boolean>(false);
    const isFetchingDistrictsRef = useRef<boolean>(false);

    // antd instances
    const [addUserForm] = Form.useForm();
    const [editUserForm] = Form.useForm();

    // effects
    // fetch users
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

    // fetch districts
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

    // antd form method call guard
    useEffect(() => {
        if (editUserForm.__INTERNAL__.name) {
            editUserForm.setFieldsValue(userToEdit);
        }
    }, [editUserForm, userToEdit]);

    // edit functions
    // edit state
    const handleEditState = (user: User) => {
        setUserToEdit(user);
        setIsEditState(true);
    };

    // edit finish
    const editUserOnFinish = (values: User) => {
        setIsEditState(false);
        if (userToEdit) {
            setUsers((prevArr) =>
                prevArr.splice(
                    users.findIndex((u: User) => u.id === userToEdit.id),
                    1,
                    {
                        id: userToEdit.id,
                        first_name: values.first_name,
                        middle_initial: values.middle_initial,
                        last_name: values.last_name,
                        email: values.email,
                        district: values.district,
                        active: values.active,
                        verified: values.verified,
                        created_at: userToEdit.created_at,
                    }
                )
            );
            setUserToEdit(null);
            setUsers([...users]);
        }
    };

    // edit cancel
    const handleEditUserOnCancel = () => {
        editUserForm.resetFields();
        setUserToEdit(null);
        setIsEditState(false);
    };

    // add user functions
    // add finish
    const addUserOnFinish = (values: {
        first_name: string;
        middle_initial?: string;
        last_name: string;
        email: string;
        district: number;
    }) => {
        setCreatingUserState(false);
        setUsers([
            ...users,
            {
                active: isActiveNewUser,
                created_at: createDate(),
                district: values.district,
                email: values.email,
                first_name: values.first_name,
                id: Math.random(),
                last_name: values.last_name,
                middle_initial: values.middle_initial,
                verified: false,
            },
        ]);
        addUserForm.resetFields();
        setIsActiveNewUser(false);
    };

    // add cancel
    const handleNewUserOnCancel = () => {
        setIsActiveNewUser(false);
        addUserForm.resetFields();
        setCreatingUserState(false);
    };

    // delete user
    const handleDeleteUser = (userId: number) => {
        setUsers((prevUsers) => prevUsers.filter((u: User) => u.id !== userId));
    };

    // number formatting
    const handleSelectedDistrict = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setSelectedDistrict(parseInt(e.target.value));

    return (
        <div
            style={{
                minWidth: "500px",
                overflowX: "auto",
                whiteSpace: "nowrap",
            }}
        >
            <Col span={24}>
                <List
                    loading={users.length > 0 ? false : true}
                    size="large"
                    rowKey={JSON.stringify(Math.random())}
                    style={{
                        textAlign: "center",
                        marginTop: "20rem",
                        marginBottom: "20rem",
                        zIndex: 0,
                    }}
                    header={
                        <Col
                            span={24}
                            style={{
                                position: "fixed",
                                top: "4rem",
                                margin: "auto",
                                left: 0,
                                right: 0,
                                padding: "3rem 24px",
                                maxWidth: "1100px",
                                zIndex: 1,
                                backgroundColor: "white",
                                borderBottom: "1px solid #1890ff",
                            }}
                        >
                            <Row justify="space-between" align="middle">
                                <p></p>
                                <h2
                                    style={{
                                        fontSize: "2rem",
                                        textDecoration: "underline",
                                        color: "#1890ff",
                                        margin: 0,
                                    }}
                                >
                                    <UserOutlined
                                        style={{
                                            color: "#1890ff",
                                            fontSize: "2.75rem",
                                        }}
                                    />
                                    Users
                                </h2>
                                <Tooltip title="Add New User" placement="left">
                                    <Button
                                        type="primary"
                                        shape="circle"
                                        onClick={() =>
                                            setCreatingUserState(true)
                                        }
                                        icon={<UserAddOutlined />}
                                    />
                                </Tooltip>

                                <Modal
                                    visible={creatingUserState}
                                    footer={[]}
                                    onCancel={handleNewUserOnCancel}
                                >
                                    <h2>
                                        <UserAddOutlined
                                            style={{
                                                color: "#1890ff",
                                                fontSize: "2rem",
                                            }}
                                        />{" "}
                                        Add a New User
                                    </h2>
                                    <Form
                                        form={addUserForm}
                                        name="userToAdd"
                                        onFinish={addUserOnFinish}
                                        scrollToFirstError
                                        labelCol={{
                                            span: 24,
                                        }}
                                    >
                                        <NewUserForm
                                            districts={districts}
                                            isActive={isActiveNewUser}
                                            setIsActive={setIsActiveNewUser}
                                        />
                                        <Form.Item
                                            style={{ textAlign: "right" }}
                                        >
                                            <Button
                                                icon={<PlusOutlined />}
                                                type="primary"
                                                htmlType="submit"
                                                size="large"
                                            >
                                                Add User
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </Row>

                            <Row justify="end">
                                <Filter
                                    districts={districts}
                                    showActiveUsersOnly={showActiveUsersOnly}
                                    selectedDistrict={selectedDistrict}
                                    handleSelectedDistrict={
                                        handleSelectedDistrict
                                    }
                                    setShowActiveUsersOnly={
                                        setShowActiveUsersOnly
                                    }
                                />
                            </Row>
                            <Row
                                style={{
                                    fontSize: "1rem",
                                    color: "#1890ff",
                                    fontWeight: 600,
                                }}
                            >
                                <Col span={2}>Id</Col>
                                <Col span={4}>Last</Col>
                                <Col span={4}>First</Col>
                                <Col span={2}>M.I.</Col>
                                <Col span={4}>District</Col>
                                <Col span={4}>Verified</Col>
                                <Col span={4}>Created</Col>
                            </Row>
                        </Col>
                    }
                    dataSource={users}
                    renderItem={(user) => {
                        return showActiveUsersOnly ? (
                            user.active &&
                            (selectedDistrict === 0 ||
                                user.district === selectedDistrict) ? ( // eslint-disable-next-line indent
                                <UserRow // eslint-disable-next-line indent
                                    user={user} // eslint-disable-next-line indent
                                    districts={districts} // eslint-disable-next-line indent
                                    handleEditState={handleEditState} // eslint-disable-next-line indent
                                    handleDeleteUser={handleDeleteUser} // eslint-disable-next-line indent
                                /> // eslint-disable-next-line indent
                            ) : undefined
                        ) : selectedDistrict === 0 ||
                          user.district === selectedDistrict ? ( // eslint-disable-next-line indent
                            <UserRow // eslint-disable-next-line indent
                                user={user} // eslint-disable-next-line indent
                                districts={districts} // eslint-disable-next-line indent
                                handleEditState={handleEditState} // eslint-disable-next-line indent
                                handleDeleteUser={handleDeleteUser} // eslint-disable-next-line indent
                            /> // eslint-disable-next-line indent
                        ) : undefined;
                    }}
                />

                {userToEdit && (
                    <Drawer
                        onClose={handleEditUserOnCancel}
                        visible={isEditState}
                        footer={[]}
                    >
                        <h2>
                            <EditOutlined
                                style={{
                                    color: "#1890ff",
                                    fontSize: "2rem",
                                }}
                            />{" "}
                            Edit User
                        </h2>
                        <Form
                            form={editUserForm}
                            name="userToEdit"
                            onFinish={editUserOnFinish}
                            scrollToFirstError
                            labelCol={{
                                span: 24,
                            }}
                        >
                            <EditUserForm
                                districts={districts}
                                userToEdit={userToEdit}
                            />
                            <Form.Item style={{ textAlign: "center" }}>
                                <Button
                                    icon={<PlusOutlined />}
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                >
                                    Save Changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Drawer>
                )}
                {/* 
                antd <BackTop/> and some other components like <Modal/> <Drawer/> use a deprecated findDOMNode and produces a warning.  Still functional, but no fix available at this time per stackoverflow and other developer driven resources.  Some mention to possible fixes using React.Forward refs, but unreliable per the current discussions.

                Warning: 
               "findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here:"
                
                research: stackoverflow, etc.
                "findDOMNode has been deprecated. You should not use it. It seems like some libraries(Ant Design, Material-UI) are still using findDOMNode. So, you should just ignore this as it will be fixed when the library authors update the code."
                */}
                <BackTop
                    style={{
                        height: 40,
                        width: 40,
                        lineHeight: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#1890ff",
                        color: "#fff",
                        textAlign: "center",
                        fontSize: 14,
                    }}
                ></BackTop>
            </Col>
        </div>
    );
};

export default UserTable;
