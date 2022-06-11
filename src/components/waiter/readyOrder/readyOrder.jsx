import "../../css/readyOrder.scss";


const ReadyOrder = (props) => {
  console.log('readyOrder', props.product);
  const handleClick = () => {
    props.addDeliveredOrder({ client: props.client, timeOrd: props.timeOrd, id: props.id });
    props.resetReadyOrder(props.id);
  };

  return (
   
      <section className="container-order">
        <p className="clientName">Cliente: {props.client}</p>
        <p className="orderNum">Ordén #{props.id}</p>
        <div className="description-order">
          {props.product.map((product) => {
            return (
              <section
                className="amount-product"
                key={"order-product-" + product.id}
              >
                <div className="amount">{product.quantity}</div>
                <div className="product-name">{product.name}</div>
              </section>
            );
          })}
        </div>
        <button type="button" className="btn-order" data-testid="btn-order" onClick={handleClick}>
          ENTREGAR ORDEN
        </button>
      </section>
 
  );
};

export default ReadyOrder;
