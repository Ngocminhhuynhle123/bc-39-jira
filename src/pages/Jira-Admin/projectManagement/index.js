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
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData_ListProjectreducer())
  }, [])
  const data = useSelector(state => state.ListProjectreducer.data);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const confirm = (id) => {
    dispatch(fetchDELETEProjectreducer(id))
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const columns = [
    {
      title: 'Project Name',
      key: 'projectName',
      ...getColumnSearchProps('projectName'),
      render: (_,record) => {
        return (
          <NavLink key={record.id} to={`/projectDetail/${record.id}`}>
            {record.projectName}
          </NavLink>
        )
      }
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      filters: [
        {
          text: "Dự án wed",
          value: "Dự án web",
        },
        {
          text: "	Dự án di động",
          value: "Dự án di động",
        },
      ],
      onFilter: (value, record) => record.categoryName.startsWith(value),
    },
    {
      title: 'creator',
      dataIndex: 'creator',
      key: 'creator',
      render: (creator) => <div>{creator.name}</div>,
    },
    {
      title: 'Members',
      dataIndex: 'id',
      key: 'members',

    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'Action',
      render: (id) => {
        return (
          <div key={id}>
            <button className='btn btn-success mr-1' onClick={() => console.log(id)}><SlNote /></button>
            <Popconfirm
              title="Delete Project"
              description="Are you sure to delete Project?"
              onConfirm={() => confirm(id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button className='btn btn-danger'><RiDeleteBin6Line /></button>
            </Popconfirm>
          </div>
        )
      },
    },
  ];
  return (
    <section className='projectManagement'>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
      </Space>
      <Table columns={columns} dataSource={data} rowKey={data => data.id} />
    </section>
  );
};
export default ProjectManagement
