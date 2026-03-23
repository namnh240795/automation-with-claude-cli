
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model OAuthClient
 * 
 */
export type OAuthClient = $Result.DefaultSelection<Prisma.$OAuthClientPayload>
/**
 * Model OAuthAuthorizationCode
 * 
 */
export type OAuthAuthorizationCode = $Result.DefaultSelection<Prisma.$OAuthAuthorizationCodePayload>
/**
 * Model OAuthAccessToken
 * 
 */
export type OAuthAccessToken = $Result.DefaultSelection<Prisma.$OAuthAccessTokenPayload>
/**
 * Model OAuthRefreshToken
 * 
 */
export type OAuthRefreshToken = $Result.DefaultSelection<Prisma.$OAuthRefreshTokenPayload>
/**
 * Model OAuthDeviceCode
 * 
 */
export type OAuthDeviceCode = $Result.DefaultSelection<Prisma.$OAuthDeviceCodePayload>
/**
 * Model OAuthUserConsent
 * 
 */
export type OAuthUserConsent = $Result.DefaultSelection<Prisma.$OAuthUserConsentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthClient`: Exposes CRUD operations for the **OAuthClient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthClients
    * const oAuthClients = await prisma.oAuthClient.findMany()
    * ```
    */
  get oAuthClient(): Prisma.OAuthClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthAuthorizationCode`: Exposes CRUD operations for the **OAuthAuthorizationCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthAuthorizationCodes
    * const oAuthAuthorizationCodes = await prisma.oAuthAuthorizationCode.findMany()
    * ```
    */
  get oAuthAuthorizationCode(): Prisma.OAuthAuthorizationCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthAccessToken`: Exposes CRUD operations for the **OAuthAccessToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthAccessTokens
    * const oAuthAccessTokens = await prisma.oAuthAccessToken.findMany()
    * ```
    */
  get oAuthAccessToken(): Prisma.OAuthAccessTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthRefreshToken`: Exposes CRUD operations for the **OAuthRefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthRefreshTokens
    * const oAuthRefreshTokens = await prisma.oAuthRefreshToken.findMany()
    * ```
    */
  get oAuthRefreshToken(): Prisma.OAuthRefreshTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthDeviceCode`: Exposes CRUD operations for the **OAuthDeviceCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthDeviceCodes
    * const oAuthDeviceCodes = await prisma.oAuthDeviceCode.findMany()
    * ```
    */
  get oAuthDeviceCode(): Prisma.OAuthDeviceCodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthUserConsent`: Exposes CRUD operations for the **OAuthUserConsent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthUserConsents
    * const oAuthUserConsents = await prisma.oAuthUserConsent.findMany()
    * ```
    */
  get oAuthUserConsent(): Prisma.OAuthUserConsentDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
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
    User: 'User',
    RefreshToken: 'RefreshToken',
    Session: 'Session',
    OAuthClient: 'OAuthClient',
    OAuthAuthorizationCode: 'OAuthAuthorizationCode',
    OAuthAccessToken: 'OAuthAccessToken',
    OAuthRefreshToken: 'OAuthRefreshToken',
    OAuthDeviceCode: 'OAuthDeviceCode',
    OAuthUserConsent: 'OAuthUserConsent'
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
      modelProps: "user" | "refreshToken" | "session" | "oAuthClient" | "oAuthAuthorizationCode" | "oAuthAccessToken" | "oAuthRefreshToken" | "oAuthDeviceCode" | "oAuthUserConsent"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      OAuthClient: {
        payload: Prisma.$OAuthClientPayload<ExtArgs>
        fields: Prisma.OAuthClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          findFirst: {
            args: Prisma.OAuthClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          findMany: {
            args: Prisma.OAuthClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>[]
          }
          create: {
            args: Prisma.OAuthClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          createMany: {
            args: Prisma.OAuthClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthClientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>[]
          }
          delete: {
            args: Prisma.OAuthClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          update: {
            args: Prisma.OAuthClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          deleteMany: {
            args: Prisma.OAuthClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthClientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>[]
          }
          upsert: {
            args: Prisma.OAuthClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthClientPayload>
          }
          aggregate: {
            args: Prisma.OAuthClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthClient>
          }
          groupBy: {
            args: Prisma.OAuthClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthClientCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthClientCountAggregateOutputType> | number
          }
        }
      }
      OAuthAuthorizationCode: {
        payload: Prisma.$OAuthAuthorizationCodePayload<ExtArgs>
        fields: Prisma.OAuthAuthorizationCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthAuthorizationCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthAuthorizationCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          findFirst: {
            args: Prisma.OAuthAuthorizationCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthAuthorizationCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          findMany: {
            args: Prisma.OAuthAuthorizationCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>[]
          }
          create: {
            args: Prisma.OAuthAuthorizationCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          createMany: {
            args: Prisma.OAuthAuthorizationCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthAuthorizationCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>[]
          }
          delete: {
            args: Prisma.OAuthAuthorizationCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          update: {
            args: Prisma.OAuthAuthorizationCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          deleteMany: {
            args: Prisma.OAuthAuthorizationCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthAuthorizationCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthAuthorizationCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>[]
          }
          upsert: {
            args: Prisma.OAuthAuthorizationCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAuthorizationCodePayload>
          }
          aggregate: {
            args: Prisma.OAuthAuthorizationCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthAuthorizationCode>
          }
          groupBy: {
            args: Prisma.OAuthAuthorizationCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthAuthorizationCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthAuthorizationCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthAuthorizationCodeCountAggregateOutputType> | number
          }
        }
      }
      OAuthAccessToken: {
        payload: Prisma.$OAuthAccessTokenPayload<ExtArgs>
        fields: Prisma.OAuthAccessTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthAccessTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthAccessTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>
          }
          findFirst: {
            args: Prisma.OAuthAccessTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthAccessTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>
          }
          findMany: {
            args: Prisma.OAuthAccessTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>[]
          }
          create: {
            args: Prisma.OAuthAccessTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>
          }
          createMany: {
            args: Prisma.OAuthAccessTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthAccessTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>[]
          }
          delete: {
            args: Prisma.OAuthAccessTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>
          }
          update: {
            args: Prisma.OAuthAccessTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>
          }
          deleteMany: {
            args: Prisma.OAuthAccessTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthAccessTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthAccessTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>[]
          }
          upsert: {
            args: Prisma.OAuthAccessTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthAccessTokenPayload>
          }
          aggregate: {
            args: Prisma.OAuthAccessTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthAccessToken>
          }
          groupBy: {
            args: Prisma.OAuthAccessTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthAccessTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthAccessTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthAccessTokenCountAggregateOutputType> | number
          }
        }
      }
      OAuthRefreshToken: {
        payload: Prisma.$OAuthRefreshTokenPayload<ExtArgs>
        fields: Prisma.OAuthRefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthRefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthRefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.OAuthRefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthRefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>
          }
          findMany: {
            args: Prisma.OAuthRefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>[]
          }
          create: {
            args: Prisma.OAuthRefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>
          }
          createMany: {
            args: Prisma.OAuthRefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthRefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.OAuthRefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>
          }
          update: {
            args: Prisma.OAuthRefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.OAuthRefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthRefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthRefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.OAuthRefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthRefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.OAuthRefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthRefreshToken>
          }
          groupBy: {
            args: Prisma.OAuthRefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthRefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthRefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthRefreshTokenCountAggregateOutputType> | number
          }
        }
      }
      OAuthDeviceCode: {
        payload: Prisma.$OAuthDeviceCodePayload<ExtArgs>
        fields: Prisma.OAuthDeviceCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthDeviceCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthDeviceCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>
          }
          findFirst: {
            args: Prisma.OAuthDeviceCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthDeviceCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>
          }
          findMany: {
            args: Prisma.OAuthDeviceCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>[]
          }
          create: {
            args: Prisma.OAuthDeviceCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>
          }
          createMany: {
            args: Prisma.OAuthDeviceCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthDeviceCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>[]
          }
          delete: {
            args: Prisma.OAuthDeviceCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>
          }
          update: {
            args: Prisma.OAuthDeviceCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>
          }
          deleteMany: {
            args: Prisma.OAuthDeviceCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthDeviceCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthDeviceCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>[]
          }
          upsert: {
            args: Prisma.OAuthDeviceCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthDeviceCodePayload>
          }
          aggregate: {
            args: Prisma.OAuthDeviceCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthDeviceCode>
          }
          groupBy: {
            args: Prisma.OAuthDeviceCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthDeviceCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthDeviceCodeCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthDeviceCodeCountAggregateOutputType> | number
          }
        }
      }
      OAuthUserConsent: {
        payload: Prisma.$OAuthUserConsentPayload<ExtArgs>
        fields: Prisma.OAuthUserConsentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthUserConsentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthUserConsentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>
          }
          findFirst: {
            args: Prisma.OAuthUserConsentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthUserConsentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>
          }
          findMany: {
            args: Prisma.OAuthUserConsentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>[]
          }
          create: {
            args: Prisma.OAuthUserConsentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>
          }
          createMany: {
            args: Prisma.OAuthUserConsentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthUserConsentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>[]
          }
          delete: {
            args: Prisma.OAuthUserConsentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>
          }
          update: {
            args: Prisma.OAuthUserConsentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>
          }
          deleteMany: {
            args: Prisma.OAuthUserConsentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthUserConsentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthUserConsentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>[]
          }
          upsert: {
            args: Prisma.OAuthUserConsentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthUserConsentPayload>
          }
          aggregate: {
            args: Prisma.OAuthUserConsentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthUserConsent>
          }
          groupBy: {
            args: Prisma.OAuthUserConsentGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthUserConsentGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthUserConsentCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthUserConsentCountAggregateOutputType> | number
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
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    session?: SessionOmit
    oAuthClient?: OAuthClientOmit
    oAuthAuthorizationCode?: OAuthAuthorizationCodeOmit
    oAuthAccessToken?: OAuthAccessTokenOmit
    oAuthRefreshToken?: OAuthRefreshTokenOmit
    oAuthDeviceCode?: OAuthDeviceCodeOmit
    oAuthUserConsent?: OAuthUserConsentOmit
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
    refresh_tokens: number
    sessions: number
    oauth_authorization_codes: number
    oauth_access_tokens: number
    oauth_refresh_tokens: number
    oauth_device_codes: number
    oauth_consents: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refresh_tokens?: boolean | UserCountOutputTypeCountRefresh_tokensArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    oauth_authorization_codes?: boolean | UserCountOutputTypeCountOauth_authorization_codesArgs
    oauth_access_tokens?: boolean | UserCountOutputTypeCountOauth_access_tokensArgs
    oauth_refresh_tokens?: boolean | UserCountOutputTypeCountOauth_refresh_tokensArgs
    oauth_device_codes?: boolean | UserCountOutputTypeCountOauth_device_codesArgs
    oauth_consents?: boolean | UserCountOutputTypeCountOauth_consentsArgs
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
  export type UserCountOutputTypeCountRefresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth_authorization_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAuthorizationCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth_access_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAccessTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth_refresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthRefreshTokenWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth_device_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthDeviceCodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOauth_consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthUserConsentWhereInput
  }


  /**
   * Count Type OAuthClientCountOutputType
   */

  export type OAuthClientCountOutputType = {
    authorization_codes: number
    access_tokens: number
    refresh_tokens: number
    device_codes: number
    user_consents: number
  }

  export type OAuthClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authorization_codes?: boolean | OAuthClientCountOutputTypeCountAuthorization_codesArgs
    access_tokens?: boolean | OAuthClientCountOutputTypeCountAccess_tokensArgs
    refresh_tokens?: boolean | OAuthClientCountOutputTypeCountRefresh_tokensArgs
    device_codes?: boolean | OAuthClientCountOutputTypeCountDevice_codesArgs
    user_consents?: boolean | OAuthClientCountOutputTypeCountUser_consentsArgs
  }

  // Custom InputTypes
  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClientCountOutputType
     */
    select?: OAuthClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeCountAuthorization_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAuthorizationCodeWhereInput
  }

  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeCountAccess_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAccessTokenWhereInput
  }

  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeCountRefresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthRefreshTokenWhereInput
  }

  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeCountDevice_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthDeviceCodeWhereInput
  }

  /**
   * OAuthClientCountOutputType without action
   */
  export type OAuthClientCountOutputTypeCountUser_consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthUserConsentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
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
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
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

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
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


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password_hash?: boolean
    first_name?: boolean
    last_name?: boolean
    is_active?: boolean
    email_verified?: boolean
    created_at?: boolean
    updated_at?: boolean
    refresh_tokens?: boolean | User$refresh_tokensArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    oauth_authorization_codes?: boolean | User$oauth_authorization_codesArgs<ExtArgs>
    oauth_access_tokens?: boolean | User$oauth_access_tokensArgs<ExtArgs>
    oauth_refresh_tokens?: boolean | User$oauth_refresh_tokensArgs<ExtArgs>
    oauth_device_codes?: boolean | User$oauth_device_codesArgs<ExtArgs>
    oauth_consents?: boolean | User$oauth_consentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
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

  export type UserSelectScalar = {
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

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password_hash" | "first_name" | "last_name" | "is_active" | "email_verified" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    refresh_tokens?: boolean | User$refresh_tokensArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    oauth_authorization_codes?: boolean | User$oauth_authorization_codesArgs<ExtArgs>
    oauth_access_tokens?: boolean | User$oauth_access_tokensArgs<ExtArgs>
    oauth_refresh_tokens?: boolean | User$oauth_refresh_tokensArgs<ExtArgs>
    oauth_device_codes?: boolean | User$oauth_device_codesArgs<ExtArgs>
    oauth_consents?: boolean | User$oauth_consentsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      refresh_tokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      oauth_authorization_codes: Prisma.$OAuthAuthorizationCodePayload<ExtArgs>[]
      oauth_access_tokens: Prisma.$OAuthAccessTokenPayload<ExtArgs>[]
      oauth_refresh_tokens: Prisma.$OAuthRefreshTokenPayload<ExtArgs>[]
      oauth_device_codes: Prisma.$OAuthDeviceCodePayload<ExtArgs>[]
      oauth_consents: Prisma.$OAuthUserConsentPayload<ExtArgs>[]
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

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
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
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    refresh_tokens<T extends User$refresh_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refresh_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauth_authorization_codes<T extends User$oauth_authorization_codesArgs<ExtArgs> = {}>(args?: Subset<T, User$oauth_authorization_codesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauth_access_tokens<T extends User$oauth_access_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$oauth_access_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauth_refresh_tokens<T extends User$oauth_refresh_tokensArgs<ExtArgs> = {}>(args?: Subset<T, User$oauth_refresh_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauth_device_codes<T extends User$oauth_device_codesArgs<ExtArgs> = {}>(args?: Subset<T, User$oauth_device_codesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    oauth_consents<T extends User$oauth_consentsArgs<ExtArgs> = {}>(args?: Subset<T, User$oauth_consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly is_active: FieldRef<"User", 'Boolean'>
    readonly email_verified: FieldRef<"User", 'Boolean'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.refresh_tokens
   */
  export type User$refresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.oauth_authorization_codes
   */
  export type User$oauth_authorization_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    where?: OAuthAuthorizationCodeWhereInput
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * User.oauth_access_tokens
   */
  export type User$oauth_access_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    where?: OAuthAccessTokenWhereInput
    orderBy?: OAuthAccessTokenOrderByWithRelationInput | OAuthAccessTokenOrderByWithRelationInput[]
    cursor?: OAuthAccessTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAccessTokenScalarFieldEnum | OAuthAccessTokenScalarFieldEnum[]
  }

  /**
   * User.oauth_refresh_tokens
   */
  export type User$oauth_refresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    where?: OAuthRefreshTokenWhereInput
    orderBy?: OAuthRefreshTokenOrderByWithRelationInput | OAuthRefreshTokenOrderByWithRelationInput[]
    cursor?: OAuthRefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthRefreshTokenScalarFieldEnum | OAuthRefreshTokenScalarFieldEnum[]
  }

  /**
   * User.oauth_device_codes
   */
  export type User$oauth_device_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    where?: OAuthDeviceCodeWhereInput
    orderBy?: OAuthDeviceCodeOrderByWithRelationInput | OAuthDeviceCodeOrderByWithRelationInput[]
    cursor?: OAuthDeviceCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthDeviceCodeScalarFieldEnum | OAuthDeviceCodeScalarFieldEnum[]
  }

  /**
   * User.oauth_consents
   */
  export type User$oauth_consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    where?: OAuthUserConsentWhereInput
    orderBy?: OAuthUserConsentOrderByWithRelationInput | OAuthUserConsentOrderByWithRelationInput[]
    cursor?: OAuthUserConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthUserConsentScalarFieldEnum | OAuthUserConsentScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    expires_at: Date | null
    created_at: Date | null
    revoked_at: Date | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    user_id: string | null
    expires_at: Date | null
    created_at: Date | null
    revoked_at: Date | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    user_id: number
    expires_at: number
    created_at: number
    revoked_at: number
    _all: number
  }


  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    expires_at?: true
    created_at?: true
    revoked_at?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    expires_at?: true
    created_at?: true
    revoked_at?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    user_id?: true
    expires_at?: true
    created_at?: true
    revoked_at?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: string
    token: string
    user_id: string
    expires_at: Date
    created_at: Date
    revoked_at: Date | null
    _count: RefreshTokenCountAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    user_id?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "user_id" | "expires_at" | "created_at" | "revoked_at", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      user_id: string
      expires_at: Date
      created_at: Date
      revoked_at: Date | null
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'String'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly user_id: FieldRef<"RefreshToken", 'String'>
    readonly expires_at: FieldRef<"RefreshToken", 'DateTime'>
    readonly created_at: FieldRef<"RefreshToken", 'DateTime'>
    readonly revoked_at: FieldRef<"RefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
    revoked_at: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    token: string | null
    expires_at: Date | null
    created_at: Date | null
    revoked_at: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    user_id: number
    token: number
    expires_at: number
    created_at: number
    revoked_at: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
    revoked_at?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
    revoked_at?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    user_id?: true
    token?: true
    expires_at?: true
    created_at?: true
    revoked_at?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    user_id: string
    token: string
    expires_at: Date
    created_at: Date
    revoked_at: Date | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    user_id?: boolean
    token?: boolean
    expires_at?: boolean
    created_at?: boolean
    revoked_at?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "token" | "expires_at" | "created_at" | "revoked_at", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      token: string
      expires_at: Date
      created_at: Date
      revoked_at: Date | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
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
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly user_id: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expires_at: FieldRef<"Session", 'DateTime'>
    readonly created_at: FieldRef<"Session", 'DateTime'>
    readonly revoked_at: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model OAuthClient
   */

  export type AggregateOAuthClient = {
    _count: OAuthClientCountAggregateOutputType | null
    _avg: OAuthClientAvgAggregateOutputType | null
    _sum: OAuthClientSumAggregateOutputType | null
    _min: OAuthClientMinAggregateOutputType | null
    _max: OAuthClientMaxAggregateOutputType | null
  }

  export type OAuthClientAvgAggregateOutputType = {
    access_token_lifetime: number | null
    refresh_token_lifetime: number | null
  }

  export type OAuthClientSumAggregateOutputType = {
    access_token_lifetime: number | null
    refresh_token_lifetime: number | null
  }

  export type OAuthClientMinAggregateOutputType = {
    id: string | null
    client_id: string | null
    client_secret: string | null
    client_secret_hash: string | null
    name: string | null
    description: string | null
    is_confidential: boolean | null
    is_public_client: boolean | null
    require_pkce: boolean | null
    access_token_lifetime: number | null
    refresh_token_lifetime: number | null
    logo_uri: string | null
    policy_uri: string | null
    tos_uri: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OAuthClientMaxAggregateOutputType = {
    id: string | null
    client_id: string | null
    client_secret: string | null
    client_secret_hash: string | null
    name: string | null
    description: string | null
    is_confidential: boolean | null
    is_public_client: boolean | null
    require_pkce: boolean | null
    access_token_lifetime: number | null
    refresh_token_lifetime: number | null
    logo_uri: string | null
    policy_uri: string | null
    tos_uri: string | null
    is_active: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OAuthClientCountAggregateOutputType = {
    id: number
    client_id: number
    client_secret: number
    client_secret_hash: number
    name: number
    description: number
    redirect_uris: number
    post_logout_redirect_uris: number
    scopes: number
    grant_types: number
    is_confidential: number
    is_public_client: number
    require_pkce: number
    access_token_lifetime: number
    refresh_token_lifetime: number
    allowed_origins: number
    logo_uri: number
    policy_uri: number
    tos_uri: number
    is_active: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OAuthClientAvgAggregateInputType = {
    access_token_lifetime?: true
    refresh_token_lifetime?: true
  }

  export type OAuthClientSumAggregateInputType = {
    access_token_lifetime?: true
    refresh_token_lifetime?: true
  }

  export type OAuthClientMinAggregateInputType = {
    id?: true
    client_id?: true
    client_secret?: true
    client_secret_hash?: true
    name?: true
    description?: true
    is_confidential?: true
    is_public_client?: true
    require_pkce?: true
    access_token_lifetime?: true
    refresh_token_lifetime?: true
    logo_uri?: true
    policy_uri?: true
    tos_uri?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type OAuthClientMaxAggregateInputType = {
    id?: true
    client_id?: true
    client_secret?: true
    client_secret_hash?: true
    name?: true
    description?: true
    is_confidential?: true
    is_public_client?: true
    require_pkce?: true
    access_token_lifetime?: true
    refresh_token_lifetime?: true
    logo_uri?: true
    policy_uri?: true
    tos_uri?: true
    is_active?: true
    created_at?: true
    updated_at?: true
  }

  export type OAuthClientCountAggregateInputType = {
    id?: true
    client_id?: true
    client_secret?: true
    client_secret_hash?: true
    name?: true
    description?: true
    redirect_uris?: true
    post_logout_redirect_uris?: true
    scopes?: true
    grant_types?: true
    is_confidential?: true
    is_public_client?: true
    require_pkce?: true
    access_token_lifetime?: true
    refresh_token_lifetime?: true
    allowed_origins?: true
    logo_uri?: true
    policy_uri?: true
    tos_uri?: true
    is_active?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OAuthClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthClient to aggregate.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthClients
    **/
    _count?: true | OAuthClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OAuthClientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OAuthClientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthClientMaxAggregateInputType
  }

  export type GetOAuthClientAggregateType<T extends OAuthClientAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthClient[P]>
      : GetScalarType<T[P], AggregateOAuthClient[P]>
  }




  export type OAuthClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthClientWhereInput
    orderBy?: OAuthClientOrderByWithAggregationInput | OAuthClientOrderByWithAggregationInput[]
    by: OAuthClientScalarFieldEnum[] | OAuthClientScalarFieldEnum
    having?: OAuthClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthClientCountAggregateInputType | true
    _avg?: OAuthClientAvgAggregateInputType
    _sum?: OAuthClientSumAggregateInputType
    _min?: OAuthClientMinAggregateInputType
    _max?: OAuthClientMaxAggregateInputType
  }

  export type OAuthClientGroupByOutputType = {
    id: string
    client_id: string
    client_secret: string | null
    client_secret_hash: string | null
    name: string
    description: string | null
    redirect_uris: string[]
    post_logout_redirect_uris: string[]
    scopes: string[]
    grant_types: string[]
    is_confidential: boolean
    is_public_client: boolean
    require_pkce: boolean
    access_token_lifetime: number
    refresh_token_lifetime: number
    allowed_origins: string[]
    logo_uri: string | null
    policy_uri: string | null
    tos_uri: string | null
    is_active: boolean
    created_at: Date
    updated_at: Date
    _count: OAuthClientCountAggregateOutputType | null
    _avg: OAuthClientAvgAggregateOutputType | null
    _sum: OAuthClientSumAggregateOutputType | null
    _min: OAuthClientMinAggregateOutputType | null
    _max: OAuthClientMaxAggregateOutputType | null
  }

  type GetOAuthClientGroupByPayload<T extends OAuthClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthClientGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthClientGroupByOutputType[P]>
        }
      >
    >


  export type OAuthClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    client_secret_hash?: boolean
    name?: boolean
    description?: boolean
    redirect_uris?: boolean
    post_logout_redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: boolean
    refresh_token_lifetime?: boolean
    allowed_origins?: boolean
    logo_uri?: boolean
    policy_uri?: boolean
    tos_uri?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
    authorization_codes?: boolean | OAuthClient$authorization_codesArgs<ExtArgs>
    access_tokens?: boolean | OAuthClient$access_tokensArgs<ExtArgs>
    refresh_tokens?: boolean | OAuthClient$refresh_tokensArgs<ExtArgs>
    device_codes?: boolean | OAuthClient$device_codesArgs<ExtArgs>
    user_consents?: boolean | OAuthClient$user_consentsArgs<ExtArgs>
    _count?: boolean | OAuthClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthClient"]>

  export type OAuthClientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    client_secret_hash?: boolean
    name?: boolean
    description?: boolean
    redirect_uris?: boolean
    post_logout_redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: boolean
    refresh_token_lifetime?: boolean
    allowed_origins?: boolean
    logo_uri?: boolean
    policy_uri?: boolean
    tos_uri?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["oAuthClient"]>

  export type OAuthClientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    client_secret_hash?: boolean
    name?: boolean
    description?: boolean
    redirect_uris?: boolean
    post_logout_redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: boolean
    refresh_token_lifetime?: boolean
    allowed_origins?: boolean
    logo_uri?: boolean
    policy_uri?: boolean
    tos_uri?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["oAuthClient"]>

  export type OAuthClientSelectScalar = {
    id?: boolean
    client_id?: boolean
    client_secret?: boolean
    client_secret_hash?: boolean
    name?: boolean
    description?: boolean
    redirect_uris?: boolean
    post_logout_redirect_uris?: boolean
    scopes?: boolean
    grant_types?: boolean
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: boolean
    refresh_token_lifetime?: boolean
    allowed_origins?: boolean
    logo_uri?: boolean
    policy_uri?: boolean
    tos_uri?: boolean
    is_active?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OAuthClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "client_id" | "client_secret" | "client_secret_hash" | "name" | "description" | "redirect_uris" | "post_logout_redirect_uris" | "scopes" | "grant_types" | "is_confidential" | "is_public_client" | "require_pkce" | "access_token_lifetime" | "refresh_token_lifetime" | "allowed_origins" | "logo_uri" | "policy_uri" | "tos_uri" | "is_active" | "created_at" | "updated_at", ExtArgs["result"]["oAuthClient"]>
  export type OAuthClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    authorization_codes?: boolean | OAuthClient$authorization_codesArgs<ExtArgs>
    access_tokens?: boolean | OAuthClient$access_tokensArgs<ExtArgs>
    refresh_tokens?: boolean | OAuthClient$refresh_tokensArgs<ExtArgs>
    device_codes?: boolean | OAuthClient$device_codesArgs<ExtArgs>
    user_consents?: boolean | OAuthClient$user_consentsArgs<ExtArgs>
    _count?: boolean | OAuthClientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OAuthClientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OAuthClientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OAuthClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthClient"
    objects: {
      authorization_codes: Prisma.$OAuthAuthorizationCodePayload<ExtArgs>[]
      access_tokens: Prisma.$OAuthAccessTokenPayload<ExtArgs>[]
      refresh_tokens: Prisma.$OAuthRefreshTokenPayload<ExtArgs>[]
      device_codes: Prisma.$OAuthDeviceCodePayload<ExtArgs>[]
      user_consents: Prisma.$OAuthUserConsentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      client_id: string
      client_secret: string | null
      client_secret_hash: string | null
      name: string
      description: string | null
      redirect_uris: string[]
      post_logout_redirect_uris: string[]
      scopes: string[]
      grant_types: string[]
      is_confidential: boolean
      is_public_client: boolean
      require_pkce: boolean
      access_token_lifetime: number
      refresh_token_lifetime: number
      allowed_origins: string[]
      logo_uri: string | null
      policy_uri: string | null
      tos_uri: string | null
      is_active: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["oAuthClient"]>
    composites: {}
  }

  type OAuthClientGetPayload<S extends boolean | null | undefined | OAuthClientDefaultArgs> = $Result.GetResult<Prisma.$OAuthClientPayload, S>

  type OAuthClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthClientCountAggregateInputType | true
    }

  export interface OAuthClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthClient'], meta: { name: 'OAuthClient' } }
    /**
     * Find zero or one OAuthClient that matches the filter.
     * @param {OAuthClientFindUniqueArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthClientFindUniqueArgs>(args: SelectSubset<T, OAuthClientFindUniqueArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthClient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthClientFindUniqueOrThrowArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthClientFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthClient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientFindFirstArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthClientFindFirstArgs>(args?: SelectSubset<T, OAuthClientFindFirstArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthClient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientFindFirstOrThrowArgs} args - Arguments to find a OAuthClient
     * @example
     * // Get one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthClientFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthClients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthClients
     * const oAuthClients = await prisma.oAuthClient.findMany()
     * 
     * // Get first 10 OAuthClients
     * const oAuthClients = await prisma.oAuthClient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthClientWithIdOnly = await prisma.oAuthClient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthClientFindManyArgs>(args?: SelectSubset<T, OAuthClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthClient.
     * @param {OAuthClientCreateArgs} args - Arguments to create a OAuthClient.
     * @example
     * // Create one OAuthClient
     * const OAuthClient = await prisma.oAuthClient.create({
     *   data: {
     *     // ... data to create a OAuthClient
     *   }
     * })
     * 
     */
    create<T extends OAuthClientCreateArgs>(args: SelectSubset<T, OAuthClientCreateArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthClients.
     * @param {OAuthClientCreateManyArgs} args - Arguments to create many OAuthClients.
     * @example
     * // Create many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthClientCreateManyArgs>(args?: SelectSubset<T, OAuthClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthClients and returns the data saved in the database.
     * @param {OAuthClientCreateManyAndReturnArgs} args - Arguments to create many OAuthClients.
     * @example
     * // Create many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthClients and only return the `id`
     * const oAuthClientWithIdOnly = await prisma.oAuthClient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthClientCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthClientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthClient.
     * @param {OAuthClientDeleteArgs} args - Arguments to delete one OAuthClient.
     * @example
     * // Delete one OAuthClient
     * const OAuthClient = await prisma.oAuthClient.delete({
     *   where: {
     *     // ... filter to delete one OAuthClient
     *   }
     * })
     * 
     */
    delete<T extends OAuthClientDeleteArgs>(args: SelectSubset<T, OAuthClientDeleteArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthClient.
     * @param {OAuthClientUpdateArgs} args - Arguments to update one OAuthClient.
     * @example
     * // Update one OAuthClient
     * const oAuthClient = await prisma.oAuthClient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthClientUpdateArgs>(args: SelectSubset<T, OAuthClientUpdateArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthClients.
     * @param {OAuthClientDeleteManyArgs} args - Arguments to filter OAuthClients to delete.
     * @example
     * // Delete a few OAuthClients
     * const { count } = await prisma.oAuthClient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthClientDeleteManyArgs>(args?: SelectSubset<T, OAuthClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthClientUpdateManyArgs>(args: SelectSubset<T, OAuthClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthClients and returns the data updated in the database.
     * @param {OAuthClientUpdateManyAndReturnArgs} args - Arguments to update many OAuthClients.
     * @example
     * // Update many OAuthClients
     * const oAuthClient = await prisma.oAuthClient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthClients and only return the `id`
     * const oAuthClientWithIdOnly = await prisma.oAuthClient.updateManyAndReturn({
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
    updateManyAndReturn<T extends OAuthClientUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthClientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthClient.
     * @param {OAuthClientUpsertArgs} args - Arguments to update or create a OAuthClient.
     * @example
     * // Update or create a OAuthClient
     * const oAuthClient = await prisma.oAuthClient.upsert({
     *   create: {
     *     // ... data to create a OAuthClient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthClient we want to update
     *   }
     * })
     */
    upsert<T extends OAuthClientUpsertArgs>(args: SelectSubset<T, OAuthClientUpsertArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthClients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientCountArgs} args - Arguments to filter OAuthClients to count.
     * @example
     * // Count the number of OAuthClients
     * const count = await prisma.oAuthClient.count({
     *   where: {
     *     // ... the filter for the OAuthClients we want to count
     *   }
     * })
    **/
    count<T extends OAuthClientCountArgs>(
      args?: Subset<T, OAuthClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OAuthClientAggregateArgs>(args: Subset<T, OAuthClientAggregateArgs>): Prisma.PrismaPromise<GetOAuthClientAggregateType<T>>

    /**
     * Group by OAuthClient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthClientGroupByArgs} args - Group by arguments.
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
      T extends OAuthClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthClientGroupByArgs['orderBy'] }
        : { orderBy?: OAuthClientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OAuthClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthClient model
   */
  readonly fields: OAuthClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthClient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    authorization_codes<T extends OAuthClient$authorization_codesArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClient$authorization_codesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    access_tokens<T extends OAuthClient$access_tokensArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClient$access_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refresh_tokens<T extends OAuthClient$refresh_tokensArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClient$refresh_tokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    device_codes<T extends OAuthClient$device_codesArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClient$device_codesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_consents<T extends OAuthClient$user_consentsArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClient$user_consentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the OAuthClient model
   */
  interface OAuthClientFieldRefs {
    readonly id: FieldRef<"OAuthClient", 'String'>
    readonly client_id: FieldRef<"OAuthClient", 'String'>
    readonly client_secret: FieldRef<"OAuthClient", 'String'>
    readonly client_secret_hash: FieldRef<"OAuthClient", 'String'>
    readonly name: FieldRef<"OAuthClient", 'String'>
    readonly description: FieldRef<"OAuthClient", 'String'>
    readonly redirect_uris: FieldRef<"OAuthClient", 'String[]'>
    readonly post_logout_redirect_uris: FieldRef<"OAuthClient", 'String[]'>
    readonly scopes: FieldRef<"OAuthClient", 'String[]'>
    readonly grant_types: FieldRef<"OAuthClient", 'String[]'>
    readonly is_confidential: FieldRef<"OAuthClient", 'Boolean'>
    readonly is_public_client: FieldRef<"OAuthClient", 'Boolean'>
    readonly require_pkce: FieldRef<"OAuthClient", 'Boolean'>
    readonly access_token_lifetime: FieldRef<"OAuthClient", 'Int'>
    readonly refresh_token_lifetime: FieldRef<"OAuthClient", 'Int'>
    readonly allowed_origins: FieldRef<"OAuthClient", 'String[]'>
    readonly logo_uri: FieldRef<"OAuthClient", 'String'>
    readonly policy_uri: FieldRef<"OAuthClient", 'String'>
    readonly tos_uri: FieldRef<"OAuthClient", 'String'>
    readonly is_active: FieldRef<"OAuthClient", 'Boolean'>
    readonly created_at: FieldRef<"OAuthClient", 'DateTime'>
    readonly updated_at: FieldRef<"OAuthClient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthClient findUnique
   */
  export type OAuthClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient findUniqueOrThrow
   */
  export type OAuthClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient findFirst
   */
  export type OAuthClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthClients.
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthClients.
     */
    distinct?: OAuthClientScalarFieldEnum | OAuthClientScalarFieldEnum[]
  }

  /**
   * OAuthClient findFirstOrThrow
   */
  export type OAuthClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClient to fetch.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthClients.
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthClients.
     */
    distinct?: OAuthClientScalarFieldEnum | OAuthClientScalarFieldEnum[]
  }

  /**
   * OAuthClient findMany
   */
  export type OAuthClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter, which OAuthClients to fetch.
     */
    where?: OAuthClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthClients to fetch.
     */
    orderBy?: OAuthClientOrderByWithRelationInput | OAuthClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthClients.
     */
    cursor?: OAuthClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthClients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthClients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthClients.
     */
    distinct?: OAuthClientScalarFieldEnum | OAuthClientScalarFieldEnum[]
  }

  /**
   * OAuthClient create
   */
  export type OAuthClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthClient.
     */
    data: XOR<OAuthClientCreateInput, OAuthClientUncheckedCreateInput>
  }

  /**
   * OAuthClient createMany
   */
  export type OAuthClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthClients.
     */
    data: OAuthClientCreateManyInput | OAuthClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthClient createManyAndReturn
   */
  export type OAuthClientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthClients.
     */
    data: OAuthClientCreateManyInput | OAuthClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthClient update
   */
  export type OAuthClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthClient.
     */
    data: XOR<OAuthClientUpdateInput, OAuthClientUncheckedUpdateInput>
    /**
     * Choose, which OAuthClient to update.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient updateMany
   */
  export type OAuthClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthClients.
     */
    data: XOR<OAuthClientUpdateManyMutationInput, OAuthClientUncheckedUpdateManyInput>
    /**
     * Filter which OAuthClients to update
     */
    where?: OAuthClientWhereInput
    /**
     * Limit how many OAuthClients to update.
     */
    limit?: number
  }

  /**
   * OAuthClient updateManyAndReturn
   */
  export type OAuthClientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * The data used to update OAuthClients.
     */
    data: XOR<OAuthClientUpdateManyMutationInput, OAuthClientUncheckedUpdateManyInput>
    /**
     * Filter which OAuthClients to update
     */
    where?: OAuthClientWhereInput
    /**
     * Limit how many OAuthClients to update.
     */
    limit?: number
  }

  /**
   * OAuthClient upsert
   */
  export type OAuthClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthClient to update in case it exists.
     */
    where: OAuthClientWhereUniqueInput
    /**
     * In case the OAuthClient found by the `where` argument doesn't exist, create a new OAuthClient with this data.
     */
    create: XOR<OAuthClientCreateInput, OAuthClientUncheckedCreateInput>
    /**
     * In case the OAuthClient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthClientUpdateInput, OAuthClientUncheckedUpdateInput>
  }

  /**
   * OAuthClient delete
   */
  export type OAuthClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
    /**
     * Filter which OAuthClient to delete.
     */
    where: OAuthClientWhereUniqueInput
  }

  /**
   * OAuthClient deleteMany
   */
  export type OAuthClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthClients to delete
     */
    where?: OAuthClientWhereInput
    /**
     * Limit how many OAuthClients to delete.
     */
    limit?: number
  }

  /**
   * OAuthClient.authorization_codes
   */
  export type OAuthClient$authorization_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    where?: OAuthAuthorizationCodeWhereInput
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthClient.access_tokens
   */
  export type OAuthClient$access_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    where?: OAuthAccessTokenWhereInput
    orderBy?: OAuthAccessTokenOrderByWithRelationInput | OAuthAccessTokenOrderByWithRelationInput[]
    cursor?: OAuthAccessTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthAccessTokenScalarFieldEnum | OAuthAccessTokenScalarFieldEnum[]
  }

  /**
   * OAuthClient.refresh_tokens
   */
  export type OAuthClient$refresh_tokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    where?: OAuthRefreshTokenWhereInput
    orderBy?: OAuthRefreshTokenOrderByWithRelationInput | OAuthRefreshTokenOrderByWithRelationInput[]
    cursor?: OAuthRefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthRefreshTokenScalarFieldEnum | OAuthRefreshTokenScalarFieldEnum[]
  }

  /**
   * OAuthClient.device_codes
   */
  export type OAuthClient$device_codesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    where?: OAuthDeviceCodeWhereInput
    orderBy?: OAuthDeviceCodeOrderByWithRelationInput | OAuthDeviceCodeOrderByWithRelationInput[]
    cursor?: OAuthDeviceCodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthDeviceCodeScalarFieldEnum | OAuthDeviceCodeScalarFieldEnum[]
  }

  /**
   * OAuthClient.user_consents
   */
  export type OAuthClient$user_consentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    where?: OAuthUserConsentWhereInput
    orderBy?: OAuthUserConsentOrderByWithRelationInput | OAuthUserConsentOrderByWithRelationInput[]
    cursor?: OAuthUserConsentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthUserConsentScalarFieldEnum | OAuthUserConsentScalarFieldEnum[]
  }

  /**
   * OAuthClient without action
   */
  export type OAuthClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthClient
     */
    select?: OAuthClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthClient
     */
    omit?: OAuthClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthClientInclude<ExtArgs> | null
  }


  /**
   * Model OAuthAuthorizationCode
   */

  export type AggregateOAuthAuthorizationCode = {
    _count: OAuthAuthorizationCodeCountAggregateOutputType | null
    _min: OAuthAuthorizationCodeMinAggregateOutputType | null
    _max: OAuthAuthorizationCodeMaxAggregateOutputType | null
  }

  export type OAuthAuthorizationCodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    client_id: string | null
    user_id: string | null
    redirect_uri: string | null
    scope: string | null
    state: string | null
    code_challenge: string | null
    code_challenge_method: string | null
    nonce: string | null
    expires_at: Date | null
    consumed_at: Date | null
    created_at: Date | null
  }

  export type OAuthAuthorizationCodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    client_id: string | null
    user_id: string | null
    redirect_uri: string | null
    scope: string | null
    state: string | null
    code_challenge: string | null
    code_challenge_method: string | null
    nonce: string | null
    expires_at: Date | null
    consumed_at: Date | null
    created_at: Date | null
  }

  export type OAuthAuthorizationCodeCountAggregateOutputType = {
    id: number
    code: number
    client_id: number
    user_id: number
    redirect_uri: number
    scope: number
    state: number
    code_challenge: number
    code_challenge_method: number
    nonce: number
    expires_at: number
    consumed_at: number
    created_at: number
    _all: number
  }


  export type OAuthAuthorizationCodeMinAggregateInputType = {
    id?: true
    code?: true
    client_id?: true
    user_id?: true
    redirect_uri?: true
    scope?: true
    state?: true
    code_challenge?: true
    code_challenge_method?: true
    nonce?: true
    expires_at?: true
    consumed_at?: true
    created_at?: true
  }

  export type OAuthAuthorizationCodeMaxAggregateInputType = {
    id?: true
    code?: true
    client_id?: true
    user_id?: true
    redirect_uri?: true
    scope?: true
    state?: true
    code_challenge?: true
    code_challenge_method?: true
    nonce?: true
    expires_at?: true
    consumed_at?: true
    created_at?: true
  }

  export type OAuthAuthorizationCodeCountAggregateInputType = {
    id?: true
    code?: true
    client_id?: true
    user_id?: true
    redirect_uri?: true
    scope?: true
    state?: true
    code_challenge?: true
    code_challenge_method?: true
    nonce?: true
    expires_at?: true
    consumed_at?: true
    created_at?: true
    _all?: true
  }

  export type OAuthAuthorizationCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAuthorizationCode to aggregate.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthAuthorizationCodes
    **/
    _count?: true | OAuthAuthorizationCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthAuthorizationCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthAuthorizationCodeMaxAggregateInputType
  }

  export type GetOAuthAuthorizationCodeAggregateType<T extends OAuthAuthorizationCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthAuthorizationCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthAuthorizationCode[P]>
      : GetScalarType<T[P], AggregateOAuthAuthorizationCode[P]>
  }




  export type OAuthAuthorizationCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAuthorizationCodeWhereInput
    orderBy?: OAuthAuthorizationCodeOrderByWithAggregationInput | OAuthAuthorizationCodeOrderByWithAggregationInput[]
    by: OAuthAuthorizationCodeScalarFieldEnum[] | OAuthAuthorizationCodeScalarFieldEnum
    having?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthAuthorizationCodeCountAggregateInputType | true
    _min?: OAuthAuthorizationCodeMinAggregateInputType
    _max?: OAuthAuthorizationCodeMaxAggregateInputType
  }

  export type OAuthAuthorizationCodeGroupByOutputType = {
    id: string
    code: string
    client_id: string
    user_id: string | null
    redirect_uri: string
    scope: string
    state: string | null
    code_challenge: string | null
    code_challenge_method: string | null
    nonce: string | null
    expires_at: Date
    consumed_at: Date | null
    created_at: Date
    _count: OAuthAuthorizationCodeCountAggregateOutputType | null
    _min: OAuthAuthorizationCodeMinAggregateOutputType | null
    _max: OAuthAuthorizationCodeMaxAggregateOutputType | null
  }

  type GetOAuthAuthorizationCodeGroupByPayload<T extends OAuthAuthorizationCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthAuthorizationCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthAuthorizationCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthAuthorizationCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthAuthorizationCodeGroupByOutputType[P]>
        }
      >
    >


  export type OAuthAuthorizationCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    client_id?: boolean
    user_id?: boolean
    redirect_uri?: boolean
    scope?: boolean
    state?: boolean
    code_challenge?: boolean
    code_challenge_method?: boolean
    nonce?: boolean
    expires_at?: boolean
    consumed_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAuthorizationCode$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAuthorizationCode"]>

  export type OAuthAuthorizationCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    client_id?: boolean
    user_id?: boolean
    redirect_uri?: boolean
    scope?: boolean
    state?: boolean
    code_challenge?: boolean
    code_challenge_method?: boolean
    nonce?: boolean
    expires_at?: boolean
    consumed_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAuthorizationCode$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAuthorizationCode"]>

  export type OAuthAuthorizationCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    client_id?: boolean
    user_id?: boolean
    redirect_uri?: boolean
    scope?: boolean
    state?: boolean
    code_challenge?: boolean
    code_challenge_method?: boolean
    nonce?: boolean
    expires_at?: boolean
    consumed_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAuthorizationCode$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAuthorizationCode"]>

  export type OAuthAuthorizationCodeSelectScalar = {
    id?: boolean
    code?: boolean
    client_id?: boolean
    user_id?: boolean
    redirect_uri?: boolean
    scope?: boolean
    state?: boolean
    code_challenge?: boolean
    code_challenge_method?: boolean
    nonce?: boolean
    expires_at?: boolean
    consumed_at?: boolean
    created_at?: boolean
  }

  export type OAuthAuthorizationCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "client_id" | "user_id" | "redirect_uri" | "scope" | "state" | "code_challenge" | "code_challenge_method" | "nonce" | "expires_at" | "consumed_at" | "created_at", ExtArgs["result"]["oAuthAuthorizationCode"]>
  export type OAuthAuthorizationCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAuthorizationCode$userArgs<ExtArgs>
  }
  export type OAuthAuthorizationCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAuthorizationCode$userArgs<ExtArgs>
  }
  export type OAuthAuthorizationCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAuthorizationCode$userArgs<ExtArgs>
  }

  export type $OAuthAuthorizationCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthAuthorizationCode"
    objects: {
      client: Prisma.$OAuthClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      client_id: string
      user_id: string | null
      redirect_uri: string
      scope: string
      state: string | null
      code_challenge: string | null
      code_challenge_method: string | null
      nonce: string | null
      expires_at: Date
      consumed_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["oAuthAuthorizationCode"]>
    composites: {}
  }

  type OAuthAuthorizationCodeGetPayload<S extends boolean | null | undefined | OAuthAuthorizationCodeDefaultArgs> = $Result.GetResult<Prisma.$OAuthAuthorizationCodePayload, S>

  type OAuthAuthorizationCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthAuthorizationCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthAuthorizationCodeCountAggregateInputType | true
    }

  export interface OAuthAuthorizationCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthAuthorizationCode'], meta: { name: 'OAuthAuthorizationCode' } }
    /**
     * Find zero or one OAuthAuthorizationCode that matches the filter.
     * @param {OAuthAuthorizationCodeFindUniqueArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthAuthorizationCodeFindUniqueArgs>(args: SelectSubset<T, OAuthAuthorizationCodeFindUniqueArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthAuthorizationCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthAuthorizationCodeFindUniqueOrThrowArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthAuthorizationCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthAuthorizationCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAuthorizationCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeFindFirstArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthAuthorizationCodeFindFirstArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeFindFirstArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAuthorizationCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeFindFirstOrThrowArgs} args - Arguments to find a OAuthAuthorizationCode
     * @example
     * // Get one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthAuthorizationCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthAuthorizationCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthAuthorizationCodes
     * const oAuthAuthorizationCodes = await prisma.oAuthAuthorizationCode.findMany()
     * 
     * // Get first 10 OAuthAuthorizationCodes
     * const oAuthAuthorizationCodes = await prisma.oAuthAuthorizationCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthAuthorizationCodeWithIdOnly = await prisma.oAuthAuthorizationCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthAuthorizationCodeFindManyArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeCreateArgs} args - Arguments to create a OAuthAuthorizationCode.
     * @example
     * // Create one OAuthAuthorizationCode
     * const OAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.create({
     *   data: {
     *     // ... data to create a OAuthAuthorizationCode
     *   }
     * })
     * 
     */
    create<T extends OAuthAuthorizationCodeCreateArgs>(args: SelectSubset<T, OAuthAuthorizationCodeCreateArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthAuthorizationCodes.
     * @param {OAuthAuthorizationCodeCreateManyArgs} args - Arguments to create many OAuthAuthorizationCodes.
     * @example
     * // Create many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthAuthorizationCodeCreateManyArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthAuthorizationCodes and returns the data saved in the database.
     * @param {OAuthAuthorizationCodeCreateManyAndReturnArgs} args - Arguments to create many OAuthAuthorizationCodes.
     * @example
     * // Create many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthAuthorizationCodes and only return the `id`
     * const oAuthAuthorizationCodeWithIdOnly = await prisma.oAuthAuthorizationCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthAuthorizationCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeDeleteArgs} args - Arguments to delete one OAuthAuthorizationCode.
     * @example
     * // Delete one OAuthAuthorizationCode
     * const OAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.delete({
     *   where: {
     *     // ... filter to delete one OAuthAuthorizationCode
     *   }
     * })
     * 
     */
    delete<T extends OAuthAuthorizationCodeDeleteArgs>(args: SelectSubset<T, OAuthAuthorizationCodeDeleteArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeUpdateArgs} args - Arguments to update one OAuthAuthorizationCode.
     * @example
     * // Update one OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthAuthorizationCodeUpdateArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpdateArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthAuthorizationCodes.
     * @param {OAuthAuthorizationCodeDeleteManyArgs} args - Arguments to filter OAuthAuthorizationCodes to delete.
     * @example
     * // Delete a few OAuthAuthorizationCodes
     * const { count } = await prisma.oAuthAuthorizationCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthAuthorizationCodeDeleteManyArgs>(args?: SelectSubset<T, OAuthAuthorizationCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAuthorizationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthAuthorizationCodeUpdateManyArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAuthorizationCodes and returns the data updated in the database.
     * @param {OAuthAuthorizationCodeUpdateManyAndReturnArgs} args - Arguments to update many OAuthAuthorizationCodes.
     * @example
     * // Update many OAuthAuthorizationCodes
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthAuthorizationCodes and only return the `id`
     * const oAuthAuthorizationCodeWithIdOnly = await prisma.oAuthAuthorizationCode.updateManyAndReturn({
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
    updateManyAndReturn<T extends OAuthAuthorizationCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthAuthorizationCode.
     * @param {OAuthAuthorizationCodeUpsertArgs} args - Arguments to update or create a OAuthAuthorizationCode.
     * @example
     * // Update or create a OAuthAuthorizationCode
     * const oAuthAuthorizationCode = await prisma.oAuthAuthorizationCode.upsert({
     *   create: {
     *     // ... data to create a OAuthAuthorizationCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthAuthorizationCode we want to update
     *   }
     * })
     */
    upsert<T extends OAuthAuthorizationCodeUpsertArgs>(args: SelectSubset<T, OAuthAuthorizationCodeUpsertArgs<ExtArgs>>): Prisma__OAuthAuthorizationCodeClient<$Result.GetResult<Prisma.$OAuthAuthorizationCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthAuthorizationCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeCountArgs} args - Arguments to filter OAuthAuthorizationCodes to count.
     * @example
     * // Count the number of OAuthAuthorizationCodes
     * const count = await prisma.oAuthAuthorizationCode.count({
     *   where: {
     *     // ... the filter for the OAuthAuthorizationCodes we want to count
     *   }
     * })
    **/
    count<T extends OAuthAuthorizationCodeCountArgs>(
      args?: Subset<T, OAuthAuthorizationCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthAuthorizationCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthAuthorizationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OAuthAuthorizationCodeAggregateArgs>(args: Subset<T, OAuthAuthorizationCodeAggregateArgs>): Prisma.PrismaPromise<GetOAuthAuthorizationCodeAggregateType<T>>

    /**
     * Group by OAuthAuthorizationCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAuthorizationCodeGroupByArgs} args - Group by arguments.
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
      T extends OAuthAuthorizationCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthAuthorizationCodeGroupByArgs['orderBy'] }
        : { orderBy?: OAuthAuthorizationCodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OAuthAuthorizationCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthAuthorizationCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthAuthorizationCode model
   */
  readonly fields: OAuthAuthorizationCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthAuthorizationCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthAuthorizationCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends OAuthClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClientDefaultArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends OAuthAuthorizationCode$userArgs<ExtArgs> = {}>(args?: Subset<T, OAuthAuthorizationCode$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OAuthAuthorizationCode model
   */
  interface OAuthAuthorizationCodeFieldRefs {
    readonly id: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly code: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly client_id: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly user_id: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly redirect_uri: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly scope: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly state: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly code_challenge: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly code_challenge_method: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly nonce: FieldRef<"OAuthAuthorizationCode", 'String'>
    readonly expires_at: FieldRef<"OAuthAuthorizationCode", 'DateTime'>
    readonly consumed_at: FieldRef<"OAuthAuthorizationCode", 'DateTime'>
    readonly created_at: FieldRef<"OAuthAuthorizationCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthAuthorizationCode findUnique
   */
  export type OAuthAuthorizationCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode findUniqueOrThrow
   */
  export type OAuthAuthorizationCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode findFirst
   */
  export type OAuthAuthorizationCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAuthorizationCodes.
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAuthorizationCodes.
     */
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthAuthorizationCode findFirstOrThrow
   */
  export type OAuthAuthorizationCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCode to fetch.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAuthorizationCodes.
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAuthorizationCodes.
     */
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthAuthorizationCode findMany
   */
  export type OAuthAuthorizationCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAuthorizationCodes to fetch.
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAuthorizationCodes to fetch.
     */
    orderBy?: OAuthAuthorizationCodeOrderByWithRelationInput | OAuthAuthorizationCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthAuthorizationCodes.
     */
    cursor?: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAuthorizationCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAuthorizationCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAuthorizationCodes.
     */
    distinct?: OAuthAuthorizationCodeScalarFieldEnum | OAuthAuthorizationCodeScalarFieldEnum[]
  }

  /**
   * OAuthAuthorizationCode create
   */
  export type OAuthAuthorizationCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthAuthorizationCode.
     */
    data: XOR<OAuthAuthorizationCodeCreateInput, OAuthAuthorizationCodeUncheckedCreateInput>
  }

  /**
   * OAuthAuthorizationCode createMany
   */
  export type OAuthAuthorizationCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthAuthorizationCodes.
     */
    data: OAuthAuthorizationCodeCreateManyInput | OAuthAuthorizationCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthAuthorizationCode createManyAndReturn
   */
  export type OAuthAuthorizationCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthAuthorizationCodes.
     */
    data: OAuthAuthorizationCodeCreateManyInput | OAuthAuthorizationCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAuthorizationCode update
   */
  export type OAuthAuthorizationCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthAuthorizationCode.
     */
    data: XOR<OAuthAuthorizationCodeUpdateInput, OAuthAuthorizationCodeUncheckedUpdateInput>
    /**
     * Choose, which OAuthAuthorizationCode to update.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode updateMany
   */
  export type OAuthAuthorizationCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthAuthorizationCodes.
     */
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAuthorizationCodes to update
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * Limit how many OAuthAuthorizationCodes to update.
     */
    limit?: number
  }

  /**
   * OAuthAuthorizationCode updateManyAndReturn
   */
  export type OAuthAuthorizationCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * The data used to update OAuthAuthorizationCodes.
     */
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAuthorizationCodes to update
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * Limit how many OAuthAuthorizationCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAuthorizationCode upsert
   */
  export type OAuthAuthorizationCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthAuthorizationCode to update in case it exists.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
    /**
     * In case the OAuthAuthorizationCode found by the `where` argument doesn't exist, create a new OAuthAuthorizationCode with this data.
     */
    create: XOR<OAuthAuthorizationCodeCreateInput, OAuthAuthorizationCodeUncheckedCreateInput>
    /**
     * In case the OAuthAuthorizationCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthAuthorizationCodeUpdateInput, OAuthAuthorizationCodeUncheckedUpdateInput>
  }

  /**
   * OAuthAuthorizationCode delete
   */
  export type OAuthAuthorizationCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
    /**
     * Filter which OAuthAuthorizationCode to delete.
     */
    where: OAuthAuthorizationCodeWhereUniqueInput
  }

  /**
   * OAuthAuthorizationCode deleteMany
   */
  export type OAuthAuthorizationCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAuthorizationCodes to delete
     */
    where?: OAuthAuthorizationCodeWhereInput
    /**
     * Limit how many OAuthAuthorizationCodes to delete.
     */
    limit?: number
  }

  /**
   * OAuthAuthorizationCode.user
   */
  export type OAuthAuthorizationCode$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * OAuthAuthorizationCode without action
   */
  export type OAuthAuthorizationCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAuthorizationCode
     */
    select?: OAuthAuthorizationCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAuthorizationCode
     */
    omit?: OAuthAuthorizationCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAuthorizationCodeInclude<ExtArgs> | null
  }


  /**
   * Model OAuthAccessToken
   */

  export type AggregateOAuthAccessToken = {
    _count: OAuthAccessTokenCountAggregateOutputType | null
    _min: OAuthAccessTokenMinAggregateOutputType | null
    _max: OAuthAccessTokenMaxAggregateOutputType | null
  }

  export type OAuthAccessTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    token_type: string | null
    expires_at: Date | null
    revoked_at: Date | null
    created_at: Date | null
  }

  export type OAuthAccessTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    token_type: string | null
    expires_at: Date | null
    revoked_at: Date | null
    created_at: Date | null
  }

  export type OAuthAccessTokenCountAggregateOutputType = {
    id: number
    token: number
    client_id: number
    user_id: number
    scope: number
    token_type: number
    expires_at: number
    revoked_at: number
    created_at: number
    _all: number
  }


  export type OAuthAccessTokenMinAggregateInputType = {
    id?: true
    token?: true
    client_id?: true
    user_id?: true
    scope?: true
    token_type?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
  }

  export type OAuthAccessTokenMaxAggregateInputType = {
    id?: true
    token?: true
    client_id?: true
    user_id?: true
    scope?: true
    token_type?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
  }

  export type OAuthAccessTokenCountAggregateInputType = {
    id?: true
    token?: true
    client_id?: true
    user_id?: true
    scope?: true
    token_type?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
    _all?: true
  }

  export type OAuthAccessTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAccessToken to aggregate.
     */
    where?: OAuthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccessTokens to fetch.
     */
    orderBy?: OAuthAccessTokenOrderByWithRelationInput | OAuthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthAccessTokens
    **/
    _count?: true | OAuthAccessTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthAccessTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthAccessTokenMaxAggregateInputType
  }

  export type GetOAuthAccessTokenAggregateType<T extends OAuthAccessTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthAccessToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthAccessToken[P]>
      : GetScalarType<T[P], AggregateOAuthAccessToken[P]>
  }




  export type OAuthAccessTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthAccessTokenWhereInput
    orderBy?: OAuthAccessTokenOrderByWithAggregationInput | OAuthAccessTokenOrderByWithAggregationInput[]
    by: OAuthAccessTokenScalarFieldEnum[] | OAuthAccessTokenScalarFieldEnum
    having?: OAuthAccessTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthAccessTokenCountAggregateInputType | true
    _min?: OAuthAccessTokenMinAggregateInputType
    _max?: OAuthAccessTokenMaxAggregateInputType
  }

  export type OAuthAccessTokenGroupByOutputType = {
    id: string
    token: string
    client_id: string
    user_id: string | null
    scope: string
    token_type: string
    expires_at: Date
    revoked_at: Date | null
    created_at: Date
    _count: OAuthAccessTokenCountAggregateOutputType | null
    _min: OAuthAccessTokenMinAggregateOutputType | null
    _max: OAuthAccessTokenMaxAggregateOutputType | null
  }

  type GetOAuthAccessTokenGroupByPayload<T extends OAuthAccessTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthAccessTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthAccessTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthAccessTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthAccessTokenGroupByOutputType[P]>
        }
      >
    >


  export type OAuthAccessTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    token_type?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAccessToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccessToken"]>

  export type OAuthAccessTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    token_type?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAccessToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccessToken"]>

  export type OAuthAccessTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    token_type?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAccessToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthAccessToken"]>

  export type OAuthAccessTokenSelectScalar = {
    id?: boolean
    token?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    token_type?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
  }

  export type OAuthAccessTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "client_id" | "user_id" | "scope" | "token_type" | "expires_at" | "revoked_at" | "created_at", ExtArgs["result"]["oAuthAccessToken"]>
  export type OAuthAccessTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAccessToken$userArgs<ExtArgs>
  }
  export type OAuthAccessTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAccessToken$userArgs<ExtArgs>
  }
  export type OAuthAccessTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthAccessToken$userArgs<ExtArgs>
  }

  export type $OAuthAccessTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthAccessToken"
    objects: {
      client: Prisma.$OAuthClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      client_id: string
      user_id: string | null
      scope: string
      token_type: string
      expires_at: Date
      revoked_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["oAuthAccessToken"]>
    composites: {}
  }

  type OAuthAccessTokenGetPayload<S extends boolean | null | undefined | OAuthAccessTokenDefaultArgs> = $Result.GetResult<Prisma.$OAuthAccessTokenPayload, S>

  type OAuthAccessTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthAccessTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthAccessTokenCountAggregateInputType | true
    }

  export interface OAuthAccessTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthAccessToken'], meta: { name: 'OAuthAccessToken' } }
    /**
     * Find zero or one OAuthAccessToken that matches the filter.
     * @param {OAuthAccessTokenFindUniqueArgs} args - Arguments to find a OAuthAccessToken
     * @example
     * // Get one OAuthAccessToken
     * const oAuthAccessToken = await prisma.oAuthAccessToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthAccessTokenFindUniqueArgs>(args: SelectSubset<T, OAuthAccessTokenFindUniqueArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthAccessToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthAccessTokenFindUniqueOrThrowArgs} args - Arguments to find a OAuthAccessToken
     * @example
     * // Get one OAuthAccessToken
     * const oAuthAccessToken = await prisma.oAuthAccessToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthAccessTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthAccessTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAccessToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccessTokenFindFirstArgs} args - Arguments to find a OAuthAccessToken
     * @example
     * // Get one OAuthAccessToken
     * const oAuthAccessToken = await prisma.oAuthAccessToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthAccessTokenFindFirstArgs>(args?: SelectSubset<T, OAuthAccessTokenFindFirstArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthAccessToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccessTokenFindFirstOrThrowArgs} args - Arguments to find a OAuthAccessToken
     * @example
     * // Get one OAuthAccessToken
     * const oAuthAccessToken = await prisma.oAuthAccessToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthAccessTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthAccessTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthAccessTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccessTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthAccessTokens
     * const oAuthAccessTokens = await prisma.oAuthAccessToken.findMany()
     * 
     * // Get first 10 OAuthAccessTokens
     * const oAuthAccessTokens = await prisma.oAuthAccessToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthAccessTokenWithIdOnly = await prisma.oAuthAccessToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthAccessTokenFindManyArgs>(args?: SelectSubset<T, OAuthAccessTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthAccessToken.
     * @param {OAuthAccessTokenCreateArgs} args - Arguments to create a OAuthAccessToken.
     * @example
     * // Create one OAuthAccessToken
     * const OAuthAccessToken = await prisma.oAuthAccessToken.create({
     *   data: {
     *     // ... data to create a OAuthAccessToken
     *   }
     * })
     * 
     */
    create<T extends OAuthAccessTokenCreateArgs>(args: SelectSubset<T, OAuthAccessTokenCreateArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthAccessTokens.
     * @param {OAuthAccessTokenCreateManyArgs} args - Arguments to create many OAuthAccessTokens.
     * @example
     * // Create many OAuthAccessTokens
     * const oAuthAccessToken = await prisma.oAuthAccessToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthAccessTokenCreateManyArgs>(args?: SelectSubset<T, OAuthAccessTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthAccessTokens and returns the data saved in the database.
     * @param {OAuthAccessTokenCreateManyAndReturnArgs} args - Arguments to create many OAuthAccessTokens.
     * @example
     * // Create many OAuthAccessTokens
     * const oAuthAccessToken = await prisma.oAuthAccessToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthAccessTokens and only return the `id`
     * const oAuthAccessTokenWithIdOnly = await prisma.oAuthAccessToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthAccessTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthAccessTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthAccessToken.
     * @param {OAuthAccessTokenDeleteArgs} args - Arguments to delete one OAuthAccessToken.
     * @example
     * // Delete one OAuthAccessToken
     * const OAuthAccessToken = await prisma.oAuthAccessToken.delete({
     *   where: {
     *     // ... filter to delete one OAuthAccessToken
     *   }
     * })
     * 
     */
    delete<T extends OAuthAccessTokenDeleteArgs>(args: SelectSubset<T, OAuthAccessTokenDeleteArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthAccessToken.
     * @param {OAuthAccessTokenUpdateArgs} args - Arguments to update one OAuthAccessToken.
     * @example
     * // Update one OAuthAccessToken
     * const oAuthAccessToken = await prisma.oAuthAccessToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthAccessTokenUpdateArgs>(args: SelectSubset<T, OAuthAccessTokenUpdateArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthAccessTokens.
     * @param {OAuthAccessTokenDeleteManyArgs} args - Arguments to filter OAuthAccessTokens to delete.
     * @example
     * // Delete a few OAuthAccessTokens
     * const { count } = await prisma.oAuthAccessToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthAccessTokenDeleteManyArgs>(args?: SelectSubset<T, OAuthAccessTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccessTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthAccessTokens
     * const oAuthAccessToken = await prisma.oAuthAccessToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthAccessTokenUpdateManyArgs>(args: SelectSubset<T, OAuthAccessTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthAccessTokens and returns the data updated in the database.
     * @param {OAuthAccessTokenUpdateManyAndReturnArgs} args - Arguments to update many OAuthAccessTokens.
     * @example
     * // Update many OAuthAccessTokens
     * const oAuthAccessToken = await prisma.oAuthAccessToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthAccessTokens and only return the `id`
     * const oAuthAccessTokenWithIdOnly = await prisma.oAuthAccessToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends OAuthAccessTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthAccessTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthAccessToken.
     * @param {OAuthAccessTokenUpsertArgs} args - Arguments to update or create a OAuthAccessToken.
     * @example
     * // Update or create a OAuthAccessToken
     * const oAuthAccessToken = await prisma.oAuthAccessToken.upsert({
     *   create: {
     *     // ... data to create a OAuthAccessToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthAccessToken we want to update
     *   }
     * })
     */
    upsert<T extends OAuthAccessTokenUpsertArgs>(args: SelectSubset<T, OAuthAccessTokenUpsertArgs<ExtArgs>>): Prisma__OAuthAccessTokenClient<$Result.GetResult<Prisma.$OAuthAccessTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthAccessTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccessTokenCountArgs} args - Arguments to filter OAuthAccessTokens to count.
     * @example
     * // Count the number of OAuthAccessTokens
     * const count = await prisma.oAuthAccessToken.count({
     *   where: {
     *     // ... the filter for the OAuthAccessTokens we want to count
     *   }
     * })
    **/
    count<T extends OAuthAccessTokenCountArgs>(
      args?: Subset<T, OAuthAccessTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthAccessTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccessTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OAuthAccessTokenAggregateArgs>(args: Subset<T, OAuthAccessTokenAggregateArgs>): Prisma.PrismaPromise<GetOAuthAccessTokenAggregateType<T>>

    /**
     * Group by OAuthAccessToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthAccessTokenGroupByArgs} args - Group by arguments.
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
      T extends OAuthAccessTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthAccessTokenGroupByArgs['orderBy'] }
        : { orderBy?: OAuthAccessTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OAuthAccessTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthAccessTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthAccessToken model
   */
  readonly fields: OAuthAccessTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthAccessToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthAccessTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends OAuthClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClientDefaultArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends OAuthAccessToken$userArgs<ExtArgs> = {}>(args?: Subset<T, OAuthAccessToken$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OAuthAccessToken model
   */
  interface OAuthAccessTokenFieldRefs {
    readonly id: FieldRef<"OAuthAccessToken", 'String'>
    readonly token: FieldRef<"OAuthAccessToken", 'String'>
    readonly client_id: FieldRef<"OAuthAccessToken", 'String'>
    readonly user_id: FieldRef<"OAuthAccessToken", 'String'>
    readonly scope: FieldRef<"OAuthAccessToken", 'String'>
    readonly token_type: FieldRef<"OAuthAccessToken", 'String'>
    readonly expires_at: FieldRef<"OAuthAccessToken", 'DateTime'>
    readonly revoked_at: FieldRef<"OAuthAccessToken", 'DateTime'>
    readonly created_at: FieldRef<"OAuthAccessToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthAccessToken findUnique
   */
  export type OAuthAccessTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccessToken to fetch.
     */
    where: OAuthAccessTokenWhereUniqueInput
  }

  /**
   * OAuthAccessToken findUniqueOrThrow
   */
  export type OAuthAccessTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccessToken to fetch.
     */
    where: OAuthAccessTokenWhereUniqueInput
  }

  /**
   * OAuthAccessToken findFirst
   */
  export type OAuthAccessTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccessToken to fetch.
     */
    where?: OAuthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccessTokens to fetch.
     */
    orderBy?: OAuthAccessTokenOrderByWithRelationInput | OAuthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAccessTokens.
     */
    cursor?: OAuthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAccessTokens.
     */
    distinct?: OAuthAccessTokenScalarFieldEnum | OAuthAccessTokenScalarFieldEnum[]
  }

  /**
   * OAuthAccessToken findFirstOrThrow
   */
  export type OAuthAccessTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccessToken to fetch.
     */
    where?: OAuthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccessTokens to fetch.
     */
    orderBy?: OAuthAccessTokenOrderByWithRelationInput | OAuthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthAccessTokens.
     */
    cursor?: OAuthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAccessTokens.
     */
    distinct?: OAuthAccessTokenScalarFieldEnum | OAuthAccessTokenScalarFieldEnum[]
  }

  /**
   * OAuthAccessToken findMany
   */
  export type OAuthAccessTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthAccessTokens to fetch.
     */
    where?: OAuthAccessTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthAccessTokens to fetch.
     */
    orderBy?: OAuthAccessTokenOrderByWithRelationInput | OAuthAccessTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthAccessTokens.
     */
    cursor?: OAuthAccessTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthAccessTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthAccessTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthAccessTokens.
     */
    distinct?: OAuthAccessTokenScalarFieldEnum | OAuthAccessTokenScalarFieldEnum[]
  }

  /**
   * OAuthAccessToken create
   */
  export type OAuthAccessTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthAccessToken.
     */
    data: XOR<OAuthAccessTokenCreateInput, OAuthAccessTokenUncheckedCreateInput>
  }

  /**
   * OAuthAccessToken createMany
   */
  export type OAuthAccessTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthAccessTokens.
     */
    data: OAuthAccessTokenCreateManyInput | OAuthAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthAccessToken createManyAndReturn
   */
  export type OAuthAccessTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthAccessTokens.
     */
    data: OAuthAccessTokenCreateManyInput | OAuthAccessTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAccessToken update
   */
  export type OAuthAccessTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthAccessToken.
     */
    data: XOR<OAuthAccessTokenUpdateInput, OAuthAccessTokenUncheckedUpdateInput>
    /**
     * Choose, which OAuthAccessToken to update.
     */
    where: OAuthAccessTokenWhereUniqueInput
  }

  /**
   * OAuthAccessToken updateMany
   */
  export type OAuthAccessTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthAccessTokens.
     */
    data: XOR<OAuthAccessTokenUpdateManyMutationInput, OAuthAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAccessTokens to update
     */
    where?: OAuthAccessTokenWhereInput
    /**
     * Limit how many OAuthAccessTokens to update.
     */
    limit?: number
  }

  /**
   * OAuthAccessToken updateManyAndReturn
   */
  export type OAuthAccessTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * The data used to update OAuthAccessTokens.
     */
    data: XOR<OAuthAccessTokenUpdateManyMutationInput, OAuthAccessTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthAccessTokens to update
     */
    where?: OAuthAccessTokenWhereInput
    /**
     * Limit how many OAuthAccessTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthAccessToken upsert
   */
  export type OAuthAccessTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthAccessToken to update in case it exists.
     */
    where: OAuthAccessTokenWhereUniqueInput
    /**
     * In case the OAuthAccessToken found by the `where` argument doesn't exist, create a new OAuthAccessToken with this data.
     */
    create: XOR<OAuthAccessTokenCreateInput, OAuthAccessTokenUncheckedCreateInput>
    /**
     * In case the OAuthAccessToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthAccessTokenUpdateInput, OAuthAccessTokenUncheckedUpdateInput>
  }

  /**
   * OAuthAccessToken delete
   */
  export type OAuthAccessTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
    /**
     * Filter which OAuthAccessToken to delete.
     */
    where: OAuthAccessTokenWhereUniqueInput
  }

  /**
   * OAuthAccessToken deleteMany
   */
  export type OAuthAccessTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthAccessTokens to delete
     */
    where?: OAuthAccessTokenWhereInput
    /**
     * Limit how many OAuthAccessTokens to delete.
     */
    limit?: number
  }

  /**
   * OAuthAccessToken.user
   */
  export type OAuthAccessToken$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * OAuthAccessToken without action
   */
  export type OAuthAccessTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthAccessToken
     */
    select?: OAuthAccessTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthAccessToken
     */
    omit?: OAuthAccessTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthAccessTokenInclude<ExtArgs> | null
  }


  /**
   * Model OAuthRefreshToken
   */

  export type AggregateOAuthRefreshToken = {
    _count: OAuthRefreshTokenCountAggregateOutputType | null
    _min: OAuthRefreshTokenMinAggregateOutputType | null
    _max: OAuthRefreshTokenMaxAggregateOutputType | null
  }

  export type OAuthRefreshTokenMinAggregateOutputType = {
    id: string | null
    token: string | null
    access_token_id: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    expires_at: Date | null
    revoked_at: Date | null
    created_at: Date | null
  }

  export type OAuthRefreshTokenMaxAggregateOutputType = {
    id: string | null
    token: string | null
    access_token_id: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    expires_at: Date | null
    revoked_at: Date | null
    created_at: Date | null
  }

  export type OAuthRefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    access_token_id: number
    client_id: number
    user_id: number
    scope: number
    expires_at: number
    revoked_at: number
    created_at: number
    _all: number
  }


  export type OAuthRefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    access_token_id?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
  }

  export type OAuthRefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    access_token_id?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
  }

  export type OAuthRefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    access_token_id?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    revoked_at?: true
    created_at?: true
    _all?: true
  }

  export type OAuthRefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthRefreshToken to aggregate.
     */
    where?: OAuthRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthRefreshTokens to fetch.
     */
    orderBy?: OAuthRefreshTokenOrderByWithRelationInput | OAuthRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthRefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthRefreshTokens
    **/
    _count?: true | OAuthRefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthRefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthRefreshTokenMaxAggregateInputType
  }

  export type GetOAuthRefreshTokenAggregateType<T extends OAuthRefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthRefreshToken[P]>
      : GetScalarType<T[P], AggregateOAuthRefreshToken[P]>
  }




  export type OAuthRefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthRefreshTokenWhereInput
    orderBy?: OAuthRefreshTokenOrderByWithAggregationInput | OAuthRefreshTokenOrderByWithAggregationInput[]
    by: OAuthRefreshTokenScalarFieldEnum[] | OAuthRefreshTokenScalarFieldEnum
    having?: OAuthRefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthRefreshTokenCountAggregateInputType | true
    _min?: OAuthRefreshTokenMinAggregateInputType
    _max?: OAuthRefreshTokenMaxAggregateInputType
  }

  export type OAuthRefreshTokenGroupByOutputType = {
    id: string
    token: string
    access_token_id: string
    client_id: string
    user_id: string | null
    scope: string
    expires_at: Date
    revoked_at: Date | null
    created_at: Date
    _count: OAuthRefreshTokenCountAggregateOutputType | null
    _min: OAuthRefreshTokenMinAggregateOutputType | null
    _max: OAuthRefreshTokenMaxAggregateOutputType | null
  }

  type GetOAuthRefreshTokenGroupByPayload<T extends OAuthRefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthRefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthRefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthRefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthRefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type OAuthRefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    access_token_id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthRefreshToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthRefreshToken"]>

  export type OAuthRefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    access_token_id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthRefreshToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthRefreshToken"]>

  export type OAuthRefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    access_token_id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthRefreshToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthRefreshToken"]>

  export type OAuthRefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    access_token_id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    revoked_at?: boolean
    created_at?: boolean
  }

  export type OAuthRefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "access_token_id" | "client_id" | "user_id" | "scope" | "expires_at" | "revoked_at" | "created_at", ExtArgs["result"]["oAuthRefreshToken"]>
  export type OAuthRefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthRefreshToken$userArgs<ExtArgs>
  }
  export type OAuthRefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthRefreshToken$userArgs<ExtArgs>
  }
  export type OAuthRefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthRefreshToken$userArgs<ExtArgs>
  }

  export type $OAuthRefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthRefreshToken"
    objects: {
      client: Prisma.$OAuthClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      token: string
      access_token_id: string
      client_id: string
      user_id: string | null
      scope: string
      expires_at: Date
      revoked_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["oAuthRefreshToken"]>
    composites: {}
  }

  type OAuthRefreshTokenGetPayload<S extends boolean | null | undefined | OAuthRefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$OAuthRefreshTokenPayload, S>

  type OAuthRefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthRefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthRefreshTokenCountAggregateInputType | true
    }

  export interface OAuthRefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthRefreshToken'], meta: { name: 'OAuthRefreshToken' } }
    /**
     * Find zero or one OAuthRefreshToken that matches the filter.
     * @param {OAuthRefreshTokenFindUniqueArgs} args - Arguments to find a OAuthRefreshToken
     * @example
     * // Get one OAuthRefreshToken
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthRefreshTokenFindUniqueArgs>(args: SelectSubset<T, OAuthRefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthRefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthRefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a OAuthRefreshToken
     * @example
     * // Get one OAuthRefreshToken
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthRefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthRefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthRefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthRefreshTokenFindFirstArgs} args - Arguments to find a OAuthRefreshToken
     * @example
     * // Get one OAuthRefreshToken
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthRefreshTokenFindFirstArgs>(args?: SelectSubset<T, OAuthRefreshTokenFindFirstArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthRefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthRefreshTokenFindFirstOrThrowArgs} args - Arguments to find a OAuthRefreshToken
     * @example
     * // Get one OAuthRefreshToken
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthRefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthRefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthRefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthRefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthRefreshTokens
     * const oAuthRefreshTokens = await prisma.oAuthRefreshToken.findMany()
     * 
     * // Get first 10 OAuthRefreshTokens
     * const oAuthRefreshTokens = await prisma.oAuthRefreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthRefreshTokenWithIdOnly = await prisma.oAuthRefreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthRefreshTokenFindManyArgs>(args?: SelectSubset<T, OAuthRefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthRefreshToken.
     * @param {OAuthRefreshTokenCreateArgs} args - Arguments to create a OAuthRefreshToken.
     * @example
     * // Create one OAuthRefreshToken
     * const OAuthRefreshToken = await prisma.oAuthRefreshToken.create({
     *   data: {
     *     // ... data to create a OAuthRefreshToken
     *   }
     * })
     * 
     */
    create<T extends OAuthRefreshTokenCreateArgs>(args: SelectSubset<T, OAuthRefreshTokenCreateArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthRefreshTokens.
     * @param {OAuthRefreshTokenCreateManyArgs} args - Arguments to create many OAuthRefreshTokens.
     * @example
     * // Create many OAuthRefreshTokens
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthRefreshTokenCreateManyArgs>(args?: SelectSubset<T, OAuthRefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthRefreshTokens and returns the data saved in the database.
     * @param {OAuthRefreshTokenCreateManyAndReturnArgs} args - Arguments to create many OAuthRefreshTokens.
     * @example
     * // Create many OAuthRefreshTokens
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthRefreshTokens and only return the `id`
     * const oAuthRefreshTokenWithIdOnly = await prisma.oAuthRefreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthRefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthRefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthRefreshToken.
     * @param {OAuthRefreshTokenDeleteArgs} args - Arguments to delete one OAuthRefreshToken.
     * @example
     * // Delete one OAuthRefreshToken
     * const OAuthRefreshToken = await prisma.oAuthRefreshToken.delete({
     *   where: {
     *     // ... filter to delete one OAuthRefreshToken
     *   }
     * })
     * 
     */
    delete<T extends OAuthRefreshTokenDeleteArgs>(args: SelectSubset<T, OAuthRefreshTokenDeleteArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthRefreshToken.
     * @param {OAuthRefreshTokenUpdateArgs} args - Arguments to update one OAuthRefreshToken.
     * @example
     * // Update one OAuthRefreshToken
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthRefreshTokenUpdateArgs>(args: SelectSubset<T, OAuthRefreshTokenUpdateArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthRefreshTokens.
     * @param {OAuthRefreshTokenDeleteManyArgs} args - Arguments to filter OAuthRefreshTokens to delete.
     * @example
     * // Delete a few OAuthRefreshTokens
     * const { count } = await prisma.oAuthRefreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthRefreshTokenDeleteManyArgs>(args?: SelectSubset<T, OAuthRefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthRefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthRefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthRefreshTokens
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthRefreshTokenUpdateManyArgs>(args: SelectSubset<T, OAuthRefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthRefreshTokens and returns the data updated in the database.
     * @param {OAuthRefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many OAuthRefreshTokens.
     * @example
     * // Update many OAuthRefreshTokens
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthRefreshTokens and only return the `id`
     * const oAuthRefreshTokenWithIdOnly = await prisma.oAuthRefreshToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends OAuthRefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthRefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthRefreshToken.
     * @param {OAuthRefreshTokenUpsertArgs} args - Arguments to update or create a OAuthRefreshToken.
     * @example
     * // Update or create a OAuthRefreshToken
     * const oAuthRefreshToken = await prisma.oAuthRefreshToken.upsert({
     *   create: {
     *     // ... data to create a OAuthRefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthRefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends OAuthRefreshTokenUpsertArgs>(args: SelectSubset<T, OAuthRefreshTokenUpsertArgs<ExtArgs>>): Prisma__OAuthRefreshTokenClient<$Result.GetResult<Prisma.$OAuthRefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthRefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthRefreshTokenCountArgs} args - Arguments to filter OAuthRefreshTokens to count.
     * @example
     * // Count the number of OAuthRefreshTokens
     * const count = await prisma.oAuthRefreshToken.count({
     *   where: {
     *     // ... the filter for the OAuthRefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends OAuthRefreshTokenCountArgs>(
      args?: Subset<T, OAuthRefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthRefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthRefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthRefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OAuthRefreshTokenAggregateArgs>(args: Subset<T, OAuthRefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetOAuthRefreshTokenAggregateType<T>>

    /**
     * Group by OAuthRefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthRefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends OAuthRefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthRefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: OAuthRefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OAuthRefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthRefreshToken model
   */
  readonly fields: OAuthRefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthRefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthRefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends OAuthClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClientDefaultArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends OAuthRefreshToken$userArgs<ExtArgs> = {}>(args?: Subset<T, OAuthRefreshToken$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OAuthRefreshToken model
   */
  interface OAuthRefreshTokenFieldRefs {
    readonly id: FieldRef<"OAuthRefreshToken", 'String'>
    readonly token: FieldRef<"OAuthRefreshToken", 'String'>
    readonly access_token_id: FieldRef<"OAuthRefreshToken", 'String'>
    readonly client_id: FieldRef<"OAuthRefreshToken", 'String'>
    readonly user_id: FieldRef<"OAuthRefreshToken", 'String'>
    readonly scope: FieldRef<"OAuthRefreshToken", 'String'>
    readonly expires_at: FieldRef<"OAuthRefreshToken", 'DateTime'>
    readonly revoked_at: FieldRef<"OAuthRefreshToken", 'DateTime'>
    readonly created_at: FieldRef<"OAuthRefreshToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthRefreshToken findUnique
   */
  export type OAuthRefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthRefreshToken to fetch.
     */
    where: OAuthRefreshTokenWhereUniqueInput
  }

  /**
   * OAuthRefreshToken findUniqueOrThrow
   */
  export type OAuthRefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthRefreshToken to fetch.
     */
    where: OAuthRefreshTokenWhereUniqueInput
  }

  /**
   * OAuthRefreshToken findFirst
   */
  export type OAuthRefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthRefreshToken to fetch.
     */
    where?: OAuthRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthRefreshTokens to fetch.
     */
    orderBy?: OAuthRefreshTokenOrderByWithRelationInput | OAuthRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthRefreshTokens.
     */
    cursor?: OAuthRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthRefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthRefreshTokens.
     */
    distinct?: OAuthRefreshTokenScalarFieldEnum | OAuthRefreshTokenScalarFieldEnum[]
  }

  /**
   * OAuthRefreshToken findFirstOrThrow
   */
  export type OAuthRefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthRefreshToken to fetch.
     */
    where?: OAuthRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthRefreshTokens to fetch.
     */
    orderBy?: OAuthRefreshTokenOrderByWithRelationInput | OAuthRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthRefreshTokens.
     */
    cursor?: OAuthRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthRefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthRefreshTokens.
     */
    distinct?: OAuthRefreshTokenScalarFieldEnum | OAuthRefreshTokenScalarFieldEnum[]
  }

  /**
   * OAuthRefreshToken findMany
   */
  export type OAuthRefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthRefreshTokens to fetch.
     */
    where?: OAuthRefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthRefreshTokens to fetch.
     */
    orderBy?: OAuthRefreshTokenOrderByWithRelationInput | OAuthRefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthRefreshTokens.
     */
    cursor?: OAuthRefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthRefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthRefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthRefreshTokens.
     */
    distinct?: OAuthRefreshTokenScalarFieldEnum | OAuthRefreshTokenScalarFieldEnum[]
  }

  /**
   * OAuthRefreshToken create
   */
  export type OAuthRefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthRefreshToken.
     */
    data: XOR<OAuthRefreshTokenCreateInput, OAuthRefreshTokenUncheckedCreateInput>
  }

  /**
   * OAuthRefreshToken createMany
   */
  export type OAuthRefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthRefreshTokens.
     */
    data: OAuthRefreshTokenCreateManyInput | OAuthRefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthRefreshToken createManyAndReturn
   */
  export type OAuthRefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthRefreshTokens.
     */
    data: OAuthRefreshTokenCreateManyInput | OAuthRefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthRefreshToken update
   */
  export type OAuthRefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthRefreshToken.
     */
    data: XOR<OAuthRefreshTokenUpdateInput, OAuthRefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which OAuthRefreshToken to update.
     */
    where: OAuthRefreshTokenWhereUniqueInput
  }

  /**
   * OAuthRefreshToken updateMany
   */
  export type OAuthRefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthRefreshTokens.
     */
    data: XOR<OAuthRefreshTokenUpdateManyMutationInput, OAuthRefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthRefreshTokens to update
     */
    where?: OAuthRefreshTokenWhereInput
    /**
     * Limit how many OAuthRefreshTokens to update.
     */
    limit?: number
  }

  /**
   * OAuthRefreshToken updateManyAndReturn
   */
  export type OAuthRefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update OAuthRefreshTokens.
     */
    data: XOR<OAuthRefreshTokenUpdateManyMutationInput, OAuthRefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthRefreshTokens to update
     */
    where?: OAuthRefreshTokenWhereInput
    /**
     * Limit how many OAuthRefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthRefreshToken upsert
   */
  export type OAuthRefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthRefreshToken to update in case it exists.
     */
    where: OAuthRefreshTokenWhereUniqueInput
    /**
     * In case the OAuthRefreshToken found by the `where` argument doesn't exist, create a new OAuthRefreshToken with this data.
     */
    create: XOR<OAuthRefreshTokenCreateInput, OAuthRefreshTokenUncheckedCreateInput>
    /**
     * In case the OAuthRefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthRefreshTokenUpdateInput, OAuthRefreshTokenUncheckedUpdateInput>
  }

  /**
   * OAuthRefreshToken delete
   */
  export type OAuthRefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which OAuthRefreshToken to delete.
     */
    where: OAuthRefreshTokenWhereUniqueInput
  }

  /**
   * OAuthRefreshToken deleteMany
   */
  export type OAuthRefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthRefreshTokens to delete
     */
    where?: OAuthRefreshTokenWhereInput
    /**
     * Limit how many OAuthRefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * OAuthRefreshToken.user
   */
  export type OAuthRefreshToken$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * OAuthRefreshToken without action
   */
  export type OAuthRefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthRefreshToken
     */
    select?: OAuthRefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthRefreshToken
     */
    omit?: OAuthRefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthRefreshTokenInclude<ExtArgs> | null
  }


  /**
   * Model OAuthDeviceCode
   */

  export type AggregateOAuthDeviceCode = {
    _count: OAuthDeviceCodeCountAggregateOutputType | null
    _avg: OAuthDeviceCodeAvgAggregateOutputType | null
    _sum: OAuthDeviceCodeSumAggregateOutputType | null
    _min: OAuthDeviceCodeMinAggregateOutputType | null
    _max: OAuthDeviceCodeMaxAggregateOutputType | null
  }

  export type OAuthDeviceCodeAvgAggregateOutputType = {
    interval: number | null
  }

  export type OAuthDeviceCodeSumAggregateOutputType = {
    interval: number | null
  }

  export type OAuthDeviceCodeMinAggregateOutputType = {
    id: string | null
    device_code: string | null
    user_code: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    expires_at: Date | null
    interval: number | null
    verified: boolean | null
    completed_at: Date | null
    created_at: Date | null
  }

  export type OAuthDeviceCodeMaxAggregateOutputType = {
    id: string | null
    device_code: string | null
    user_code: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    expires_at: Date | null
    interval: number | null
    verified: boolean | null
    completed_at: Date | null
    created_at: Date | null
  }

  export type OAuthDeviceCodeCountAggregateOutputType = {
    id: number
    device_code: number
    user_code: number
    client_id: number
    user_id: number
    scope: number
    expires_at: number
    interval: number
    verified: number
    completed_at: number
    created_at: number
    _all: number
  }


  export type OAuthDeviceCodeAvgAggregateInputType = {
    interval?: true
  }

  export type OAuthDeviceCodeSumAggregateInputType = {
    interval?: true
  }

  export type OAuthDeviceCodeMinAggregateInputType = {
    id?: true
    device_code?: true
    user_code?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    interval?: true
    verified?: true
    completed_at?: true
    created_at?: true
  }

  export type OAuthDeviceCodeMaxAggregateInputType = {
    id?: true
    device_code?: true
    user_code?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    interval?: true
    verified?: true
    completed_at?: true
    created_at?: true
  }

  export type OAuthDeviceCodeCountAggregateInputType = {
    id?: true
    device_code?: true
    user_code?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    interval?: true
    verified?: true
    completed_at?: true
    created_at?: true
    _all?: true
  }

  export type OAuthDeviceCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthDeviceCode to aggregate.
     */
    where?: OAuthDeviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthDeviceCodes to fetch.
     */
    orderBy?: OAuthDeviceCodeOrderByWithRelationInput | OAuthDeviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthDeviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthDeviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthDeviceCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthDeviceCodes
    **/
    _count?: true | OAuthDeviceCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OAuthDeviceCodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OAuthDeviceCodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthDeviceCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthDeviceCodeMaxAggregateInputType
  }

  export type GetOAuthDeviceCodeAggregateType<T extends OAuthDeviceCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthDeviceCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthDeviceCode[P]>
      : GetScalarType<T[P], AggregateOAuthDeviceCode[P]>
  }




  export type OAuthDeviceCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthDeviceCodeWhereInput
    orderBy?: OAuthDeviceCodeOrderByWithAggregationInput | OAuthDeviceCodeOrderByWithAggregationInput[]
    by: OAuthDeviceCodeScalarFieldEnum[] | OAuthDeviceCodeScalarFieldEnum
    having?: OAuthDeviceCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthDeviceCodeCountAggregateInputType | true
    _avg?: OAuthDeviceCodeAvgAggregateInputType
    _sum?: OAuthDeviceCodeSumAggregateInputType
    _min?: OAuthDeviceCodeMinAggregateInputType
    _max?: OAuthDeviceCodeMaxAggregateInputType
  }

  export type OAuthDeviceCodeGroupByOutputType = {
    id: string
    device_code: string
    user_code: string
    client_id: string
    user_id: string | null
    scope: string
    expires_at: Date
    interval: number
    verified: boolean
    completed_at: Date | null
    created_at: Date
    _count: OAuthDeviceCodeCountAggregateOutputType | null
    _avg: OAuthDeviceCodeAvgAggregateOutputType | null
    _sum: OAuthDeviceCodeSumAggregateOutputType | null
    _min: OAuthDeviceCodeMinAggregateOutputType | null
    _max: OAuthDeviceCodeMaxAggregateOutputType | null
  }

  type GetOAuthDeviceCodeGroupByPayload<T extends OAuthDeviceCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthDeviceCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthDeviceCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthDeviceCodeGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthDeviceCodeGroupByOutputType[P]>
        }
      >
    >


  export type OAuthDeviceCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_code?: boolean
    user_code?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    interval?: boolean
    verified?: boolean
    completed_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthDeviceCode$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthDeviceCode"]>

  export type OAuthDeviceCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_code?: boolean
    user_code?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    interval?: boolean
    verified?: boolean
    completed_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthDeviceCode$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthDeviceCode"]>

  export type OAuthDeviceCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    device_code?: boolean
    user_code?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    interval?: boolean
    verified?: boolean
    completed_at?: boolean
    created_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthDeviceCode$userArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthDeviceCode"]>

  export type OAuthDeviceCodeSelectScalar = {
    id?: boolean
    device_code?: boolean
    user_code?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    interval?: boolean
    verified?: boolean
    completed_at?: boolean
    created_at?: boolean
  }

  export type OAuthDeviceCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "device_code" | "user_code" | "client_id" | "user_id" | "scope" | "expires_at" | "interval" | "verified" | "completed_at" | "created_at", ExtArgs["result"]["oAuthDeviceCode"]>
  export type OAuthDeviceCodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthDeviceCode$userArgs<ExtArgs>
  }
  export type OAuthDeviceCodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthDeviceCode$userArgs<ExtArgs>
  }
  export type OAuthDeviceCodeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | OAuthDeviceCode$userArgs<ExtArgs>
  }

  export type $OAuthDeviceCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthDeviceCode"
    objects: {
      client: Prisma.$OAuthClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      device_code: string
      user_code: string
      client_id: string
      user_id: string | null
      scope: string
      expires_at: Date
      interval: number
      verified: boolean
      completed_at: Date | null
      created_at: Date
    }, ExtArgs["result"]["oAuthDeviceCode"]>
    composites: {}
  }

  type OAuthDeviceCodeGetPayload<S extends boolean | null | undefined | OAuthDeviceCodeDefaultArgs> = $Result.GetResult<Prisma.$OAuthDeviceCodePayload, S>

  type OAuthDeviceCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthDeviceCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthDeviceCodeCountAggregateInputType | true
    }

  export interface OAuthDeviceCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthDeviceCode'], meta: { name: 'OAuthDeviceCode' } }
    /**
     * Find zero or one OAuthDeviceCode that matches the filter.
     * @param {OAuthDeviceCodeFindUniqueArgs} args - Arguments to find a OAuthDeviceCode
     * @example
     * // Get one OAuthDeviceCode
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthDeviceCodeFindUniqueArgs>(args: SelectSubset<T, OAuthDeviceCodeFindUniqueArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthDeviceCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthDeviceCodeFindUniqueOrThrowArgs} args - Arguments to find a OAuthDeviceCode
     * @example
     * // Get one OAuthDeviceCode
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthDeviceCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthDeviceCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthDeviceCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthDeviceCodeFindFirstArgs} args - Arguments to find a OAuthDeviceCode
     * @example
     * // Get one OAuthDeviceCode
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthDeviceCodeFindFirstArgs>(args?: SelectSubset<T, OAuthDeviceCodeFindFirstArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthDeviceCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthDeviceCodeFindFirstOrThrowArgs} args - Arguments to find a OAuthDeviceCode
     * @example
     * // Get one OAuthDeviceCode
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthDeviceCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthDeviceCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthDeviceCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthDeviceCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthDeviceCodes
     * const oAuthDeviceCodes = await prisma.oAuthDeviceCode.findMany()
     * 
     * // Get first 10 OAuthDeviceCodes
     * const oAuthDeviceCodes = await prisma.oAuthDeviceCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthDeviceCodeWithIdOnly = await prisma.oAuthDeviceCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthDeviceCodeFindManyArgs>(args?: SelectSubset<T, OAuthDeviceCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthDeviceCode.
     * @param {OAuthDeviceCodeCreateArgs} args - Arguments to create a OAuthDeviceCode.
     * @example
     * // Create one OAuthDeviceCode
     * const OAuthDeviceCode = await prisma.oAuthDeviceCode.create({
     *   data: {
     *     // ... data to create a OAuthDeviceCode
     *   }
     * })
     * 
     */
    create<T extends OAuthDeviceCodeCreateArgs>(args: SelectSubset<T, OAuthDeviceCodeCreateArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthDeviceCodes.
     * @param {OAuthDeviceCodeCreateManyArgs} args - Arguments to create many OAuthDeviceCodes.
     * @example
     * // Create many OAuthDeviceCodes
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthDeviceCodeCreateManyArgs>(args?: SelectSubset<T, OAuthDeviceCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthDeviceCodes and returns the data saved in the database.
     * @param {OAuthDeviceCodeCreateManyAndReturnArgs} args - Arguments to create many OAuthDeviceCodes.
     * @example
     * // Create many OAuthDeviceCodes
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthDeviceCodes and only return the `id`
     * const oAuthDeviceCodeWithIdOnly = await prisma.oAuthDeviceCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthDeviceCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthDeviceCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthDeviceCode.
     * @param {OAuthDeviceCodeDeleteArgs} args - Arguments to delete one OAuthDeviceCode.
     * @example
     * // Delete one OAuthDeviceCode
     * const OAuthDeviceCode = await prisma.oAuthDeviceCode.delete({
     *   where: {
     *     // ... filter to delete one OAuthDeviceCode
     *   }
     * })
     * 
     */
    delete<T extends OAuthDeviceCodeDeleteArgs>(args: SelectSubset<T, OAuthDeviceCodeDeleteArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthDeviceCode.
     * @param {OAuthDeviceCodeUpdateArgs} args - Arguments to update one OAuthDeviceCode.
     * @example
     * // Update one OAuthDeviceCode
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthDeviceCodeUpdateArgs>(args: SelectSubset<T, OAuthDeviceCodeUpdateArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthDeviceCodes.
     * @param {OAuthDeviceCodeDeleteManyArgs} args - Arguments to filter OAuthDeviceCodes to delete.
     * @example
     * // Delete a few OAuthDeviceCodes
     * const { count } = await prisma.oAuthDeviceCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthDeviceCodeDeleteManyArgs>(args?: SelectSubset<T, OAuthDeviceCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthDeviceCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthDeviceCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthDeviceCodes
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthDeviceCodeUpdateManyArgs>(args: SelectSubset<T, OAuthDeviceCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthDeviceCodes and returns the data updated in the database.
     * @param {OAuthDeviceCodeUpdateManyAndReturnArgs} args - Arguments to update many OAuthDeviceCodes.
     * @example
     * // Update many OAuthDeviceCodes
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthDeviceCodes and only return the `id`
     * const oAuthDeviceCodeWithIdOnly = await prisma.oAuthDeviceCode.updateManyAndReturn({
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
    updateManyAndReturn<T extends OAuthDeviceCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthDeviceCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthDeviceCode.
     * @param {OAuthDeviceCodeUpsertArgs} args - Arguments to update or create a OAuthDeviceCode.
     * @example
     * // Update or create a OAuthDeviceCode
     * const oAuthDeviceCode = await prisma.oAuthDeviceCode.upsert({
     *   create: {
     *     // ... data to create a OAuthDeviceCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthDeviceCode we want to update
     *   }
     * })
     */
    upsert<T extends OAuthDeviceCodeUpsertArgs>(args: SelectSubset<T, OAuthDeviceCodeUpsertArgs<ExtArgs>>): Prisma__OAuthDeviceCodeClient<$Result.GetResult<Prisma.$OAuthDeviceCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthDeviceCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthDeviceCodeCountArgs} args - Arguments to filter OAuthDeviceCodes to count.
     * @example
     * // Count the number of OAuthDeviceCodes
     * const count = await prisma.oAuthDeviceCode.count({
     *   where: {
     *     // ... the filter for the OAuthDeviceCodes we want to count
     *   }
     * })
    **/
    count<T extends OAuthDeviceCodeCountArgs>(
      args?: Subset<T, OAuthDeviceCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthDeviceCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthDeviceCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthDeviceCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OAuthDeviceCodeAggregateArgs>(args: Subset<T, OAuthDeviceCodeAggregateArgs>): Prisma.PrismaPromise<GetOAuthDeviceCodeAggregateType<T>>

    /**
     * Group by OAuthDeviceCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthDeviceCodeGroupByArgs} args - Group by arguments.
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
      T extends OAuthDeviceCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthDeviceCodeGroupByArgs['orderBy'] }
        : { orderBy?: OAuthDeviceCodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OAuthDeviceCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthDeviceCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthDeviceCode model
   */
  readonly fields: OAuthDeviceCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthDeviceCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthDeviceCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends OAuthClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClientDefaultArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends OAuthDeviceCode$userArgs<ExtArgs> = {}>(args?: Subset<T, OAuthDeviceCode$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OAuthDeviceCode model
   */
  interface OAuthDeviceCodeFieldRefs {
    readonly id: FieldRef<"OAuthDeviceCode", 'String'>
    readonly device_code: FieldRef<"OAuthDeviceCode", 'String'>
    readonly user_code: FieldRef<"OAuthDeviceCode", 'String'>
    readonly client_id: FieldRef<"OAuthDeviceCode", 'String'>
    readonly user_id: FieldRef<"OAuthDeviceCode", 'String'>
    readonly scope: FieldRef<"OAuthDeviceCode", 'String'>
    readonly expires_at: FieldRef<"OAuthDeviceCode", 'DateTime'>
    readonly interval: FieldRef<"OAuthDeviceCode", 'Int'>
    readonly verified: FieldRef<"OAuthDeviceCode", 'Boolean'>
    readonly completed_at: FieldRef<"OAuthDeviceCode", 'DateTime'>
    readonly created_at: FieldRef<"OAuthDeviceCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthDeviceCode findUnique
   */
  export type OAuthDeviceCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthDeviceCode to fetch.
     */
    where: OAuthDeviceCodeWhereUniqueInput
  }

  /**
   * OAuthDeviceCode findUniqueOrThrow
   */
  export type OAuthDeviceCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthDeviceCode to fetch.
     */
    where: OAuthDeviceCodeWhereUniqueInput
  }

  /**
   * OAuthDeviceCode findFirst
   */
  export type OAuthDeviceCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthDeviceCode to fetch.
     */
    where?: OAuthDeviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthDeviceCodes to fetch.
     */
    orderBy?: OAuthDeviceCodeOrderByWithRelationInput | OAuthDeviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthDeviceCodes.
     */
    cursor?: OAuthDeviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthDeviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthDeviceCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthDeviceCodes.
     */
    distinct?: OAuthDeviceCodeScalarFieldEnum | OAuthDeviceCodeScalarFieldEnum[]
  }

  /**
   * OAuthDeviceCode findFirstOrThrow
   */
  export type OAuthDeviceCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthDeviceCode to fetch.
     */
    where?: OAuthDeviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthDeviceCodes to fetch.
     */
    orderBy?: OAuthDeviceCodeOrderByWithRelationInput | OAuthDeviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthDeviceCodes.
     */
    cursor?: OAuthDeviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthDeviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthDeviceCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthDeviceCodes.
     */
    distinct?: OAuthDeviceCodeScalarFieldEnum | OAuthDeviceCodeScalarFieldEnum[]
  }

  /**
   * OAuthDeviceCode findMany
   */
  export type OAuthDeviceCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * Filter, which OAuthDeviceCodes to fetch.
     */
    where?: OAuthDeviceCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthDeviceCodes to fetch.
     */
    orderBy?: OAuthDeviceCodeOrderByWithRelationInput | OAuthDeviceCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthDeviceCodes.
     */
    cursor?: OAuthDeviceCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthDeviceCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthDeviceCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthDeviceCodes.
     */
    distinct?: OAuthDeviceCodeScalarFieldEnum | OAuthDeviceCodeScalarFieldEnum[]
  }

  /**
   * OAuthDeviceCode create
   */
  export type OAuthDeviceCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthDeviceCode.
     */
    data: XOR<OAuthDeviceCodeCreateInput, OAuthDeviceCodeUncheckedCreateInput>
  }

  /**
   * OAuthDeviceCode createMany
   */
  export type OAuthDeviceCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthDeviceCodes.
     */
    data: OAuthDeviceCodeCreateManyInput | OAuthDeviceCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthDeviceCode createManyAndReturn
   */
  export type OAuthDeviceCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthDeviceCodes.
     */
    data: OAuthDeviceCodeCreateManyInput | OAuthDeviceCodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthDeviceCode update
   */
  export type OAuthDeviceCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthDeviceCode.
     */
    data: XOR<OAuthDeviceCodeUpdateInput, OAuthDeviceCodeUncheckedUpdateInput>
    /**
     * Choose, which OAuthDeviceCode to update.
     */
    where: OAuthDeviceCodeWhereUniqueInput
  }

  /**
   * OAuthDeviceCode updateMany
   */
  export type OAuthDeviceCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthDeviceCodes.
     */
    data: XOR<OAuthDeviceCodeUpdateManyMutationInput, OAuthDeviceCodeUncheckedUpdateManyInput>
    /**
     * Filter which OAuthDeviceCodes to update
     */
    where?: OAuthDeviceCodeWhereInput
    /**
     * Limit how many OAuthDeviceCodes to update.
     */
    limit?: number
  }

  /**
   * OAuthDeviceCode updateManyAndReturn
   */
  export type OAuthDeviceCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * The data used to update OAuthDeviceCodes.
     */
    data: XOR<OAuthDeviceCodeUpdateManyMutationInput, OAuthDeviceCodeUncheckedUpdateManyInput>
    /**
     * Filter which OAuthDeviceCodes to update
     */
    where?: OAuthDeviceCodeWhereInput
    /**
     * Limit how many OAuthDeviceCodes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthDeviceCode upsert
   */
  export type OAuthDeviceCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthDeviceCode to update in case it exists.
     */
    where: OAuthDeviceCodeWhereUniqueInput
    /**
     * In case the OAuthDeviceCode found by the `where` argument doesn't exist, create a new OAuthDeviceCode with this data.
     */
    create: XOR<OAuthDeviceCodeCreateInput, OAuthDeviceCodeUncheckedCreateInput>
    /**
     * In case the OAuthDeviceCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthDeviceCodeUpdateInput, OAuthDeviceCodeUncheckedUpdateInput>
  }

  /**
   * OAuthDeviceCode delete
   */
  export type OAuthDeviceCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
    /**
     * Filter which OAuthDeviceCode to delete.
     */
    where: OAuthDeviceCodeWhereUniqueInput
  }

  /**
   * OAuthDeviceCode deleteMany
   */
  export type OAuthDeviceCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthDeviceCodes to delete
     */
    where?: OAuthDeviceCodeWhereInput
    /**
     * Limit how many OAuthDeviceCodes to delete.
     */
    limit?: number
  }

  /**
   * OAuthDeviceCode.user
   */
  export type OAuthDeviceCode$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * OAuthDeviceCode without action
   */
  export type OAuthDeviceCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthDeviceCode
     */
    select?: OAuthDeviceCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthDeviceCode
     */
    omit?: OAuthDeviceCodeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthDeviceCodeInclude<ExtArgs> | null
  }


  /**
   * Model OAuthUserConsent
   */

  export type AggregateOAuthUserConsent = {
    _count: OAuthUserConsentCountAggregateOutputType | null
    _min: OAuthUserConsentMinAggregateOutputType | null
    _max: OAuthUserConsentMaxAggregateOutputType | null
  }

  export type OAuthUserConsentMinAggregateOutputType = {
    id: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OAuthUserConsentMaxAggregateOutputType = {
    id: string | null
    client_id: string | null
    user_id: string | null
    scope: string | null
    expires_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OAuthUserConsentCountAggregateOutputType = {
    id: number
    client_id: number
    user_id: number
    scope: number
    expires_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OAuthUserConsentMinAggregateInputType = {
    id?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type OAuthUserConsentMaxAggregateInputType = {
    id?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
  }

  export type OAuthUserConsentCountAggregateInputType = {
    id?: true
    client_id?: true
    user_id?: true
    scope?: true
    expires_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OAuthUserConsentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthUserConsent to aggregate.
     */
    where?: OAuthUserConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUserConsents to fetch.
     */
    orderBy?: OAuthUserConsentOrderByWithRelationInput | OAuthUserConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthUserConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUserConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUserConsents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthUserConsents
    **/
    _count?: true | OAuthUserConsentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthUserConsentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthUserConsentMaxAggregateInputType
  }

  export type GetOAuthUserConsentAggregateType<T extends OAuthUserConsentAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthUserConsent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthUserConsent[P]>
      : GetScalarType<T[P], AggregateOAuthUserConsent[P]>
  }




  export type OAuthUserConsentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthUserConsentWhereInput
    orderBy?: OAuthUserConsentOrderByWithAggregationInput | OAuthUserConsentOrderByWithAggregationInput[]
    by: OAuthUserConsentScalarFieldEnum[] | OAuthUserConsentScalarFieldEnum
    having?: OAuthUserConsentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthUserConsentCountAggregateInputType | true
    _min?: OAuthUserConsentMinAggregateInputType
    _max?: OAuthUserConsentMaxAggregateInputType
  }

  export type OAuthUserConsentGroupByOutputType = {
    id: string
    client_id: string
    user_id: string
    scope: string
    expires_at: Date | null
    created_at: Date
    updated_at: Date
    _count: OAuthUserConsentCountAggregateOutputType | null
    _min: OAuthUserConsentMinAggregateOutputType | null
    _max: OAuthUserConsentMaxAggregateOutputType | null
  }

  type GetOAuthUserConsentGroupByPayload<T extends OAuthUserConsentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthUserConsentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthUserConsentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthUserConsentGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthUserConsentGroupByOutputType[P]>
        }
      >
    >


  export type OAuthUserConsentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthUserConsent"]>

  export type OAuthUserConsentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthUserConsent"]>

  export type OAuthUserConsentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthUserConsent"]>

  export type OAuthUserConsentSelectScalar = {
    id?: boolean
    client_id?: boolean
    user_id?: boolean
    scope?: boolean
    expires_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OAuthUserConsentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "client_id" | "user_id" | "scope" | "expires_at" | "created_at" | "updated_at", ExtArgs["result"]["oAuthUserConsent"]>
  export type OAuthUserConsentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthUserConsentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthUserConsentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | OAuthClientDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthUserConsentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthUserConsent"
    objects: {
      client: Prisma.$OAuthClientPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      client_id: string
      user_id: string
      scope: string
      expires_at: Date | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["oAuthUserConsent"]>
    composites: {}
  }

  type OAuthUserConsentGetPayload<S extends boolean | null | undefined | OAuthUserConsentDefaultArgs> = $Result.GetResult<Prisma.$OAuthUserConsentPayload, S>

  type OAuthUserConsentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthUserConsentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthUserConsentCountAggregateInputType | true
    }

  export interface OAuthUserConsentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthUserConsent'], meta: { name: 'OAuthUserConsent' } }
    /**
     * Find zero or one OAuthUserConsent that matches the filter.
     * @param {OAuthUserConsentFindUniqueArgs} args - Arguments to find a OAuthUserConsent
     * @example
     * // Get one OAuthUserConsent
     * const oAuthUserConsent = await prisma.oAuthUserConsent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthUserConsentFindUniqueArgs>(args: SelectSubset<T, OAuthUserConsentFindUniqueArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthUserConsent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthUserConsentFindUniqueOrThrowArgs} args - Arguments to find a OAuthUserConsent
     * @example
     * // Get one OAuthUserConsent
     * const oAuthUserConsent = await prisma.oAuthUserConsent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthUserConsentFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthUserConsentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthUserConsent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserConsentFindFirstArgs} args - Arguments to find a OAuthUserConsent
     * @example
     * // Get one OAuthUserConsent
     * const oAuthUserConsent = await prisma.oAuthUserConsent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthUserConsentFindFirstArgs>(args?: SelectSubset<T, OAuthUserConsentFindFirstArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthUserConsent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserConsentFindFirstOrThrowArgs} args - Arguments to find a OAuthUserConsent
     * @example
     * // Get one OAuthUserConsent
     * const oAuthUserConsent = await prisma.oAuthUserConsent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthUserConsentFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthUserConsentFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthUserConsents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserConsentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthUserConsents
     * const oAuthUserConsents = await prisma.oAuthUserConsent.findMany()
     * 
     * // Get first 10 OAuthUserConsents
     * const oAuthUserConsents = await prisma.oAuthUserConsent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthUserConsentWithIdOnly = await prisma.oAuthUserConsent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthUserConsentFindManyArgs>(args?: SelectSubset<T, OAuthUserConsentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthUserConsent.
     * @param {OAuthUserConsentCreateArgs} args - Arguments to create a OAuthUserConsent.
     * @example
     * // Create one OAuthUserConsent
     * const OAuthUserConsent = await prisma.oAuthUserConsent.create({
     *   data: {
     *     // ... data to create a OAuthUserConsent
     *   }
     * })
     * 
     */
    create<T extends OAuthUserConsentCreateArgs>(args: SelectSubset<T, OAuthUserConsentCreateArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthUserConsents.
     * @param {OAuthUserConsentCreateManyArgs} args - Arguments to create many OAuthUserConsents.
     * @example
     * // Create many OAuthUserConsents
     * const oAuthUserConsent = await prisma.oAuthUserConsent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthUserConsentCreateManyArgs>(args?: SelectSubset<T, OAuthUserConsentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthUserConsents and returns the data saved in the database.
     * @param {OAuthUserConsentCreateManyAndReturnArgs} args - Arguments to create many OAuthUserConsents.
     * @example
     * // Create many OAuthUserConsents
     * const oAuthUserConsent = await prisma.oAuthUserConsent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthUserConsents and only return the `id`
     * const oAuthUserConsentWithIdOnly = await prisma.oAuthUserConsent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthUserConsentCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthUserConsentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthUserConsent.
     * @param {OAuthUserConsentDeleteArgs} args - Arguments to delete one OAuthUserConsent.
     * @example
     * // Delete one OAuthUserConsent
     * const OAuthUserConsent = await prisma.oAuthUserConsent.delete({
     *   where: {
     *     // ... filter to delete one OAuthUserConsent
     *   }
     * })
     * 
     */
    delete<T extends OAuthUserConsentDeleteArgs>(args: SelectSubset<T, OAuthUserConsentDeleteArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthUserConsent.
     * @param {OAuthUserConsentUpdateArgs} args - Arguments to update one OAuthUserConsent.
     * @example
     * // Update one OAuthUserConsent
     * const oAuthUserConsent = await prisma.oAuthUserConsent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthUserConsentUpdateArgs>(args: SelectSubset<T, OAuthUserConsentUpdateArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthUserConsents.
     * @param {OAuthUserConsentDeleteManyArgs} args - Arguments to filter OAuthUserConsents to delete.
     * @example
     * // Delete a few OAuthUserConsents
     * const { count } = await prisma.oAuthUserConsent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthUserConsentDeleteManyArgs>(args?: SelectSubset<T, OAuthUserConsentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthUserConsents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserConsentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthUserConsents
     * const oAuthUserConsent = await prisma.oAuthUserConsent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthUserConsentUpdateManyArgs>(args: SelectSubset<T, OAuthUserConsentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthUserConsents and returns the data updated in the database.
     * @param {OAuthUserConsentUpdateManyAndReturnArgs} args - Arguments to update many OAuthUserConsents.
     * @example
     * // Update many OAuthUserConsents
     * const oAuthUserConsent = await prisma.oAuthUserConsent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthUserConsents and only return the `id`
     * const oAuthUserConsentWithIdOnly = await prisma.oAuthUserConsent.updateManyAndReturn({
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
    updateManyAndReturn<T extends OAuthUserConsentUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthUserConsentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthUserConsent.
     * @param {OAuthUserConsentUpsertArgs} args - Arguments to update or create a OAuthUserConsent.
     * @example
     * // Update or create a OAuthUserConsent
     * const oAuthUserConsent = await prisma.oAuthUserConsent.upsert({
     *   create: {
     *     // ... data to create a OAuthUserConsent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthUserConsent we want to update
     *   }
     * })
     */
    upsert<T extends OAuthUserConsentUpsertArgs>(args: SelectSubset<T, OAuthUserConsentUpsertArgs<ExtArgs>>): Prisma__OAuthUserConsentClient<$Result.GetResult<Prisma.$OAuthUserConsentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthUserConsents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserConsentCountArgs} args - Arguments to filter OAuthUserConsents to count.
     * @example
     * // Count the number of OAuthUserConsents
     * const count = await prisma.oAuthUserConsent.count({
     *   where: {
     *     // ... the filter for the OAuthUserConsents we want to count
     *   }
     * })
    **/
    count<T extends OAuthUserConsentCountArgs>(
      args?: Subset<T, OAuthUserConsentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthUserConsentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthUserConsent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserConsentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OAuthUserConsentAggregateArgs>(args: Subset<T, OAuthUserConsentAggregateArgs>): Prisma.PrismaPromise<GetOAuthUserConsentAggregateType<T>>

    /**
     * Group by OAuthUserConsent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthUserConsentGroupByArgs} args - Group by arguments.
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
      T extends OAuthUserConsentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthUserConsentGroupByArgs['orderBy'] }
        : { orderBy?: OAuthUserConsentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OAuthUserConsentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthUserConsentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthUserConsent model
   */
  readonly fields: OAuthUserConsentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthUserConsent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthUserConsentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends OAuthClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OAuthClientDefaultArgs<ExtArgs>>): Prisma__OAuthClientClient<$Result.GetResult<Prisma.$OAuthClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OAuthUserConsent model
   */
  interface OAuthUserConsentFieldRefs {
    readonly id: FieldRef<"OAuthUserConsent", 'String'>
    readonly client_id: FieldRef<"OAuthUserConsent", 'String'>
    readonly user_id: FieldRef<"OAuthUserConsent", 'String'>
    readonly scope: FieldRef<"OAuthUserConsent", 'String'>
    readonly expires_at: FieldRef<"OAuthUserConsent", 'DateTime'>
    readonly created_at: FieldRef<"OAuthUserConsent", 'DateTime'>
    readonly updated_at: FieldRef<"OAuthUserConsent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OAuthUserConsent findUnique
   */
  export type OAuthUserConsentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUserConsent to fetch.
     */
    where: OAuthUserConsentWhereUniqueInput
  }

  /**
   * OAuthUserConsent findUniqueOrThrow
   */
  export type OAuthUserConsentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUserConsent to fetch.
     */
    where: OAuthUserConsentWhereUniqueInput
  }

  /**
   * OAuthUserConsent findFirst
   */
  export type OAuthUserConsentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUserConsent to fetch.
     */
    where?: OAuthUserConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUserConsents to fetch.
     */
    orderBy?: OAuthUserConsentOrderByWithRelationInput | OAuthUserConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthUserConsents.
     */
    cursor?: OAuthUserConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUserConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUserConsents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthUserConsents.
     */
    distinct?: OAuthUserConsentScalarFieldEnum | OAuthUserConsentScalarFieldEnum[]
  }

  /**
   * OAuthUserConsent findFirstOrThrow
   */
  export type OAuthUserConsentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUserConsent to fetch.
     */
    where?: OAuthUserConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUserConsents to fetch.
     */
    orderBy?: OAuthUserConsentOrderByWithRelationInput | OAuthUserConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthUserConsents.
     */
    cursor?: OAuthUserConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUserConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUserConsents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthUserConsents.
     */
    distinct?: OAuthUserConsentScalarFieldEnum | OAuthUserConsentScalarFieldEnum[]
  }

  /**
   * OAuthUserConsent findMany
   */
  export type OAuthUserConsentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * Filter, which OAuthUserConsents to fetch.
     */
    where?: OAuthUserConsentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthUserConsents to fetch.
     */
    orderBy?: OAuthUserConsentOrderByWithRelationInput | OAuthUserConsentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthUserConsents.
     */
    cursor?: OAuthUserConsentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthUserConsents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthUserConsents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthUserConsents.
     */
    distinct?: OAuthUserConsentScalarFieldEnum | OAuthUserConsentScalarFieldEnum[]
  }

  /**
   * OAuthUserConsent create
   */
  export type OAuthUserConsentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthUserConsent.
     */
    data: XOR<OAuthUserConsentCreateInput, OAuthUserConsentUncheckedCreateInput>
  }

  /**
   * OAuthUserConsent createMany
   */
  export type OAuthUserConsentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthUserConsents.
     */
    data: OAuthUserConsentCreateManyInput | OAuthUserConsentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthUserConsent createManyAndReturn
   */
  export type OAuthUserConsentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthUserConsents.
     */
    data: OAuthUserConsentCreateManyInput | OAuthUserConsentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthUserConsent update
   */
  export type OAuthUserConsentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthUserConsent.
     */
    data: XOR<OAuthUserConsentUpdateInput, OAuthUserConsentUncheckedUpdateInput>
    /**
     * Choose, which OAuthUserConsent to update.
     */
    where: OAuthUserConsentWhereUniqueInput
  }

  /**
   * OAuthUserConsent updateMany
   */
  export type OAuthUserConsentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthUserConsents.
     */
    data: XOR<OAuthUserConsentUpdateManyMutationInput, OAuthUserConsentUncheckedUpdateManyInput>
    /**
     * Filter which OAuthUserConsents to update
     */
    where?: OAuthUserConsentWhereInput
    /**
     * Limit how many OAuthUserConsents to update.
     */
    limit?: number
  }

  /**
   * OAuthUserConsent updateManyAndReturn
   */
  export type OAuthUserConsentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * The data used to update OAuthUserConsents.
     */
    data: XOR<OAuthUserConsentUpdateManyMutationInput, OAuthUserConsentUncheckedUpdateManyInput>
    /**
     * Filter which OAuthUserConsents to update
     */
    where?: OAuthUserConsentWhereInput
    /**
     * Limit how many OAuthUserConsents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthUserConsent upsert
   */
  export type OAuthUserConsentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthUserConsent to update in case it exists.
     */
    where: OAuthUserConsentWhereUniqueInput
    /**
     * In case the OAuthUserConsent found by the `where` argument doesn't exist, create a new OAuthUserConsent with this data.
     */
    create: XOR<OAuthUserConsentCreateInput, OAuthUserConsentUncheckedCreateInput>
    /**
     * In case the OAuthUserConsent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthUserConsentUpdateInput, OAuthUserConsentUncheckedUpdateInput>
  }

  /**
   * OAuthUserConsent delete
   */
  export type OAuthUserConsentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
    /**
     * Filter which OAuthUserConsent to delete.
     */
    where: OAuthUserConsentWhereUniqueInput
  }

  /**
   * OAuthUserConsent deleteMany
   */
  export type OAuthUserConsentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthUserConsents to delete
     */
    where?: OAuthUserConsentWhereInput
    /**
     * Limit how many OAuthUserConsents to delete.
     */
    limit?: number
  }

  /**
   * OAuthUserConsent without action
   */
  export type OAuthUserConsentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthUserConsent
     */
    select?: OAuthUserConsentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthUserConsent
     */
    omit?: OAuthUserConsentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthUserConsentInclude<ExtArgs> | null
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


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    user_id: 'user_id',
    expires_at: 'expires_at',
    created_at: 'created_at',
    revoked_at: 'revoked_at'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    token: 'token',
    expires_at: 'expires_at',
    created_at: 'created_at',
    revoked_at: 'revoked_at'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const OAuthClientScalarFieldEnum: {
    id: 'id',
    client_id: 'client_id',
    client_secret: 'client_secret',
    client_secret_hash: 'client_secret_hash',
    name: 'name',
    description: 'description',
    redirect_uris: 'redirect_uris',
    post_logout_redirect_uris: 'post_logout_redirect_uris',
    scopes: 'scopes',
    grant_types: 'grant_types',
    is_confidential: 'is_confidential',
    is_public_client: 'is_public_client',
    require_pkce: 'require_pkce',
    access_token_lifetime: 'access_token_lifetime',
    refresh_token_lifetime: 'refresh_token_lifetime',
    allowed_origins: 'allowed_origins',
    logo_uri: 'logo_uri',
    policy_uri: 'policy_uri',
    tos_uri: 'tos_uri',
    is_active: 'is_active',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OAuthClientScalarFieldEnum = (typeof OAuthClientScalarFieldEnum)[keyof typeof OAuthClientScalarFieldEnum]


  export const OAuthAuthorizationCodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    client_id: 'client_id',
    user_id: 'user_id',
    redirect_uri: 'redirect_uri',
    scope: 'scope',
    state: 'state',
    code_challenge: 'code_challenge',
    code_challenge_method: 'code_challenge_method',
    nonce: 'nonce',
    expires_at: 'expires_at',
    consumed_at: 'consumed_at',
    created_at: 'created_at'
  };

  export type OAuthAuthorizationCodeScalarFieldEnum = (typeof OAuthAuthorizationCodeScalarFieldEnum)[keyof typeof OAuthAuthorizationCodeScalarFieldEnum]


  export const OAuthAccessTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    client_id: 'client_id',
    user_id: 'user_id',
    scope: 'scope',
    token_type: 'token_type',
    expires_at: 'expires_at',
    revoked_at: 'revoked_at',
    created_at: 'created_at'
  };

  export type OAuthAccessTokenScalarFieldEnum = (typeof OAuthAccessTokenScalarFieldEnum)[keyof typeof OAuthAccessTokenScalarFieldEnum]


  export const OAuthRefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    access_token_id: 'access_token_id',
    client_id: 'client_id',
    user_id: 'user_id',
    scope: 'scope',
    expires_at: 'expires_at',
    revoked_at: 'revoked_at',
    created_at: 'created_at'
  };

  export type OAuthRefreshTokenScalarFieldEnum = (typeof OAuthRefreshTokenScalarFieldEnum)[keyof typeof OAuthRefreshTokenScalarFieldEnum]


  export const OAuthDeviceCodeScalarFieldEnum: {
    id: 'id',
    device_code: 'device_code',
    user_code: 'user_code',
    client_id: 'client_id',
    user_id: 'user_id',
    scope: 'scope',
    expires_at: 'expires_at',
    interval: 'interval',
    verified: 'verified',
    completed_at: 'completed_at',
    created_at: 'created_at'
  };

  export type OAuthDeviceCodeScalarFieldEnum = (typeof OAuthDeviceCodeScalarFieldEnum)[keyof typeof OAuthDeviceCodeScalarFieldEnum]


  export const OAuthUserConsentScalarFieldEnum: {
    id: 'id',
    client_id: 'client_id',
    user_id: 'user_id',
    scope: 'scope',
    expires_at: 'expires_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OAuthUserConsentScalarFieldEnum = (typeof OAuthUserConsentScalarFieldEnum)[keyof typeof OAuthUserConsentScalarFieldEnum]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    is_active?: BoolFilter<"User"> | boolean
    email_verified?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    refresh_tokens?: RefreshTokenListRelationFilter
    sessions?: SessionListRelationFilter
    oauth_authorization_codes?: OAuthAuthorizationCodeListRelationFilter
    oauth_access_tokens?: OAuthAccessTokenListRelationFilter
    oauth_refresh_tokens?: OAuthRefreshTokenListRelationFilter
    oauth_device_codes?: OAuthDeviceCodeListRelationFilter
    oauth_consents?: OAuthUserConsentListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    is_active?: SortOrder
    email_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    refresh_tokens?: RefreshTokenOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    oauth_authorization_codes?: OAuthAuthorizationCodeOrderByRelationAggregateInput
    oauth_access_tokens?: OAuthAccessTokenOrderByRelationAggregateInput
    oauth_refresh_tokens?: OAuthRefreshTokenOrderByRelationAggregateInput
    oauth_device_codes?: OAuthDeviceCodeOrderByRelationAggregateInput
    oauth_consents?: OAuthUserConsentOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    first_name?: StringNullableFilter<"User"> | string | null
    last_name?: StringNullableFilter<"User"> | string | null
    is_active?: BoolFilter<"User"> | boolean
    email_verified?: BoolFilter<"User"> | boolean
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    refresh_tokens?: RefreshTokenListRelationFilter
    sessions?: SessionListRelationFilter
    oauth_authorization_codes?: OAuthAuthorizationCodeListRelationFilter
    oauth_access_tokens?: OAuthAccessTokenListRelationFilter
    oauth_refresh_tokens?: OAuthRefreshTokenListRelationFilter
    oauth_device_codes?: OAuthDeviceCodeListRelationFilter
    oauth_consents?: OAuthUserConsentListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    first_name?: SortOrderInput | SortOrder
    last_name?: SortOrderInput | SortOrder
    is_active?: SortOrder
    email_verified?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    first_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    last_name?: StringNullableWithAggregatesFilter<"User"> | string | null
    is_active?: BoolWithAggregatesFilter<"User"> | boolean
    email_verified?: BoolWithAggregatesFilter<"User"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    user_id?: StringFilter<"RefreshToken"> | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    user_id?: StringFilter<"RefreshToken"> | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshToken"> | string
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    user_id?: StringWithAggregatesFilter<"RefreshToken"> | string
    expires_at?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    user_id?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expires_at?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    revoked_at?: DateTimeNullableFilter<"Session"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    user_id?: StringFilter<"Session"> | string
    expires_at?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    revoked_at?: DateTimeNullableFilter<"Session"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    user_id?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expires_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
  }

  export type OAuthClientWhereInput = {
    AND?: OAuthClientWhereInput | OAuthClientWhereInput[]
    OR?: OAuthClientWhereInput[]
    NOT?: OAuthClientWhereInput | OAuthClientWhereInput[]
    id?: StringFilter<"OAuthClient"> | string
    client_id?: StringFilter<"OAuthClient"> | string
    client_secret?: StringNullableFilter<"OAuthClient"> | string | null
    client_secret_hash?: StringNullableFilter<"OAuthClient"> | string | null
    name?: StringFilter<"OAuthClient"> | string
    description?: StringNullableFilter<"OAuthClient"> | string | null
    redirect_uris?: StringNullableListFilter<"OAuthClient">
    post_logout_redirect_uris?: StringNullableListFilter<"OAuthClient">
    scopes?: StringNullableListFilter<"OAuthClient">
    grant_types?: StringNullableListFilter<"OAuthClient">
    is_confidential?: BoolFilter<"OAuthClient"> | boolean
    is_public_client?: BoolFilter<"OAuthClient"> | boolean
    require_pkce?: BoolFilter<"OAuthClient"> | boolean
    access_token_lifetime?: IntFilter<"OAuthClient"> | number
    refresh_token_lifetime?: IntFilter<"OAuthClient"> | number
    allowed_origins?: StringNullableListFilter<"OAuthClient">
    logo_uri?: StringNullableFilter<"OAuthClient"> | string | null
    policy_uri?: StringNullableFilter<"OAuthClient"> | string | null
    tos_uri?: StringNullableFilter<"OAuthClient"> | string | null
    is_active?: BoolFilter<"OAuthClient"> | boolean
    created_at?: DateTimeFilter<"OAuthClient"> | Date | string
    updated_at?: DateTimeFilter<"OAuthClient"> | Date | string
    authorization_codes?: OAuthAuthorizationCodeListRelationFilter
    access_tokens?: OAuthAccessTokenListRelationFilter
    refresh_tokens?: OAuthRefreshTokenListRelationFilter
    device_codes?: OAuthDeviceCodeListRelationFilter
    user_consents?: OAuthUserConsentListRelationFilter
  }

  export type OAuthClientOrderByWithRelationInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrderInput | SortOrder
    client_secret_hash?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    redirect_uris?: SortOrder
    post_logout_redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_confidential?: SortOrder
    is_public_client?: SortOrder
    require_pkce?: SortOrder
    access_token_lifetime?: SortOrder
    refresh_token_lifetime?: SortOrder
    allowed_origins?: SortOrder
    logo_uri?: SortOrderInput | SortOrder
    policy_uri?: SortOrderInput | SortOrder
    tos_uri?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    authorization_codes?: OAuthAuthorizationCodeOrderByRelationAggregateInput
    access_tokens?: OAuthAccessTokenOrderByRelationAggregateInput
    refresh_tokens?: OAuthRefreshTokenOrderByRelationAggregateInput
    device_codes?: OAuthDeviceCodeOrderByRelationAggregateInput
    user_consents?: OAuthUserConsentOrderByRelationAggregateInput
  }

  export type OAuthClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    client_id?: string
    AND?: OAuthClientWhereInput | OAuthClientWhereInput[]
    OR?: OAuthClientWhereInput[]
    NOT?: OAuthClientWhereInput | OAuthClientWhereInput[]
    client_secret?: StringNullableFilter<"OAuthClient"> | string | null
    client_secret_hash?: StringNullableFilter<"OAuthClient"> | string | null
    name?: StringFilter<"OAuthClient"> | string
    description?: StringNullableFilter<"OAuthClient"> | string | null
    redirect_uris?: StringNullableListFilter<"OAuthClient">
    post_logout_redirect_uris?: StringNullableListFilter<"OAuthClient">
    scopes?: StringNullableListFilter<"OAuthClient">
    grant_types?: StringNullableListFilter<"OAuthClient">
    is_confidential?: BoolFilter<"OAuthClient"> | boolean
    is_public_client?: BoolFilter<"OAuthClient"> | boolean
    require_pkce?: BoolFilter<"OAuthClient"> | boolean
    access_token_lifetime?: IntFilter<"OAuthClient"> | number
    refresh_token_lifetime?: IntFilter<"OAuthClient"> | number
    allowed_origins?: StringNullableListFilter<"OAuthClient">
    logo_uri?: StringNullableFilter<"OAuthClient"> | string | null
    policy_uri?: StringNullableFilter<"OAuthClient"> | string | null
    tos_uri?: StringNullableFilter<"OAuthClient"> | string | null
    is_active?: BoolFilter<"OAuthClient"> | boolean
    created_at?: DateTimeFilter<"OAuthClient"> | Date | string
    updated_at?: DateTimeFilter<"OAuthClient"> | Date | string
    authorization_codes?: OAuthAuthorizationCodeListRelationFilter
    access_tokens?: OAuthAccessTokenListRelationFilter
    refresh_tokens?: OAuthRefreshTokenListRelationFilter
    device_codes?: OAuthDeviceCodeListRelationFilter
    user_consents?: OAuthUserConsentListRelationFilter
  }, "id" | "client_id">

  export type OAuthClientOrderByWithAggregationInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrderInput | SortOrder
    client_secret_hash?: SortOrderInput | SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    redirect_uris?: SortOrder
    post_logout_redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_confidential?: SortOrder
    is_public_client?: SortOrder
    require_pkce?: SortOrder
    access_token_lifetime?: SortOrder
    refresh_token_lifetime?: SortOrder
    allowed_origins?: SortOrder
    logo_uri?: SortOrderInput | SortOrder
    policy_uri?: SortOrderInput | SortOrder
    tos_uri?: SortOrderInput | SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OAuthClientCountOrderByAggregateInput
    _avg?: OAuthClientAvgOrderByAggregateInput
    _max?: OAuthClientMaxOrderByAggregateInput
    _min?: OAuthClientMinOrderByAggregateInput
    _sum?: OAuthClientSumOrderByAggregateInput
  }

  export type OAuthClientScalarWhereWithAggregatesInput = {
    AND?: OAuthClientScalarWhereWithAggregatesInput | OAuthClientScalarWhereWithAggregatesInput[]
    OR?: OAuthClientScalarWhereWithAggregatesInput[]
    NOT?: OAuthClientScalarWhereWithAggregatesInput | OAuthClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthClient"> | string
    client_id?: StringWithAggregatesFilter<"OAuthClient"> | string
    client_secret?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    client_secret_hash?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    name?: StringWithAggregatesFilter<"OAuthClient"> | string
    description?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    redirect_uris?: StringNullableListFilter<"OAuthClient">
    post_logout_redirect_uris?: StringNullableListFilter<"OAuthClient">
    scopes?: StringNullableListFilter<"OAuthClient">
    grant_types?: StringNullableListFilter<"OAuthClient">
    is_confidential?: BoolWithAggregatesFilter<"OAuthClient"> | boolean
    is_public_client?: BoolWithAggregatesFilter<"OAuthClient"> | boolean
    require_pkce?: BoolWithAggregatesFilter<"OAuthClient"> | boolean
    access_token_lifetime?: IntWithAggregatesFilter<"OAuthClient"> | number
    refresh_token_lifetime?: IntWithAggregatesFilter<"OAuthClient"> | number
    allowed_origins?: StringNullableListFilter<"OAuthClient">
    logo_uri?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    policy_uri?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    tos_uri?: StringNullableWithAggregatesFilter<"OAuthClient"> | string | null
    is_active?: BoolWithAggregatesFilter<"OAuthClient"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"OAuthClient"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OAuthClient"> | Date | string
  }

  export type OAuthAuthorizationCodeWhereInput = {
    AND?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    OR?: OAuthAuthorizationCodeWhereInput[]
    NOT?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    id?: StringFilter<"OAuthAuthorizationCode"> | string
    code?: StringFilter<"OAuthAuthorizationCode"> | string
    client_id?: StringFilter<"OAuthAuthorizationCode"> | string
    user_id?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    redirect_uri?: StringFilter<"OAuthAuthorizationCode"> | string
    scope?: StringFilter<"OAuthAuthorizationCode"> | string
    state?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge_method?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    nonce?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    expires_at?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    consumed_at?: DateTimeNullableFilter<"OAuthAuthorizationCode"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type OAuthAuthorizationCodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    redirect_uri?: SortOrder
    scope?: SortOrder
    state?: SortOrderInput | SortOrder
    code_challenge?: SortOrderInput | SortOrder
    code_challenge_method?: SortOrderInput | SortOrder
    nonce?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    consumed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    client?: OAuthClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthAuthorizationCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    OR?: OAuthAuthorizationCodeWhereInput[]
    NOT?: OAuthAuthorizationCodeWhereInput | OAuthAuthorizationCodeWhereInput[]
    client_id?: StringFilter<"OAuthAuthorizationCode"> | string
    user_id?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    redirect_uri?: StringFilter<"OAuthAuthorizationCode"> | string
    scope?: StringFilter<"OAuthAuthorizationCode"> | string
    state?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge_method?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    nonce?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    expires_at?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    consumed_at?: DateTimeNullableFilter<"OAuthAuthorizationCode"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "code">

  export type OAuthAuthorizationCodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    redirect_uri?: SortOrder
    scope?: SortOrder
    state?: SortOrderInput | SortOrder
    code_challenge?: SortOrderInput | SortOrder
    code_challenge_method?: SortOrderInput | SortOrder
    nonce?: SortOrderInput | SortOrder
    expires_at?: SortOrder
    consumed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: OAuthAuthorizationCodeCountOrderByAggregateInput
    _max?: OAuthAuthorizationCodeMaxOrderByAggregateInput
    _min?: OAuthAuthorizationCodeMinOrderByAggregateInput
  }

  export type OAuthAuthorizationCodeScalarWhereWithAggregatesInput = {
    AND?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput | OAuthAuthorizationCodeScalarWhereWithAggregatesInput[]
    OR?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput[]
    NOT?: OAuthAuthorizationCodeScalarWhereWithAggregatesInput | OAuthAuthorizationCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    code?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    client_id?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    user_id?: StringNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | string | null
    redirect_uri?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    scope?: StringWithAggregatesFilter<"OAuthAuthorizationCode"> | string
    state?: StringNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge?: StringNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge_method?: StringNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | string | null
    nonce?: StringNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | string | null
    expires_at?: DateTimeWithAggregatesFilter<"OAuthAuthorizationCode"> | Date | string
    consumed_at?: DateTimeNullableWithAggregatesFilter<"OAuthAuthorizationCode"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"OAuthAuthorizationCode"> | Date | string
  }

  export type OAuthAccessTokenWhereInput = {
    AND?: OAuthAccessTokenWhereInput | OAuthAccessTokenWhereInput[]
    OR?: OAuthAccessTokenWhereInput[]
    NOT?: OAuthAccessTokenWhereInput | OAuthAccessTokenWhereInput[]
    id?: StringFilter<"OAuthAccessToken"> | string
    token?: StringFilter<"OAuthAccessToken"> | string
    client_id?: StringFilter<"OAuthAccessToken"> | string
    user_id?: StringNullableFilter<"OAuthAccessToken"> | string | null
    scope?: StringFilter<"OAuthAccessToken"> | string
    token_type?: StringFilter<"OAuthAccessToken"> | string
    expires_at?: DateTimeFilter<"OAuthAccessToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"OAuthAccessToken"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthAccessToken"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type OAuthAccessTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    scope?: SortOrder
    token_type?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    client?: OAuthClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthAccessTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: OAuthAccessTokenWhereInput | OAuthAccessTokenWhereInput[]
    OR?: OAuthAccessTokenWhereInput[]
    NOT?: OAuthAccessTokenWhereInput | OAuthAccessTokenWhereInput[]
    client_id?: StringFilter<"OAuthAccessToken"> | string
    user_id?: StringNullableFilter<"OAuthAccessToken"> | string | null
    scope?: StringFilter<"OAuthAccessToken"> | string
    token_type?: StringFilter<"OAuthAccessToken"> | string
    expires_at?: DateTimeFilter<"OAuthAccessToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"OAuthAccessToken"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthAccessToken"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "token">

  export type OAuthAccessTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    scope?: SortOrder
    token_type?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: OAuthAccessTokenCountOrderByAggregateInput
    _max?: OAuthAccessTokenMaxOrderByAggregateInput
    _min?: OAuthAccessTokenMinOrderByAggregateInput
  }

  export type OAuthAccessTokenScalarWhereWithAggregatesInput = {
    AND?: OAuthAccessTokenScalarWhereWithAggregatesInput | OAuthAccessTokenScalarWhereWithAggregatesInput[]
    OR?: OAuthAccessTokenScalarWhereWithAggregatesInput[]
    NOT?: OAuthAccessTokenScalarWhereWithAggregatesInput | OAuthAccessTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthAccessToken"> | string
    token?: StringWithAggregatesFilter<"OAuthAccessToken"> | string
    client_id?: StringWithAggregatesFilter<"OAuthAccessToken"> | string
    user_id?: StringNullableWithAggregatesFilter<"OAuthAccessToken"> | string | null
    scope?: StringWithAggregatesFilter<"OAuthAccessToken"> | string
    token_type?: StringWithAggregatesFilter<"OAuthAccessToken"> | string
    expires_at?: DateTimeWithAggregatesFilter<"OAuthAccessToken"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"OAuthAccessToken"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"OAuthAccessToken"> | Date | string
  }

  export type OAuthRefreshTokenWhereInput = {
    AND?: OAuthRefreshTokenWhereInput | OAuthRefreshTokenWhereInput[]
    OR?: OAuthRefreshTokenWhereInput[]
    NOT?: OAuthRefreshTokenWhereInput | OAuthRefreshTokenWhereInput[]
    id?: StringFilter<"OAuthRefreshToken"> | string
    token?: StringFilter<"OAuthRefreshToken"> | string
    access_token_id?: StringFilter<"OAuthRefreshToken"> | string
    client_id?: StringFilter<"OAuthRefreshToken"> | string
    user_id?: StringNullableFilter<"OAuthRefreshToken"> | string | null
    scope?: StringFilter<"OAuthRefreshToken"> | string
    expires_at?: DateTimeFilter<"OAuthRefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"OAuthRefreshToken"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthRefreshToken"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type OAuthRefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    access_token_id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    client?: OAuthClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthRefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: OAuthRefreshTokenWhereInput | OAuthRefreshTokenWhereInput[]
    OR?: OAuthRefreshTokenWhereInput[]
    NOT?: OAuthRefreshTokenWhereInput | OAuthRefreshTokenWhereInput[]
    access_token_id?: StringFilter<"OAuthRefreshToken"> | string
    client_id?: StringFilter<"OAuthRefreshToken"> | string
    user_id?: StringNullableFilter<"OAuthRefreshToken"> | string | null
    scope?: StringFilter<"OAuthRefreshToken"> | string
    expires_at?: DateTimeFilter<"OAuthRefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"OAuthRefreshToken"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthRefreshToken"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "token">

  export type OAuthRefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    access_token_id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: OAuthRefreshTokenCountOrderByAggregateInput
    _max?: OAuthRefreshTokenMaxOrderByAggregateInput
    _min?: OAuthRefreshTokenMinOrderByAggregateInput
  }

  export type OAuthRefreshTokenScalarWhereWithAggregatesInput = {
    AND?: OAuthRefreshTokenScalarWhereWithAggregatesInput | OAuthRefreshTokenScalarWhereWithAggregatesInput[]
    OR?: OAuthRefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: OAuthRefreshTokenScalarWhereWithAggregatesInput | OAuthRefreshTokenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthRefreshToken"> | string
    token?: StringWithAggregatesFilter<"OAuthRefreshToken"> | string
    access_token_id?: StringWithAggregatesFilter<"OAuthRefreshToken"> | string
    client_id?: StringWithAggregatesFilter<"OAuthRefreshToken"> | string
    user_id?: StringNullableWithAggregatesFilter<"OAuthRefreshToken"> | string | null
    scope?: StringWithAggregatesFilter<"OAuthRefreshToken"> | string
    expires_at?: DateTimeWithAggregatesFilter<"OAuthRefreshToken"> | Date | string
    revoked_at?: DateTimeNullableWithAggregatesFilter<"OAuthRefreshToken"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"OAuthRefreshToken"> | Date | string
  }

  export type OAuthDeviceCodeWhereInput = {
    AND?: OAuthDeviceCodeWhereInput | OAuthDeviceCodeWhereInput[]
    OR?: OAuthDeviceCodeWhereInput[]
    NOT?: OAuthDeviceCodeWhereInput | OAuthDeviceCodeWhereInput[]
    id?: StringFilter<"OAuthDeviceCode"> | string
    device_code?: StringFilter<"OAuthDeviceCode"> | string
    user_code?: StringFilter<"OAuthDeviceCode"> | string
    client_id?: StringFilter<"OAuthDeviceCode"> | string
    user_id?: StringNullableFilter<"OAuthDeviceCode"> | string | null
    scope?: StringFilter<"OAuthDeviceCode"> | string
    expires_at?: DateTimeFilter<"OAuthDeviceCode"> | Date | string
    interval?: IntFilter<"OAuthDeviceCode"> | number
    verified?: BoolFilter<"OAuthDeviceCode"> | boolean
    completed_at?: DateTimeNullableFilter<"OAuthDeviceCode"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthDeviceCode"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type OAuthDeviceCodeOrderByWithRelationInput = {
    id?: SortOrder
    device_code?: SortOrder
    user_code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    interval?: SortOrder
    verified?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    client?: OAuthClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthDeviceCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    device_code?: string
    user_code?: string
    AND?: OAuthDeviceCodeWhereInput | OAuthDeviceCodeWhereInput[]
    OR?: OAuthDeviceCodeWhereInput[]
    NOT?: OAuthDeviceCodeWhereInput | OAuthDeviceCodeWhereInput[]
    client_id?: StringFilter<"OAuthDeviceCode"> | string
    user_id?: StringNullableFilter<"OAuthDeviceCode"> | string | null
    scope?: StringFilter<"OAuthDeviceCode"> | string
    expires_at?: DateTimeFilter<"OAuthDeviceCode"> | Date | string
    interval?: IntFilter<"OAuthDeviceCode"> | number
    verified?: BoolFilter<"OAuthDeviceCode"> | boolean
    completed_at?: DateTimeNullableFilter<"OAuthDeviceCode"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthDeviceCode"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "device_code" | "user_code">

  export type OAuthDeviceCodeOrderByWithAggregationInput = {
    id?: SortOrder
    device_code?: SortOrder
    user_code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    interval?: SortOrder
    verified?: SortOrder
    completed_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: OAuthDeviceCodeCountOrderByAggregateInput
    _avg?: OAuthDeviceCodeAvgOrderByAggregateInput
    _max?: OAuthDeviceCodeMaxOrderByAggregateInput
    _min?: OAuthDeviceCodeMinOrderByAggregateInput
    _sum?: OAuthDeviceCodeSumOrderByAggregateInput
  }

  export type OAuthDeviceCodeScalarWhereWithAggregatesInput = {
    AND?: OAuthDeviceCodeScalarWhereWithAggregatesInput | OAuthDeviceCodeScalarWhereWithAggregatesInput[]
    OR?: OAuthDeviceCodeScalarWhereWithAggregatesInput[]
    NOT?: OAuthDeviceCodeScalarWhereWithAggregatesInput | OAuthDeviceCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthDeviceCode"> | string
    device_code?: StringWithAggregatesFilter<"OAuthDeviceCode"> | string
    user_code?: StringWithAggregatesFilter<"OAuthDeviceCode"> | string
    client_id?: StringWithAggregatesFilter<"OAuthDeviceCode"> | string
    user_id?: StringNullableWithAggregatesFilter<"OAuthDeviceCode"> | string | null
    scope?: StringWithAggregatesFilter<"OAuthDeviceCode"> | string
    expires_at?: DateTimeWithAggregatesFilter<"OAuthDeviceCode"> | Date | string
    interval?: IntWithAggregatesFilter<"OAuthDeviceCode"> | number
    verified?: BoolWithAggregatesFilter<"OAuthDeviceCode"> | boolean
    completed_at?: DateTimeNullableWithAggregatesFilter<"OAuthDeviceCode"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"OAuthDeviceCode"> | Date | string
  }

  export type OAuthUserConsentWhereInput = {
    AND?: OAuthUserConsentWhereInput | OAuthUserConsentWhereInput[]
    OR?: OAuthUserConsentWhereInput[]
    NOT?: OAuthUserConsentWhereInput | OAuthUserConsentWhereInput[]
    id?: StringFilter<"OAuthUserConsent"> | string
    client_id?: StringFilter<"OAuthUserConsent"> | string
    user_id?: StringFilter<"OAuthUserConsent"> | string
    scope?: StringFilter<"OAuthUserConsent"> | string
    expires_at?: DateTimeNullableFilter<"OAuthUserConsent"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthUserConsent"> | Date | string
    updated_at?: DateTimeFilter<"OAuthUserConsent"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthUserConsentOrderByWithRelationInput = {
    id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    client?: OAuthClientOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type OAuthUserConsentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    client_id_user_id?: OAuthUserConsentClient_idUser_idCompoundUniqueInput
    AND?: OAuthUserConsentWhereInput | OAuthUserConsentWhereInput[]
    OR?: OAuthUserConsentWhereInput[]
    NOT?: OAuthUserConsentWhereInput | OAuthUserConsentWhereInput[]
    client_id?: StringFilter<"OAuthUserConsent"> | string
    user_id?: StringFilter<"OAuthUserConsent"> | string
    scope?: StringFilter<"OAuthUserConsent"> | string
    expires_at?: DateTimeNullableFilter<"OAuthUserConsent"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthUserConsent"> | Date | string
    updated_at?: DateTimeFilter<"OAuthUserConsent"> | Date | string
    client?: XOR<OAuthClientScalarRelationFilter, OAuthClientWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "client_id_user_id">

  export type OAuthUserConsentOrderByWithAggregationInput = {
    id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OAuthUserConsentCountOrderByAggregateInput
    _max?: OAuthUserConsentMaxOrderByAggregateInput
    _min?: OAuthUserConsentMinOrderByAggregateInput
  }

  export type OAuthUserConsentScalarWhereWithAggregatesInput = {
    AND?: OAuthUserConsentScalarWhereWithAggregatesInput | OAuthUserConsentScalarWhereWithAggregatesInput[]
    OR?: OAuthUserConsentScalarWhereWithAggregatesInput[]
    NOT?: OAuthUserConsentScalarWhereWithAggregatesInput | OAuthUserConsentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OAuthUserConsent"> | string
    client_id?: StringWithAggregatesFilter<"OAuthUserConsent"> | string
    user_id?: StringWithAggregatesFilter<"OAuthUserConsent"> | string
    scope?: StringWithAggregatesFilter<"OAuthUserConsent"> | string
    expires_at?: DateTimeNullableWithAggregatesFilter<"OAuthUserConsent"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"OAuthUserConsent"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"OAuthUserConsent"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
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

  export type UserUpdateManyMutationInput = {
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

  export type UserUncheckedUpdateManyInput = {
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

  export type RefreshTokenCreateInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
    user: UserCreateNestedOneWithoutRefresh_tokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    user_id: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutRefresh_tokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenCreateManyInput = {
    id?: string
    token: string
    user_id: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    user_id: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateManyInput = {
    id?: string
    user_id: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OAuthClientCreateInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientCreateManyInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeCreateInput = {
    id?: string
    code: string
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutAuthorization_codesInput
    user?: UserCreateNestedOneWithoutOauth_authorization_codesInput
  }

  export type OAuthAuthorizationCodeUncheckedCreateInput = {
    id?: string
    code: string
    client_id: string
    user_id?: string | null
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAuthorizationCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutAuthorization_codesNestedInput
    user?: UserUpdateOneWithoutOauth_authorization_codesNestedInput
  }

  export type OAuthAuthorizationCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeCreateManyInput = {
    id?: string
    code: string
    client_id: string
    user_id?: string | null
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAuthorizationCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccessTokenCreateInput = {
    id?: string
    token: string
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutAccess_tokensInput
    user?: UserCreateNestedOneWithoutOauth_access_tokensInput
  }

  export type OAuthAccessTokenUncheckedCreateInput = {
    id?: string
    token: string
    client_id: string
    user_id?: string | null
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAccessTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutAccess_tokensNestedInput
    user?: UserUpdateOneWithoutOauth_access_tokensNestedInput
  }

  export type OAuthAccessTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccessTokenCreateManyInput = {
    id?: string
    token: string
    client_id: string
    user_id?: string | null
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAccessTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccessTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthRefreshTokenCreateInput = {
    id?: string
    token: string
    access_token_id: string
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutRefresh_tokensInput
    user?: UserCreateNestedOneWithoutOauth_refresh_tokensInput
  }

  export type OAuthRefreshTokenUncheckedCreateInput = {
    id?: string
    token: string
    access_token_id: string
    client_id: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthRefreshTokenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutRefresh_tokensNestedInput
    user?: UserUpdateOneWithoutOauth_refresh_tokensNestedInput
  }

  export type OAuthRefreshTokenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthRefreshTokenCreateManyInput = {
    id?: string
    token: string
    access_token_id: string
    client_id: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthRefreshTokenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthRefreshTokenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthDeviceCodeCreateInput = {
    id?: string
    device_code: string
    user_code: string
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutDevice_codesInput
    user?: UserCreateNestedOneWithoutOauth_device_codesInput
  }

  export type OAuthDeviceCodeUncheckedCreateInput = {
    id?: string
    device_code: string
    user_code: string
    client_id: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthDeviceCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutDevice_codesNestedInput
    user?: UserUpdateOneWithoutOauth_device_codesNestedInput
  }

  export type OAuthDeviceCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthDeviceCodeCreateManyInput = {
    id?: string
    device_code: string
    user_code: string
    client_id: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthDeviceCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthDeviceCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUserConsentCreateInput = {
    id?: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutUser_consentsInput
    user: UserCreateNestedOneWithoutOauth_consentsInput
  }

  export type OAuthUserConsentUncheckedCreateInput = {
    id?: string
    client_id: string
    user_id: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthUserConsentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutUser_consentsNestedInput
    user?: UserUpdateOneRequiredWithoutOauth_consentsNestedInput
  }

  export type OAuthUserConsentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUserConsentCreateManyInput = {
    id?: string
    client_id: string
    user_id: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthUserConsentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUserConsentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type OAuthAuthorizationCodeListRelationFilter = {
    every?: OAuthAuthorizationCodeWhereInput
    some?: OAuthAuthorizationCodeWhereInput
    none?: OAuthAuthorizationCodeWhereInput
  }

  export type OAuthAccessTokenListRelationFilter = {
    every?: OAuthAccessTokenWhereInput
    some?: OAuthAccessTokenWhereInput
    none?: OAuthAccessTokenWhereInput
  }

  export type OAuthRefreshTokenListRelationFilter = {
    every?: OAuthRefreshTokenWhereInput
    some?: OAuthRefreshTokenWhereInput
    none?: OAuthRefreshTokenWhereInput
  }

  export type OAuthDeviceCodeListRelationFilter = {
    every?: OAuthDeviceCodeWhereInput
    some?: OAuthDeviceCodeWhereInput
    none?: OAuthDeviceCodeWhereInput
  }

  export type OAuthUserConsentListRelationFilter = {
    every?: OAuthUserConsentWhereInput
    some?: OAuthUserConsentWhereInput
    none?: OAuthUserConsentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthAuthorizationCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthAccessTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthRefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthDeviceCodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthUserConsentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
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

  export type UserMaxOrderByAggregateInput = {
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

  export type UserMinOrderByAggregateInput = {
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
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrder
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

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    revoked_at?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OAuthClientCountOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    client_secret_hash?: SortOrder
    name?: SortOrder
    description?: SortOrder
    redirect_uris?: SortOrder
    post_logout_redirect_uris?: SortOrder
    scopes?: SortOrder
    grant_types?: SortOrder
    is_confidential?: SortOrder
    is_public_client?: SortOrder
    require_pkce?: SortOrder
    access_token_lifetime?: SortOrder
    refresh_token_lifetime?: SortOrder
    allowed_origins?: SortOrder
    logo_uri?: SortOrder
    policy_uri?: SortOrder
    tos_uri?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OAuthClientAvgOrderByAggregateInput = {
    access_token_lifetime?: SortOrder
    refresh_token_lifetime?: SortOrder
  }

  export type OAuthClientMaxOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    client_secret_hash?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_confidential?: SortOrder
    is_public_client?: SortOrder
    require_pkce?: SortOrder
    access_token_lifetime?: SortOrder
    refresh_token_lifetime?: SortOrder
    logo_uri?: SortOrder
    policy_uri?: SortOrder
    tos_uri?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OAuthClientMinOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    client_secret?: SortOrder
    client_secret_hash?: SortOrder
    name?: SortOrder
    description?: SortOrder
    is_confidential?: SortOrder
    is_public_client?: SortOrder
    require_pkce?: SortOrder
    access_token_lifetime?: SortOrder
    refresh_token_lifetime?: SortOrder
    logo_uri?: SortOrder
    policy_uri?: SortOrder
    tos_uri?: SortOrder
    is_active?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OAuthClientSumOrderByAggregateInput = {
    access_token_lifetime?: SortOrder
    refresh_token_lifetime?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OAuthClientScalarRelationFilter = {
    is?: OAuthClientWhereInput
    isNot?: OAuthClientWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type OAuthAuthorizationCodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    redirect_uri?: SortOrder
    scope?: SortOrder
    state?: SortOrder
    code_challenge?: SortOrder
    code_challenge_method?: SortOrder
    nonce?: SortOrder
    expires_at?: SortOrder
    consumed_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthAuthorizationCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    redirect_uri?: SortOrder
    scope?: SortOrder
    state?: SortOrder
    code_challenge?: SortOrder
    code_challenge_method?: SortOrder
    nonce?: SortOrder
    expires_at?: SortOrder
    consumed_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthAuthorizationCodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    redirect_uri?: SortOrder
    scope?: SortOrder
    state?: SortOrder
    code_challenge?: SortOrder
    code_challenge_method?: SortOrder
    nonce?: SortOrder
    expires_at?: SortOrder
    consumed_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthAccessTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    token_type?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthAccessTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    token_type?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthAccessTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    token_type?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthRefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    access_token_id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthRefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    access_token_id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthRefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    access_token_id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    revoked_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthDeviceCodeCountOrderByAggregateInput = {
    id?: SortOrder
    device_code?: SortOrder
    user_code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    interval?: SortOrder
    verified?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthDeviceCodeAvgOrderByAggregateInput = {
    interval?: SortOrder
  }

  export type OAuthDeviceCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    device_code?: SortOrder
    user_code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    interval?: SortOrder
    verified?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthDeviceCodeMinOrderByAggregateInput = {
    id?: SortOrder
    device_code?: SortOrder
    user_code?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    interval?: SortOrder
    verified?: SortOrder
    completed_at?: SortOrder
    created_at?: SortOrder
  }

  export type OAuthDeviceCodeSumOrderByAggregateInput = {
    interval?: SortOrder
  }

  export type OAuthUserConsentClient_idUser_idCompoundUniqueInput = {
    client_id: string
    user_id: string
  }

  export type OAuthUserConsentCountOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OAuthUserConsentMaxOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OAuthUserConsentMinOrderByAggregateInput = {
    id?: SortOrder
    client_id?: SortOrder
    user_id?: SortOrder
    scope?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type OAuthAuthorizationCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthAccessTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutUserInput, OAuthAccessTokenUncheckedCreateWithoutUserInput> | OAuthAccessTokenCreateWithoutUserInput[] | OAuthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutUserInput | OAuthAccessTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAccessTokenCreateManyUserInputEnvelope
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
  }

  export type OAuthRefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutUserInput, OAuthRefreshTokenUncheckedCreateWithoutUserInput> | OAuthRefreshTokenCreateWithoutUserInput[] | OAuthRefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutUserInput | OAuthRefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthRefreshTokenCreateManyUserInputEnvelope
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
  }

  export type OAuthDeviceCodeCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutUserInput, OAuthDeviceCodeUncheckedCreateWithoutUserInput> | OAuthDeviceCodeCreateWithoutUserInput[] | OAuthDeviceCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutUserInput | OAuthDeviceCodeCreateOrConnectWithoutUserInput[]
    createMany?: OAuthDeviceCodeCreateManyUserInputEnvelope
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
  }

  export type OAuthUserConsentCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthUserConsentCreateWithoutUserInput, OAuthUserConsentUncheckedCreateWithoutUserInput> | OAuthUserConsentCreateWithoutUserInput[] | OAuthUserConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutUserInput | OAuthUserConsentCreateOrConnectWithoutUserInput[]
    createMany?: OAuthUserConsentCreateManyUserInputEnvelope
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutUserInput, OAuthAccessTokenUncheckedCreateWithoutUserInput> | OAuthAccessTokenCreateWithoutUserInput[] | OAuthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutUserInput | OAuthAccessTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthAccessTokenCreateManyUserInputEnvelope
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
  }

  export type OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutUserInput, OAuthRefreshTokenUncheckedCreateWithoutUserInput> | OAuthRefreshTokenCreateWithoutUserInput[] | OAuthRefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutUserInput | OAuthRefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthRefreshTokenCreateManyUserInputEnvelope
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
  }

  export type OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutUserInput, OAuthDeviceCodeUncheckedCreateWithoutUserInput> | OAuthDeviceCodeCreateWithoutUserInput[] | OAuthDeviceCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutUserInput | OAuthDeviceCodeCreateOrConnectWithoutUserInput[]
    createMany?: OAuthDeviceCodeCreateManyUserInputEnvelope
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
  }

  export type OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthUserConsentCreateWithoutUserInput, OAuthUserConsentUncheckedCreateWithoutUserInput> | OAuthUserConsentCreateWithoutUserInput[] | OAuthUserConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutUserInput | OAuthUserConsentCreateOrConnectWithoutUserInput[]
    createMany?: OAuthUserConsentCreateManyUserInputEnvelope
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
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

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthAccessTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutUserInput, OAuthAccessTokenUncheckedCreateWithoutUserInput> | OAuthAccessTokenCreateWithoutUserInput[] | OAuthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutUserInput | OAuthAccessTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAccessTokenUpsertWithWhereUniqueWithoutUserInput | OAuthAccessTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAccessTokenCreateManyUserInputEnvelope
    set?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    disconnect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    delete?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    update?: OAuthAccessTokenUpdateWithWhereUniqueWithoutUserInput | OAuthAccessTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAccessTokenUpdateManyWithWhereWithoutUserInput | OAuthAccessTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAccessTokenScalarWhereInput | OAuthAccessTokenScalarWhereInput[]
  }

  export type OAuthRefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutUserInput, OAuthRefreshTokenUncheckedCreateWithoutUserInput> | OAuthRefreshTokenCreateWithoutUserInput[] | OAuthRefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutUserInput | OAuthRefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthRefreshTokenUpsertWithWhereUniqueWithoutUserInput | OAuthRefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthRefreshTokenCreateManyUserInputEnvelope
    set?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    disconnect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    delete?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    update?: OAuthRefreshTokenUpdateWithWhereUniqueWithoutUserInput | OAuthRefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthRefreshTokenUpdateManyWithWhereWithoutUserInput | OAuthRefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthRefreshTokenScalarWhereInput | OAuthRefreshTokenScalarWhereInput[]
  }

  export type OAuthDeviceCodeUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutUserInput, OAuthDeviceCodeUncheckedCreateWithoutUserInput> | OAuthDeviceCodeCreateWithoutUserInput[] | OAuthDeviceCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutUserInput | OAuthDeviceCodeCreateOrConnectWithoutUserInput[]
    upsert?: OAuthDeviceCodeUpsertWithWhereUniqueWithoutUserInput | OAuthDeviceCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthDeviceCodeCreateManyUserInputEnvelope
    set?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    disconnect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    delete?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    update?: OAuthDeviceCodeUpdateWithWhereUniqueWithoutUserInput | OAuthDeviceCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthDeviceCodeUpdateManyWithWhereWithoutUserInput | OAuthDeviceCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthDeviceCodeScalarWhereInput | OAuthDeviceCodeScalarWhereInput[]
  }

  export type OAuthUserConsentUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthUserConsentCreateWithoutUserInput, OAuthUserConsentUncheckedCreateWithoutUserInput> | OAuthUserConsentCreateWithoutUserInput[] | OAuthUserConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutUserInput | OAuthUserConsentCreateOrConnectWithoutUserInput[]
    upsert?: OAuthUserConsentUpsertWithWhereUniqueWithoutUserInput | OAuthUserConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthUserConsentCreateManyUserInputEnvelope
    set?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    disconnect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    delete?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    update?: OAuthUserConsentUpdateWithWhereUniqueWithoutUserInput | OAuthUserConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthUserConsentUpdateManyWithWhereWithoutUserInput | OAuthUserConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthUserConsentScalarWhereInput | OAuthUserConsentScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput> | OAuthAuthorizationCodeCreateWithoutUserInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutUserInput | OAuthAuthorizationCodeCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAuthorizationCodeCreateManyUserInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutUserInput, OAuthAccessTokenUncheckedCreateWithoutUserInput> | OAuthAccessTokenCreateWithoutUserInput[] | OAuthAccessTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutUserInput | OAuthAccessTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthAccessTokenUpsertWithWhereUniqueWithoutUserInput | OAuthAccessTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthAccessTokenCreateManyUserInputEnvelope
    set?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    disconnect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    delete?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    update?: OAuthAccessTokenUpdateWithWhereUniqueWithoutUserInput | OAuthAccessTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthAccessTokenUpdateManyWithWhereWithoutUserInput | OAuthAccessTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthAccessTokenScalarWhereInput | OAuthAccessTokenScalarWhereInput[]
  }

  export type OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutUserInput, OAuthRefreshTokenUncheckedCreateWithoutUserInput> | OAuthRefreshTokenCreateWithoutUserInput[] | OAuthRefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutUserInput | OAuthRefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthRefreshTokenUpsertWithWhereUniqueWithoutUserInput | OAuthRefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthRefreshTokenCreateManyUserInputEnvelope
    set?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    disconnect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    delete?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    update?: OAuthRefreshTokenUpdateWithWhereUniqueWithoutUserInput | OAuthRefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthRefreshTokenUpdateManyWithWhereWithoutUserInput | OAuthRefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthRefreshTokenScalarWhereInput | OAuthRefreshTokenScalarWhereInput[]
  }

  export type OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutUserInput, OAuthDeviceCodeUncheckedCreateWithoutUserInput> | OAuthDeviceCodeCreateWithoutUserInput[] | OAuthDeviceCodeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutUserInput | OAuthDeviceCodeCreateOrConnectWithoutUserInput[]
    upsert?: OAuthDeviceCodeUpsertWithWhereUniqueWithoutUserInput | OAuthDeviceCodeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthDeviceCodeCreateManyUserInputEnvelope
    set?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    disconnect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    delete?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    update?: OAuthDeviceCodeUpdateWithWhereUniqueWithoutUserInput | OAuthDeviceCodeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthDeviceCodeUpdateManyWithWhereWithoutUserInput | OAuthDeviceCodeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthDeviceCodeScalarWhereInput | OAuthDeviceCodeScalarWhereInput[]
  }

  export type OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthUserConsentCreateWithoutUserInput, OAuthUserConsentUncheckedCreateWithoutUserInput> | OAuthUserConsentCreateWithoutUserInput[] | OAuthUserConsentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutUserInput | OAuthUserConsentCreateOrConnectWithoutUserInput[]
    upsert?: OAuthUserConsentUpsertWithWhereUniqueWithoutUserInput | OAuthUserConsentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthUserConsentCreateManyUserInputEnvelope
    set?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    disconnect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    delete?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    update?: OAuthUserConsentUpdateWithWhereUniqueWithoutUserInput | OAuthUserConsentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthUserConsentUpdateManyWithWhereWithoutUserInput | OAuthUserConsentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthUserConsentScalarWhereInput | OAuthUserConsentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutRefresh_tokensInput = {
    create?: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefresh_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutRefresh_tokensNestedInput = {
    create?: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefresh_tokensInput
    upsert?: UserUpsertWithoutRefresh_tokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefresh_tokensInput, UserUpdateWithoutRefresh_tokensInput>, UserUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type OAuthClientCreateredirect_urisInput = {
    set: string[]
  }

  export type OAuthClientCreatepost_logout_redirect_urisInput = {
    set: string[]
  }

  export type OAuthClientCreatescopesInput = {
    set: string[]
  }

  export type OAuthClientCreategrant_typesInput = {
    set: string[]
  }

  export type OAuthClientCreateallowed_originsInput = {
    set: string[]
  }

  export type OAuthAuthorizationCodeCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthAccessTokenCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutClientInput, OAuthAccessTokenUncheckedCreateWithoutClientInput> | OAuthAccessTokenCreateWithoutClientInput[] | OAuthAccessTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutClientInput | OAuthAccessTokenCreateOrConnectWithoutClientInput[]
    createMany?: OAuthAccessTokenCreateManyClientInputEnvelope
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
  }

  export type OAuthRefreshTokenCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutClientInput, OAuthRefreshTokenUncheckedCreateWithoutClientInput> | OAuthRefreshTokenCreateWithoutClientInput[] | OAuthRefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutClientInput | OAuthRefreshTokenCreateOrConnectWithoutClientInput[]
    createMany?: OAuthRefreshTokenCreateManyClientInputEnvelope
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
  }

  export type OAuthDeviceCodeCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutClientInput, OAuthDeviceCodeUncheckedCreateWithoutClientInput> | OAuthDeviceCodeCreateWithoutClientInput[] | OAuthDeviceCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutClientInput | OAuthDeviceCodeCreateOrConnectWithoutClientInput[]
    createMany?: OAuthDeviceCodeCreateManyClientInputEnvelope
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
  }

  export type OAuthUserConsentCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthUserConsentCreateWithoutClientInput, OAuthUserConsentUncheckedCreateWithoutClientInput> | OAuthUserConsentCreateWithoutClientInput[] | OAuthUserConsentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutClientInput | OAuthUserConsentCreateOrConnectWithoutClientInput[]
    createMany?: OAuthUserConsentCreateManyClientInputEnvelope
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
  }

  export type OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
  }

  export type OAuthAccessTokenUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutClientInput, OAuthAccessTokenUncheckedCreateWithoutClientInput> | OAuthAccessTokenCreateWithoutClientInput[] | OAuthAccessTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutClientInput | OAuthAccessTokenCreateOrConnectWithoutClientInput[]
    createMany?: OAuthAccessTokenCreateManyClientInputEnvelope
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
  }

  export type OAuthRefreshTokenUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutClientInput, OAuthRefreshTokenUncheckedCreateWithoutClientInput> | OAuthRefreshTokenCreateWithoutClientInput[] | OAuthRefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutClientInput | OAuthRefreshTokenCreateOrConnectWithoutClientInput[]
    createMany?: OAuthRefreshTokenCreateManyClientInputEnvelope
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
  }

  export type OAuthDeviceCodeUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutClientInput, OAuthDeviceCodeUncheckedCreateWithoutClientInput> | OAuthDeviceCodeCreateWithoutClientInput[] | OAuthDeviceCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutClientInput | OAuthDeviceCodeCreateOrConnectWithoutClientInput[]
    createMany?: OAuthDeviceCodeCreateManyClientInputEnvelope
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
  }

  export type OAuthUserConsentUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OAuthUserConsentCreateWithoutClientInput, OAuthUserConsentUncheckedCreateWithoutClientInput> | OAuthUserConsentCreateWithoutClientInput[] | OAuthUserConsentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutClientInput | OAuthUserConsentCreateOrConnectWithoutClientInput[]
    createMany?: OAuthUserConsentCreateManyClientInputEnvelope
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
  }

  export type OAuthClientUpdateredirect_urisInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthClientUpdatepost_logout_redirect_urisInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthClientUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthClientUpdategrant_typesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OAuthClientUpdateallowed_originsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthAccessTokenUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutClientInput, OAuthAccessTokenUncheckedCreateWithoutClientInput> | OAuthAccessTokenCreateWithoutClientInput[] | OAuthAccessTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutClientInput | OAuthAccessTokenCreateOrConnectWithoutClientInput[]
    upsert?: OAuthAccessTokenUpsertWithWhereUniqueWithoutClientInput | OAuthAccessTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthAccessTokenCreateManyClientInputEnvelope
    set?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    disconnect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    delete?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    update?: OAuthAccessTokenUpdateWithWhereUniqueWithoutClientInput | OAuthAccessTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthAccessTokenUpdateManyWithWhereWithoutClientInput | OAuthAccessTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthAccessTokenScalarWhereInput | OAuthAccessTokenScalarWhereInput[]
  }

  export type OAuthRefreshTokenUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutClientInput, OAuthRefreshTokenUncheckedCreateWithoutClientInput> | OAuthRefreshTokenCreateWithoutClientInput[] | OAuthRefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutClientInput | OAuthRefreshTokenCreateOrConnectWithoutClientInput[]
    upsert?: OAuthRefreshTokenUpsertWithWhereUniqueWithoutClientInput | OAuthRefreshTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthRefreshTokenCreateManyClientInputEnvelope
    set?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    disconnect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    delete?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    update?: OAuthRefreshTokenUpdateWithWhereUniqueWithoutClientInput | OAuthRefreshTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthRefreshTokenUpdateManyWithWhereWithoutClientInput | OAuthRefreshTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthRefreshTokenScalarWhereInput | OAuthRefreshTokenScalarWhereInput[]
  }

  export type OAuthDeviceCodeUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutClientInput, OAuthDeviceCodeUncheckedCreateWithoutClientInput> | OAuthDeviceCodeCreateWithoutClientInput[] | OAuthDeviceCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutClientInput | OAuthDeviceCodeCreateOrConnectWithoutClientInput[]
    upsert?: OAuthDeviceCodeUpsertWithWhereUniqueWithoutClientInput | OAuthDeviceCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthDeviceCodeCreateManyClientInputEnvelope
    set?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    disconnect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    delete?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    update?: OAuthDeviceCodeUpdateWithWhereUniqueWithoutClientInput | OAuthDeviceCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthDeviceCodeUpdateManyWithWhereWithoutClientInput | OAuthDeviceCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthDeviceCodeScalarWhereInput | OAuthDeviceCodeScalarWhereInput[]
  }

  export type OAuthUserConsentUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthUserConsentCreateWithoutClientInput, OAuthUserConsentUncheckedCreateWithoutClientInput> | OAuthUserConsentCreateWithoutClientInput[] | OAuthUserConsentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutClientInput | OAuthUserConsentCreateOrConnectWithoutClientInput[]
    upsert?: OAuthUserConsentUpsertWithWhereUniqueWithoutClientInput | OAuthUserConsentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthUserConsentCreateManyClientInputEnvelope
    set?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    disconnect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    delete?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    update?: OAuthUserConsentUpdateWithWhereUniqueWithoutClientInput | OAuthUserConsentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthUserConsentUpdateManyWithWhereWithoutClientInput | OAuthUserConsentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthUserConsentScalarWhereInput | OAuthUserConsentScalarWhereInput[]
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput> | OAuthAuthorizationCodeCreateWithoutClientInput[] | OAuthAuthorizationCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAuthorizationCodeCreateOrConnectWithoutClientInput | OAuthAuthorizationCodeCreateOrConnectWithoutClientInput[]
    upsert?: OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthAuthorizationCodeCreateManyClientInputEnvelope
    set?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    disconnect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    delete?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    connect?: OAuthAuthorizationCodeWhereUniqueInput | OAuthAuthorizationCodeWhereUniqueInput[]
    update?: OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput | OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput | OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
  }

  export type OAuthAccessTokenUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthAccessTokenCreateWithoutClientInput, OAuthAccessTokenUncheckedCreateWithoutClientInput> | OAuthAccessTokenCreateWithoutClientInput[] | OAuthAccessTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthAccessTokenCreateOrConnectWithoutClientInput | OAuthAccessTokenCreateOrConnectWithoutClientInput[]
    upsert?: OAuthAccessTokenUpsertWithWhereUniqueWithoutClientInput | OAuthAccessTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthAccessTokenCreateManyClientInputEnvelope
    set?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    disconnect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    delete?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    connect?: OAuthAccessTokenWhereUniqueInput | OAuthAccessTokenWhereUniqueInput[]
    update?: OAuthAccessTokenUpdateWithWhereUniqueWithoutClientInput | OAuthAccessTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthAccessTokenUpdateManyWithWhereWithoutClientInput | OAuthAccessTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthAccessTokenScalarWhereInput | OAuthAccessTokenScalarWhereInput[]
  }

  export type OAuthRefreshTokenUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthRefreshTokenCreateWithoutClientInput, OAuthRefreshTokenUncheckedCreateWithoutClientInput> | OAuthRefreshTokenCreateWithoutClientInput[] | OAuthRefreshTokenUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthRefreshTokenCreateOrConnectWithoutClientInput | OAuthRefreshTokenCreateOrConnectWithoutClientInput[]
    upsert?: OAuthRefreshTokenUpsertWithWhereUniqueWithoutClientInput | OAuthRefreshTokenUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthRefreshTokenCreateManyClientInputEnvelope
    set?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    disconnect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    delete?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    connect?: OAuthRefreshTokenWhereUniqueInput | OAuthRefreshTokenWhereUniqueInput[]
    update?: OAuthRefreshTokenUpdateWithWhereUniqueWithoutClientInput | OAuthRefreshTokenUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthRefreshTokenUpdateManyWithWhereWithoutClientInput | OAuthRefreshTokenUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthRefreshTokenScalarWhereInput | OAuthRefreshTokenScalarWhereInput[]
  }

  export type OAuthDeviceCodeUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthDeviceCodeCreateWithoutClientInput, OAuthDeviceCodeUncheckedCreateWithoutClientInput> | OAuthDeviceCodeCreateWithoutClientInput[] | OAuthDeviceCodeUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthDeviceCodeCreateOrConnectWithoutClientInput | OAuthDeviceCodeCreateOrConnectWithoutClientInput[]
    upsert?: OAuthDeviceCodeUpsertWithWhereUniqueWithoutClientInput | OAuthDeviceCodeUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthDeviceCodeCreateManyClientInputEnvelope
    set?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    disconnect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    delete?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    connect?: OAuthDeviceCodeWhereUniqueInput | OAuthDeviceCodeWhereUniqueInput[]
    update?: OAuthDeviceCodeUpdateWithWhereUniqueWithoutClientInput | OAuthDeviceCodeUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthDeviceCodeUpdateManyWithWhereWithoutClientInput | OAuthDeviceCodeUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthDeviceCodeScalarWhereInput | OAuthDeviceCodeScalarWhereInput[]
  }

  export type OAuthUserConsentUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OAuthUserConsentCreateWithoutClientInput, OAuthUserConsentUncheckedCreateWithoutClientInput> | OAuthUserConsentCreateWithoutClientInput[] | OAuthUserConsentUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OAuthUserConsentCreateOrConnectWithoutClientInput | OAuthUserConsentCreateOrConnectWithoutClientInput[]
    upsert?: OAuthUserConsentUpsertWithWhereUniqueWithoutClientInput | OAuthUserConsentUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OAuthUserConsentCreateManyClientInputEnvelope
    set?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    disconnect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    delete?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    connect?: OAuthUserConsentWhereUniqueInput | OAuthUserConsentWhereUniqueInput[]
    update?: OAuthUserConsentUpdateWithWhereUniqueWithoutClientInput | OAuthUserConsentUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OAuthUserConsentUpdateManyWithWhereWithoutClientInput | OAuthUserConsentUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OAuthUserConsentScalarWhereInput | OAuthUserConsentScalarWhereInput[]
  }

  export type OAuthClientCreateNestedOneWithoutAuthorization_codesInput = {
    create?: XOR<OAuthClientCreateWithoutAuthorization_codesInput, OAuthClientUncheckedCreateWithoutAuthorization_codesInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutAuthorization_codesInput
    connect?: OAuthClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauth_authorization_codesInput = {
    create?: XOR<UserCreateWithoutOauth_authorization_codesInput, UserUncheckedCreateWithoutOauth_authorization_codesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_authorization_codesInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthClientUpdateOneRequiredWithoutAuthorization_codesNestedInput = {
    create?: XOR<OAuthClientCreateWithoutAuthorization_codesInput, OAuthClientUncheckedCreateWithoutAuthorization_codesInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutAuthorization_codesInput
    upsert?: OAuthClientUpsertWithoutAuthorization_codesInput
    connect?: OAuthClientWhereUniqueInput
    update?: XOR<XOR<OAuthClientUpdateToOneWithWhereWithoutAuthorization_codesInput, OAuthClientUpdateWithoutAuthorization_codesInput>, OAuthClientUncheckedUpdateWithoutAuthorization_codesInput>
  }

  export type UserUpdateOneWithoutOauth_authorization_codesNestedInput = {
    create?: XOR<UserCreateWithoutOauth_authorization_codesInput, UserUncheckedCreateWithoutOauth_authorization_codesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_authorization_codesInput
    upsert?: UserUpsertWithoutOauth_authorization_codesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauth_authorization_codesInput, UserUpdateWithoutOauth_authorization_codesInput>, UserUncheckedUpdateWithoutOauth_authorization_codesInput>
  }

  export type OAuthClientCreateNestedOneWithoutAccess_tokensInput = {
    create?: XOR<OAuthClientCreateWithoutAccess_tokensInput, OAuthClientUncheckedCreateWithoutAccess_tokensInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutAccess_tokensInput
    connect?: OAuthClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauth_access_tokensInput = {
    create?: XOR<UserCreateWithoutOauth_access_tokensInput, UserUncheckedCreateWithoutOauth_access_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_access_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthClientUpdateOneRequiredWithoutAccess_tokensNestedInput = {
    create?: XOR<OAuthClientCreateWithoutAccess_tokensInput, OAuthClientUncheckedCreateWithoutAccess_tokensInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutAccess_tokensInput
    upsert?: OAuthClientUpsertWithoutAccess_tokensInput
    connect?: OAuthClientWhereUniqueInput
    update?: XOR<XOR<OAuthClientUpdateToOneWithWhereWithoutAccess_tokensInput, OAuthClientUpdateWithoutAccess_tokensInput>, OAuthClientUncheckedUpdateWithoutAccess_tokensInput>
  }

  export type UserUpdateOneWithoutOauth_access_tokensNestedInput = {
    create?: XOR<UserCreateWithoutOauth_access_tokensInput, UserUncheckedCreateWithoutOauth_access_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_access_tokensInput
    upsert?: UserUpsertWithoutOauth_access_tokensInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauth_access_tokensInput, UserUpdateWithoutOauth_access_tokensInput>, UserUncheckedUpdateWithoutOauth_access_tokensInput>
  }

  export type OAuthClientCreateNestedOneWithoutRefresh_tokensInput = {
    create?: XOR<OAuthClientCreateWithoutRefresh_tokensInput, OAuthClientUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutRefresh_tokensInput
    connect?: OAuthClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauth_refresh_tokensInput = {
    create?: XOR<UserCreateWithoutOauth_refresh_tokensInput, UserUncheckedCreateWithoutOauth_refresh_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_refresh_tokensInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthClientUpdateOneRequiredWithoutRefresh_tokensNestedInput = {
    create?: XOR<OAuthClientCreateWithoutRefresh_tokensInput, OAuthClientUncheckedCreateWithoutRefresh_tokensInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutRefresh_tokensInput
    upsert?: OAuthClientUpsertWithoutRefresh_tokensInput
    connect?: OAuthClientWhereUniqueInput
    update?: XOR<XOR<OAuthClientUpdateToOneWithWhereWithoutRefresh_tokensInput, OAuthClientUpdateWithoutRefresh_tokensInput>, OAuthClientUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type UserUpdateOneWithoutOauth_refresh_tokensNestedInput = {
    create?: XOR<UserCreateWithoutOauth_refresh_tokensInput, UserUncheckedCreateWithoutOauth_refresh_tokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_refresh_tokensInput
    upsert?: UserUpsertWithoutOauth_refresh_tokensInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauth_refresh_tokensInput, UserUpdateWithoutOauth_refresh_tokensInput>, UserUncheckedUpdateWithoutOauth_refresh_tokensInput>
  }

  export type OAuthClientCreateNestedOneWithoutDevice_codesInput = {
    create?: XOR<OAuthClientCreateWithoutDevice_codesInput, OAuthClientUncheckedCreateWithoutDevice_codesInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutDevice_codesInput
    connect?: OAuthClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauth_device_codesInput = {
    create?: XOR<UserCreateWithoutOauth_device_codesInput, UserUncheckedCreateWithoutOauth_device_codesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_device_codesInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthClientUpdateOneRequiredWithoutDevice_codesNestedInput = {
    create?: XOR<OAuthClientCreateWithoutDevice_codesInput, OAuthClientUncheckedCreateWithoutDevice_codesInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutDevice_codesInput
    upsert?: OAuthClientUpsertWithoutDevice_codesInput
    connect?: OAuthClientWhereUniqueInput
    update?: XOR<XOR<OAuthClientUpdateToOneWithWhereWithoutDevice_codesInput, OAuthClientUpdateWithoutDevice_codesInput>, OAuthClientUncheckedUpdateWithoutDevice_codesInput>
  }

  export type UserUpdateOneWithoutOauth_device_codesNestedInput = {
    create?: XOR<UserCreateWithoutOauth_device_codesInput, UserUncheckedCreateWithoutOauth_device_codesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_device_codesInput
    upsert?: UserUpsertWithoutOauth_device_codesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauth_device_codesInput, UserUpdateWithoutOauth_device_codesInput>, UserUncheckedUpdateWithoutOauth_device_codesInput>
  }

  export type OAuthClientCreateNestedOneWithoutUser_consentsInput = {
    create?: XOR<OAuthClientCreateWithoutUser_consentsInput, OAuthClientUncheckedCreateWithoutUser_consentsInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutUser_consentsInput
    connect?: OAuthClientWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOauth_consentsInput = {
    create?: XOR<UserCreateWithoutOauth_consentsInput, UserUncheckedCreateWithoutOauth_consentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_consentsInput
    connect?: UserWhereUniqueInput
  }

  export type OAuthClientUpdateOneRequiredWithoutUser_consentsNestedInput = {
    create?: XOR<OAuthClientCreateWithoutUser_consentsInput, OAuthClientUncheckedCreateWithoutUser_consentsInput>
    connectOrCreate?: OAuthClientCreateOrConnectWithoutUser_consentsInput
    upsert?: OAuthClientUpsertWithoutUser_consentsInput
    connect?: OAuthClientWhereUniqueInput
    update?: XOR<XOR<OAuthClientUpdateToOneWithWhereWithoutUser_consentsInput, OAuthClientUpdateWithoutUser_consentsInput>, OAuthClientUncheckedUpdateWithoutUser_consentsInput>
  }

  export type UserUpdateOneRequiredWithoutOauth_consentsNestedInput = {
    create?: XOR<UserCreateWithoutOauth_consentsInput, UserUncheckedCreateWithoutOauth_consentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOauth_consentsInput
    upsert?: UserUpsertWithoutOauth_consentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOauth_consentsInput, UserUpdateWithoutOauth_consentsInput>, UserUncheckedUpdateWithoutOauth_consentsInput>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type RefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAuthorizationCodeCreateWithoutUserInput = {
    id?: string
    code: string
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutAuthorization_codesInput
  }

  export type OAuthAuthorizationCodeUncheckedCreateWithoutUserInput = {
    id?: string
    code: string
    client_id: string
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAuthorizationCodeCreateOrConnectWithoutUserInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    create: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput>
  }

  export type OAuthAuthorizationCodeCreateManyUserInputEnvelope = {
    data: OAuthAuthorizationCodeCreateManyUserInput | OAuthAuthorizationCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAccessTokenCreateWithoutUserInput = {
    id?: string
    token: string
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutAccess_tokensInput
  }

  export type OAuthAccessTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    client_id: string
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAccessTokenCreateOrConnectWithoutUserInput = {
    where: OAuthAccessTokenWhereUniqueInput
    create: XOR<OAuthAccessTokenCreateWithoutUserInput, OAuthAccessTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthAccessTokenCreateManyUserInputEnvelope = {
    data: OAuthAccessTokenCreateManyUserInput | OAuthAccessTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthRefreshTokenCreateWithoutUserInput = {
    id?: string
    token: string
    access_token_id: string
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutRefresh_tokensInput
  }

  export type OAuthRefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    access_token_id: string
    client_id: string
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthRefreshTokenCreateOrConnectWithoutUserInput = {
    where: OAuthRefreshTokenWhereUniqueInput
    create: XOR<OAuthRefreshTokenCreateWithoutUserInput, OAuthRefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthRefreshTokenCreateManyUserInputEnvelope = {
    data: OAuthRefreshTokenCreateManyUserInput | OAuthRefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthDeviceCodeCreateWithoutUserInput = {
    id?: string
    device_code: string
    user_code: string
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutDevice_codesInput
  }

  export type OAuthDeviceCodeUncheckedCreateWithoutUserInput = {
    id?: string
    device_code: string
    user_code: string
    client_id: string
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthDeviceCodeCreateOrConnectWithoutUserInput = {
    where: OAuthDeviceCodeWhereUniqueInput
    create: XOR<OAuthDeviceCodeCreateWithoutUserInput, OAuthDeviceCodeUncheckedCreateWithoutUserInput>
  }

  export type OAuthDeviceCodeCreateManyUserInputEnvelope = {
    data: OAuthDeviceCodeCreateManyUserInput | OAuthDeviceCodeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthUserConsentCreateWithoutUserInput = {
    id?: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    client: OAuthClientCreateNestedOneWithoutUser_consentsInput
  }

  export type OAuthUserConsentUncheckedCreateWithoutUserInput = {
    id?: string
    client_id: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthUserConsentCreateOrConnectWithoutUserInput = {
    where: OAuthUserConsentWhereUniqueInput
    create: XOR<OAuthUserConsentCreateWithoutUserInput, OAuthUserConsentUncheckedCreateWithoutUserInput>
  }

  export type OAuthUserConsentCreateManyUserInputEnvelope = {
    data: OAuthUserConsentCreateManyUserInput | OAuthUserConsentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: StringFilter<"RefreshToken"> | string
    token?: StringFilter<"RefreshToken"> | string
    user_id?: StringFilter<"RefreshToken"> | string
    expires_at?: DateTimeFilter<"RefreshToken"> | Date | string
    created_at?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"RefreshToken"> | Date | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    user_id?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expires_at?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    revoked_at?: DateTimeNullableFilter<"Session"> | Date | string | null
  }

  export type OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    update: XOR<OAuthAuthorizationCodeUpdateWithoutUserInput, OAuthAuthorizationCodeUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthAuthorizationCodeCreateWithoutUserInput, OAuthAuthorizationCodeUncheckedCreateWithoutUserInput>
  }

  export type OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    data: XOR<OAuthAuthorizationCodeUpdateWithoutUserInput, OAuthAuthorizationCodeUncheckedUpdateWithoutUserInput>
  }

  export type OAuthAuthorizationCodeUpdateManyWithWhereWithoutUserInput = {
    where: OAuthAuthorizationCodeScalarWhereInput
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthAuthorizationCodeScalarWhereInput = {
    AND?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
    OR?: OAuthAuthorizationCodeScalarWhereInput[]
    NOT?: OAuthAuthorizationCodeScalarWhereInput | OAuthAuthorizationCodeScalarWhereInput[]
    id?: StringFilter<"OAuthAuthorizationCode"> | string
    code?: StringFilter<"OAuthAuthorizationCode"> | string
    client_id?: StringFilter<"OAuthAuthorizationCode"> | string
    user_id?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    redirect_uri?: StringFilter<"OAuthAuthorizationCode"> | string
    scope?: StringFilter<"OAuthAuthorizationCode"> | string
    state?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    code_challenge_method?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    nonce?: StringNullableFilter<"OAuthAuthorizationCode"> | string | null
    expires_at?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
    consumed_at?: DateTimeNullableFilter<"OAuthAuthorizationCode"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthAuthorizationCode"> | Date | string
  }

  export type OAuthAccessTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthAccessTokenWhereUniqueInput
    update: XOR<OAuthAccessTokenUpdateWithoutUserInput, OAuthAccessTokenUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthAccessTokenCreateWithoutUserInput, OAuthAccessTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthAccessTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthAccessTokenWhereUniqueInput
    data: XOR<OAuthAccessTokenUpdateWithoutUserInput, OAuthAccessTokenUncheckedUpdateWithoutUserInput>
  }

  export type OAuthAccessTokenUpdateManyWithWhereWithoutUserInput = {
    where: OAuthAccessTokenScalarWhereInput
    data: XOR<OAuthAccessTokenUpdateManyMutationInput, OAuthAccessTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthAccessTokenScalarWhereInput = {
    AND?: OAuthAccessTokenScalarWhereInput | OAuthAccessTokenScalarWhereInput[]
    OR?: OAuthAccessTokenScalarWhereInput[]
    NOT?: OAuthAccessTokenScalarWhereInput | OAuthAccessTokenScalarWhereInput[]
    id?: StringFilter<"OAuthAccessToken"> | string
    token?: StringFilter<"OAuthAccessToken"> | string
    client_id?: StringFilter<"OAuthAccessToken"> | string
    user_id?: StringNullableFilter<"OAuthAccessToken"> | string | null
    scope?: StringFilter<"OAuthAccessToken"> | string
    token_type?: StringFilter<"OAuthAccessToken"> | string
    expires_at?: DateTimeFilter<"OAuthAccessToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"OAuthAccessToken"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthAccessToken"> | Date | string
  }

  export type OAuthRefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthRefreshTokenWhereUniqueInput
    update: XOR<OAuthRefreshTokenUpdateWithoutUserInput, OAuthRefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthRefreshTokenCreateWithoutUserInput, OAuthRefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthRefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthRefreshTokenWhereUniqueInput
    data: XOR<OAuthRefreshTokenUpdateWithoutUserInput, OAuthRefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type OAuthRefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: OAuthRefreshTokenScalarWhereInput
    data: XOR<OAuthRefreshTokenUpdateManyMutationInput, OAuthRefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthRefreshTokenScalarWhereInput = {
    AND?: OAuthRefreshTokenScalarWhereInput | OAuthRefreshTokenScalarWhereInput[]
    OR?: OAuthRefreshTokenScalarWhereInput[]
    NOT?: OAuthRefreshTokenScalarWhereInput | OAuthRefreshTokenScalarWhereInput[]
    id?: StringFilter<"OAuthRefreshToken"> | string
    token?: StringFilter<"OAuthRefreshToken"> | string
    access_token_id?: StringFilter<"OAuthRefreshToken"> | string
    client_id?: StringFilter<"OAuthRefreshToken"> | string
    user_id?: StringNullableFilter<"OAuthRefreshToken"> | string | null
    scope?: StringFilter<"OAuthRefreshToken"> | string
    expires_at?: DateTimeFilter<"OAuthRefreshToken"> | Date | string
    revoked_at?: DateTimeNullableFilter<"OAuthRefreshToken"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthRefreshToken"> | Date | string
  }

  export type OAuthDeviceCodeUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthDeviceCodeWhereUniqueInput
    update: XOR<OAuthDeviceCodeUpdateWithoutUserInput, OAuthDeviceCodeUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthDeviceCodeCreateWithoutUserInput, OAuthDeviceCodeUncheckedCreateWithoutUserInput>
  }

  export type OAuthDeviceCodeUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthDeviceCodeWhereUniqueInput
    data: XOR<OAuthDeviceCodeUpdateWithoutUserInput, OAuthDeviceCodeUncheckedUpdateWithoutUserInput>
  }

  export type OAuthDeviceCodeUpdateManyWithWhereWithoutUserInput = {
    where: OAuthDeviceCodeScalarWhereInput
    data: XOR<OAuthDeviceCodeUpdateManyMutationInput, OAuthDeviceCodeUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthDeviceCodeScalarWhereInput = {
    AND?: OAuthDeviceCodeScalarWhereInput | OAuthDeviceCodeScalarWhereInput[]
    OR?: OAuthDeviceCodeScalarWhereInput[]
    NOT?: OAuthDeviceCodeScalarWhereInput | OAuthDeviceCodeScalarWhereInput[]
    id?: StringFilter<"OAuthDeviceCode"> | string
    device_code?: StringFilter<"OAuthDeviceCode"> | string
    user_code?: StringFilter<"OAuthDeviceCode"> | string
    client_id?: StringFilter<"OAuthDeviceCode"> | string
    user_id?: StringNullableFilter<"OAuthDeviceCode"> | string | null
    scope?: StringFilter<"OAuthDeviceCode"> | string
    expires_at?: DateTimeFilter<"OAuthDeviceCode"> | Date | string
    interval?: IntFilter<"OAuthDeviceCode"> | number
    verified?: BoolFilter<"OAuthDeviceCode"> | boolean
    completed_at?: DateTimeNullableFilter<"OAuthDeviceCode"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthDeviceCode"> | Date | string
  }

  export type OAuthUserConsentUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthUserConsentWhereUniqueInput
    update: XOR<OAuthUserConsentUpdateWithoutUserInput, OAuthUserConsentUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthUserConsentCreateWithoutUserInput, OAuthUserConsentUncheckedCreateWithoutUserInput>
  }

  export type OAuthUserConsentUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthUserConsentWhereUniqueInput
    data: XOR<OAuthUserConsentUpdateWithoutUserInput, OAuthUserConsentUncheckedUpdateWithoutUserInput>
  }

  export type OAuthUserConsentUpdateManyWithWhereWithoutUserInput = {
    where: OAuthUserConsentScalarWhereInput
    data: XOR<OAuthUserConsentUpdateManyMutationInput, OAuthUserConsentUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthUserConsentScalarWhereInput = {
    AND?: OAuthUserConsentScalarWhereInput | OAuthUserConsentScalarWhereInput[]
    OR?: OAuthUserConsentScalarWhereInput[]
    NOT?: OAuthUserConsentScalarWhereInput | OAuthUserConsentScalarWhereInput[]
    id?: StringFilter<"OAuthUserConsent"> | string
    client_id?: StringFilter<"OAuthUserConsent"> | string
    user_id?: StringFilter<"OAuthUserConsent"> | string
    scope?: StringFilter<"OAuthUserConsent"> | string
    expires_at?: DateTimeNullableFilter<"OAuthUserConsent"> | Date | string | null
    created_at?: DateTimeFilter<"OAuthUserConsent"> | Date | string
    updated_at?: DateTimeFilter<"OAuthUserConsent"> | Date | string
  }

  export type UserCreateWithoutRefresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefresh_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
  }

  export type UserUpsertWithoutRefresh_tokensInput = {
    update: XOR<UserUpdateWithoutRefresh_tokensInput, UserUncheckedUpdateWithoutRefresh_tokensInput>
    create: XOR<UserCreateWithoutRefresh_tokensInput, UserUncheckedCreateWithoutRefresh_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefresh_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefresh_tokensInput, UserUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type UserUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthAuthorizationCodeCreateWithoutClientInput = {
    id?: string
    code: string
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutOauth_authorization_codesInput
  }

  export type OAuthAuthorizationCodeUncheckedCreateWithoutClientInput = {
    id?: string
    code: string
    user_id?: string | null
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAuthorizationCodeCreateOrConnectWithoutClientInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    create: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput>
  }

  export type OAuthAuthorizationCodeCreateManyClientInputEnvelope = {
    data: OAuthAuthorizationCodeCreateManyClientInput | OAuthAuthorizationCodeCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAccessTokenCreateWithoutClientInput = {
    id?: string
    token: string
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutOauth_access_tokensInput
  }

  export type OAuthAccessTokenUncheckedCreateWithoutClientInput = {
    id?: string
    token: string
    user_id?: string | null
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAccessTokenCreateOrConnectWithoutClientInput = {
    where: OAuthAccessTokenWhereUniqueInput
    create: XOR<OAuthAccessTokenCreateWithoutClientInput, OAuthAccessTokenUncheckedCreateWithoutClientInput>
  }

  export type OAuthAccessTokenCreateManyClientInputEnvelope = {
    data: OAuthAccessTokenCreateManyClientInput | OAuthAccessTokenCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OAuthRefreshTokenCreateWithoutClientInput = {
    id?: string
    token: string
    access_token_id: string
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutOauth_refresh_tokensInput
  }

  export type OAuthRefreshTokenUncheckedCreateWithoutClientInput = {
    id?: string
    token: string
    access_token_id: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthRefreshTokenCreateOrConnectWithoutClientInput = {
    where: OAuthRefreshTokenWhereUniqueInput
    create: XOR<OAuthRefreshTokenCreateWithoutClientInput, OAuthRefreshTokenUncheckedCreateWithoutClientInput>
  }

  export type OAuthRefreshTokenCreateManyClientInputEnvelope = {
    data: OAuthRefreshTokenCreateManyClientInput | OAuthRefreshTokenCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OAuthDeviceCodeCreateWithoutClientInput = {
    id?: string
    device_code: string
    user_code: string
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
    user?: UserCreateNestedOneWithoutOauth_device_codesInput
  }

  export type OAuthDeviceCodeUncheckedCreateWithoutClientInput = {
    id?: string
    device_code: string
    user_code: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthDeviceCodeCreateOrConnectWithoutClientInput = {
    where: OAuthDeviceCodeWhereUniqueInput
    create: XOR<OAuthDeviceCodeCreateWithoutClientInput, OAuthDeviceCodeUncheckedCreateWithoutClientInput>
  }

  export type OAuthDeviceCodeCreateManyClientInputEnvelope = {
    data: OAuthDeviceCodeCreateManyClientInput | OAuthDeviceCodeCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OAuthUserConsentCreateWithoutClientInput = {
    id?: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutOauth_consentsInput
  }

  export type OAuthUserConsentUncheckedCreateWithoutClientInput = {
    id?: string
    user_id: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthUserConsentCreateOrConnectWithoutClientInput = {
    where: OAuthUserConsentWhereUniqueInput
    create: XOR<OAuthUserConsentCreateWithoutClientInput, OAuthUserConsentUncheckedCreateWithoutClientInput>
  }

  export type OAuthUserConsentCreateManyClientInputEnvelope = {
    data: OAuthUserConsentCreateManyClientInput | OAuthUserConsentCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type OAuthAuthorizationCodeUpsertWithWhereUniqueWithoutClientInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    update: XOR<OAuthAuthorizationCodeUpdateWithoutClientInput, OAuthAuthorizationCodeUncheckedUpdateWithoutClientInput>
    create: XOR<OAuthAuthorizationCodeCreateWithoutClientInput, OAuthAuthorizationCodeUncheckedCreateWithoutClientInput>
  }

  export type OAuthAuthorizationCodeUpdateWithWhereUniqueWithoutClientInput = {
    where: OAuthAuthorizationCodeWhereUniqueInput
    data: XOR<OAuthAuthorizationCodeUpdateWithoutClientInput, OAuthAuthorizationCodeUncheckedUpdateWithoutClientInput>
  }

  export type OAuthAuthorizationCodeUpdateManyWithWhereWithoutClientInput = {
    where: OAuthAuthorizationCodeScalarWhereInput
    data: XOR<OAuthAuthorizationCodeUpdateManyMutationInput, OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientInput>
  }

  export type OAuthAccessTokenUpsertWithWhereUniqueWithoutClientInput = {
    where: OAuthAccessTokenWhereUniqueInput
    update: XOR<OAuthAccessTokenUpdateWithoutClientInput, OAuthAccessTokenUncheckedUpdateWithoutClientInput>
    create: XOR<OAuthAccessTokenCreateWithoutClientInput, OAuthAccessTokenUncheckedCreateWithoutClientInput>
  }

  export type OAuthAccessTokenUpdateWithWhereUniqueWithoutClientInput = {
    where: OAuthAccessTokenWhereUniqueInput
    data: XOR<OAuthAccessTokenUpdateWithoutClientInput, OAuthAccessTokenUncheckedUpdateWithoutClientInput>
  }

  export type OAuthAccessTokenUpdateManyWithWhereWithoutClientInput = {
    where: OAuthAccessTokenScalarWhereInput
    data: XOR<OAuthAccessTokenUpdateManyMutationInput, OAuthAccessTokenUncheckedUpdateManyWithoutClientInput>
  }

  export type OAuthRefreshTokenUpsertWithWhereUniqueWithoutClientInput = {
    where: OAuthRefreshTokenWhereUniqueInput
    update: XOR<OAuthRefreshTokenUpdateWithoutClientInput, OAuthRefreshTokenUncheckedUpdateWithoutClientInput>
    create: XOR<OAuthRefreshTokenCreateWithoutClientInput, OAuthRefreshTokenUncheckedCreateWithoutClientInput>
  }

  export type OAuthRefreshTokenUpdateWithWhereUniqueWithoutClientInput = {
    where: OAuthRefreshTokenWhereUniqueInput
    data: XOR<OAuthRefreshTokenUpdateWithoutClientInput, OAuthRefreshTokenUncheckedUpdateWithoutClientInput>
  }

  export type OAuthRefreshTokenUpdateManyWithWhereWithoutClientInput = {
    where: OAuthRefreshTokenScalarWhereInput
    data: XOR<OAuthRefreshTokenUpdateManyMutationInput, OAuthRefreshTokenUncheckedUpdateManyWithoutClientInput>
  }

  export type OAuthDeviceCodeUpsertWithWhereUniqueWithoutClientInput = {
    where: OAuthDeviceCodeWhereUniqueInput
    update: XOR<OAuthDeviceCodeUpdateWithoutClientInput, OAuthDeviceCodeUncheckedUpdateWithoutClientInput>
    create: XOR<OAuthDeviceCodeCreateWithoutClientInput, OAuthDeviceCodeUncheckedCreateWithoutClientInput>
  }

  export type OAuthDeviceCodeUpdateWithWhereUniqueWithoutClientInput = {
    where: OAuthDeviceCodeWhereUniqueInput
    data: XOR<OAuthDeviceCodeUpdateWithoutClientInput, OAuthDeviceCodeUncheckedUpdateWithoutClientInput>
  }

  export type OAuthDeviceCodeUpdateManyWithWhereWithoutClientInput = {
    where: OAuthDeviceCodeScalarWhereInput
    data: XOR<OAuthDeviceCodeUpdateManyMutationInput, OAuthDeviceCodeUncheckedUpdateManyWithoutClientInput>
  }

  export type OAuthUserConsentUpsertWithWhereUniqueWithoutClientInput = {
    where: OAuthUserConsentWhereUniqueInput
    update: XOR<OAuthUserConsentUpdateWithoutClientInput, OAuthUserConsentUncheckedUpdateWithoutClientInput>
    create: XOR<OAuthUserConsentCreateWithoutClientInput, OAuthUserConsentUncheckedCreateWithoutClientInput>
  }

  export type OAuthUserConsentUpdateWithWhereUniqueWithoutClientInput = {
    where: OAuthUserConsentWhereUniqueInput
    data: XOR<OAuthUserConsentUpdateWithoutClientInput, OAuthUserConsentUncheckedUpdateWithoutClientInput>
  }

  export type OAuthUserConsentUpdateManyWithWhereWithoutClientInput = {
    where: OAuthUserConsentScalarWhereInput
    data: XOR<OAuthUserConsentUpdateManyMutationInput, OAuthUserConsentUncheckedUpdateManyWithoutClientInput>
  }

  export type OAuthClientCreateWithoutAuthorization_codesInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    access_tokens?: OAuthAccessTokenCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateWithoutAuthorization_codesInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientCreateOrConnectWithoutAuthorization_codesInput = {
    where: OAuthClientWhereUniqueInput
    create: XOR<OAuthClientCreateWithoutAuthorization_codesInput, OAuthClientUncheckedCreateWithoutAuthorization_codesInput>
  }

  export type UserCreateWithoutOauth_authorization_codesInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauth_authorization_codesInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauth_authorization_codesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauth_authorization_codesInput, UserUncheckedCreateWithoutOauth_authorization_codesInput>
  }

  export type OAuthClientUpsertWithoutAuthorization_codesInput = {
    update: XOR<OAuthClientUpdateWithoutAuthorization_codesInput, OAuthClientUncheckedUpdateWithoutAuthorization_codesInput>
    create: XOR<OAuthClientCreateWithoutAuthorization_codesInput, OAuthClientUncheckedCreateWithoutAuthorization_codesInput>
    where?: OAuthClientWhereInput
  }

  export type OAuthClientUpdateToOneWithWhereWithoutAuthorization_codesInput = {
    where?: OAuthClientWhereInput
    data: XOR<OAuthClientUpdateWithoutAuthorization_codesInput, OAuthClientUncheckedUpdateWithoutAuthorization_codesInput>
  }

  export type OAuthClientUpdateWithoutAuthorization_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_tokens?: OAuthAccessTokenUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateWithoutAuthorization_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutOauth_authorization_codesInput = {
    update: XOR<UserUpdateWithoutOauth_authorization_codesInput, UserUncheckedUpdateWithoutOauth_authorization_codesInput>
    create: XOR<UserCreateWithoutOauth_authorization_codesInput, UserUncheckedCreateWithoutOauth_authorization_codesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauth_authorization_codesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauth_authorization_codesInput, UserUncheckedUpdateWithoutOauth_authorization_codesInput>
  }

  export type UserUpdateWithoutOauth_authorization_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauth_authorization_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthClientCreateWithoutAccess_tokensInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateWithoutAccess_tokensInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientCreateOrConnectWithoutAccess_tokensInput = {
    where: OAuthClientWhereUniqueInput
    create: XOR<OAuthClientCreateWithoutAccess_tokensInput, OAuthClientUncheckedCreateWithoutAccess_tokensInput>
  }

  export type UserCreateWithoutOauth_access_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauth_access_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauth_access_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauth_access_tokensInput, UserUncheckedCreateWithoutOauth_access_tokensInput>
  }

  export type OAuthClientUpsertWithoutAccess_tokensInput = {
    update: XOR<OAuthClientUpdateWithoutAccess_tokensInput, OAuthClientUncheckedUpdateWithoutAccess_tokensInput>
    create: XOR<OAuthClientCreateWithoutAccess_tokensInput, OAuthClientUncheckedCreateWithoutAccess_tokensInput>
    where?: OAuthClientWhereInput
  }

  export type OAuthClientUpdateToOneWithWhereWithoutAccess_tokensInput = {
    where?: OAuthClientWhereInput
    data: XOR<OAuthClientUpdateWithoutAccess_tokensInput, OAuthClientUncheckedUpdateWithoutAccess_tokensInput>
  }

  export type OAuthClientUpdateWithoutAccess_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateWithoutAccess_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutOauth_access_tokensInput = {
    update: XOR<UserUpdateWithoutOauth_access_tokensInput, UserUncheckedUpdateWithoutOauth_access_tokensInput>
    create: XOR<UserCreateWithoutOauth_access_tokensInput, UserUncheckedCreateWithoutOauth_access_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauth_access_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauth_access_tokensInput, UserUncheckedUpdateWithoutOauth_access_tokensInput>
  }

  export type UserUpdateWithoutOauth_access_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauth_access_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthClientCreateWithoutRefresh_tokensInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateWithoutRefresh_tokensInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientCreateOrConnectWithoutRefresh_tokensInput = {
    where: OAuthClientWhereUniqueInput
    create: XOR<OAuthClientCreateWithoutRefresh_tokensInput, OAuthClientUncheckedCreateWithoutRefresh_tokensInput>
  }

  export type UserCreateWithoutOauth_refresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauth_refresh_tokensInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauth_refresh_tokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauth_refresh_tokensInput, UserUncheckedCreateWithoutOauth_refresh_tokensInput>
  }

  export type OAuthClientUpsertWithoutRefresh_tokensInput = {
    update: XOR<OAuthClientUpdateWithoutRefresh_tokensInput, OAuthClientUncheckedUpdateWithoutRefresh_tokensInput>
    create: XOR<OAuthClientCreateWithoutRefresh_tokensInput, OAuthClientUncheckedCreateWithoutRefresh_tokensInput>
    where?: OAuthClientWhereInput
  }

  export type OAuthClientUpdateToOneWithWhereWithoutRefresh_tokensInput = {
    where?: OAuthClientWhereInput
    data: XOR<OAuthClientUpdateWithoutRefresh_tokensInput, OAuthClientUncheckedUpdateWithoutRefresh_tokensInput>
  }

  export type OAuthClientUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateWithoutRefresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutOauth_refresh_tokensInput = {
    update: XOR<UserUpdateWithoutOauth_refresh_tokensInput, UserUncheckedUpdateWithoutOauth_refresh_tokensInput>
    create: XOR<UserCreateWithoutOauth_refresh_tokensInput, UserUncheckedCreateWithoutOauth_refresh_tokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauth_refresh_tokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauth_refresh_tokensInput, UserUncheckedUpdateWithoutOauth_refresh_tokensInput>
  }

  export type UserUpdateWithoutOauth_refresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauth_refresh_tokensInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthClientCreateWithoutDevice_codesInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateWithoutDevice_codesInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutClientInput
    user_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientCreateOrConnectWithoutDevice_codesInput = {
    where: OAuthClientWhereUniqueInput
    create: XOR<OAuthClientCreateWithoutDevice_codesInput, OAuthClientUncheckedCreateWithoutDevice_codesInput>
  }

  export type UserCreateWithoutOauth_device_codesInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauth_device_codesInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_consents?: OAuthUserConsentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauth_device_codesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauth_device_codesInput, UserUncheckedCreateWithoutOauth_device_codesInput>
  }

  export type OAuthClientUpsertWithoutDevice_codesInput = {
    update: XOR<OAuthClientUpdateWithoutDevice_codesInput, OAuthClientUncheckedUpdateWithoutDevice_codesInput>
    create: XOR<OAuthClientCreateWithoutDevice_codesInput, OAuthClientUncheckedCreateWithoutDevice_codesInput>
    where?: OAuthClientWhereInput
  }

  export type OAuthClientUpdateToOneWithWhereWithoutDevice_codesInput = {
    where?: OAuthClientWhereInput
    data: XOR<OAuthClientUpdateWithoutDevice_codesInput, OAuthClientUncheckedUpdateWithoutDevice_codesInput>
  }

  export type OAuthClientUpdateWithoutDevice_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateWithoutDevice_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    user_consents?: OAuthUserConsentUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutOauth_device_codesInput = {
    update: XOR<UserUpdateWithoutOauth_device_codesInput, UserUncheckedUpdateWithoutOauth_device_codesInput>
    create: XOR<UserCreateWithoutOauth_device_codesInput, UserUncheckedCreateWithoutOauth_device_codesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauth_device_codesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauth_device_codesInput, UserUncheckedUpdateWithoutOauth_device_codesInput>
  }

  export type UserUpdateWithoutOauth_device_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauth_device_codesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_consents?: OAuthUserConsentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OAuthClientCreateWithoutUser_consentsInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeCreateNestedManyWithoutClientInput
  }

  export type OAuthClientUncheckedCreateWithoutUser_consentsInput = {
    id?: string
    client_id: string
    client_secret?: string | null
    client_secret_hash?: string | null
    name: string
    description?: string | null
    redirect_uris?: OAuthClientCreateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientCreatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientCreatescopesInput | string[]
    grant_types?: OAuthClientCreategrant_typesInput | string[]
    is_confidential?: boolean
    is_public_client?: boolean
    require_pkce?: boolean
    access_token_lifetime?: number
    refresh_token_lifetime?: number
    allowed_origins?: OAuthClientCreateallowed_originsInput | string[]
    logo_uri?: string | null
    policy_uri?: string | null
    tos_uri?: string | null
    is_active?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutClientInput
    access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutClientInput
    refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutClientInput
    device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutClientInput
  }

  export type OAuthClientCreateOrConnectWithoutUser_consentsInput = {
    where: OAuthClientWhereUniqueInput
    create: XOR<OAuthClientCreateWithoutUser_consentsInput, OAuthClientUncheckedCreateWithoutUser_consentsInput>
  }

  export type UserCreateWithoutOauth_consentsInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOauth_consentsInput = {
    id?: string
    email: string
    password_hash: string
    first_name?: string | null
    last_name?: string | null
    is_active?: boolean
    email_verified?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    refresh_tokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedCreateNestedManyWithoutUserInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedCreateNestedManyWithoutUserInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOauth_consentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOauth_consentsInput, UserUncheckedCreateWithoutOauth_consentsInput>
  }

  export type OAuthClientUpsertWithoutUser_consentsInput = {
    update: XOR<OAuthClientUpdateWithoutUser_consentsInput, OAuthClientUncheckedUpdateWithoutUser_consentsInput>
    create: XOR<OAuthClientCreateWithoutUser_consentsInput, OAuthClientUncheckedCreateWithoutUser_consentsInput>
    where?: OAuthClientWhereInput
  }

  export type OAuthClientUpdateToOneWithWhereWithoutUser_consentsInput = {
    where?: OAuthClientWhereInput
    data: XOR<OAuthClientUpdateWithoutUser_consentsInput, OAuthClientUncheckedUpdateWithoutUser_consentsInput>
  }

  export type OAuthClientUpdateWithoutUser_consentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUpdateManyWithoutClientNestedInput
  }

  export type OAuthClientUncheckedUpdateWithoutUser_consentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    client_secret?: NullableStringFieldUpdateOperationsInput | string | null
    client_secret_hash?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uris?: OAuthClientUpdateredirect_urisInput | string[]
    post_logout_redirect_uris?: OAuthClientUpdatepost_logout_redirect_urisInput | string[]
    scopes?: OAuthClientUpdatescopesInput | string[]
    grant_types?: OAuthClientUpdategrant_typesInput | string[]
    is_confidential?: BoolFieldUpdateOperationsInput | boolean
    is_public_client?: BoolFieldUpdateOperationsInput | boolean
    require_pkce?: BoolFieldUpdateOperationsInput | boolean
    access_token_lifetime?: IntFieldUpdateOperationsInput | number
    refresh_token_lifetime?: IntFieldUpdateOperationsInput | number
    allowed_origins?: OAuthClientUpdateallowed_originsInput | string[]
    logo_uri?: NullableStringFieldUpdateOperationsInput | string | null
    policy_uri?: NullableStringFieldUpdateOperationsInput | string | null
    tos_uri?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientNestedInput
    access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutClientNestedInput
    refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutClientNestedInput
    device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutClientNestedInput
  }

  export type UserUpsertWithoutOauth_consentsInput = {
    update: XOR<UserUpdateWithoutOauth_consentsInput, UserUncheckedUpdateWithoutOauth_consentsInput>
    create: XOR<UserCreateWithoutOauth_consentsInput, UserUncheckedCreateWithoutOauth_consentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOauth_consentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOauth_consentsInput, UserUncheckedUpdateWithoutOauth_consentsInput>
  }

  export type UserUpdateWithoutOauth_consentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOauth_consentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    first_name?: NullableStringFieldUpdateOperationsInput | string | null
    last_name?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    email_verified?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    refresh_tokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    oauth_authorization_codes?: OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserNestedInput
    oauth_access_tokens?: OAuthAccessTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_refresh_tokens?: OAuthRefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    oauth_device_codes?: OAuthDeviceCodeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expires_at: Date | string
    created_at?: Date | string
    revoked_at?: Date | string | null
  }

  export type OAuthAuthorizationCodeCreateManyUserInput = {
    id?: string
    code: string
    client_id: string
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAccessTokenCreateManyUserInput = {
    id?: string
    token: string
    client_id: string
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthRefreshTokenCreateManyUserInput = {
    id?: string
    token: string
    access_token_id: string
    client_id: string
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthDeviceCodeCreateManyUserInput = {
    id?: string
    device_code: string
    user_code: string
    client_id: string
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthUserConsentCreateManyUserInput = {
    id?: string
    client_id: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OAuthAuthorizationCodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutAuthorization_codesNestedInput
  }

  export type OAuthAuthorizationCodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccessTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutAccess_tokensNestedInput
  }

  export type OAuthAccessTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccessTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthRefreshTokenUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutRefresh_tokensNestedInput
  }

  export type OAuthRefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthRefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthDeviceCodeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutDevice_codesNestedInput
  }

  export type OAuthDeviceCodeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthDeviceCodeUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUserConsentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: OAuthClientUpdateOneRequiredWithoutUser_consentsNestedInput
  }

  export type OAuthUserConsentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUserConsentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    client_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeCreateManyClientInput = {
    id?: string
    code: string
    user_id?: string | null
    redirect_uri: string
    scope: string
    state?: string | null
    code_challenge?: string | null
    code_challenge_method?: string | null
    nonce?: string | null
    expires_at: Date | string
    consumed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthAccessTokenCreateManyClientInput = {
    id?: string
    token: string
    user_id?: string | null
    scope: string
    token_type?: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthRefreshTokenCreateManyClientInput = {
    id?: string
    token: string
    access_token_id: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    revoked_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthDeviceCodeCreateManyClientInput = {
    id?: string
    device_code: string
    user_code: string
    user_id?: string | null
    scope: string
    expires_at: Date | string
    interval?: number
    verified?: boolean
    completed_at?: Date | string | null
    created_at?: Date | string
  }

  export type OAuthUserConsentCreateManyClientInput = {
    id?: string
    user_id: string
    scope: string
    expires_at?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OAuthAuthorizationCodeUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOauth_authorization_codesNestedInput
  }

  export type OAuthAuthorizationCodeUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAuthorizationCodeUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    redirect_uri?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    state?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge?: NullableStringFieldUpdateOperationsInput | string | null
    code_challenge_method?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    consumed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccessTokenUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOauth_access_tokensNestedInput
  }

  export type OAuthAccessTokenUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthAccessTokenUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    token_type?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthRefreshTokenUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOauth_refresh_tokensNestedInput
  }

  export type OAuthRefreshTokenUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthRefreshTokenUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    access_token_id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthDeviceCodeUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutOauth_device_codesNestedInput
  }

  export type OAuthDeviceCodeUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthDeviceCodeUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    device_code?: StringFieldUpdateOperationsInput | string
    user_code?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    interval?: IntFieldUpdateOperationsInput | number
    verified?: BoolFieldUpdateOperationsInput | boolean
    completed_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUserConsentUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOauth_consentsNestedInput
  }

  export type OAuthUserConsentUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OAuthUserConsentUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    scope?: StringFieldUpdateOperationsInput | string
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
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