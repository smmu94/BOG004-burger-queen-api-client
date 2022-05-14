import './css/order.scss';
import products  from "./providers/OrderProducts";

export default function Order() {
    products().then(response => {
        console.log(response.data)}
        ).catch(() => {});
}

