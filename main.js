let renderer
let scene
let camera

function init() {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
        90, // fov
        window.innerWidth / window.innerHeight, // aspect ratio
        .1, // near plane
        1000 // far plane
    )

    renderer = new THREE.WebGLRenderer()
    renderer.setClearColor(0x000000, 1.0)
    renderer.setSize(window.innerWidth, window.innerHeight)

    camera.position.x = 0
    camera.position.y = 50
    camera.position.z = 50

    camera.lookAt(scene.position)

    document.body.appendChild(renderer.domElement)

    addFloor("floor")
    addLight()

    render()
}

let time = 0

function render() {
    renderer.render(scene, camera)

    let floor = scene.getObjectByName("floor")
    floor.position.z = -Math.tan(time/3) * 5
    //floor.rotation.y = Math.sin(time) / 3
    floor.rotation.z = Math.cos(time/3) / 3

    time += 0.17

    requestAnimationFrame(render)
}

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

function toRadians(degrees) {
    return degrees * Math.PI / 180
}

function addFloor(name) {
    let geometry = new THREE.PlaneGeometry(100, 100, 20, 20)

    let material = new THREE.MeshPhongMaterial()
    material.map = THREE.ImageUtils.loadTexture("hkh.png")
    material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping
    material.map.repeat.set(1, 1)

    let mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.set(toRadians(-45), 0, 0)
    mesh.receiveShadow = true
    mesh.name = name

    scene.add(mesh)
}

function addLight() {
    let light = new THREE.SpotLight()
    light.position.set(0, 100, 30)
    light.brightness = 100
    light.castShadow = true

    scene.add(light)
}

window.addEventListener("load", init)
window.addEventListener("resize", resize)