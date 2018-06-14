rm -fr docker-build
rm -fr lib/roaring-aws

mkdir -p docker-build

docker run -v $PWD/docker-build:/var/task iopipe/awslambda-npm-install roaring@0.2.5 --build-from-source

mkdir -p lib/roaring-aws

cp $PWD/docker-build/node_modules/roaring/*.js $PWD/lib/roaring-aws
cp $PWD/docker-build/node_modules/roaring/*.ts $PWD/lib/roaring-aws
cp $PWD/docker-build/node_modules/roaring/lib/*.js $PWD/lib/roaring-aws/lib

mkdir -p lib/roaring-aws/build
mkdir -p lib/roaring-aws/build/Release

cp $PWD/docker-build/node_modules/roaring/build/Release/*.node $PWD/lib/roaring-aws/build/Release
