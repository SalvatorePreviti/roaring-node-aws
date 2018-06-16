# roaring

Port of [Roaring Bitmaps](http://roaringbitmap.org) for NodeJS as a native addon, with precompiled support for Lambda AWS node v8.10.0.
It is interoperable with other implementations via the [Roaring format](https://github.com/RoaringBitmap/RoaringFormatSpec/).

Roaring bitmaps are compressed bitmaps. They can be hundreds of times faster.

## installation

```sh
npm install --save roaring-aws
```

## serverless

This library is [Serverless](https://serverless.com/framework/docs/providers/aws/guide/deploying/) ready.

```sh
npm install --save roaring-aws
serverless deploy
```

## how it works

This library wraps [roaring](https://github.com/SalvatorePreviti/roaring-node) NPM package.
It includes also a precompiled .node binary that is used when running inside AWS.

The normal [roaring](https://github.com/SalvatorePreviti/roaring-node) package is used instead when running outside of AWS (local environment, continuous integration, ...)

AWS detection works by checking the presence of a non empty environment variable "AWS_EXECUTION_ENV".
It is set by default when running in AWS Lambdas.
See https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html

## references

This package - <https://www.npmjs.com/package/roaring-node-aws>

Source code and build tools for this package - <https://github.com/SalvatorePreviti/roaring-node-aws>

Roaring Bitmaps - <http://roaringbitmap.org/>

Portable Roaring bitmaps in C - <https://github.com/RoaringBitmap/CRoaring>

# licenses

- This package is provided as open source software using Apache License.

- CRoaring is provided as open source software using Apache License.

# API

See <https://github.com/SalvatorePreviti/roaring-node>
