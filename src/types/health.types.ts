export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  dependencies: {
    database?: { status: 'up' | 'down'; responseTime?: number };
    externalApi?: { status: 'up' | 'down'; responseTime?: number };
  };
}

export interface DependencyCheck {
  status: 'up' | 'down';
  responseTime?: number;
}
