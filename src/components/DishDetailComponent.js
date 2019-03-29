import React ,{Component} from 'react';
import {Card,CardImg,CardText,CardTitle,CardBody,Button,Breadcrumb,BreadcrumbItem,Modal,ModalHeader,
    ModalBody,Row,Col,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control,LocalForm,Errors } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { baseURL } from "../shared/baseURL";

const required=(val)=>val&&val.length;

const maxLength=(len)=>(val)=>!(val) || (val.length<=len);

const minLength=(len) =>(val)=> val && (val.length>=len);

function RenderComments({comments, postComment, dishId}) {

    if(comments === null)
    {
        return(<></>);
    }

    const cmnts=comments.map((comment)=> {
        return(
            <li key={comment.id}>
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

    return(
        <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {cmnts}
            </ul>
            <CommentForm dishId={dishId} postComment={postComment}/>
        </div>
    );
}
function RenderDish({dish}) {
        return(
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg top src={ baseURL + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
}
class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        };
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div className="row ">
                <div className="col-12">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"/> Submit Comment</Button>
                </div>
                <div className="col-12">
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Label htmlFor='rating' md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" id='rating' name='rating' className="form-control" placeholder="Rating">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='name' md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" id='author' name='author' className="form-control" placeholder="Your Name"
                                                      validators={{
                                                          required, minLength: minLength(3), maxLength: maxLength(15)}}/>
                                        <Errors className="text-danger" model=".author" show="touched" messages=  {{
                                            required: 'Required ',
                                            minLength: 'Minimum length should be three ',
                                            maxLength: 'Maxlenth should be less than 15 '
                                        }}/>
                                    </Col>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='comment' md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" id='comment' name='comment' rows="6" className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size:10,offset:2}}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col></Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

const DishDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null)  {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish={props.dish}/>
                    <RenderComments comments={props.comments} postComment={props.postComment}
                                    dishId={props.dish.id}/>
                </div>
            </div>
        );
    }
};

export default DishDetail;