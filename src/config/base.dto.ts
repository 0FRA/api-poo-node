import { IsOptional, IsUUID} from "class-validator";

export abstract class BaseDTO{
    @IsUUID()
    @IsOptional()
    id!: string;

    @IsUUID()
    @IsOptional()
    
    createdAt!: Date;
    @IsUUID()
    @IsOptional()
    updatedAt!: Date;
}