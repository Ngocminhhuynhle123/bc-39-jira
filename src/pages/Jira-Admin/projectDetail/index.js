import React, { useEffect } from 'react'
import Loading from '_components/loading'
import { FetchProjectDetailreducer } from './duck/action'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Col, Row, Divider } from 'antd';

function ProjectDetail() {
  const dispatch = useDispatch()
  const param = useParams()
  useEffect(() => {
    dispatch(FetchProjectDetailreducer(param.id))
  }, [])
  const data = useSelector(state => state.ProjectDetailreducer.data);
  const handleProjectName = () => {
    if (data) {
     return <div>
        <Divider orientation="left">12</Divider>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={6}>
            <div className='gutter-box'>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className='gutter-box'>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className='gutter-box'>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div className='gutter-box'>col-6</div>
          </Col>
        </Row>
      </div>
    }
  }
  return (
    <>
      {data && handleProjectName()}
    </>
  )
}

export default ProjectDetail