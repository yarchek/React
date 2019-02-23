import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle} from 'reactstrap';

function RenderComments({comments}) {
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
        return (<div>
            <h4>Comments</h4>
            <ul className="list-unstyled">
                {renderedComments}
            </ul>
        </div>);
    else
        return(
            <div></div>
        );
}

function RenderDish({dish}) {
    return (
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}


const DishDetail = (props) => {
        if (props.dish != null)
            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-5 m-1'>
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className='col-12 col-md-5 m-1'>
                            <RenderComments comments={props.dish.comments}/>
                        </div>
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
};


export default DishDetail;