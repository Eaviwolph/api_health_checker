import React from "react";
import { useParams } from "react-router";

import "./history.css";

import type { Endpoint, HealthCheck } from "~/components/types";
import { requester } from "~/components/requester";
import { HealthCheckListItem } from "~/components/healthCheckListItem/healthCheckListItem";

export default function History() {
  const { id: endpointId } = useParams();

  const [endpoint, setEndpoint] = React.useState<Endpoint | null>(null);

  const [history, setHistory] = React.useState<HealthCheck[]>([]);

  React.useEffect(() => {
    requester(`/${endpointId}`, "GET")
      .then((response) => response.json())
      .then((data) => setEndpoint(data))
      .catch((error) => console.error(error));
  }, [endpointId]);

  React.useEffect(() => {
    requester(`/${endpointId}/history`, "GET")
      .then((response) => response.json())
      .then((data) => setHistory(data))
      .catch((error) => console.error(error));
  }, [endpointId]);

  return (
    <div>
      <div className="history-header">
        <div className="history-title">
          <h1>API Endpoint History</h1>
          <h2>Showing history for endpoint: {endpoint?.name}</h2>
        </div>
        <button
          className="btn btn-back"
          onClick={() => window.location.href = "/"}
          title="Back to endpoints"
        >
          Back
        </button>
      </div>
      {history.map((history) => (
        <HealthCheckListItem
          key={history.id}
          healthCheck={history}
          endpoint={endpoint}
        />
      ))}
    </div>
  );
}
