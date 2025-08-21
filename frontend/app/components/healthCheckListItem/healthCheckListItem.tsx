import React from "react";

import "./healthCheckListItem.css";

import type { Endpoint, HealthCheck } from "../types";

export function HealthCheckListItem(props: {
  endpoint: Endpoint | null;
  healthCheck: HealthCheck;
}) {
  const { healthCheck, endpoint } = props;

  // Determine the health status class for styling
  const healthClass =
    healthCheck.status === undefined || healthCheck.status === null
      ? "unknown"
      : healthCheck.status === endpoint?.expected_status
        ? "healthy"
        : "unhealthy";

  console.log(healthCheck);
  return (
    <div className={`healthCheck-list-item ${healthClass}`}>
      <div className="healthCheck-field">
        <span className="label">Status:</span>{" "}
        {healthCheck.status ? healthCheck.status : "Unknown"}
      </div>
      <div className="healthCheck-field">
        <span className="label">Timestamp:</span>{" "}
        {healthCheck.timestamp
          ? new Date(healthCheck.timestamp).toLocaleString()
          : "Unknown"}
      </div>
    </div>
  );
}
