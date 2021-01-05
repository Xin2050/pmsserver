
import {
    IsArray,
    IsBoolean,
    IsInt, IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator';


export class CreateOrEditRolesDto {
    @MinLength(2)
    name: string;

    @IsOptional()
    @MaxLength(250)
    description: string;

    @IsOptional()
    @IsBoolean()
    isActive:boolean;
}

export class FetchRolesRelationsDto{
    @IsInt()
    roleId:number;
}

export class AddOrRemoveFunctionDto{
    @IsInt()
    roleId:number;

    @IsArray()
    @IsInt({each:true})
    functions:number[];
}

export class AddOrRemoveUserDto {
    @IsInt()
    roleId:number;

    @IsArray()
    @IsInt({each:true})
    userIds:number[]
}

export class SearchRolesDto {
    @IsOptional()
    name: string;

    @IsOptional()
    @IsInt()
    roleId:number;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}