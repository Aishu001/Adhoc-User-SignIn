import React from 'react'
import { Button, Checkbox, Form, Input, DatePicker} from 'antd';
import { useNavigate  } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import './login.css'


function Login() {
    const Item = styled(Paper)();
    const navigate = useNavigate()
  
    const onFinish = async (values) => {
        try {
            console.log('Form values:', values);
    
            const formattedDate = values.dateOfBirth.format('YYYY-MM-DD');
            console.log(formattedDate);
    
            const response = await axios.post('http://localhost:3000/user/login', {
                fullName: values.fullName,
                email: values.email,
                dateOfBirth: formattedDate,
                phoneNumber: values.phoneNumber
            });
    
            console.log('Data submitted successfully:', response.data);
    
            // Navigate to the home page
            navigate('/home');
        } catch (error) {
            console.error('Error submitting data:', error);
    
            // Display the error message from the server
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('A network error occurred. Please check your server and internet connection.');
            }
        }
    };
  return (
  <>
   <Box>
      {/* <h1 className='head-signUp' >Create an Account</h1> */}
        <Grid container spacing={0}  className='containerX'>
        <Grid size={4}>
        <div className="image-container-fomrs">
            <img src="signUp.jpeg" alt="" className='imageSC'/>
        </div>
        </Grid>
        <Grid size={6}>
        <Item className="form-containerF"> 
       
       <div className="form-container-divVC">
     
        <div className="form-contentD">
        <Form onFinish={onFinish}>

    <Form.Item
        name="fullName"
        label="Full Name"
        className="form-item"
       
        rules={[
            {
                required: true,
                message: 'Please input your Full Name!',
                whitespace: true,
            },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
        name="email"
        label="E-mail"
        className="form-item"
        rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
        ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
    name="phoneNumber"
    label="Phone Number"
    className="form-item"
    rules={[
        {
            required: true,
            message: 'Please input your phone number!',
        },
        {
            pattern: /^\d{10}$/,
            message: 'Phone number must be exactly 10 digits!',
        },
    ]}
>
    <Input />
</Form.Item>


<Form.Item 
 name="dateOfBirth"
 label="Date of Birth"
 className="form-item"
 rules={[
     {
         required: true,
         message: 'Please select you DOB',
     }
 ]}
>
          <DatePicker />
        </Form.Item>



    <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
            {
                validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
        ]}
    >
        <Checkbox>
            I have read the <a href="#">agreement</a>
        </Checkbox>
    </Form.Item>
   
    <Form.Item>
        <Button type="primary" htmlType="submit">
            Register
            <span></span>

        </Button>
    </Form.Item>
</Form>

        </div>
</div>
        </Item>
        </Grid>
 
</Grid>
        </Box>
  </>
  )
}

export default Login