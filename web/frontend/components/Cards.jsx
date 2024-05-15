import { Layout, LegacyCard } from "@shopify/polaris";
import React from "react";

export function Cards({ title, value, loading }) {
  return (
    <Layout.Section oneThird>
      <LegacyCard title={title} sectioned>
        <b style={{ fontSize: "32px" }}>{loading ? "loading..." : value}</b>
      </LegacyCard>
    </Layout.Section>
  );
}
