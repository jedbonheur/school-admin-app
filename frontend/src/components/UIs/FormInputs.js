
import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DatePickerField = ({label, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field,meta] = useField(props);
  // const [startDate, setStartDate] = useState(new Date());  
  return (
   <div className="inputBloack">
    <label htmlFor={props.id || props.name}>{label}
    </label>
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || new Date()}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
    />
    {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
   </div>
  );
};

export const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <div className="inputBloack">
       <label htmlFor={props.id || props.name}>{label}</label>
       <input className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };

export const MytextArea = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
     <div className="inputBloack">
       <label htmlFor={props.id || props.name}>{label}</label>
       <textarea className="text-input" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };

export const FileInput = ({ label, ...props }) => {
 const [meta] = useField(props);
   return (
     <div className="inputBloack">
       <label htmlFor={props.id || props.name}>{label}</label>
       <input className="file_input" {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };

 export const MyCheckbox = ({ children, ...props }) => {
   // React treats radios and checkbox inputs differently other input types, select, and textarea.
   // Formik does this too! When you specify `type` to useField(), it will
   // return the correct bag of props for you -- a `checked` prop will be included
   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
      <div className="inputBloack">
       <label className="checkbox-input">
         <input type="checkbox" {...field} {...props} />
         {children}
       </label>
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
      </div>
   );
 };

export const MySelect = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
     <div className="inputBloack">
       <label htmlFor={props.id || props.name}>{label}</label>
       <select className="custom-select" {...field} {...props} />
       {meta.touched && meta.error ? (
         <div className="error">{meta.error}</div>
       ) : null}
     </div>
   );
 };