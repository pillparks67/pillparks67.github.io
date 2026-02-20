let renderer
let scene
let camera

function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        45, // fov
        window.innerWidth / window.innerHeight, // aspect ratio
        .1, // near plane
        1000 // far plane
    )

    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x000000, 1.0)
    renderer.setSize(window.innerWidth, window.innerHeight)
    // six sevennnn
    const loader = new THREE.TextureLoader();
    loader.load("hkh.png", (texture) => {
        let cubeGeometry = new THREE.BoxGeometry(9, 9, 9)
        let material = new THREE.MeshBasicMaterial({map: texture})
        let cube = new THREE.Mesh(cubeGeometry, material)
        cube.name = "cube"
        
        scene.add(cube)
    })

    camera.position.x = 15
    camera.position.y = 15
    camera.position.z = 15

    camera.lookAt(scene.position)

    document.body.appendChild(renderer.domElement)

    requestAnimationFrame(render)
}

function render(time) {
    renderer.render(scene, camera)

    time *= 0.001

    let cube = scene.getObjectByName("cube")

    if (cube) {
        cube.rotation.x = time
        cube.rotation.z = time
        cube.rotation.y = time
        cube.position.y = -2.5 + Math.abs(Math.sin(time * 3) * 5)
    }

    requestAnimationFrame(render)
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener("load", init)
window.addEventListener("resize", resize)
