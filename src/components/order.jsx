import './css/order.scss';
import {useEffect, useState} from "react";
import products  from "./providers/OrderProducts";

export default function Order() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {

        products().then(response => {
            console.log(response.data)
            setProductos(response.data)}
            ).catch(() => {});

    },[])
    

    return(
        <div className="order">
            {productos[0]?.name}
        </div>
    )
}

