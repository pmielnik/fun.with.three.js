// basically a modification of this codepen: 
// https://codepen.io/farisk/pen/vrbzwL?editors=0010

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xFFFFFF );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// the two 128 values contribute to the resolution of the shape
var sphereGeometry = new THREE.SphereGeometry( 10, 128, 128 );
var sphereMaterial = new THREE.MeshNormalMaterial();

var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
scene.add( sphere );

var smallSphereGeometry = new THREE.SphereGeometry( 10, 128, 128 );
var smallSphere = new THREE.Mesh( smallSphereGeometry, sphereMaterial );
smallSphere.position.x += 2;
scene.add( smallSphere );

var smallSphere2Geometry = new THREE.SphereGeometry( 10, 128, 128 );
var smallSphere2 = new THREE.Mesh( smallSphere2Geometry, sphereMaterial );
smallSphere2.position.x -= 2;
scene.add( smallSphere2 );

var morph = function( shape, size, spikes ){
    // change the end value to increase/decrease morph speed
    var time = performance.now() * 0.0005;
    
    // change 'k' value for more spikes
    var k = spikes;
    for (var i = 0; i < shape.geometry.vertices.length; i++) {
        var v = shape.geometry.vertices[i];
        v.normalize().multiplyScalar( size + size*0.5 * noise.perlin3( v.x * k + time, v.y * k, v.z * k ));
    }
    shape.geometry.computeVertexNormals();
    shape.geometry.normalsNeedUpdate = true;
    shape.geometry.verticesNeedUpdate = true;
}

function animate() {
    requestAnimationFrame( animate );

    morph(sphere, 1, 2);                // medium spikes
    morph(smallSphere, 0.25, 1);        // few spikes
    morph(smallSphere2, 0.25, 3);       // very spiky
    renderer.render( scene,camera );
}

animate();