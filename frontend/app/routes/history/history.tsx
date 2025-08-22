import React from "react";
import { useParams } from "react-router";

import "./history.css";

import type { Endpoint, HealthCheck } from "~/components/tools/types";
import { requester } from "~/components/tools/requester";
import { HealthCheckListItem } from "~/components/healthCheckListItem/healthCheckListItem";
import { EndpointListItem } from "~/components/endpointListItem/endpointListItem";
import { ButtonVariant, UiButton } from "~/components/uiButton/uiButton";

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
          <div className="history-endpoint">
            {endpoint && (
              <EndpointListItem
                endpoint={endpoint}
                onDelete={null}
                onRefreshStatus={null}
                onViewHistory={null}
              />
            )}
          </div>
        </div>
        <UiButton
          text="Back"
          variant={ButtonVariant.White}
          onClick={() => (window.location.href = "/")}
        />
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
