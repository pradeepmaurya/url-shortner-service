# Health Check Implementation

This project now includes a comprehensive health check endpoint that monitors system health and dependencies.

## Current Features

### Basic System Health
- **Uptime**: How long the application has been running
- **Memory Usage**: Current memory consumption with percentage
- **Response Time**: How long the health check takes to complete

### Dependency Checks
- **Database**: Simulated database connectivity check
- **External API**: Simulated external service availability check

## API Endpoint

```
GET /health
```

### Response Format

#### Healthy Response (200 OK)
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "memory": {
    "used": 45,
    "total": 512,
    "percentage": 8
  },
  "dependencies": {
    "database": {
      "status": "up",
      "responseTime": 12
    },
    "externalApi": {
      "status": "up",
      "responseTime": 15
    }
  }
}
```

#### Unhealthy Response (503 Service Unavailable)
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600,
  "memory": {
    "used": 460,
    "total": 512,
    "percentage": 89
  },
  "dependencies": {
    "database": {
      "status": "down"
    },
    "externalApi": {
      "status": "down"
    }
  }
}
```

## How to Add Real Dependency Checks

### 1. Database Health Check

Replace the simulated database check in `src/app.service.ts`:

```typescript
// For TypeORM
private async checkDatabase(): Promise<DependencyCheck> {
  const startTime = Date.now();
  
  try {
    // Replace with actual database check
    await this.dataSource.query('SELECT 1');
    
    const responseTime = Date.now() - startTime;
    return { status: 'up', responseTime };
  } catch (error) {
    this.logger.error(`Database health check failed: ${error.message}`);
    return { status: 'down' };
  }
}
```

### 2. External API Health Check

Replace the simulated API check:

```typescript
private async checkExternalApi(): Promise<DependencyCheck> {
  const startTime = Date.now();
  
  try {
    const response = await fetch('https://api.example.com/health');
    if (!response.ok) throw new Error('API not responding');
    
    const responseTime = Date.now() - startTime;
    return { status: 'up', responseTime };
  } catch (error) {
    this.logger.error(`External API health check failed: ${error.message}`);
    return { status: 'down' };
  }
}
```

### 3. Add More Dependencies

You can extend the `HealthCheckResult` interface in `src/types/health.types.ts`:

```typescript
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
    database?: DependencyCheck;
    externalApi?: DependencyCheck;
    redis?: DependencyCheck;        // Add Redis
    elasticsearch?: DependencyCheck; // Add Elasticsearch
    // ... more dependencies
  };
}
```

## Advanced Health Check with @nestjs/terminus

For production applications, consider using the official NestJS health check package:

```bash
yarn add @nestjs/terminus
```

This provides:
- Built-in health indicators for databases, Redis, etc.
- Kubernetes-ready health checks
- Graceful shutdown handling
- More sophisticated health check strategies

## Monitoring and Alerting

### Kubernetes
Use this endpoint for liveness and readiness probes:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Load Balancers
Configure health checks to route traffic only to healthy instances.

### Logging
Health check results are logged with appropriate levels:
- `log` for successful checks
- `warn` for failed checks
- `error` for exceptions

## Testing

Test the health endpoint:

```bash
# Start the application
yarn start:dev

# Test health check
curl http://localhost:3000/health
```

## Customization

You can customize:
- Memory threshold (currently 90%)
- Health check frequency
- Response format
- Additional system metrics
- Dependency check timeouts
