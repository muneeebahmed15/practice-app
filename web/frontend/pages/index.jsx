import { Layout, Page } from "@shopify/polaris";
import { Cards, OrdersGraph } from "../components";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";
import { useEffect, useState } from "react";

export default function HomePage() {
  const fetch = useAuthenticatedFetch();
  const [loading, setLoading] = useState(false);

  const [totalProduct, setTotalProduct] = useState();
  const [totalCollection, setTotalCollection] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [fullfilledOrders, setFullfilledOrders] = useState();
  const [remainingOrders, setRemainingOrders] = useState();

  const totalProducts = async () => {
    setLoading(true);
    try {
      let request = await fetch("/api/products/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await request.json();
      setTotalProduct(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalCollections = async () => {
    setLoading(true);
    try {
      let request = await fetch("api/custom-collection/count", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await request.json();
      setTotalCollection(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const totalOrder = async () => {
    setLoading(true);
    try {
      let request = await fetch("api/orders/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await request.json();
      setTotalOrders(response.data.length);
      let fulfilledOrder = response.data.filter(
        (x) => x.fulfillment_status === "fulfilled"
      );
      setFullfilledOrders(fulfilledOrder.length);
      setRemainingOrders(totalOrders - fullfilledOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(totalOrders);

  useEffect(() => {
    totalProducts();
    totalCollections();
    totalOrder();
  }, []);

  return (
    <Page fullWidth>
      <Layout>
        <div>
          <div style={{ marginTop: "20px" }}>
            <OrdersGraph />
          </div>

          <div style={{ marginTop: "20px" }}>
            <Layout>
              <Cards title={"Total Orders"} value={totalOrders} loading={loading} />
              <Cards
                title={"Fulfilled Orders"}
                value={fullfilledOrders}
                loading={loading}
              />
              <Cards
                title={"Remaining Orders"}
                value={remainingOrders}
                loading={loading}
              />
              <Cards title={"Total Products"} value={totalProduct} loading={loading} />
              <Cards
                title={"Total Collection"}
                value={totalCollection}
                loading={loading}
              />
            </Layout>
          </div>

          <div className=""></div>
        </div>
      </Layout>
    </Page>
  );
}
