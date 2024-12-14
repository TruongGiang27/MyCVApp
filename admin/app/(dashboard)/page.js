'use client';
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Col, Row } from 'react-bootstrap';

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

const Home = () => {
    const [usersCount, setUsersCount] = useState(0);

    const fetchUsersCount = async () => {
        try {
            const response = await fetch('http://localhost:3000/user');
            const data = await response.json();
            console.log('API Response:', data);  // In ra phản hồi API
            setUsersCount(data.count);
        } catch (error) {
            console.error('Failed to fetch user count:', error);
        }
    };
    useEffect(() => {
        fetchUsersCount();
    }, []);
    

    return (
        <Fragment>
            <div className="bg-primary pt-10 pb-21"></div>
            <Container fluid className="mt-n22 px-6">
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        {/* Page header */}
                        <div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mb-2 mb-lg-0">
                                    <h3 className="mb-0 text-white">Projects</h3>
                                </div>
                                <div>
                                    <Link href="#" className="btn btn-white">Create New Project</Link>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Hiển thị số người đăng nhập */}
                <Row>
                    <Col lg={12} md={12} xs={12}>
                        <div className="stat-card">
                            <h4>Active Users Logged In</h4>
                            <p>{usersCount}</p>
                        </div>
                    </Col>
                </Row>

                {/* Active Projects */}
                <ActiveProjects />

                <Row className="my-6">
                    <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
                        {/* Tasks Performance */}
                        <TasksPerformance />
                    </Col>
                    <Col xl={8} lg={12} md={12} xs={12}>
                        {/* Teams */}
                        <Teams />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
};

export default Home;
