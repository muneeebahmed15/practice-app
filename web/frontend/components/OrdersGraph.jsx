import { Layout, LegacyCard } from "@shopify/polaris";
import React, { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { storeData } from "../data";

export function OrdersGraph() {
  const [data, setData] = useState({
    labels: storeData.map((x) => x.year),
    datasets: [
      {
        label: "Orders",
        data: storeData.map((x) => x.order),
      },
    ],
  });
  return (
    <Layout>
      <Layout.Section oneHalf>
        <LegacyCard title="Total Orders" sectioned>
          <Line data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </LegacyCard>
      </Layout.Section>

      <Layout.Section oneThird>
        <LegacyCard title="Completed Orders" sectioned>
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        </LegacyCard>
      </Layout.Section>

      <Layout.Section oneThird>
        <LegacyCard title="Remaining Orders" sectioned>
          <Doughnut
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </LegacyCard>
      </Layout.Section>
    </Layout>
  );
}
