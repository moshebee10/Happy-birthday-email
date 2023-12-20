import React, { useState } from 'react';
import {
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    Card,
    CardTitle,
    CardText,
} from 'reactstrap';
import './userDetailsCell.css';
import * as strings from '../strings/he';
import { sendBlessing } from '../api/api';

function UserDetailsCell(props) {

    const [value, setValue] = useState('');

    const onClick = async (userDetails) => {
        if (value !== '') {
            userDetails.birthdayMessage = value;
            await sendBlessing(userDetails);
        } else alert(strings.ALERT_MSG);
    }

    return (
        <Row
            className='user-details-row'
        >
            <Col sm="6">
                <Card
                    body
                    className='user-details-card'
                >
                    <CardTitle tag="h5">
                        {`${props.userDetails.firstName}\xa0${props.userDetails.lastName}`}
                    </CardTitle>
                    <CardText>
                        {props.userDetails.birthDate}
                    </CardText>
                    <Form>
                        <FormGroup>
                            <Label
                                for="blessing-text"
                                className='user-details-blessing-text-label'
                            >
                                {strings.BLESSING_TEXT}
                            </Label>
                            <Input
                                id="blessing-text"
                                name="text"
                                type="textarea"
                                value={value}
                                onChange={
                                    (e) => setValue(e.target.value)
                                }
                            />
                        </FormGroup>

                    </Form>
                    <Button
                        style={{
                            backgroundColor: '#000000',
                            color: 'rgb(184, 134, 11)'
                        }}
                        onClick={() => onClick(props.userDetails)}
                    >
                        Send blessing
                    </Button>
                </Card>
            </Col>
        </Row>
    );
}

export default UserDetailsCell;