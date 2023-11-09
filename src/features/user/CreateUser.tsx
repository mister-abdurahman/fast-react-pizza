import React, { useState } from 'react';
import Button from '../../UI/Button';
import { updateName } from './userSlice';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    if(!username) return;

    dispatch(updateName(username));
    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit} className='my-5'>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        className='input mb-8 w-72 mt-3'
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button type='primary'>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
