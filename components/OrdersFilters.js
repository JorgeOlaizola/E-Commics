import { useDispatch } from "react-redux"
import { getOrders } from '../store/actions/normalUsersActions'

const OrdersFilters = ({ ordersCase, userId, eachCase }) => {
    
    const dispatch = useDispatch()
    const handleChange = (e) => {
        dispatch(getOrders(eachCase, userId, e.target.value))
    }
    return(
        <select onChange={handleChange}>
            <option value="" selected>Todas</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Pendiente de pago">Pendiente de pago</option>
            <option value="Pago realizado">Pago realizado</option>
            <option value="En proceso de entrega">En proceso de entrega</option>
            <option value="Recibido">Recibido</option>
        </select>
    )
}

export default OrdersFilters