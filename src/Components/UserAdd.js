import React, { useState } from 'react';
import './UserAdd.css';
import { uniqueId } from 'lodash';

function UserEdit(props) {

    const setUserAddForm = props.setUserAddForm;
    const updateData = props.updateData;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [telephone, setTelephone] = useState('');
    const [userStatus, setUserStatus] = useState('Client');

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

        if (localStorage.getItem('users') === null) {
            const initData = JSON.stringify([{
                id: uniqueId(), 'email': email.trim(), 'password': password.trim(),
                'fullName': fullName.trim(), 'telephone': telephone.trim(), 'userStatus': userStatus,
                'dateCreation': new Date().toLocaleString(), 'dateChanged': 'Не изменялась'
            }]);
            localStorage.setItem('users', initData);
            updateData();
        } else {
            const newData = JSON.parse(localStorage.getItem('users'));
            newData.push({
                id: uniqueId(), 'email': email.trim(), 'password': password.trim(),
                'fullName': fullName.trim(), 'telephone': telephone.trim(), 'userStatus': userStatus,
                'dateCreation': new Date().toLocaleString(), 'dateChanged': 'Не изменялась'
            });
            localStorage.setItem('users', JSON.stringify(newData));
            updateData();
        }
        setUserAddForm(false);
    }

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor='addEmail'>Электронный адрес:</label>
            <input id='addEmail' className={emailValid ? '' : 'invalid'} type='email' required onChange={handleChangeEmail}></input>
            {emailValid ? '' : <div className='errorMsg'>Неверный формат email!</div>}
            <label htmlFor='addPassword'>Пароль</label>
            <input id='addPassword' className={passwordValid ? '' : 'invalid'} type='text' required onChange={handleChangePassword}></input>
            {passwordValid ? '' : <div className='errorMsg'>Неверный формат пароля!</div>}
            <label htmlFor='addFullname'>ФИО</label>
            <input id='addFullname' type='text' onChange={(e) => setFullName(e.target.value)}></input>
            <label htmlFor='addTelephone'>Телефон</label>
            <input id='addTelephone' className={telephoneValid ? '' : 'invalid'} type='tel' onChange={handleChangeTelephone}></input>
            {telephoneValid ? '' : <div className='errorMsg'>Неверный формат телефона!</div>}
            <label htmlFor='addStatus'>Статус пользовтеля:</label>
            <select id='addStatus' onChange={(e) => setUserStatus(e.target.value)}>
                <option value='Client'>Client</option>
                <option value='Partner'>Partner</option>
                <option value='Admin'>Admin</option>
            </select>
            {<button className='btnAdd' type='submit'>Добавить</button>}
        </form>
    );
}

export default UserEdit;
