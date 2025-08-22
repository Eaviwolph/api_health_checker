import React from "react";

import "./home.css";

import type { Endpoint } from "~/components/tools/types";
import { requester } from "~/components/tools/requester";

import { EndpointListItem } from "~/components/endpointListItem/endpointListItem";
import { ButtonVariant, UiButton } from "~/components/uiButton/uiButton";

export default function Home() {
  const [endpoints, setEndpoints] = React.useState<Endpoint[]>([]);

  React.useEffect(() => {
    requester("", "GET")
      .then((response) => response.json())
      .then((data) => setEndpoints(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (endpointId: string) => {
    requester(`/${endpointId}/`, "DELETE")
      .then((response) => {
        if (response.ok) {
          setEndpoints((prev) =>
            prev.filter((endpoint) => endpoint.id !== endpointId)
          );
        }
      })
      .catch((error) => console.error(error));
  };

  const handleViewHistory = (endpointId: string) => {
    window.location.href = `/history/${endpointId}`;
  };

  const handleRefresh = (endpointId: string) => {
    requester(`/${endpointId}/check`, "GET")
      .then((response) => response.json())
      .then((data) => {
        setEndpoints((prev) =>
          prev.map((endpoint) =>
            endpoint.id === endpointId ? { ...endpoint, ...data } : endpoint
          )
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>API Endpoints</h1>
      <UiButton
        text="Create Endpoint"
        variant={ButtonVariant.Green}
        onClick={() => (window.location.href = "/create")}
      />
      <div className="endpoint-list">
        {endpoints.map((endpoint) => (
          <EndpointListItem
            key={endpoint.id}
            endpoint={endpoint}
            onDelete={handleDelete}
            onRefreshStatus={handleRefresh}
            onViewHistory={handleViewHistory}
          />
        ))}
      </div>
    </div>
  );
}
