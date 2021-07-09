import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { getProductDetail } from '../store/actions/productActions';

const Product = (props) => {
    const dispatch = useDispatch()
    return (
        <div>
            <h1>{props.title}</h1> <br/>
            <img width="10%" src={props.image}></img>
            <p>{props.description}</p> <br/>
            <span> {props.price} $ </span>
            <span> {props.category}</span>
            <span> {props.user}</span>
            <button onClick={() => dispatch(getProductDetail(props.id))}><Link href={`/detail/${props.id}`} passHref> Detail </Link></button>

        </div>
    )
}

export default Product;
