import { Button } from 'antd';
import React from 'react'
import useFetch from "react-fetch-hook";
import { useHistory } from "react-router-dom";

import { List, Avatar } from 'antd';

import './styles.scss';

const AdminPage = ({ BE_API_DEFAULT_ROUTE }) => {
    // let history = useHistory();
    const { isLoading, data } = useFetch(`${BE_API_DEFAULT_ROUTE}/tintuc/admin`);

    if (isLoading) {
        return <>Loading</>;
    }
    if (!data) {
        return <>Currently No Data Or Server Error</>;
    }

    const listData = data.map(d => ({
        id: d.id,
        href: `/view-details/${d.id}`,
        title: d.tenduan,
        type: d.type,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: `Đăng bởi: ${d.accountEmail} - ${new Date(d.created_date).toLocaleDateString()}`,
        content: d.mota.length > 500 ? d.mota.substring(0, 500) + "..." : d.mota
    }))

    return (
        <List
            itemLayout="horizontal"
            size="large"
            pagination={{
                pageSize: 5,
            }}
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={[
                        <Button key="list-view" href={item.href}>view</Button>,
                        <Button key="list-approve" disabled={item.type === 1} onClick={() => {
                            fetch(`${BE_API_DEFAULT_ROUTE}/tintuc/approve/${item.id}`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                }
                            }).then(
                                // () => { history.push(item.href) }
                            )
                        }}>approve</Button>,
                        <Button key="list-reject" disabled={item.type === -1} onClick={() => {
                            fetch(`${BE_API_DEFAULT_ROUTE}/tintuc/reject/${item.id}`, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                }
                            }).then(
                                // () => { history.go(0) }
                            )
                        }}>reject</Button>
                    ]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
            )}
        />

    );
}

export default AdminPage;