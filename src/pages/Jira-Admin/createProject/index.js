import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'antd';
import { fetchCREATEProjectreducer } from './duck/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
export default function CreateProject() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const onSubmit = data => {
    const project = { ...data, categoryId: 0 }
    dispatch(fetchCREATEProjectreducer(project,navigate))
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className='pt-3'>Name</h4>
      <input className='form-control' type="text" placeholder="projectName" {...register("projectName", { required: true })} />
      <h4 className='pt-3'>Description</h4>
      <textarea className='form-control' rows={8} type="text" placeholder="description" {...register("description", { required: true })} />
      <h4>Project Category</h4>
      <select className='form-control' {...register("alias", { required: true })}>
        <option value="Dự án Wed ">Dự án Wed </option>
        <option value=" Dự án phần mềm"> Dự án phần mềm</option>
      </select>
      <input type="submit" className='mt-3 btn btn-success' />
    </form>
  );
}