import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Knight, KnightDocument } from './entities/knight.Schema';

@Injectable()
export class KnightsService {
  constructor(
    @InjectModel(Knight.name) private readonly knightModel: Model<KnightDocument>,
  ) {}

  async create(knight: Knight): Promise<Knight> {
    const createdKnight = new this.knightModel(knight);
    return createdKnight.save();
  }

  async findAll(): Promise<Knight[]> {
    return this.knightModel.find().exec();
  }

  async findByHero(): Promise<Knight[]> {
    return this.knightModel.find({ "attributes.hero": true }).exec();
  }

  async findOne(id: string): Promise<Knight> {
    return this.knightModel.findById(id).exec();
  }

  async update(id: string, knight: Knight): Promise<Knight> {
    return this.knightModel.findByIdAndUpdate(id, knight, { new: true }).exec();
  }

  async delete(id: string): Promise<Knight> {
    const deletedKnight = await this.knightModel.findByIdAndDelete(id).exec();
    return deletedKnight;
  }

  async addWeapon(knightId: string, weapon: { name: string, mod: number, attr: string, equipped: boolean }): Promise<Knight> {
    const knight = await this.knightModel.findById(knightId).exec();
    knight.weapons.push(weapon);
    return knight.save();
  }

  async removeWeapon(knightId: string, weaponIndex: number): Promise<Knight> {
    const knight = await this.knightModel.findById(knightId).exec();
    knight.weapons.splice(weaponIndex, 1);
    return knight.save();
  }

  async setEquippedWeapon(knightId: string, weaponIndex: number): Promise<Knight> {
    const knight = await this.knightModel.findById(knightId).exec();
    knight.weapons.forEach((weapon, index) => {
      weapon.equipped = index === weaponIndex;
    });
    return knight.save();
  }
}
