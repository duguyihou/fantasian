import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const testUser1 = {
  username: 'kong1',
  email: 'kong1@gmail.com',
  password: 'adjnajn',
};
const testUser2 = {
  username: 'kong2',
  email: 'kong2@gmail.com',
  password: 'dfgkjnj',
};

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockReturnValue([testUser1, testUser2]),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const retUsers = await usersController.findAll();
      expect(typeof retUsers).toBe('object');
      expect(retUsers.length).toBe(2);
      expect(retUsers[0].username).toBe('kong1');
    });
  });
});
