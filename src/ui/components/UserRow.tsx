import { Button, Col, List, Modal, Row, Spin, Tooltip, Typography } from "antd";
import {
    StopTwoTone,
    EditOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { District, User } from "../types/types";
import { displayDistrict, displayVerified, formatDate } from "../utils/utils";

const UserRow = ({
    user,
    districts,
    handleEditState,
    handleDeleteUser,
}: UserRowProps): JSX.Element => {
    const { confirm } = Modal;
    const { Text } = Typography;
    const [ellipsis, ,] = useState(true);

    // confirm modal to delete user
    const showConfirm = () => {
        confirm({
            title: `Please confirm you want to delete ${user.first_name} ${user.last_name}?`,
            onOk() {
                handleDeleteUser(user.id);
            },
            icon: (
                <StopTwoTone
                    twoToneColor="#eb4034"
                    style={{ fontSize: "3rem" }}
                />
            ),
        });
    };

    // tooltip for districts with ellipsis
    const districtTooltip = {
        tooltip: displayDistrict(districts, user.district),
    };
    const formatDateToolTip = {
        tooltip: formatDate(user.created_at),
    };
    return (
        <>
            <List.Item>
                <List.Item.Meta
                    description={
                        <Col
                            style={
                                user.active
                                    ? { color: "#000", fontWeight: 600 }
                                    : { color: "#696969", fontStyle: "italic" }
                            }
                        >
                            <Row>
                                <Col span={2}>
                                    <Text
                                        style={
                                            ellipsis ? { width: 1 } : undefined
                                        }
                                        ellipsis={
                                            ellipsis
                                                ? { tooltip: `${user.id}` }
                                                : false
                                        }
                                    >
                                        {JSON.stringify(user.id)}
                                    </Text>
                                </Col>
                                <Col span={4}>{user.last_name}</Col>
                                <Col span={4}>{user.first_name}</Col>
                                <Col span={2}>{user.middle_initial}</Col>
                                <Col span={4}>
                                    <Text
                                        style={
                                            ellipsis
                                                ? { width: 300 }
                                                : undefined
                                        }
                                        ellipsis={
                                            ellipsis ? districtTooltip : false
                                        }
                                    >
                                        {displayDistrict(
                                            districts,
                                            user.district
                                        ) ? ( // eslint-disable-next-line indent
                                            displayDistrict(
                                                // eslint-disable-next-line indent
                                                districts, // eslint-disable-next-line indent
                                                user.district // eslint-disable-next-line indent
                                            ) // eslint-disable-next-line indent
                                        ) : (
                                            // eslint-disable-next-line indent
                                            <Spin /> // eslint-disable-next-line indent
                                        )}
                                    </Text>
                                </Col>
                                <Col span={4}>
                                    {displayVerified(user.verified)}
                                </Col>
                                <Col span={4}>
                                    <Text
                                        style={
                                            ellipsis
                                                ? { width: 300 }
                                                : undefined
                                        }
                                        ellipsis={
                                            ellipsis ? formatDateToolTip : false
                                        }
                                    >
                                        {formatDate(user.created_at)}
                                    </Text>
                                </Col>
                            </Row>
                            <Row justify="end">
                                <Tooltip title="Edit User" placement="top">
                                    <span>
                                        <Button
                                            type="primary"
                                            style={{
                                                borderRadius: "20px 0 0 20px",
                                            }}
                                            onClick={() =>
                                                handleEditState(user)
                                            }
                                        >
                                            <EditOutlined />
                                        </Button>
                                    </span>
                                </Tooltip>
                                <Tooltip title="Delete User" placement="top">
                                    <span>
                                        <Button
                                            type="ghost"
                                            style={{
                                                borderRadius: "0 20px 20px 0",
                                            }}
                                            onClick={showConfirm}
                                        >
                                            <UserDeleteOutlined />
                                        </Button>
                                    </span>
                                </Tooltip>
                            </Row>
                        </Col>
                    }
                />
            </List.Item>
        </>
    );
};

interface UserRowProps {
    user: User;
    districts: District[];
    handleEditState: (user: User) => void;
    handleDeleteUser: (id: number) => void;
}

export default UserRow;
