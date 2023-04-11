import React, { useEffect } from 'react'
import { FetchProjectDetailreducer } from './duck/action'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Col, Row, Divider } from 'antd';
import { RiErrorWarningLine } from 'react-icons/ri'
import { BsCheckCircle } from 'react-icons/bs'
function ProjectDetail() {
  const dispatch = useDispatch()
  const param = useParams()
  useEffect(() => {
    dispatch(FetchProjectDetailreducer(param.id))
  }, [])
  const data = useSelector(state => state.ProjectDetailreducer.data);
  const setPriorityTask = (priorityTask) => {
    switch (priorityTask) {
      case 'Low': {
        return <div className='d-flex flex-row align-items-center '>
          <RiErrorWarningLine className='iconPriority-LM'/>
          <span>Low</span>
        </div>
      }
      case 'Medium': {
        return <div className='d-flex flex-row align-items-center'>
          <RiErrorWarningLine className='iconPriority-LM'/>
          <span>Medium</span>
        </div>
      }
      case 'High': {
        return <div className='d-flex flex-row align-items-center'>
          <BsCheckCircle className='iconPriority-H'/>
          <span>Medium</span>
        </div>
      }

      default:
        return <div></div>
    }
  }
  const handleProjectName = () => {
    if (data) {
      return <div>
        <Divider orientation="left">
          <h1>
            {data.projectName}
          </h1>
        </Divider>
        <button className='btn btn-success'>Create Task</button>
        <Row gutter={[16, 24]}>
          {data.lstTask.map((item) => {
            return <Col key={item.statusId} className="gutter-row" span={6}>
              <div className='gutter-box'>
                <div className='gutter-box-header'>
                  {item.statusName}
                </div>
                <div className='lstTaskDeTail'>
                  {item.lstTaskDeTail.map((item1) => {
                    return <div key={item1.taskId} className="card p-2">
                      <h5 className="card-title">{item1.taskName}</h5>
                      <div className='card_content'>
                        <div className='card-member'>
                          <div> {setPriorityTask(item1.priorityTask.priority)}</div>
                        </div>
                        <div className='card-member'>
                          {item1.assigness.map((item2) => {
                            return <img className='img_cardDetail' key={item2.id} src={item2.avatar} alt={item2.name} />
                          })}
                        </div>
                      </div>
                    </div>

                  })}
                </div>
              </div>
            </Col>
          })}
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