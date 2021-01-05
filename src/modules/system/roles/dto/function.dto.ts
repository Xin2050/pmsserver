
import {
    IsArray,
    IsBoolean,
    IsIn,
    IsInt, IsOptional,
    Length,
    MinLength,
} from 'class-validator';

import {FunctionOperationType} from "../entities/function.entity";
import {PartialType} from "@nestjs/mapped-types";


export class CreateFunctionDto {

    @MinLength(2)
    name: string;

    @IsOptional()
    @IsInt()
    parent: number;

    @IsOptional()
    router: string;

    @IsOptional()
    icon: string;

    @IsOptional()
    orderKey: string;

    @IsOptional()
    @IsBoolean()
    directlyAccess: boolean;

    @IsOptional()
    @IsIn(Object.values(FunctionOperationType))
    operationType: string;

}

export class UpdateFunctionDto extends PartialType(CreateFunctionDto) {

    @IsBoolean()
    isActive:boolean;
}


export class SearchFunctionDto{
    @IsOptional()
    @IsInt()
    parent: number;

    @IsOptional()
    search: string;
}

export class FunctionIdsDto {
    @IsArray()
    @IsInt({each:true})
    ids:number[];
}





