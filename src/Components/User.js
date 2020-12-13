import React, { useState } from 'react';
import UserEdit from './UserEdit';
import './User.css';

function User(props) {

    const updateData = props.updateData;
    const data = props.data;

    const [redactState, setRedactState] = useState(false);

    function handleDelete(id) {
        const updatedData = JSON.stringify(JSON.parse(localStorage.getItem('users')).filter(current => current.id !== id));
        localStorage.setItem('users', updatedData);
        updateData();
    }

    if (redactState) {
        return <UserEdit updateData={updateData} data={data} />
    }

    return (
        <div className='user'>
            <ul>
                <li>Электронный адрес: {data.email}</li>
                <li>Пароль: {data.password}</li>
                <li>ФИО: {data.fullName}</li>
                <li>Телефон: {data.telephone}</li>
                <li>Статус пользователя: {data.userStatus}</li>
                <li>Дата создания: {data.dateCreation}</li>
                <li>Дата изменения: {data.dateChanged}</li>
            </ul>
            <button className='btnDelete' onClick={() => handleDelete(data.id)}>Удалить</button>
            <button className='btnChange' onClick={() => setRedactState(!redactState)}>Редактировать</button>
        </div>
    );
}

export default User;
