// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

// サイズを指定
const width = 500;
const height = 500;

function init() {
  let rot = 0; // 角度
let mouseX = 0; // マウス座標
let mouseY = 0;

// マウス座標はマウスが動いた時のみ取得できる
document.addEventListener("mousemove", (event) => {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvasEarth')
  });
  renderer.setSize(width, height);
  renderer.setClearColor( 0xffffff, 0);
  
  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 球体を作成
  const geometry = new THREE.SphereGeometry(300, 30, 30);

    // 画像を読み込む
  const loader = new THREE.TextureLoader();
  const texture = loader.load('imgs/earthmap1k.jpg');
  // マテリアルにテクスチャーを設定
  const material = new THREE.MeshStandardMaterial({
    map: texture
  });
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  // 3D空間にメッシュを追加
  scene.add(mesh);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xFFFFFF);
  directionalLight.position.set(1, 1, 1);
  // シーンに追加
  scene.add(directionalLight);

  tick();

// 毎フレーム時に実行されるループイベントです
function tick() {
  // マウスの位置に応じて角度を設定
  // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
  const targetRot = (mouseX / window.innerWidth) * 360;
  // イージングの公式を用いて滑らかにする
  // 値 += (目標値 - 現在の値) * 減速値
  rot += (targetRot - rot) * 0.02;

  // ラジアンに変換する
  const radian = rot * Math.PI / 180;
  // 角度に応じてカメラの位置を設定
  camera.position.x = 1000 * Math.cos(radian);
  camera.position.z = 1000 * Math.sin(radian);
  // 原点方向を見つめる
  camera.lookAt(new THREE.Vector3(0, 0, 0));
    // レンダリング
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
  }
}