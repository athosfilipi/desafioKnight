import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Knight, Weapon } from './entities/knight.Schema';
import { KnightsService } from './knights.service';

@ApiTags('knights')
@Controller('knights')
export class KnightsController {
  constructor(private readonly knightService: KnightsService) { }

  @Post()
  async create(@Body() knight: Knight): Promise<Knight> {
    return this.knightService.create(knight);
  }

  @Get()
  @ApiQuery({ name: 'filter', required: false })
  async findAll(@Query('filter') filter?: string): Promise<Knight[]> {
    const validateOptions = [Boolean(filter), filter === 'heroes'];
    const isHeroFilter = validateOptions.every(item => Boolean(item));
    return (
      isHeroFilter
        ? this.knightService.findByHero()
        : this.knightService.findAll()
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Knight> {
    return this.knightService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body): Promise<Knight> {
    if(!Boolean(body.nickname)) return;
    return this.knightService.updateNickname(id, body.nickname); 
  }

  @Patch('setEquippedWeapon/:knightId')
  async setEquippedWeapon(@Param('knightId') knightId: string, @Body() body: { weaponIndex: number }): Promise<Knight> {
    const { weaponIndex } = body;
    return  await this.knightService.setEquippedWeapon(knightId, weaponIndex);
  }

  @ApiBody({ required: true })
  @Post('addWeapon/:knightId')
  async addWeapon(@Body() body: { weapon: Weapon }, @Param('knightId') knightId: string): Promise<Knight> {
    const { weapon } = body;
    if (!Object.values(weapon).length) return;
    return await this.knightService.addWeapon(knightId, weapon);
  }

  @Post(':id/attack')
  async attack(@Param('id') knight: string): Promise<{ attack: number }> {
    const attack = await this.knightService.calculateAttack(knight);
    return { attack };
  }


  @Delete('/removeWeapon/:knightId')
  async removeWeapon(@Param('knightId') knightId: string, @Body() body: { weaponIndex: number }): Promise<Knight> {
    const { weaponIndex } = body;
    return this.knightService.removeWeapon(knightId, weaponIndex);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Knight> {
    return this.knightService.delete(id);
  }
}
