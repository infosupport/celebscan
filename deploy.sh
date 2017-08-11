echo "Cleaning output directory"

rm -rf ../celebscan3000/*

echo "Copying resources"

cp -r dist/* ../celebscan3000/
cp Web.config ../celebscan3000/

echo "Publishing to preview slot on Azure"

cd ../celebscan3000/ && git add . && git commit -am "New deployment" && git push
