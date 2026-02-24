
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
 * Model user_profile
 * 
 */
export type user_profile = $Result.DefaultSelection<Prisma.$user_profilePayload>
/**
 * Model post
 * 
 */
export type post = $Result.DefaultSelection<Prisma.$postPayload>
/**
 * Model comment
 * 
 */
export type comment = $Result.DefaultSelection<Prisma.$commentPayload>
/**
 * Model category
 * 
 */
export type category = $Result.DefaultSelection<Prisma.$categoryPayload>
/**
 * Model post_category
 * 
 */
export type post_category = $Result.DefaultSelection<Prisma.$post_categoryPayload>
/**
 * Model tag
 * 
 */
export type tag = $Result.DefaultSelection<Prisma.$tagPayload>
/**
 * Model post_tag
 * 
 */
export type post_tag = $Result.DefaultSelection<Prisma.$post_tagPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more User_profiles
 * const user_profiles = await prisma.user_profile.findMany()
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
   * // Fetch zero or more User_profiles
   * const user_profiles = await prisma.user_profile.findMany()
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
   * `prisma.user_profile`: Exposes CRUD operations for the **user_profile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_profiles
    * const user_profiles = await prisma.user_profile.findMany()
    * ```
    */
  get user_profile(): Prisma.user_profileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.postDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.commentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post_category`: Exposes CRUD operations for the **post_category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Post_categories
    * const post_categories = await prisma.post_category.findMany()
    * ```
    */
  get post_category(): Prisma.post_categoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.tagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post_tag`: Exposes CRUD operations for the **post_tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Post_tags
    * const post_tags = await prisma.post_tag.findMany()
    * ```
    */
  get post_tag(): Prisma.post_tagDelegate<ExtArgs, ClientOptions>;
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
    user_profile: 'user_profile',
    post: 'post',
    comment: 'comment',
    category: 'category',
    post_category: 'post_category',
    tag: 'tag',
    post_tag: 'post_tag'
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
      modelProps: "user_profile" | "post" | "comment" | "category" | "post_category" | "tag" | "post_tag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      user_profile: {
        payload: Prisma.$user_profilePayload<ExtArgs>
        fields: Prisma.user_profileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_profileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_profileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>
          }
          findFirst: {
            args: Prisma.user_profileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_profileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>
          }
          findMany: {
            args: Prisma.user_profileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>[]
          }
          create: {
            args: Prisma.user_profileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>
          }
          createMany: {
            args: Prisma.user_profileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_profileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>[]
          }
          delete: {
            args: Prisma.user_profileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>
          }
          update: {
            args: Prisma.user_profileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>
          }
          deleteMany: {
            args: Prisma.user_profileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_profileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_profileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>[]
          }
          upsert: {
            args: Prisma.user_profileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_profilePayload>
          }
          aggregate: {
            args: Prisma.User_profileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_profile>
          }
          groupBy: {
            args: Prisma.user_profileGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_profileGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_profileCountArgs<ExtArgs>
            result: $Utils.Optional<User_profileCountAggregateOutputType> | number
          }
        }
      }
      post: {
        payload: Prisma.$postPayload<ExtArgs>
        fields: Prisma.postFieldRefs
        operations: {
          findUnique: {
            args: Prisma.postFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.postFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findFirst: {
            args: Prisma.postFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.postFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          findMany: {
            args: Prisma.postFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          create: {
            args: Prisma.postCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          createMany: {
            args: Prisma.postCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.postCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          delete: {
            args: Prisma.postDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          update: {
            args: Prisma.postUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          deleteMany: {
            args: Prisma.postDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.postUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.postUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>[]
          }
          upsert: {
            args: Prisma.postUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$postPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.postGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.postCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      comment: {
        payload: Prisma.$commentPayload<ExtArgs>
        fields: Prisma.commentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.commentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.commentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          findFirst: {
            args: Prisma.commentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.commentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          findMany: {
            args: Prisma.commentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>[]
          }
          create: {
            args: Prisma.commentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          createMany: {
            args: Prisma.commentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.commentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>[]
          }
          delete: {
            args: Prisma.commentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          update: {
            args: Prisma.commentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          deleteMany: {
            args: Prisma.commentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.commentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.commentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>[]
          }
          upsert: {
            args: Prisma.commentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$commentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.commentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.commentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      category: {
        payload: Prisma.$categoryPayload<ExtArgs>
        fields: Prisma.categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findFirst: {
            args: Prisma.categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          findMany: {
            args: Prisma.categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          create: {
            args: Prisma.categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          createMany: {
            args: Prisma.categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.categoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          delete: {
            args: Prisma.categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          update: {
            args: Prisma.categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          deleteMany: {
            args: Prisma.categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.categoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>[]
          }
          upsert: {
            args: Prisma.categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$categoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.categoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      post_category: {
        payload: Prisma.$post_categoryPayload<ExtArgs>
        fields: Prisma.post_categoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.post_categoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.post_categoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>
          }
          findFirst: {
            args: Prisma.post_categoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.post_categoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>
          }
          findMany: {
            args: Prisma.post_categoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>[]
          }
          create: {
            args: Prisma.post_categoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>
          }
          createMany: {
            args: Prisma.post_categoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.post_categoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>[]
          }
          delete: {
            args: Prisma.post_categoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>
          }
          update: {
            args: Prisma.post_categoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>
          }
          deleteMany: {
            args: Prisma.post_categoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.post_categoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.post_categoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>[]
          }
          upsert: {
            args: Prisma.post_categoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_categoryPayload>
          }
          aggregate: {
            args: Prisma.Post_categoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost_category>
          }
          groupBy: {
            args: Prisma.post_categoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<Post_categoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.post_categoryCountArgs<ExtArgs>
            result: $Utils.Optional<Post_categoryCountAggregateOutputType> | number
          }
        }
      }
      tag: {
        payload: Prisma.$tagPayload<ExtArgs>
        fields: Prisma.tagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>
          }
          findFirst: {
            args: Prisma.tagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>
          }
          findMany: {
            args: Prisma.tagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>[]
          }
          create: {
            args: Prisma.tagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>
          }
          createMany: {
            args: Prisma.tagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.tagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>[]
          }
          delete: {
            args: Prisma.tagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>
          }
          update: {
            args: Prisma.tagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>
          }
          deleteMany: {
            args: Prisma.tagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.tagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>[]
          }
          upsert: {
            args: Prisma.tagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.tagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.tagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      post_tag: {
        payload: Prisma.$post_tagPayload<ExtArgs>
        fields: Prisma.post_tagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.post_tagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.post_tagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>
          }
          findFirst: {
            args: Prisma.post_tagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.post_tagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>
          }
          findMany: {
            args: Prisma.post_tagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>[]
          }
          create: {
            args: Prisma.post_tagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>
          }
          createMany: {
            args: Prisma.post_tagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.post_tagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>[]
          }
          delete: {
            args: Prisma.post_tagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>
          }
          update: {
            args: Prisma.post_tagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>
          }
          deleteMany: {
            args: Prisma.post_tagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.post_tagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.post_tagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>[]
          }
          upsert: {
            args: Prisma.post_tagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$post_tagPayload>
          }
          aggregate: {
            args: Prisma.Post_tagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost_tag>
          }
          groupBy: {
            args: Prisma.post_tagGroupByArgs<ExtArgs>
            result: $Utils.Optional<Post_tagGroupByOutputType>[]
          }
          count: {
            args: Prisma.post_tagCountArgs<ExtArgs>
            result: $Utils.Optional<Post_tagCountAggregateOutputType> | number
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
    user_profile?: user_profileOmit
    post?: postOmit
    comment?: commentOmit
    category?: categoryOmit
    post_category?: post_categoryOmit
    tag?: tagOmit
    post_tag?: post_tagOmit
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
   * Count Type User_profileCountOutputType
   */

  export type User_profileCountOutputType = {
    posts: number
    comments: number
  }

  export type User_profileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | User_profileCountOutputTypeCountPostsArgs
    comments?: boolean | User_profileCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * User_profileCountOutputType without action
   */
  export type User_profileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_profileCountOutputType
     */
    select?: User_profileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * User_profileCountOutputType without action
   */
  export type User_profileCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
  }

  /**
   * User_profileCountOutputType without action
   */
  export type User_profileCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    comments: number
    categories: number
    tags: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | PostCountOutputTypeCountCommentsArgs
    categories?: boolean | PostCountOutputTypeCountCategoriesArgs
    tags?: boolean | PostCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: post_categoryWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: post_tagWhereInput
  }


  /**
   * Count Type CommentCountOutputType
   */

  export type CommentCountOutputType = {
    replies: number
  }

  export type CommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | CommentCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommentCountOutputType
     */
    select?: CommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommentCountOutputType without action
   */
  export type CommentCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    posts: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | CategoryCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: post_categoryWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    posts: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | TagCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: post_tagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model user_profile
   */

  export type AggregateUser_profile = {
    _count: User_profileCountAggregateOutputType | null
    _min: User_profileMinAggregateOutputType | null
    _max: User_profileMaxAggregateOutputType | null
  }

  export type User_profileMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    bio: string | null
    avatar_url: string | null
    date_of_birth: Date | null
    phone_number: string | null
    location: string | null
    website: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_profileMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    bio: string | null
    avatar_url: string | null
    date_of_birth: Date | null
    phone_number: string | null
    location: string | null
    website: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type User_profileCountAggregateOutputType = {
    id: number
    user_id: number
    bio: number
    avatar_url: number
    date_of_birth: number
    phone_number: number
    location: number
    website: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type User_profileMinAggregateInputType = {
    id?: true
    user_id?: true
    bio?: true
    avatar_url?: true
    date_of_birth?: true
    phone_number?: true
    location?: true
    website?: true
    created_at?: true
    updated_at?: true
  }

  export type User_profileMaxAggregateInputType = {
    id?: true
    user_id?: true
    bio?: true
    avatar_url?: true
    date_of_birth?: true
    phone_number?: true
    location?: true
    website?: true
    created_at?: true
    updated_at?: true
  }

  export type User_profileCountAggregateInputType = {
    id?: true
    user_id?: true
    bio?: true
    avatar_url?: true
    date_of_birth?: true
    phone_number?: true
    location?: true
    website?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type User_profileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_profile to aggregate.
     */
    where?: user_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profileOrderByWithRelationInput | user_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_profiles
    **/
    _count?: true | User_profileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_profileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_profileMaxAggregateInputType
  }

  export type GetUser_profileAggregateType<T extends User_profileAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_profile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_profile[P]>
      : GetScalarType<T[P], AggregateUser_profile[P]>
  }




  export type user_profileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_profileWhereInput
    orderBy?: user_profileOrderByWithAggregationInput | user_profileOrderByWithAggregationInput[]
    by: User_profileScalarFieldEnum[] | User_profileScalarFieldEnum
    having?: user_profileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_profileCountAggregateInputType | true
    _min?: User_profileMinAggregateInputType
    _max?: User_profileMaxAggregateInputType
  }

  export type User_profileGroupByOutputType = {
    id: string
    user_id: string
    bio: string | null
    avatar_url: string | null
    date_of_birth: Date | null
    phone_number: string | null
    location: string | null
    website: string | null
    created_at: Date
    updated_at: Date
    _count: User_profileCountAggregateOutputType | null
    _min: User_profileMinAggregateOutputType | null
    _max: User_profileMaxAggregateOutputType | null
  }

  type GetUser_profileGroupByPayload<T extends user_profileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_profileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_profileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_profileGroupByOutputType[P]>
            : GetScalarType<T[P], User_profileGroupByOutputType[P]>
        }
      >
    >


  export type user_profileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    bio?: boolean
    avatar_url?: boolean
    date_of_birth?: boolean
    phone_number?: boolean
    location?: boolean
    website?: boolean
    created_at?: boolean
    updated_at?: boolean
    posts?: boolean | user_profile$postsArgs<ExtArgs>
    comments?: boolean | user_profile$commentsArgs<ExtArgs>
    _count?: boolean | User_profileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_profile"]>

  export type user_profileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    bio?: boolean
    avatar_url?: boolean
    date_of_birth?: boolean
    phone_number?: boolean
    location?: boolean
    website?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user_profile"]>

  export type user_profileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    bio?: boolean
    avatar_url?: boolean
    date_of_birth?: boolean
    phone_number?: boolean
    location?: boolean
    website?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user_profile"]>

  export type user_profileSelectScalar = {
    id?: boolean
    user_id?: boolean
    bio?: boolean
    avatar_url?: boolean
    date_of_birth?: boolean
    phone_number?: boolean
    location?: boolean
    website?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type user_profileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "bio" | "avatar_url" | "date_of_birth" | "phone_number" | "location" | "website" | "created_at" | "updated_at", ExtArgs["result"]["user_profile"]>
  export type user_profileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | user_profile$postsArgs<ExtArgs>
    comments?: boolean | user_profile$commentsArgs<ExtArgs>
    _count?: boolean | User_profileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type user_profileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type user_profileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $user_profilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_profile"
    objects: {
      posts: Prisma.$postPayload<ExtArgs>[]
      comments: Prisma.$commentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      bio: string | null
      avatar_url: string | null
      date_of_birth: Date | null
      phone_number: string | null
      location: string | null
      website: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user_profile"]>
    composites: {}
  }

  type user_profileGetPayload<S extends boolean | null | undefined | user_profileDefaultArgs> = $Result.GetResult<Prisma.$user_profilePayload, S>

  type user_profileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_profileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_profileCountAggregateInputType | true
    }

  export interface user_profileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_profile'], meta: { name: 'user_profile' } }
    /**
     * Find zero or one User_profile that matches the filter.
     * @param {user_profileFindUniqueArgs} args - Arguments to find a User_profile
     * @example
     * // Get one User_profile
     * const user_profile = await prisma.user_profile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_profileFindUniqueArgs>(args: SelectSubset<T, user_profileFindUniqueArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_profile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_profileFindUniqueOrThrowArgs} args - Arguments to find a User_profile
     * @example
     * // Get one User_profile
     * const user_profile = await prisma.user_profile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_profileFindUniqueOrThrowArgs>(args: SelectSubset<T, user_profileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_profile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profileFindFirstArgs} args - Arguments to find a User_profile
     * @example
     * // Get one User_profile
     * const user_profile = await prisma.user_profile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_profileFindFirstArgs>(args?: SelectSubset<T, user_profileFindFirstArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_profile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profileFindFirstOrThrowArgs} args - Arguments to find a User_profile
     * @example
     * // Get one User_profile
     * const user_profile = await prisma.user_profile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_profileFindFirstOrThrowArgs>(args?: SelectSubset<T, user_profileFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_profiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_profiles
     * const user_profiles = await prisma.user_profile.findMany()
     * 
     * // Get first 10 User_profiles
     * const user_profiles = await prisma.user_profile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_profileWithIdOnly = await prisma.user_profile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends user_profileFindManyArgs>(args?: SelectSubset<T, user_profileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_profile.
     * @param {user_profileCreateArgs} args - Arguments to create a User_profile.
     * @example
     * // Create one User_profile
     * const User_profile = await prisma.user_profile.create({
     *   data: {
     *     // ... data to create a User_profile
     *   }
     * })
     * 
     */
    create<T extends user_profileCreateArgs>(args: SelectSubset<T, user_profileCreateArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_profiles.
     * @param {user_profileCreateManyArgs} args - Arguments to create many User_profiles.
     * @example
     * // Create many User_profiles
     * const user_profile = await prisma.user_profile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_profileCreateManyArgs>(args?: SelectSubset<T, user_profileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_profiles and returns the data saved in the database.
     * @param {user_profileCreateManyAndReturnArgs} args - Arguments to create many User_profiles.
     * @example
     * // Create many User_profiles
     * const user_profile = await prisma.user_profile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_profiles and only return the `id`
     * const user_profileWithIdOnly = await prisma.user_profile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_profileCreateManyAndReturnArgs>(args?: SelectSubset<T, user_profileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_profile.
     * @param {user_profileDeleteArgs} args - Arguments to delete one User_profile.
     * @example
     * // Delete one User_profile
     * const User_profile = await prisma.user_profile.delete({
     *   where: {
     *     // ... filter to delete one User_profile
     *   }
     * })
     * 
     */
    delete<T extends user_profileDeleteArgs>(args: SelectSubset<T, user_profileDeleteArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_profile.
     * @param {user_profileUpdateArgs} args - Arguments to update one User_profile.
     * @example
     * // Update one User_profile
     * const user_profile = await prisma.user_profile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_profileUpdateArgs>(args: SelectSubset<T, user_profileUpdateArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_profiles.
     * @param {user_profileDeleteManyArgs} args - Arguments to filter User_profiles to delete.
     * @example
     * // Delete a few User_profiles
     * const { count } = await prisma.user_profile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_profileDeleteManyArgs>(args?: SelectSubset<T, user_profileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_profiles
     * const user_profile = await prisma.user_profile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_profileUpdateManyArgs>(args: SelectSubset<T, user_profileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_profiles and returns the data updated in the database.
     * @param {user_profileUpdateManyAndReturnArgs} args - Arguments to update many User_profiles.
     * @example
     * // Update many User_profiles
     * const user_profile = await prisma.user_profile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_profiles and only return the `id`
     * const user_profileWithIdOnly = await prisma.user_profile.updateManyAndReturn({
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
    updateManyAndReturn<T extends user_profileUpdateManyAndReturnArgs>(args: SelectSubset<T, user_profileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_profile.
     * @param {user_profileUpsertArgs} args - Arguments to update or create a User_profile.
     * @example
     * // Update or create a User_profile
     * const user_profile = await prisma.user_profile.upsert({
     *   create: {
     *     // ... data to create a User_profile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_profile we want to update
     *   }
     * })
     */
    upsert<T extends user_profileUpsertArgs>(args: SelectSubset<T, user_profileUpsertArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_profiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profileCountArgs} args - Arguments to filter User_profiles to count.
     * @example
     * // Count the number of User_profiles
     * const count = await prisma.user_profile.count({
     *   where: {
     *     // ... the filter for the User_profiles we want to count
     *   }
     * })
    **/
    count<T extends user_profileCountArgs>(
      args?: Subset<T, user_profileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_profileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_profileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends User_profileAggregateArgs>(args: Subset<T, User_profileAggregateArgs>): Prisma.PrismaPromise<GetUser_profileAggregateType<T>>

    /**
     * Group by User_profile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_profileGroupByArgs} args - Group by arguments.
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
      T extends user_profileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_profileGroupByArgs['orderBy'] }
        : { orderBy?: user_profileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, user_profileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_profileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_profile model
   */
  readonly fields: user_profileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_profile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_profileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends user_profile$postsArgs<ExtArgs> = {}>(args?: Subset<T, user_profile$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends user_profile$commentsArgs<ExtArgs> = {}>(args?: Subset<T, user_profile$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the user_profile model
   */
  interface user_profileFieldRefs {
    readonly id: FieldRef<"user_profile", 'String'>
    readonly user_id: FieldRef<"user_profile", 'String'>
    readonly bio: FieldRef<"user_profile", 'String'>
    readonly avatar_url: FieldRef<"user_profile", 'String'>
    readonly date_of_birth: FieldRef<"user_profile", 'DateTime'>
    readonly phone_number: FieldRef<"user_profile", 'String'>
    readonly location: FieldRef<"user_profile", 'String'>
    readonly website: FieldRef<"user_profile", 'String'>
    readonly created_at: FieldRef<"user_profile", 'DateTime'>
    readonly updated_at: FieldRef<"user_profile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_profile findUnique
   */
  export type user_profileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * Filter, which user_profile to fetch.
     */
    where: user_profileWhereUniqueInput
  }

  /**
   * user_profile findUniqueOrThrow
   */
  export type user_profileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * Filter, which user_profile to fetch.
     */
    where: user_profileWhereUniqueInput
  }

  /**
   * user_profile findFirst
   */
  export type user_profileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * Filter, which user_profile to fetch.
     */
    where?: user_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profileOrderByWithRelationInput | user_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_profiles.
     */
    cursor?: user_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_profiles.
     */
    distinct?: User_profileScalarFieldEnum | User_profileScalarFieldEnum[]
  }

  /**
   * user_profile findFirstOrThrow
   */
  export type user_profileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * Filter, which user_profile to fetch.
     */
    where?: user_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profileOrderByWithRelationInput | user_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_profiles.
     */
    cursor?: user_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_profiles.
     */
    distinct?: User_profileScalarFieldEnum | User_profileScalarFieldEnum[]
  }

  /**
   * user_profile findMany
   */
  export type user_profileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * Filter, which user_profiles to fetch.
     */
    where?: user_profileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_profiles to fetch.
     */
    orderBy?: user_profileOrderByWithRelationInput | user_profileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_profiles.
     */
    cursor?: user_profileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_profiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_profiles.
     */
    skip?: number
    distinct?: User_profileScalarFieldEnum | User_profileScalarFieldEnum[]
  }

  /**
   * user_profile create
   */
  export type user_profileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * The data needed to create a user_profile.
     */
    data: XOR<user_profileCreateInput, user_profileUncheckedCreateInput>
  }

  /**
   * user_profile createMany
   */
  export type user_profileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_profiles.
     */
    data: user_profileCreateManyInput | user_profileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_profile createManyAndReturn
   */
  export type user_profileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * The data used to create many user_profiles.
     */
    data: user_profileCreateManyInput | user_profileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_profile update
   */
  export type user_profileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * The data needed to update a user_profile.
     */
    data: XOR<user_profileUpdateInput, user_profileUncheckedUpdateInput>
    /**
     * Choose, which user_profile to update.
     */
    where: user_profileWhereUniqueInput
  }

  /**
   * user_profile updateMany
   */
  export type user_profileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_profiles.
     */
    data: XOR<user_profileUpdateManyMutationInput, user_profileUncheckedUpdateManyInput>
    /**
     * Filter which user_profiles to update
     */
    where?: user_profileWhereInput
    /**
     * Limit how many user_profiles to update.
     */
    limit?: number
  }

  /**
   * user_profile updateManyAndReturn
   */
  export type user_profileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * The data used to update user_profiles.
     */
    data: XOR<user_profileUpdateManyMutationInput, user_profileUncheckedUpdateManyInput>
    /**
     * Filter which user_profiles to update
     */
    where?: user_profileWhereInput
    /**
     * Limit how many user_profiles to update.
     */
    limit?: number
  }

  /**
   * user_profile upsert
   */
  export type user_profileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * The filter to search for the user_profile to update in case it exists.
     */
    where: user_profileWhereUniqueInput
    /**
     * In case the user_profile found by the `where` argument doesn't exist, create a new user_profile with this data.
     */
    create: XOR<user_profileCreateInput, user_profileUncheckedCreateInput>
    /**
     * In case the user_profile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_profileUpdateInput, user_profileUncheckedUpdateInput>
  }

  /**
   * user_profile delete
   */
  export type user_profileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
    /**
     * Filter which user_profile to delete.
     */
    where: user_profileWhereUniqueInput
  }

  /**
   * user_profile deleteMany
   */
  export type user_profileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_profiles to delete
     */
    where?: user_profileWhereInput
    /**
     * Limit how many user_profiles to delete.
     */
    limit?: number
  }

  /**
   * user_profile.posts
   */
  export type user_profile$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    where?: postWhereInput
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    cursor?: postWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * user_profile.comments
   */
  export type user_profile$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    where?: commentWhereInput
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    cursor?: commentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * user_profile without action
   */
  export type user_profileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_profile
     */
    select?: user_profileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_profile
     */
    omit?: user_profileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_profileInclude<ExtArgs> | null
  }


  /**
   * Model post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    content: string | null
    published: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    content: string | null
    published: boolean | null
    author_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    content: number
    published: number
    author_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    published?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    published?: true
    author_id?: true
    created_at?: true
    updated_at?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    published?: true
    author_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post to aggregate.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type postGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: postWhereInput
    orderBy?: postOrderByWithAggregationInput | postOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: postScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    slug: string
    content: string
    published: boolean
    author_id: string
    created_at: Date
    updated_at: Date
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends postGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type postSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    comments?: boolean | post$commentsArgs<ExtArgs>
    categories?: boolean | post$categoriesArgs<ExtArgs>
    tags?: boolean | post$tagsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type postSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    author?: boolean | user_profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type postSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    author?: boolean | user_profileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type postSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
    author_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type postOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "content" | "published" | "author_id" | "created_at" | "updated_at", ExtArgs["result"]["post"]>
  export type postInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    comments?: boolean | post$commentsArgs<ExtArgs>
    categories?: boolean | post$categoriesArgs<ExtArgs>
    tags?: boolean | post$tagsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type postIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | user_profileDefaultArgs<ExtArgs>
  }
  export type postIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | user_profileDefaultArgs<ExtArgs>
  }

  export type $postPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "post"
    objects: {
      author: Prisma.$user_profilePayload<ExtArgs>
      comments: Prisma.$commentPayload<ExtArgs>[]
      categories: Prisma.$post_categoryPayload<ExtArgs>[]
      tags: Prisma.$post_tagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      content: string
      published: boolean
      author_id: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type postGetPayload<S extends boolean | null | undefined | postDefaultArgs> = $Result.GetResult<Prisma.$postPayload, S>

  type postCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<postFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface postDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['post'], meta: { name: 'post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {postFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends postFindUniqueArgs>(args: SelectSubset<T, postFindUniqueArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {postFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends postFindUniqueOrThrowArgs>(args: SelectSubset<T, postFindUniqueOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends postFindFirstArgs>(args?: SelectSubset<T, postFindFirstArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends postFindFirstOrThrowArgs>(args?: SelectSubset<T, postFindFirstOrThrowArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends postFindManyArgs>(args?: SelectSubset<T, postFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {postCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends postCreateArgs>(args: SelectSubset<T, postCreateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {postCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends postCreateManyArgs>(args?: SelectSubset<T, postCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {postCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends postCreateManyAndReturnArgs>(args?: SelectSubset<T, postCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {postDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends postDeleteArgs>(args: SelectSubset<T, postDeleteArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {postUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends postUpdateArgs>(args: SelectSubset<T, postUpdateArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {postDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends postDeleteManyArgs>(args?: SelectSubset<T, postDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends postUpdateManyArgs>(args: SelectSubset<T, postUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {postUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
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
    updateManyAndReturn<T extends postUpdateManyAndReturnArgs>(args: SelectSubset<T, postUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {postUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends postUpsertArgs>(args: SelectSubset<T, postUpsertArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends postCountArgs>(
      args?: Subset<T, postCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {postGroupByArgs} args - Group by arguments.
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
      T extends postGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: postGroupByArgs['orderBy'] }
        : { orderBy?: postGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, postGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the post model
   */
  readonly fields: postFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__postClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends user_profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, user_profileDefaultArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends post$commentsArgs<ExtArgs> = {}>(args?: Subset<T, post$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends post$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, post$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends post$tagsArgs<ExtArgs> = {}>(args?: Subset<T, post$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the post model
   */
  interface postFieldRefs {
    readonly id: FieldRef<"post", 'String'>
    readonly title: FieldRef<"post", 'String'>
    readonly slug: FieldRef<"post", 'String'>
    readonly content: FieldRef<"post", 'String'>
    readonly published: FieldRef<"post", 'Boolean'>
    readonly author_id: FieldRef<"post", 'String'>
    readonly created_at: FieldRef<"post", 'DateTime'>
    readonly updated_at: FieldRef<"post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * post findUnique
   */
  export type postFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findUniqueOrThrow
   */
  export type postFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where: postWhereUniqueInput
  }

  /**
   * post findFirst
   */
  export type postFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findFirstOrThrow
   */
  export type postFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which post to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post findMany
   */
  export type postFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter, which posts to fetch.
     */
    where?: postWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of posts to fetch.
     */
    orderBy?: postOrderByWithRelationInput | postOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing posts.
     */
    cursor?: postWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * post create
   */
  export type postCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The data needed to create a post.
     */
    data: XOR<postCreateInput, postUncheckedCreateInput>
  }

  /**
   * post createMany
   */
  export type postCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many posts.
     */
    data: postCreateManyInput | postCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * post createManyAndReturn
   */
  export type postCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * The data used to create many posts.
     */
    data: postCreateManyInput | postCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * post update
   */
  export type postUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The data needed to update a post.
     */
    data: XOR<postUpdateInput, postUncheckedUpdateInput>
    /**
     * Choose, which post to update.
     */
    where: postWhereUniqueInput
  }

  /**
   * post updateMany
   */
  export type postUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update posts.
     */
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyInput>
    /**
     * Filter which posts to update
     */
    where?: postWhereInput
    /**
     * Limit how many posts to update.
     */
    limit?: number
  }

  /**
   * post updateManyAndReturn
   */
  export type postUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * The data used to update posts.
     */
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyInput>
    /**
     * Filter which posts to update
     */
    where?: postWhereInput
    /**
     * Limit how many posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * post upsert
   */
  export type postUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * The filter to search for the post to update in case it exists.
     */
    where: postWhereUniqueInput
    /**
     * In case the post found by the `where` argument doesn't exist, create a new post with this data.
     */
    create: XOR<postCreateInput, postUncheckedCreateInput>
    /**
     * In case the post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<postUpdateInput, postUncheckedUpdateInput>
  }

  /**
   * post delete
   */
  export type postDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
    /**
     * Filter which post to delete.
     */
    where: postWhereUniqueInput
  }

  /**
   * post deleteMany
   */
  export type postDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which posts to delete
     */
    where?: postWhereInput
    /**
     * Limit how many posts to delete.
     */
    limit?: number
  }

  /**
   * post.comments
   */
  export type post$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    where?: commentWhereInput
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    cursor?: commentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * post.categories
   */
  export type post$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    where?: post_categoryWhereInput
    orderBy?: post_categoryOrderByWithRelationInput | post_categoryOrderByWithRelationInput[]
    cursor?: post_categoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Post_categoryScalarFieldEnum | Post_categoryScalarFieldEnum[]
  }

  /**
   * post.tags
   */
  export type post$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    where?: post_tagWhereInput
    orderBy?: post_tagOrderByWithRelationInput | post_tagOrderByWithRelationInput[]
    cursor?: post_tagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Post_tagScalarFieldEnum | Post_tagScalarFieldEnum[]
  }

  /**
   * post without action
   */
  export type postDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post
     */
    select?: postSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post
     */
    omit?: postOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: postInclude<ExtArgs> | null
  }


  /**
   * Model comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    content: string | null
    post_id: string | null
    author_id: string | null
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    content: string | null
    post_id: string | null
    author_id: string | null
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    post_id: number
    author_id: number
    parent_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    post_id?: true
    author_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    post_id?: true
    author_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    post_id?: true
    author_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comment to aggregate.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type commentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: commentWhereInput
    orderBy?: commentOrderByWithAggregationInput | commentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: commentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    content: string
    post_id: string
    author_id: string
    parent_id: string | null
    created_at: Date
    updated_at: Date
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends commentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type commentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    post_id?: boolean
    author_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    parent?: boolean | comment$parentArgs<ExtArgs>
    replies?: boolean | comment$repliesArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type commentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    post_id?: boolean
    author_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    parent?: boolean | comment$parentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type commentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    post_id?: boolean
    author_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    parent?: boolean | comment$parentArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type commentSelectScalar = {
    id?: boolean
    content?: boolean
    post_id?: boolean
    author_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type commentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "post_id" | "author_id" | "parent_id" | "created_at" | "updated_at", ExtArgs["result"]["comment"]>
  export type commentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    parent?: boolean | comment$parentArgs<ExtArgs>
    replies?: boolean | comment$repliesArgs<ExtArgs>
    _count?: boolean | CommentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type commentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    parent?: boolean | comment$parentArgs<ExtArgs>
  }
  export type commentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    author?: boolean | user_profileDefaultArgs<ExtArgs>
    parent?: boolean | comment$parentArgs<ExtArgs>
  }

  export type $commentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "comment"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
      author: Prisma.$user_profilePayload<ExtArgs>
      parent: Prisma.$commentPayload<ExtArgs> | null
      replies: Prisma.$commentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      post_id: string
      author_id: string
      parent_id: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type commentGetPayload<S extends boolean | null | undefined | commentDefaultArgs> = $Result.GetResult<Prisma.$commentPayload, S>

  type commentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<commentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface commentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['comment'], meta: { name: 'comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {commentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends commentFindUniqueArgs>(args: SelectSubset<T, commentFindUniqueArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {commentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends commentFindUniqueOrThrowArgs>(args: SelectSubset<T, commentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends commentFindFirstArgs>(args?: SelectSubset<T, commentFindFirstArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends commentFindFirstOrThrowArgs>(args?: SelectSubset<T, commentFindFirstOrThrowArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends commentFindManyArgs>(args?: SelectSubset<T, commentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {commentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends commentCreateArgs>(args: SelectSubset<T, commentCreateArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {commentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends commentCreateManyArgs>(args?: SelectSubset<T, commentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {commentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends commentCreateManyAndReturnArgs>(args?: SelectSubset<T, commentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {commentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends commentDeleteArgs>(args: SelectSubset<T, commentDeleteArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {commentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends commentUpdateArgs>(args: SelectSubset<T, commentUpdateArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {commentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends commentDeleteManyArgs>(args?: SelectSubset<T, commentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends commentUpdateManyArgs>(args: SelectSubset<T, commentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {commentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
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
    updateManyAndReturn<T extends commentUpdateManyAndReturnArgs>(args: SelectSubset<T, commentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {commentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends commentUpsertArgs>(args: SelectSubset<T, commentUpsertArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends commentCountArgs>(
      args?: Subset<T, commentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {commentGroupByArgs} args - Group by arguments.
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
      T extends commentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: commentGroupByArgs['orderBy'] }
        : { orderBy?: commentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, commentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the comment model
   */
  readonly fields: commentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__commentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends user_profileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, user_profileDefaultArgs<ExtArgs>>): Prisma__user_profileClient<$Result.GetResult<Prisma.$user_profilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends comment$parentArgs<ExtArgs> = {}>(args?: Subset<T, comment$parentArgs<ExtArgs>>): Prisma__commentClient<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends comment$repliesArgs<ExtArgs> = {}>(args?: Subset<T, comment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$commentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the comment model
   */
  interface commentFieldRefs {
    readonly id: FieldRef<"comment", 'String'>
    readonly content: FieldRef<"comment", 'String'>
    readonly post_id: FieldRef<"comment", 'String'>
    readonly author_id: FieldRef<"comment", 'String'>
    readonly parent_id: FieldRef<"comment", 'String'>
    readonly created_at: FieldRef<"comment", 'DateTime'>
    readonly updated_at: FieldRef<"comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * comment findUnique
   */
  export type commentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment findUniqueOrThrow
   */
  export type commentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment findFirst
   */
  export type commentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * comment findFirstOrThrow
   */
  export type commentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comment to fetch.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for comments.
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * comment findMany
   */
  export type commentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter, which comments to fetch.
     */
    where?: commentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of comments to fetch.
     */
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing comments.
     */
    cursor?: commentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * comment create
   */
  export type commentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * The data needed to create a comment.
     */
    data: XOR<commentCreateInput, commentUncheckedCreateInput>
  }

  /**
   * comment createMany
   */
  export type commentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many comments.
     */
    data: commentCreateManyInput | commentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * comment createManyAndReturn
   */
  export type commentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * The data used to create many comments.
     */
    data: commentCreateManyInput | commentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * comment update
   */
  export type commentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * The data needed to update a comment.
     */
    data: XOR<commentUpdateInput, commentUncheckedUpdateInput>
    /**
     * Choose, which comment to update.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment updateMany
   */
  export type commentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update comments.
     */
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyInput>
    /**
     * Filter which comments to update
     */
    where?: commentWhereInput
    /**
     * Limit how many comments to update.
     */
    limit?: number
  }

  /**
   * comment updateManyAndReturn
   */
  export type commentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * The data used to update comments.
     */
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyInput>
    /**
     * Filter which comments to update
     */
    where?: commentWhereInput
    /**
     * Limit how many comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * comment upsert
   */
  export type commentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * The filter to search for the comment to update in case it exists.
     */
    where: commentWhereUniqueInput
    /**
     * In case the comment found by the `where` argument doesn't exist, create a new comment with this data.
     */
    create: XOR<commentCreateInput, commentUncheckedCreateInput>
    /**
     * In case the comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<commentUpdateInput, commentUncheckedUpdateInput>
  }

  /**
   * comment delete
   */
  export type commentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    /**
     * Filter which comment to delete.
     */
    where: commentWhereUniqueInput
  }

  /**
   * comment deleteMany
   */
  export type commentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which comments to delete
     */
    where?: commentWhereInput
    /**
     * Limit how many comments to delete.
     */
    limit?: number
  }

  /**
   * comment.parent
   */
  export type comment$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    where?: commentWhereInput
  }

  /**
   * comment.replies
   */
  export type comment$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
    where?: commentWhereInput
    orderBy?: commentOrderByWithRelationInput | commentOrderByWithRelationInput[]
    cursor?: commentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * comment without action
   */
  export type commentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the comment
     */
    select?: commentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the comment
     */
    omit?: commentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: commentInclude<ExtArgs> | null
  }


  /**
   * Model category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    created_at?: true
    updated_at?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which category to aggregate.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: categoryWhereInput
    orderBy?: categoryOrderByWithAggregationInput | categoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    created_at: Date
    updated_at: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
    posts?: boolean | category$postsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type categorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["category"]>

  export type categorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["category"]>

  export type categorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "created_at" | "updated_at", ExtArgs["result"]["category"]>
  export type categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | category$postsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type categoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type categoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "category"
    objects: {
      posts: Prisma.$post_categoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type categoryGetPayload<S extends boolean | null | undefined | categoryDefaultArgs> = $Result.GetResult<Prisma.$categoryPayload, S>

  type categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['category'], meta: { name: 'category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {categoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends categoryFindUniqueArgs>(args: SelectSubset<T, categoryFindUniqueArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {categoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends categoryFindFirstArgs>(args?: SelectSubset<T, categoryFindFirstArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends categoryFindManyArgs>(args?: SelectSubset<T, categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {categoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends categoryCreateArgs>(args: SelectSubset<T, categoryCreateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {categoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends categoryCreateManyArgs>(args?: SelectSubset<T, categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {categoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends categoryCreateManyAndReturnArgs>(args?: SelectSubset<T, categoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {categoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends categoryDeleteArgs>(args: SelectSubset<T, categoryDeleteArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {categoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends categoryUpdateArgs>(args: SelectSubset<T, categoryUpdateArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {categoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends categoryDeleteManyArgs>(args?: SelectSubset<T, categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends categoryUpdateManyArgs>(args: SelectSubset<T, categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {categoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
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
    updateManyAndReturn<T extends categoryUpdateManyAndReturnArgs>(args: SelectSubset<T, categoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {categoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends categoryUpsertArgs>(args: SelectSubset<T, categoryUpsertArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends categoryCountArgs>(
      args?: Subset<T, categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {categoryGroupByArgs} args - Group by arguments.
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
      T extends categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: categoryGroupByArgs['orderBy'] }
        : { orderBy?: categoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the category model
   */
  readonly fields: categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends category$postsArgs<ExtArgs> = {}>(args?: Subset<T, category$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the category model
   */
  interface categoryFieldRefs {
    readonly id: FieldRef<"category", 'String'>
    readonly name: FieldRef<"category", 'String'>
    readonly slug: FieldRef<"category", 'String'>
    readonly description: FieldRef<"category", 'String'>
    readonly created_at: FieldRef<"category", 'DateTime'>
    readonly updated_at: FieldRef<"category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * category findUnique
   */
  export type categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findUniqueOrThrow
   */
  export type categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category findFirst
   */
  export type categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findFirstOrThrow
   */
  export type categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which category to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category findMany
   */
  export type categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter, which categories to fetch.
     */
    where?: categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of categories to fetch.
     */
    orderBy?: categoryOrderByWithRelationInput | categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing categories.
     */
    cursor?: categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * category create
   */
  export type categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a category.
     */
    data: XOR<categoryCreateInput, categoryUncheckedCreateInput>
  }

  /**
   * category createMany
   */
  export type categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * category createManyAndReturn
   */
  export type categoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to create many categories.
     */
    data: categoryCreateManyInput | categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * category update
   */
  export type categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a category.
     */
    data: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
    /**
     * Choose, which category to update.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category updateMany
   */
  export type categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category updateManyAndReturn
   */
  export type categoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * The data used to update categories.
     */
    data: XOR<categoryUpdateManyMutationInput, categoryUncheckedUpdateManyInput>
    /**
     * Filter which categories to update
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to update.
     */
    limit?: number
  }

  /**
   * category upsert
   */
  export type categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the category to update in case it exists.
     */
    where: categoryWhereUniqueInput
    /**
     * In case the category found by the `where` argument doesn't exist, create a new category with this data.
     */
    create: XOR<categoryCreateInput, categoryUncheckedCreateInput>
    /**
     * In case the category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<categoryUpdateInput, categoryUncheckedUpdateInput>
  }

  /**
   * category delete
   */
  export type categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
    /**
     * Filter which category to delete.
     */
    where: categoryWhereUniqueInput
  }

  /**
   * category deleteMany
   */
  export type categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which categories to delete
     */
    where?: categoryWhereInput
    /**
     * Limit how many categories to delete.
     */
    limit?: number
  }

  /**
   * category.posts
   */
  export type category$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    where?: post_categoryWhereInput
    orderBy?: post_categoryOrderByWithRelationInput | post_categoryOrderByWithRelationInput[]
    cursor?: post_categoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Post_categoryScalarFieldEnum | Post_categoryScalarFieldEnum[]
  }

  /**
   * category without action
   */
  export type categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the category
     */
    select?: categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the category
     */
    omit?: categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: categoryInclude<ExtArgs> | null
  }


  /**
   * Model post_category
   */

  export type AggregatePost_category = {
    _count: Post_categoryCountAggregateOutputType | null
    _min: Post_categoryMinAggregateOutputType | null
    _max: Post_categoryMaxAggregateOutputType | null
  }

  export type Post_categoryMinAggregateOutputType = {
    post_id: string | null
    category_id: string | null
  }

  export type Post_categoryMaxAggregateOutputType = {
    post_id: string | null
    category_id: string | null
  }

  export type Post_categoryCountAggregateOutputType = {
    post_id: number
    category_id: number
    _all: number
  }


  export type Post_categoryMinAggregateInputType = {
    post_id?: true
    category_id?: true
  }

  export type Post_categoryMaxAggregateInputType = {
    post_id?: true
    category_id?: true
  }

  export type Post_categoryCountAggregateInputType = {
    post_id?: true
    category_id?: true
    _all?: true
  }

  export type Post_categoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post_category to aggregate.
     */
    where?: post_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_categories to fetch.
     */
    orderBy?: post_categoryOrderByWithRelationInput | post_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: post_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned post_categories
    **/
    _count?: true | Post_categoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Post_categoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Post_categoryMaxAggregateInputType
  }

  export type GetPost_categoryAggregateType<T extends Post_categoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePost_category]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost_category[P]>
      : GetScalarType<T[P], AggregatePost_category[P]>
  }




  export type post_categoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: post_categoryWhereInput
    orderBy?: post_categoryOrderByWithAggregationInput | post_categoryOrderByWithAggregationInput[]
    by: Post_categoryScalarFieldEnum[] | Post_categoryScalarFieldEnum
    having?: post_categoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Post_categoryCountAggregateInputType | true
    _min?: Post_categoryMinAggregateInputType
    _max?: Post_categoryMaxAggregateInputType
  }

  export type Post_categoryGroupByOutputType = {
    post_id: string
    category_id: string
    _count: Post_categoryCountAggregateOutputType | null
    _min: Post_categoryMinAggregateOutputType | null
    _max: Post_categoryMaxAggregateOutputType | null
  }

  type GetPost_categoryGroupByPayload<T extends post_categoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Post_categoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Post_categoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Post_categoryGroupByOutputType[P]>
            : GetScalarType<T[P], Post_categoryGroupByOutputType[P]>
        }
      >
    >


  export type post_categorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    category_id?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post_category"]>

  export type post_categorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    category_id?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post_category"]>

  export type post_categorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    category_id?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post_category"]>

  export type post_categorySelectScalar = {
    post_id?: boolean
    category_id?: boolean
  }

  export type post_categoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"post_id" | "category_id", ExtArgs["result"]["post_category"]>
  export type post_categoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }
  export type post_categoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }
  export type post_categoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    category?: boolean | categoryDefaultArgs<ExtArgs>
  }

  export type $post_categoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "post_category"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
      category: Prisma.$categoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      post_id: string
      category_id: string
    }, ExtArgs["result"]["post_category"]>
    composites: {}
  }

  type post_categoryGetPayload<S extends boolean | null | undefined | post_categoryDefaultArgs> = $Result.GetResult<Prisma.$post_categoryPayload, S>

  type post_categoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<post_categoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Post_categoryCountAggregateInputType | true
    }

  export interface post_categoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['post_category'], meta: { name: 'post_category' } }
    /**
     * Find zero or one Post_category that matches the filter.
     * @param {post_categoryFindUniqueArgs} args - Arguments to find a Post_category
     * @example
     * // Get one Post_category
     * const post_category = await prisma.post_category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends post_categoryFindUniqueArgs>(args: SelectSubset<T, post_categoryFindUniqueArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post_category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {post_categoryFindUniqueOrThrowArgs} args - Arguments to find a Post_category
     * @example
     * // Get one Post_category
     * const post_category = await prisma.post_category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends post_categoryFindUniqueOrThrowArgs>(args: SelectSubset<T, post_categoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post_category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_categoryFindFirstArgs} args - Arguments to find a Post_category
     * @example
     * // Get one Post_category
     * const post_category = await prisma.post_category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends post_categoryFindFirstArgs>(args?: SelectSubset<T, post_categoryFindFirstArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post_category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_categoryFindFirstOrThrowArgs} args - Arguments to find a Post_category
     * @example
     * // Get one Post_category
     * const post_category = await prisma.post_category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends post_categoryFindFirstOrThrowArgs>(args?: SelectSubset<T, post_categoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Post_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_categoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Post_categories
     * const post_categories = await prisma.post_category.findMany()
     * 
     * // Get first 10 Post_categories
     * const post_categories = await prisma.post_category.findMany({ take: 10 })
     * 
     * // Only select the `post_id`
     * const post_categoryWithPost_idOnly = await prisma.post_category.findMany({ select: { post_id: true } })
     * 
     */
    findMany<T extends post_categoryFindManyArgs>(args?: SelectSubset<T, post_categoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post_category.
     * @param {post_categoryCreateArgs} args - Arguments to create a Post_category.
     * @example
     * // Create one Post_category
     * const Post_category = await prisma.post_category.create({
     *   data: {
     *     // ... data to create a Post_category
     *   }
     * })
     * 
     */
    create<T extends post_categoryCreateArgs>(args: SelectSubset<T, post_categoryCreateArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Post_categories.
     * @param {post_categoryCreateManyArgs} args - Arguments to create many Post_categories.
     * @example
     * // Create many Post_categories
     * const post_category = await prisma.post_category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends post_categoryCreateManyArgs>(args?: SelectSubset<T, post_categoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Post_categories and returns the data saved in the database.
     * @param {post_categoryCreateManyAndReturnArgs} args - Arguments to create many Post_categories.
     * @example
     * // Create many Post_categories
     * const post_category = await prisma.post_category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Post_categories and only return the `post_id`
     * const post_categoryWithPost_idOnly = await prisma.post_category.createManyAndReturn({
     *   select: { post_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends post_categoryCreateManyAndReturnArgs>(args?: SelectSubset<T, post_categoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post_category.
     * @param {post_categoryDeleteArgs} args - Arguments to delete one Post_category.
     * @example
     * // Delete one Post_category
     * const Post_category = await prisma.post_category.delete({
     *   where: {
     *     // ... filter to delete one Post_category
     *   }
     * })
     * 
     */
    delete<T extends post_categoryDeleteArgs>(args: SelectSubset<T, post_categoryDeleteArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post_category.
     * @param {post_categoryUpdateArgs} args - Arguments to update one Post_category.
     * @example
     * // Update one Post_category
     * const post_category = await prisma.post_category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends post_categoryUpdateArgs>(args: SelectSubset<T, post_categoryUpdateArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Post_categories.
     * @param {post_categoryDeleteManyArgs} args - Arguments to filter Post_categories to delete.
     * @example
     * // Delete a few Post_categories
     * const { count } = await prisma.post_category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends post_categoryDeleteManyArgs>(args?: SelectSubset<T, post_categoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Post_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_categoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Post_categories
     * const post_category = await prisma.post_category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends post_categoryUpdateManyArgs>(args: SelectSubset<T, post_categoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Post_categories and returns the data updated in the database.
     * @param {post_categoryUpdateManyAndReturnArgs} args - Arguments to update many Post_categories.
     * @example
     * // Update many Post_categories
     * const post_category = await prisma.post_category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Post_categories and only return the `post_id`
     * const post_categoryWithPost_idOnly = await prisma.post_category.updateManyAndReturn({
     *   select: { post_id: true },
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
    updateManyAndReturn<T extends post_categoryUpdateManyAndReturnArgs>(args: SelectSubset<T, post_categoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post_category.
     * @param {post_categoryUpsertArgs} args - Arguments to update or create a Post_category.
     * @example
     * // Update or create a Post_category
     * const post_category = await prisma.post_category.upsert({
     *   create: {
     *     // ... data to create a Post_category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post_category we want to update
     *   }
     * })
     */
    upsert<T extends post_categoryUpsertArgs>(args: SelectSubset<T, post_categoryUpsertArgs<ExtArgs>>): Prisma__post_categoryClient<$Result.GetResult<Prisma.$post_categoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Post_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_categoryCountArgs} args - Arguments to filter Post_categories to count.
     * @example
     * // Count the number of Post_categories
     * const count = await prisma.post_category.count({
     *   where: {
     *     // ... the filter for the Post_categories we want to count
     *   }
     * })
    **/
    count<T extends post_categoryCountArgs>(
      args?: Subset<T, post_categoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Post_categoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post_category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Post_categoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Post_categoryAggregateArgs>(args: Subset<T, Post_categoryAggregateArgs>): Prisma.PrismaPromise<GetPost_categoryAggregateType<T>>

    /**
     * Group by Post_category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_categoryGroupByArgs} args - Group by arguments.
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
      T extends post_categoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: post_categoryGroupByArgs['orderBy'] }
        : { orderBy?: post_categoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, post_categoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPost_categoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the post_category model
   */
  readonly fields: post_categoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for post_category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__post_categoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends categoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, categoryDefaultArgs<ExtArgs>>): Prisma__categoryClient<$Result.GetResult<Prisma.$categoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the post_category model
   */
  interface post_categoryFieldRefs {
    readonly post_id: FieldRef<"post_category", 'String'>
    readonly category_id: FieldRef<"post_category", 'String'>
  }
    

  // Custom InputTypes
  /**
   * post_category findUnique
   */
  export type post_categoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * Filter, which post_category to fetch.
     */
    where: post_categoryWhereUniqueInput
  }

  /**
   * post_category findUniqueOrThrow
   */
  export type post_categoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * Filter, which post_category to fetch.
     */
    where: post_categoryWhereUniqueInput
  }

  /**
   * post_category findFirst
   */
  export type post_categoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * Filter, which post_category to fetch.
     */
    where?: post_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_categories to fetch.
     */
    orderBy?: post_categoryOrderByWithRelationInput | post_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for post_categories.
     */
    cursor?: post_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of post_categories.
     */
    distinct?: Post_categoryScalarFieldEnum | Post_categoryScalarFieldEnum[]
  }

  /**
   * post_category findFirstOrThrow
   */
  export type post_categoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * Filter, which post_category to fetch.
     */
    where?: post_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_categories to fetch.
     */
    orderBy?: post_categoryOrderByWithRelationInput | post_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for post_categories.
     */
    cursor?: post_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of post_categories.
     */
    distinct?: Post_categoryScalarFieldEnum | Post_categoryScalarFieldEnum[]
  }

  /**
   * post_category findMany
   */
  export type post_categoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * Filter, which post_categories to fetch.
     */
    where?: post_categoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_categories to fetch.
     */
    orderBy?: post_categoryOrderByWithRelationInput | post_categoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing post_categories.
     */
    cursor?: post_categoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_categories.
     */
    skip?: number
    distinct?: Post_categoryScalarFieldEnum | Post_categoryScalarFieldEnum[]
  }

  /**
   * post_category create
   */
  export type post_categoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * The data needed to create a post_category.
     */
    data: XOR<post_categoryCreateInput, post_categoryUncheckedCreateInput>
  }

  /**
   * post_category createMany
   */
  export type post_categoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many post_categories.
     */
    data: post_categoryCreateManyInput | post_categoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * post_category createManyAndReturn
   */
  export type post_categoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * The data used to create many post_categories.
     */
    data: post_categoryCreateManyInput | post_categoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * post_category update
   */
  export type post_categoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * The data needed to update a post_category.
     */
    data: XOR<post_categoryUpdateInput, post_categoryUncheckedUpdateInput>
    /**
     * Choose, which post_category to update.
     */
    where: post_categoryWhereUniqueInput
  }

  /**
   * post_category updateMany
   */
  export type post_categoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update post_categories.
     */
    data: XOR<post_categoryUpdateManyMutationInput, post_categoryUncheckedUpdateManyInput>
    /**
     * Filter which post_categories to update
     */
    where?: post_categoryWhereInput
    /**
     * Limit how many post_categories to update.
     */
    limit?: number
  }

  /**
   * post_category updateManyAndReturn
   */
  export type post_categoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * The data used to update post_categories.
     */
    data: XOR<post_categoryUpdateManyMutationInput, post_categoryUncheckedUpdateManyInput>
    /**
     * Filter which post_categories to update
     */
    where?: post_categoryWhereInput
    /**
     * Limit how many post_categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * post_category upsert
   */
  export type post_categoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * The filter to search for the post_category to update in case it exists.
     */
    where: post_categoryWhereUniqueInput
    /**
     * In case the post_category found by the `where` argument doesn't exist, create a new post_category with this data.
     */
    create: XOR<post_categoryCreateInput, post_categoryUncheckedCreateInput>
    /**
     * In case the post_category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<post_categoryUpdateInput, post_categoryUncheckedUpdateInput>
  }

  /**
   * post_category delete
   */
  export type post_categoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
    /**
     * Filter which post_category to delete.
     */
    where: post_categoryWhereUniqueInput
  }

  /**
   * post_category deleteMany
   */
  export type post_categoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post_categories to delete
     */
    where?: post_categoryWhereInput
    /**
     * Limit how many post_categories to delete.
     */
    limit?: number
  }

  /**
   * post_category without action
   */
  export type post_categoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_category
     */
    select?: post_categorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_category
     */
    omit?: post_categoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_categoryInclude<ExtArgs> | null
  }


  /**
   * Model tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    created_at: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    created_at: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    created_at: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    created_at?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tag to aggregate.
     */
    where?: tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagOrderByWithRelationInput | tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type tagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tagWhereInput
    orderBy?: tagOrderByWithAggregationInput | tagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: tagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    slug: string
    created_at: Date
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends tagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type tagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
    posts?: boolean | tag$postsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type tagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["tag"]>

  export type tagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["tag"]>

  export type tagSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    created_at?: boolean
  }

  export type tagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "created_at", ExtArgs["result"]["tag"]>
  export type tagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | tag$postsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type tagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type tagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $tagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tag"
    objects: {
      posts: Prisma.$post_tagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      created_at: Date
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type tagGetPayload<S extends boolean | null | undefined | tagDefaultArgs> = $Result.GetResult<Prisma.$tagPayload, S>

  type tagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface tagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tag'], meta: { name: 'tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {tagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tagFindUniqueArgs>(args: SelectSubset<T, tagFindUniqueArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tagFindUniqueOrThrowArgs>(args: SelectSubset<T, tagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tagFindFirstArgs>(args?: SelectSubset<T, tagFindFirstArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tagFindFirstOrThrowArgs>(args?: SelectSubset<T, tagFindFirstOrThrowArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tagFindManyArgs>(args?: SelectSubset<T, tagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {tagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends tagCreateArgs>(args: SelectSubset<T, tagCreateArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {tagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tagCreateManyArgs>(args?: SelectSubset<T, tagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {tagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends tagCreateManyAndReturnArgs>(args?: SelectSubset<T, tagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {tagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends tagDeleteArgs>(args: SelectSubset<T, tagDeleteArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {tagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tagUpdateArgs>(args: SelectSubset<T, tagUpdateArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {tagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tagDeleteManyArgs>(args?: SelectSubset<T, tagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tagUpdateManyArgs>(args: SelectSubset<T, tagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {tagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
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
    updateManyAndReturn<T extends tagUpdateManyAndReturnArgs>(args: SelectSubset<T, tagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {tagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends tagUpsertArgs>(args: SelectSubset<T, tagUpsertArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends tagCountArgs>(
      args?: Subset<T, tagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagGroupByArgs} args - Group by arguments.
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
      T extends tagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tagGroupByArgs['orderBy'] }
        : { orderBy?: tagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, tagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tag model
   */
  readonly fields: tagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends tag$postsArgs<ExtArgs> = {}>(args?: Subset<T, tag$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the tag model
   */
  interface tagFieldRefs {
    readonly id: FieldRef<"tag", 'String'>
    readonly name: FieldRef<"tag", 'String'>
    readonly slug: FieldRef<"tag", 'String'>
    readonly created_at: FieldRef<"tag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tag findUnique
   */
  export type tagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * Filter, which tag to fetch.
     */
    where: tagWhereUniqueInput
  }

  /**
   * tag findUniqueOrThrow
   */
  export type tagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * Filter, which tag to fetch.
     */
    where: tagWhereUniqueInput
  }

  /**
   * tag findFirst
   */
  export type tagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * Filter, which tag to fetch.
     */
    where?: tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagOrderByWithRelationInput | tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * tag findFirstOrThrow
   */
  export type tagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * Filter, which tag to fetch.
     */
    where?: tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagOrderByWithRelationInput | tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * tag findMany
   */
  export type tagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagOrderByWithRelationInput | tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tags.
     */
    cursor?: tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * tag create
   */
  export type tagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * The data needed to create a tag.
     */
    data: XOR<tagCreateInput, tagUncheckedCreateInput>
  }

  /**
   * tag createMany
   */
  export type tagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tags.
     */
    data: tagCreateManyInput | tagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tag createManyAndReturn
   */
  export type tagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * The data used to create many tags.
     */
    data: tagCreateManyInput | tagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tag update
   */
  export type tagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * The data needed to update a tag.
     */
    data: XOR<tagUpdateInput, tagUncheckedUpdateInput>
    /**
     * Choose, which tag to update.
     */
    where: tagWhereUniqueInput
  }

  /**
   * tag updateMany
   */
  export type tagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tags.
     */
    data: XOR<tagUpdateManyMutationInput, tagUncheckedUpdateManyInput>
    /**
     * Filter which tags to update
     */
    where?: tagWhereInput
    /**
     * Limit how many tags to update.
     */
    limit?: number
  }

  /**
   * tag updateManyAndReturn
   */
  export type tagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * The data used to update tags.
     */
    data: XOR<tagUpdateManyMutationInput, tagUncheckedUpdateManyInput>
    /**
     * Filter which tags to update
     */
    where?: tagWhereInput
    /**
     * Limit how many tags to update.
     */
    limit?: number
  }

  /**
   * tag upsert
   */
  export type tagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * The filter to search for the tag to update in case it exists.
     */
    where: tagWhereUniqueInput
    /**
     * In case the tag found by the `where` argument doesn't exist, create a new tag with this data.
     */
    create: XOR<tagCreateInput, tagUncheckedCreateInput>
    /**
     * In case the tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tagUpdateInput, tagUncheckedUpdateInput>
  }

  /**
   * tag delete
   */
  export type tagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
    /**
     * Filter which tag to delete.
     */
    where: tagWhereUniqueInput
  }

  /**
   * tag deleteMany
   */
  export type tagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tags to delete
     */
    where?: tagWhereInput
    /**
     * Limit how many tags to delete.
     */
    limit?: number
  }

  /**
   * tag.posts
   */
  export type tag$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    where?: post_tagWhereInput
    orderBy?: post_tagOrderByWithRelationInput | post_tagOrderByWithRelationInput[]
    cursor?: post_tagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Post_tagScalarFieldEnum | Post_tagScalarFieldEnum[]
  }

  /**
   * tag without action
   */
  export type tagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tag
     */
    select?: tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tag
     */
    omit?: tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagInclude<ExtArgs> | null
  }


  /**
   * Model post_tag
   */

  export type AggregatePost_tag = {
    _count: Post_tagCountAggregateOutputType | null
    _min: Post_tagMinAggregateOutputType | null
    _max: Post_tagMaxAggregateOutputType | null
  }

  export type Post_tagMinAggregateOutputType = {
    post_id: string | null
    tag_id: string | null
  }

  export type Post_tagMaxAggregateOutputType = {
    post_id: string | null
    tag_id: string | null
  }

  export type Post_tagCountAggregateOutputType = {
    post_id: number
    tag_id: number
    _all: number
  }


  export type Post_tagMinAggregateInputType = {
    post_id?: true
    tag_id?: true
  }

  export type Post_tagMaxAggregateInputType = {
    post_id?: true
    tag_id?: true
  }

  export type Post_tagCountAggregateInputType = {
    post_id?: true
    tag_id?: true
    _all?: true
  }

  export type Post_tagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post_tag to aggregate.
     */
    where?: post_tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_tags to fetch.
     */
    orderBy?: post_tagOrderByWithRelationInput | post_tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: post_tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned post_tags
    **/
    _count?: true | Post_tagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Post_tagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Post_tagMaxAggregateInputType
  }

  export type GetPost_tagAggregateType<T extends Post_tagAggregateArgs> = {
        [P in keyof T & keyof AggregatePost_tag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost_tag[P]>
      : GetScalarType<T[P], AggregatePost_tag[P]>
  }




  export type post_tagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: post_tagWhereInput
    orderBy?: post_tagOrderByWithAggregationInput | post_tagOrderByWithAggregationInput[]
    by: Post_tagScalarFieldEnum[] | Post_tagScalarFieldEnum
    having?: post_tagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Post_tagCountAggregateInputType | true
    _min?: Post_tagMinAggregateInputType
    _max?: Post_tagMaxAggregateInputType
  }

  export type Post_tagGroupByOutputType = {
    post_id: string
    tag_id: string
    _count: Post_tagCountAggregateOutputType | null
    _min: Post_tagMinAggregateOutputType | null
    _max: Post_tagMaxAggregateOutputType | null
  }

  type GetPost_tagGroupByPayload<T extends post_tagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Post_tagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Post_tagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Post_tagGroupByOutputType[P]>
            : GetScalarType<T[P], Post_tagGroupByOutputType[P]>
        }
      >
    >


  export type post_tagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    tag_id?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    tag?: boolean | tagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post_tag"]>

  export type post_tagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    tag_id?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    tag?: boolean | tagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post_tag"]>

  export type post_tagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    post_id?: boolean
    tag_id?: boolean
    post?: boolean | postDefaultArgs<ExtArgs>
    tag?: boolean | tagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post_tag"]>

  export type post_tagSelectScalar = {
    post_id?: boolean
    tag_id?: boolean
  }

  export type post_tagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"post_id" | "tag_id", ExtArgs["result"]["post_tag"]>
  export type post_tagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    tag?: boolean | tagDefaultArgs<ExtArgs>
  }
  export type post_tagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    tag?: boolean | tagDefaultArgs<ExtArgs>
  }
  export type post_tagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | postDefaultArgs<ExtArgs>
    tag?: boolean | tagDefaultArgs<ExtArgs>
  }

  export type $post_tagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "post_tag"
    objects: {
      post: Prisma.$postPayload<ExtArgs>
      tag: Prisma.$tagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      post_id: string
      tag_id: string
    }, ExtArgs["result"]["post_tag"]>
    composites: {}
  }

  type post_tagGetPayload<S extends boolean | null | undefined | post_tagDefaultArgs> = $Result.GetResult<Prisma.$post_tagPayload, S>

  type post_tagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<post_tagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Post_tagCountAggregateInputType | true
    }

  export interface post_tagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['post_tag'], meta: { name: 'post_tag' } }
    /**
     * Find zero or one Post_tag that matches the filter.
     * @param {post_tagFindUniqueArgs} args - Arguments to find a Post_tag
     * @example
     * // Get one Post_tag
     * const post_tag = await prisma.post_tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends post_tagFindUniqueArgs>(args: SelectSubset<T, post_tagFindUniqueArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post_tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {post_tagFindUniqueOrThrowArgs} args - Arguments to find a Post_tag
     * @example
     * // Get one Post_tag
     * const post_tag = await prisma.post_tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends post_tagFindUniqueOrThrowArgs>(args: SelectSubset<T, post_tagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post_tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_tagFindFirstArgs} args - Arguments to find a Post_tag
     * @example
     * // Get one Post_tag
     * const post_tag = await prisma.post_tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends post_tagFindFirstArgs>(args?: SelectSubset<T, post_tagFindFirstArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post_tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_tagFindFirstOrThrowArgs} args - Arguments to find a Post_tag
     * @example
     * // Get one Post_tag
     * const post_tag = await prisma.post_tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends post_tagFindFirstOrThrowArgs>(args?: SelectSubset<T, post_tagFindFirstOrThrowArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Post_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_tagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Post_tags
     * const post_tags = await prisma.post_tag.findMany()
     * 
     * // Get first 10 Post_tags
     * const post_tags = await prisma.post_tag.findMany({ take: 10 })
     * 
     * // Only select the `post_id`
     * const post_tagWithPost_idOnly = await prisma.post_tag.findMany({ select: { post_id: true } })
     * 
     */
    findMany<T extends post_tagFindManyArgs>(args?: SelectSubset<T, post_tagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post_tag.
     * @param {post_tagCreateArgs} args - Arguments to create a Post_tag.
     * @example
     * // Create one Post_tag
     * const Post_tag = await prisma.post_tag.create({
     *   data: {
     *     // ... data to create a Post_tag
     *   }
     * })
     * 
     */
    create<T extends post_tagCreateArgs>(args: SelectSubset<T, post_tagCreateArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Post_tags.
     * @param {post_tagCreateManyArgs} args - Arguments to create many Post_tags.
     * @example
     * // Create many Post_tags
     * const post_tag = await prisma.post_tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends post_tagCreateManyArgs>(args?: SelectSubset<T, post_tagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Post_tags and returns the data saved in the database.
     * @param {post_tagCreateManyAndReturnArgs} args - Arguments to create many Post_tags.
     * @example
     * // Create many Post_tags
     * const post_tag = await prisma.post_tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Post_tags and only return the `post_id`
     * const post_tagWithPost_idOnly = await prisma.post_tag.createManyAndReturn({
     *   select: { post_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends post_tagCreateManyAndReturnArgs>(args?: SelectSubset<T, post_tagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post_tag.
     * @param {post_tagDeleteArgs} args - Arguments to delete one Post_tag.
     * @example
     * // Delete one Post_tag
     * const Post_tag = await prisma.post_tag.delete({
     *   where: {
     *     // ... filter to delete one Post_tag
     *   }
     * })
     * 
     */
    delete<T extends post_tagDeleteArgs>(args: SelectSubset<T, post_tagDeleteArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post_tag.
     * @param {post_tagUpdateArgs} args - Arguments to update one Post_tag.
     * @example
     * // Update one Post_tag
     * const post_tag = await prisma.post_tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends post_tagUpdateArgs>(args: SelectSubset<T, post_tagUpdateArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Post_tags.
     * @param {post_tagDeleteManyArgs} args - Arguments to filter Post_tags to delete.
     * @example
     * // Delete a few Post_tags
     * const { count } = await prisma.post_tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends post_tagDeleteManyArgs>(args?: SelectSubset<T, post_tagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Post_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_tagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Post_tags
     * const post_tag = await prisma.post_tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends post_tagUpdateManyArgs>(args: SelectSubset<T, post_tagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Post_tags and returns the data updated in the database.
     * @param {post_tagUpdateManyAndReturnArgs} args - Arguments to update many Post_tags.
     * @example
     * // Update many Post_tags
     * const post_tag = await prisma.post_tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Post_tags and only return the `post_id`
     * const post_tagWithPost_idOnly = await prisma.post_tag.updateManyAndReturn({
     *   select: { post_id: true },
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
    updateManyAndReturn<T extends post_tagUpdateManyAndReturnArgs>(args: SelectSubset<T, post_tagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post_tag.
     * @param {post_tagUpsertArgs} args - Arguments to update or create a Post_tag.
     * @example
     * // Update or create a Post_tag
     * const post_tag = await prisma.post_tag.upsert({
     *   create: {
     *     // ... data to create a Post_tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post_tag we want to update
     *   }
     * })
     */
    upsert<T extends post_tagUpsertArgs>(args: SelectSubset<T, post_tagUpsertArgs<ExtArgs>>): Prisma__post_tagClient<$Result.GetResult<Prisma.$post_tagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Post_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_tagCountArgs} args - Arguments to filter Post_tags to count.
     * @example
     * // Count the number of Post_tags
     * const count = await prisma.post_tag.count({
     *   where: {
     *     // ... the filter for the Post_tags we want to count
     *   }
     * })
    **/
    count<T extends post_tagCountArgs>(
      args?: Subset<T, post_tagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Post_tagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post_tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Post_tagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Post_tagAggregateArgs>(args: Subset<T, Post_tagAggregateArgs>): Prisma.PrismaPromise<GetPost_tagAggregateType<T>>

    /**
     * Group by Post_tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {post_tagGroupByArgs} args - Group by arguments.
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
      T extends post_tagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: post_tagGroupByArgs['orderBy'] }
        : { orderBy?: post_tagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, post_tagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPost_tagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the post_tag model
   */
  readonly fields: post_tagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for post_tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__post_tagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends postDefaultArgs<ExtArgs> = {}>(args?: Subset<T, postDefaultArgs<ExtArgs>>): Prisma__postClient<$Result.GetResult<Prisma.$postPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends tagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tagDefaultArgs<ExtArgs>>): Prisma__tagClient<$Result.GetResult<Prisma.$tagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the post_tag model
   */
  interface post_tagFieldRefs {
    readonly post_id: FieldRef<"post_tag", 'String'>
    readonly tag_id: FieldRef<"post_tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * post_tag findUnique
   */
  export type post_tagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * Filter, which post_tag to fetch.
     */
    where: post_tagWhereUniqueInput
  }

  /**
   * post_tag findUniqueOrThrow
   */
  export type post_tagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * Filter, which post_tag to fetch.
     */
    where: post_tagWhereUniqueInput
  }

  /**
   * post_tag findFirst
   */
  export type post_tagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * Filter, which post_tag to fetch.
     */
    where?: post_tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_tags to fetch.
     */
    orderBy?: post_tagOrderByWithRelationInput | post_tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for post_tags.
     */
    cursor?: post_tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of post_tags.
     */
    distinct?: Post_tagScalarFieldEnum | Post_tagScalarFieldEnum[]
  }

  /**
   * post_tag findFirstOrThrow
   */
  export type post_tagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * Filter, which post_tag to fetch.
     */
    where?: post_tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_tags to fetch.
     */
    orderBy?: post_tagOrderByWithRelationInput | post_tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for post_tags.
     */
    cursor?: post_tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of post_tags.
     */
    distinct?: Post_tagScalarFieldEnum | Post_tagScalarFieldEnum[]
  }

  /**
   * post_tag findMany
   */
  export type post_tagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * Filter, which post_tags to fetch.
     */
    where?: post_tagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of post_tags to fetch.
     */
    orderBy?: post_tagOrderByWithRelationInput | post_tagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing post_tags.
     */
    cursor?: post_tagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` post_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` post_tags.
     */
    skip?: number
    distinct?: Post_tagScalarFieldEnum | Post_tagScalarFieldEnum[]
  }

  /**
   * post_tag create
   */
  export type post_tagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * The data needed to create a post_tag.
     */
    data: XOR<post_tagCreateInput, post_tagUncheckedCreateInput>
  }

  /**
   * post_tag createMany
   */
  export type post_tagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many post_tags.
     */
    data: post_tagCreateManyInput | post_tagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * post_tag createManyAndReturn
   */
  export type post_tagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * The data used to create many post_tags.
     */
    data: post_tagCreateManyInput | post_tagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * post_tag update
   */
  export type post_tagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * The data needed to update a post_tag.
     */
    data: XOR<post_tagUpdateInput, post_tagUncheckedUpdateInput>
    /**
     * Choose, which post_tag to update.
     */
    where: post_tagWhereUniqueInput
  }

  /**
   * post_tag updateMany
   */
  export type post_tagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update post_tags.
     */
    data: XOR<post_tagUpdateManyMutationInput, post_tagUncheckedUpdateManyInput>
    /**
     * Filter which post_tags to update
     */
    where?: post_tagWhereInput
    /**
     * Limit how many post_tags to update.
     */
    limit?: number
  }

  /**
   * post_tag updateManyAndReturn
   */
  export type post_tagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * The data used to update post_tags.
     */
    data: XOR<post_tagUpdateManyMutationInput, post_tagUncheckedUpdateManyInput>
    /**
     * Filter which post_tags to update
     */
    where?: post_tagWhereInput
    /**
     * Limit how many post_tags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * post_tag upsert
   */
  export type post_tagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * The filter to search for the post_tag to update in case it exists.
     */
    where: post_tagWhereUniqueInput
    /**
     * In case the post_tag found by the `where` argument doesn't exist, create a new post_tag with this data.
     */
    create: XOR<post_tagCreateInput, post_tagUncheckedCreateInput>
    /**
     * In case the post_tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<post_tagUpdateInput, post_tagUncheckedUpdateInput>
  }

  /**
   * post_tag delete
   */
  export type post_tagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
    /**
     * Filter which post_tag to delete.
     */
    where: post_tagWhereUniqueInput
  }

  /**
   * post_tag deleteMany
   */
  export type post_tagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which post_tags to delete
     */
    where?: post_tagWhereInput
    /**
     * Limit how many post_tags to delete.
     */
    limit?: number
  }

  /**
   * post_tag without action
   */
  export type post_tagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the post_tag
     */
    select?: post_tagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the post_tag
     */
    omit?: post_tagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: post_tagInclude<ExtArgs> | null
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


  export const User_profileScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    bio: 'bio',
    avatar_url: 'avatar_url',
    date_of_birth: 'date_of_birth',
    phone_number: 'phone_number',
    location: 'location',
    website: 'website',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type User_profileScalarFieldEnum = (typeof User_profileScalarFieldEnum)[keyof typeof User_profileScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    content: 'content',
    published: 'published',
    author_id: 'author_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    post_id: 'post_id',
    author_id: 'author_id',
    parent_id: 'parent_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const Post_categoryScalarFieldEnum: {
    post_id: 'post_id',
    category_id: 'category_id'
  };

  export type Post_categoryScalarFieldEnum = (typeof Post_categoryScalarFieldEnum)[keyof typeof Post_categoryScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    created_at: 'created_at'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const Post_tagScalarFieldEnum: {
    post_id: 'post_id',
    tag_id: 'tag_id'
  };

  export type Post_tagScalarFieldEnum = (typeof Post_tagScalarFieldEnum)[keyof typeof Post_tagScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type user_profileWhereInput = {
    AND?: user_profileWhereInput | user_profileWhereInput[]
    OR?: user_profileWhereInput[]
    NOT?: user_profileWhereInput | user_profileWhereInput[]
    id?: StringFilter<"user_profile"> | string
    user_id?: StringFilter<"user_profile"> | string
    bio?: StringNullableFilter<"user_profile"> | string | null
    avatar_url?: StringNullableFilter<"user_profile"> | string | null
    date_of_birth?: DateTimeNullableFilter<"user_profile"> | Date | string | null
    phone_number?: StringNullableFilter<"user_profile"> | string | null
    location?: StringNullableFilter<"user_profile"> | string | null
    website?: StringNullableFilter<"user_profile"> | string | null
    created_at?: DateTimeFilter<"user_profile"> | Date | string
    updated_at?: DateTimeFilter<"user_profile"> | Date | string
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type user_profileOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    posts?: postOrderByRelationAggregateInput
    comments?: commentOrderByRelationAggregateInput
  }

  export type user_profileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    AND?: user_profileWhereInput | user_profileWhereInput[]
    OR?: user_profileWhereInput[]
    NOT?: user_profileWhereInput | user_profileWhereInput[]
    bio?: StringNullableFilter<"user_profile"> | string | null
    avatar_url?: StringNullableFilter<"user_profile"> | string | null
    date_of_birth?: DateTimeNullableFilter<"user_profile"> | Date | string | null
    phone_number?: StringNullableFilter<"user_profile"> | string | null
    location?: StringNullableFilter<"user_profile"> | string | null
    website?: StringNullableFilter<"user_profile"> | string | null
    created_at?: DateTimeFilter<"user_profile"> | Date | string
    updated_at?: DateTimeFilter<"user_profile"> | Date | string
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
  }, "id" | "user_id">

  export type user_profileOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatar_url?: SortOrderInput | SortOrder
    date_of_birth?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: user_profileCountOrderByAggregateInput
    _max?: user_profileMaxOrderByAggregateInput
    _min?: user_profileMinOrderByAggregateInput
  }

  export type user_profileScalarWhereWithAggregatesInput = {
    AND?: user_profileScalarWhereWithAggregatesInput | user_profileScalarWhereWithAggregatesInput[]
    OR?: user_profileScalarWhereWithAggregatesInput[]
    NOT?: user_profileScalarWhereWithAggregatesInput | user_profileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user_profile"> | string
    user_id?: StringWithAggregatesFilter<"user_profile"> | string
    bio?: StringNullableWithAggregatesFilter<"user_profile"> | string | null
    avatar_url?: StringNullableWithAggregatesFilter<"user_profile"> | string | null
    date_of_birth?: DateTimeNullableWithAggregatesFilter<"user_profile"> | Date | string | null
    phone_number?: StringNullableWithAggregatesFilter<"user_profile"> | string | null
    location?: StringNullableWithAggregatesFilter<"user_profile"> | string | null
    website?: StringNullableWithAggregatesFilter<"user_profile"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"user_profile"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"user_profile"> | Date | string
  }

  export type postWhereInput = {
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    id?: StringFilter<"post"> | string
    title?: StringFilter<"post"> | string
    slug?: StringFilter<"post"> | string
    content?: StringFilter<"post"> | string
    published?: BoolFilter<"post"> | boolean
    author_id?: StringFilter<"post"> | string
    created_at?: DateTimeFilter<"post"> | Date | string
    updated_at?: DateTimeFilter<"post"> | Date | string
    author?: XOR<User_profileScalarRelationFilter, user_profileWhereInput>
    comments?: CommentListRelationFilter
    categories?: Post_categoryListRelationFilter
    tags?: Post_tagListRelationFilter
  }

  export type postOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    author?: user_profileOrderByWithRelationInput
    comments?: commentOrderByRelationAggregateInput
    categories?: post_categoryOrderByRelationAggregateInput
    tags?: post_tagOrderByRelationAggregateInput
  }

  export type postWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: postWhereInput | postWhereInput[]
    OR?: postWhereInput[]
    NOT?: postWhereInput | postWhereInput[]
    title?: StringFilter<"post"> | string
    content?: StringFilter<"post"> | string
    published?: BoolFilter<"post"> | boolean
    author_id?: StringFilter<"post"> | string
    created_at?: DateTimeFilter<"post"> | Date | string
    updated_at?: DateTimeFilter<"post"> | Date | string
    author?: XOR<User_profileScalarRelationFilter, user_profileWhereInput>
    comments?: CommentListRelationFilter
    categories?: Post_categoryListRelationFilter
    tags?: Post_tagListRelationFilter
  }, "id" | "slug">

  export type postOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: postCountOrderByAggregateInput
    _max?: postMaxOrderByAggregateInput
    _min?: postMinOrderByAggregateInput
  }

  export type postScalarWhereWithAggregatesInput = {
    AND?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    OR?: postScalarWhereWithAggregatesInput[]
    NOT?: postScalarWhereWithAggregatesInput | postScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"post"> | string
    title?: StringWithAggregatesFilter<"post"> | string
    slug?: StringWithAggregatesFilter<"post"> | string
    content?: StringWithAggregatesFilter<"post"> | string
    published?: BoolWithAggregatesFilter<"post"> | boolean
    author_id?: StringWithAggregatesFilter<"post"> | string
    created_at?: DateTimeWithAggregatesFilter<"post"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"post"> | Date | string
  }

  export type commentWhereInput = {
    AND?: commentWhereInput | commentWhereInput[]
    OR?: commentWhereInput[]
    NOT?: commentWhereInput | commentWhereInput[]
    id?: StringFilter<"comment"> | string
    content?: StringFilter<"comment"> | string
    post_id?: StringFilter<"comment"> | string
    author_id?: StringFilter<"comment"> | string
    parent_id?: StringNullableFilter<"comment"> | string | null
    created_at?: DateTimeFilter<"comment"> | Date | string
    updated_at?: DateTimeFilter<"comment"> | Date | string
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    author?: XOR<User_profileScalarRelationFilter, user_profileWhereInput>
    parent?: XOR<CommentNullableScalarRelationFilter, commentWhereInput> | null
    replies?: CommentListRelationFilter
  }

  export type commentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    post_id?: SortOrder
    author_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    post?: postOrderByWithRelationInput
    author?: user_profileOrderByWithRelationInput
    parent?: commentOrderByWithRelationInput
    replies?: commentOrderByRelationAggregateInput
  }

  export type commentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: commentWhereInput | commentWhereInput[]
    OR?: commentWhereInput[]
    NOT?: commentWhereInput | commentWhereInput[]
    content?: StringFilter<"comment"> | string
    post_id?: StringFilter<"comment"> | string
    author_id?: StringFilter<"comment"> | string
    parent_id?: StringNullableFilter<"comment"> | string | null
    created_at?: DateTimeFilter<"comment"> | Date | string
    updated_at?: DateTimeFilter<"comment"> | Date | string
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    author?: XOR<User_profileScalarRelationFilter, user_profileWhereInput>
    parent?: XOR<CommentNullableScalarRelationFilter, commentWhereInput> | null
    replies?: CommentListRelationFilter
  }, "id">

  export type commentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    post_id?: SortOrder
    author_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: commentCountOrderByAggregateInput
    _max?: commentMaxOrderByAggregateInput
    _min?: commentMinOrderByAggregateInput
  }

  export type commentScalarWhereWithAggregatesInput = {
    AND?: commentScalarWhereWithAggregatesInput | commentScalarWhereWithAggregatesInput[]
    OR?: commentScalarWhereWithAggregatesInput[]
    NOT?: commentScalarWhereWithAggregatesInput | commentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"comment"> | string
    content?: StringWithAggregatesFilter<"comment"> | string
    post_id?: StringWithAggregatesFilter<"comment"> | string
    author_id?: StringWithAggregatesFilter<"comment"> | string
    parent_id?: StringNullableWithAggregatesFilter<"comment"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"comment"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"comment"> | Date | string
  }

  export type categoryWhereInput = {
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    id?: StringFilter<"category"> | string
    name?: StringFilter<"category"> | string
    slug?: StringFilter<"category"> | string
    description?: StringNullableFilter<"category"> | string | null
    created_at?: DateTimeFilter<"category"> | Date | string
    updated_at?: DateTimeFilter<"category"> | Date | string
    posts?: Post_categoryListRelationFilter
  }

  export type categoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    posts?: post_categoryOrderByRelationAggregateInput
  }

  export type categoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: categoryWhereInput | categoryWhereInput[]
    OR?: categoryWhereInput[]
    NOT?: categoryWhereInput | categoryWhereInput[]
    description?: StringNullableFilter<"category"> | string | null
    created_at?: DateTimeFilter<"category"> | Date | string
    updated_at?: DateTimeFilter<"category"> | Date | string
    posts?: Post_categoryListRelationFilter
  }, "id" | "name" | "slug">

  export type categoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: categoryCountOrderByAggregateInput
    _max?: categoryMaxOrderByAggregateInput
    _min?: categoryMinOrderByAggregateInput
  }

  export type categoryScalarWhereWithAggregatesInput = {
    AND?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    OR?: categoryScalarWhereWithAggregatesInput[]
    NOT?: categoryScalarWhereWithAggregatesInput | categoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"category"> | string
    name?: StringWithAggregatesFilter<"category"> | string
    slug?: StringWithAggregatesFilter<"category"> | string
    description?: StringNullableWithAggregatesFilter<"category"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"category"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"category"> | Date | string
  }

  export type post_categoryWhereInput = {
    AND?: post_categoryWhereInput | post_categoryWhereInput[]
    OR?: post_categoryWhereInput[]
    NOT?: post_categoryWhereInput | post_categoryWhereInput[]
    post_id?: StringFilter<"post_category"> | string
    category_id?: StringFilter<"post_category"> | string
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
  }

  export type post_categoryOrderByWithRelationInput = {
    post_id?: SortOrder
    category_id?: SortOrder
    post?: postOrderByWithRelationInput
    category?: categoryOrderByWithRelationInput
  }

  export type post_categoryWhereUniqueInput = Prisma.AtLeast<{
    post_id_category_id?: post_categoryPost_idCategory_idCompoundUniqueInput
    AND?: post_categoryWhereInput | post_categoryWhereInput[]
    OR?: post_categoryWhereInput[]
    NOT?: post_categoryWhereInput | post_categoryWhereInput[]
    post_id?: StringFilter<"post_category"> | string
    category_id?: StringFilter<"post_category"> | string
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    category?: XOR<CategoryScalarRelationFilter, categoryWhereInput>
  }, "post_id_category_id">

  export type post_categoryOrderByWithAggregationInput = {
    post_id?: SortOrder
    category_id?: SortOrder
    _count?: post_categoryCountOrderByAggregateInput
    _max?: post_categoryMaxOrderByAggregateInput
    _min?: post_categoryMinOrderByAggregateInput
  }

  export type post_categoryScalarWhereWithAggregatesInput = {
    AND?: post_categoryScalarWhereWithAggregatesInput | post_categoryScalarWhereWithAggregatesInput[]
    OR?: post_categoryScalarWhereWithAggregatesInput[]
    NOT?: post_categoryScalarWhereWithAggregatesInput | post_categoryScalarWhereWithAggregatesInput[]
    post_id?: StringWithAggregatesFilter<"post_category"> | string
    category_id?: StringWithAggregatesFilter<"post_category"> | string
  }

  export type tagWhereInput = {
    AND?: tagWhereInput | tagWhereInput[]
    OR?: tagWhereInput[]
    NOT?: tagWhereInput | tagWhereInput[]
    id?: StringFilter<"tag"> | string
    name?: StringFilter<"tag"> | string
    slug?: StringFilter<"tag"> | string
    created_at?: DateTimeFilter<"tag"> | Date | string
    posts?: Post_tagListRelationFilter
  }

  export type tagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    posts?: post_tagOrderByRelationAggregateInput
  }

  export type tagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    slug?: string
    AND?: tagWhereInput | tagWhereInput[]
    OR?: tagWhereInput[]
    NOT?: tagWhereInput | tagWhereInput[]
    created_at?: DateTimeFilter<"tag"> | Date | string
    posts?: Post_tagListRelationFilter
  }, "id" | "name" | "slug">

  export type tagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
    _count?: tagCountOrderByAggregateInput
    _max?: tagMaxOrderByAggregateInput
    _min?: tagMinOrderByAggregateInput
  }

  export type tagScalarWhereWithAggregatesInput = {
    AND?: tagScalarWhereWithAggregatesInput | tagScalarWhereWithAggregatesInput[]
    OR?: tagScalarWhereWithAggregatesInput[]
    NOT?: tagScalarWhereWithAggregatesInput | tagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tag"> | string
    name?: StringWithAggregatesFilter<"tag"> | string
    slug?: StringWithAggregatesFilter<"tag"> | string
    created_at?: DateTimeWithAggregatesFilter<"tag"> | Date | string
  }

  export type post_tagWhereInput = {
    AND?: post_tagWhereInput | post_tagWhereInput[]
    OR?: post_tagWhereInput[]
    NOT?: post_tagWhereInput | post_tagWhereInput[]
    post_id?: StringFilter<"post_tag"> | string
    tag_id?: StringFilter<"post_tag"> | string
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    tag?: XOR<TagScalarRelationFilter, tagWhereInput>
  }

  export type post_tagOrderByWithRelationInput = {
    post_id?: SortOrder
    tag_id?: SortOrder
    post?: postOrderByWithRelationInput
    tag?: tagOrderByWithRelationInput
  }

  export type post_tagWhereUniqueInput = Prisma.AtLeast<{
    post_id_tag_id?: post_tagPost_idTag_idCompoundUniqueInput
    AND?: post_tagWhereInput | post_tagWhereInput[]
    OR?: post_tagWhereInput[]
    NOT?: post_tagWhereInput | post_tagWhereInput[]
    post_id?: StringFilter<"post_tag"> | string
    tag_id?: StringFilter<"post_tag"> | string
    post?: XOR<PostScalarRelationFilter, postWhereInput>
    tag?: XOR<TagScalarRelationFilter, tagWhereInput>
  }, "post_id_tag_id">

  export type post_tagOrderByWithAggregationInput = {
    post_id?: SortOrder
    tag_id?: SortOrder
    _count?: post_tagCountOrderByAggregateInput
    _max?: post_tagMaxOrderByAggregateInput
    _min?: post_tagMinOrderByAggregateInput
  }

  export type post_tagScalarWhereWithAggregatesInput = {
    AND?: post_tagScalarWhereWithAggregatesInput | post_tagScalarWhereWithAggregatesInput[]
    OR?: post_tagScalarWhereWithAggregatesInput[]
    NOT?: post_tagScalarWhereWithAggregatesInput | post_tagScalarWhereWithAggregatesInput[]
    post_id?: StringWithAggregatesFilter<"post_tag"> | string
    tag_id?: StringWithAggregatesFilter<"post_tag"> | string
  }

  export type user_profileCreateInput = {
    id?: string
    user_id: string
    bio?: string | null
    avatar_url?: string | null
    date_of_birth?: Date | string | null
    phone_number?: string | null
    location?: string | null
    website?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    posts?: postCreateNestedManyWithoutAuthorInput
    comments?: commentCreateNestedManyWithoutAuthorInput
  }

  export type user_profileUncheckedCreateInput = {
    id?: string
    user_id: string
    bio?: string | null
    avatar_url?: string | null
    date_of_birth?: Date | string | null
    phone_number?: string | null
    location?: string | null
    website?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    posts?: postUncheckedCreateNestedManyWithoutAuthorInput
    comments?: commentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type user_profileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: postUpdateManyWithoutAuthorNestedInput
    comments?: commentUpdateManyWithoutAuthorNestedInput
  }

  export type user_profileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: postUncheckedUpdateManyWithoutAuthorNestedInput
    comments?: commentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type user_profileCreateManyInput = {
    id?: string
    user_id: string
    bio?: string | null
    avatar_url?: string | null
    date_of_birth?: Date | string | null
    phone_number?: string | null
    location?: string | null
    website?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type user_profileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_profileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postCreateInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    author: user_profileCreateNestedOneWithoutPostsInput
    comments?: commentCreateNestedManyWithoutPostInput
    categories?: post_categoryCreateNestedManyWithoutPostInput
    tags?: post_tagCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    author_id: string
    created_at?: Date | string
    updated_at?: Date | string
    comments?: commentUncheckedCreateNestedManyWithoutPostInput
    categories?: post_categoryUncheckedCreateNestedManyWithoutPostInput
    tags?: post_tagUncheckedCreateNestedManyWithoutPostInput
  }

  export type postUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: user_profileUpdateOneRequiredWithoutPostsNestedInput
    comments?: commentUpdateManyWithoutPostNestedInput
    categories?: post_categoryUpdateManyWithoutPostNestedInput
    tags?: post_tagUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: commentUncheckedUpdateManyWithoutPostNestedInput
    categories?: post_categoryUncheckedUpdateManyWithoutPostNestedInput
    tags?: post_tagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type postCreateManyInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    author_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type postUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentCreateInput = {
    id?: string
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: postCreateNestedOneWithoutCommentsInput
    author: user_profileCreateNestedOneWithoutCommentsInput
    parent?: commentCreateNestedOneWithoutRepliesInput
    replies?: commentCreateNestedManyWithoutParentInput
  }

  export type commentUncheckedCreateInput = {
    id?: string
    content: string
    post_id: string
    author_id: string
    parent_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    replies?: commentUncheckedCreateNestedManyWithoutParentInput
  }

  export type commentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutCommentsNestedInput
    author?: user_profileUpdateOneRequiredWithoutCommentsNestedInput
    parent?: commentUpdateOneWithoutRepliesNestedInput
    replies?: commentUpdateManyWithoutParentNestedInput
  }

  export type commentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    post_id?: StringFieldUpdateOperationsInput | string
    author_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: commentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type commentCreateManyInput = {
    id?: string
    content: string
    post_id: string
    author_id: string
    parent_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type commentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    post_id?: StringFieldUpdateOperationsInput | string
    author_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    posts?: post_categoryCreateNestedManyWithoutCategoryInput
  }

  export type categoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    posts?: post_categoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type categoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: post_categoryUpdateManyWithoutCategoryNestedInput
  }

  export type categoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: post_categoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type categoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type categoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type post_categoryCreateInput = {
    post: postCreateNestedOneWithoutCategoriesInput
    category: categoryCreateNestedOneWithoutPostsInput
  }

  export type post_categoryUncheckedCreateInput = {
    post_id: string
    category_id: string
  }

  export type post_categoryUpdateInput = {
    post?: postUpdateOneRequiredWithoutCategoriesNestedInput
    category?: categoryUpdateOneRequiredWithoutPostsNestedInput
  }

  export type post_categoryUncheckedUpdateInput = {
    post_id?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_categoryCreateManyInput = {
    post_id: string
    category_id: string
  }

  export type post_categoryUpdateManyMutationInput = {

  }

  export type post_categoryUncheckedUpdateManyInput = {
    post_id?: StringFieldUpdateOperationsInput | string
    category_id?: StringFieldUpdateOperationsInput | string
  }

  export type tagCreateInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    posts?: post_tagCreateNestedManyWithoutTagInput
  }

  export type tagUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
    posts?: post_tagUncheckedCreateNestedManyWithoutTagInput
  }

  export type tagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: post_tagUpdateManyWithoutTagNestedInput
  }

  export type tagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: post_tagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type tagCreateManyInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
  }

  export type tagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type post_tagCreateInput = {
    post: postCreateNestedOneWithoutTagsInput
    tag: tagCreateNestedOneWithoutPostsInput
  }

  export type post_tagUncheckedCreateInput = {
    post_id: string
    tag_id: string
  }

  export type post_tagUpdateInput = {
    post?: postUpdateOneRequiredWithoutTagsNestedInput
    tag?: tagUpdateOneRequiredWithoutPostsNestedInput
  }

  export type post_tagUncheckedUpdateInput = {
    post_id?: StringFieldUpdateOperationsInput | string
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_tagCreateManyInput = {
    post_id: string
    tag_id: string
  }

  export type post_tagUpdateManyMutationInput = {

  }

  export type post_tagUncheckedUpdateManyInput = {
    post_id?: StringFieldUpdateOperationsInput | string
    tag_id?: StringFieldUpdateOperationsInput | string
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

  export type PostListRelationFilter = {
    every?: postWhereInput
    some?: postWhereInput
    none?: postWhereInput
  }

  export type CommentListRelationFilter = {
    every?: commentWhereInput
    some?: commentWhereInput
    none?: commentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type postOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type commentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_profileCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    bio?: SortOrder
    avatar_url?: SortOrder
    date_of_birth?: SortOrder
    phone_number?: SortOrder
    location?: SortOrder
    website?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_profileMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    bio?: SortOrder
    avatar_url?: SortOrder
    date_of_birth?: SortOrder
    phone_number?: SortOrder
    location?: SortOrder
    website?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type user_profileMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    bio?: SortOrder
    avatar_url?: SortOrder
    date_of_birth?: SortOrder
    phone_number?: SortOrder
    location?: SortOrder
    website?: SortOrder
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type User_profileScalarRelationFilter = {
    is?: user_profileWhereInput
    isNot?: user_profileWhereInput
  }

  export type Post_categoryListRelationFilter = {
    every?: post_categoryWhereInput
    some?: post_categoryWhereInput
    none?: post_categoryWhereInput
  }

  export type Post_tagListRelationFilter = {
    every?: post_tagWhereInput
    some?: post_tagWhereInput
    none?: post_tagWhereInput
  }

  export type post_categoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type post_tagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type postCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type postMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type postMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
    author_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PostScalarRelationFilter = {
    is?: postWhereInput
    isNot?: postWhereInput
  }

  export type CommentNullableScalarRelationFilter = {
    is?: commentWhereInput | null
    isNot?: commentWhereInput | null
  }

  export type commentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    post_id?: SortOrder
    author_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type commentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    post_id?: SortOrder
    author_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type commentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    post_id?: SortOrder
    author_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type categoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type categoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type categoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type CategoryScalarRelationFilter = {
    is?: categoryWhereInput
    isNot?: categoryWhereInput
  }

  export type post_categoryPost_idCategory_idCompoundUniqueInput = {
    post_id: string
    category_id: string
  }

  export type post_categoryCountOrderByAggregateInput = {
    post_id?: SortOrder
    category_id?: SortOrder
  }

  export type post_categoryMaxOrderByAggregateInput = {
    post_id?: SortOrder
    category_id?: SortOrder
  }

  export type post_categoryMinOrderByAggregateInput = {
    post_id?: SortOrder
    category_id?: SortOrder
  }

  export type tagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
  }

  export type tagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
  }

  export type tagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    created_at?: SortOrder
  }

  export type TagScalarRelationFilter = {
    is?: tagWhereInput
    isNot?: tagWhereInput
  }

  export type post_tagPost_idTag_idCompoundUniqueInput = {
    post_id: string
    tag_id: string
  }

  export type post_tagCountOrderByAggregateInput = {
    post_id?: SortOrder
    tag_id?: SortOrder
  }

  export type post_tagMaxOrderByAggregateInput = {
    post_id?: SortOrder
    tag_id?: SortOrder
  }

  export type post_tagMinOrderByAggregateInput = {
    post_id?: SortOrder
    tag_id?: SortOrder
  }

  export type postCreateNestedManyWithoutAuthorInput = {
    create?: XOR<postCreateWithoutAuthorInput, postUncheckedCreateWithoutAuthorInput> | postCreateWithoutAuthorInput[] | postUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: postCreateOrConnectWithoutAuthorInput | postCreateOrConnectWithoutAuthorInput[]
    createMany?: postCreateManyAuthorInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type commentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<commentCreateWithoutAuthorInput, commentUncheckedCreateWithoutAuthorInput> | commentCreateWithoutAuthorInput[] | commentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: commentCreateOrConnectWithoutAuthorInput | commentCreateOrConnectWithoutAuthorInput[]
    createMany?: commentCreateManyAuthorInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type postUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<postCreateWithoutAuthorInput, postUncheckedCreateWithoutAuthorInput> | postCreateWithoutAuthorInput[] | postUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: postCreateOrConnectWithoutAuthorInput | postCreateOrConnectWithoutAuthorInput[]
    createMany?: postCreateManyAuthorInputEnvelope
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
  }

  export type commentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<commentCreateWithoutAuthorInput, commentUncheckedCreateWithoutAuthorInput> | commentCreateWithoutAuthorInput[] | commentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: commentCreateOrConnectWithoutAuthorInput | commentCreateOrConnectWithoutAuthorInput[]
    createMany?: commentCreateManyAuthorInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type postUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<postCreateWithoutAuthorInput, postUncheckedCreateWithoutAuthorInput> | postCreateWithoutAuthorInput[] | postUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: postCreateOrConnectWithoutAuthorInput | postCreateOrConnectWithoutAuthorInput[]
    upsert?: postUpsertWithWhereUniqueWithoutAuthorInput | postUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: postCreateManyAuthorInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutAuthorInput | postUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: postUpdateManyWithWhereWithoutAuthorInput | postUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type commentUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<commentCreateWithoutAuthorInput, commentUncheckedCreateWithoutAuthorInput> | commentCreateWithoutAuthorInput[] | commentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: commentCreateOrConnectWithoutAuthorInput | commentCreateOrConnectWithoutAuthorInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutAuthorInput | commentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: commentCreateManyAuthorInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutAuthorInput | commentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: commentUpdateManyWithWhereWithoutAuthorInput | commentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type postUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<postCreateWithoutAuthorInput, postUncheckedCreateWithoutAuthorInput> | postCreateWithoutAuthorInput[] | postUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: postCreateOrConnectWithoutAuthorInput | postCreateOrConnectWithoutAuthorInput[]
    upsert?: postUpsertWithWhereUniqueWithoutAuthorInput | postUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: postCreateManyAuthorInputEnvelope
    set?: postWhereUniqueInput | postWhereUniqueInput[]
    disconnect?: postWhereUniqueInput | postWhereUniqueInput[]
    delete?: postWhereUniqueInput | postWhereUniqueInput[]
    connect?: postWhereUniqueInput | postWhereUniqueInput[]
    update?: postUpdateWithWhereUniqueWithoutAuthorInput | postUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: postUpdateManyWithWhereWithoutAuthorInput | postUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: postScalarWhereInput | postScalarWhereInput[]
  }

  export type commentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<commentCreateWithoutAuthorInput, commentUncheckedCreateWithoutAuthorInput> | commentCreateWithoutAuthorInput[] | commentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: commentCreateOrConnectWithoutAuthorInput | commentCreateOrConnectWithoutAuthorInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutAuthorInput | commentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: commentCreateManyAuthorInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutAuthorInput | commentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: commentUpdateManyWithWhereWithoutAuthorInput | commentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type user_profileCreateNestedOneWithoutPostsInput = {
    create?: XOR<user_profileCreateWithoutPostsInput, user_profileUncheckedCreateWithoutPostsInput>
    connectOrCreate?: user_profileCreateOrConnectWithoutPostsInput
    connect?: user_profileWhereUniqueInput
  }

  export type commentCreateNestedManyWithoutPostInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type post_categoryCreateNestedManyWithoutPostInput = {
    create?: XOR<post_categoryCreateWithoutPostInput, post_categoryUncheckedCreateWithoutPostInput> | post_categoryCreateWithoutPostInput[] | post_categoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutPostInput | post_categoryCreateOrConnectWithoutPostInput[]
    createMany?: post_categoryCreateManyPostInputEnvelope
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
  }

  export type post_tagCreateNestedManyWithoutPostInput = {
    create?: XOR<post_tagCreateWithoutPostInput, post_tagUncheckedCreateWithoutPostInput> | post_tagCreateWithoutPostInput[] | post_tagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutPostInput | post_tagCreateOrConnectWithoutPostInput[]
    createMany?: post_tagCreateManyPostInputEnvelope
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
  }

  export type commentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type post_categoryUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<post_categoryCreateWithoutPostInput, post_categoryUncheckedCreateWithoutPostInput> | post_categoryCreateWithoutPostInput[] | post_categoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutPostInput | post_categoryCreateOrConnectWithoutPostInput[]
    createMany?: post_categoryCreateManyPostInputEnvelope
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
  }

  export type post_tagUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<post_tagCreateWithoutPostInput, post_tagUncheckedCreateWithoutPostInput> | post_tagCreateWithoutPostInput[] | post_tagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutPostInput | post_tagCreateOrConnectWithoutPostInput[]
    createMany?: post_tagCreateManyPostInputEnvelope
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type user_profileUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<user_profileCreateWithoutPostsInput, user_profileUncheckedCreateWithoutPostsInput>
    connectOrCreate?: user_profileCreateOrConnectWithoutPostsInput
    upsert?: user_profileUpsertWithoutPostsInput
    connect?: user_profileWhereUniqueInput
    update?: XOR<XOR<user_profileUpdateToOneWithWhereWithoutPostsInput, user_profileUpdateWithoutPostsInput>, user_profileUncheckedUpdateWithoutPostsInput>
  }

  export type commentUpdateManyWithoutPostNestedInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutPostInput | commentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutPostInput | commentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: commentUpdateManyWithWhereWithoutPostInput | commentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type post_categoryUpdateManyWithoutPostNestedInput = {
    create?: XOR<post_categoryCreateWithoutPostInput, post_categoryUncheckedCreateWithoutPostInput> | post_categoryCreateWithoutPostInput[] | post_categoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutPostInput | post_categoryCreateOrConnectWithoutPostInput[]
    upsert?: post_categoryUpsertWithWhereUniqueWithoutPostInput | post_categoryUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: post_categoryCreateManyPostInputEnvelope
    set?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    disconnect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    delete?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    update?: post_categoryUpdateWithWhereUniqueWithoutPostInput | post_categoryUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: post_categoryUpdateManyWithWhereWithoutPostInput | post_categoryUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: post_categoryScalarWhereInput | post_categoryScalarWhereInput[]
  }

  export type post_tagUpdateManyWithoutPostNestedInput = {
    create?: XOR<post_tagCreateWithoutPostInput, post_tagUncheckedCreateWithoutPostInput> | post_tagCreateWithoutPostInput[] | post_tagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutPostInput | post_tagCreateOrConnectWithoutPostInput[]
    upsert?: post_tagUpsertWithWhereUniqueWithoutPostInput | post_tagUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: post_tagCreateManyPostInputEnvelope
    set?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    disconnect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    delete?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    update?: post_tagUpdateWithWhereUniqueWithoutPostInput | post_tagUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: post_tagUpdateManyWithWhereWithoutPostInput | post_tagUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: post_tagScalarWhereInput | post_tagScalarWhereInput[]
  }

  export type commentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput> | commentCreateWithoutPostInput[] | commentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: commentCreateOrConnectWithoutPostInput | commentCreateOrConnectWithoutPostInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutPostInput | commentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: commentCreateManyPostInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutPostInput | commentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: commentUpdateManyWithWhereWithoutPostInput | commentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type post_categoryUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<post_categoryCreateWithoutPostInput, post_categoryUncheckedCreateWithoutPostInput> | post_categoryCreateWithoutPostInput[] | post_categoryUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutPostInput | post_categoryCreateOrConnectWithoutPostInput[]
    upsert?: post_categoryUpsertWithWhereUniqueWithoutPostInput | post_categoryUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: post_categoryCreateManyPostInputEnvelope
    set?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    disconnect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    delete?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    update?: post_categoryUpdateWithWhereUniqueWithoutPostInput | post_categoryUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: post_categoryUpdateManyWithWhereWithoutPostInput | post_categoryUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: post_categoryScalarWhereInput | post_categoryScalarWhereInput[]
  }

  export type post_tagUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<post_tagCreateWithoutPostInput, post_tagUncheckedCreateWithoutPostInput> | post_tagCreateWithoutPostInput[] | post_tagUncheckedCreateWithoutPostInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutPostInput | post_tagCreateOrConnectWithoutPostInput[]
    upsert?: post_tagUpsertWithWhereUniqueWithoutPostInput | post_tagUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: post_tagCreateManyPostInputEnvelope
    set?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    disconnect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    delete?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    update?: post_tagUpdateWithWhereUniqueWithoutPostInput | post_tagUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: post_tagUpdateManyWithWhereWithoutPostInput | post_tagUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: post_tagScalarWhereInput | post_tagScalarWhereInput[]
  }

  export type postCreateNestedOneWithoutCommentsInput = {
    create?: XOR<postCreateWithoutCommentsInput, postUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: postCreateOrConnectWithoutCommentsInput
    connect?: postWhereUniqueInput
  }

  export type user_profileCreateNestedOneWithoutCommentsInput = {
    create?: XOR<user_profileCreateWithoutCommentsInput, user_profileUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: user_profileCreateOrConnectWithoutCommentsInput
    connect?: user_profileWhereUniqueInput
  }

  export type commentCreateNestedOneWithoutRepliesInput = {
    create?: XOR<commentCreateWithoutRepliesInput, commentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: commentCreateOrConnectWithoutRepliesInput
    connect?: commentWhereUniqueInput
  }

  export type commentCreateNestedManyWithoutParentInput = {
    create?: XOR<commentCreateWithoutParentInput, commentUncheckedCreateWithoutParentInput> | commentCreateWithoutParentInput[] | commentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: commentCreateOrConnectWithoutParentInput | commentCreateOrConnectWithoutParentInput[]
    createMany?: commentCreateManyParentInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type commentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<commentCreateWithoutParentInput, commentUncheckedCreateWithoutParentInput> | commentCreateWithoutParentInput[] | commentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: commentCreateOrConnectWithoutParentInput | commentCreateOrConnectWithoutParentInput[]
    createMany?: commentCreateManyParentInputEnvelope
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
  }

  export type postUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<postCreateWithoutCommentsInput, postUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: postCreateOrConnectWithoutCommentsInput
    upsert?: postUpsertWithoutCommentsInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutCommentsInput, postUpdateWithoutCommentsInput>, postUncheckedUpdateWithoutCommentsInput>
  }

  export type user_profileUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<user_profileCreateWithoutCommentsInput, user_profileUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: user_profileCreateOrConnectWithoutCommentsInput
    upsert?: user_profileUpsertWithoutCommentsInput
    connect?: user_profileWhereUniqueInput
    update?: XOR<XOR<user_profileUpdateToOneWithWhereWithoutCommentsInput, user_profileUpdateWithoutCommentsInput>, user_profileUncheckedUpdateWithoutCommentsInput>
  }

  export type commentUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<commentCreateWithoutRepliesInput, commentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: commentCreateOrConnectWithoutRepliesInput
    upsert?: commentUpsertWithoutRepliesInput
    disconnect?: commentWhereInput | boolean
    delete?: commentWhereInput | boolean
    connect?: commentWhereUniqueInput
    update?: XOR<XOR<commentUpdateToOneWithWhereWithoutRepliesInput, commentUpdateWithoutRepliesInput>, commentUncheckedUpdateWithoutRepliesInput>
  }

  export type commentUpdateManyWithoutParentNestedInput = {
    create?: XOR<commentCreateWithoutParentInput, commentUncheckedCreateWithoutParentInput> | commentCreateWithoutParentInput[] | commentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: commentCreateOrConnectWithoutParentInput | commentCreateOrConnectWithoutParentInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutParentInput | commentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: commentCreateManyParentInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutParentInput | commentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: commentUpdateManyWithWhereWithoutParentInput | commentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type commentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<commentCreateWithoutParentInput, commentUncheckedCreateWithoutParentInput> | commentCreateWithoutParentInput[] | commentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: commentCreateOrConnectWithoutParentInput | commentCreateOrConnectWithoutParentInput[]
    upsert?: commentUpsertWithWhereUniqueWithoutParentInput | commentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: commentCreateManyParentInputEnvelope
    set?: commentWhereUniqueInput | commentWhereUniqueInput[]
    disconnect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    delete?: commentWhereUniqueInput | commentWhereUniqueInput[]
    connect?: commentWhereUniqueInput | commentWhereUniqueInput[]
    update?: commentUpdateWithWhereUniqueWithoutParentInput | commentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: commentUpdateManyWithWhereWithoutParentInput | commentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: commentScalarWhereInput | commentScalarWhereInput[]
  }

  export type post_categoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<post_categoryCreateWithoutCategoryInput, post_categoryUncheckedCreateWithoutCategoryInput> | post_categoryCreateWithoutCategoryInput[] | post_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutCategoryInput | post_categoryCreateOrConnectWithoutCategoryInput[]
    createMany?: post_categoryCreateManyCategoryInputEnvelope
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
  }

  export type post_categoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<post_categoryCreateWithoutCategoryInput, post_categoryUncheckedCreateWithoutCategoryInput> | post_categoryCreateWithoutCategoryInput[] | post_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutCategoryInput | post_categoryCreateOrConnectWithoutCategoryInput[]
    createMany?: post_categoryCreateManyCategoryInputEnvelope
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
  }

  export type post_categoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<post_categoryCreateWithoutCategoryInput, post_categoryUncheckedCreateWithoutCategoryInput> | post_categoryCreateWithoutCategoryInput[] | post_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutCategoryInput | post_categoryCreateOrConnectWithoutCategoryInput[]
    upsert?: post_categoryUpsertWithWhereUniqueWithoutCategoryInput | post_categoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: post_categoryCreateManyCategoryInputEnvelope
    set?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    disconnect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    delete?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    update?: post_categoryUpdateWithWhereUniqueWithoutCategoryInput | post_categoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: post_categoryUpdateManyWithWhereWithoutCategoryInput | post_categoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: post_categoryScalarWhereInput | post_categoryScalarWhereInput[]
  }

  export type post_categoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<post_categoryCreateWithoutCategoryInput, post_categoryUncheckedCreateWithoutCategoryInput> | post_categoryCreateWithoutCategoryInput[] | post_categoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: post_categoryCreateOrConnectWithoutCategoryInput | post_categoryCreateOrConnectWithoutCategoryInput[]
    upsert?: post_categoryUpsertWithWhereUniqueWithoutCategoryInput | post_categoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: post_categoryCreateManyCategoryInputEnvelope
    set?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    disconnect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    delete?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    connect?: post_categoryWhereUniqueInput | post_categoryWhereUniqueInput[]
    update?: post_categoryUpdateWithWhereUniqueWithoutCategoryInput | post_categoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: post_categoryUpdateManyWithWhereWithoutCategoryInput | post_categoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: post_categoryScalarWhereInput | post_categoryScalarWhereInput[]
  }

  export type postCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<postCreateWithoutCategoriesInput, postUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: postCreateOrConnectWithoutCategoriesInput
    connect?: postWhereUniqueInput
  }

  export type categoryCreateNestedOneWithoutPostsInput = {
    create?: XOR<categoryCreateWithoutPostsInput, categoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: categoryCreateOrConnectWithoutPostsInput
    connect?: categoryWhereUniqueInput
  }

  export type postUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<postCreateWithoutCategoriesInput, postUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: postCreateOrConnectWithoutCategoriesInput
    upsert?: postUpsertWithoutCategoriesInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutCategoriesInput, postUpdateWithoutCategoriesInput>, postUncheckedUpdateWithoutCategoriesInput>
  }

  export type categoryUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<categoryCreateWithoutPostsInput, categoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: categoryCreateOrConnectWithoutPostsInput
    upsert?: categoryUpsertWithoutPostsInput
    connect?: categoryWhereUniqueInput
    update?: XOR<XOR<categoryUpdateToOneWithWhereWithoutPostsInput, categoryUpdateWithoutPostsInput>, categoryUncheckedUpdateWithoutPostsInput>
  }

  export type post_tagCreateNestedManyWithoutTagInput = {
    create?: XOR<post_tagCreateWithoutTagInput, post_tagUncheckedCreateWithoutTagInput> | post_tagCreateWithoutTagInput[] | post_tagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutTagInput | post_tagCreateOrConnectWithoutTagInput[]
    createMany?: post_tagCreateManyTagInputEnvelope
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
  }

  export type post_tagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<post_tagCreateWithoutTagInput, post_tagUncheckedCreateWithoutTagInput> | post_tagCreateWithoutTagInput[] | post_tagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutTagInput | post_tagCreateOrConnectWithoutTagInput[]
    createMany?: post_tagCreateManyTagInputEnvelope
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
  }

  export type post_tagUpdateManyWithoutTagNestedInput = {
    create?: XOR<post_tagCreateWithoutTagInput, post_tagUncheckedCreateWithoutTagInput> | post_tagCreateWithoutTagInput[] | post_tagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutTagInput | post_tagCreateOrConnectWithoutTagInput[]
    upsert?: post_tagUpsertWithWhereUniqueWithoutTagInput | post_tagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: post_tagCreateManyTagInputEnvelope
    set?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    disconnect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    delete?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    update?: post_tagUpdateWithWhereUniqueWithoutTagInput | post_tagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: post_tagUpdateManyWithWhereWithoutTagInput | post_tagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: post_tagScalarWhereInput | post_tagScalarWhereInput[]
  }

  export type post_tagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<post_tagCreateWithoutTagInput, post_tagUncheckedCreateWithoutTagInput> | post_tagCreateWithoutTagInput[] | post_tagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: post_tagCreateOrConnectWithoutTagInput | post_tagCreateOrConnectWithoutTagInput[]
    upsert?: post_tagUpsertWithWhereUniqueWithoutTagInput | post_tagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: post_tagCreateManyTagInputEnvelope
    set?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    disconnect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    delete?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    connect?: post_tagWhereUniqueInput | post_tagWhereUniqueInput[]
    update?: post_tagUpdateWithWhereUniqueWithoutTagInput | post_tagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: post_tagUpdateManyWithWhereWithoutTagInput | post_tagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: post_tagScalarWhereInput | post_tagScalarWhereInput[]
  }

  export type postCreateNestedOneWithoutTagsInput = {
    create?: XOR<postCreateWithoutTagsInput, postUncheckedCreateWithoutTagsInput>
    connectOrCreate?: postCreateOrConnectWithoutTagsInput
    connect?: postWhereUniqueInput
  }

  export type tagCreateNestedOneWithoutPostsInput = {
    create?: XOR<tagCreateWithoutPostsInput, tagUncheckedCreateWithoutPostsInput>
    connectOrCreate?: tagCreateOrConnectWithoutPostsInput
    connect?: tagWhereUniqueInput
  }

  export type postUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<postCreateWithoutTagsInput, postUncheckedCreateWithoutTagsInput>
    connectOrCreate?: postCreateOrConnectWithoutTagsInput
    upsert?: postUpsertWithoutTagsInput
    connect?: postWhereUniqueInput
    update?: XOR<XOR<postUpdateToOneWithWhereWithoutTagsInput, postUpdateWithoutTagsInput>, postUncheckedUpdateWithoutTagsInput>
  }

  export type tagUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<tagCreateWithoutPostsInput, tagUncheckedCreateWithoutPostsInput>
    connectOrCreate?: tagCreateOrConnectWithoutPostsInput
    upsert?: tagUpsertWithoutPostsInput
    connect?: tagWhereUniqueInput
    update?: XOR<XOR<tagUpdateToOneWithWhereWithoutPostsInput, tagUpdateWithoutPostsInput>, tagUncheckedUpdateWithoutPostsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type postCreateWithoutAuthorInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    comments?: commentCreateNestedManyWithoutPostInput
    categories?: post_categoryCreateNestedManyWithoutPostInput
    tags?: post_tagCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    comments?: commentUncheckedCreateNestedManyWithoutPostInput
    categories?: post_categoryUncheckedCreateNestedManyWithoutPostInput
    tags?: post_tagUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutAuthorInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutAuthorInput, postUncheckedCreateWithoutAuthorInput>
  }

  export type postCreateManyAuthorInputEnvelope = {
    data: postCreateManyAuthorInput | postCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type commentCreateWithoutAuthorInput = {
    id?: string
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: postCreateNestedOneWithoutCommentsInput
    parent?: commentCreateNestedOneWithoutRepliesInput
    replies?: commentCreateNestedManyWithoutParentInput
  }

  export type commentUncheckedCreateWithoutAuthorInput = {
    id?: string
    content: string
    post_id: string
    parent_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    replies?: commentUncheckedCreateNestedManyWithoutParentInput
  }

  export type commentCreateOrConnectWithoutAuthorInput = {
    where: commentWhereUniqueInput
    create: XOR<commentCreateWithoutAuthorInput, commentUncheckedCreateWithoutAuthorInput>
  }

  export type commentCreateManyAuthorInputEnvelope = {
    data: commentCreateManyAuthorInput | commentCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type postUpsertWithWhereUniqueWithoutAuthorInput = {
    where: postWhereUniqueInput
    update: XOR<postUpdateWithoutAuthorInput, postUncheckedUpdateWithoutAuthorInput>
    create: XOR<postCreateWithoutAuthorInput, postUncheckedCreateWithoutAuthorInput>
  }

  export type postUpdateWithWhereUniqueWithoutAuthorInput = {
    where: postWhereUniqueInput
    data: XOR<postUpdateWithoutAuthorInput, postUncheckedUpdateWithoutAuthorInput>
  }

  export type postUpdateManyWithWhereWithoutAuthorInput = {
    where: postScalarWhereInput
    data: XOR<postUpdateManyMutationInput, postUncheckedUpdateManyWithoutAuthorInput>
  }

  export type postScalarWhereInput = {
    AND?: postScalarWhereInput | postScalarWhereInput[]
    OR?: postScalarWhereInput[]
    NOT?: postScalarWhereInput | postScalarWhereInput[]
    id?: StringFilter<"post"> | string
    title?: StringFilter<"post"> | string
    slug?: StringFilter<"post"> | string
    content?: StringFilter<"post"> | string
    published?: BoolFilter<"post"> | boolean
    author_id?: StringFilter<"post"> | string
    created_at?: DateTimeFilter<"post"> | Date | string
    updated_at?: DateTimeFilter<"post"> | Date | string
  }

  export type commentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: commentWhereUniqueInput
    update: XOR<commentUpdateWithoutAuthorInput, commentUncheckedUpdateWithoutAuthorInput>
    create: XOR<commentCreateWithoutAuthorInput, commentUncheckedCreateWithoutAuthorInput>
  }

  export type commentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: commentWhereUniqueInput
    data: XOR<commentUpdateWithoutAuthorInput, commentUncheckedUpdateWithoutAuthorInput>
  }

  export type commentUpdateManyWithWhereWithoutAuthorInput = {
    where: commentScalarWhereInput
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyWithoutAuthorInput>
  }

  export type commentScalarWhereInput = {
    AND?: commentScalarWhereInput | commentScalarWhereInput[]
    OR?: commentScalarWhereInput[]
    NOT?: commentScalarWhereInput | commentScalarWhereInput[]
    id?: StringFilter<"comment"> | string
    content?: StringFilter<"comment"> | string
    post_id?: StringFilter<"comment"> | string
    author_id?: StringFilter<"comment"> | string
    parent_id?: StringNullableFilter<"comment"> | string | null
    created_at?: DateTimeFilter<"comment"> | Date | string
    updated_at?: DateTimeFilter<"comment"> | Date | string
  }

  export type user_profileCreateWithoutPostsInput = {
    id?: string
    user_id: string
    bio?: string | null
    avatar_url?: string | null
    date_of_birth?: Date | string | null
    phone_number?: string | null
    location?: string | null
    website?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    comments?: commentCreateNestedManyWithoutAuthorInput
  }

  export type user_profileUncheckedCreateWithoutPostsInput = {
    id?: string
    user_id: string
    bio?: string | null
    avatar_url?: string | null
    date_of_birth?: Date | string | null
    phone_number?: string | null
    location?: string | null
    website?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    comments?: commentUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type user_profileCreateOrConnectWithoutPostsInput = {
    where: user_profileWhereUniqueInput
    create: XOR<user_profileCreateWithoutPostsInput, user_profileUncheckedCreateWithoutPostsInput>
  }

  export type commentCreateWithoutPostInput = {
    id?: string
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    author: user_profileCreateNestedOneWithoutCommentsInput
    parent?: commentCreateNestedOneWithoutRepliesInput
    replies?: commentCreateNestedManyWithoutParentInput
  }

  export type commentUncheckedCreateWithoutPostInput = {
    id?: string
    content: string
    author_id: string
    parent_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    replies?: commentUncheckedCreateNestedManyWithoutParentInput
  }

  export type commentCreateOrConnectWithoutPostInput = {
    where: commentWhereUniqueInput
    create: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput>
  }

  export type commentCreateManyPostInputEnvelope = {
    data: commentCreateManyPostInput | commentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type post_categoryCreateWithoutPostInput = {
    category: categoryCreateNestedOneWithoutPostsInput
  }

  export type post_categoryUncheckedCreateWithoutPostInput = {
    category_id: string
  }

  export type post_categoryCreateOrConnectWithoutPostInput = {
    where: post_categoryWhereUniqueInput
    create: XOR<post_categoryCreateWithoutPostInput, post_categoryUncheckedCreateWithoutPostInput>
  }

  export type post_categoryCreateManyPostInputEnvelope = {
    data: post_categoryCreateManyPostInput | post_categoryCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type post_tagCreateWithoutPostInput = {
    tag: tagCreateNestedOneWithoutPostsInput
  }

  export type post_tagUncheckedCreateWithoutPostInput = {
    tag_id: string
  }

  export type post_tagCreateOrConnectWithoutPostInput = {
    where: post_tagWhereUniqueInput
    create: XOR<post_tagCreateWithoutPostInput, post_tagUncheckedCreateWithoutPostInput>
  }

  export type post_tagCreateManyPostInputEnvelope = {
    data: post_tagCreateManyPostInput | post_tagCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type user_profileUpsertWithoutPostsInput = {
    update: XOR<user_profileUpdateWithoutPostsInput, user_profileUncheckedUpdateWithoutPostsInput>
    create: XOR<user_profileCreateWithoutPostsInput, user_profileUncheckedCreateWithoutPostsInput>
    where?: user_profileWhereInput
  }

  export type user_profileUpdateToOneWithWhereWithoutPostsInput = {
    where?: user_profileWhereInput
    data: XOR<user_profileUpdateWithoutPostsInput, user_profileUncheckedUpdateWithoutPostsInput>
  }

  export type user_profileUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: commentUpdateManyWithoutAuthorNestedInput
  }

  export type user_profileUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: commentUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type commentUpsertWithWhereUniqueWithoutPostInput = {
    where: commentWhereUniqueInput
    update: XOR<commentUpdateWithoutPostInput, commentUncheckedUpdateWithoutPostInput>
    create: XOR<commentCreateWithoutPostInput, commentUncheckedCreateWithoutPostInput>
  }

  export type commentUpdateWithWhereUniqueWithoutPostInput = {
    where: commentWhereUniqueInput
    data: XOR<commentUpdateWithoutPostInput, commentUncheckedUpdateWithoutPostInput>
  }

  export type commentUpdateManyWithWhereWithoutPostInput = {
    where: commentScalarWhereInput
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyWithoutPostInput>
  }

  export type post_categoryUpsertWithWhereUniqueWithoutPostInput = {
    where: post_categoryWhereUniqueInput
    update: XOR<post_categoryUpdateWithoutPostInput, post_categoryUncheckedUpdateWithoutPostInput>
    create: XOR<post_categoryCreateWithoutPostInput, post_categoryUncheckedCreateWithoutPostInput>
  }

  export type post_categoryUpdateWithWhereUniqueWithoutPostInput = {
    where: post_categoryWhereUniqueInput
    data: XOR<post_categoryUpdateWithoutPostInput, post_categoryUncheckedUpdateWithoutPostInput>
  }

  export type post_categoryUpdateManyWithWhereWithoutPostInput = {
    where: post_categoryScalarWhereInput
    data: XOR<post_categoryUpdateManyMutationInput, post_categoryUncheckedUpdateManyWithoutPostInput>
  }

  export type post_categoryScalarWhereInput = {
    AND?: post_categoryScalarWhereInput | post_categoryScalarWhereInput[]
    OR?: post_categoryScalarWhereInput[]
    NOT?: post_categoryScalarWhereInput | post_categoryScalarWhereInput[]
    post_id?: StringFilter<"post_category"> | string
    category_id?: StringFilter<"post_category"> | string
  }

  export type post_tagUpsertWithWhereUniqueWithoutPostInput = {
    where: post_tagWhereUniqueInput
    update: XOR<post_tagUpdateWithoutPostInput, post_tagUncheckedUpdateWithoutPostInput>
    create: XOR<post_tagCreateWithoutPostInput, post_tagUncheckedCreateWithoutPostInput>
  }

  export type post_tagUpdateWithWhereUniqueWithoutPostInput = {
    where: post_tagWhereUniqueInput
    data: XOR<post_tagUpdateWithoutPostInput, post_tagUncheckedUpdateWithoutPostInput>
  }

  export type post_tagUpdateManyWithWhereWithoutPostInput = {
    where: post_tagScalarWhereInput
    data: XOR<post_tagUpdateManyMutationInput, post_tagUncheckedUpdateManyWithoutPostInput>
  }

  export type post_tagScalarWhereInput = {
    AND?: post_tagScalarWhereInput | post_tagScalarWhereInput[]
    OR?: post_tagScalarWhereInput[]
    NOT?: post_tagScalarWhereInput | post_tagScalarWhereInput[]
    post_id?: StringFilter<"post_tag"> | string
    tag_id?: StringFilter<"post_tag"> | string
  }

  export type postCreateWithoutCommentsInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    author: user_profileCreateNestedOneWithoutPostsInput
    categories?: post_categoryCreateNestedManyWithoutPostInput
    tags?: post_tagCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutCommentsInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    author_id: string
    created_at?: Date | string
    updated_at?: Date | string
    categories?: post_categoryUncheckedCreateNestedManyWithoutPostInput
    tags?: post_tagUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutCommentsInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutCommentsInput, postUncheckedCreateWithoutCommentsInput>
  }

  export type user_profileCreateWithoutCommentsInput = {
    id?: string
    user_id: string
    bio?: string | null
    avatar_url?: string | null
    date_of_birth?: Date | string | null
    phone_number?: string | null
    location?: string | null
    website?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    posts?: postCreateNestedManyWithoutAuthorInput
  }

  export type user_profileUncheckedCreateWithoutCommentsInput = {
    id?: string
    user_id: string
    bio?: string | null
    avatar_url?: string | null
    date_of_birth?: Date | string | null
    phone_number?: string | null
    location?: string | null
    website?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    posts?: postUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type user_profileCreateOrConnectWithoutCommentsInput = {
    where: user_profileWhereUniqueInput
    create: XOR<user_profileCreateWithoutCommentsInput, user_profileUncheckedCreateWithoutCommentsInput>
  }

  export type commentCreateWithoutRepliesInput = {
    id?: string
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: postCreateNestedOneWithoutCommentsInput
    author: user_profileCreateNestedOneWithoutCommentsInput
    parent?: commentCreateNestedOneWithoutRepliesInput
  }

  export type commentUncheckedCreateWithoutRepliesInput = {
    id?: string
    content: string
    post_id: string
    author_id: string
    parent_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type commentCreateOrConnectWithoutRepliesInput = {
    where: commentWhereUniqueInput
    create: XOR<commentCreateWithoutRepliesInput, commentUncheckedCreateWithoutRepliesInput>
  }

  export type commentCreateWithoutParentInput = {
    id?: string
    content: string
    created_at?: Date | string
    updated_at?: Date | string
    post: postCreateNestedOneWithoutCommentsInput
    author: user_profileCreateNestedOneWithoutCommentsInput
    replies?: commentCreateNestedManyWithoutParentInput
  }

  export type commentUncheckedCreateWithoutParentInput = {
    id?: string
    content: string
    post_id: string
    author_id: string
    created_at?: Date | string
    updated_at?: Date | string
    replies?: commentUncheckedCreateNestedManyWithoutParentInput
  }

  export type commentCreateOrConnectWithoutParentInput = {
    where: commentWhereUniqueInput
    create: XOR<commentCreateWithoutParentInput, commentUncheckedCreateWithoutParentInput>
  }

  export type commentCreateManyParentInputEnvelope = {
    data: commentCreateManyParentInput | commentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type postUpsertWithoutCommentsInput = {
    update: XOR<postUpdateWithoutCommentsInput, postUncheckedUpdateWithoutCommentsInput>
    create: XOR<postCreateWithoutCommentsInput, postUncheckedCreateWithoutCommentsInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutCommentsInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutCommentsInput, postUncheckedUpdateWithoutCommentsInput>
  }

  export type postUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: user_profileUpdateOneRequiredWithoutPostsNestedInput
    categories?: post_categoryUpdateManyWithoutPostNestedInput
    tags?: post_tagUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: post_categoryUncheckedUpdateManyWithoutPostNestedInput
    tags?: post_tagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type user_profileUpsertWithoutCommentsInput = {
    update: XOR<user_profileUpdateWithoutCommentsInput, user_profileUncheckedUpdateWithoutCommentsInput>
    create: XOR<user_profileCreateWithoutCommentsInput, user_profileUncheckedCreateWithoutCommentsInput>
    where?: user_profileWhereInput
  }

  export type user_profileUpdateToOneWithWhereWithoutCommentsInput = {
    where?: user_profileWhereInput
    data: XOR<user_profileUpdateWithoutCommentsInput, user_profileUncheckedUpdateWithoutCommentsInput>
  }

  export type user_profileUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: postUpdateManyWithoutAuthorNestedInput
  }

  export type user_profileUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar_url?: NullableStringFieldUpdateOperationsInput | string | null
    date_of_birth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: postUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type commentUpsertWithoutRepliesInput = {
    update: XOR<commentUpdateWithoutRepliesInput, commentUncheckedUpdateWithoutRepliesInput>
    create: XOR<commentCreateWithoutRepliesInput, commentUncheckedCreateWithoutRepliesInput>
    where?: commentWhereInput
  }

  export type commentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: commentWhereInput
    data: XOR<commentUpdateWithoutRepliesInput, commentUncheckedUpdateWithoutRepliesInput>
  }

  export type commentUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutCommentsNestedInput
    author?: user_profileUpdateOneRequiredWithoutCommentsNestedInput
    parent?: commentUpdateOneWithoutRepliesNestedInput
  }

  export type commentUncheckedUpdateWithoutRepliesInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    post_id?: StringFieldUpdateOperationsInput | string
    author_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentUpsertWithWhereUniqueWithoutParentInput = {
    where: commentWhereUniqueInput
    update: XOR<commentUpdateWithoutParentInput, commentUncheckedUpdateWithoutParentInput>
    create: XOR<commentCreateWithoutParentInput, commentUncheckedCreateWithoutParentInput>
  }

  export type commentUpdateWithWhereUniqueWithoutParentInput = {
    where: commentWhereUniqueInput
    data: XOR<commentUpdateWithoutParentInput, commentUncheckedUpdateWithoutParentInput>
  }

  export type commentUpdateManyWithWhereWithoutParentInput = {
    where: commentScalarWhereInput
    data: XOR<commentUpdateManyMutationInput, commentUncheckedUpdateManyWithoutParentInput>
  }

  export type post_categoryCreateWithoutCategoryInput = {
    post: postCreateNestedOneWithoutCategoriesInput
  }

  export type post_categoryUncheckedCreateWithoutCategoryInput = {
    post_id: string
  }

  export type post_categoryCreateOrConnectWithoutCategoryInput = {
    where: post_categoryWhereUniqueInput
    create: XOR<post_categoryCreateWithoutCategoryInput, post_categoryUncheckedCreateWithoutCategoryInput>
  }

  export type post_categoryCreateManyCategoryInputEnvelope = {
    data: post_categoryCreateManyCategoryInput | post_categoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type post_categoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: post_categoryWhereUniqueInput
    update: XOR<post_categoryUpdateWithoutCategoryInput, post_categoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<post_categoryCreateWithoutCategoryInput, post_categoryUncheckedCreateWithoutCategoryInput>
  }

  export type post_categoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: post_categoryWhereUniqueInput
    data: XOR<post_categoryUpdateWithoutCategoryInput, post_categoryUncheckedUpdateWithoutCategoryInput>
  }

  export type post_categoryUpdateManyWithWhereWithoutCategoryInput = {
    where: post_categoryScalarWhereInput
    data: XOR<post_categoryUpdateManyMutationInput, post_categoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type postCreateWithoutCategoriesInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    author: user_profileCreateNestedOneWithoutPostsInput
    comments?: commentCreateNestedManyWithoutPostInput
    tags?: post_tagCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutCategoriesInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    author_id: string
    created_at?: Date | string
    updated_at?: Date | string
    comments?: commentUncheckedCreateNestedManyWithoutPostInput
    tags?: post_tagUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutCategoriesInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutCategoriesInput, postUncheckedCreateWithoutCategoriesInput>
  }

  export type categoryCreateWithoutPostsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type categoryUncheckedCreateWithoutPostsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type categoryCreateOrConnectWithoutPostsInput = {
    where: categoryWhereUniqueInput
    create: XOR<categoryCreateWithoutPostsInput, categoryUncheckedCreateWithoutPostsInput>
  }

  export type postUpsertWithoutCategoriesInput = {
    update: XOR<postUpdateWithoutCategoriesInput, postUncheckedUpdateWithoutCategoriesInput>
    create: XOR<postCreateWithoutCategoriesInput, postUncheckedCreateWithoutCategoriesInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutCategoriesInput, postUncheckedUpdateWithoutCategoriesInput>
  }

  export type postUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: user_profileUpdateOneRequiredWithoutPostsNestedInput
    comments?: commentUpdateManyWithoutPostNestedInput
    tags?: post_tagUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: commentUncheckedUpdateManyWithoutPostNestedInput
    tags?: post_tagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type categoryUpsertWithoutPostsInput = {
    update: XOR<categoryUpdateWithoutPostsInput, categoryUncheckedUpdateWithoutPostsInput>
    create: XOR<categoryCreateWithoutPostsInput, categoryUncheckedCreateWithoutPostsInput>
    where?: categoryWhereInput
  }

  export type categoryUpdateToOneWithWhereWithoutPostsInput = {
    where?: categoryWhereInput
    data: XOR<categoryUpdateWithoutPostsInput, categoryUncheckedUpdateWithoutPostsInput>
  }

  export type categoryUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type categoryUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type post_tagCreateWithoutTagInput = {
    post: postCreateNestedOneWithoutTagsInput
  }

  export type post_tagUncheckedCreateWithoutTagInput = {
    post_id: string
  }

  export type post_tagCreateOrConnectWithoutTagInput = {
    where: post_tagWhereUniqueInput
    create: XOR<post_tagCreateWithoutTagInput, post_tagUncheckedCreateWithoutTagInput>
  }

  export type post_tagCreateManyTagInputEnvelope = {
    data: post_tagCreateManyTagInput | post_tagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type post_tagUpsertWithWhereUniqueWithoutTagInput = {
    where: post_tagWhereUniqueInput
    update: XOR<post_tagUpdateWithoutTagInput, post_tagUncheckedUpdateWithoutTagInput>
    create: XOR<post_tagCreateWithoutTagInput, post_tagUncheckedCreateWithoutTagInput>
  }

  export type post_tagUpdateWithWhereUniqueWithoutTagInput = {
    where: post_tagWhereUniqueInput
    data: XOR<post_tagUpdateWithoutTagInput, post_tagUncheckedUpdateWithoutTagInput>
  }

  export type post_tagUpdateManyWithWhereWithoutTagInput = {
    where: post_tagScalarWhereInput
    data: XOR<post_tagUpdateManyMutationInput, post_tagUncheckedUpdateManyWithoutTagInput>
  }

  export type postCreateWithoutTagsInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    author: user_profileCreateNestedOneWithoutPostsInput
    comments?: commentCreateNestedManyWithoutPostInput
    categories?: post_categoryCreateNestedManyWithoutPostInput
  }

  export type postUncheckedCreateWithoutTagsInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    author_id: string
    created_at?: Date | string
    updated_at?: Date | string
    comments?: commentUncheckedCreateNestedManyWithoutPostInput
    categories?: post_categoryUncheckedCreateNestedManyWithoutPostInput
  }

  export type postCreateOrConnectWithoutTagsInput = {
    where: postWhereUniqueInput
    create: XOR<postCreateWithoutTagsInput, postUncheckedCreateWithoutTagsInput>
  }

  export type tagCreateWithoutPostsInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
  }

  export type tagUncheckedCreateWithoutPostsInput = {
    id?: string
    name: string
    slug: string
    created_at?: Date | string
  }

  export type tagCreateOrConnectWithoutPostsInput = {
    where: tagWhereUniqueInput
    create: XOR<tagCreateWithoutPostsInput, tagUncheckedCreateWithoutPostsInput>
  }

  export type postUpsertWithoutTagsInput = {
    update: XOR<postUpdateWithoutTagsInput, postUncheckedUpdateWithoutTagsInput>
    create: XOR<postCreateWithoutTagsInput, postUncheckedCreateWithoutTagsInput>
    where?: postWhereInput
  }

  export type postUpdateToOneWithWhereWithoutTagsInput = {
    where?: postWhereInput
    data: XOR<postUpdateWithoutTagsInput, postUncheckedUpdateWithoutTagsInput>
  }

  export type postUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: user_profileUpdateOneRequiredWithoutPostsNestedInput
    comments?: commentUpdateManyWithoutPostNestedInput
    categories?: post_categoryUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: commentUncheckedUpdateManyWithoutPostNestedInput
    categories?: post_categoryUncheckedUpdateManyWithoutPostNestedInput
  }

  export type tagUpsertWithoutPostsInput = {
    update: XOR<tagUpdateWithoutPostsInput, tagUncheckedUpdateWithoutPostsInput>
    create: XOR<tagCreateWithoutPostsInput, tagUncheckedCreateWithoutPostsInput>
    where?: tagWhereInput
  }

  export type tagUpdateToOneWithWhereWithoutPostsInput = {
    where?: tagWhereInput
    data: XOR<tagUpdateWithoutPostsInput, tagUncheckedUpdateWithoutPostsInput>
  }

  export type tagUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type tagUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type postCreateManyAuthorInput = {
    id?: string
    title: string
    slug: string
    content: string
    published?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type commentCreateManyAuthorInput = {
    id?: string
    content: string
    post_id: string
    parent_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type postUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: commentUpdateManyWithoutPostNestedInput
    categories?: post_categoryUpdateManyWithoutPostNestedInput
    tags?: post_tagUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: commentUncheckedUpdateManyWithoutPostNestedInput
    categories?: post_categoryUncheckedUpdateManyWithoutPostNestedInput
    tags?: post_tagUncheckedUpdateManyWithoutPostNestedInput
  }

  export type postUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutCommentsNestedInput
    parent?: commentUpdateOneWithoutRepliesNestedInput
    replies?: commentUpdateManyWithoutParentNestedInput
  }

  export type commentUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    post_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: commentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type commentUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    post_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type commentCreateManyPostInput = {
    id?: string
    content: string
    author_id: string
    parent_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type post_categoryCreateManyPostInput = {
    category_id: string
  }

  export type post_tagCreateManyPostInput = {
    tag_id: string
  }

  export type commentUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: user_profileUpdateOneRequiredWithoutCommentsNestedInput
    parent?: commentUpdateOneWithoutRepliesNestedInput
    replies?: commentUpdateManyWithoutParentNestedInput
  }

  export type commentUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: commentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type commentUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    author_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type post_categoryUpdateWithoutPostInput = {
    category?: categoryUpdateOneRequiredWithoutPostsNestedInput
  }

  export type post_categoryUncheckedUpdateWithoutPostInput = {
    category_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_categoryUncheckedUpdateManyWithoutPostInput = {
    category_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_tagUpdateWithoutPostInput = {
    tag?: tagUpdateOneRequiredWithoutPostsNestedInput
  }

  export type post_tagUncheckedUpdateWithoutPostInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_tagUncheckedUpdateManyWithoutPostInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type commentCreateManyParentInput = {
    id?: string
    content: string
    post_id: string
    author_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type commentUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: postUpdateOneRequiredWithoutCommentsNestedInput
    author?: user_profileUpdateOneRequiredWithoutCommentsNestedInput
    replies?: commentUpdateManyWithoutParentNestedInput
  }

  export type commentUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    post_id?: StringFieldUpdateOperationsInput | string
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: commentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type commentUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    post_id?: StringFieldUpdateOperationsInput | string
    author_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type post_categoryCreateManyCategoryInput = {
    post_id: string
  }

  export type post_categoryUpdateWithoutCategoryInput = {
    post?: postUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type post_categoryUncheckedUpdateWithoutCategoryInput = {
    post_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_categoryUncheckedUpdateManyWithoutCategoryInput = {
    post_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_tagCreateManyTagInput = {
    post_id: string
  }

  export type post_tagUpdateWithoutTagInput = {
    post?: postUpdateOneRequiredWithoutTagsNestedInput
  }

  export type post_tagUncheckedUpdateWithoutTagInput = {
    post_id?: StringFieldUpdateOperationsInput | string
  }

  export type post_tagUncheckedUpdateManyWithoutTagInput = {
    post_id?: StringFieldUpdateOperationsInput | string
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