import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigService } from '@nestjs/config';

describe('EnvironmentConfigService', () => {
  let service: EnvironmentConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentConfigService, ConfigService],
    }).compile();

    service = module.get<EnvironmentConfigService>(EnvironmentConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
