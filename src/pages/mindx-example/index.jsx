import React from 'react'
import { Tabs } from 'antd';
import ListPosts from '../../components/list-post';
import "./style.css"

const MindxExample = () => {
  const items = [
    {
      key: '1',
      label: 'My Posts',
      children: <ListPosts />,
    },
    {
      key: '2',
      label: 'My Profile',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <div className='mindx-example'>
      <div className='container p-3' style={{ height: "100%"}}>
        <div className='d-flex gap-3' style={{ height: "100%"}}>
          <div className="left">
            <div className='left-group'>
              <img className='image-user' src="https://static.vecteezy.com/system/resources/previews/009/292/244/large_2x/default-avatar-icon-of-social-media-user-vector.jpg" alt="user" />
              <h3 className="text-center">Mindx Technology School</h3>
              <div className='d-flex align-item-center'>
                <button className='btn btn-primary'>Message</button>
                <button className='btn '>Follow</button>
              </div>
            </div>
          </div>
          <div className="right">
            <Tabs defaultActiveKey="1" items={items} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MindxExample