import { useOrderStore } from "@/store/useOrderStore";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "./served.scss";
import ServedOrder from "./servedOrder";

const Served = () => {
  const [expanded, setExpanded] = useState(false);
  const { orders } = useOrderStore();
  const servedOrders = orders.filter((o) => o.status === "served");

  const isMobile = window.innerWidth < 768;

  return (
    <>
      {isMobile && (
        <section className="servedOrders">
          <div className="servedOrders-header" onClick={() => setExpanded(true)} data-testid="servedOrders-header">
            <span>Order History</span>
            <span className="toggle-icon">▼</span>
          </div>
        </section>
      )}
      {(expanded || !isMobile)
        && (
          <div className="servedOrders-overlay" data-testid="servedOrders">
            <div className="servedOrders-overlay-header">
              <span>Order History</span>
              <button className="close-button" onClick={() => setExpanded(false)}>
                ✕
              </button>
            </div>
            <div className="servedOrders-overlay-table">
              <Table>
                <thead>
                  <tr className="subtitles-served">
                    <th>Customer</th>
                    <th>Delivery Time</th>
                  </tr>
                </thead>
                <tbody>
                  {servedOrders.map((ord) => (
                    <ServedOrder
                      key={"svOrder" + ord.id}
                      client={ord.client}
                      timeOrd={ord.timeOrd}
                    />
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
    </>
  );
};

export default Served;
