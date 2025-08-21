import React from "react";

import "./endpointListItem.css";

import type { Endpoint } from "../types";

export function EndpointListItem(props: {
  endpoint: Endpoint;
  onDelete: (endpointId: string) => void;
  onRefreshStatus: (endpointId: string) => void;
  onViewHistory: (endpointId: string) => void;
}) {
  const { endpoint, onDelete, onRefreshStatus, onViewHistory } = props;

  // Determine the health status class for styling
  const healthClass =
    endpoint.is_healthy === true
      ? "healthy"
      : endpoint.is_healthy === false
        ? "unhealthy"
        : "unknown";

  return (
    <div className={`endpoint-list-item ${healthClass}`}>
      <div className="endpoint-header">
        <div className="endpoint-name">{endpoint.name}</div>
        <div className="endpoint-actions">
          <button
            className="delete-button"
            onClick={() => onDelete(endpoint.id)}
            title="Delete endpoint"
          >
            Delete
          </button>
          <button
            className="refresh-button"
            onClick={() => onRefreshStatus(endpoint.id)}
            title="Refresh endpoint status"
          >
            Refresh Status
          </button>
            <button
              className="history-button"
              onClick={() => onViewHistory(endpoint.id)}
              title="Get endpoint history"
            >
              History
            </button>
        </div>
      </div>
      <div className="endpoint-details">
        <div className="endpoint-field">
          <span className="label">URL:</span> {endpoint.url}
        </div>
        <div className="endpoint-field">
          <span className="label">Method:</span> {endpoint.method}
        </div>
        <div className="endpoint-field">
          <span className="label">Expected Status:</span>{" "}
          {endpoint.expected_status}
        </div>
        <div className="endpoint-field">
          <span className="label">Last Status:</span>{" "}
          {endpoint.last_status ? endpoint.last_status : "Unknown"}
        </div>
        <div className="endpoint-field">
          <span className="label">Last Check:</span>{" "}
          {endpoint.last_check
            ? new Date(endpoint.last_check).toLocaleString()
            : "Unknown"}
        </div>
        <div className="endpoint-field">
          <span className="label">Is Healthy:</span>{" "}
          {endpoint.is_healthy === true
            ? "Yes"
            : endpoint.is_healthy === false
              ? "No"
              : "Unknown"}
        </div>
      </div>
    </div>
  );
}
