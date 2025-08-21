export type Endpoint = {
  id: string;
  name: string;
  url: string;
  method: string;
  expected_status: number;
  last_check: string;
  last_status: number;
  is_healthy: boolean;
};

export type HealthCheck = {
  id: string;
  timestamp: string;
  status: number;
};
