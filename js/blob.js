// renderer
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

var morph = function() {
    // change the end value to increase/decrease morph speed
    var time = performance.now() * 0.0005;
    
    // change 'k' value for more spikes
    var k = 2;
    for (var i = 0; i < sphere.geometry.vertices.length; i++) {
        var v = sphere.geometry.vertices[i];
        v.normalize().multiplyScalar( 1 + 0.5 * noise.perlin3( v.x * k + time, v.y * k, v.z * k ));
    }
    sphere.geometry.computeVertexNormals();
    sphere.geometry.normalsNeedUpdate = true;
    sphere.geometry.verticesNeedUpdate = true;
}

function animate() {
    requestAnimationFrame( animate );

    morph();
    renderer.render( scene,camera );
}

animate();