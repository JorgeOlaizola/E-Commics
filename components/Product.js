
export default function Product (props) {
    return (
        <div>
            <h1>{props.title}</h1> <br/>
            <img width="10%" src={props.image}></img>
            <p>{props.description}</p> <br/>
            <span> {props.price} $ </span>
            <hr/>
        </div>
    )
}
