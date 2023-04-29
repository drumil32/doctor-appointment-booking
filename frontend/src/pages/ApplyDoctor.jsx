import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout'
import { Col, Form, Input, Row, TimePicker, message ,Checkbox} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { CookiesContext } from '../context/CookiesProvider';

// import moment from 'moment';

const ApplyDoctor = ({ axiosInstance }) => {
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     const { user } = useSelector(state => state.user)
    const { token } = cookies;
    //console.log(token);
    const handleFinish = async (values) => {
        // const { token } = cookies;
        console.log(values);
        try {
            dispatch(showLoading());
            const res = await axiosInstance.post('/user/apply-doctor',
                {
                    ...values,
                    userId: user._id,
                    timings: [
                        "morning",
                        "evening",
                    ],
                },
                // {
                //     headers: {
                //         authorization: 'Bearer ' + token
                //     }
                // }
                );
            dispatch(hideLoading());
            if (!res.data.success) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                navigate('/');
            }
            console.log(res.data)
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }
    return (
        <Layout >
            <h1 className="text-center">Apply Doctor</h1>
            <Form layout="vertical" onFinish={handleFinish} className="m-3">
                <h4 className="">Personal Details : </h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your first name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Last Name"
                            name="lastName"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your last name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Phone No"
                            name="phone"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your contact no" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Email"
                            name="email"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="email" placeholder="your email address" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website">
                            <Input type="text" placeholder="your website" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Address"
                            name="address"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your clinic address" />
                        </Form.Item>
                    </Col>
                </Row>
                <h4>Professional Details :</h4>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Specialization"
                            name="specialization"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your specialization" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Experience"
                            name="experience"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your experience" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Fees Per Cunsaltation"
                            name="feesPerCunsaltation"
                            required
                            rules={[{ required: true }]}
                        >
                            <Input type="text" placeholder="your contact no" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        {/* <Form.Item label="Timings" name="timings" required>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item> */}

                        <Form.Item label="Morning" name="morning">
                            <Checkbox/>
                        </Form.Item>
                        <Form.Item label="Evening" name="evening">
                            <Checkbox />
                        </Form.Item>  
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className="btn btn-primary form-btn" type="submit">
                            Submit
                        </button>
                    </Col>
                </Row>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor