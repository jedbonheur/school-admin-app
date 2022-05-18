import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`

  html,body {

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        h1,h2 {
            font-size: 30px;
            margin: 10px 0px;
        }
      }
  }

  // ************************formik styling**********************************
  // ************************************************************************
  form {
    padding: 1rem;
  }
  .flex-form {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    border: 1px solid #e1e1e1f7;
    border-radius: 5px;
    padding: 1rem;
    &:hover {
    border: 1px solid #2196f36e;
    transition: all 300ms ease;
}
}.inputBloack {
    display: flex;
    font-weight: bold;
    flex-wrap: wrap;
    gap: 5px;
    margin: 5px 0;
    align-items: center;
    position: relative;
}.react-datepicker-wrapper {
    width: auto !important;
}.inputBloack input {
    background: #e6e6e6ab;
    border: none;
    padding: 7px 3px;
    text-transform: capitalize;
    border-radius: 5px;
    outline: unset;
}
.error {
    color: red;
    position: absolute;
    top: -16px;
    font-size: 11px;
    font-weight: lighter;
    font-style: italic;
    right: 0;
    transition: all 300ms ease;
}

input.text-input::placeholder {
    color: #bab4b4;
    padding-left: 8px;
}
input:focus {
    background: #ffc107;
    color: black;
    transition: all 300ms ease;
}
span.date_placeholder {
    position: absolute;
    top: -5px;
    font-size: 10px;
    left: 2px;
    font-weight: lighter;
    text-transform: uppercase;
}


.inputBloack select {
    background: #e6e6e6ab;
    border: none;
    border-radius: 5px;
    padding: 7px 3px;
    outline: unset;
    text-transform: capitalize;
}.inputBloack select:focus {
    background: #ffc107;
    color: black;
    transition: all 300ms ease;
}
.file_input {
    background: none !important;
}
input[type='email'] {
    text-transform: lowercase !important;
}
button.btn {
    display: block;
    padding: 1rem 4rem;
    border: none;
    background: #2196f3;
    color: #fff;
    border-radius: 7px;
    box-shadow: 0px 0px 5px #000000bf;
    margin: 2rem 0;
   font-weight: bold;
    &:hover {
        color: #000000;
        background: #ffc107;
        transition: all 300ms ease;
        cursor:pointer
    }
 }
 input[type=file]::file-selector-button {
    background: #ffc107;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    color: black;
}

textarea.text-input {
    padding: 5px;
}

// ************************formik styling**********************************
// ************************************************************************

`;

