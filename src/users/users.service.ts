import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/auth/create-user.dto';
import { User, usersDocument } from 'src/schemas/users.schema';
@Injectable()
export class UsersService {
  constructor(
    // make user variable available through this in class
    @InjectModel(User.name) private usersModel: Model<usersDocument>,
  ) {}

  // Create user method, with data transfer object containing fields to create a user
  async registration(createUserDto: CreateUserDto): Promise<User | null> {
    // find existing user
    const existingUser = await this.usersModel.collection.findOne({
      username: createUserDto.username,
    });

    if (existingUser) {
      return null;
    } else {
      // create a user with dto
      const createdUser = new this.usersModel(createUserDto);
      return createdUser.save();
    }
  }

  // Find already existing user in DB. Method for guard
  async findOne(username: string): Promise<User> {
    return this.usersModel.findOne({ username });
  }
}
