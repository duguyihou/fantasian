import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      const newUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });
      await newUser.save();
      return { msg: 'create user succuss' };
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ _id: id }).exec();
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto)
      .exec();

    return updatedUser;
  }

  async remove(id: string) {
    await this.userModel.findOneAndDelete({ _id: id }).exec();
    return { msg: 'delete user success' };
  }
}
