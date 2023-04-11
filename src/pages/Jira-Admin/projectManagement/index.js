import { Button, Space, Table, Input, message, Popconfirm } from 'antd';
import { useEffect, useState, useRef } from 'react';
import { fetchData_ListProjectreducer } from './duck_ListProject/action';
import { useDispatch, useSelector } from "react-redux"
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { SlNote } from 'react-icons/sl';
import { fetchDELETEProjectreducer } from './duck_DeleteProject/action';
import { NavLink } from 'react-router-dom'
function ProjectManagement() {
  if (!localStorage.getItem('@user')) {
    return <Navigate replace to="/logInjiraa" />;
  }
  return (
    <div>ProjectManagement</div>
  )
}

export default ProjectManagement