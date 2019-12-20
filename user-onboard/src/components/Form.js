import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from "axios";

function UserForm({ values, errors, touched, status }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status])


    
    return (
        <div>
            <Form>
                <h1>User Registration</h1>
                <label>
                    Name: 
                    <Field type="text" name="name" placeholder="Enter Name" autoComplete="none" />
                    {touched.name && errors.name && (
                        <p className="errors">{errors.name}</p>
                    )}
                </label>
                <br/>
                <label>
                    Email: 
                    <Field type="text" name="email" placeholder="Enter Email" autoComplete="none"/>
                </label>
                <br/>
                <label>
                    Password:
                <Field type="password" name="password" placeholder="Enter Password"  autoComplete="none"/>
                    {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}                    
                </label>
                <br/>
                <label>
                    Terms Of Service:
                    <Field type="checkbox" className="checkbox" name="tos" checked={values.tos} />
                
                {errors.tos && (
                    <p className="errors">{errors.tos}</p>
                )}
                </label>
                <button type="submit" >Submit</button>
            </Form>
            {users.map(user => (
                <div className="user-card" key={user.id}>
                    <h2>New User!</h2>
                    <p>Name: {user.name}</p>
                    <p>Welcome!</p>
                </div>
            ))}
        </div>
        
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        password: Yup.string().required(),
        tos: Yup.bool().oneOf([true], 'You must accept the Terms of Service')
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            setStatus(res.data);
            console.log(res);
        })
        .catch(err => {
            console.log(err.response);
        })
        .finally(resetForm())
    }
})(UserForm)

export default FormikUserForm;