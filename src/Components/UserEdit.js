import './UserEdit.css';
import React, { useState } from 'react';

function UserEdit(props) {

    const updateData = props.updateData;
    const data = props.data;

    const [email, setEmail] = useState(data.email);
    const [password, setPassword] = useState(data.password);
    const [fullName, setFullName] = useState(data.fullName);
    const [telephone, setTelephone] = useState(data.telephone);
    const [userStatus, setUserStatus] = useState(data.userStatus);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = JSON.parse(localStorage.getItem('users'));

        newData.map(curr => {
            if (curr.id === data.id) {
                curr.email = email.trim();
                curr.password = password.trim();
                curr.fullName = fullName.trim();
                curr.telephone = telephone.trim();
                curr.userStatus = userStatus;
                curr.dateChanged = new Date().toLocaleString();
            }
        });

        localStorage.setItem('users', JSON.stringify(newData));
        updateData();
    }

    return (
        <form className='userEditForm' onSubmit={handleSubmit}>
            <label htmlFor='email'>Электронный адрес:</label>
            <input id='email' type='text' required value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <label htmlFor='pass'>Пароль:</label>
            <input id='pass' type='text' required value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <label htmlFor='fullname'>ФИО:</label>
            <input id='fullname' type='text' value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
            <label htmlFor='telephone'>Телефон:</label>
            <input id='telephone' type='text' value={telephone} onChange={(e) => setTelephone(e.target.value)}></input>
            <label htmlFor='status'>Статус пользователя:</label>
            <select id='status' value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                <option value='client'>client</option>
                <option value='partner'>partner</option>
                <option value='admin'>admin</option>
            </select>
            {<button type='submit' className='btnSave'>Сохранить</button>}
        </form>
    );
}

export default UserEdit;
