import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

function importBoat()
{
    const loader = new GLTFLoader();

    loader.load( 'resources/SimpleBoat.gltf', function ( gltf ) {

	scene.add( gltf.scene );

    }, undefined, function ( error ) {

	console.error( error );

    }    );
}