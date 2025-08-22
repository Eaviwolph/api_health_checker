export type Endpoint = {
  id: string;
  name: string;
  url: string;
  method: string;
  expected_status: number;
  last_check: string;
  last_status: number;
  last_response_time: string;
  is_healthy: boolean;
};

export type HealthCheck = {
  id: string;
  timestamp: string;
  status: number;
};
