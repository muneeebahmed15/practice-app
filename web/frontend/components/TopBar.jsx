import React, { useEffect, useState } from "react";
import { LegacyCard, Text } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export function TopBar() {
  let fetch = useAuthenticatedFetch();

  const [storeName, setStoreName] = useState();
  const [loading, setLoading] = useState(false);

  const getStore = async () => {
    setLoading(true);
    try {
      let request = await fetch("/api/shop/info", {
        method: "GET",
        Headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await request.json();
      setStoreName(response.data[0].name);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <LegacyCard sectioned>
      <Text>
        <b style={{ fontSize: "24px" }}>{loading ? "loading..." : storeName}</b>
      </Text>
    </LegacyCard>
  );
}
