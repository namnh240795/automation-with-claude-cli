import { Transform } from 'class-transformer';

/**
 * Custom decorator to transform BigInt to string in DTOs
 * Handles Keycloak database BigInt fields like created_timestamp, updated_timestamp
 */
export const TransformBigInt = () => {
  return Transform(({ value }) => {
    if (value === null || value === undefined) {
      return value;
    }
    // Handle both BigInt and string representations of BigInt
    if (typeof value === 'bigint') {
      return value.toString();
    }
    // If it's already a string (from Prisma), return as-is
    if (typeof value === 'string') {
      return value;
    }
    return value;
  });
};
