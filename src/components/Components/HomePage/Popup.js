import React, { useState } from 'react';
import Modal from '../../UI/Modal';
import classes from './Popup.module.css';
import { useNavigate } from 'react-router-dom';

const Popup = props => {
  const search = useNavigate();
  //Set trang thai input, IsValid
  const [input, setInput] = useState('');
  const [isValid, setIsValid] = useState(true);
  //validate input
  const inputChangeHandler = event => {
    if (event.target.vaulue.trim().length > 0) {
      setIsValid(true);
    }
    setInput(event.target.value);
    props.onInputChange(input);
  };
  //ham bat su kien click search
  const submitHandler = event => {
    event.preventDefault();
    if (input.trim().length === 0) {
      setIsValid(false);
      return;
    } else {
      search('search');
    }
  };
  return (
    <Modal className={classes.search} onClose={props.onClose}>
      <form
        className={`${classes.searchform}
        ${!isValid && classes.invalid}`}
        onSubmit={submitHandler}
      >
        <div>
          <input
            type="text"
            value={input}
            onChange={inputChangeHandler}
          ></input>
          <svg
            className="svg-inline--fa fa-search fa-w-16"
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>
        <div>
          <button
            className={classes.btnsearch}
            type="submit"
            onClick={submitHandler}
          >
            Search
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default Popup;
