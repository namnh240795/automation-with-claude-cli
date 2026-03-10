import { IsString, IsArray, ArrayMinSize } from 'class-validator'

export class CreatePolicyDto {
  @IsString()
  username: string

  @IsArray()
  @ArrayMinSize(3)
  @IsString({ each: true })
  policy: string[] // [sub, obj, act]
}

export class UpdatePolicyDto {
  @IsString()
  id: string

  @IsArray()
  @ArrayMinSize(3)
  @IsString({ each: true })
  policy: string[]
}

export class PolicyResponseDto {
  id: string
  username: string
  policy: string[]
  created_at: Date
  updated_at: Date
}
