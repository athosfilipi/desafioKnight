import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface Weapon {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

export type KnightDocument = Knight & Document;

@Schema()
export class Knight {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  birthday: string;

  @Prop({ type: [Object], required: true, default: [] })
  weapons: Weapon[];

  // @Prop({ type: Object, required: true })
  // attributes: Record<string, any>;

  @Prop({
    type: Object,
    required: true,
    default: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
  })
  attributes: Record<string, any>;

  @Prop({ required: true })
  keyAttribute: string;
}

export const KnightSchema = SchemaFactory.createForClass(Knight);
export const KNIGHT_MODEL_NAME = 'Knight'; // nome da coleção no MongoDB

// name: uma string que representa o nome da pessoa (obrigatório)
// nickname: uma string que representa o apelido da pessoa (obrigatório)
// birthday: uma data que representa a data de nascimento da pessoa (obrigatório)
// weapons: um array de strings que representa as armas que a pessoa usa (obrigatório)
// attributes: um objeto que representa os atributos da pessoa (obrigatório)
// keyAttribute: uma string que representa o atributo chave da pessoa (obrigatório)