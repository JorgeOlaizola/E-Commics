import { useDispatch } from "react-redux"
import { getOrders } from '../store/actions/normalUsersActions'
import { Select, Option} from './globalStyle'

const OrdersFilters = ({ ordersCase, userId, eachCase }) => {
    
    const dispatch = useDispatch()
    const handleChange = (e) => {
        dispatch(getOrders(eachCase, userId, e.target.value))
    }
    return(
        <Select onChange={handleChange}>
            <Option value="" selected>Todas</Option>
            <Option value="Rechazado">Rechazado</Option>
            <Option value="Pendiente de pago">Pendiente de pago</Option>
            <Option value="Pago realizado">Pago realizado</Option>
            <Option value="En proceso de entrega">En proceso de entrega</Option>
            <Option value="Recibido">Recibido</Option>
        </Select>
    )
}

export default OrdersFilters