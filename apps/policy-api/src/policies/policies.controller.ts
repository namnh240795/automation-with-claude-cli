import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common'
import { PoliciesService } from './policies.service'
import { CreatePolicyDto, UpdatePolicyDto } from '../dto/policy.dto'

@Controller('api/policies')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get(':username')
  async getUserPolicies(@Param('username') username: string) {
    const policies = await this.policiesService.getUserPolicies(username)
    return { policies }
  }

  @Get()
  async findAll() {
    return this.policiesService.findAll()
  }

  @Post()
  async createPolicy(@Body() createPolicyDto: CreatePolicyDto) {
    return this.policiesService.createPolicy(createPolicyDto)
  }

  @Put(':id')
  async updatePolicy(@Param('id') id: string, @Body() updatePolicyDto: UpdatePolicyDto) {
    return this.policiesService.updatePolicy(id, updatePolicyDto)
  }

  @Delete(':id')
  async removePolicy(@Param('id') id: string) {
    await this.policiesService.removePolicy(id)
    return { message: 'Policy deleted successfully' }
  }
}
