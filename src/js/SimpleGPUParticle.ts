/**
 * Created by uma92 on 2017/07/18.
 */

export default class SimpleGPUParticle {
    // 500 * 500 = 250000
    private WIDTH: number = 500;
    private PARTICLES: number;


    // 基本セット
    private container: any;
    private camera: THREE.PerspectiveCamera;
    private scene: THREE.Scene;
    private renderer: THREE.WebGLRenderer;
    private geometry: THREE.BufferGeometry;

    private gpuCompute: any;
    private velocityVariable: any;
    private positionVariable: any;
    private positionUniforms: any;
    private velocityUniforms: any;
    private particleUniforms: any;
    private effectController: any;

    constructor(_scene: THREE.Scene, _renderer: THREE.WebGLRenderer, _camera:THREE.PerspectiveCamera, _width: number) {
        this.scene = _scene;
        this.renderer = _renderer;
        this.camera = _camera;
        this.WIDTH = _width;
        this.initComputeRenderer();
        this.initPosition();
    }

    public initComputeRenderer() {
        this.PARTICLES = this.WIDTH * this.WIDTH;
        this.gpuCompute = new GPUComputationRenderer(this.WIDTH, this.WIDTH, this.renderer);
        var dtPosition = this.gpuCompute.createTexture();
        var dtVelocity = this.gpuCompute.createTexture();

        this.fillTextures(dtPosition, dtVelocity);

        // shaderプログラムのアタッチ
        this.velocityVariable = this.gpuCompute.addVariable("textureParticleVelocity", document.getElementById('computeParticleVelocity').textContent, dtVelocity);
        this.positionVariable = this.gpuCompute.addVariable("textureParticlePosition", document.getElementById('computeParticlePosition').textContent, dtPosition);

        this.gpuCompute.setVariableDependencies(this.velocityVariable, [this.positionVariable, this.velocityVariable]);
        this.gpuCompute.setVariableDependencies(this.positionVariable, [this.positionVariable, this.velocityVariable]);


        // uniform変数を登録したい場合は以下のように作る
        /*
         positionUniforms = positionVariable.material.uniforms;
         velocityUniforms = velocityVariable.material.uniforms;

         velocityUniforms.time = { value: 0.0 };
         positionUniforms.time = { ValueB: 0.0 };
         ***********************************
         たとえば、上でコメントアウトしているeffectControllerオブジェクトのtimeを
         わたしてあげれば、effectController.timeを更新すればuniform変数も変わったり、ということができる
         velocityUniforms.time = { value: effectController.time };
         ************************************
         */

        // error処理
        const error = this.gpuCompute.init();
        if (error !== null) {
            console.error(error);
        }

    }
    public restartSimulation() {
        let dtPosition = this.gpuCompute.createTexture();
        let dtVelocity = this.gpuCompute.createTexture();
        this.fillTextures( dtPosition, dtVelocity );
        this.gpuCompute.renderTexture( dtPosition, this.positionVariable.renderTargets[ 0 ] );
        this.gpuCompute.renderTexture( dtPosition, this.positionVariable.renderTargets[ 1 ] );
        this.gpuCompute.renderTexture( dtVelocity, this.velocityVariable.renderTargets[ 0 ] );
        this.gpuCompute.renderTexture( dtVelocity, this.velocityVariable.renderTargets[ 1 ] );
    }

    public initPosition() {

        this.geometry = new THREE.BufferGeometry();
        let positions = new Float32Array( this.PARTICLES * 3 );
        let p = 0;
        for ( let i = 0; i < this.PARTICLES; i++ ) {
            positions[ p++ ] = 0;
            positions[ p++ ] = 0;
            positions[ p++ ] = 0;
        }

        // uv情報の決定。テクスチャから情報を取り出すときに必要
        let uvs = new Float32Array( this.PARTICLES * 2 );
        p = 0;
        for ( let j = 0; j < this.WIDTH; j++ ) {
            for ( let i = 0; i < this.WIDTH; i++ ) {
                uvs[ p++ ] = i / ( this.WIDTH - 1 );
                uvs[ p++ ] = j / ( this.WIDTH - 1 );
            }
        }

        // attributeをgeometryに登録する
        this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
        this.geometry.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

        // uniform変数をオブジェクトで定義
        // 今回はカメラをマウスでいじれるように、計算に必要な情報もわたす。
        this.particleUniforms = {
            textureParticlePosition: { value: null },
            textureParticleVelocity: { value: null },
            cameraConstant: { value: this.getCameraConstant() }

        };



        // Shaderマテリアル これはパーティクルそのものの描写に必要なシェーダー
        let material = new THREE.ShaderMaterial( {
            uniforms:       this.particleUniforms,
            vertexShader:   document.getElementById( 'particleVertexShader' ).textContent,
            fragmentShader: document.getElementById( 'particleFragmentShader' ).textContent
        });
        material.extensions.drawBuffers = true;
        let particles = new THREE.Points( this.geometry, material );
        particles.matrixAutoUpdate = false;
        particles.updateMatrix();

        // パーティクルをシーンに追加
        this.scene.add( particles );
    }

    private fillTextures( texturePosition, textureVelocity ) {

        // textureのイメージデータをいったん取り出す
        let posArray = texturePosition.image.data;
        let velArray = textureVelocity.image.data;

        // パーティクルの初期の位置は、ランダムなXZに平面おく。
        // 板状の正方形が描かれる
        let k, kl;
        for ( k = 0, kl = posArray.length; k < kl; k += 4 ) {
            // Position
            let x, y, z;
            x = Math.random()*500-250;
            z = Math.random()*500-250;
            y = 0;
            // posArrayの実態は一次元配列なので
            // x,y,z,wの順番に埋めていく。
            // wは今回は使用しないが、配列の順番などを埋めておくといろいろ使えて便利
            posArray[ k + 0 ] = x;
            posArray[ k + 1 ] = y;
            posArray[ k + 2 ] = z;
            posArray[ k + 3 ] = 0;

            // 移動する方向はとりあえずランダムに決めてみる。
            // これでランダムな方向にとぶパーティクルが出来上がるはず。
            velArray[ k + 0 ] = Math.random()*2-1;
            velArray[ k + 1 ] = Math.random()*2-1;
            velArray[ k + 2 ] = Math.random()*2-1;
            velArray[ k + 3 ] = Math.random()*2-1;
        }
    }
    private getCameraConstant( ) {
        return window.innerHeight / ( Math.tan( THREE.Math.DEG2RAD * 0.5 * this.camera.fov ) / this.camera.zoom );
    }




    public update() {
        this.gpuCompute.compute();
        this.particleUniforms.textureParticlePosition.value = this.gpuCompute.getCurrentRenderTarget( this.positionVariable ).texture;
        this.particleUniforms.textureParticleVelocity.value = this.gpuCompute.getCurrentRenderTarget( this.velocityVariable ).texture;
    }


}