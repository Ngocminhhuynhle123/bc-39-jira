import { Spin, Space } from 'antd';
const Loading = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}>
      <Spin>
      </Spin>
    </Space>
  );
};
export default Loading;
