import { Row, Col, Form, Input, Select, Switch } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import React from "react";
import { District } from "../types/types";

const NewUserForm = ({
    districts,
    isActive,
    setIsActive,
}: NewUserFormProps): JSX.Element => {
    return (
        <>
            <Row gutter={8}>
                <Col span={24}>
                    <Form.Item
                        name={"first_name"}
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "*required, only letters, no spaces or numbers",
                            },
                            {
                                pattern: new RegExp(
                                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:"\\/?>.<,-]+$/i
                                ),
                                message:
                                    "*required, only letters, no spaces or numbers",
                            },
                        ]}
                    >
                        <Input required />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name={"last_name"}
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message:
                                    "*required, only letters, no spaces or numbers",
                            },
                            {
                                pattern: new RegExp(
                                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:"\\/?>.<,-]+$/i
                                ),
                                message:
                                    "*required, only letters, no spaces or numbers",
                            },
                        ]}
                    >
                        <Input required />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name={"middle_initial"}
                        label="M.I. (*optional)"
                        rules={[
                            {
                                required: false,
                                message: "only letters, max 1 character",
                            },
                            {
                                pattern: new RegExp(
                                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:"\\/?>.<,-]+$/i
                                ),
                                message: "only letters, max 1 character",
                            },
                            {
                                max: 1,
                                message: "only letters, max 1 character",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="email"
                        label={"Email"}
                        rules={[
                            {
                                required: true,
                                message: "*required,only valid email format",
                            },
                            {
                                pattern: new RegExp(/\S+@\S+\.\S+/),
                                message: "*required,only valid email format",
                            },
                        ]}
                    >
                        <Input type="email" required />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name="district"
                        label="District"
                        rules={[
                            {
                                required: true,
                                message: "*required, please select a district",
                            },
                        ]}
                    >
                        <Select placeholder="Select a district">
                            {districts && (
                                <>
                                    {districts.map((d: District) => (
                                        <Select.Option key={d.id} value={d.id}>
                                            {d.name}
                                        </Select.Option>
                                    ))}
                                </>
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="active" label="Active">
                        <Switch
                            checked={isActive}
                            onChange={() =>
                                setIsActive((prevState: boolean) => !prevState)
                            }
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

interface NewUserFormProps {
    districts: District[];
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default NewUserForm;
