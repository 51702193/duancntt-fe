import { Carousel } from 'antd';
import React from 'react'
import useFetch from "react-fetch-hook";
import { useParams } from "react-router-dom";

import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


import './styles.scss';

const ViewAll = ({ BE_API_DEFAULT_ROUTE }) => {
    let { id } = useParams();
    // const { isLoading, data } = useFetch(`${BE_API_DEFAULT_ROUTE}/tintuc/pagination/${id}`);
    const { isLoading, data } = useFetch(`${BE_API_DEFAULT_ROUTE}/tintuc`);
    if (isLoading) {
        return <>Loading</>;
    }
    // if (!data) {
    //     return <>Currently No Data Or Server Error</>;
    // }

    const listData = data?.map(d => ({
        id: d.id,
        href: `/view-details/${d.id}`,
        title: d.tenduan,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: `Đăng bởi: ${d.accountEmail} - ${new Date(d.created_date).toLocaleDateString()}`,
        content: d.mota.length > 500 ? d.mota.substring(0, 500) + "..." : d.mota,
        img: d.images.split(',')[0]
    }))

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 5,
            }}
            dataSource={listData}
            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="0" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            src={`${BE_API_DEFAULT_ROUTE}/file/download/${item.img}`}
                        />
                    }
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

export default ViewAll;