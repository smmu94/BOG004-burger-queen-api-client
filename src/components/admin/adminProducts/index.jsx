import "./adminProducts.scss";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState, useEffect } from "react";
import AdminFormProducts from "./form";

const AdminProduct = ({id, image, name, price, type, deleteProducts, editProducts }) => {
  const [edit, setEdit] = useState(false);
  const [productData, setProductData] = useState({name, price, image, type});

  const onClick = () => {
    setEdit(true);
  }

  useEffect(()=>{
    setProductData({name, price, image, type})
  }
  , [name, price, image, type])

  return (
    <div className="admin-product" data-testid='admin-product'>
      {edit === false ? (<>
      <img src={image} alt={name}/>
      <div className="admin-product-info">
      <p>{name}</p>
      <p>Precio: ${price}</p>
      </div>
      <div className="buttons-product">
        <GrEdit data-testid='edit-product' onClick={onClick}/>
        <RiDeleteBin6Line data-testid='product-delete' onClick={()=>deleteProducts(id)}/>
      </div></>
      ) : <div className="edit" data-testid='product-edit'><AdminFormProducts id={id} edit={setEdit} editProducts={editProducts} productData={productData}/> </div>}
    </div>
  );
};

export default AdminProduct;
  