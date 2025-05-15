import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EnergyModel {
    @Field()
    datetime: string;

    @Field()
    category: string;

    @Field()
    subcategory: string;

    @Field()
    value: number;
}
