
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model oauth_client
 * 
 */
export type oauth_client = $Result.DefaultSelection<Prisma.$oauth_clientPayload>
/**
 * Model oauth_token
 * 
 */
export type oauth_token = $Result.DefaultSelection<Prisma.$oauth_tokenPayload>
/**
 * Model refresh_token
 * 
 */
export type refresh_token = $Result.DefaultSelection<Prisma.$refresh_tokenPayload>
/**
 * Model verification_token
 * 
 */
export type verification_token = $Result.DefaultSelection<Prisma.$verification_tokenPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oauth_client`: Exposes CRUD operations for the **oauth_client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Oauth_clients
    * const oauth_clients = await prisma.oauth_client.findMany()
    * ```
    */
  get oauth_client(): Prisma.oauth_clientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oauth_token`: Exposes CRUD operations for the **oauth_token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Oauth_tokens
    * const oauth_tokens = await prisma.oauth_token.findMany()
    * ```
    */
  get oauth_token(): Prisma.oauth_tokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refresh_token`: Exposes CRUD operations for the **refresh_token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Refresh_tokens
    * const refresh_tokens = await prisma.refresh_token.findMany()
    * ```
    */
  get refresh_token(): Prisma.refresh_tokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification_token`: Exposes CRUD operations for the **verification_token** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verification_tokens
    * const verification_tokens = await prisma.verification_token.findMany()
    * ```
    */
  get verification_token(): Prisma.verification_tokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    user: 'user',
    oauth_client: 'oauth_client',
    oauth_token: 'oauth_token',
    refresh_token: 'refresh_token',
    verification_token: 'verification_token'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "oauth_client" | "oauth_token" | "refresh_token" | "verification_token"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      oauth_client: {
        payload: Prisma.$oauth_clientPayload<ExtArgs>
        fields: Prisma.oauth_clientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.oauth_clientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.oauth_clientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>
          }
          findFirst: {
            args: Prisma.oauth_clientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.oauth_clientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>
          }
          findMany: {
            args: Prisma.oauth_clientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>[]
          }
          create: {
            args: Prisma.oauth_clientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>
          }
          createMany: {
            args: Prisma.oauth_clientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.oauth_clientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>[]
          }
          delete: {
            args: Prisma.oauth_clientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>
          }
          update: {
            args: Prisma.oauth_clientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>
          }
          deleteMany: {
            args: Prisma.oauth_clientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.oauth_clientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.oauth_clientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>[]
          }
          upsert: {
            args: Prisma.oauth_clientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_clientPayload>
          }
          aggregate: {
            args: Prisma.Oauth_clientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOauth_client>
          }
          groupBy: {
            args: Prisma.oauth_clientGroupByArgs<ExtArgs>
            result: $Utils.Optional<Oauth_clientGroupByOutputType>[]
          }
          count: {
            args: Prisma.oauth_clientCountArgs<ExtArgs>
            result: $Utils.Optional<Oauth_clientCountAggregateOutputType> | number
          }
        }
      }
      oauth_token: {
        payload: Prisma.$oauth_tokenPayload<ExtArgs>
        fields: Prisma.oauth_tokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.oauth_tokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.oauth_tokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>
          }
          findFirst: {
            args: Prisma.oauth_tokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.oauth_tokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>
          }
          findMany: {
            args: Prisma.oauth_tokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>[]
          }
          create: {
            args: Prisma.oauth_tokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>
          }
          createMany: {
            args: Prisma.oauth_tokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.oauth_tokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>[]
          }
          delete: {
            args: Prisma.oauth_tokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>
          }
          update: {
            args: Prisma.oauth_tokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>
          }
          deleteMany: {
            args: Prisma.oauth_tokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.oauth_tokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.oauth_tokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>[]
          }
          upsert: {
            args: Prisma.oauth_tokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$oauth_tokenPayload>
          }
          aggregate: {
            args: Prisma.Oauth_tokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOauth_token>
          }
          groupBy: {
            args: Prisma.oauth_tokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<Oauth_tokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.oauth_tokenCountArgs<ExtArgs>
            result: $Utils.Optional<Oauth_tokenCountAggregateOutputType> | number
          }
        }
      }
      refresh_token: {
        payload: Prisma.$refresh_tokenPayload<ExtArgs>
        fields: Prisma.refresh_tokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.refresh_tokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.refresh_tokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>
          }
          findFirst: {
            args: Prisma.refresh_tokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.refresh_tokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>
          }
          findMany: {
            args: Prisma.refresh_tokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>[]
          }
          create: {
            args: Prisma.refresh_tokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>
          }
          createMany: {
            args: Prisma.refresh_tokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.refresh_tokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>[]
          }
          delete: {
            args: Prisma.refresh_tokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>
          }
          update: {
            args: Prisma.refresh_tokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>
          }
          deleteMany: {
            args: Prisma.refresh_tokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.refresh_tokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.refresh_tokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>[]
          }
          upsert: {
            args: Prisma.refresh_tokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$refresh_tokenPayload>
          }
          aggregate: {
            args: Prisma.Refresh_tokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefresh_token>
          }
          groupBy: {
            args: Prisma.refresh_tokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<Refresh_tokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.refresh_tokenCountArgs<ExtArgs>
            result: $Utils.Optional<Refresh_tokenCountAggregateOutputType> | number
          }
        }
      }
      verification_token: {
        payload: Prisma.$verification_tokenPayload<ExtArgs>
        fields: Prisma.verification_tokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.verification_tokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.verification_tokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>
          }
          findFirst: {
            args: Prisma.verification_tokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.verification_tokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>
          }
          findMany: {
            args: Prisma.verification_tokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>[]
          }
          create: {
            args: Prisma.verification_tokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>
          }
          createMany: {
            args: Prisma.verification_tokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.verification_tokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>[]
          }
          delete: {
            args: Prisma.verification_tokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>
          }
          update: {
            args: Prisma.verification_tokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>
          }
          deleteMany: {
            args: Prisma.verification_tokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.verification_tokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.verification_tokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>[]
          }
          upsert: {
            args: Prisma.verification_tokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verification_tokenPayload>
          }
          aggregate: {
            args: Prisma.Verification_tokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification_token>
          }
          groupBy: {
            args: Prisma.verification_tokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<Verification_tokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.verification_tokenCountArgs<ExtArgs>
            result: $Utils.Optional<Verification_tokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: userOmit
    oauth_client?: oauth_clientOmit
    oauth_token?: oauth_tokenOmit
    refresh_token?: refresh_tokenOmit
    verification_token?: verification_tokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    oauth_tokens: number
    refresh_tokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauth_tokens?: boolean | UserCountOutputTypeCountOauth_tokensArgs
    refresh_tokens?: boolean | UserCountOutputTypeCountRefresh_tokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauth_tokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: refresh_tokenWhereInput
  }


  /**
   * Count Type Oauth_clientCountOutputType
   */

  export type Oauth_clientCountOutputType = {
    oauth_tokens: number
  }

  export type Oauth_clientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauth_tokens?: boolean | Oauth_clientCountOutputTypeCountOauth_tokensArgs
  }

  // Custom InputTypes
  /**
   * Oauth_clientCountOutputType without action
   */
  export type Oauth_clientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Oauth_clientCountOutputType
     */
    select?: Oauth_clientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Oauth_clientCountOutputType without action
   */
  export type Oauth_clientCountOutputTypeCountOauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauth_tokenWhereInput
  }


  /**
   * Models
   */

  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    is_active: boolean | null
    email_verified: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password_hash: string | null
    first_name: string | null
    last_name: string | null
    is_active: boolean | null
    email_verified: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password_hash: number
    first_name: number
    last_name: number
    is_active: number
    email_verified: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    is_active?: true
    email_verified?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    is_active?: true
    email_verified?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password_hash?: true
    first_name?: true
    last_name?: true
    is_active?: true
    email_verified?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password_hash: string
    first_name: string | null
    last_name: string | null
    is_active: boolean
    email_verified: boolean
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    is_active?: boolean
    email_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
    oauth_tokens?: boolean | user$oauth_tokensArgs<ExtArgs>
    refresh_tokens?: boolean | user$refresh_tokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    is_active?: boolean
    email_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    is_active?: boolean
    email_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    is_active?: boolean
    email_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password_hash" | "first_name" | "last_name" | "is_active" | "email_verified" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauth_tokens?: boolean | user$oauth_tokensArgs<ExtArgs>
    refresh_tokens?: boolean | user$refresh_tokensArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type userIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type userIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      oauth_tokens: Prisma.$oauth_tokenPayload<ExtArgs>[]
      refresh_tokens: Prisma.$refresh_tokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password_hash: string
      first_name: string | null
      last_name: string | null
      is_active: boolean
      email_verified: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    oauth_tokens<T extends user$oauth_tokensArgs<ExtArgs> = {}>(args?: Subset<T, user$oauth_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refresh_tokens<T extends user$refresh_tokensArgs<ExtArgs> = {}>(args?: Subset<T, user$refresh_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly password_hash: FieldRef<"user", 'String'>
    readonly first_name: FieldRef<"user", 'String'>
    readonly last_name: FieldRef<"user", 'String'>
    readonly is_active: FieldRef<"user", 'Boolean'>
    readonly email_verified: FieldRef<"user", 'Boolean'>
    readonly created_at: FieldRef<"user", 'DateTime'>
    readonly updated_at: FieldRef<"user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.oauth_tokens
   */
  export type user$oauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    where?: oauth_tokenWhereInput
    orderBy?: oauth_tokenOrderByWithRelationInput | oauth_tokenOrderByWithRelationInput[]
    cursor?: oauth_tokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Oauth_tokenScalarFieldEnum | Oauth_tokenScalarFieldEnum[]
  }

  /**
   * user.refresh_tokens
   */
  export type user$refresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    where?: refresh_tokenWhereInput
    orderBy?: refresh_tokenOrderByWithRelationInput | refresh_tokenOrderByWithRelationInput[]
    cursor?: refresh_tokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Refresh_tokenScalarFieldEnum | Refresh_tokenScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model oauth_client
   */

  export type AggregateOauth_client = {
    _count: Oauth_clientCountAggregateOutputType | null
    _min: Oauth_clientMinAggregateOutputType | null
    _max: Oauth_clientMaxAggregateOutputType | null
  }

  export type Oauth_clientMinAggregateOutputType = {
    id: string | null
    client_id: string | null
    client_secret: string | null
    name: string | null
    redirect_uris: string | null
    scopes: string | null
    grant_types: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Oauth_clientMaxAggregateOutputType = {
    id: string | null
    client_id: string | null
    client_secret: string | null
    name: string | null
    redirect_uris: string | null
    scopes: string | null
    grant_types: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Oauth_clientCountAggregateOutputType = {
    id: number
    client_id: number
    client_secret: number
    name: number
    redirect_uris: number
    scopes: number
    grant_types: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Oauth_clientMinAggregateInputType = {
    id?: true
    client_id?: true
    client_secret?: true
    name?: true
    redirect_uris?: true
    scopes?: true
    grant_types?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Oauth_clientMaxAggregateInputType = {
    id?: true
    client_id?: true
    client_secret?: true
    name?: true
    redirect_uris?: true
    scopes?: true
    grant_types?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type Oauth_clientCountAggregateInputType = {
    id?: true
    client_id?: true
    client_secret?: true
    name?: true
    redirect_uris?: true
    scopes?: true
    grant_types?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Oauth_clientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauth_client to aggregate.
     */
    where?: oauth_clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_clients to fetch.
     */
    orderBy?: oauth_clientOrderByWithRelationInput | oauth_clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: oauth_clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned oauth_clients
    **/
    _count?: true | Oauth_clientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Oauth_clientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Oauth_clientMaxAggregateInputType
  }

  export type GetOauth_clientAggregateType<T extends Oauth_clientAggregateArgs> = {
        [P in keyof T & keyof AggregateOauth_client]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOauth_client[P]>
      : GetScalarType<T[P], AggregateOauth_client[P]>
  }




  export type oauth_clientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauth_clientWhereInput
    orderBy?: oauth_clientOrderByWithAggregationInput | oauth_clientOrderByWithAggregationInput[]
    by: Oauth_clientScalarFieldEnum[] | Oauth_clientScalarFieldEnum
    having?: oauth_clientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Oauth_clientCountAggregateInputType | true
    _min?: Oauth_clientMinAggregateInputType
    _max?: Oauth_clientMaxAggregateInputType
  }

  export type Oauth_clientGroupByOutputType = {
    id: string
    client_id: string
    client_secret: string
    name: string
    redirect_uris: string
    scopes: string
    grant_types: string
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: Oauth_clientCountAggregateOutputType | null
    _min: Oauth_clientMinAggregateOutputType | null
    _max: Oauth_clientMaxAggregateOutputType | null
  }

  type GetOauth_clientGroupByPayload<T extends oauth_clientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Oauth_clientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Oauth_clientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Oauth_clientGroupByOutputType[P]>
            : GetScalarType<T[P], Oauth_clientGroupByOutputType[P]>
        }
      >
    >


  export type oauth_clientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    name?: boolean
    redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    oauth_tokens?: boolean | oauth_client$oauth_tokensArgs<ExtArgs>
    _count?: boolean | Oauth_clientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauth_client"]>

  export type oauth_clientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    name?: boolean
    redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["oauth_client"]>

  export type oauth_clientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    name?: boolean
    redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["oauth_client"]>

  export type oauth_clientSelectScalar = {
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    name?: boolean
    redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type oauth_clientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "client_id" | "client_secret" | "name" | "redirect_uris" | "scopes" | "grant_types" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["oauth_client"]>
  export type oauth_clientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    oauth_tokens?: boolean | oauth_client$oauth_tokensArgs<ExtArgs>
    _count?: boolean | Oauth_clientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type oauth_clientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type oauth_clientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $oauth_clientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "oauth_client"
    objects: {
      oauth_tokens: Prisma.$oauth_tokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      client_id: string
      client_secret: string
      name: string
      redirect_uris: string
      scopes: string
      grant_types: string
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["oauth_client"]>
    composites: {}
  }

  type oauth_clientGetPayload<S extends boolean | null | undefined | oauth_clientDefaultArgs> = $Result.GetResult<Prisma.$oauth_clientPayload, S>

  type oauth_clientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<oauth_clientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Oauth_clientCountAggregateInputType | true
    }

  export interface oauth_clientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['oauth_client'], meta: { name: 'oauth_client' } }
    /**
     * Find zero or one Oauth_client that matches the filter.
     * @param {oauth_clientFindUniqueArgs} args - Arguments to find a Oauth_client
     * @example
     * // Get one Oauth_client
     * const oauth_client = await prisma.oauth_client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends oauth_clientFindUniqueArgs>(args: SelectSubset<T, oauth_clientFindUniqueArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Oauth_client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {oauth_clientFindUniqueOrThrowArgs} args - Arguments to find a Oauth_client
     * @example
     * // Get one Oauth_client
     * const oauth_client = await prisma.oauth_client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends oauth_clientFindUniqueOrThrowArgs>(args: SelectSubset<T, oauth_clientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oauth_client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_clientFindFirstArgs} args - Arguments to find a Oauth_client
     * @example
     * // Get one Oauth_client
     * const oauth_client = await prisma.oauth_client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends oauth_clientFindFirstArgs>(args?: SelectSubset<T, oauth_clientFindFirstArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oauth_client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_clientFindFirstOrThrowArgs} args - Arguments to find a Oauth_client
     * @example
     * // Get one Oauth_client
     * const oauth_client = await prisma.oauth_client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends oauth_clientFindFirstOrThrowArgs>(args?: SelectSubset<T, oauth_clientFindFirstOrThrowArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Oauth_clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_clientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Oauth_clients
     * const oauth_clients = await prisma.oauth_client.findMany()
     * 
     * // Get first 10 Oauth_clients
     * const oauth_clients = await prisma.oauth_client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oauth_clientWithIdOnly = await prisma.oauth_client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends oauth_clientFindManyArgs>(args?: SelectSubset<T, oauth_clientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Oauth_client.
     * @param {oauth_clientCreateArgs} args - Arguments to create a Oauth_client.
     * @example
     * // Create one Oauth_client
     * const Oauth_client = await prisma.oauth_client.create({
     *   data: {
     *     // ... data to create a Oauth_client
     *   }
     * })
     * 
     */
    create<T extends oauth_clientCreateArgs>(args: SelectSubset<T, oauth_clientCreateArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Oauth_clients.
     * @param {oauth_clientCreateManyArgs} args - Arguments to create many Oauth_clients.
     * @example
     * // Create many Oauth_clients
     * const oauth_client = await prisma.oauth_client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends oauth_clientCreateManyArgs>(args?: SelectSubset<T, oauth_clientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Oauth_clients and returns the data saved in the database.
     * @param {oauth_clientCreateManyAndReturnArgs} args - Arguments to create many Oauth_clients.
     * @example
     * // Create many Oauth_clients
     * const oauth_client = await prisma.oauth_client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Oauth_clients and only return the `id`
     * const oauth_clientWithIdOnly = await prisma.oauth_client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends oauth_clientCreateManyAndReturnArgs>(args?: SelectSubset<T, oauth_clientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Oauth_client.
     * @param {oauth_clientDeleteArgs} args - Arguments to delete one Oauth_client.
     * @example
     * // Delete one Oauth_client
     * const Oauth_client = await prisma.oauth_client.delete({
     *   where: {
     *     // ... filter to delete one Oauth_client
     *   }
     * })
     * 
     */
    delete<T extends oauth_clientDeleteArgs>(args: SelectSubset<T, oauth_clientDeleteArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Oauth_client.
     * @param {oauth_clientUpdateArgs} args - Arguments to update one Oauth_client.
     * @example
     * // Update one Oauth_client
     * const oauth_client = await prisma.oauth_client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends oauth_clientUpdateArgs>(args: SelectSubset<T, oauth_clientUpdateArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Oauth_clients.
     * @param {oauth_clientDeleteManyArgs} args - Arguments to filter Oauth_clients to delete.
     * @example
     * // Delete a few Oauth_clients
     * const { count } = await prisma.oauth_client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends oauth_clientDeleteManyArgs>(args?: SelectSubset<T, oauth_clientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Oauth_clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_clientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Oauth_clients
     * const oauth_client = await prisma.oauth_client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends oauth_clientUpdateManyArgs>(args: SelectSubset<T, oauth_clientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Oauth_clients and returns the data updated in the database.
     * @param {oauth_clientUpdateManyAndReturnArgs} args - Arguments to update many Oauth_clients.
     * @example
     * // Update many Oauth_clients
     * const oauth_client = await prisma.oauth_client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Oauth_clients and only return the `id`
     * const oauth_clientWithIdOnly = await prisma.oauth_client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends oauth_clientUpdateManyAndReturnArgs>(args: SelectSubset<T, oauth_clientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Oauth_client.
     * @param {oauth_clientUpsertArgs} args - Arguments to update or create a Oauth_client.
     * @example
     * // Update or create a Oauth_client
     * const oauth_client = await prisma.oauth_client.upsert({
     *   create: {
     *     // ... data to create a Oauth_client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Oauth_client we want to update
     *   }
     * })
     */
    upsert<T extends oauth_clientUpsertArgs>(args: SelectSubset<T, oauth_clientUpsertArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Oauth_clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_clientCountArgs} args - Arguments to filter Oauth_clients to count.
     * @example
     * // Count the number of Oauth_clients
     * const count = await prisma.oauth_client.count({
     *   where: {
     *     // ... the filter for the Oauth_clients we want to count
     *   }
     * })
    **/
    count<T extends oauth_clientCountArgs>(
      args?: Subset<T, oauth_clientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Oauth_clientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Oauth_client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth_clientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Oauth_clientAggregateArgs>(args: Subset<T, Oauth_clientAggregateArgs>): Prisma.PrismaPromise<GetOauth_clientAggregateType<T>>

    /**
     * Group by Oauth_client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_clientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends oauth_clientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: oauth_clientGroupByArgs['orderBy'] }
        : { orderBy?: oauth_clientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, oauth_clientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauth_clientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the oauth_client model
   */
  readonly fields: oauth_clientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for oauth_client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__oauth_clientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    oauth_tokens<T extends oauth_client$oauth_tokensArgs<ExtArgs> = {}>(args?: Subset<T, oauth_client$oauth_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the oauth_client model
   */
  interface oauth_clientFieldRefs {
    readonly id: FieldRef<"oauth_client", 'String'>
    readonly client_id: FieldRef<"oauth_client", 'String'>
    readonly client_secret: FieldRef<"oauth_client", 'String'>
    readonly name: FieldRef<"oauth_client", 'String'>
    readonly redirect_uris: FieldRef<"oauth_client", 'String'>
    readonly scopes: FieldRef<"oauth_client", 'String'>
    readonly grant_types: FieldRef<"oauth_client", 'String'>
    readonly is_active: FieldRef<"oauth_client", 'Boolean'>
    readonly created_at: FieldRef<"oauth_client", 'DateTime'>
    readonly updated_at: FieldRef<"oauth_client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * oauth_client findUnique
   */
  export type oauth_clientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * Filter, which oauth_client to fetch.
     */
    where: oauth_clientWhereUniqueInput
  }

  /**
   * oauth_client findUniqueOrThrow
   */
  export type oauth_clientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * Filter, which oauth_client to fetch.
     */
    where: oauth_clientWhereUniqueInput
  }

  /**
   * oauth_client findFirst
   */
  export type oauth_clientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * Filter, which oauth_client to fetch.
     */
    where?: oauth_clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_clients to fetch.
     */
    orderBy?: oauth_clientOrderByWithRelationInput | oauth_clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauth_clients.
     */
    cursor?: oauth_clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauth_clients.
     */
    distinct?: Oauth_clientScalarFieldEnum | Oauth_clientScalarFieldEnum[]
  }

  /**
   * oauth_client findFirstOrThrow
   */
  export type oauth_clientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * Filter, which oauth_client to fetch.
     */
    where?: oauth_clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_clients to fetch.
     */
    orderBy?: oauth_clientOrderByWithRelationInput | oauth_clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauth_clients.
     */
    cursor?: oauth_clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauth_clients.
     */
    distinct?: Oauth_clientScalarFieldEnum | Oauth_clientScalarFieldEnum[]
  }

  /**
   * oauth_client findMany
   */
  export type oauth_clientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * Filter, which oauth_clients to fetch.
     */
    where?: oauth_clientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_clients to fetch.
     */
    orderBy?: oauth_clientOrderByWithRelationInput | oauth_clientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing oauth_clients.
     */
    cursor?: oauth_clientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_clients.
     */
    skip?: number
    distinct?: Oauth_clientScalarFieldEnum | Oauth_clientScalarFieldEnum[]
  }

  /**
   * oauth_client create
   */
  export type oauth_clientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * The data needed to create a oauth_client.
     */
    data: XOR<oauth_clientCreateInput, oauth_clientUncheckedCreateInput>
  }

  /**
   * oauth_client createMany
   */
  export type oauth_clientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many oauth_clients.
     */
    data: oauth_clientCreateManyInput | oauth_clientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * oauth_client createManyAndReturn
   */
  export type oauth_clientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * The data used to create many oauth_clients.
     */
    data: oauth_clientCreateManyInput | oauth_clientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * oauth_client update
   */
  export type oauth_clientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * The data needed to update a oauth_client.
     */
    data: XOR<oauth_clientUpdateInput, oauth_clientUncheckedUpdateInput>
    /**
     * Choose, which oauth_client to update.
     */
    where: oauth_clientWhereUniqueInput
  }

  /**
   * oauth_client updateMany
   */
  export type oauth_clientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update oauth_clients.
     */
    data: XOR<oauth_clientUpdateManyMutationInput, oauth_clientUncheckedUpdateManyInput>
    /**
     * Filter which oauth_clients to update
     */
    where?: oauth_clientWhereInput
    /**
     * Limit how many oauth_clients to update.
     */
    limit?: number
  }

  /**
   * oauth_client updateManyAndReturn
   */
  export type oauth_clientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * The data used to update oauth_clients.
     */
    data: XOR<oauth_clientUpdateManyMutationInput, oauth_clientUncheckedUpdateManyInput>
    /**
     * Filter which oauth_clients to update
     */
    where?: oauth_clientWhereInput
    /**
     * Limit how many oauth_clients to update.
     */
    limit?: number
  }

  /**
   * oauth_client upsert
   */
  export type oauth_clientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * The filter to search for the oauth_client to update in case it exists.
     */
    where: oauth_clientWhereUniqueInput
    /**
     * In case the oauth_client found by the `where` argument doesn't exist, create a new oauth_client with this data.
     */
    create: XOR<oauth_clientCreateInput, oauth_clientUncheckedCreateInput>
    /**
     * In case the oauth_client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<oauth_clientUpdateInput, oauth_clientUncheckedUpdateInput>
  }

  /**
   * oauth_client delete
   */
  export type oauth_clientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
    /**
     * Filter which oauth_client to delete.
     */
    where: oauth_clientWhereUniqueInput
  }

  /**
   * oauth_client deleteMany
   */
  export type oauth_clientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauth_clients to delete
     */
    where?: oauth_clientWhereInput
    /**
     * Limit how many oauth_clients to delete.
     */
    limit?: number
  }

  /**
   * oauth_client.oauth_tokens
   */
  export type oauth_client$oauth_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    where?: oauth_tokenWhereInput
    orderBy?: oauth_tokenOrderByWithRelationInput | oauth_tokenOrderByWithRelationInput[]
    cursor?: oauth_tokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Oauth_tokenScalarFieldEnum | Oauth_tokenScalarFieldEnum[]
  }

  /**
   * oauth_client without action
   */
  export type oauth_clientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_client
     */
    select?: oauth_clientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_client
     */
    omit?: oauth_clientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_clientInclude<ExtArgs> | null
  }


  /**
   * Model oauth_token
   */

  export type AggregateOauth_token = {
    _count: Oauth_tokenCountAggregateOutputType | null
    _min: Oauth_tokenMinAggregateOutputType | null
    _max: Oauth_tokenMaxAggregateOutputType | null
  }

  export type Oauth_tokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    client_id: string | null
    scope: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type Oauth_tokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    client_id: string | null
    scope: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type Oauth_tokenCountAggregateOutputType = {
    id: number
    token: number
    user_id: number
    client_id: number
    scope: number
    expires_at: number
    created_at: number
    _all: number
  }


  export type Oauth_tokenMinAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    client_id?: true
    scope?: true
    expires_at?: true
    created_at?: true
  }

  export type Oauth_tokenMaxAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    client_id?: true
    scope?: true
    expires_at?: true
    created_at?: true
  }

  export type Oauth_tokenCountAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    client_id?: true
    scope?: true
    expires_at?: true
    created_at?: true
    _all?: true
  }

  export type Oauth_tokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauth_token to aggregate.
     */
    where?: oauth_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_tokens to fetch.
     */
    orderBy?: oauth_tokenOrderByWithRelationInput | oauth_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: oauth_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned oauth_tokens
    **/
    _count?: true | Oauth_tokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Oauth_tokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Oauth_tokenMaxAggregateInputType
  }

  export type GetOauth_tokenAggregateType<T extends Oauth_tokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOauth_token]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOauth_token[P]>
      : GetScalarType<T[P], AggregateOauth_token[P]>
  }




  export type oauth_tokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: oauth_tokenWhereInput
    orderBy?: oauth_tokenOrderByWithAggregationInput | oauth_tokenOrderByWithAggregationInput[]
    by: Oauth_tokenScalarFieldEnum[] | Oauth_tokenScalarFieldEnum
    having?: oauth_tokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Oauth_tokenCountAggregateInputType | true
    _min?: Oauth_tokenMinAggregateInputType
    _max?: Oauth_tokenMaxAggregateInputType
  }

  export type Oauth_tokenGroupByOutputType = {
    id: string
    token: string
    user_id: string
    client_id: string
    scope: string | null
    expires_at: Date | null
    created_at: Date
    _count: Oauth_tokenCountAggregateOutputType | null
    _min: Oauth_tokenMinAggregateOutputType | null
    _max: Oauth_tokenMaxAggregateOutputType | null
  }

  type GetOauth_tokenGroupByPayload<T extends oauth_tokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Oauth_tokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Oauth_tokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Oauth_tokenGroupByOutputType[P]>
            : GetScalarType<T[P], Oauth_tokenGroupByOutputType[P]>
        }
      >
    >


  export type oauth_tokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    client_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    client?: boolean | oauth_clientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauth_token"]>

  export type oauth_tokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    client_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    client?: boolean | oauth_clientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauth_token"]>

  export type oauth_tokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    client_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    client?: boolean | oauth_clientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oauth_token"]>

  export type oauth_tokenSelectScalar = {
    id?: boolean
    token?: boolean
    user_id?: boolean
    client_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
  }

  export type oauth_tokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "user_id" | "client_id" | "scope" | "expires_at" | "created_at", ExtArgs["result"]["oauth_token"]>
  export type oauth_tokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    client?: boolean | oauth_clientDefaultArgs<ExtArgs>
  }
  export type oauth_tokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    client?: boolean | oauth_clientDefaultArgs<ExtArgs>
  }
  export type oauth_tokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    client?: boolean | oauth_clientDefaultArgs<ExtArgs>
  }

  export type $oauth_tokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "oauth_token"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      client: Prisma.$oauth_clientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      user_id: string
      client_id: string
      scope: string | null
      expires_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["oauth_token"]>
    composites: {}
  }

  type oauth_tokenGetPayload<S extends boolean | null | undefined | oauth_tokenDefaultArgs> = $Result.GetResult<Prisma.$oauth_tokenPayload, S>

  type oauth_tokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<oauth_tokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Oauth_tokenCountAggregateInputType | true
    }

  export interface oauth_tokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['oauth_token'], meta: { name: 'oauth_token' } }
    /**
     * Find zero or one Oauth_token that matches the filter.
     * @param {oauth_tokenFindUniqueArgs} args - Arguments to find a Oauth_token
     * @example
     * // Get one Oauth_token
     * const oauth_token = await prisma.oauth_token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends oauth_tokenFindUniqueArgs>(args: SelectSubset<T, oauth_tokenFindUniqueArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Oauth_token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {oauth_tokenFindUniqueOrThrowArgs} args - Arguments to find a Oauth_token
     * @example
     * // Get one Oauth_token
     * const oauth_token = await prisma.oauth_token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends oauth_tokenFindUniqueOrThrowArgs>(args: SelectSubset<T, oauth_tokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oauth_token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_tokenFindFirstArgs} args - Arguments to find a Oauth_token
     * @example
     * // Get one Oauth_token
     * const oauth_token = await prisma.oauth_token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends oauth_tokenFindFirstArgs>(args?: SelectSubset<T, oauth_tokenFindFirstArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Oauth_token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_tokenFindFirstOrThrowArgs} args - Arguments to find a Oauth_token
     * @example
     * // Get one Oauth_token
     * const oauth_token = await prisma.oauth_token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends oauth_tokenFindFirstOrThrowArgs>(args?: SelectSubset<T, oauth_tokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Oauth_tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_tokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Oauth_tokens
     * const oauth_tokens = await prisma.oauth_token.findMany()
     * 
     * // Get first 10 Oauth_tokens
     * const oauth_tokens = await prisma.oauth_token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oauth_tokenWithIdOnly = await prisma.oauth_token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends oauth_tokenFindManyArgs>(args?: SelectSubset<T, oauth_tokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Oauth_token.
     * @param {oauth_tokenCreateArgs} args - Arguments to create a Oauth_token.
     * @example
     * // Create one Oauth_token
     * const Oauth_token = await prisma.oauth_token.create({
     *   data: {
     *     // ... data to create a Oauth_token
     *   }
     * })
     * 
     */
    create<T extends oauth_tokenCreateArgs>(args: SelectSubset<T, oauth_tokenCreateArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Oauth_tokens.
     * @param {oauth_tokenCreateManyArgs} args - Arguments to create many Oauth_tokens.
     * @example
     * // Create many Oauth_tokens
     * const oauth_token = await prisma.oauth_token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends oauth_tokenCreateManyArgs>(args?: SelectSubset<T, oauth_tokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Oauth_tokens and returns the data saved in the database.
     * @param {oauth_tokenCreateManyAndReturnArgs} args - Arguments to create many Oauth_tokens.
     * @example
     * // Create many Oauth_tokens
     * const oauth_token = await prisma.oauth_token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Oauth_tokens and only return the `id`
     * const oauth_tokenWithIdOnly = await prisma.oauth_token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends oauth_tokenCreateManyAndReturnArgs>(args?: SelectSubset<T, oauth_tokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Oauth_token.
     * @param {oauth_tokenDeleteArgs} args - Arguments to delete one Oauth_token.
     * @example
     * // Delete one Oauth_token
     * const Oauth_token = await prisma.oauth_token.delete({
     *   where: {
     *     // ... filter to delete one Oauth_token
     *   }
     * })
     * 
     */
    delete<T extends oauth_tokenDeleteArgs>(args: SelectSubset<T, oauth_tokenDeleteArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Oauth_token.
     * @param {oauth_tokenUpdateArgs} args - Arguments to update one Oauth_token.
     * @example
     * // Update one Oauth_token
     * const oauth_token = await prisma.oauth_token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends oauth_tokenUpdateArgs>(args: SelectSubset<T, oauth_tokenUpdateArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Oauth_tokens.
     * @param {oauth_tokenDeleteManyArgs} args - Arguments to filter Oauth_tokens to delete.
     * @example
     * // Delete a few Oauth_tokens
     * const { count } = await prisma.oauth_token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends oauth_tokenDeleteManyArgs>(args?: SelectSubset<T, oauth_tokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Oauth_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_tokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Oauth_tokens
     * const oauth_token = await prisma.oauth_token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends oauth_tokenUpdateManyArgs>(args: SelectSubset<T, oauth_tokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Oauth_tokens and returns the data updated in the database.
     * @param {oauth_tokenUpdateManyAndReturnArgs} args - Arguments to update many Oauth_tokens.
     * @example
     * // Update many Oauth_tokens
     * const oauth_token = await prisma.oauth_token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Oauth_tokens and only return the `id`
     * const oauth_tokenWithIdOnly = await prisma.oauth_token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends oauth_tokenUpdateManyAndReturnArgs>(args: SelectSubset<T, oauth_tokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Oauth_token.
     * @param {oauth_tokenUpsertArgs} args - Arguments to update or create a Oauth_token.
     * @example
     * // Update or create a Oauth_token
     * const oauth_token = await prisma.oauth_token.upsert({
     *   create: {
     *     // ... data to create a Oauth_token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Oauth_token we want to update
     *   }
     * })
     */
    upsert<T extends oauth_tokenUpsertArgs>(args: SelectSubset<T, oauth_tokenUpsertArgs<ExtArgs>>): Prisma__oauth_tokenClient<$Result.GetResult<Prisma.$oauth_tokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Oauth_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_tokenCountArgs} args - Arguments to filter Oauth_tokens to count.
     * @example
     * // Count the number of Oauth_tokens
     * const count = await prisma.oauth_token.count({
     *   where: {
     *     // ... the filter for the Oauth_tokens we want to count
     *   }
     * })
    **/
    count<T extends oauth_tokenCountArgs>(
      args?: Subset<T, oauth_tokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Oauth_tokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Oauth_token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Oauth_tokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Oauth_tokenAggregateArgs>(args: Subset<T, Oauth_tokenAggregateArgs>): Prisma.PrismaPromise<GetOauth_tokenAggregateType<T>>

    /**
     * Group by Oauth_token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {oauth_tokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends oauth_tokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: oauth_tokenGroupByArgs['orderBy'] }
        : { orderBy?: oauth_tokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, oauth_tokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOauth_tokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the oauth_token model
   */
  readonly fields: oauth_tokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for oauth_token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__oauth_tokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    client<T extends oauth_clientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, oauth_clientDefaultArgs<ExtArgs>>): Prisma__oauth_clientClient<$Result.GetResult<Prisma.$oauth_clientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the oauth_token model
   */
  interface oauth_tokenFieldRefs {
    readonly id: FieldRef<"oauth_token", 'String'>
    readonly token: FieldRef<"oauth_token", 'String'>
    readonly user_id: FieldRef<"oauth_token", 'String'>
    readonly client_id: FieldRef<"oauth_token", 'String'>
    readonly scope: FieldRef<"oauth_token", 'String'>
    readonly expires_at: FieldRef<"oauth_token", 'DateTime'>
    readonly created_at: FieldRef<"oauth_token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * oauth_token findUnique
   */
  export type oauth_tokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * Filter, which oauth_token to fetch.
     */
    where: oauth_tokenWhereUniqueInput
  }

  /**
   * oauth_token findUniqueOrThrow
   */
  export type oauth_tokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * Filter, which oauth_token to fetch.
     */
    where: oauth_tokenWhereUniqueInput
  }

  /**
   * oauth_token findFirst
   */
  export type oauth_tokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * Filter, which oauth_token to fetch.
     */
    where?: oauth_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_tokens to fetch.
     */
    orderBy?: oauth_tokenOrderByWithRelationInput | oauth_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauth_tokens.
     */
    cursor?: oauth_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauth_tokens.
     */
    distinct?: Oauth_tokenScalarFieldEnum | Oauth_tokenScalarFieldEnum[]
  }

  /**
   * oauth_token findFirstOrThrow
   */
  export type oauth_tokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * Filter, which oauth_token to fetch.
     */
    where?: oauth_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_tokens to fetch.
     */
    orderBy?: oauth_tokenOrderByWithRelationInput | oauth_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for oauth_tokens.
     */
    cursor?: oauth_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of oauth_tokens.
     */
    distinct?: Oauth_tokenScalarFieldEnum | Oauth_tokenScalarFieldEnum[]
  }

  /**
   * oauth_token findMany
   */
  export type oauth_tokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * Filter, which oauth_tokens to fetch.
     */
    where?: oauth_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of oauth_tokens to fetch.
     */
    orderBy?: oauth_tokenOrderByWithRelationInput | oauth_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing oauth_tokens.
     */
    cursor?: oauth_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` oauth_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` oauth_tokens.
     */
    skip?: number
    distinct?: Oauth_tokenScalarFieldEnum | Oauth_tokenScalarFieldEnum[]
  }

  /**
   * oauth_token create
   */
  export type oauth_tokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * The data needed to create a oauth_token.
     */
    data: XOR<oauth_tokenCreateInput, oauth_tokenUncheckedCreateInput>
  }

  /**
   * oauth_token createMany
   */
  export type oauth_tokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many oauth_tokens.
     */
    data: oauth_tokenCreateManyInput | oauth_tokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * oauth_token createManyAndReturn
   */
  export type oauth_tokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * The data used to create many oauth_tokens.
     */
    data: oauth_tokenCreateManyInput | oauth_tokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauth_token update
   */
  export type oauth_tokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * The data needed to update a oauth_token.
     */
    data: XOR<oauth_tokenUpdateInput, oauth_tokenUncheckedUpdateInput>
    /**
     * Choose, which oauth_token to update.
     */
    where: oauth_tokenWhereUniqueInput
  }

  /**
   * oauth_token updateMany
   */
  export type oauth_tokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update oauth_tokens.
     */
    data: XOR<oauth_tokenUpdateManyMutationInput, oauth_tokenUncheckedUpdateManyInput>
    /**
     * Filter which oauth_tokens to update
     */
    where?: oauth_tokenWhereInput
    /**
     * Limit how many oauth_tokens to update.
     */
    limit?: number
  }

  /**
   * oauth_token updateManyAndReturn
   */
  export type oauth_tokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * The data used to update oauth_tokens.
     */
    data: XOR<oauth_tokenUpdateManyMutationInput, oauth_tokenUncheckedUpdateManyInput>
    /**
     * Filter which oauth_tokens to update
     */
    where?: oauth_tokenWhereInput
    /**
     * Limit how many oauth_tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * oauth_token upsert
   */
  export type oauth_tokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * The filter to search for the oauth_token to update in case it exists.
     */
    where: oauth_tokenWhereUniqueInput
    /**
     * In case the oauth_token found by the `where` argument doesn't exist, create a new oauth_token with this data.
     */
    create: XOR<oauth_tokenCreateInput, oauth_tokenUncheckedCreateInput>
    /**
     * In case the oauth_token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<oauth_tokenUpdateInput, oauth_tokenUncheckedUpdateInput>
  }

  /**
   * oauth_token delete
   */
  export type oauth_tokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
    /**
     * Filter which oauth_token to delete.
     */
    where: oauth_tokenWhereUniqueInput
  }

  /**
   * oauth_token deleteMany
   */
  export type oauth_tokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which oauth_tokens to delete
     */
    where?: oauth_tokenWhereInput
    /**
     * Limit how many oauth_tokens to delete.
     */
    limit?: number
  }

  /**
   * oauth_token without action
   */
  export type oauth_tokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the oauth_token
     */
    select?: oauth_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the oauth_token
     */
    omit?: oauth_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: oauth_tokenInclude<ExtArgs> | null
  }


  /**
   * Model refresh_token
   */

  export type AggregateRefresh_token = {
    _count: Refresh_tokenCountAggregateOutputType | null
    _min: Refresh_tokenMinAggregateOutputType | null
    _max: Refresh_tokenMaxAggregateOutputType | null
  }

  export type Refresh_tokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    expires_at: Date | null
    revoked_at: Date | null
    created_at: Date | null
  }

  export type Refresh_tokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    expires_at: Date | null
    revoked_at: Date | null
    created_at: Date | null
  }

  export type Refresh_tokenCountAggregateOutputType = {
    id: number
    token: number
    user_id: number
    expires_at: number
    revoked_at: number
    created_at: number
    _all: number
  }


  export type Refresh_tokenMinAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
  }

  export type Refresh_tokenMaxAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
  }

  export type Refresh_tokenCountAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
    _all?: true
  }

  export type Refresh_tokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which refresh_token to aggregate.
     */
    where?: refresh_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokenOrderByWithRelationInput | refresh_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: refresh_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned refresh_tokens
    **/
    _count?: true | Refresh_tokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Refresh_tokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Refresh_tokenMaxAggregateInputType
  }

  export type GetRefresh_tokenAggregateType<T extends Refresh_tokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefresh_token]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefresh_token[P]>
      : GetScalarType<T[P], AggregateRefresh_token[P]>
  }




  export type refresh_tokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: refresh_tokenWhereInput
    orderBy?: refresh_tokenOrderByWithAggregationInput | refresh_tokenOrderByWithAggregationInput[]
    by: Refresh_tokenScalarFieldEnum[] | Refresh_tokenScalarFieldEnum
    having?: refresh_tokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Refresh_tokenCountAggregateInputType | true
    _min?: Refresh_tokenMinAggregateInputType
    _max?: Refresh_tokenMaxAggregateInputType
  }

  export type Refresh_tokenGroupByOutputType = {
    id: string
    token: string
    user_id: string
    expires_at: Date
    revoked_at: Date | null
    created_at: Date
    _count: Refresh_tokenCountAggregateOutputType | null
    _min: Refresh_tokenMinAggregateOutputType | null
    _max: Refresh_tokenMaxAggregateOutputType | null
  }

  type GetRefresh_tokenGroupByPayload<T extends refresh_tokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Refresh_tokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Refresh_tokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Refresh_tokenGroupByOutputType[P]>
            : GetScalarType<T[P], Refresh_tokenGroupByOutputType[P]>
        }
      >
    >


  export type refresh_tokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refresh_token"]>

  export type refresh_tokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refresh_token"]>

  export type refresh_tokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refresh_token"]>

  export type refresh_tokenSelectScalar = {
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
  }

  export type refresh_tokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "user_id" | "expires_at" | "revoked_at" | "created_at", ExtArgs["result"]["refresh_token"]>
  export type refresh_tokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type refresh_tokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }
  export type refresh_tokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $refresh_tokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "refresh_token"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      user_id: string
      expires_at: Date
      revoked_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["refresh_token"]>
    composites: {}
  }

  type refresh_tokenGetPayload<S extends boolean | null | undefined | refresh_tokenDefaultArgs> = $Result.GetResult<Prisma.$refresh_tokenPayload, S>

  type refresh_tokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<refresh_tokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Refresh_tokenCountAggregateInputType | true
    }

  export interface refresh_tokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['refresh_token'], meta: { name: 'refresh_token' } }
    /**
     * Find zero or one Refresh_token that matches the filter.
     * @param {refresh_tokenFindUniqueArgs} args - Arguments to find a Refresh_token
     * @example
     * // Get one Refresh_token
     * const refresh_token = await prisma.refresh_token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends refresh_tokenFindUniqueArgs>(args: SelectSubset<T, refresh_tokenFindUniqueArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Refresh_token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {refresh_tokenFindUniqueOrThrowArgs} args - Arguments to find a Refresh_token
     * @example
     * // Get one Refresh_token
     * const refresh_token = await prisma.refresh_token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends refresh_tokenFindUniqueOrThrowArgs>(args: SelectSubset<T, refresh_tokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refresh_token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokenFindFirstArgs} args - Arguments to find a Refresh_token
     * @example
     * // Get one Refresh_token
     * const refresh_token = await prisma.refresh_token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends refresh_tokenFindFirstArgs>(args?: SelectSubset<T, refresh_tokenFindFirstArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refresh_token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokenFindFirstOrThrowArgs} args - Arguments to find a Refresh_token
     * @example
     * // Get one Refresh_token
     * const refresh_token = await prisma.refresh_token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends refresh_tokenFindFirstOrThrowArgs>(args?: SelectSubset<T, refresh_tokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Refresh_tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Refresh_tokens
     * const refresh_tokens = await prisma.refresh_token.findMany()
     * 
     * // Get first 10 Refresh_tokens
     * const refresh_tokens = await prisma.refresh_token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refresh_tokenWithIdOnly = await prisma.refresh_token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends refresh_tokenFindManyArgs>(args?: SelectSubset<T, refresh_tokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Refresh_token.
     * @param {refresh_tokenCreateArgs} args - Arguments to create a Refresh_token.
     * @example
     * // Create one Refresh_token
     * const Refresh_token = await prisma.refresh_token.create({
     *   data: {
     *     // ... data to create a Refresh_token
     *   }
     * })
     * 
     */
    create<T extends refresh_tokenCreateArgs>(args: SelectSubset<T, refresh_tokenCreateArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Refresh_tokens.
     * @param {refresh_tokenCreateManyArgs} args - Arguments to create many Refresh_tokens.
     * @example
     * // Create many Refresh_tokens
     * const refresh_token = await prisma.refresh_token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends refresh_tokenCreateManyArgs>(args?: SelectSubset<T, refresh_tokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Refresh_tokens and returns the data saved in the database.
     * @param {refresh_tokenCreateManyAndReturnArgs} args - Arguments to create many Refresh_tokens.
     * @example
     * // Create many Refresh_tokens
     * const refresh_token = await prisma.refresh_token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Refresh_tokens and only return the `id`
     * const refresh_tokenWithIdOnly = await prisma.refresh_token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends refresh_tokenCreateManyAndReturnArgs>(args?: SelectSubset<T, refresh_tokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Refresh_token.
     * @param {refresh_tokenDeleteArgs} args - Arguments to delete one Refresh_token.
     * @example
     * // Delete one Refresh_token
     * const Refresh_token = await prisma.refresh_token.delete({
     *   where: {
     *     // ... filter to delete one Refresh_token
     *   }
     * })
     * 
     */
    delete<T extends refresh_tokenDeleteArgs>(args: SelectSubset<T, refresh_tokenDeleteArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Refresh_token.
     * @param {refresh_tokenUpdateArgs} args - Arguments to update one Refresh_token.
     * @example
     * // Update one Refresh_token
     * const refresh_token = await prisma.refresh_token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends refresh_tokenUpdateArgs>(args: SelectSubset<T, refresh_tokenUpdateArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Refresh_tokens.
     * @param {refresh_tokenDeleteManyArgs} args - Arguments to filter Refresh_tokens to delete.
     * @example
     * // Delete a few Refresh_tokens
     * const { count } = await prisma.refresh_token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends refresh_tokenDeleteManyArgs>(args?: SelectSubset<T, refresh_tokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refresh_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Refresh_tokens
     * const refresh_token = await prisma.refresh_token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends refresh_tokenUpdateManyArgs>(args: SelectSubset<T, refresh_tokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refresh_tokens and returns the data updated in the database.
     * @param {refresh_tokenUpdateManyAndReturnArgs} args - Arguments to update many Refresh_tokens.
     * @example
     * // Update many Refresh_tokens
     * const refresh_token = await prisma.refresh_token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Refresh_tokens and only return the `id`
     * const refresh_tokenWithIdOnly = await prisma.refresh_token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends refresh_tokenUpdateManyAndReturnArgs>(args: SelectSubset<T, refresh_tokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Refresh_token.
     * @param {refresh_tokenUpsertArgs} args - Arguments to update or create a Refresh_token.
     * @example
     * // Update or create a Refresh_token
     * const refresh_token = await prisma.refresh_token.upsert({
     *   create: {
     *     // ... data to create a Refresh_token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Refresh_token we want to update
     *   }
     * })
     */
    upsert<T extends refresh_tokenUpsertArgs>(args: SelectSubset<T, refresh_tokenUpsertArgs<ExtArgs>>): Prisma__refresh_tokenClient<$Result.GetResult<Prisma.$refresh_tokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Refresh_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokenCountArgs} args - Arguments to filter Refresh_tokens to count.
     * @example
     * // Count the number of Refresh_tokens
     * const count = await prisma.refresh_token.count({
     *   where: {
     *     // ... the filter for the Refresh_tokens we want to count
     *   }
     * })
    **/
    count<T extends refresh_tokenCountArgs>(
      args?: Subset<T, refresh_tokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Refresh_tokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Refresh_token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Refresh_tokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Refresh_tokenAggregateArgs>(args: Subset<T, Refresh_tokenAggregateArgs>): Prisma.PrismaPromise<GetRefresh_tokenAggregateType<T>>

    /**
     * Group by Refresh_token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {refresh_tokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends refresh_tokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: refresh_tokenGroupByArgs['orderBy'] }
        : { orderBy?: refresh_tokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, refresh_tokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefresh_tokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the refresh_token model
   */
  readonly fields: refresh_tokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for refresh_token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__refresh_tokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the refresh_token model
   */
  interface refresh_tokenFieldRefs {
    readonly id: FieldRef<"refresh_token", 'String'>
    readonly token: FieldRef<"refresh_token", 'String'>
    readonly user_id: FieldRef<"refresh_token", 'String'>
    readonly expires_at: FieldRef<"refresh_token", 'DateTime'>
    readonly revoked_at: FieldRef<"refresh_token", 'DateTime'>
    readonly created_at: FieldRef<"refresh_token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * refresh_token findUnique
   */
  export type refresh_tokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * Filter, which refresh_token to fetch.
     */
    where: refresh_tokenWhereUniqueInput
  }

  /**
   * refresh_token findUniqueOrThrow
   */
  export type refresh_tokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * Filter, which refresh_token to fetch.
     */
    where: refresh_tokenWhereUniqueInput
  }

  /**
   * refresh_token findFirst
   */
  export type refresh_tokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * Filter, which refresh_token to fetch.
     */
    where?: refresh_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokenOrderByWithRelationInput | refresh_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for refresh_tokens.
     */
    cursor?: refresh_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of refresh_tokens.
     */
    distinct?: Refresh_tokenScalarFieldEnum | Refresh_tokenScalarFieldEnum[]
  }

  /**
   * refresh_token findFirstOrThrow
   */
  export type refresh_tokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * Filter, which refresh_token to fetch.
     */
    where?: refresh_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokenOrderByWithRelationInput | refresh_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for refresh_tokens.
     */
    cursor?: refresh_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of refresh_tokens.
     */
    distinct?: Refresh_tokenScalarFieldEnum | Refresh_tokenScalarFieldEnum[]
  }

  /**
   * refresh_token findMany
   */
  export type refresh_tokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * Filter, which refresh_tokens to fetch.
     */
    where?: refresh_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of refresh_tokens to fetch.
     */
    orderBy?: refresh_tokenOrderByWithRelationInput | refresh_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing refresh_tokens.
     */
    cursor?: refresh_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` refresh_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` refresh_tokens.
     */
    skip?: number
    distinct?: Refresh_tokenScalarFieldEnum | Refresh_tokenScalarFieldEnum[]
  }

  /**
   * refresh_token create
   */
  export type refresh_tokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * The data needed to create a refresh_token.
     */
    data: XOR<refresh_tokenCreateInput, refresh_tokenUncheckedCreateInput>
  }

  /**
   * refresh_token createMany
   */
  export type refresh_tokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many refresh_tokens.
     */
    data: refresh_tokenCreateManyInput | refresh_tokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * refresh_token createManyAndReturn
   */
  export type refresh_tokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * The data used to create many refresh_tokens.
     */
    data: refresh_tokenCreateManyInput | refresh_tokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * refresh_token update
   */
  export type refresh_tokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * The data needed to update a refresh_token.
     */
    data: XOR<refresh_tokenUpdateInput, refresh_tokenUncheckedUpdateInput>
    /**
     * Choose, which refresh_token to update.
     */
    where: refresh_tokenWhereUniqueInput
  }

  /**
   * refresh_token updateMany
   */
  export type refresh_tokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update refresh_tokens.
     */
    data: XOR<refresh_tokenUpdateManyMutationInput, refresh_tokenUncheckedUpdateManyInput>
    /**
     * Filter which refresh_tokens to update
     */
    where?: refresh_tokenWhereInput
    /**
     * Limit how many refresh_tokens to update.
     */
    limit?: number
  }

  /**
   * refresh_token updateManyAndReturn
   */
  export type refresh_tokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * The data used to update refresh_tokens.
     */
    data: XOR<refresh_tokenUpdateManyMutationInput, refresh_tokenUncheckedUpdateManyInput>
    /**
     * Filter which refresh_tokens to update
     */
    where?: refresh_tokenWhereInput
    /**
     * Limit how many refresh_tokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * refresh_token upsert
   */
  export type refresh_tokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * The filter to search for the refresh_token to update in case it exists.
     */
    where: refresh_tokenWhereUniqueInput
    /**
     * In case the refresh_token found by the `where` argument doesn't exist, create a new refresh_token with this data.
     */
    create: XOR<refresh_tokenCreateInput, refresh_tokenUncheckedCreateInput>
    /**
     * In case the refresh_token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<refresh_tokenUpdateInput, refresh_tokenUncheckedUpdateInput>
  }

  /**
   * refresh_token delete
   */
  export type refresh_tokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
    /**
     * Filter which refresh_token to delete.
     */
    where: refresh_tokenWhereUniqueInput
  }

  /**
   * refresh_token deleteMany
   */
  export type refresh_tokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which refresh_tokens to delete
     */
    where?: refresh_tokenWhereInput
    /**
     * Limit how many refresh_tokens to delete.
     */
    limit?: number
  }

  /**
   * refresh_token without action
   */
  export type refresh_tokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the refresh_token
     */
    select?: refresh_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the refresh_token
     */
    omit?: refresh_tokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: refresh_tokenInclude<ExtArgs> | null
  }


  /**
   * Model verification_token
   */

  export type AggregateVerification_token = {
    _count: Verification_tokenCountAggregateOutputType | null
    _min: Verification_tokenMinAggregateOutputType | null
    _max: Verification_tokenMaxAggregateOutputType | null
  }

  export type Verification_tokenMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    type: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type Verification_tokenMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    type: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type Verification_tokenCountAggregateOutputType = {
    id: number
    user_id: number
    token: number
    type: number
    expires_at: number
    created_at: number
    _all: number
  }


  export type Verification_tokenMinAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    type?: true
    expires_at?: true
    created_at?: true
  }

  export type Verification_tokenMaxAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    type?: true
    expires_at?: true
    created_at?: true
  }

  export type Verification_tokenCountAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    type?: true
    expires_at?: true
    created_at?: true
    _all?: true
  }

  export type Verification_tokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verification_token to aggregate.
     */
    where?: verification_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_tokens to fetch.
     */
    orderBy?: verification_tokenOrderByWithRelationInput | verification_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: verification_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned verification_tokens
    **/
    _count?: true | Verification_tokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Verification_tokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Verification_tokenMaxAggregateInputType
  }

  export type GetVerification_tokenAggregateType<T extends Verification_tokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification_token]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification_token[P]>
      : GetScalarType<T[P], AggregateVerification_token[P]>
  }




  export type verification_tokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: verification_tokenWhereInput
    orderBy?: verification_tokenOrderByWithAggregationInput | verification_tokenOrderByWithAggregationInput[]
    by: Verification_tokenScalarFieldEnum[] | Verification_tokenScalarFieldEnum
    having?: verification_tokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Verification_tokenCountAggregateInputType | true
    _min?: Verification_tokenMinAggregateInputType
    _max?: Verification_tokenMaxAggregateInputType
  }

  export type Verification_tokenGroupByOutputType = {
    id: string
    user_id: string
    token: string
    type: string
    expires_at: Date
    created_at: Date
    _count: Verification_tokenCountAggregateOutputType | null
    _min: Verification_tokenMinAggregateOutputType | null
    _max: Verification_tokenMaxAggregateOutputType | null
  }

  type GetVerification_tokenGroupByPayload<T extends verification_tokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Verification_tokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Verification_tokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Verification_tokenGroupByOutputType[P]>
            : GetScalarType<T[P], Verification_tokenGroupByOutputType[P]>
        }
      >
    >


  export type verification_tokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    type?: boolean
    expires_at?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["verification_token"]>

  export type verification_tokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    type?: boolean
    expires_at?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["verification_token"]>

  export type verification_tokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    type?: boolean
    expires_at?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["verification_token"]>

  export type verification_tokenSelectScalar = {
    id?: boolean
    user_id?: boolean
    token?: boolean
    type?: boolean
    expires_at?: boolean
    created_at?: boolean
  }

  export type verification_tokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token" | "type" | "expires_at" | "created_at", ExtArgs["result"]["verification_token"]>

  export type $verification_tokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "verification_token"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token: string
      type: string
      expires_at: Date
      created_at: Date
    }, ExtArgs["result"]["verification_token"]>
    composites: {}
  }

  type verification_tokenGetPayload<S extends boolean | null | undefined | verification_tokenDefaultArgs> = $Result.GetResult<Prisma.$verification_tokenPayload, S>

  type verification_tokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<verification_tokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Verification_tokenCountAggregateInputType | true
    }

  export interface verification_tokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['verification_token'], meta: { name: 'verification_token' } }
    /**
     * Find zero or one Verification_token that matches the filter.
     * @param {verification_tokenFindUniqueArgs} args - Arguments to find a Verification_token
     * @example
     * // Get one Verification_token
     * const verification_token = await prisma.verification_token.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends verification_tokenFindUniqueArgs>(args: SelectSubset<T, verification_tokenFindUniqueArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification_token that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {verification_tokenFindUniqueOrThrowArgs} args - Arguments to find a Verification_token
     * @example
     * // Get one Verification_token
     * const verification_token = await prisma.verification_token.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends verification_tokenFindUniqueOrThrowArgs>(args: SelectSubset<T, verification_tokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification_token that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_tokenFindFirstArgs} args - Arguments to find a Verification_token
     * @example
     * // Get one Verification_token
     * const verification_token = await prisma.verification_token.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends verification_tokenFindFirstArgs>(args?: SelectSubset<T, verification_tokenFindFirstArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification_token that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_tokenFindFirstOrThrowArgs} args - Arguments to find a Verification_token
     * @example
     * // Get one Verification_token
     * const verification_token = await prisma.verification_token.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends verification_tokenFindFirstOrThrowArgs>(args?: SelectSubset<T, verification_tokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verification_tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_tokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verification_tokens
     * const verification_tokens = await prisma.verification_token.findMany()
     * 
     * // Get first 10 Verification_tokens
     * const verification_tokens = await prisma.verification_token.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verification_tokenWithIdOnly = await prisma.verification_token.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends verification_tokenFindManyArgs>(args?: SelectSubset<T, verification_tokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification_token.
     * @param {verification_tokenCreateArgs} args - Arguments to create a Verification_token.
     * @example
     * // Create one Verification_token
     * const Verification_token = await prisma.verification_token.create({
     *   data: {
     *     // ... data to create a Verification_token
     *   }
     * })
     * 
     */
    create<T extends verification_tokenCreateArgs>(args: SelectSubset<T, verification_tokenCreateArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verification_tokens.
     * @param {verification_tokenCreateManyArgs} args - Arguments to create many Verification_tokens.
     * @example
     * // Create many Verification_tokens
     * const verification_token = await prisma.verification_token.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends verification_tokenCreateManyArgs>(args?: SelectSubset<T, verification_tokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verification_tokens and returns the data saved in the database.
     * @param {verification_tokenCreateManyAndReturnArgs} args - Arguments to create many Verification_tokens.
     * @example
     * // Create many Verification_tokens
     * const verification_token = await prisma.verification_token.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verification_tokens and only return the `id`
     * const verification_tokenWithIdOnly = await prisma.verification_token.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends verification_tokenCreateManyAndReturnArgs>(args?: SelectSubset<T, verification_tokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification_token.
     * @param {verification_tokenDeleteArgs} args - Arguments to delete one Verification_token.
     * @example
     * // Delete one Verification_token
     * const Verification_token = await prisma.verification_token.delete({
     *   where: {
     *     // ... filter to delete one Verification_token
     *   }
     * })
     * 
     */
    delete<T extends verification_tokenDeleteArgs>(args: SelectSubset<T, verification_tokenDeleteArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification_token.
     * @param {verification_tokenUpdateArgs} args - Arguments to update one Verification_token.
     * @example
     * // Update one Verification_token
     * const verification_token = await prisma.verification_token.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends verification_tokenUpdateArgs>(args: SelectSubset<T, verification_tokenUpdateArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verification_tokens.
     * @param {verification_tokenDeleteManyArgs} args - Arguments to filter Verification_tokens to delete.
     * @example
     * // Delete a few Verification_tokens
     * const { count } = await prisma.verification_token.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends verification_tokenDeleteManyArgs>(args?: SelectSubset<T, verification_tokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verification_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_tokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verification_tokens
     * const verification_token = await prisma.verification_token.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends verification_tokenUpdateManyArgs>(args: SelectSubset<T, verification_tokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verification_tokens and returns the data updated in the database.
     * @param {verification_tokenUpdateManyAndReturnArgs} args - Arguments to update many Verification_tokens.
     * @example
     * // Update many Verification_tokens
     * const verification_token = await prisma.verification_token.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verification_tokens and only return the `id`
     * const verification_tokenWithIdOnly = await prisma.verification_token.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends verification_tokenUpdateManyAndReturnArgs>(args: SelectSubset<T, verification_tokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification_token.
     * @param {verification_tokenUpsertArgs} args - Arguments to update or create a Verification_token.
     * @example
     * // Update or create a Verification_token
     * const verification_token = await prisma.verification_token.upsert({
     *   create: {
     *     // ... data to create a Verification_token
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification_token we want to update
     *   }
     * })
     */
    upsert<T extends verification_tokenUpsertArgs>(args: SelectSubset<T, verification_tokenUpsertArgs<ExtArgs>>): Prisma__verification_tokenClient<$Result.GetResult<Prisma.$verification_tokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verification_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_tokenCountArgs} args - Arguments to filter Verification_tokens to count.
     * @example
     * // Count the number of Verification_tokens
     * const count = await prisma.verification_token.count({
     *   where: {
     *     // ... the filter for the Verification_tokens we want to count
     *   }
     * })
    **/
    count<T extends verification_tokenCountArgs>(
      args?: Subset<T, verification_tokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Verification_tokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification_token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Verification_tokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Verification_tokenAggregateArgs>(args: Subset<T, Verification_tokenAggregateArgs>): Prisma.PrismaPromise<GetVerification_tokenAggregateType<T>>

    /**
     * Group by Verification_token.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verification_tokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends verification_tokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: verification_tokenGroupByArgs['orderBy'] }
        : { orderBy?: verification_tokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, verification_tokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerification_tokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the verification_token model
   */
  readonly fields: verification_tokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for verification_token.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__verification_tokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the verification_token model
   */
  interface verification_tokenFieldRefs {
    readonly id: FieldRef<"verification_token", 'String'>
    readonly user_id: FieldRef<"verification_token", 'String'>
    readonly token: FieldRef<"verification_token", 'String'>
    readonly type: FieldRef<"verification_token", 'String'>
    readonly expires_at: FieldRef<"verification_token", 'DateTime'>
    readonly created_at: FieldRef<"verification_token", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * verification_token findUnique
   */
  export type verification_tokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * Filter, which verification_token to fetch.
     */
    where: verification_tokenWhereUniqueInput
  }

  /**
   * verification_token findUniqueOrThrow
   */
  export type verification_tokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * Filter, which verification_token to fetch.
     */
    where: verification_tokenWhereUniqueInput
  }

  /**
   * verification_token findFirst
   */
  export type verification_tokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * Filter, which verification_token to fetch.
     */
    where?: verification_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_tokens to fetch.
     */
    orderBy?: verification_tokenOrderByWithRelationInput | verification_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verification_tokens.
     */
    cursor?: verification_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verification_tokens.
     */
    distinct?: Verification_tokenScalarFieldEnum | Verification_tokenScalarFieldEnum[]
  }

  /**
   * verification_token findFirstOrThrow
   */
  export type verification_tokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * Filter, which verification_token to fetch.
     */
    where?: verification_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_tokens to fetch.
     */
    orderBy?: verification_tokenOrderByWithRelationInput | verification_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verification_tokens.
     */
    cursor?: verification_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verification_tokens.
     */
    distinct?: Verification_tokenScalarFieldEnum | Verification_tokenScalarFieldEnum[]
  }

  /**
   * verification_token findMany
   */
  export type verification_tokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * Filter, which verification_tokens to fetch.
     */
    where?: verification_tokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verification_tokens to fetch.
     */
    orderBy?: verification_tokenOrderByWithRelationInput | verification_tokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing verification_tokens.
     */
    cursor?: verification_tokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verification_tokens.
     */
    skip?: number
    distinct?: Verification_tokenScalarFieldEnum | Verification_tokenScalarFieldEnum[]
  }

  /**
   * verification_token create
   */
  export type verification_tokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * The data needed to create a verification_token.
     */
    data: XOR<verification_tokenCreateInput, verification_tokenUncheckedCreateInput>
  }

  /**
   * verification_token createMany
   */
  export type verification_tokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many verification_tokens.
     */
    data: verification_tokenCreateManyInput | verification_tokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification_token createManyAndReturn
   */
  export type verification_tokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * The data used to create many verification_tokens.
     */
    data: verification_tokenCreateManyInput | verification_tokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification_token update
   */
  export type verification_tokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * The data needed to update a verification_token.
     */
    data: XOR<verification_tokenUpdateInput, verification_tokenUncheckedUpdateInput>
    /**
     * Choose, which verification_token to update.
     */
    where: verification_tokenWhereUniqueInput
  }

  /**
   * verification_token updateMany
   */
  export type verification_tokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update verification_tokens.
     */
    data: XOR<verification_tokenUpdateManyMutationInput, verification_tokenUncheckedUpdateManyInput>
    /**
     * Filter which verification_tokens to update
     */
    where?: verification_tokenWhereInput
    /**
     * Limit how many verification_tokens to update.
     */
    limit?: number
  }

  /**
   * verification_token updateManyAndReturn
   */
  export type verification_tokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * The data used to update verification_tokens.
     */
    data: XOR<verification_tokenUpdateManyMutationInput, verification_tokenUncheckedUpdateManyInput>
    /**
     * Filter which verification_tokens to update
     */
    where?: verification_tokenWhereInput
    /**
     * Limit how many verification_tokens to update.
     */
    limit?: number
  }

  /**
   * verification_token upsert
   */
  export type verification_tokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * The filter to search for the verification_token to update in case it exists.
     */
    where: verification_tokenWhereUniqueInput
    /**
     * In case the verification_token found by the `where` argument doesn't exist, create a new verification_token with this data.
     */
    create: XOR<verification_tokenCreateInput, verification_tokenUncheckedCreateInput>
    /**
     * In case the verification_token was found with the provided `where` argument, update it with this data.
     */
    update: XOR<verification_tokenUpdateInput, verification_tokenUncheckedUpdateInput>
  }

  /**
   * verification_token delete
   */
  export type verification_tokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
    /**
     * Filter which verification_token to delete.
     */
    where: verification_tokenWhereUniqueInput
  }

  /**
   * verification_token deleteMany
   */
  export type verification_tokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verification_tokens to delete
     */
    where?: verification_tokenWhereInput
    /**
     * Limit how many verification_tokens to delete.
     */
    limit?: number
  }

  /**
   * verification_token without action
   */
  export type verification_tokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification_token
     */
    select?: verification_tokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification_token
     */
    omit?: verification_tokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password_hash: 'password_hash',
    first_name: 'first_name',
    last_name: 'last_name',
    is_active: 'is_active',
    email_verified: 'email_verified',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const Oauth_clientScalarFieldEnum: {
    id: 'id',
    client_id: 'client_id',
    client_secret: 'client_secret',
    name: 'name',
    redirect_uris: 'redirect_uris',
    scopes: 'scopes',
    grant_types: 'grant_types',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Oauth_clientScalarFieldEnum = (typeof Oauth_clientScalarFieldEnum)[keyof typeof Oauth_clientScalarFieldEnum]


  export const Oauth_tokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    user_id: 'user_id',
    client_id: 'client_id',
    scope: 'scope',
    expires_at: 'expires_at',
    created_at: 'created_at'
  };

  export type Oauth_tokenScalarFieldEnum = (typeof Oauth_tokenScalarFieldEnum)[keyof typeof Oauth_tokenScalarFieldEnum]


  export const Refresh_tokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    user_id: 'user_id',
    expires_at: 'expires_at',
    revoked_at: 'revoked_at',
    created_at: 'created_at'
  };

  export type Refresh_tokenScalarFieldEnum = (typeof Refresh_tokenScalarFieldEnum)[keyof typeof Refresh_tokenScalarFieldEnum]


  export const Verification_tokenScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token: 'token',
    type: 'type',
    expires_at: 'expires_at',
    created_at: 'created_at'
  };

  export type Verification_tokenScalarFieldEnum = (typeof Verification_tokenScalarFieldEnum)[keyof typeof Verification_tokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    email?: StringFilter<"user"> | string
    password_hash?: StringFilter<"user"> | string
    first_name?: StringNullableFilter<"user"> | string | null
    last_name?: StringNullableFilter<"user"> | string | null
    is_active?: BoolFilter<"user"> | boolean
    email_verified?: BoolFilter<"user"> | boolean
    created_at?: DateTimeFilter<"user"> | Date | string
    updated_at?: DateTimeFilter<"user"> | Date | string
    oauth_tokens?: Oauth_tokenListRelationFilter
    refresh_tokens?: Refresh_tokenListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    is_active?: SortOrder
    email_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    oauth_tokens?: oauth_tokenOrderByRelationAggregateInput
    refresh_tokens?: refresh_tokenOrderByRelationAggregateInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    password_hash?: StringFilter<"user"> | string
    first_name?: StringNullableFilter<"user"> | string | null
    last_name?: StringNullableFilter<"user"> | string | null
    is_active?: BoolFilter<"user"> | boolean
    email_verified?: BoolFilter<"user"> | boolean
    created_at?: DateTimeFilter<"user"> | Date | string
    updated_at?: DateTimeFilter<"user"> | Date | string
    oauth_tokens?: Oauth_tokenListRelationFilter
    refresh_tokens?: Refresh_tokenListRelationFilter
  }, "id" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    is_active?: SortOrder
    email_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    email?: StringWithAggregatesFilter<"user"> | string
    password_hash?: StringWithAggregatesFilter<"user"> | string
    first_name?: StringNullableWithAggregatesFilter<"user"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"user"> | string | null
    is_active?: BoolWithAggregatesFilter<"user"> | boolean
    email_verified?: BoolWithAggregatesFilter<"user"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"user"> | Date | string
  }

  export type oauth_clientWhereInput = {
    AND?: oauth_clientWhereInput | oauth_clientWhereInput[]
    OR?: oauth_clientWhereInput[]
    NOT?: oauth_clientWhereInput | oauth_clientWhereInput[]
    id?: StringFilter<"oauth_client"> | string
    client_id?: StringFilter<"oauth_client"> | string
    client_secret?: StringFilter<"oauth_client"> | string
    name?: StringFilter<"oauth_client"> | string
    redirect_uris?: StringFilter<"oauth_client"> | string
    scopes?: StringFilter<"oauth_client"> | string
    grant_types?: StringFilter<"oauth_client"> | string
    is_active?: BoolFilter<"oauth_client"> | boolean
    created_at?: DateTimeFilter<"oauth_client"> | Date | string
    updated_at?: DateTimeFilter<"oauth_client"> | Date | string
    oauth_tokens?: Oauth_tokenListRelationFilter
  }

  export type oauth_clientOrderByWithRelationInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    name?: SortOrder
    redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    oauth_tokens?: oauth_tokenOrderByRelationAggregateInput
  }

  export type oauth_clientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    client_id?: string
    AND?: oauth_clientWhereInput | oauth_clientWhereInput[]
    OR?: oauth_clientWhereInput[]
    NOT?: oauth_clientWhereInput | oauth_clientWhereInput[]
    client_secret?: StringFilter<"oauth_client"> | string
    name?: StringFilter<"oauth_client"> | string
    redirect_uris?: StringFilter<"oauth_client"> | string
    scopes?: StringFilter<"oauth_client"> | string
    grant_types?: StringFilter<"oauth_client"> | string
    is_active?: BoolFilter<"oauth_client"> | boolean
    created_at?: DateTimeFilter<"oauth_client"> | Date | string
    updated_at?: DateTimeFilter<"oauth_client"> | Date | string
    oauth_tokens?: Oauth_tokenListRelationFilter
  }, "id" | "client_id">

  export type oauth_clientOrderByWithAggregationInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    name?: SortOrder
    redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: oauth_clientCountOrderByAggregateInput
    _max?: oauth_clientMaxOrderByAggregateInput
    _min?: oauth_clientMinOrderByAggregateInput
  }

  export type oauth_clientScalarWhereWithAggregatesInput = {
    AND?: oauth_clientScalarWhereWithAggregatesInput | oauth_clientScalarWhereWithAggregatesInput[]
    OR?: oauth_clientScalarWhereWithAggregatesInput[]
    NOT?: oauth_clientScalarWhereWithAggregatesInput | oauth_clientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"oauth_client"> | string
    client_id?: StringWithAggregatesFilter<"oauth_client"> | string
    client_secret?: StringWithAggregatesFilter<"oauth_client"> | string
    name?: StringWithAggregatesFilter<"oauth_client"> | string
    redirect_uris?: StringWithAggregatesFilter<"oauth_client"> | string
    scopes?: StringWithAggregatesFilter<"oauth_client"> | string
    grant_types?: StringWithAggregatesFilter<"oauth_client"> | string
    is_active?: BoolWithAggregatesFilter<"oauth_client"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"oauth_client"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"oauth_client"> | Date | string
  }

  export type oauth_tokenWhereInput = {
    AND?: oauth_tokenWhereInput | oauth_tokenWhereInput[]
    OR?: oauth_tokenWhereInput[]
    NOT?: oauth_tokenWhereInput | oauth_tokenWhereInput[]
    id?: StringFilter<"oauth_token"> | string
    token?: StringFilter<"oauth_token"> | string
    user_id?: StringFilter<"oauth_token"> | string
    client_id?: StringFilter<"oauth_token"> | string
    scope?: StringNullableFilter<"oauth_token"> | string | null
    expires_at?: DateTimeNullableFilter<"oauth_token"> | Date | string | null
    created_at?: DateTimeFilter<"oauth_token"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    client?: XOR<Oauth_clientScalarRelationFilter, oauth_clientWhereInput>
  }

  export type oauth_tokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    client_id?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: userOrderByWithRelationInput
    client?: oauth_clientOrderByWithRelationInput
  }

  export type oauth_tokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: oauth_tokenWhereInput | oauth_tokenWhereInput[]
    OR?: oauth_tokenWhereInput[]
    NOT?: oauth_tokenWhereInput | oauth_tokenWhereInput[]
    user_id?: StringFilter<"oauth_token"> | string
    client_id?: StringFilter<"oauth_token"> | string
    scope?: StringNullableFilter<"oauth_token"> | string | null
    expires_at?: DateTimeNullableFilter<"oauth_token"> | Date | string | null
    created_at?: DateTimeFilter<"oauth_token"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    client?: XOR<Oauth_clientScalarRelationFilter, oauth_clientWhereInput>
  }, "id" | "token">

  export type oauth_tokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    client_id?: SortOrder
    scope?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: oauth_tokenCountOrderByAggregateInput
    _max?: oauth_tokenMaxOrderByAggregateInput
    _min?: oauth_tokenMinOrderByAggregateInput
  }

  export type oauth_tokenScalarWhereWithAggregatesInput = {
    AND?: oauth_tokenScalarWhereWithAggregatesInput | oauth_tokenScalarWhereWithAggregatesInput[]
    OR?: oauth_tokenScalarWhereWithAggregatesInput[]
    NOT?: oauth_tokenScalarWhereWithAggregatesInput | oauth_tokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"oauth_token"> | string
    token?: StringWithAggregatesFilter<"oauth_token"> | string
    user_id?: StringWithAggregatesFilter<"oauth_token"> | string
    client_id?: StringWithAggregatesFilter<"oauth_token"> | string
    scope?: StringNullableWithAggregatesFilter<"oauth_token"> | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"oauth_token"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"oauth_token"> | Date | string
  }

  export type refresh_tokenWhereInput = {
    AND?: refresh_tokenWhereInput | refresh_tokenWhereInput[]
    OR?: refresh_tokenWhereInput[]
    NOT?: refresh_tokenWhereInput | refresh_tokenWhereInput[]
    id?: StringFilter<"refresh_token"> | string
    token?: StringFilter<"refresh_token"> | string
    user_id?: StringFilter<"refresh_token"> | string
    expires_at?: DateTimeFilter<"refresh_token"> | Date | string
    revoked_at?: DateTimeNullableFilter<"refresh_token"> | Date | string | null
    created_at?: DateTimeFilter<"refresh_token"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type refresh_tokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    user?: userOrderByWithRelationInput
  }

  export type refresh_tokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: refresh_tokenWhereInput | refresh_tokenWhereInput[]
    OR?: refresh_tokenWhereInput[]
    NOT?: refresh_tokenWhereInput | refresh_tokenWhereInput[]
    user_id?: StringFilter<"refresh_token"> | string
    expires_at?: DateTimeFilter<"refresh_token"> | Date | string
    revoked_at?: DateTimeNullableFilter<"refresh_token"> | Date | string | null
    created_at?: DateTimeFilter<"refresh_token"> | Date | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "token">

  export type refresh_tokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: refresh_tokenCountOrderByAggregateInput
    _max?: refresh_tokenMaxOrderByAggregateInput
    _min?: refresh_tokenMinOrderByAggregateInput
  }

  export type refresh_tokenScalarWhereWithAggregatesInput = {
    AND?: refresh_tokenScalarWhereWithAggregatesInput | refresh_tokenScalarWhereWithAggregatesInput[]
    OR?: refresh_tokenScalarWhereWithAggregatesInput[]
    NOT?: refresh_tokenScalarWhereWithAggregatesInput | refresh_tokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"refresh_token"> | string
    token?: StringWithAggregatesFilter<"refresh_token"> | string
    user_id?: StringWithAggregatesFilter<"refresh_token"> | string
    expires_at?: DateTimeWithAggregatesFilter<"refresh_token"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"refresh_token"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"refresh_token"> | Date | string
  }

  export type verification_tokenWhereInput = {
    AND?: verification_tokenWhereInput | verification_tokenWhereInput[]
    OR?: verification_tokenWhereInput[]
    NOT?: verification_tokenWhereInput | verification_tokenWhereInput[]
    id?: StringFilter<"verification_token"> | string
    user_id?: StringFilter<"verification_token"> | string
    token?: StringFilter<"verification_token"> | string
    type?: StringFilter<"verification_token"> | string
    expires_at?: DateTimeFilter<"verification_token"> | Date | string
    created_at?: DateTimeFilter<"verification_token"> | Date | string
  }

  export type verification_tokenOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type verification_tokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: verification_tokenWhereInput | verification_tokenWhereInput[]
    OR?: verification_tokenWhereInput[]
    NOT?: verification_tokenWhereInput | verification_tokenWhereInput[]
    user_id?: StringFilter<"verification_token"> | string
    type?: StringFilter<"verification_token"> | string
    expires_at?: DateTimeFilter<"verification_token"> | Date | string
    created_at?: DateTimeFilter<"verification_token"> | Date | string
  }, "id" | "token">

  export type verification_tokenOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    _count?: verification_tokenCountOrderByAggregateInput
    _max?: verification_tokenMaxOrderByAggregateInput
    _min?: verification_tokenMinOrderByAggregateInput
  }

  export type verification_tokenScalarWhereWithAggregatesInput = {
    AND?: verification_tokenScalarWhereWithAggregatesInput | verification_tokenScalarWhereWithAggregatesInput[]
    OR?: verification_tokenScalarWhereWithAggregatesInput[]
    NOT?: verification_tokenScalarWhereWithAggregatesInput | verification_tokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"verification_token"> | string
    user_id?: StringWithAggregatesFilter<"verification_token"> | string
    token?: StringWithAggregatesFilter<"verification_token"> | string
    type?: StringWithAggregatesFilter<"verification_token"> | string
    expires_at?: DateTimeWithAggregatesFilter<"verification_token"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"verification_token"> | Date | string
  }

  export type userCreateInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    oauth_tokens?: oauth_tokenCreateNestedManyWithoutUserInput
    refresh_tokens?: refresh_tokenCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    oauth_tokens?: oauth_tokenUncheckedCreateNestedManyWithoutUserInput
    refresh_tokens?: refresh_tokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    oauth_tokens?: oauth_tokenUpdateManyWithoutUserNestedInput
    refresh_tokens?: refresh_tokenUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    oauth_tokens?: oauth_tokenUncheckedUpdateManyWithoutUserNestedInput
    refresh_tokens?: refresh_tokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_clientCreateInput = {
    id?: string
    client_id: string
    client_secret: string
    name: string
    redirect_uris: string
    scopes: string
    grant_types: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    oauth_tokens?: oauth_tokenCreateNestedManyWithoutClientInput
  }

  export type oauth_clientUncheckedCreateInput = {
    id?: string
    client_id: string
    client_secret: string
    name: string
    redirect_uris: string
    scopes: string
    grant_types: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    oauth_tokens?: oauth_tokenUncheckedCreateNestedManyWithoutClientInput
  }

  export type oauth_clientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    redirect_uris?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    grant_types?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    oauth_tokens?: oauth_tokenUpdateManyWithoutClientNestedInput
  }

  export type oauth_clientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    redirect_uris?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    grant_types?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    oauth_tokens?: oauth_tokenUncheckedUpdateManyWithoutClientNestedInput
  }

  export type oauth_clientCreateManyInput = {
    id?: string
    client_id: string
    client_secret: string
    name: string
    redirect_uris: string
    scopes: string
    grant_types: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type oauth_clientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    redirect_uris?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    grant_types?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_clientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    redirect_uris?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    grant_types?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_tokenCreateInput = {
    id?: string
    token: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    user: userCreateNestedOneWithoutOauth_tokensInput
    client: oauth_clientCreateNestedOneWithoutOauth_tokensInput
  }

  export type oauth_tokenUncheckedCreateInput = {
    id?: string
    token: string
    user_id: string
    client_id: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type oauth_tokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutOauth_tokensNestedInput
    client?: oauth_clientUpdateOneRequiredWithoutOauth_tokensNestedInput
  }

  export type oauth_tokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_tokenCreateManyInput = {
    id?: string
    token: string
    user_id: string
    client_id: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type oauth_tokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_tokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type refresh_tokenCreateInput = {
    id?: string
    token: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
    user: userCreateNestedOneWithoutRefresh_tokensInput
  }

  export type refresh_tokenUncheckedCreateInput = {
    id?: string
    token: string
    user_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type refresh_tokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutRefresh_tokensNestedInput
  }

  export type refresh_tokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type refresh_tokenCreateManyInput = {
    id?: string
    token: string
    user_id: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type refresh_tokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type refresh_tokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verification_tokenCreateInput = {
    id?: string
    user_id: string
    token: string
    type: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type verification_tokenUncheckedCreateInput = {
    id?: string
    user_id: string
    token: string
    type: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type verification_tokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verification_tokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verification_tokenCreateManyInput = {
    id?: string
    user_id: string
    token: string
    type: string
    expires_at: Date | string
    created_at?: Date | string
  }

  export type verification_tokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verification_tokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type Oauth_tokenListRelationFilter = {
    every?: oauth_tokenWhereInput
    some?: oauth_tokenWhereInput
    none?: oauth_tokenWhereInput
  }

  export type Refresh_tokenListRelationFilter = {
    every?: refresh_tokenWhereInput
    some?: refresh_tokenWhereInput
    none?: refresh_tokenWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type oauth_tokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type refresh_tokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_active?: SortOrder
    email_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_active?: SortOrder
    email_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    is_active?: SortOrder
    email_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type oauth_clientCountOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    name?: SortOrder
    redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type oauth_clientMaxOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    name?: SortOrder
    redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type oauth_clientMinOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    name?: SortOrder
    redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type Oauth_clientScalarRelationFilter = {
    is?: oauth_clientWhereInput
    isNot?: oauth_clientWhereInput
  }

  export type oauth_tokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    client_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type oauth_tokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    client_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type oauth_tokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    client_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type refresh_tokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type refresh_tokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type refresh_tokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type verification_tokenCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type verification_tokenMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type verification_tokenMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    type?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type oauth_tokenCreateNestedManyWithoutUserInput = {
    create?: XOR<oauth_tokenCreateWithoutUserInput, oauth_tokenUncheckedCreateWithoutUserInput> | oauth_tokenCreateWithoutUserInput[] | oauth_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutUserInput | oauth_tokenCreateOrConnectWithoutUserInput[]
    createMany?: oauth_tokenCreateManyUserInputEnvelope
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
  }

  export type refresh_tokenCreateNestedManyWithoutUserInput = {
    create?: XOR<refresh_tokenCreateWithoutUserInput, refresh_tokenUncheckedCreateWithoutUserInput> | refresh_tokenCreateWithoutUserInput[] | refresh_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: refresh_tokenCreateOrConnectWithoutUserInput | refresh_tokenCreateOrConnectWithoutUserInput[]
    createMany?: refresh_tokenCreateManyUserInputEnvelope
    connect?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
  }

  export type oauth_tokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<oauth_tokenCreateWithoutUserInput, oauth_tokenUncheckedCreateWithoutUserInput> | oauth_tokenCreateWithoutUserInput[] | oauth_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutUserInput | oauth_tokenCreateOrConnectWithoutUserInput[]
    createMany?: oauth_tokenCreateManyUserInputEnvelope
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
  }

  export type refresh_tokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<refresh_tokenCreateWithoutUserInput, refresh_tokenUncheckedCreateWithoutUserInput> | refresh_tokenCreateWithoutUserInput[] | refresh_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: refresh_tokenCreateOrConnectWithoutUserInput | refresh_tokenCreateOrConnectWithoutUserInput[]
    createMany?: refresh_tokenCreateManyUserInputEnvelope
    connect?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type oauth_tokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauth_tokenCreateWithoutUserInput, oauth_tokenUncheckedCreateWithoutUserInput> | oauth_tokenCreateWithoutUserInput[] | oauth_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutUserInput | oauth_tokenCreateOrConnectWithoutUserInput[]
    upsert?: oauth_tokenUpsertWithWhereUniqueWithoutUserInput | oauth_tokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauth_tokenCreateManyUserInputEnvelope
    set?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    disconnect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    delete?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    update?: oauth_tokenUpdateWithWhereUniqueWithoutUserInput | oauth_tokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauth_tokenUpdateManyWithWhereWithoutUserInput | oauth_tokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauth_tokenScalarWhereInput | oauth_tokenScalarWhereInput[]
  }

  export type refresh_tokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<refresh_tokenCreateWithoutUserInput, refresh_tokenUncheckedCreateWithoutUserInput> | refresh_tokenCreateWithoutUserInput[] | refresh_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: refresh_tokenCreateOrConnectWithoutUserInput | refresh_tokenCreateOrConnectWithoutUserInput[]
    upsert?: refresh_tokenUpsertWithWhereUniqueWithoutUserInput | refresh_tokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: refresh_tokenCreateManyUserInputEnvelope
    set?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    disconnect?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    delete?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    connect?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    update?: refresh_tokenUpdateWithWhereUniqueWithoutUserInput | refresh_tokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: refresh_tokenUpdateManyWithWhereWithoutUserInput | refresh_tokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: refresh_tokenScalarWhereInput | refresh_tokenScalarWhereInput[]
  }

  export type oauth_tokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<oauth_tokenCreateWithoutUserInput, oauth_tokenUncheckedCreateWithoutUserInput> | oauth_tokenCreateWithoutUserInput[] | oauth_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutUserInput | oauth_tokenCreateOrConnectWithoutUserInput[]
    upsert?: oauth_tokenUpsertWithWhereUniqueWithoutUserInput | oauth_tokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: oauth_tokenCreateManyUserInputEnvelope
    set?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    disconnect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    delete?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    update?: oauth_tokenUpdateWithWhereUniqueWithoutUserInput | oauth_tokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: oauth_tokenUpdateManyWithWhereWithoutUserInput | oauth_tokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: oauth_tokenScalarWhereInput | oauth_tokenScalarWhereInput[]
  }

  export type refresh_tokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<refresh_tokenCreateWithoutUserInput, refresh_tokenUncheckedCreateWithoutUserInput> | refresh_tokenCreateWithoutUserInput[] | refresh_tokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: refresh_tokenCreateOrConnectWithoutUserInput | refresh_tokenCreateOrConnectWithoutUserInput[]
    upsert?: refresh_tokenUpsertWithWhereUniqueWithoutUserInput | refresh_tokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: refresh_tokenCreateManyUserInputEnvelope
    set?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    disconnect?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    delete?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    connect?: refresh_tokenWhereUniqueInput | refresh_tokenWhereUniqueInput[]
    update?: refresh_tokenUpdateWithWhereUniqueWithoutUserInput | refresh_tokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: refresh_tokenUpdateManyWithWhereWithoutUserInput | refresh_tokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: refresh_tokenScalarWhereInput | refresh_tokenScalarWhereInput[]
  }

  export type oauth_tokenCreateNestedManyWithoutClientInput = {
    create?: XOR<oauth_tokenCreateWithoutClientInput, oauth_tokenUncheckedCreateWithoutClientInput> | oauth_tokenCreateWithoutClientInput[] | oauth_tokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutClientInput | oauth_tokenCreateOrConnectWithoutClientInput[]
    createMany?: oauth_tokenCreateManyClientInputEnvelope
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
  }

  export type oauth_tokenUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<oauth_tokenCreateWithoutClientInput, oauth_tokenUncheckedCreateWithoutClientInput> | oauth_tokenCreateWithoutClientInput[] | oauth_tokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutClientInput | oauth_tokenCreateOrConnectWithoutClientInput[]
    createMany?: oauth_tokenCreateManyClientInputEnvelope
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
  }

  export type oauth_tokenUpdateManyWithoutClientNestedInput = {
    create?: XOR<oauth_tokenCreateWithoutClientInput, oauth_tokenUncheckedCreateWithoutClientInput> | oauth_tokenCreateWithoutClientInput[] | oauth_tokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutClientInput | oauth_tokenCreateOrConnectWithoutClientInput[]
    upsert?: oauth_tokenUpsertWithWhereUniqueWithoutClientInput | oauth_tokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: oauth_tokenCreateManyClientInputEnvelope
    set?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    disconnect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    delete?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    update?: oauth_tokenUpdateWithWhereUniqueWithoutClientInput | oauth_tokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: oauth_tokenUpdateManyWithWhereWithoutClientInput | oauth_tokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: oauth_tokenScalarWhereInput | oauth_tokenScalarWhereInput[]
  }

  export type oauth_tokenUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<oauth_tokenCreateWithoutClientInput, oauth_tokenUncheckedCreateWithoutClientInput> | oauth_tokenCreateWithoutClientInput[] | oauth_tokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: oauth_tokenCreateOrConnectWithoutClientInput | oauth_tokenCreateOrConnectWithoutClientInput[]
    upsert?: oauth_tokenUpsertWithWhereUniqueWithoutClientInput | oauth_tokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: oauth_tokenCreateManyClientInputEnvelope
    set?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    disconnect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    delete?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    connect?: oauth_tokenWhereUniqueInput | oauth_tokenWhereUniqueInput[]
    update?: oauth_tokenUpdateWithWhereUniqueWithoutClientInput | oauth_tokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: oauth_tokenUpdateManyWithWhereWithoutClientInput | oauth_tokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: oauth_tokenScalarWhereInput | oauth_tokenScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutOauth_tokensInput = {
    create?: XOR<userCreateWithoutOauth_tokensInput, userUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: userCreateOrConnectWithoutOauth_tokensInput
    connect?: userWhereUniqueInput
  }

  export type oauth_clientCreateNestedOneWithoutOauth_tokensInput = {
    create?: XOR<oauth_clientCreateWithoutOauth_tokensInput, oauth_clientUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: oauth_clientCreateOrConnectWithoutOauth_tokensInput
    connect?: oauth_clientWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type userUpdateOneRequiredWithoutOauth_tokensNestedInput = {
    create?: XOR<userCreateWithoutOauth_tokensInput, userUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: userCreateOrConnectWithoutOauth_tokensInput
    upsert?: userUpsertWithoutOauth_tokensInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutOauth_tokensInput, userUpdateWithoutOauth_tokensInput>, userUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type oauth_clientUpdateOneRequiredWithoutOauth_tokensNestedInput = {
    create?: XOR<oauth_clientCreateWithoutOauth_tokensInput, oauth_clientUncheckedCreateWithoutOauth_tokensInput>
    connectOrCreate?: oauth_clientCreateOrConnectWithoutOauth_tokensInput
    upsert?: oauth_clientUpsertWithoutOauth_tokensInput
    connect?: oauth_clientWhereUniqueInput
    update?: XOR<XOR<oauth_clientUpdateToOneWithWhereWithoutOauth_tokensInput, oauth_clientUpdateWithoutOauth_tokensInput>, oauth_clientUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type userCreateNestedOneWithoutRefresh_tokensInput = {
    create?: XOR<userCreateWithoutRefresh_tokensInput, userUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: userCreateOrConnectWithoutRefresh_tokensInput
    connect?: userWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutRefresh_tokensNestedInput = {
    create?: XOR<userCreateWithoutRefresh_tokensInput, userUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: userCreateOrConnectWithoutRefresh_tokensInput
    upsert?: userUpsertWithoutRefresh_tokensInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutRefresh_tokensInput, userUpdateWithoutRefresh_tokensInput>, userUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type oauth_tokenCreateWithoutUserInput = {
    id?: string
    token: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    client: oauth_clientCreateNestedOneWithoutOauth_tokensInput
  }

  export type oauth_tokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    client_id: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type oauth_tokenCreateOrConnectWithoutUserInput = {
    where: oauth_tokenWhereUniqueInput
    create: XOR<oauth_tokenCreateWithoutUserInput, oauth_tokenUncheckedCreateWithoutUserInput>
  }

  export type oauth_tokenCreateManyUserInputEnvelope = {
    data: oauth_tokenCreateManyUserInput | oauth_tokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type refresh_tokenCreateWithoutUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type refresh_tokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type refresh_tokenCreateOrConnectWithoutUserInput = {
    where: refresh_tokenWhereUniqueInput
    create: XOR<refresh_tokenCreateWithoutUserInput, refresh_tokenUncheckedCreateWithoutUserInput>
  }

  export type refresh_tokenCreateManyUserInputEnvelope = {
    data: refresh_tokenCreateManyUserInput | refresh_tokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type oauth_tokenUpsertWithWhereUniqueWithoutUserInput = {
    where: oauth_tokenWhereUniqueInput
    update: XOR<oauth_tokenUpdateWithoutUserInput, oauth_tokenUncheckedUpdateWithoutUserInput>
    create: XOR<oauth_tokenCreateWithoutUserInput, oauth_tokenUncheckedCreateWithoutUserInput>
  }

  export type oauth_tokenUpdateWithWhereUniqueWithoutUserInput = {
    where: oauth_tokenWhereUniqueInput
    data: XOR<oauth_tokenUpdateWithoutUserInput, oauth_tokenUncheckedUpdateWithoutUserInput>
  }

  export type oauth_tokenUpdateManyWithWhereWithoutUserInput = {
    where: oauth_tokenScalarWhereInput
    data: XOR<oauth_tokenUpdateManyMutationInput, oauth_tokenUncheckedUpdateManyWithoutUserInput>
  }

  export type oauth_tokenScalarWhereInput = {
    AND?: oauth_tokenScalarWhereInput | oauth_tokenScalarWhereInput[]
    OR?: oauth_tokenScalarWhereInput[]
    NOT?: oauth_tokenScalarWhereInput | oauth_tokenScalarWhereInput[]
    id?: StringFilter<"oauth_token"> | string
    token?: StringFilter<"oauth_token"> | string
    user_id?: StringFilter<"oauth_token"> | string
    client_id?: StringFilter<"oauth_token"> | string
    scope?: StringNullableFilter<"oauth_token"> | string | null
    expires_at?: DateTimeNullableFilter<"oauth_token"> | Date | string | null
    created_at?: DateTimeFilter<"oauth_token"> | Date | string
  }

  export type refresh_tokenUpsertWithWhereUniqueWithoutUserInput = {
    where: refresh_tokenWhereUniqueInput
    update: XOR<refresh_tokenUpdateWithoutUserInput, refresh_tokenUncheckedUpdateWithoutUserInput>
    create: XOR<refresh_tokenCreateWithoutUserInput, refresh_tokenUncheckedCreateWithoutUserInput>
  }

  export type refresh_tokenUpdateWithWhereUniqueWithoutUserInput = {
    where: refresh_tokenWhereUniqueInput
    data: XOR<refresh_tokenUpdateWithoutUserInput, refresh_tokenUncheckedUpdateWithoutUserInput>
  }

  export type refresh_tokenUpdateManyWithWhereWithoutUserInput = {
    where: refresh_tokenScalarWhereInput
    data: XOR<refresh_tokenUpdateManyMutationInput, refresh_tokenUncheckedUpdateManyWithoutUserInput>
  }

  export type refresh_tokenScalarWhereInput = {
    AND?: refresh_tokenScalarWhereInput | refresh_tokenScalarWhereInput[]
    OR?: refresh_tokenScalarWhereInput[]
    NOT?: refresh_tokenScalarWhereInput | refresh_tokenScalarWhereInput[]
    id?: StringFilter<"refresh_token"> | string
    token?: StringFilter<"refresh_token"> | string
    user_id?: StringFilter<"refresh_token"> | string
    expires_at?: DateTimeFilter<"refresh_token"> | Date | string
    revoked_at?: DateTimeNullableFilter<"refresh_token"> | Date | string | null
    created_at?: DateTimeFilter<"refresh_token"> | Date | string
  }

  export type oauth_tokenCreateWithoutClientInput = {
    id?: string
    token: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
    user: userCreateNestedOneWithoutOauth_tokensInput
  }

  export type oauth_tokenUncheckedCreateWithoutClientInput = {
    id?: string
    token: string
    user_id: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type oauth_tokenCreateOrConnectWithoutClientInput = {
    where: oauth_tokenWhereUniqueInput
    create: XOR<oauth_tokenCreateWithoutClientInput, oauth_tokenUncheckedCreateWithoutClientInput>
  }

  export type oauth_tokenCreateManyClientInputEnvelope = {
    data: oauth_tokenCreateManyClientInput | oauth_tokenCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type oauth_tokenUpsertWithWhereUniqueWithoutClientInput = {
    where: oauth_tokenWhereUniqueInput
    update: XOR<oauth_tokenUpdateWithoutClientInput, oauth_tokenUncheckedUpdateWithoutClientInput>
    create: XOR<oauth_tokenCreateWithoutClientInput, oauth_tokenUncheckedCreateWithoutClientInput>
  }

  export type oauth_tokenUpdateWithWhereUniqueWithoutClientInput = {
    where: oauth_tokenWhereUniqueInput
    data: XOR<oauth_tokenUpdateWithoutClientInput, oauth_tokenUncheckedUpdateWithoutClientInput>
  }

  export type oauth_tokenUpdateManyWithWhereWithoutClientInput = {
    where: oauth_tokenScalarWhereInput
    data: XOR<oauth_tokenUpdateManyMutationInput, oauth_tokenUncheckedUpdateManyWithoutClientInput>
  }

  export type userCreateWithoutOauth_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: refresh_tokenCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutOauth_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: refresh_tokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutOauth_tokensInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutOauth_tokensInput, userUncheckedCreateWithoutOauth_tokensInput>
  }

  export type oauth_clientCreateWithoutOauth_tokensInput = {
    id?: string
    client_id: string
    client_secret: string
    name: string
    redirect_uris: string
    scopes: string
    grant_types: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type oauth_clientUncheckedCreateWithoutOauth_tokensInput = {
    id?: string
    client_id: string
    client_secret: string
    name: string
    redirect_uris: string
    scopes: string
    grant_types: string
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type oauth_clientCreateOrConnectWithoutOauth_tokensInput = {
    where: oauth_clientWhereUniqueInput
    create: XOR<oauth_clientCreateWithoutOauth_tokensInput, oauth_clientUncheckedCreateWithoutOauth_tokensInput>
  }

  export type userUpsertWithoutOauth_tokensInput = {
    update: XOR<userUpdateWithoutOauth_tokensInput, userUncheckedUpdateWithoutOauth_tokensInput>
    create: XOR<userCreateWithoutOauth_tokensInput, userUncheckedCreateWithoutOauth_tokensInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutOauth_tokensInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutOauth_tokensInput, userUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type userUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: refresh_tokenUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: refresh_tokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type oauth_clientUpsertWithoutOauth_tokensInput = {
    update: XOR<oauth_clientUpdateWithoutOauth_tokensInput, oauth_clientUncheckedUpdateWithoutOauth_tokensInput>
    create: XOR<oauth_clientCreateWithoutOauth_tokensInput, oauth_clientUncheckedCreateWithoutOauth_tokensInput>
    where?: oauth_clientWhereInput
  }

  export type oauth_clientUpdateToOneWithWhereWithoutOauth_tokensInput = {
    where?: oauth_clientWhereInput
    data: XOR<oauth_clientUpdateWithoutOauth_tokensInput, oauth_clientUncheckedUpdateWithoutOauth_tokensInput>
  }

  export type oauth_clientUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    redirect_uris?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    grant_types?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_clientUncheckedUpdateWithoutOauth_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    redirect_uris?: StringFieldUpdateOperationsInput | string
    scopes?: StringFieldUpdateOperationsInput | string
    grant_types?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userCreateWithoutRefresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    oauth_tokens?: oauth_tokenCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutRefresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    oauth_tokens?: oauth_tokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutRefresh_tokensInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutRefresh_tokensInput, userUncheckedCreateWithoutRefresh_tokensInput>
  }

  export type userUpsertWithoutRefresh_tokensInput = {
    update: XOR<userUpdateWithoutRefresh_tokensInput, userUncheckedUpdateWithoutRefresh_tokensInput>
    create: XOR<userCreateWithoutRefresh_tokensInput, userUncheckedCreateWithoutRefresh_tokensInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutRefresh_tokensInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutRefresh_tokensInput, userUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type userUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    oauth_tokens?: oauth_tokenUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    oauth_tokens?: oauth_tokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type oauth_tokenCreateManyUserInput = {
    id?: string
    token: string
    client_id: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type refresh_tokenCreateManyUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type oauth_tokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: oauth_clientUpdateOneRequiredWithoutOauth_tokensNestedInput
  }

  export type oauth_tokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_tokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type refresh_tokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type refresh_tokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type refresh_tokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_tokenCreateManyClientInput = {
    id?: string
    token: string
    user_id: string
    scope?: string | null
    expires_at?: Date | string | null
    created_at?: Date | string
  }

  export type oauth_tokenUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: userUpdateOneRequiredWithoutOauth_tokensNestedInput
  }

  export type oauth_tokenUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type oauth_tokenUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}