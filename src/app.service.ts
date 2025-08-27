import { Injectable } from '@nestjs/common';
import { ColorfulLogger } from './utility/colorful-logger.utility';
import { HealthCheckResult, DependencyCheck } from './types/health.types';

@Injectable()
export class AppService {
  constructor(private readonly logger: ColorfulLogger) {}

  async getHealth(): Promise<HealthCheckResult> {
    this.logger.log(`Performing health check...`);

    const startTime = Date.now();

    try {
      // Basic system health checks
      const uptime = process.uptime();
      const memUsage = process.memoryUsage();
      const totalMem = memUsage.heapTotal;
      const usedMem = memUsage.heapUsed;
      const memPercentage = Math.round((usedMem / totalMem) * 100);

      // Check if memory usage is reasonable (less than 90%)
      const isMemoryHealthy = memPercentage < 90;

      // Simulate database check (replace with actual DB check)
      const dbCheck = await this.checkDatabase();

      // Simulate external API check (replace with actual API check)
      const apiCheck = await this.checkExternalApi();

      const responseTime = Date.now() - startTime;

      const isHealthy =
        isMemoryHealthy && dbCheck.status === 'up' && apiCheck.status === 'up';

      const result: HealthCheckResult = {
        status: isHealthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: Math.round(uptime),
        memory: {
          used: Math.round(usedMem / 1024 / 1024), // MB
          total: Math.round(totalMem / 1024 / 1024), // MB
          percentage: memPercentage,
        },
        dependencies: {
          database: dbCheck,
          externalApi: apiCheck,
        },
      };

      if (isHealthy) {
        this.logger.log(`Health check passed in ${responseTime}ms`);
      } else {
        this.logger.warn(`Health check failed in ${responseTime}ms`);
      }

      return result;
    } catch (error: any) {
      this.logger.error(`Health check error: ${error?.message}`);
      throw error;
    }
  }

  private async checkDatabase(): Promise<DependencyCheck> {
    const startTime = Date.now();

    try {
      // TODO: Replace with actual database connection check
      // Example for TypeORM:
      // await this.dataSource.query('SELECT 1');

      // Simulate database check
      await new Promise((resolve) => setTimeout(resolve, 10));

      const responseTime = Date.now() - startTime;
      return { status: 'up', responseTime };
    } catch (error) {
      this.logger.error(`Database health check failed: ${error.message}`);
      return { status: 'down' };
    }
  }

  private async checkExternalApi(): Promise<DependencyCheck> {
    const startTime = Date.now();

    try {
      // TODO: Replace with actual external API check
      // Example:
      // const response = await fetch('https://api.example.com/health');
      // if (!response.ok) throw new Error('API not responding');

      // Simulate external API check
      await new Promise((resolve) => setTimeout(resolve, 15));

      const responseTime = Date.now() - startTime;
      return { status: 'up', responseTime };
    } catch (error) {
      this.logger.error(`External API health check failed: ${error.message}`);
      return { status: 'down' };
    }
  }
}
