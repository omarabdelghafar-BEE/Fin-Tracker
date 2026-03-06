import { Test, TestingModule } from '@nestjs/testing';
import { AuthTokenController } from './auth-token.controller';

describe('AuthTokenController', () => {
  let controller: AuthTokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthTokenController],
    }).compile();

    controller = module.get<AuthTokenController>(AuthTokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
