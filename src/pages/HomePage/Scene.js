import * as THREE from 'three';

import Stats from 'three/addons/libs/stats.module.js';

export default class Scene {
	constructor() {
		this.container = document.createElement('div');
		this.container.style.position = "fixed";
		this.container.style.top = 0;
		this.container.style.left = 0;
		this.container.style.width = "100vw";
		this.container.style.height = "100vh";

		document.body.appendChild(this.container);

		this.SCREEN_WIDTH = window.innerWidth;
		this.SCREEN_HEIGHT = window.innerHeight;
		this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

		// let camera, scene, renderer, mesh;
		// let cameraRig, activeCamera, activeHelper;
		// let cameraPerspective, cameraOrtho;
		// let cameraPerspectiveHelper, cameraOrthoHelper;
		this.frustumSize = 600; // ?

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(50, 0.5 * this.aspect, 1, 10000); // TODO: dynamize

		this.camera.position.z = 2500; // TODO initialize? irrelevant

		this.cameraPerspective = new THREE.PerspectiveCamera(50, 0.5 * this.aspect, 150, 1000); //

		this.cameraPerspectiveHelper = new THREE.CameraHelper(this.cameraPerspective);
		this.scene.add(this.cameraPerspectiveHelper);

		this.cameraOrtho = new THREE.OrthographicCamera(0.5 * this.frustumSize * this.aspect / - 2, 0.5 * this.frustumSize * this.aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 150, 1000);
		this.cameraOrthoHelper = new THREE.CameraHelper(this.cameraOrtho);
		this.scene.add(this.cameraOrthoHelper);

		// Camera switching

		this.activeCamera = this.cameraPerspective;
		this.activeHelper = this.cameraPerspectiveHelper;

		// counteract different front orientation of cameras vs rig

		this.cameraOrtho.rotation.y = Math.PI;
		this.cameraPerspective.rotation.y = Math.PI;

		this.cameraRig = new THREE.Group();

		this.cameraRig.add(this.cameraPerspective);
		this.cameraRig.add(this.cameraOrtho);

		this.scene.add(this.cameraRig);

		// some meshes

		this.mesh = new THREE.Mesh(
			new THREE.SphereGeometry(100, 16, 8),
			new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
		);
		this.scene.add(this.mesh);

		this.mesh2 = new THREE.Mesh(
			new THREE.SphereGeometry(50, 16, 8),
			new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
		);
		this.mesh2.position.y = 150;
		this.mesh.add(this.mesh2);

		this.mesh3 = new THREE.Mesh(
			new THREE.SphereGeometry(5, 16, 8),
			new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
		);
		this.mesh3.position.z = 150;

		this.cameraRig.add(this.mesh3); // ok?

		this.geometry = new THREE.BufferGeometry();
		this.vertices = [];

		for (let i = 0; i < 10000; i++) {

			this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
			this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
			this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z

		}

		this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.vertices, 3));

		this.particles = new THREE.Points(this.geometry, new THREE.PointsMaterial({ color: 0x888888 }));
		this.scene.add(this.particles);

		//

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
		this.renderer.setAnimationLoop(this.animate.bind(this));
		this.container.appendChild(this.renderer.domElement);

		this.renderer.setScissorTest(true);

		//

		this.stats = new Stats();
		this.container.appendChild(this.stats.dom);

		//
		window.addEventListener('resize', this.onWindowResize.bind(this)); // device window changed (-> keep a given aspect ratio?)
		document.addEventListener('keydown', this.onKeyDown.bind(this)); // APPLY KEYBOARD MAPPING

		return this;
	}

	onKeyDown(event) {

		switch (event.keyCode) {

			case 79: /*O*/

				this.activeCamera = this.cameraOrtho;
				this.activeHelper = this.cameraOrthoHelper;

				break;

			case 80: /*P*/

				this.activeCamera = this.cameraPerspective;
				this.activeHelper = this.cameraPerspectiveHelper;

				break;

		}

	}

	onWindowResize() {

		this.SCREEN_WIDTH = window.innerWidth;
		this.SCREEN_HEIGHT = window.innerHeight;
		this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;

		this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

		this.camera.aspect = 0.5 * this.aspect;
		this.camera.updateProjectionMatrix();

		this.cameraPerspective.aspect = 0.5 * this.aspect;
		this.cameraPerspective.updateProjectionMatrix();

		this.cameraOrtho.left = - 0.5 * this.frustumSize * this.aspect / 2;
		this.cameraOrtho.right = 0.5 * this.frustumSize * this.aspect / 2;
		this.cameraOrtho.top = this.frustumSize / 2;
		this.cameraOrtho.bottom = - this.frustumSize / 2;
		this.cameraOrtho.updateProjectionMatrix();

	}

	//

	animate() {

		this.render();
		this.stats.update();

	}


	render() {

		const r = Date.now() * 0.0005;

		this.mesh.position.x = 700 * Math.cos(r);
		this.mesh.position.z = 700 * Math.sin(r);
		this.mesh.position.y = 700 * Math.sin(r);

		this.mesh.children[0].position.x = 70 * Math.cos(2 * r);
		this.mesh.children[0].position.z = 70 * Math.sin(r);

		if (this.activeCamera === this.cameraPerspective) {

			this.cameraPerspective.fov = 35 + 30 * Math.sin(0.5 * r);
			this.cameraPerspective.far = this.mesh.position.length();
			this.cameraPerspective.updateProjectionMatrix();

			this.cameraPerspectiveHelper.update();
			this.cameraPerspectiveHelper.visible = true;

			this.cameraOrthoHelper.visible = false;

		} else {

			this.cameraOrtho.far = this.mesh.position.length();
			this.cameraOrtho.updateProjectionMatrix();

			this.cameraOrthoHelper.update();
			this.cameraOrthoHelper.visible = true;

			this.cameraPerspectiveHelper.visible = false;

		}

		this.cameraRig.lookAt(this.mesh.position);

		//

		this.activeHelper.visible = false;

		this.renderer.setClearColor(0x000000, 1);
		this.renderer.setScissor(0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
		this.renderer.setViewport(0, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
		this.renderer.render(this.scene, this.activeCamera);

		//

		this.activeHelper.visible = true;

		this.renderer.setClearColor(0x111111, 1);
		this.renderer.setScissor(this.SCREEN_WIDTH / 2, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
		this.renderer.setViewport(this.SCREEN_WIDTH / 2, 0, this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT);
		this.renderer.render(this.scene, this.camera);

	}
}