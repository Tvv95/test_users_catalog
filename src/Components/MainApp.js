import './MainApp.css';
import UserAdd from './UserAdd.js';
import User from './User';
import React, { useState } from 'react';
import { uniqueId } from 'lodash';


function MainApp() {
    const [userAddForm, setUserAddForm] = useState(false);
    const [searchUser, setSearchUser] = useState('All');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchTelephone, setSearchTelephone] = useState('');

    const [data, setData] = useState(JSON.parse(localStorage.getItem('users')));

    function updateData() {
        setData(JSON.parse(localStorage.getItem('users')));
    }

    return (
        <div className='mainApp'>
            <section className='addSection'>
                <button className={userAddForm ? 'btnClose' : 'btnAdd'} onClick={() => setUserAddForm(!userAddForm)}>
                    {userAddForm ? 'Закрыть' : 'Добавить пользователя'}
                </button>
                {userAddForm ? <UserAdd updateData={updateData} setUserAddForm={setUserAddForm} /> : ''}
            </section>
            <section className='searhSection'>
                <label htmlFor='searhStatus'>Фильтрация по статусу:</label>
                <select id='searhStatus' onChange={(e) => setSearchUser(e.target.value)}>
                    <option>All</option>
                    <option>Client</option>
                    <option>Partner</option>
                    <option>Admin</option>
                </select>
                <label htmlFor='searchEmail'>Поиск по Email:</label>
                <input id='searchEmail' type='text' onChange={(e) => setSearchEmail(e.target.value)} />
                <label htmlFor='searchTelephone'>Поиск по телефону:</label>
                <input id='searchTelephone' type='text' onChange={(e) => setSearchTelephone(e.target.value)} />
            </section>
            {data !== null ? data.filter(curr => curr.email.startsWith(searchEmail) && curr.telephone.startsWith(searchTelephone) &&
                (searchUser === 'All' || curr.userStatus === searchUser))
                .map(current => <User key={uniqueId()} data={current} updateData={updateData} />) : ''}
        </div>
    );
}

export default MainApp;
