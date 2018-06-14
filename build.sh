set e

rm -fr lib/roaring-aws
rm -fr lib/roaring-aws/lib

mkdir -p docker-build

docker run -v $PWD/docker-build:/var/task iopipe/awslambda-npm-install --unsafe-perm --build-from-source

echo 'npm install OK.'

mkdir -p lib/roaring-aws
mkdir -p lib/roaring-aws/lib

cp $PWD/docker-build/node_modules/roaring/*.js $PWD/lib/roaring-aws/
cp $PWD/docker-build/node_modules/roaring/*.ts $PWD/lib/roaring-aws/
cp $PWD/docker-build/node_modules/roaring/lib/*.js $PWD/lib/roaring-aws/lib/

mkdir -p lib/roaring-aws/build
mkdir -p lib/roaring-aws/build/Release

cp $PWD/docker-build/node_modules/roaring/build/Release/*.node $PWD/lib/roaring-aws/build/Release

echo '\n* OK - all files copied.\n'
