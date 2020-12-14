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

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [telephoneValid, setTelephoneValid] = useState(true);

    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    const passwordRegExp = /[0-9a-zA-Z]{6,}/;
    const telephoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        if (emailRegExp.test(e.target.value)) {
            setEmailValid(true);
        }
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if (passwordRegExp.test(e.target.value)) {
            setPasswordValid(true);
        }
    }

    const handleChangeTelephone = (e) => {
        setTelephone(e.target.value);
        if (telephoneRegExp.test(e.target.value) || e.target.value === '') {
            setTelephoneValid(true);
        }
    }

    const isInvalid = () => {
        const validEmail = emailRegExp.test(email);
        const validPassword = passwordRegExp.test(password);
        const validTelephone = telephoneRegExp.test(telephone) || telephone === '';

        if (!validEmail) {
            setEmailValid(false);
        }
        if (!validPassword) {
            setPasswordValid(false);
        }
        if (!validTelephone) {
            setTelephoneValid(false);
        }
        if (!validEmail || !validPassword || !validTelephone) {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isInvalid()) {
            return;
        }

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
            <input id='email' type='email' className={emailValid ? '' : 'invalid'} required value={email} onChange={handleChangeEmail}></input>
            {emailValid ? '' : <div className='errorMsg'>Неверный формат email!</div>}
            <label htmlFor='pass'>Пароль:</label>
            <input id='pass' type='text' className={passwordValid ? '' : 'invalid'} required value={password} onChange={handleChangePassword}></input>
            {passwordValid ? '' : <div className='errorMsg'>Неверный формат пароля!</div>}
            <label htmlFor='fullname'>ФИО:</label>
            <input id='fullname' type='text' value={fullName} onChange={(e) => setFullName(e.target.value)}></input>
            <label htmlFor='telephone'>Телефон:</label>
            <input id='telephone' type='tel' className={telephoneValid ? '' : 'invalid'} value={telephone} onChange={handleChangeTelephone}></input>
            {telephoneValid ? '' : <div className='errorMsg'>Неверный формат телефона!</div>}
            <label htmlFor='status'>Статус пользователя:</label>
            <select id='status' value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                <option value='Client'>Client</option>
                <option value='Partner'>Partner</option>
                <option value='Admin'>Admin</option>
            </select>
            {<button type='submit' className='btnSave'>Сохранить</button>}
        </form>
    );
}

export default UserEdit;
