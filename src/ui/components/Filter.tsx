import React from "react";
import { District } from "../types/types";
import { Col, Row, Switch, Tooltip } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

const Filter = ({
    districts,
    showActiveUsersOnly,
    selectedDistrict,
    handleSelectedDistrict,
    setShowActiveUsersOnly,
}: FilterProps): JSX.Element => {
    return (
        <Col span={24} style={{ marginBottom: "2rem" }}>
            <Row justify="end" align="middle" style={{ padding: "12px 0px" }}>
                <Tooltip title="Show Active Users Only" placement="left">
                    <span>
                        <Switch
                            checked={showActiveUsersOnly}
                            onChange={() =>
                                setShowActiveUsersOnly(
                                    (prevState: boolean) => !prevState
                                )
                            }
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                        />
                    </span>
                </Tooltip>
            </Row>
            <Row justify="end" align="middle" style={{ padding: "12px 0px" }}>
                <Tooltip title="Filter by District:" placement="top">
                    <span>
                        <select
                            style={{
                                padding: ".5rem",

                                borderRadius: "20px",
                            }}
                            value={selectedDistrict}
                            onChange={(e) => handleSelectedDistrict(e)}
                        >
                            <option key={0} value={0}>
                                All Districts
                            </option>
                            {districts &&
                                districts.map((d: District) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                        </select>
                    </span>
                </Tooltip>
            </Row>
        </Col>
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
