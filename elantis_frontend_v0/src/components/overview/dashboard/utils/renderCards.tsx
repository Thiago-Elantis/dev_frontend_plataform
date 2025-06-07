// utils/renderCards.tsx

import { Card } from "../subcomponents/OverviewCard";
import { CardMetric } from "../subcomponents/types";

export function renderMetricCards(metrics: CardMetric[]) {
  return metrics.map((metric, index) => (
    <Card key={index} {...metric} />
  ));
}
