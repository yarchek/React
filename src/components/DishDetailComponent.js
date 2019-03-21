import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors  } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}) {
    return (
        <div className='col-12 col-md-5 m-1'>
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,

        };
        this.toggleModal = this.toggleModal.bind(this);
        this.RenderComments = this.RenderComments.bind(this);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    RenderComments(comments) {
        let renderedComments = comments.map((comment) => {
            return(
                <li>
                    <div>
                        {comment.comment}
                    </div>
                    <div>
                        -- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric',
                        month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                    </div>
                </li>
            );
        });
        if (comments != null)
            return (
                <div className='col-12 col-md-5 m-1'>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {renderedComments}
                    </ul>
                    <Button outline color='secondary' onClick={this.toggleModal}><span className='fa fa-pencil'/> Submit Сomment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id="rating" name="rating"
                                                      placeholder="Rating"
                                                      className="form-control"
                                                      validators={{
                                                          required, minLength: minLength(3), maxLength: maxLength(15)
                                                      }}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor=".name" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".name" id="name" name="name"
                                                      placeholder="Your Name"
                                                      className="form-control"
                                                      validators={{
                                                          required, minLength: minLength(3), maxLength: maxLength(15)
                                                      }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".name"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message" md={12}>Your Feedback</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".message" id="message" name="message"
                                                          rows="12"
                                                          className="form-control" />
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Col md={12}>
                                        <Button type='submit' color='primary' onClick={this.toggleModal}>
                                            Send Feedback
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>);
        else
            return(
                <div></div>
            );
    }

    render() {
        if (this.props.dish != null)
            return(
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className='col-12'>
                            <h3>{this.props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className='row'>
                        <RenderDish dish={this.props.dish}/>
                        {this.RenderComments(this.props.comments)}
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }
}

export default DishDetail;