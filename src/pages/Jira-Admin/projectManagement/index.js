import React from 'react'
import { Navigate } from 'react-router';

function ProjectManagement() {
  if (!localStorage.getItem('@user')) {
    return <Navigate replace to="/logInjiraa" />;
  }
  return (
    <div>ProjectManagement</div>
  )
}

export default ProjectManagement