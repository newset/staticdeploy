import { IBundle } from "@staticdeploy/core";
import Table, { ColumnProps } from "antd/lib/table";
import Tooltip from "antd/lib/tooltip";
import dayjs from "dayjs";
import sortBy from "lodash/sortBy";
import React from "react";

import TruncatedText from "../TruncatedText";
import Details from "./Details";
import "./index.css";

interface IProps {
    title?: React.ReactNode;
    bundles: IBundle[];
}

export default class BundlesList extends React.Component<IProps> {
    getColumns(): ColumnProps<IBundle>[] {
        return [
            {
                key: "id",
                title: "Id",
                dataIndex: "id",
                className: "c-BundlesList-id-column",
                render: (id: string) => <code>{id}</code>,
            },
            {
                key: "description",
                title: "Description",
                dataIndex: "description",
                className: "c-BundlesList-description-column",
                render: (description: string) => (
                    <TruncatedText>{description}</TruncatedText>
                ),
            },
            {
                key: "hash",
                title: "Hash",
                dataIndex: "hash",
                className: "c-BundlesList-description-column",
                render: (hash: string) => <TruncatedText>{hash}</TruncatedText>,
            },
            {
                key: "createdAt",
                title: "Age",
                dataIndex: "createdAt",
                className: "c-BundlesList-createdAt-column",
                render: (createdAt: string) => (
                    <Tooltip
                        title={dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss Z")}
                    >
                        <>{dayjs(createdAt).fromNow(true)}</>
                    </Tooltip>
                ),
            },
        ];
    }
    renderTitle() {
        return this.props.title ? <h4>{this.props.title}</h4> : null;
    }
    render() {
        return (
            <div className="c-BundlesList">
                {this.renderTitle()}
                <Table<IBundle>
                    columns={this.getColumns()}
                    expandedRowRender={(bundle) => <Details bundle={bundle} />}
                    dataSource={sortBy(
                        this.props.bundles,
                        "createdAt"
                    ).reverse()}
                    size="small"
                    bordered={false}
                    rowKey="id"
                    rowClassName="c-BundlesList-row"
                    pagination={{
                        pageSize: 15,
                        hideOnSinglePage: true,
                        showSizeChanger: false,
                    }}
                />
            </div>
        );
    }
}
