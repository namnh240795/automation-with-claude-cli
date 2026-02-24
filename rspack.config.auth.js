const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const { rspack } = require('@rspack/core');
const path = require('path');

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: path.resolve(__dirname, 'apps/auth'),
  target: 'node',
  mode: 'development',
  entry: {
    main: ['./src/main.ts'],
  },
  output: {
    path: path.resolve(__dirname, 'apps/auth/dist'),
    filename: '[name].js',
    clean: true,
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx', '.js'],
    alias: {
      '@app/common': path.resolve(__dirname, 'libs/common/src'),
      '@app/common/*': path.resolve(__dirname, 'libs/common/src/*'),
      '@app/app-logger': path.resolve(__dirname, 'libs/app-logger/src'),
      '@app/app-logger/*': path.resolve(__dirname, 'libs/app-logger/src/*'),
      '@app/auth-utilities': path.resolve(__dirname, 'libs/auth-utilities/src'),
      '@app/auth-utilities/*': path.resolve(__dirname, 'libs/auth-utilities/src/*'),
      '@app/caching': path.resolve(__dirname, 'libs/caching/src'),
      '@app/caching/*': path.resolve(__dirname, 'libs/caching/src/*'),
      '@app/health': path.resolve(__dirname, 'libs/health/src'),
      '@app/health/*': path.resolve(__dirname, 'libs/health/src/*'),
      '@auth/prisma-client': path.resolve(__dirname, 'packages/auth-prisma-client/src'),
      '@auth/prisma-client/*': path.resolve(__dirname, 'packages/auth-prisma-client/src/*'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                decorators: true,
              },
              transform: {
                legacyDecorator: true,
                decoratorMetadata: true,
              },
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  externalsType: 'commonjs',
  plugins: [
    !process.env.BUILD &&
      new RunScriptWebpackPlugin({
        name: 'main.js',
        autoRestart: true,
        nodeArgs: ['--inspect'],
      }),
  ].filter(Boolean),
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
  externals: [
    /^(@nestjs|@fastify|@prisma|@scalar|rxjs|reflect-metadata|class-validator|class-transformer|ioredis|axios|pg|dotenv)/,
    function (obj, callback) {
      const resource = obj.request;
      const lazyImports = [
        '@nestjs/core',
        '@nestjs/microservices',
        '@nestjs/platform-express',
        '@nestjs/platform-fastify',
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets',
        '@nestjs/websockets/socket-module',
        'cache-manager',
        'class-validator',
        'class-transformer',
        'file-type',
        'socket.io-adapter',
        'utf-8-validate',
        'bufferutil',
        'kerberos',
        '@mongodb-js/zstd',
        'snappy',
        '@aws-sdk/credential-providers',
        'mongodb-client-encryption',
        'bson-ext',
        'snappy/package.json',
        'aws4',
        '@fastify/multipart',
      ];
      if (!resource || !lazyImports.includes(resource)) {
        return callback();
      }
      try {
        require.resolve(resource);
        callback();
      } catch (err) {
        callback(null, resource);
      }
    },
  ],
};

module.exports = config;
