/*
 *
 * This uses code from a THREE.js Multiplayer boilerplate made by Or Fleisher:
 * https://github.com/juniorxsound/THREE.Multiplayer
 * Aidan Nelson, April 2020
 *
 */

class Scene {

  constructor() {
    //THREE scene

    this.scene = new THREE.Scene();
    let Bird = new THREE.GLTFLoader()



    //Utility
    this.width = window.innerWidth;
    this.height = window.innerHeight * 0.9;

    // lerp value to be used when interpolating positions and rotations
    this.lerpValue = 0;
    this.mixers = []
    this.clock = new THREE.Clock();
    //THREE Camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      this.width / this.height,
      0.1,
      5000
    );
    this.camera.position.set(0, 3, 6);
    this.scene.add(this.camera);

    // create an AudioListener and add it to the camera
    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);

    //THREE WebGL renderer
    this.renderer = new THREE.WebGLRenderer({
      antialiasing: true,
    });
    this.renderer.setClearColor(new THREE.Color("lightblue"));
    this.renderer.setSize(this.width, this.height);
 


   
    //Push the canvas to the DOM
    let domElement = document.getElementById("canvas-container");
    domElement.append(this.renderer.domElement);

    //Setup event listeners for events and handle the states
    window.addEventListener("resize", (e) => this.onWindowResize(e), false);

    // Helpers
    this.scene.add(new THREE.GridHelper(500, 500));
    this.scene.add(new THREE.AxesHelper(10));


    this.raycaster = new THREE.Raycaster()
    this.sceneMeshes = new Array()
    this.dir = new THREE.Vector3()
    this.intersects = []
    
    this.controls = new FirstPersonControls(this.scene, this.camera, this.renderer);
    this.rot


    this.addLights();
    createEnvironment(this.scene);
    let scene = this.scene
    let mixers = this.mixers
    this.home = []
    this.character = []
    let home = this.home 
    let character = this.character
    Bird.load('/model/room2/scene.gltf', function ( gltf ) {

          const mesh = gltf.scene.children[ 0 ];
          mesh.scale.set( 4, 4, 4 );
         

          
          
         
          mesh.position.y = 0;
          mesh.position.z = 40;
          mesh.position.x = -10
          scene.add( mesh );
          
          home.push(mesh)
         


        

      });
     
    Bird.load('/model/room/scene.gltf', function ( gltf ) {
          
          const mesh = gltf.scene.children[ 0 ];
             mesh.scale.set( 0.4, 0.4, 0.4 );
           

         
          mesh.position.y = 7.4;
          mesh.position.z = 100;
          mesh.position.x =  20
          
           mesh.rotation.z = 10; 
          

           scene.add( mesh );
          

         


        

      });

    Bird.load(' http://127.0.0.1:4011/scene.gltf', function ( gltf ) {
          
          const mesh = gltf.scene.children[ 0 ];
          mesh.scale.set( 3.5, 3.5, 3.5 );
          

         
          mesh.position.y = 0;
          mesh.position.z = 4;
          mesh.position.x =  5
          
           mesh.rotation.y = 0;
          mesh.rotation.z = 4;
          mesh.rotation.x =  4.7


         scene.add( mesh );
         


          const mixer = new THREE.AnimationMixer( mesh );
          mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 1 ).play();
          mixers.push( mixer );
        

        

      });
    
    var col = Math.random() * 0xff00000 - 0xff00000
    var g = new THREE.BoxGeometry(15, 15, 15, 10, 10, 10);
    var m = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });

    this.green = new THREE.Mesh(g, m);
    var g2 = new THREE.BoxGeometry(15, 15, 15, 10, 10, 10);
    var m2 = new THREE.MeshBasicMaterial({ color: 0xfffff, wireframe: false});
    this.blue = new THREE.Mesh(g2, m2);
    this.green.position.x = 65;
    scene.add(this.green);
    
    var material2 = new THREE.MeshPhongMaterial( {
         color: 0xcc49c3,//violet
            opacity     :-0.1,              
            transparent : true,
            side: THREE.BackSide,
            ambient: 0xea6767,
            //depthWrite  :true,
            //alphaTest:0.1,    
   });
    this.wall2 = new THREE.Mesh(new THREE.PlaneGeometry(42, 42),material2)
    this.wall2.position.z = -19
    this.wall2.position.x = 7
    this.scene.add(this.wall2)
    this.sceneMeshes.push(this.wall2)



     this.wall4 = new THREE.Mesh(new THREE.PlaneGeometry(62, 62),material2)
    this.wall4.rotation.y = -300
    this.wall4.position.z = 10
    this.wall4.position.x = -9
    this.scene.add(this.wall4)
    this.sceneMeshes.push(this.wall4)              
           
   
   

  

    // Start the loop
    this.frameCount = 0;
    this.update();
  }






 





  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Lighting 💡

  addLights() {
    this.scene.add(new THREE.AmbientLight(0xffffe6, 0.7));
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Clients 👫

  // add a client meshes, a video element and  canvas for three.js video texture
  async addClient(id) {
    let videoMaterial = makeVideoMaterial(id);
    let otherMat = new THREE.MeshNormalMaterial({ color: 0x00ff00 });

    this.head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), [otherMat,otherMat,otherMat,otherMat,otherMat,videoMaterial]);
    let head = this.head
    head.position.set(0, 0, 0);
    
    head.name = "ed"
    // https://threejs.org/docs/index.html#api/en/objects/Group
     
    var group = new THREE.Group();
     let Bird = new THREE.GLTFLoader()
     let scene = this.scene
    Bird.load('/model/walk/scene.gltf', function ( gltf ) {
           
          const mesh = gltf.scene.children[ 0 ];
          mesh.scale.set( 4, 4, 4 );
          

         
          mesh.position.y = -6.5;
          mesh.position.z = 0;
          mesh.position.x =  0
           
          group.add(mesh);
          scene.add(group);
   

        

      });





    
   
    
  
   

    peers[id].group = group;
    // add group to scene
    peers[id].previousPosition = new THREE.Vector3();
    peers[id].previousRotation = new THREE.Quaternion();
    peers[id].desiredPosition = new THREE.Vector3();
    peers[id].desiredRotation = new THREE.Quaternion();

   


   
  }

  removeClient(id) {
    this.scene.remove(peers[id].group);
  }

  // overloaded function can deal with new info or not
  updateClientPositions(clientProperties) {
    
    this.lerpValue = 0;
    for (let id in clientProperties) {
      if (id != mySocket.id) {
        peers[id].previousPosition.copy(peers[id].group.position);
        peers[id].previousRotation.copy(peers[id].group.quaternion);
        peers[id].desiredPosition = new THREE.Vector3().fromArray(
          clientProperties[id].position
        );
        peers[id].desiredRotation = new THREE.Quaternion().fromArray(
          clientProperties[id].rotation
        );
      }
    }
  }

  interpolatePositions() {
    this.lerpValue += 0.1; // updates are sent roughly every 1/5 second == 10 frames
    for (let id in peers) {
      if (peers[id].group) {
        peers[id].group.rotation.z = peers[id].desiredRotation.z 
        peers[id].group.rotation.y = peers[id].desiredRotation.y  +  peers[id].desiredRotation.y / 2
        peers[id].group.rotation.x = peers[id].desiredRotation.x

        peers[id].group.position.lerpVectors(peers[id].previousPosition,peers[id].desiredPosition, this.lerpValue);
         

      }
    }
  }

  updateClientVolumes() {
    for (let id in peers) {
      let audioEl = document.getElementById(id + "_audio");
      if (audioEl && peers[id].group) {
        let distSquared = this.camera.position.distanceToSquared(
          peers[id].group.position
        );

        if (distSquared > 500) {
          audioEl.volume = 0;
        } else {
          // from lucasio here: https://discourse.threejs.org/t/positionalaudio-setmediastreamsource-with-webrtc-question-not-hearing-any-sound/14301/29
          let volume = Math.min(1, 10 / distSquared);
          audioEl.volume = volume;
        }
      }
    }
  }




   checkTouching(a, d) {
    let b1 = a.position.y + 0.7 / 2;
    let t1 = a.position.y  + 0.7 / 2;
    let r1 = a.position.x  + 0.7 / 2;
    let l1 = a.position.x + 0.7 / 2;
    let f1 = a.position.z  + 0.7 / 2;
    let B1 = a.position.z + 0.7 / 2;
      const box = new THREE.Box3().setFromObject( d ); 
    const size = box.getSize(new THREE.Vector3());
    let b2 = d.position.y - size.y / 2;
    let t2 = d.position.y + size.y / 2;
    let r2 = d.position.x + size.x / 2;
    let l2 = d.position.x - size.x / 2;
    let f2 = d.position.z -size.z / 2;
    let B2 = d.position.z + size.y / 2;
    if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
        return false;
    }
    return true;
}

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Interaction 🤾‍♀️

  getPlayerPosition() {
    // TODO: use quaternion or are euler angles fine here?


    return [
      [
        this.camera.position.x,
        this.camera.position.y,
        this.camera.position.z,
      ],
      [
        this.camera.rotation._x,
        this.camera.rotation._y,
        this.camera.rotation._z,
        this.camera.rotation._w,
      ],
    ];
  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Rendering 🎥

  async update() {
    
    requestAnimationFrame(() => this.update());
     let name = this.scene.getObjectByName('ed')
     this.rot = this.controls.camera.rotation.x
     let delta=this.clock.getDelta()
   
    for ( let i = 0; i < this.mixers.length; i ++ ) {

          this.mixers[ i ].update( delta );

    }

    this.frameCount++;

    updateEnvironment();

    if (this.frameCount % 25 === 0) {
      this.updateClientVolumes();
    }
    this.interpolatePositions();
    this.controls.update();
    this.render();
  }

  async collision(){
      let camera = this.camera
        this.dir.subVectors(camera.position, this.controls.camera.target).normalize()
                this.raycaster.set(this.controls.camera.position, this.dir.subVectors(camera.position,this.controls.camera.target).normalize())
                this.intersects = this.raycaster.intersectObjects(this.sceneMeshes, false)

                if (this.intersects.length > 0) {
                    if (this.intersects[0].distance < this.controls.camera.target.distanceTo(camera.position)) {
                        camera.position.copy(this.intersects[0].point)

                    }
                }
  }

  async render() {
   
    this.renderer.render(this.scene, this.camera);
    let green = this.green
    let blue = this.blue
    let name = await this.scene.getObjectByName("ed");
    let camera = this.camera
    
    console.log(this.controls)
    

    document.getElementById("c").innerHTML = this.checkTouching(camera, this.green);
    this.collision()

  }

  //////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////
  // Event Handlers 🍽

  onWindowResize(e) {
    this.width = window.innerWidth;
    this.height = Math.floor(window.innerHeight * 0.9);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
}

//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
// Utilities

function makeVideoMaterial(id) {
  let videoElement = document.getElementById(id + "_video");
  let videoTexture = new THREE.VideoTexture(videoElement);

  let videoMaterial = new THREE.MeshBasicMaterial({
    map: videoTexture,
    overdraw: true,
    side: THREE.DoubleSide,
  });

  return videoMaterial;
}
