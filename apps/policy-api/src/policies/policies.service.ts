import { Injectable, NotFoundException } from '@nestjs/common'
import { CreatePolicyDto, UpdatePolicyDto, PolicyResponseDto } from '../dto/policy.dto'
import { v4 as uuidv4 } from 'uuid'

// In-memory storage for policies (in production, use a database)
interface Policy {
  id: string
  username: string
  policy: string[]
  created_at: Date
  updated_at: Date
}

@Injectable()
export class PoliciesService {
  private policies: Map<string, Policy> = new Map()

  async getUserPolicies(username: string): Promise<string[][]> {
    const userPolicies = Array.from(this.policies.values())
      .filter(policy => policy.username === username)
      .map(policy => policy.policy)

    // Add default admin policies if user is admin
    if (username === 'admin') {
      return [
        ...userPolicies,
        ['admin', '/admin', '*'],
        ['admin', '/realms', '*'],
        ['admin', '/users', '*'],
        ['admin', '/clients', '*'],
        ['admin', '/roles', '*'],
        ['admin', '/groups', '*'],
        ['admin', '/sessions', '*'],
        ['admin', '/identity-providers', '*'],
      ]
    }

    return userPolicies
  }

  async createPolicy(createPolicyDto: CreatePolicyDto): Promise<PolicyResponseDto> {
    const id = uuidv4()
    const policy: Policy = {
      id,
      username: createPolicyDto.username,
      policy: createPolicyDto.policy,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.policies.set(id, policy)

    return {
      id,
      username: policy.username,
      policy: policy.policy,
      created_at: policy.created_at,
      updated_at: policy.updated_at,
    }
  }

  async findAll(): Promise<PolicyResponseDto[]> {
    return Array.from(this.policies.values()).map(policy => ({
      id: policy.id,
      username: policy.username,
      policy: policy.policy,
      created_at: policy.created_at,
      updated_at: policy.updated_at,
    }))
  }

  async findOne(id: string): Promise<PolicyResponseDto> {
    const policy = this.policies.get(id)

    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`)
    }

    return {
      id: policy.id,
      username: policy.username,
      policy: policy.policy,
      created_at: policy.created_at,
      updated_at: policy.updated_at,
    }
  }

  async updatePolicy(id: string, updatePolicyDto: UpdatePolicyDto): Promise<PolicyResponseDto> {
    const policy = this.policies.get(id)

    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`)
    }

    const updatedPolicy: Policy = {
      ...policy,
      policy: updatePolicyDto.policy,
      updated_at: new Date(),
    }

    this.policies.set(id, updatedPolicy)

    return {
      id: updatedPolicy.id,
      username: updatedPolicy.username,
      policy: updatedPolicy.policy,
      created_at: updatedPolicy.created_at,
      updated_at: updatedPolicy.updated_at,
    }
  }

  async removePolicy(id: string): Promise<void> {
    const policy = this.policies.get(id)

    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`)
    }

    this.policies.delete(id)
  }
}
