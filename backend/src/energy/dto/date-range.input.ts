import { IsDateString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DateRangeInput {
    @Field()
    @IsDateString()
    startDate: string; // formato ISO (ej. 2024-01-01)

    @Field()
    @IsDateString()
    endDate: string;
}
